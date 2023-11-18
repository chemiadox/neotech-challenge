import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/customer/:id')
  getCustomer(@Param('id') id: string): string {
    return this.customerService.getCustomer(id);
  }

  @Patch('/customer/:id')
  patchCustomer(@Param('id') id: string): string {
    return this.customerService.patchCustomer(id);
  }

  @Delete('/customer/:id')
  deleteCustomer(@Param('id') id: string): string {
    return this.customerService.deleteCustomer(id);
  }
}
