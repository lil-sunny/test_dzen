import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 2 }),
  );
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
