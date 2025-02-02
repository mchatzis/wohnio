import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Location = {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
}

// Had to split the schemas, otherwise @Prop gets confused because of geojson property 
// named "type", hence confusing the decorator logic
@Schema({ _id: false })
class LocationEntity {
    @Prop({
        type: String,
        enum: ['Point'],
        required: true
    })
    type: string;

    @Prop({
        type: [Number],
        required: true
    })
    coordinates: number[];
}
const LocationSchema = SchemaFactory.createForClass(LocationEntity);


@Schema()
export class LocationDocument extends Document {
    @Prop({
        type: LocationSchema,
        required: true
    })
    location: Location;

    @Prop()
    name?: string;
}

export const LocationDocumentSchema = SchemaFactory.createForClass(LocationDocument);