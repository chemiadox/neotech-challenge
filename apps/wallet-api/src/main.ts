import { NestFactory } from '@nestjs/core';
import { WalletApiModule } from './wallet-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletApiModule);
  await app.listen(3000);
}
bootstrap();
