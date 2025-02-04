import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { isISO8601 } from 'validator';

function ValidateISO8601AndTransformToDate() {
    return Transform(({ value }) => {
        if (value == null) return undefined;

        if (typeof value === 'string' && isISO8601(value)) {
            return new Date(value);
        }

        return new Date('invalid');
    });
}

export class RetrieveTemperaturesDto {
    @IsOptional()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'from= parameter must be a valid ISO 8601 date string' })
    from?: Date;

    @IsOptional()
    @ValidateISO8601AndTransformToDate()
    @IsDate({ message: 'to= parameter must be a valid ISO 8601 date string' })
    to?: Date;
}