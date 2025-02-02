import { isGeoJSON } from "./type-guards";

describe('GeoJSON type guards', () => {
    const validGeoJSON: GeoJSON = {
        media_type: "application/json",
        type: "FeatureCollection",
        version: "v1",
        timestamps: [
            "2021-01-01T00:00+00:00",
            "2021-01-01T01:00+00:00",
            "2021-01-01T02:00+00:00",
            "2021-01-01T03:00+00:00"
        ],
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [16.361284255981445, 48.20684051513672]
                },
                properties: {
                    parameters: {
                        T2M: {
                            name: "air temperature",
                            unit: "degree_Celsius",
                            data: [-2.13, -1.82, -1.84, -2]
                        }
                    }
                }
            }
        ]
    };

    it('should validate a correct GeoJSON object', () => {
        expect(isGeoJSON(validGeoJSON)).toBe(true);
    });

    it('should invalidate an object with an incorrect type', () => {
        const invalidGeoJSON = { ...validGeoJSON, type: "InvalidType" };
        expect(isGeoJSON(invalidGeoJSON)).toBe(false);
    });

    it('should invalidate an object with incorrect timestamps', () => {
        const invalidGeoJSON = { ...validGeoJSON, timestamps: [123, 456] };
        expect(isGeoJSON(invalidGeoJSON)).toBe(false);
    });
});
