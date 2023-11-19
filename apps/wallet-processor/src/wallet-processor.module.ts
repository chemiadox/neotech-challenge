import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { ChunkProcessor } from './processors/chunk.processor';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Queues } from './types/queues';
import {
  Transaction,
  TransactionSchema,
} from './database/mongodb/schemas/transaction.schema';
import {
  Customer,
  CustomerSchema,
} from './database/mongodb/schemas/customer.schema';
import { TransactionRepository } from './database/transaction.repository';
import { CustomerRepository } from './database/customer.repository';
import { CustomerService } from './services/customer.service';
import { TransactionService } from './processors/transaction.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.NODE_ENV === 'production' ? 'redis' : 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: Queues.CHUNKS,
    }),
    // TODO make config/env
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? 'mongodb://root:example@mongodb/wallet?authSource=admin'
        : 'mongodb://root:example@localhost:27017/wallet?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [
    ChunkProcessor,
    TransactionRepository,
    TransactionService,
    CustomerRepository,
    CustomerService,
  ],
})
export class WalletProcessorModule {}
