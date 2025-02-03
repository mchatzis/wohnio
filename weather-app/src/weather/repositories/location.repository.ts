import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { LocationDocument } from '../schemas/location.schema';
import { mapDtoToModelUpdate, mapDtoToModelCreate as mapDtoToNewLocationInput } from './location.mapping';


@Injectable()
export class LocationRepository {
    constructor(@InjectModel(LocationDocument.name) private locationModel: Model<LocationDocument>) { }

    create(createLocationDto: CreateLocationDto) {
        const createLocationInput = mapDtoToNewLocationInput(createLocationDto);
        const newLocation = new this.locationModel(createLocationInput);
        return newLocation.save();
    }

    findAll() {
        return this.locationModel.find().exec();
    }

    findById(id: string) {
        return this.locationModel.findById(id).exec();
    }

    update(id: string, updateLocationDto: UpdateLocationDto) {
        const updateLocationInput = mapDtoToModelUpdate(updateLocationDto);
        return this.locationModel
            .findByIdAndUpdate(id, updateLocationInput, { new: true })
            .exec();
    }

    delete(id: string) {
        return this.locationModel.findByIdAndDelete(id).exec();
    }
}