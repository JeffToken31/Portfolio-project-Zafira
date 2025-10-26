import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IActivityRepository } from '../domain/Iactivity.repository';
import { Activity } from '../domain/activity.entity';
import { ActivityMapper, RawActivityData } from './activity.mapper';

@Injectable()
export class ActivityRepository implements IActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaToDomain(raw: RawActivityData | null): Activity {
    if (!raw) throw new Error('Activity not found');
    return ActivityMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Activity | null> {
    const raw = await this.prisma.activity.findUnique({ where: { id } });
    return raw ? this.mapPrismaToDomain(raw) : null;
  }

  async findAll(): Promise<Activity[]> {
    const raws = await this.prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((raw) => ActivityMapper.toDomain(raw));
  }

  async findLatest(limit: number): Promise<Activity[]> {
    const raws = await this.prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return raws.map((raw) => ActivityMapper.toDomain(raw));
  }

  async create(activity: Activity): Promise<Activity> {
    const data = ActivityMapper.toPersistence(activity);
    const raw = await this.prisma.activity.create({ data });
    return this.mapPrismaToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activity.delete({ where: { id } });
  }

  async count(): Promise<number> {
    return this.prisma.activity.count();
  }

  async findOldest(limit: number): Promise<Activity[]> {
    const raws = await this.prisma.activity.findMany({
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
    return raws.map((raw) => ActivityMapper.toDomain(raw));
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.activity.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
