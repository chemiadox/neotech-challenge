import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({
    description: '"wallet-api"',
  })
  service: string;

  @ApiProperty({
    description: 'Service status',
  })
  status: string;

  @ApiProperty({
    description: 'Memory available',
    type: Number,
  })
  memory_total: string;

  @ApiProperty({
    description: 'Memory consumed',
    type: Number,
  })
  memory_used: string;

  @ApiProperty({
    description: 'Database status',
  })
  database: string;
}
