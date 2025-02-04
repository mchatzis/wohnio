import { fetchWeatherData } from '@/weather/lib/location/helpers';
import { isGeoJSON } from '@/weather/lib/location/type-guards';
import { BadRequestException, HttpCode, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { LocationRepository } from '../repositories/location.repository';
import { mapGeoJsonToMetricDataBatch } from '../repositories/metric.mapping';
import { LocationModel } from '../schemas/location.schema';
import { WeatherMetricDocument } from '../schemas/metric.schema';

@Injectable()
export class LocationService {
  constructor(
    private locationRepository: LocationRepository,
    @InjectModel(WeatherMetricDocument.name) private weatherMetricModel: Model<WeatherMetricDocument>
  ) { }

  @HttpCode(201)
  async create(createLocationDto: CreateLocationDto) {
    let createdLocation: LocationModel;
    try {
      createdLocation = await this.locationRepository.create(createLocationDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Location with the provided coordinates already exists.');
      }
      console.error("Database error while saving new location to db: ", error)
      throw new InternalServerErrorException();
    }

    const location = {
      latitude: createdLocation.location.coordinates[1],
      longitude: createdLocation.location.coordinates[0],
    };
    const weatherData = await fetchWeatherData({ location, days: 30 });
    if (!isGeoJSON(weatherData)) {
      console.error("Weather api data are invalid.")
      throw new InternalServerErrorException()
    }

    const batch = mapGeoJsonToMetricDataBatch(weatherData, createdLocation._id.toString());
    await this.weatherMetricModel.insertMany(batch);

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