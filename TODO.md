Here's the corrected markdown:

- [ ] Switch to Vitest (jest is soooooo slow)
- [ ] Need more thorough testing
- [ ] Validate coordinates data:
    - Valid longitude values are between -180 and 180, both inclusive.
    - Valid latitude values are between -90 and 90, both inclusive.
- [ ] Error handling
- [x] Add location id index (due to high access frequency)
- [ ] Allow query parameter for defining how many days to the past for historical data
- [ ] env vars in .env
- [x] Find location in range / near
- [ ] Weather API: Check for duplicates??? Remove them??? (In general, data validation of api data)
- [ ] Documentation
- [ ] How would you extend to include:
    - multiple weather metrics (not only T2M)
    -
- [ ] Put MongoDB models into their own class instead of 
using @InjectModel to inject them (will make mocking easier?)