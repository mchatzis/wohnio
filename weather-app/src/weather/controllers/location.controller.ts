import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateLocationDto } from '../dto/create-location.dto';
import { MongoIdParams, TimeRangeDto } from '../dto/create-metric.dto';
import { GeoSpatialFiltersDto } from '../dto/find-geo-filters.dto';
import { RetrieveMetricDataDto } from '../dto/retrieve-metric-data.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { isValidRange } from '../lib/location/helpers';
import { LocationService } from '../services/location.service';


@Controller('location')
export class LocationController {
  constructor(private readonly locationsService: LocationService) { }

  @Get()
  @ApiOperation({ summary: "Get all locations" })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get('geospatial-search')
  @ApiOperation({ summary: "Get locations within radius" })
  findWithGeoFilters(@Query() geoSpatialFiltersDto: GeoSpatialFiltersDto) {
    return this.locationsService.findWithGeoFilters(geoSpatialFiltersDto);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get location by ID" })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Get(':id/metric')
  @ApiOperation({ summary: "Get weather metric data for location" })
  retrieveMetricById(
    @Param() params: MongoIdParams,
    @Query() query: RetrieveMetricDataDto
  ) {
    //TODO: Extract this check into a validator, it shouldn't be here
    if (query.from && query.to && !isValidRange(query.from, query.to)) {
      throw new BadRequestException("'from' must be earlier than 'to'");
    }
    return this.locationsService.findHistoricalTemperatures(params.id, query.from, query.to);
  }

  @Post()
  @ApiOperation({ summary: "Create a location" })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Post(':id/metric')
  @ApiOperation({ summary: "Create weather metric data for location" })
  async createMetric(
    @Param() params: MongoIdParams,
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
  @ApiOperation({ summary: "Update location" })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete location" })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }

}