import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { BigNumber } from 'bignumber.js';
import { Customer } from '../database/mongodb/schemas/customer.schema';
import { CustomerRepository } from '../database/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async decreaseBalance(customerId: string, amount: number) {
    const customer = await this.customerRepository.getCustomer(customerId);
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
