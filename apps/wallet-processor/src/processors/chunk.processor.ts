import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

import { QueueJobs, Queues } from '../types/queues';
import { TransactionService } from './transaction.service';

@Processor(Queues.CHUNKS)
export class ChunkProcessor {
  constructor(private readonly transactionService: TransactionService) {}

  @Process(QueueJobs.PROCESS)
  async handleProcess(job: Job) {
    console.log(`Received chunk #${job.id}`, job.data);

    return this.transactionService.processTransactions(job.data);
  }
}
