import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { startOfDay, format } from 'date-fns';
import { VisitStatsMapper } from '../infra/stats.mapper';
import { DailyVisit } from '../domain/dailyVisit.entity';
import { MonthlyVisit } from '../domain/monthlyVisit.entity';
import { Stats } from '../domain/stats.entity';
import type { IStatsRepository } from '../domain/Istats.repository';
import type {
  RawDailyVisit,
  RawMonthlyVisit,
  RawStats,
} from '../domain/stats.types';

@Injectable()
export class VisitStatsRepository implements IStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async incrementToday(): Promise<DailyVisit> {
    const today = startOfDay(new Date());

    const existing = await this.prisma.dailyVisit.findUnique({
      where: { date: today },
    });

    let result: RawDailyVisit;

    if (existing) {
      result = await this.prisma.dailyVisit.update({
        where: { date: today },
        data: { count: { increment: 1 } },
      });
    } else {
      result = await this.prisma.dailyVisit.create({
        data: { date: today, count: 1 },
      });
    }

    return VisitStatsMapper.toDailyEntity(result);
  }

  async findToday(): Promise<DailyVisit | null> {
    const today = startOfDay(new Date());
    const raw = await this.prisma.dailyVisit.findUnique({
      where: { date: today },
    });
    return raw ? VisitStatsMapper.toDailyEntity(raw) : null;
  }

  async updateMonthlyTotal(): Promise<MonthlyVisit> {
    const month = format(new Date(), 'yyyy-MM');
    const monthStart = new Date(`${month}-01T00:00:00.000Z`);
    const monthEnd = new Date(
      new Date(monthStart).setMonth(monthStart.getMonth() + 1),
    );

    const dailyVisits = await this.prisma.dailyVisit.findMany({
      where: { date: { gte: monthStart, lt: monthEnd } },
    });

    const total = dailyVisits.reduce((acc, v) => acc + v.count, 0);

    let result: RawMonthlyVisit;

    const existing = await this.prisma.monthlyVisit.findUnique({
      where: { month },
    });

    if (existing) {
      result = await this.prisma.monthlyVisit.update({
        where: { month },
        data: { total },
      });
    } else {
      result = await this.prisma.monthlyVisit.create({
        data: { month, total },
      });
    }

    return VisitStatsMapper.toMonthlyEntity(result);
  }

  async findCurrentMonth(): Promise<MonthlyVisit | null> {
    const month = format(new Date(), 'yyyy-MM');
    const raw = await this.prisma.monthlyVisit.findUnique({ where: { month } });
    return raw ? VisitStatsMapper.toMonthlyEntity(raw) : null;
  }

  async updateGlobalTotal(): Promise<Stats> {
    const dailyVisits = await this.prisma.dailyVisit.findMany();
    const total = dailyVisits.reduce((acc, v) => acc + v.count, 0);

    let result: RawStats;

    const existing = await this.prisma.stats.findUnique({ where: { id: 1 } });

    if (existing) {
      result = await this.prisma.stats.update({
        where: { id: 1 },
        data: { totalVisitors: total },
      });
    } else {
      result = await this.prisma.stats.create({
        data: { id: 1, totalVisitors: total },
      });
    }

    return VisitStatsMapper.toStatsEntity(result);
  }

  async findGlobalStats(): Promise<Stats> {
    let raw = await this.prisma.stats.findUnique({ where: { id: 1 } });
    if (!raw) {
      raw = await this.prisma.stats.create({
        data: { id: 1, totalVisitors: 0 },
      });
    }
    return VisitStatsMapper.toStatsEntity(raw);
  }
}
