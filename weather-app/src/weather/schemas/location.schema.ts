import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type Location = {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
}

// Had to split the two schemas, otherwise @Prop confuses mongodb geojson property 
// "type" with Prop's special object key "type"
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


@Schema({ collection: 'locations' })
export class LocationDocument extends Document {
    _id: Types.ObjectId;

    @Prop({
        type: LocationSchema,
        required: true
    })
    location: Location;

    @Prop()
    name?: string;
}

export const LocationDocumentSchema = SchemaFactory.createForClass(LocationDocument);