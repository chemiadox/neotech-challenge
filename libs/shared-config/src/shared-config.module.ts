import { Module } from '@nestjs/common';
import { SharedConfigService } from './shared-config.service';

@Module({
  providers: [SharedConfigService],
  exports: [SharedConfigService],
})
export class SharedConfigModule {}
