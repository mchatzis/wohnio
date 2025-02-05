import { CreateLocationDto } from "../dto/create-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";
import { Location } from "../schemas/location.schema";


type LocationCreateInput = {
    location: Location,
    name?: string
}
export function mapDtoToModelCreate(dto: CreateLocationDto): LocationCreateInput {
    return {
        location: {
            type: 'Point',
            coordinates: [dto.longitude, dto.latitude],
        },
        name: dto.name,
    };
}

type LocationUpdateInput = {
    location?: Location;
    name?: string;
};
export function mapDtoToModelUpdate(dto: UpdateLocationDto): LocationUpdateInput {
    return {
        ...{
            location: {
                type: 'Point',
                coordinates: [dto.longitude, dto.latitude],
            },
        },
        ...(dto.name !== undefined && {
            name: dto.name,
        })
    };
}