import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './controllers/location.controller';
import { LocationRepository } from './repositories/location.repository';
import { Location, LocationSchema } from './schemas/location.schema';
import { LocationsService } from './services/location.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    LocationRepository
  ],
})
export class WeatherModule { }
