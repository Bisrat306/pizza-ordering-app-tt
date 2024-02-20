import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { setupSwagger } from './setup-swagger';
import * as express from 'express';
import { join } from 'path';

config();

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  // Serve static files from the 'uploads' directory
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Use the ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);
  await app.listen(process.env.PORT);
  console.log(`Connection successful on port ${process.env.PORT}`);
}
bootstrap();
