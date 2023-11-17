import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [],
  controllers: [CustomerController, TransactionController],
  providers: [CustomerService, TransactionService],
})
export class WalletApiModule {}
