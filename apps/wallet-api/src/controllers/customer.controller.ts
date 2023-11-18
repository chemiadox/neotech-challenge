import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerRepository } from '../database/customer.repository';
import { CustomerDto, CustomerPatchDto } from '../database/dto/customer.dto';
import { AuthGuard, KeepExecution } from '../guards/auth.guard';
import { ResponseCustomerInterceptor } from '../interceptors/response.customer.interceptor';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(ResponseCustomerInterceptor)
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Get('/customer/:id')
  @KeepExecution(true)
  async getCustomer(@Param('id') id: string) {
    return this.customerRepository.getCustomer(id);
  }

  @Patch('/customer/:id')
  async patchCustomer(
    @Param('id') id: string,
    @Body() customerPatchDto: CustomerPatchDto,
  ) {
    return new CustomerDto(
      await this.customerRepository.updateCustomer(id, customerPatchDto),
    );
  }

  @Delete('/customer/:id')
  async deleteCustomer(@Param('id') id: string) {
    return new CustomerDto(await this.customerRepository.deleteCustomer(id));
  }
}
