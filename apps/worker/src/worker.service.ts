import {Inject, Injectable} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {HttpService} from '@nestjs/axios';
import {
    API_URL,
    DATA_RETRIEVAL_INTERVAL,
    DATA_TOPIC,
    RETRIEVE_DATA_JOB,
    WORKER_SERVICE,
    WORKER_TOPIC
} from '@app/common';
import {ClientKafka} from '@nestjs/microservices';

@Injectable()
export class WorkerService {

  constructor(
      private readonly scheduler: SchedulerRegistry,
      private readonly httpService: HttpService,
      @Inject(WORKER_SERVICE) private readonly client: ClientKafka
  ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf(DATA_TOPIC);
        this.client.connect();
    }

  private retrieveData(httpService, client) {
    httpService.get(API_URL)
        .subscribe((v) => {
          const { data } = v;
          client.send(DATA_TOPIC, data)
              .subscribe();
        });
  }

  startRetrievingData() {
      const intervals = this.scheduler.getIntervals();
      const httpService = this.httpService;
      const client = this.client
      if(!intervals.includes(RETRIEVE_DATA_JOB)) {
          const interval = setInterval(() => this.retrieveData(httpService, client), DATA_RETRIEVAL_INTERVAL);
          this.scheduler.addInterval(RETRIEVE_DATA_JOB, interval);
      }
  }

  stopRetrievingData() {
    const intervals = this.scheduler.getIntervals();
    if(intervals.includes(RETRIEVE_DATA_JOB)) {
      this.scheduler.deleteInterval(RETRIEVE_DATA_JOB);
    }
  }

}
