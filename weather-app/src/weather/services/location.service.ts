import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { fetchWeatherData } from '../lib/location/helpers';
import { LocationRepository } from '../repositories/location.repository';
import { mapGeoJsonToMetricDataBatch } from '../repositories/metric.mapping';
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
      days: 30
    });
    const processedWeatherData = mapGeoJsonToMetricDataBatch(weatherData, createdLocation._id.toString());
    await this.weatherMetricModel.insertMany(processedWeatherData);

    return createdLocation
  }

  findAll() {
    return this.locationRepository.findAll();
  }

  findOne(id: string) {
    return this.locationRepository.findById(id);
  }

  async findHistoricalTemperatures(id: string, startTime?: Date, endTime?: Date) {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new BadRequestException("Found no location with such ID");
    }

    const query: any = {
      "metadata.locationId": location._id.toString()
    };
    if (startTime || endTime) {
      query.timestamp = {};
      if (startTime) {
        query.timestamp.$gte = startTime;
      }
      if (endTime) {
        query.timestamp.$lt = endTime;
      }
    }

    return await this.weatherMetricModel.find(query);
  }


  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: string) {
    return this.locationRepository.delete(id);
  }
}