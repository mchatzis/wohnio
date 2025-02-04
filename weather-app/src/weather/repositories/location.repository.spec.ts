import mockLocationModel, { mockSave } from '@/weather/__test__/location.model.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { LocationDocument } from '../schemas/location.schema';
import { LocationRepository } from './location.repository';

describe('LocationRepository', () => {
    let repository: LocationRepository;

    const mockLocationCreateInput = {
        location: {
            type: "Point",
            coordinates: [-0.1278, 51.5074]
        },
        name: 'London'
    };

    const mockLocationDto = {
        latitude: mockLocationCreateInput.location.coordinates[1],
        longitude: mockLocationCreateInput.location.coordinates[0],
        name: mockLocationCreateInput.name
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LocationRepository,
                {
                    provide: getModelToken(LocationDocument.name),
                    useValue: mockLocationModel,
                },
            ],
        }).compile();

        repository = module.get<LocationRepository>(LocationRepository);
    });

    describe('create', () => {
        it('should create a location with correct data', async () => {
            mockSave.mockResolvedValue(mockLocationCreateInput);

            const result = await repository.create(mockLocationDto);

            expect(mockLocationModel).toHaveBeenCalledWith(mockLocationCreateInput);
            expect(result).toEqual(mockLocationCreateInput);
        });
    });
});