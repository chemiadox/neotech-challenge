import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueJobs, Queues } from '../types/queues';
import { TransactionService } from './transaction.service';

@Processor(Queues.CHUNKS)
export class ChunkProcessor {
  constructor(private readonly transactionService: TransactionService) {}

  @Process(QueueJobs.PROCESS)
  async handleProcess(job: Job) {
    return this.transactionService.processTransactions(job.data);
  }
}
