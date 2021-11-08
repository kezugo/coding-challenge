import {INestApplication, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {KAFKA_CLIENT_CONFIG_FACTORY, KAFKA_CONFIG} from '@app/common';

const initMicroservice = async (app: INestApplication) => {
  app.connectMicroservice(KAFKA_CLIENT_CONFIG_FACTORY('data'));
  await app.startAllMicroservices();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: true,
      })
  );
  await initMicroservice(app);
  const PORT = process.env.PORT || 3000;
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
