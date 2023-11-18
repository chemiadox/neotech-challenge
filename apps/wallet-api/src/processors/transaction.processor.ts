import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { QueueJobs, Queues } from '../types/queues';
import { Worker } from 'node:worker_threads';

@Processor(Queues.TRANSACTIONS)
export class TransactionProcessor {
  constructor(
    @InjectQueue(Queues.CHUNKS)
    private readonly chunksQueue: Queue,
  ) {}

  @Process(QueueJobs.SPLIT)
  handleChunking(job: Job) {
    const filename = `${__dirname}/worker/worker.js`;

    const worker = new Worker(filename, {
      workerData: {
        transactions: job.data,
        maxLatency: 1000,
      },
    });

    worker.on('message', async (data) => {
      this.chunksQueue.add(QueueJobs.PROCESS, data).then((job) => {
        console.log('Processor jobId', job.id, job.data);
      });
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.log(`Worker exited with error code ${code}`);
      } else {
        console.log('Worker job finished');
      }
    });
  }
}
