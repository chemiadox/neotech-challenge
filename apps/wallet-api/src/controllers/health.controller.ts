import { Connection } from 'mongoose';
import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { StatusDto } from '../database/dto/health.dto';
import { config } from '../config';

@Controller()
@ApiTags('Status')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/status')
  @ApiResponse({
    status: 200,
    description: 'Current status successfully retrieved.',
    type: StatusDto,
  })
  async getStatus() {
    const memory = process.memoryUsage();

    return {
      service: config.serviceName,
      status: 'up',
      memory_total: memory.heapTotal,
      memory_used: memory.heapUsed,
      memory_rss: memory.rss,
      database: this.connection.readyState === 1 ? 'up' : 'down',
    };
  }
}
