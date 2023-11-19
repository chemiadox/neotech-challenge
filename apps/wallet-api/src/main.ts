import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WalletApiModule } from './wallet-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletApiModule);

  const config = new DocumentBuilder()
    .setTitle('Wallet API')
    .setDescription('Provides transactions and users endpoints')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
