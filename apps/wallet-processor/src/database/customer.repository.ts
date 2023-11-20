import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from './mongodb/schemas/customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async customerExists(uid: string) {
    return this.customerModel.exists({ uid });
  }

  async getCustomer(uid: string) {
    return this.customerModel.findOne({ uid, deleted: false });
  }
}
