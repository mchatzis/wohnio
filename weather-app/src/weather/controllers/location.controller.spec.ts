import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationsService } from '../services/location.service';
import { LocationsController } from './location.controller';

jest.mock('../services/location.service');

describe('LocationsController', () => {
  let controller: LocationsController;
  let service: LocationsService;

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
      controllers: [LocationsController],
      providers: [LocationsService],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    service = module.get<LocationsService>(LocationsService);
  });

  it('should call service.create with correct data', async () => {
    const createSpy = jest.spyOn(service, 'create');

    await controller.create(mockLocationDto);
    expect(createSpy).toHaveBeenCalledWith(mockLocationDto);
  });
});
