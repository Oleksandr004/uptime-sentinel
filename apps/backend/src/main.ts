import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Sentinel API')
  .setDescription('Документация системы мониторинга ресурсов')
  .setVersion('1.0')
  .addTag('monitors') // Категории эндпоинтов
  .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server started on port', process.env.PORT ?? 3000);
  console.log(`🚀 API Docs: ${process.env.PORT}/api/docs`);
}
bootstrap();
