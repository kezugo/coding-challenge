import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {WorkerCommandDto} from './dtos/worker-command.dto';
import {WorkerCommandResultDto} from './dtos/worker-command-result.dto';
import {WorkerCommand, WorkerCommandStatus} from '@app/common/enums';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {DATA_TOPIC} from '@app/common';
import { Kafka } from 'kafkajs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/worker')
  async workerCommand(@Body() body: WorkerCommandDto): Promise<WorkerCommandResultDto> {
    switch(body.command) {
      case WorkerCommand.start :
        this.appService.startWorker();
        break;
      case WorkerCommand.stop :
        this.appService.stopWorker();
        break;
    }
    return Promise.resolve(new WorkerCommandResultDto({status: WorkerCommandStatus.success}));
  }

  // @MessagePattern(DATA_TOPIC)
  // collectData(@Payload() message) {
  //   // TODO : add db support here if needed
  //   console.log('message:',message);
  // }

  @Get('/data')
  async fetch() {

    // TODO : could be done better with service, injected Kafka and so on
    const kafka = new Kafka({
      clientId: 'data',
      brokers: ['localhost:9092'],
    });

    const consumer = kafka.consumer({ groupId: 'data-fetch' })
    await consumer.connect();
    await consumer.subscribe({
      topic: DATA_TOPIC,
      fromBeginning: true
    })

    return new Promise((resolve, reject) => {
      consumer.run({
        eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
          let results = [];
          for (let message of batch.messages) {
            results.push(JSON.parse(message.value.toString()));
          }
          if(!isRunning() || isStale() || batch.isEmpty() || batch.messages.length < 2 || results.length > 1000) {
            resolve(results);
            consumer.disconnect();
          }
        }
      });
    });

  }

}
