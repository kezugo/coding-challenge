import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import {MicroserviceOptions} from '@nestjs/microservices';
import {KAFKA_CLIENT_CONFIG_FACTORY, KAFKA_CONFIG} from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule,
      KAFKA_CLIENT_CONFIG_FACTORY('worker'));
  await app.listen();
}
bootstrap();
