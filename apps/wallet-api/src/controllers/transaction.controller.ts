import { Body, Controller, Post } from '@nestjs/common';

import { TransactionService } from '../services/transaction.service';
import { ResponseJob, Transaction } from '../types/transactions';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/transaction')
  @ApiResponse({
    status: 200,
    description: 'Transactions executed successfully',
    type: ResponseJob,
  })
  @ApiBody({
    type: [Transaction],
  })
  async postTransaction(@Body() transactions: Transaction[]) {
    return this.transactionService.postTransactions(transactions);
  }
}
