import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletApiService {
  getHello(): string {
    return 'Hello from Wallet API!';
  }
}
