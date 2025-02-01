import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './controllers/location.controller';
import { LocationRepository } from './repositories/location.repository';
import { Location, LocationSchema } from './schemas/location.schema';
import { LocationService } from './services/location.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationRepository
  ],
})
export class WeatherModule { }
