import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationRepository } from '../repositories/location.repository';
import { WeatherMetricDocument } from '../schemas/metric.schema';
import { LocationService } from './location.service';

vi.mock('../repositories/location.repository', () => ({
  LocationRepository: vi.fn().mockReturnValue({
    create: vi.fn()
  })
}));
vi.mock('../lib/location/helpers', () => ({
  fetchWeatherData: vi.fn()
}));
vi.mock('../repositories/metric.mapping', () => ({
  mapGeoJsonToMetricBatch: vi.fn()
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

  const mockInsertMany = vi.fn();
  const mockWeatherMetricModel = vi.fn().mockImplementation(() => ({
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
    it('placeholder', async () => {
      expect("placeholder").toBe("placeholder")
    })
  })
});
