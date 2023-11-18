import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../database/mongodb/schemas/customer.schema';
import { CustomerDto, CustomerPatchDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getCustomer(uid: string) {
    const customer = await this.customerModel.findOne({ uid });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return new CustomerDto(customer);
  }

  async patchCustomer(uid: string, customerPatchDto: CustomerPatchDto) {
    const customer = await this.customerModel.findOneAndUpdate(
      { uid },
      customerPatchDto,
      { new: true },
    );

    return new CustomerDto(customer);
  }

  async deleteCustomer(uid: string) {
    const customer = await this.customerModel.findOneAndUpdate(
      { uid },
      { deleted: true },
      { new: true },
    );

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return new CustomerDto(customer);
  }
}
