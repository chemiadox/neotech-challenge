import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerPatchDto } from '../services/dto/customer.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/customer/:id')
  async getCustomer(@Param('id') id: string) {
    return this.customerService.getCustomer(id);
  }

  @Patch('/customer/:id')
  async patchCustomer(
    @Param('id') id: string,
    @Body() customerPatchDto: CustomerPatchDto,
  ) {
    return this.customerService.patchCustomer(id, customerPatchDto);
  }

  @Delete('/customer/:id')
  async deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
