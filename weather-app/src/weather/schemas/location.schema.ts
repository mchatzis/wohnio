import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type Location = {
    geoType: 'Point';
    coordinates: [longitude: number, latitude: number];
}
@Schema()
export class LocationDocument extends Document {
    @Prop({
        type: {
            geoType: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        required: true
    })
    location: Location;

    @Prop()
    name?: string;
}

export const LocationSchema = SchemaFactory.createForClass(LocationDocument);