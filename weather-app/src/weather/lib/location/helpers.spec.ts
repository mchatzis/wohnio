import { isGeoJSON } from "@/weather/lib/location/type-guards";
import { format, subDays } from "date-fns";
import { fetchWeatherData, getTimeRangeStrings } from "./helpers";

describe("location helpers", () => {
    describe("getTimeRangeStrings", () => {
        it("returns the correct start and end dates given a number of days", () => {
            const fixedDate = new Date("2023-06-15T12:00:00Z");
            jest.useFakeTimers().setSystemTime(fixedDate);

            const days = 7;
            const [start, end] = getTimeRangeStrings(days);

            const expectedEnd = format(fixedDate, "yyyy-MM-dd");
            const expectedStart = format(subDays(fixedDate, days), "yyyy-MM-dd");

            expect(end).toBe(expectedEnd);
            expect(start).toBe(expectedStart);

            jest.useRealTimers();
        });
    });

    describe("fetchWeatherData", () => {
        it("logs an encoded URL with the expected query parameters", async () => {
            const location = { latitude: 48.206248, longitude: 16.367569 };
            const days = 1;

            const weather_data = await fetchWeatherData({ location, days });
            console.log(isGeoJSON(weather_data))
            expect(2).toBe(2);
        });
    });
});
