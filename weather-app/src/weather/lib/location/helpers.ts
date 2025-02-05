import { WeatherMetric, WeatherMetricDocument } from "@/weather/schemas/metric.schema";
import { InternalServerErrorException } from "@nestjs/common";
import { Model } from "mongoose";

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

/**
 * Filters out documents from the batch that have timestamps already present in the DB for the given location.
 * @param batch - The batch of metric documents to insert.
 * @param locationId - The location id associated with the documents.
 * @param metricModel - The Mongoose model for the time-series collection.
 * @returns The filtered batch containing only new documents.
 */
export async function filterDuplicates(
    batch: WeatherMetric[],
    locationId: string,
    metricModel: Model<WeatherMetricDocument>
): Promise<WeatherMetric[]> {
    const timestamps = batch.map(doc => doc.timestamp);

    const existingDocs = await metricModel.find(
        {
            'metadata.locationId': locationId,
            timestamp: { $in: timestamps },
        },
        { timestamp: 1 }
    ).lean();

    const existingTimestamps = new Set(existingDocs.map(doc => new Date(doc.timestamp).getTime()));

    return batch.filter(doc => !existingTimestamps.has(doc.timestamp.getTime()));
}

export function mapGeoJsonToMetricDataBatch(geoData: GeoJSON, locationId: string) {
    const timestamps = geoData.timestamps;
    const pointData = geoData.features[0]
    const data = pointData.properties.parameters['T2M'].data;
    if (timestamps.length !== data.length) {
        console.error("It appears timestamps don't match with data one-to-one");
        throw new InternalServerErrorException();
    }

    const metricDataPoints: WeatherMetric[] = timestamps.map((timestamp, index) => {
        const dateTimestamp = new Date(timestamp);
        return {
            timestamp: dateTimestamp,
            metadata: {
                locationId: locationId,
                metricName: "T2M"
            },
            value: data[index]
        }
    })

    return metricDataPoints
}

export function isValidRange(from: Date, to: Date) {
    return new Date(from) < new Date(to)
}
