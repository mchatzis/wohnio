import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateLocationDto } from '../dto/create-location.dto';
import { CreateMetricParams, TimeRangeDto } from '../dto/create-metric.dto';
import { GeoSpatialFiltersDto } from '../dto/find-geo-filters.dto';
import { RetrieveTemperaturesDto } from '../dto/retrieve-temperatures.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { isValidRange } from '../lib/location/helpers';
import { LocationService } from '../services/location.service';


@Controller('location')
export class LocationController {
  constructor(private readonly locationsService: LocationService) { }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get('geospatial-search')
  findWithGeoFilters(@Query() geoSpatialFiltersDto: GeoSpatialFiltersDto) {
    return this.locationsService.findWithGeoFilters(geoSpatialFiltersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Get(':id/metric')
  retrieveMetricById(
    @Param('id') id: string,
    @Query() query: RetrieveTemperaturesDto
  ) {
    //TODO: Extract this check into a validator, it shouldn't be here
    if (query.from && query.to && !isValidRange(query.from, query.to)) {
      throw new BadRequestException("'from' must be earlier than 'to'");
    }
    return this.locationsService.findHistoricalTemperatures(id, query.from, query.to);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Post(':id/metric')
  async createMetric(
    @Param() params: CreateMetricParams,
    @Body() timeRangeDto: TimeRangeDto,
    @Res() response: Response
  ) {
    if (!isValidRange(timeRangeDto.from, timeRangeDto.to)) {
      throw new BadRequestException("'from' must be earlier than 'to'");
    }
    const result = await this.locationsService.storeMetricData(params.id, timeRangeDto);

    if (result.insertedCount === 0) {
      return response.status(200).json({
        message: "None inserted. All weather metric data for that location and time range already existed."
      });
    }

    return response.status(201).json({
      message: `Inserted ${result.insertedCount} new entries in the database.`
    })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }

}