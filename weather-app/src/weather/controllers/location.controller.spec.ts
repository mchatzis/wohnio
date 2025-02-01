import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationService } from '../services/location.service';
import { LocationController } from './location.controller';

jest.mock('../services/location.service');

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

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
      controllers: [LocationController],
      providers: [LocationService],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should call service.create with correct data', async () => {
    const createSpy = jest.spyOn(service, 'create');

    await controller.create(mockLocationDto);
    expect(createSpy).toHaveBeenCalledWith(mockLocationDto);
  });
});
