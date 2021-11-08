import {IsEnum} from 'class-validator';
import {WorkerCommandStatus} from '@app/common/enums';

export class WorkerCommandResultDto {
    @IsEnum(WorkerCommandStatus)
    status: WorkerCommandStatus;

    constructor(partial: Partial<WorkerCommandResultDto>) {
        Object.assign(this, partial);
    }
}
