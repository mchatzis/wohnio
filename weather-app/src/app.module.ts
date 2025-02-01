import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { routes } from './routes';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/weather-db?authSource=admin'),
    ApiModule,
    RouterModule.register(routes)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
