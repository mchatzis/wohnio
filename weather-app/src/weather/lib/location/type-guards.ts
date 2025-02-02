export function isGeoJSON(obj: any): obj is GeoJSON {
    return (
        obj &&
        typeof obj.media_type === "string" &&
        obj.type === "FeatureCollection" &&
        typeof obj.version === "string" &&
        Array.isArray(obj.timestamps) &&
        obj.timestamps.every((ts: any) => typeof ts === "string") &&
        Array.isArray(obj.features) &&
        obj.features.every(isFeature)
    );
}

export function isFeature(obj: any): obj is Feature {
    return (
        obj &&
        obj.type === "Feature" &&
        isGeometry(obj.geometry) &&
        isProperties(obj.properties)
    );
}

export function isGeometry(obj: any): obj is Geometry {
    return (
        obj &&
        obj.type === "Point" &&
        Array.isArray(obj.coordinates) &&
        obj.coordinates.every((coord: any) => typeof coord === "number")
    );
}

export function isProperties(obj: any): obj is Properties {
    if (!obj || typeof obj !== "object" || !obj.parameters || typeof obj.parameters !== "object") {
        return false;
    }
    return Object.values(obj.parameters).every(isParameter);
}

export function isParameter(obj: any): obj is Parameter {
    return (
        obj &&
        typeof obj.name === "string" &&
        typeof obj.unit === "string" &&
        Array.isArray(obj.data) &&
        obj.data.every((num: any) => typeof num === "number")
    );
}