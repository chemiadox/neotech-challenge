import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletProcessorService {
  getHello(): string {
    return 'Hello from Wallet Processor!';
  }
}
