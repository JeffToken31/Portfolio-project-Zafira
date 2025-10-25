import { DailyVisit } from './dailyVisit.entity';
import { MonthlyVisit } from './monthlyVisit.entity';
import { Stats } from './stats.entity';

export interface IStatsRepository {
  findToday(): Promise<DailyVisit | null>;
  incrementToday(): Promise<DailyVisit>;

  findCurrentMonth(): Promise<MonthlyVisit | null>;
  updateMonthlyTotal(): Promise<MonthlyVisit>;

  findGlobalStats(): Promise<Stats>;
  updateGlobalTotal(): Promise<Stats>;
}
