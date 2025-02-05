import { BadRequestException, HttpCode, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMetricDto } from "../dto/create-metric.dto";
import { fetchWeatherData } from "../lib/location/helpers";
import { isGeoJSON } from "../lib/location/type-guards";
import { LocationRepository } from "../repositories/location.repository";
import { mapGeoJsonToMetricDataBatch } from "../repositories/metric.mapping";
import { WeatherMetricDocument } from "../schemas/metric.schema";

@Injectable()
export class MetricService {
    constructor(
        private locationRepository: LocationRepository,
        @InjectModel(WeatherMetricDocument.name) private weatherMetricModel: Model<WeatherMetricDocument>
    ) { }

    @HttpCode(201)
    async storeMetricData(createMetricDto: CreateMetricDto): Promise<void> {
        const { locationId, from, to } = createMetricDto;
        const location = await this.locationRepository.findById(locationId);
        if (!location) {
            throw new BadRequestException('Location not found');
        }

        const [longitude, latitude] = location.location.coordinates;
        const weatherData = await fetchWeatherData({ latitude, longitude, startTime: from, endTime: to });

        if (!isGeoJSON(weatherData)) {
            console.error(`Weather API response: ${weatherData}`);
            console.log(weatherData)
            throw new InternalServerErrorException('Invalid weather data received from API');
        }
        console.log(weatherData)

        const batch = mapGeoJsonToMetricDataBatch(weatherData, location._id.toString());
        await this.weatherMetricModel.insertMany(batch);
    }
}