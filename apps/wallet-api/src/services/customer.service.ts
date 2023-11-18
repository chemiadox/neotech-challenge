import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../database/mongodb/schemas/customer.schema';
import { CustomerPatchDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getCustomer(uid: string) {
    return this.customerModel.findOne({ uid });
  }

  async patchCustomer(uid: string, customerPatchDto: CustomerPatchDto) {
    return this.customerModel.findOneAndUpdate({ uid }, customerPatchDto, {
      new: true,
    });
  }

  async deleteCustomer(uid: string) {
    return this.customerModel.findOneAndUpdate(
      { uid },
      { deleted: true },
      { new: true },
    );
  }
}
