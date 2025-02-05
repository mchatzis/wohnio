import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateMetricDto } from '../dto/create-metric.dto';
import { MetricService } from '../services/metric.service';


@Controller('metrics')
export class MetricController {
    constructor(private readonly metricService: MetricService) { }

    @Post('')
    async createMetrics(@Body() createMetricDto: CreateMetricDto, @Res() response: Response) {
        const result = await this.metricService.storeMetricData(createMetricDto);

        if (result.insertedCount === 0) {
            return response.status(200).json({
                message: "None inserted. All weather metric data for that location and time range already existed."
            });
        }

        return response.status(201).json({
            message: `Inserted ${result.insertedCount} new entries in the database.`
        })
    }
}