import { Controller, Get } from '@nestjs/common';
import { WalletProcessorService } from './wallet-processor.service';

@Controller()
export class WalletProcessorController {
  constructor(
    private readonly walletProcessorService: WalletProcessorService,
  ) {}

  @Get()
  getHello(): string {
    return this.walletProcessorService.getHello();
  }
}
