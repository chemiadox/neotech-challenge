import { Controller, Get } from '@nestjs/common';
import { WalletApiService } from './wallet-api.service';

@Controller()
export class WalletApiController {
  constructor(private readonly walletApiService: WalletApiService) {}

  @Get()
  getHello(): string {
    return this.walletApiService.getHello();
  }
}
