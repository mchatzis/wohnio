import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;
}