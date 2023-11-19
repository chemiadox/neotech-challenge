import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Transaction } from '../types/transactions';
import { QueueJobs, Queues } from '../types/queues';

@Injectable()
export class TransactionService {
  constructor(
    @InjectQueue(Queues.TRANSACTIONS)
    private readonly transactionsQueue: Queue,
  ) {}

  async postTransactions(transactions: Transaction[]) {
    /**
     * Ensure all incoming requests executed sequentially
     */
    const job = await this.transactionsQueue.add(QueueJobs.SPLIT, transactions);

    return { jobId: job.id };
  }
}
