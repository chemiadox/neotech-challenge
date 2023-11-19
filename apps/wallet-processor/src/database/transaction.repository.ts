import { Model, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Transaction,
  TransactionDocument,
} from './mongodb/schemas/transaction.schema';
import { TransactionDto } from './mongodb/dto/transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(transactionDto: TransactionDto) {
    return this.transactionModel.create({
      value: new Schema.Types.Decimal128(transactionDto.value.toString(10)),
      latency: transactionDto.latency,
      customer_id: transactionDto.customerId,
      failed: transactionDto.failed,
    });
  }

  async getFailedTransactions(): Promise<TransactionDocument[]> {
    return this.transactionModel.find({ failed: true });
  }
}
