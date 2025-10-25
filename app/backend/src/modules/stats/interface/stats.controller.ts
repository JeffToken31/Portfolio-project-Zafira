import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatsService } from '../app/stats.service';
import { StatsDtoMapper } from './dto/stats-dto.mapper';
import { DailyVisitDto, MonthlyVisitDto, StatsDto } from './dto/stats.dto';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('daily/today')
  @ApiOperation({ summary: 'Get today visit counter' })
  async getToday(): Promise<DailyVisitDto | null> {
    const entity = await this.statsService.getToday();
    return entity ? StatsDtoMapper.toDailyDto(entity) : null;
  }

  @Get('monthly/current')
  @ApiOperation({ summary: 'Get current month total visits' })
  async getCurrentMonth(): Promise<MonthlyVisitDto | null> {
    const entity = await this.statsService.getCurrentMonth();
    return entity ? StatsDtoMapper.toMonthlyDto(entity) : null;
  }

  @Get('global')
  @ApiOperation({ summary: 'Get global stats' })
  @ApiResponse({ status: 200, description: 'Global stats found.' })
  async getGlobalStats(): Promise<StatsDto> {
    const entity = await this.statsService.getGlobalStats();
    return StatsDtoMapper.toStatsDto(entity);
  }

  @Post('hit')
  @ApiOperation({ summary: 'Record a new visit and update all stats' })
  async hit() {
    const { daily, monthly, global } = await this.statsService.recordVisit();
    return {
      daily: StatsDtoMapper.toDailyDto(daily),
      monthly: StatsDtoMapper.toMonthlyDto(monthly),
      global: StatsDtoMapper.toStatsDto(global),
    };
  }
}
