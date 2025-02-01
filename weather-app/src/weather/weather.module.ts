import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './controllers/locations.controller';
import { Location, LocationSchema } from './schemas/location.schema';
import { LocationsService } from './services/locations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class WeatherModule { }
