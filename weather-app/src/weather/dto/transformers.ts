import { Transform } from "class-transformer";
import { isISO8601 } from "class-validator";

export function ValidateISO8601AndTransformToDate() {
    return Transform(({ value }) => {
        if (value == null) return undefined;

        if (typeof value === 'string' && isISO8601(value)) {
            return new Date(value);
        }

        return new Date('invalid');
    });
}