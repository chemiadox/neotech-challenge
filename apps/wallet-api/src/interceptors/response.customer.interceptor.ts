import { map, Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Customer } from '../database/mongodb/schemas/customer.schema';
import { CustomerDto } from '../database/dto/customer.dto';

@Injectable()
export class ResponseCustomerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((customer: Customer) => {
        const dto = new CustomerDto(customer);
        const { userAuthorized } = context.switchToHttp().getRequest();

        if (!userAuthorized) {
          delete dto.balance;
        }

        return dto;
      }),
    );
  }
}
