import { InternalServerErrorException } from "@nestjs/common";
import { mapGeoJsonToMetricDataBatch } from "./metric.mapping";

describe('mapGeoJsonToMetric', () => {
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
    const testLocationId = "locationID_example";

    it('parses one data point correctly', () => {
        const expectedTimestamps = validGeoJSON.timestamps.map(ts => new Date(ts));
        const expectedValues = validGeoJSON.features[0].properties.parameters['T2M'].data;

        const result = mapGeoJsonToMetricDataBatch(validGeoJSON, testLocationId);

        expect(result).toHaveLength(4);
        result.forEach((dataPoint, index) => {
            expect(dataPoint.value).toBe(expectedValues[index]);
            expect(dataPoint.timestamp.toISOString()).toEqual(expectedTimestamps[index].toISOString());
            expect(dataPoint.metadata).toEqual({
                locationId: testLocationId,
                metricName: "T2M"
            });
        });
    });

    it("throws an InternalServerErrorException when timestamps and data lengths don't match", () => {
        // Clone validGeoJSON and modify to have a mismatched length.
        const invalidGeoJSON = {
            ...validGeoJSON,
            timestamps: [
                "2021-01-01T00:00+00:00",
                "2021-01-01T01:00+00:00"
            ]
        };

        expect(() => {
            mapGeoJsonToMetricDataBatch(invalidGeoJSON, testLocationId);
        }).toThrow(InternalServerErrorException);
    });
})
