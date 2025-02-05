interface fetchWeatherDataParams {
    latitude: number;
    longitude: number;
    startTime: Date;
    endTime: Date;
}
export async function fetchWeatherData({ latitude, longitude, startTime, endTime }: fetchWeatherDataParams) {
    const baseUrl = 'https://dataset.api.hub.geosphere.at/v1/timeseries/historical/inca-v1-1h-1km';
    const formattedStart = startTime.toISOString().slice(0, 16);
    const formattedEnd = endTime.toISOString().slice(0, 16);

    const params = new URLSearchParams({
        parameters: 'T2M',
        start: formattedStart,
        end: formattedEnd,
        lat_lon: `${latitude},${longitude}`,
        output_format: 'geojson'
    });

    const url = `${baseUrl}?${params.toString()}`;

    const weather_data = await fetch(url).then(res => res.json());

    return weather_data;
};
