import { DailyVisit } from '../../domain/dailyVisit.entity';
import { MonthlyVisit } from '../../domain/monthlyVisit.entity';
import { Stats } from '../../domain/stats.entity';
import { DailyVisitDto, MonthlyVisitDto, StatsDto } from './stats.dto';

export class StatsDtoMapper {
  static toDailyDto(entity: DailyVisit): DailyVisitDto {
    return {
      id: entity.id,
      date: entity.date.toISOString(),
      count: entity.count,
    };
  }

  static toMonthlyDto(entity: MonthlyVisit): MonthlyVisitDto {
    return {
      id: entity.id,
      month: entity.month,
      total: entity.total,
    };
  }

  static toStatsDto(entity: Stats): StatsDto {
    return {
      id: entity.id,
      totalVisitors: entity.totalVisitors,
    };
  }
}
