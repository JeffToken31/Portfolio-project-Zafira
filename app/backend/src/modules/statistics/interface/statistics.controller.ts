import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from '../app/statistics.service';

@Controller('statisticss')
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}

  @Get()
  async getAll() {
    return [];
  }
}
