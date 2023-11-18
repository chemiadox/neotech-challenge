import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueJobs, Queues } from '../types/queues';
import { TransactionDto } from '../database/mongodb/dto/transaction.dto';
import { TransactionRepository } from '../database/transaction.repository';
import { CustomerService } from '../services/customer.service';

@Processor(Queues.CHUNKS)
export class ChunkProcessor {
  constructor(
    private readonly customerService: CustomerService,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  @Process(QueueJobs.PROCESS)
  async handleProcess(job: Job) {
    const transactionsDtos: TransactionDto[] = job.data;
    for (const transactionDto of transactionsDtos) {
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
}
