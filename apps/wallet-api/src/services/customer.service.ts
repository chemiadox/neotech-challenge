import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getCustomer(id: string): string {
    return `Get customer ${id}`;
  }

  patchCustomer(id: string): string {
    return `Patch customer ${id}`;
  }

  deleteCustomer(id: string): string {
    return `Delete customer ${id}`;
  }
}
