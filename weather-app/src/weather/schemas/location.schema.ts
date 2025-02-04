import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


// Had to split the two schemas, otherwise @Prop confuses mongodb's geojson property "type"
// with Prop's special key named "type"
@Schema({ _id: false })
class LocationEntity {
    @Prop({
        type: String,
        enum: ['Point'],
        required: true
    })
    type: 'Point';

    @Prop({
        type: [Number],
        required: true
    })
    coordinates: [longitude: number, latitude: number];
}
const LocationSchema = SchemaFactory.createForClass(LocationEntity);
export type Location = Pick<LocationEntity, 'type' | 'coordinates'>;


@Schema({ collection: 'locations' })
export class LocationDocument extends Document {
    _id: Types.ObjectId;

    @Prop({
        type: LocationSchema,
        required: true
    })
    location: Pick<LocationEntity, 'type' | 'coordinates'>;

    @Prop()
    name?: string;
}

export const LocationDocumentSchema = SchemaFactory.createForClass(LocationDocument);
export type LocationModel = Pick<LocationDocument, '_id' | 'location' | 'name'>;

