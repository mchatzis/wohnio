import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { fetchWeatherData } from '../lib/location/helpers';
import { LocationRepository } from '../repositories/location.repository';
import { mapGeoJsonToMetricBatch } from '../repositories/metric.mapping';
import { WeatherMetricDocument } from '../schemas/metric.schema';

@Injectable()
export class LocationService {
  constructor(
    private locationRepository: LocationRepository,
    @InjectModel(WeatherMetricDocument.name) private weatherMetricModel: Model<WeatherMetricDocument>
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const createdLocation = await this.locationRepository.create(createLocationDto);
    const weatherData: GeoJSON = await fetchWeatherData({
      location: {
        latitude: createLocationDto.latitude,
        longitude: createLocationDto.longitude
      },
      days: 1
    });
    const processedWeatherData = mapGeoJsonToMetricBatch(weatherData, createdLocation._id.toString());
    const success = await this.weatherMetricModel.insertMany(processedWeatherData);

    return createdLocation
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