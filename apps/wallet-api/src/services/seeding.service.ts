import { Queue } from 'bull';
import * as Stream from 'stream';
import * as readline from 'readline';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import {
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { Queues } from '../types/queues';
import { transformCustomerSeedToDocument } from '../utils/transformers';
import { CustomerRepository } from '../database/customer.repository';
import { DictionaryRepository } from '../database/dictionary.repository';
import { CustomerDocument } from '../database/mongodb/schemas/customer.schema';

@Injectable()
export class SeedingService {
  constructor(
    @InjectQueue(Queues.TRANSACTIONS)
    private readonly transactionsQueue: Queue,
    private readonly customerRepository: CustomerRepository,
    private readonly dictionaryRepository: DictionaryRepository,
  ) {}

  async seedCustomers() {
    const isSeeded = await this.dictionaryRepository.read('seeded');

    if (isSeeded && isSeeded.value === 'true') {
      console.log('Seeding is already done, skipping.');
      return;
    }

    console.log('Seeding...');

    await this.transactionsQueue.pause();

    const stream = await this.getReadableStream();

    const lineStream = readline.createInterface({
      input: stream,
      terminal: false,
    });

    let totalLines = 0;

    new Promise((resolve) => {
      lineStream.on('line', (line) => {
        this.processStreamLine(line).then(() => totalLines++);
      });

      lineStream.on('error', () => {
        console.log(`Error reading stream on line ${totalLines + 1}`);
      });

      lineStream.on('close', () => {
        this.dictionaryRepository.write('seeded', 'true');
        this.transactionsQueue.resume();

        console.log(`Seeding finished. Imported ${totalLines} records`);

        resolve(null);
      });
    });
  }

  private async getReadableStream() {
    const s3client = new S3Client({
      signer: { sign: async (request) => request },
      region: 'eu-central-1',
    });

    const [headObject, dataObject] = await Promise.all([
      s3client.send(
        new HeadObjectCommand({
          Bucket: 'nt-interview-files',
          Key: 'data.json',
        }),
      ),
      s3client.send(
        new GetObjectCommand({
          Bucket: 'nt-interview-files',
          Key: 'data.json',
        }),
      ),
    ]);

    const iterable = dataObject.Body.transformToWebStream() as unknown;

    return this.observeProgress(
      Stream.Readable.from(iterable as Iterable<any>),
      headObject.ContentLength,
    );
  }

  private async processStreamLine(line: string) {
    try {
      const document = transformCustomerSeedToDocument(JSON.parse(line));
      const record = await this.customerRepository.getCustomer(document.uid);

      if (!record) {
        const record = await this.customerRepository.createCustomer(
          document as unknown as CustomerDocument,
        );

        console.log('Created record', record.uid, record._id);
      }
    } catch (error) {
      console.log(`Error processing next line (${error.message})`);
    }
  }

  private observeProgress(stream: Stream.Readable, contentLength: number) {
    const totalGb = (contentLength / (1024 * 1024 * 1024)).toFixed(2);
    let loaded = 0;
    let reported = null;

    const progressStream = stream.pipe(new Stream.PassThrough());

    progressStream.on('data', (chunk) => {
      loaded += chunk.length;
      const newReport = (loaded / (1024 * 1024 * 1024)).toFixed(2);

      if (newReport !== reported) {
        reported = newReport;
        const percent = ((loaded * 100) / contentLength).toFixed(2);

        console.log(`Loaded ${reported} / ${totalGb} Gb (${percent}%)`);
      }
    });

    return stream;
  }
}
