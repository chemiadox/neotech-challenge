import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { Queues } from './types/queues';
import { TransactionProcessor } from './processors/transaction.processor';
import {
  Customer,
  CustomerSchema,
} from './database/mongodb/schemas/customer.schema';

/* eslint no-var: "off" */
declare var process: {
  env: {
    NODE_ENV: string;
  };
};

@Module({
  imports: [
    // TODO make config/env
    BullModule.forRoot({
      redis: {
        host: process.env.NODE_ENV === 'production' ? 'redis' : 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: Queues.TRANSACTIONS,
    }),
    // TODO make config/env
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? `mongodb://root:example@mongodb/wallet?authSource=admin`
        : `mongodb://root:example@localhost:27017/wallet?authSource=admin`,
    ),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController, TransactionController],
  providers: [CustomerService, TransactionService, TransactionProcessor],
})
export class WalletApiModule {}
