import { NotFoundException } from '@nestjs/common';

import { Customer } from '../mongodb/schemas/customer.schema';

export class CustomerPatchDto {
  first_name?: string;
  last_name?: string;
  balance?: number;
}

export class CustomerDto {
  name: string;
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
