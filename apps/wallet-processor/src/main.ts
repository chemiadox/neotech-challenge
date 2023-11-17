import { NestFactory } from '@nestjs/core';
import { WalletProcessorModule } from './wallet-processor.module';
import { SharedConfigService } from '@app/shared-config';

async function bootstrap() {
  const configService = new SharedConfigService();
  const config = configService.getConfig();
  const app = await NestFactory.create(WalletProcessorModule);
  await app.listen(config.processor.port);
}
bootstrap();
