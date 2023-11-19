import { NestFactory } from '@nestjs/core';

import { WalletProcessorModule } from './wallet-processor.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletProcessorModule);
  await app.listen(3001);
}
bootstrap();
