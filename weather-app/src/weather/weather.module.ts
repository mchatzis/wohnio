import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './controllers/location.controller';
import { LocationRepository } from './repositories/location.repository';
import { LocationDocument, LocationDocumentSchema } from './schemas/location.schema';
import { WeatherMetricDocument, WeatherMetricSchema } from './schemas/metric.schema';
import { LocationService } from './services/location.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LocationDocument.name, schema: LocationDocumentSchema }]),
    MongooseModule.forFeature([{ name: WeatherMetricDocument.name, schema: WeatherMetricSchema }])
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationRepository
  ],
})
export class WeatherModule { }
