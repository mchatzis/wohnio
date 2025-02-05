import { addHours } from "date-fns";
import { describe, expect, it } from "vitest";
import { fetchWeatherData } from "./helpers";
import { isGeoJSON } from "./type-guards";

describe("location helpers", () => {
    describe("fetchWeatherData", () => {
        it("logs an encoded URL with the expected query parameters", async () => {
            const startTime = new Date("2025-01-01T12:00:00Z");

            const vienna = { latitude: 48.206248, longitude: 16.367569 };
            const weather_data = await fetchWeatherData({
                latitude: vienna.latitude,
                longitude: vienna.longitude,
                startTime: startTime,
                endTime: addHours(startTime, 1)
            });
            console.log(weather_data)

            expect(isGeoJSON(weather_data)).toBeTruthy();
            expect(weather_data.timestamps.length).toBe(2);
        });
    });
});
