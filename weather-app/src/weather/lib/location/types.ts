type GeoJSONType = "FeatureCollection" | "Feature" | "Point";

interface GeoJSON {
    media_type: string;
    type: "FeatureCollection";
    version: string;
    timestamps: string[];
    features: Feature[];
}

interface Feature {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    type: "Point";
    coordinates: number[];
}

interface Properties {
    parameters: {
        [key: string]: Parameter;
    };
}

interface Parameter {
    name: string;
    unit: string;
    data: number[];
}
