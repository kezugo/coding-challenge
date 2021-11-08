import {Inject, Injectable} from '@nestjs/common';
import {ClientKafka, MessagePattern, Payload} from '@nestjs/microservices';
import {DATA_TOPIC, WORKER_SERVICE, WORKER_TOPIC} from '@app/common';
import {WorkerCommand} from '@app/common/enums';

@Injectable()
export class AppService {

  constructor(@Inject(WORKER_SERVICE) private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(WORKER_TOPIC);
    this.client.connect();
  }

  startWorker() {
    this.client.send(WORKER_TOPIC, {command: WorkerCommand.start})
        .subscribe();
  }

  stopWorker() {
    this.client.send(WORKER_TOPIC, {command: WorkerCommand.stop})
        .subscribe();
  }


}
