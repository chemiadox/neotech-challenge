import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { Queues } from './types/queues';
import { TransactionProcessor } from './processors/transaction.processor';

/* eslint no-var: "off" */
declare var process: {
  env: {
    NODE_ENV: string;
  };
};

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.NODE_ENV === 'production' ? 'redis' : 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: Queues.TRANSACTIONS,
    }),
  ],
  controllers: [CustomerController, TransactionController],
  providers: [CustomerService, TransactionService, TransactionProcessor],
})
export class WalletApiModule {}
