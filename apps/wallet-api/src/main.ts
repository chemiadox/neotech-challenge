import { NestFactory, Reflector } from "@nestjs/core";
import { WalletApiModule } from './wallet-api.module';
import { ClassSerializerInterceptor } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(WalletApiModule);
  await app.listen(3000);
}
bootstrap();
