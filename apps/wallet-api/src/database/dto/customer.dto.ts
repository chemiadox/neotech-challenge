import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Customer } from '../mongodb/schemas/customer.schema';

export class CustomerPatchDto {
  @ApiProperty({ required: false })
  first_name?: string;

  @ApiProperty({ required: false })
  last_name?: string;

  @ApiProperty({ required: false })
  balance?: number;
}

export class CustomerDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  balance: number;

  constructor(customer: Customer = null) {
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    this.name = `${customer.first_name || '<anonymous>'} ${
      customer.last_name || '<anonymous>'
    }`;
    this.balance = parseFloat(customer.credit_card.balance.path);
  }
}
