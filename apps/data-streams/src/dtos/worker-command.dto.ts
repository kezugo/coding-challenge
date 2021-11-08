import {IsEnum, IsNotEmpty} from 'class-validator';
import {WorkerCommand} from '@app/common/enums';

export class WorkerCommandDto {

    @IsNotEmpty()
    @IsEnum(WorkerCommand)
    command: WorkerCommand;

    constructor(partial: Partial<WorkerCommandDto>) {
        Object.assign(this, partial);
    }
}
