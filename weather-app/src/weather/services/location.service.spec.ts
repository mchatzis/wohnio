import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationRepository } from '../repositories/location.repository';
import { LocationsService } from './location.service';

jest.mock('../repositories/location.repository');

describe('LocationsService', () => {
  let service: LocationsService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationRepository, LocationsService],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
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
