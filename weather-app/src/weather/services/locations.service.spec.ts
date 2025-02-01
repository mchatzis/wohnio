import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { getModelToken } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

describe('LocationsService', () => {
  let service: LocationsService;
  let model: Model<Location>;

  const mockLocation = {
    _id: 'someId',
    latitude: 51.5074,
    longitude: -0.1278,
    name: 'London'
  };

  const mockLocationModel = {
    new: jest.fn().mockReturned(mockLocation),
    constructor: jest.fn().mockReturned(mockLocation),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    model = module.get<Model<Location>>(getModelToken(Location.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationDto = {
        latitude: 51.5074,
        longitude: -0.1278,
        name: 'London'
      };

      const newLocation = { ...mockLocation };
      jest.spyOn(mockLocationModel, 'save').mockResolvedValue(newLocation);

      const result = await service.create(createLocationDto);
      expect(result).toEqual(newLocation);
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const locations = [mockLocation];
      jest.spyOn(mockLocationModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(locations),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(locations);
      expect(mockLocationModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single location', async () => {
      jest.spyOn(mockLocationModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockLocation),
      } as any);

      const result = await service.findOne('someId');
      expect(result).toEqual(mockLocation);
      expect(mockLocationModel.findById).toHaveBeenCalledWith('someId');
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const updateLocationDto: UpdateLocationDto = {
        name: 'Updated London'
      };
      const updatedLocation = { ...mockLocation, ...updateLocationDto };

      jest.spyOn(mockLocationModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedLocation),
      } as any);

      const result = await service.update('someId', updateLocationDto);
      expect(result).toEqual(updatedLocation);
      expect(mockLocationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'someId',
        updateLocationDto,
        { new: true }
      );
    });
  });

  describe('remove', () => {
    it('should remove a location', async () => {
      jest.spyOn(mockLocationModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockLocation),
      } as any);

      const result = await service.remove('someId');
      expect(result).toEqual(mockLocation);
      expect(mockLocationModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
    });
  });
});
