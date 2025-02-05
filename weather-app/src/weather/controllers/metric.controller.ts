import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetricDto } from '../dto/create-metric.dto';
import { MetricService } from '../services/metric.service';

@Controller('metrics')
export class MetricController {
    constructor(private readonly metricService: MetricService) { }

    @Post('')
    async createMetrics(@Body() createMetricDto: CreateMetricDto) {
        await this.metricService.storeMetricData(createMetricDto)

        return { message: 'Weather metrics successfully fetched and stored' };
    }
}