import { NestFactory } from '@nestjs/core';

import { WalletProcessorModule } from './wallet-processor.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(WalletProcessorModule);
  await app.listen(config.port);
}

bootstrap();
