import { InternalServerErrorException } from "@nestjs/common";
import { format, subDays } from "date-fns";
import { isGeoJSON } from "./type-guards";

/**
 * @param days Days to go back for start time
 * @returns [start, end] in string format
 */
export function getTimeRangeStrings(days: number) {
    const end = format(new Date(), "yyyy-MM-dd");
    const start = format(subDays(new Date(), days), "yyyy-MM-dd");
    return [start, end];
}

interface fetchWeatherDataParams {
    location: {
        latitude: number;
        longitude: number;
    };
    days: number;
}
export async function fetchWeatherData({ location, days }: fetchWeatherDataParams) {
    const baseUrl = 'https://dataset.api.hub.geosphere.at/v1/timeseries/historical/inca-v1-1h-1km';
    const [startTime, endTime] = getTimeRangeStrings(days);
    const params = new URLSearchParams({
        parameters: 'T2M',
        start: startTime,
        end: endTime,
        lat_lon: `${location.latitude},${location.longitude}`,
        output_format: 'geojson'
    });

    const url = `${baseUrl}?${params.toString()}`;

    const weather_data = await fetch(url).then(res => res.json());
    if (!isGeoJSON(weather_data)) {
        throw new InternalServerErrorException("Weather api returned invalid data.")
    }

    return weather_data;
};
