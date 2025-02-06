Here's the corrected markdown:

- [x] Find location in range / near
- [x] Add location id index (due to high access frequency)
- [x] Switch to Vitest
- [x] Validate coordinates data:
    - Valid longitude values are between -180 and 180, both inclusive.
    - Valid latitude values are between -90 and 90, both inclusive.
- [ ] Need more testinggggg
- [ ] Error handling check
- [ ] Allow query parameter for defining how many days to the past for historical data
- [ ] Weather API: Check for duplicates??? Remove them??? (In general, data validation of api data)
- [ ] Documentation
- [ ] Put MongoDB models into their own class instead of using @InjectModel to inject them (will make mocking easier?)
- [ ] Why is db called 'test' now?
- [ ] How would you extend to include:
    - multiple weather metrics (not only T2M)

LLM suggestions:
- Manual Response Injection: In createMetric, the controller uses the Express response (@Res() response) instead of relying on NestJS's built-in response handling.
Alternative: Remove manual response handling to let Nest handle responses and errors consistently.
- Incomplete Error Checks:
The fetchWeatherData function doesn’t check the HTTP response status before parsing JSON, which might lead to unhandled errors when the external API fails.
The mapping function (mapGeoJsonToMetricDataBatch) assumes that geoData.features contains at least one element. Adding a check for empty features would make it more robust.
