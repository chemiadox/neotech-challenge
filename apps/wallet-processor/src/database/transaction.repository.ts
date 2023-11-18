import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './mongodb/schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(transactionDto) {
    return this.transactionModel.create({
      value: transactionDto.value,
      latency: transactionDto.latency,
      customer_id: transactionDto.customerId,
      failed: transactionDto.failed,
    });
  }

  // TODO remove
  async getTransactions() {
    return this.transactionModel.find();
  }
}
