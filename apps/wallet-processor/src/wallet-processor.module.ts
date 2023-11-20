import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { HealthController } from './controllers/health.controller';
import { ChunkProcessor } from './processors/chunk.processor';
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
import { config } from './config';

@Module({
  imports: [
    BullModule.forRoot({ redis: config.redis }),
    BullModule.registerQueue({
      name: Queues.CHUNKS,
    }),
    MongooseModule.forRoot(config.mongo.uri),
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
