import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customer.controller';
import { CustomerRepository } from './database/customer.repository';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { Queues } from './types/queues';
import { TransactionProcessor } from './processors/transaction.processor';
import {
  Customer,
  CustomerSchema,
} from './database/mongodb/schemas/customer.schema';
import { HealthController } from './controllers/health.controller';
import { SeedingService } from './services/seeding.service';
import {
  Dictionary,
  DictionarySchema,
} from './database/mongodb/schemas/dictionary.schema';
import { DictionaryRepository } from './database/dictionary.repository';

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
    BullModule.registerQueue({
      name: Queues.CHUNKS,
    }),
    // TODO make config/env
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? `mongodb://root:example@mongodb/wallet?authSource=admin`
        : `mongodb://root:example@localhost:27017/wallet?authSource=admin`,
    ),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Dictionary.name, schema: DictionarySchema },
    ]),
  ],
  controllers: [CustomerController, TransactionController, HealthController],
  providers: [
    CustomerRepository,
    DictionaryRepository,
    TransactionService,
    TransactionProcessor,
    SeedingService,
  ],
})
export class WalletApiModule implements OnModuleInit {
  constructor(private readonly seedingService: SeedingService) {}

  async onModuleInit() {
    return this.seedingService.seedCustomers();
  }
}
