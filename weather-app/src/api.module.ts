import { WeatherModule } from '@/weather/weather.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [WeatherModule]
})
export class ApiModule { }
