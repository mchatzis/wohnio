import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    collection: 'inca_historical',
    timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours',
    }
})
export class WeatherMetricDocument extends Document {
    @Prop({
        type: Date,
        required: true
    })
    timestamp: Date;

    @Prop({
        type: {
            locationId: String,
            metricName: String,
        },
        required: true,
    })
    metadata: {
        locationId: string;
        metricName: string;
    };

    @Prop({
        type: Number,
        required: true
    })
    value: number;
}

export const WeatherMetricSchema = SchemaFactory.createForClass(WeatherMetricDocument);
export type WeatherMetric = Pick<WeatherMetricDocument, 'timestamp' | 'metadata' | "value">;


WeatherMetricSchema.index({ "metadata.locationId": 1, timestamp: -1 });
