import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { setSwagger } from './app.swager';
import { BusinessExceptionFilter } from './exception';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new BusinessExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const env = configService.get<string>('RUNTIME');
  const serviceName = configService.get<string>('SERVICE_NAME');
  console.log(`runtime: ${env}\tport: ${port}\tserviceName: ${serviceName}`);

  setSwagger(app);

  app.use(express.static(path.join(__dirname, '..', 'public')));

  await app.listen(port);
}

void bootstrap();
