import { Controller, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/transaction')
  postTransaction(): string {
    return this.transactionService.postTransactions();
  }
}
