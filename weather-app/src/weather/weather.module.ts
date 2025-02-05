import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './controllers/location.controller';
import { MetricController } from './controllers/metric.controller';
import { LocationRepository } from './repositories/location.repository';
import { LocationDocument, LocationDocumentSchema } from './schemas/location.schema';
import { WeatherMetricDocument, WeatherMetricSchema } from './schemas/metric.schema';
import { LocationService } from './services/location.service';
import { MetricService } from './services/metric.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LocationDocument.name, schema: LocationDocumentSchema }]),
    MongooseModule.forFeature([{ name: WeatherMetricDocument.name, schema: WeatherMetricSchema }])
  ],
  controllers: [
    LocationController,
    MetricController
  ],
  providers: [
    LocationService,
    LocationRepository,
    MetricService
  ],
})
export class WeatherModule { }
