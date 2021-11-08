import {WorkerCommand} from '@app/common/enums';

export class CommandMessageDto {
    value: {
        command: WorkerCommand
    }
}
