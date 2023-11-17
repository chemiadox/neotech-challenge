import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  postTransactions(): string {
    return `Post transactions`;
  }
}
