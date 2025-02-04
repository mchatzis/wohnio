import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GeoSpatialFiltersDto {
    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    radius: number;
}
