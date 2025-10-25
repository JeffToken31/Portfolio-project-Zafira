import { Injectable, Inject } from '@nestjs/common';
import type { IStatsRepository } from '../domain/Istats.repository';
import { DailyVisit } from '../domain/dailyVisit.entity';
import { MonthlyVisit } from '../domain/monthlyVisit.entity';
import { Stats } from '../domain/stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @Inject('IStatsRepository')
    private readonly repo: IStatsRepository,
  ) {}

  async getToday(): Promise<DailyVisit | null> {
    return this.repo.findToday();
  }

  async getCurrentMonth(): Promise<MonthlyVisit | null> {
    return this.repo.findCurrentMonth();
  }

  async getGlobalStats(): Promise<Stats> {
    return this.repo.findGlobalStats();
  }

  async recordVisit(): Promise<{
    daily: DailyVisit;
    monthly: MonthlyVisit;
    global: Stats;
  }> {
    const daily = await this.repo.incrementToday();
    const monthly = await this.repo.updateMonthlyTotal();
    const global = await this.repo.updateGlobalTotal();

    return { daily, monthly, global };
  }
}
