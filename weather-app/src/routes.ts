import { ApiModule } from "@/api.module";
import { WeatherModule } from "@/weather/weather.module";
import { Routes } from "@nestjs/core";

export const routes: Routes = [
    {
        path: 'api',
        module: ApiModule,
        children: [
            {
                path: 'weather',
                module: WeatherModule,
            }
        ]
    }
]