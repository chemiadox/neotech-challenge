import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Transaction } from '../types/transactions';
import { QueueJobs, Queues } from '../types/queues';

@Injectable()
export class TransactionService {
  constructor(
    @InjectQueue(Queues.TRANSACTION_SPLIT)
    private readonly transactionsQueue: Queue,
  ) {}

  async postTransactions(transactions: Transaction[]) {
    const job = await this.transactionsQueue.add(
      QueueJobs.TRANSACTION_JOB,
      transactions,
    );

    return { jobId: job.id };
  }
}
