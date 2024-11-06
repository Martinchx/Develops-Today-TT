import { NestFactory } from '@nestjs/core';

import { envs } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(envs.PORT);
}
bootstrap();
