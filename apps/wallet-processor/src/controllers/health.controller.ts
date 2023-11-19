import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/status')
  async getStatus() {
    const memory = process.memoryUsage();

    return {
      service: 'wallet-processor',
      status: 'up',
      memory_total: memory.heapTotal,
      memory_used: memory.heapUsed,
      database: this.connection.readyState === 1 ? 'up' : 'down',
    };
  }
}
