import {ClientsModuleOptions, MicroserviceOptions, Transport} from '@nestjs/microservices';
import {WORKER_SERVICE} from '@app/common/const';
import {ClientProviderOptions} from '@nestjs/microservices/module/interfaces/clients-module.interface';
import {NestMicroserviceOptions} from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

export const KAFKA_CONFIG: NestMicroserviceOptions & MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: ['localhost:9092'],
        }
    }
};

export const KAFKA_CLIENT_CONFIG_FACTORY: (client: string) => ClientProviderOptions  = (clientId: string) =>  ({
    name: WORKER_SERVICE,
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: clientId,
            brokers: ['localhost:9092'],
        },
        consumer: {
            groupId: clientId
        }
    }
});

export const API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';

export const DATA_RETRIEVAL_INTERVAL = 5000;
