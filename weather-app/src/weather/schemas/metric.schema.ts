import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherMetric = Pick<WeatherMetricDocument, 'timestamp' | 'metadata' | "value">;
@Schema({
    collection: 'inca_historical',
    timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours',
    }
})
export class WeatherMetricDocument extends Document {
    @Prop({ required: true })
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

    @Prop({ required: true })
    value: number;
}

export const WeatherMetricSchema = SchemaFactory.createForClass(WeatherMetricDocument);