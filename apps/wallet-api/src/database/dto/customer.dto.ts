import { Customer } from '../mongodb/schemas/customer.schema';
import { NotFoundException } from '@nestjs/common';

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
    this.balance = Number(customer.credit_card.balance);
  }
}
