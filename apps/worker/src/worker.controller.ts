import {Controller, Inject} from '@nestjs/common';
import { WorkerService } from './worker.service';
import {ClientKafka, MessagePattern, Payload} from '@nestjs/microservices';
import {WorkerCommand} from '@app/common/enums';
import {CommandMessageDto, WORKER_SERVICE, WORKER_TOPIC} from '@app/common';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService,
              @Inject(WORKER_SERVICE) private readonly client: ClientKafka) {}

  @MessagePattern(WORKER_TOPIC)
  worker(@Payload() message: CommandMessageDto) {
    switch(message.value.command) {
      case WorkerCommand.start :
        this.workerService.startRetrievingData();
        break;
      case WorkerCommand.stop:
        this.workerService.stopRetrievingData();
        break;
    }
  }

}
