import { InternalServerErrorException } from "@nestjs/common";
import { WeatherMetric } from "../schemas/metric.schema";


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