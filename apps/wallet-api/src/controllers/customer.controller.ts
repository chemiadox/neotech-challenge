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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(ResponseCustomerInterceptor)
@ApiBearerAuth()
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Get('/customer/:id')
  @KeepExecution(true)
  @ApiResponse({
    status: 200,
    type: CustomerDto,
    description: 'Successful customer record retrieval',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @ApiParam({
    name: 'id',
  })
  async getCustomer(@Param('id') id: string) {
    return this.customerRepository.getCustomer(id);
  }

  @Patch('/customer/:id')
  @ApiResponse({
    status: 200,
    type: CustomerDto,
    description: 'Customer updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    description: 'Parameters to update',
    type: CustomerPatchDto,
  })
  async patchCustomer(
    @Param('id') id: string,
    @Body() customerPatchDto: CustomerPatchDto,
  ) {
    return this.customerRepository.updateCustomer(id, customerPatchDto);
  }

  @Delete('/customer/:id')
  @ApiResponse({
    status: 200,
    description: 'Customer deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @ApiParam({
    name: 'id',
  })
  async deleteCustomer(@Param('id') id: string) {
    return this.customerRepository.deleteCustomer(id);
  }
}
