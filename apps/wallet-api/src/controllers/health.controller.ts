import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from '../database/dto/health.dto';

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @ApiResponse({
    status: 200,
    description: 'Current status successfully retrieved.',
  })
  @ApiResponse({ type: StatusDto })
  @Get('/status')
  async getStatus() {
    const memory = process.memoryUsage();

    return {
      service: 'wallet-api',
      status: 'up',
      memory_total: memory.heapTotal,
      memory_used: memory.heapUsed,
      database: this.connection.readyState === 1 ? 'up' : 'down',
    };
  }
}
