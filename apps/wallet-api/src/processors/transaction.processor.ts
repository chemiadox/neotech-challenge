import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueJobs, Queues } from '../types/queues';
import { Worker } from 'node:worker_threads';

@Processor(Queues.TRANSACTION_SPLIT)
export class TransactionProcessor {
  @Process(QueueJobs.TRANSACTION_JOB)
  handleChunking(job: Job) {
    const filename = `${__dirname}/worker/worker.js`;

    const worker = new Worker(filename, {
      workerData: {
        transactions: job.data,
        maxLatency: 1000,
      },
    });

    worker.on('message', (data) => {
      console.log('Worker result data', data);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.log(`Worker exitted with code ${code}`);
      } else {
        console.log('Worker finished its job');
      }
    });
  }
}
