import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/weather-db?authSource=admin'),
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
