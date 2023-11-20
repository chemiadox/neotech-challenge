import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({ required: true })
  value: number;

  @ApiProperty({ required: true })
  latency: number;

  @ApiProperty({ required: true })
  customerId: string;
}

export class ResponseJob {
  @ApiProperty()
  jobId: number;
}
