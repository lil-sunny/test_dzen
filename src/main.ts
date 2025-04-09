import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
// import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 2 }));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
