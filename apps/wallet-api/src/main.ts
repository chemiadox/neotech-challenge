import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { WalletApiModule } from './wallet-api.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(WalletApiModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wallet API')
    .setDescription('Provides transactions and users endpoints')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}

bootstrap();
