import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationRepository } from '../repositories/location.repository';
import { WeatherMetricDocument } from '../schemas/metric.schema';
import { LocationService } from './location.service';

jest.mock('../repositories/location.repository');
jest.mock('../lib/location/helpers', () => ({
  fetchWeatherData: jest.fn()
}));
jest.mock('../repositories/metric.mapping', () => ({
  mapGeoJsonToMetricBatch: jest.fn()
}));

describe('LocationService', () => {
  let service: LocationService;
  let repository: LocationRepository;

  const mockLocation = {
    _id: 'someId',
    latitude: 51.5074,
    longitude: -0.1278,
    name: 'London'
  };

  const mockLocationDto: CreateLocationDto = {
    latitude: mockLocation.latitude,
    longitude: mockLocation.longitude,
    name: mockLocation.name
  };

  const mockInsertMany = jest.fn();
  const mockWeatherMetricModel = jest.fn().mockImplementation(() => ({
    insertMany: mockInsertMany
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationRepository,
        LocationService,
        {
          provide: getModelToken(WeatherMetricDocument.name),
          useValue: mockWeatherMetricModel,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    repository = module.get<LocationRepository>(LocationRepository);
  });

  describe('create', () => {
    it('should call repository with correct data', async () => {
      const createSpy = jest.spyOn(repository, 'create');

      await service.create(mockLocationDto);

      expect(createSpy).toHaveBeenCalledWith(mockLocationDto);
    })
  })
});
