import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from '../infra/statistics.repository';

@Injectable()
export class StatisticsService {
  constructor(private readonly repo: StatisticsRepository) {}
}
