import { BadRequestException, HttpCode, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { TimeRangeDto } from '../dto/create-metric.dto';
import { GeoSpatialFiltersDto } from '../dto/find-geo-filters.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { fetchWeatherData, filterDuplicates, mapGeoJsonToMetricDataBatch } from '../lib/location/helpers';
import { isGeoJSON } from '../lib/location/type-guards';
import { LocationRepository } from '../repositories/location.repository';
import { WeatherMetricDocument } from '../schemas/metric.schema';

@Injectable()
export class LocationService {
  constructor(
    private locationRepository: LocationRepository,
    @InjectModel(WeatherMetricDocument.name) private weatherMetricModel: Model<WeatherMetricDocument>
  ) { }

  @HttpCode(201)
  async create(createLocationDto: CreateLocationDto) {
    try {
      const createdLocation = await this.locationRepository.create(createLocationDto);

      return createdLocation
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Location with the provided coordinates already exists.');
      }
      console.error("Database error while saving new location to db: ", error)
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.locationRepository.findAll();
  }

  findOne(id: string) {
    return this.locationRepository.findById(id);
  }

  findWithGeoFilters(geoSpatialFiltersDto: GeoSpatialFiltersDto) {
    return this.locationRepository.findWithGeoFilters(geoSpatialFiltersDto);
  }

  async findHistoricalTemperatures(id: string, startTime?: Date, endTime?: Date) {
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new BadRequestException("Found no location with such ID");
    }

    const query: any = {
      "metadata.locationId": id
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

    return this.weatherMetricModel.find(query);
  }

  async storeMetricData(id: string, timeRangeDto: TimeRangeDto) {
    const { from, to } = timeRangeDto;
    const location = await this.locationRepository.findById(id);
    if (!location) {
      throw new BadRequestException('Location not found');
    }

    const [longitude, latitude] = location.location.coordinates;
    const weatherData = await fetchWeatherData({ latitude, longitude, startTime: from, endTime: to });

    if (!isGeoJSON(weatherData)) {
      console.error(`Weather API response: ${weatherData}`);
      throw new InternalServerErrorException('Invalid weather data received from API');
    }

    const batch = mapGeoJsonToMetricDataBatch(weatherData, location._id.toString());
    const filteredBatch = await filterDuplicates(batch, location._id.toString(), this.weatherMetricModel);

    await this.weatherMetricModel.insertMany(filteredBatch, { ordered: false });
    return {
      insertedCount: filteredBatch.length
    };
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: string) {
    return this.locationRepository.delete(id);
  }
}