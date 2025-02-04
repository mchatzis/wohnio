import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { GeoSpatialFiltersDto } from '../dto/find-geo-filters.dto';
import { RetrieveTemperaturesDto } from '../dto/retrieve-temperatures.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
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

  @Get(':id/temperatures')
  retrieveTemperaturesById(
    @Param('id') id: string,
    @Query() query: RetrieveTemperaturesDto
  ) {
    return this.locationsService.findHistoricalTemperatures(id, query.from, query.to);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
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
