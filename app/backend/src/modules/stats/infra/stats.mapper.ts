import {
  RawDailyVisit,
  RawMonthlyVisit,
  RawStats,
} from '../domain/stats.types';
import { DailyVisit } from '../domain/dailyVisit.entity';
import { MonthlyVisit } from '../domain/monthlyVisit.entity';
import { Stats } from '../domain/stats.entity';

export class VisitStatsMapper {
  static toDailyEntity(raw: RawDailyVisit): DailyVisit {
    return new DailyVisit(raw.id, raw.date, raw.count);
  }

  static toMonthlyEntity(raw: RawMonthlyVisit): MonthlyVisit {
    return new MonthlyVisit(raw.id, raw.month, raw.total);
  }

  static toStatsEntity(raw: RawStats): Stats {
    return new Stats(raw.id, raw.totalVisitors);
  }
}
