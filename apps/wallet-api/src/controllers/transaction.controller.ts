import { Body, Controller, Post } from '@nestjs/common';

import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../types/transactions';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/transaction')
  async postTransaction(@Body() transactions: Transaction[]) {
    return this.transactionService.postTransactions(transactions);
  }
}
