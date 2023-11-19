import { Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { TransactionRepository } from '../database/transaction.repository';
import { TransactionDto } from '../database/mongodb/dto/transaction.dto';
import { CustomerService } from '../services/customer.service';
import { TransactionDocument } from '../database/mongodb/schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly customerService: CustomerService,
  ) {}

  async processTransactions(transactionDtos: TransactionDto[]) {
    for (const transactionDto of transactionDtos) {
      const { customerId, value } = transactionDto;

      const success = await this.customerService.decreaseBalance(
        customerId,
        value,
      );

      await this.transactionRepository.createTransaction({
        ...transactionDto,
        failed: !success,
      });
    }
  }

  @Cron('0 0 * * * *')
  async handleCron() {
    const transactions: TransactionDocument[] =
      await this.transactionRepository.getFailedTransactions();

    if (!transactions.length) {
      console.log('No cron jobs at that moment');
      return;
    }

    console.log(`Starting cron job for ${transactions.length} records`);
    for (const transaction of transactions) {
      const { customer_id, value } = transaction;

      transaction.failed = await this.customerService.decreaseBalance(
        customer_id,
        Number((value as unknown as Schema.Types.Decimal128).path),
      );

      await transaction.save();
    }
  }
}
