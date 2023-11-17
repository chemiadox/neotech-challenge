import { NestFactory } from '@nestjs/core';
import { WalletApiModule } from './wallet-api.module';
import { SharedConfigService } from '@app/shared-config';

async function bootstrap() {
  const configService = new SharedConfigService();
  const config = configService.getConfig();

  const app = await NestFactory.create(WalletApiModule);
  await app.listen(config.api.port);
}
bootstrap();
