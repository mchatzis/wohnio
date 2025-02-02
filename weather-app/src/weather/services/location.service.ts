import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { fetchWeatherData } from '../lib/location/helpers';
import { LocationRepository } from '../repositories/location.repository';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) { }

  async create(createLocationDto: CreateLocationDto) {
    // Query weather api
    const weatherData = await fetchWeatherData({
      location: {
        latitude: 48.206248,
        longitude: 16.367569
      },
      days: 1
    });
    // Store weather data
    // Store location and return it
    const savedLocation = this.locationRepository.create(createLocationDto);
    return savedLocation
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