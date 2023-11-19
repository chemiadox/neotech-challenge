import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './mongodb/schemas/customer.schema';
import { CustomerPatchDto } from './dto/customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getCustomerCount() {
    return this.customerModel.countDocuments();
  }

  async getCustomer(uid: string) {
    return this.customerModel.findOne({ uid });
  }

  async createCustomer(document: CustomerDocument) {
    return this.customerModel.create(document);
  }

  async updateCustomer(uid: string, customerPatchDto: CustomerPatchDto) {
    const customer = await this.customerModel.findOne({ uid });

    if (customerPatchDto.first_name) {
      customer.first_name = customerPatchDto.first_name;
    }

    if (customerPatchDto.last_name) {
      customer.last_name = customerPatchDto.last_name;
    }

    if (customerPatchDto.balance) {
      customer.credit_card.balance = new Schema.Types.Decimal128(
        customerPatchDto.balance.toString(10),
      );
      customer.markModified('credit_card');
    }

    await customer.save();

    return customer;
  }

  async deleteCustomer(uid: string) {
    return this.customerModel.findOneAndUpdate(
      { uid },
      { deleted: true },
      { new: true },
    );
  }
}
