import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationsService {
  constructor(private locationRepository: LocationRepository) { }

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.create(createLocationDto);
  }

  findAll() {
    return this.locationRepository.findAll();
  }

  findOne(id: string) {
    return this.locationRepository.findById(id);
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: string) {
    return this.locationRepository.delete(id);
  }
}