import { Customer } from '../../database/mongodb/schemas/customer.schema';
import { NotFoundException } from '@nestjs/common';

export class CustomerPatchDto {
  first_name?: string;
  last_name?: string;
  balance?: number;
}

export class CustomerDto {
  first_name: string;
  last_name: string;
  balance: number;

  constructor(customer: Customer = null) {
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    this.first_name = customer.first_name;
    this.last_name = customer.last_name;
    this.balance = Number(customer.credit_card.balance);
  }
}
