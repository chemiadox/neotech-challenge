import { Injectable } from '@nestjs/common';
import { Transaction } from '../types/transactions';
import { split } from '../utils/chunker';

const maxLatency: number = 1000;

@Injectable()
export class TransactionService {
  async postTransactions(transactions: Transaction[]): Promise<string> {
    console.log(split<Transaction>(transactions, maxLatency));

    return 'okay';
  }
}
