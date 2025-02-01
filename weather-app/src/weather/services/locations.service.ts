import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { Location } from '../schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }

  create(createLocationDto: CreateLocationDto) {
    const newLocation = new this.locationModel(createLocationDto);
    return newLocation.save();
  }

  findAll() {
    return this.locationModel.find().exec();
  }

  findOne(id: string) {
    return this.locationModel.findById(id).exec();
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.locationModel.findByIdAndDelete(id).exec();
  }
}
