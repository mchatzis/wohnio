import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { ValidateISO8601AndTransformToDate } from './transformers';

export class RetrieveMetricDataDto {
    @ApiProperty()
    @IsOptional()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'from= parameter must be a valid ISO 8601 date string' })
    from?: Date;

    @ApiProperty()
    @IsOptional()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'to= parameter must be a valid ISO 8601 date string' })
    to?: Date;
}