import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule} from '@nestjs/microservices';
import {KAFKA_CLIENT_CONFIG_FACTORY, KAFKA_CONFIG} from '@app/common';

@Module({
    imports: [
        ClientsModule.register([
            KAFKA_CLIENT_CONFIG_FACTORY('worker')
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
