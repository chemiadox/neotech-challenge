import { Schema } from 'mongoose';
import { BigNumber } from 'bignumber.js';
import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../database/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async decreaseBalance(customerId: string, amount: number) {
    const customer = await this.customerRepository.getCustomer(customerId);

    if (!customer) {
      // For soft-deleted return false (to retry later)
      // For non-existent return true (to drop transaction)
      return !(await this.customerRepository.customerExists(customerId));
    }

    const balance = new BigNumber(customer.credit_card.balance.path);

    if (balance.isLessThan(amount)) {
      return false;
    }

    /**
     * We should not rely on the binary precision
     */
    customer.credit_card.balance = new Schema.Types.Decimal128(
      balance.minus(amount).toString(),
    );
    customer.markModified('credit_card');

    await customer.save();

    return true;
  }
}
