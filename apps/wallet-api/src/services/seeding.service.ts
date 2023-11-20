import { Queue } from 'bull';
import * as Stream from 'stream';
import * as readline from 'readline';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Queues } from '../types/queues';
import { transformCustomerSeedToDocument } from '../utils/transformers';
import { CustomerRepository } from '../database/customer.repository';
import { DictionaryRepository } from '../database/dictionary.repository';
import { config } from '../config';

const SeededName = 'seeded';

@Injectable()
export class SeedingService {
  constructor(
    @InjectQueue(Queues.TRANSACTIONS)
    private readonly transactionsQueue: Queue,
    private readonly customerRepository: CustomerRepository,
    private readonly dictionaryRepository: DictionaryRepository,
  ) {}

  async seedCustomers() {
    const isSeeded = await this.dictionaryRepository.read(SeededName);

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

    new Promise((resolve, reject) => {
      lineStream.on('line', (line) => {
        this.processStreamLine(line);
      });

      lineStream.on('error', () => {
        console.log(`Error reading stream`);

        reject();
      });

      lineStream.on('close', () => {
        this.dictionaryRepository.write(SeededName, 'true');
        this.transactionsQueue.resume();

        console.log(`Seeding finished.`);

        resolve(null);
      });
    });
  }

  private async getReadableStream() {
    const s3client = new S3Client({
      signer: { sign: async (request) => request },
      region: config.aws.region,
    });

    const dataObject = await s3client.send(
      new GetObjectCommand({
        Bucket: config.aws.seedBucket,
        Key: config.aws.seedKey,
      }),
    );

    const iterable = dataObject.Body.transformToWebStream() as unknown;

    return Stream.Readable.from(iterable as Iterable<any>);
  }

  private async processStreamLine(line: string) {
    try {
      const parsedLine = JSON.parse(line);

      if (!(await this.customerRepository.customerExists(parsedLine.uid))) {
        const document = transformCustomerSeedToDocument(parsedLine);

        const { uid } = await this.customerRepository.createCustomer(document);

        console.log(`Created new document for ${uid}`);
      }
    } catch (error) {
      console.log('Error processing next line (${error.message})');
    }
  }
}
