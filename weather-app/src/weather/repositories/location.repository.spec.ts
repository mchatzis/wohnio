import mockLocationModel, { mockSave } from '@/weather/__test__/location.model.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Location } from '../schemas/location.schema';
import { LocationRepository } from './location.repository';

describe('LocationRepository', () => {
    let repository: LocationRepository;

    const mockLocation = {
        _id: 'someId',
        latitude: 51.5074,
        longitude: -0.1278,
        name: 'London'
    };

    const mockLocationDto = {
        latitude: mockLocation.latitude,
        longitude: mockLocation.longitude,
        name: mockLocation.name
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocationRepository,
                {
                    provide: getModelToken(Location.name),
                    useValue: mockLocationModel,
                },
            ],
        }).compile();

        repository = module.get<LocationRepository>(LocationRepository);
    });

    describe('create', () => {
        it('should create a location with correct data', async () => {
            mockSave.mockResolvedValue(mockLocation);

            const result = await repository.create(mockLocationDto);

            expect(mockLocationModel).toHaveBeenCalledWith(mockLocationDto);
            expect(result).toEqual(mockLocation);
        });
    });

    // describe('findAll', () => {
    //     it('should return all locations', async () => {
    //         const locations = [{ name: 'Location 1' }, { name: 'Location 2' }];
    //         mockLocationModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(locations) });

    //         const result = await repository.findAll();

    //         expect(result).toEqual(locations);
    //     });
    // });

    // describe('findById', () => {
    //     it('should return a location by id', async () => {
    //         const location = { name: 'Test Location' };
    //         mockLocationModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(location) });

    //         const result = await repository.findById('testId');

    //         expect(result).toEqual(location);
    //     });
    // });

    // describe('update', () => {
    //     it('should update a location', async () => {
    //         const updateLocationDto = { name: 'Updated Location' };
    //         mockLocationModel.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(updateLocationDto) });

    //         const result = await repository.update('testId', updateLocationDto);

    //         expect(result).toEqual(updateLocationDto);
    //     });
    // });

    // describe('delete', () => {
    //     it('should delete a location', async () => {
    //         const location = { name: 'Test Location' };
    //         mockLocationModel.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(location) });

    //         const result = await repository.delete('testId');

    //         expect(result).toEqual(location);
    //     });
    // });
});