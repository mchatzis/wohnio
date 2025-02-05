import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { ValidateISO8601AndTransformToDate } from './transformers';

export class TimeRangeDto {
    @ApiProperty()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'from= parameter must be a valid ISO 8601 date string' })
    from: Date;

    @ApiProperty()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'to= parameter must be a valid ISO 8601 date string' })
    to: Date;
}

export class CreateMetricParams {
    @ApiProperty({ description: 'MongoDB ObjectId (24 hex characters)' })
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}