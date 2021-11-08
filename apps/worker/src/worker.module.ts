import {Module} from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import {ClientsModule} from '@nestjs/microservices';
import {ScheduleModule} from '@nestjs/schedule';
import {HttpModule} from '@nestjs/axios';
import {KAFKA_CLIENT_CONFIG_FACTORY, WORKER_TOPIC} from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      KAFKA_CLIENT_CONFIG_FACTORY('data')
    ]),
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 5,
    }),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
