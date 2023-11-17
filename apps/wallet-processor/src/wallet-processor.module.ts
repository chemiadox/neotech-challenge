import { Module } from '@nestjs/common';
import { WalletProcessorController } from './wallet-processor.controller';
import { WalletProcessorService } from './wallet-processor.service';

@Module({
  imports: [],
  controllers: [WalletProcessorController],
  providers: [WalletProcessorService],
})
export class WalletProcessorModule {}
