import { Injectable, Inject } from '@nestjs/common';
import type { IActivityRepository } from '../domain/Iactivity.repository';
import { Activity } from '../domain/activity.entity';
import { ActivityType } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class ActivityService {
  private readonly MAX_ACTIVITIES = 100;

  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepo: IActivityRepository,
  ) {}

  async recordActivity(
    type: ActivityType,
    title: string,
    description?: string,
  ): Promise<Activity> {
    const activity = new Activity(
      randomUUID(),
      type,
      title,
      description,
      new Date(),
    );

    const created = await this.activityRepo.create(activity);

    const count = await this.activityRepo.count();
    if (count > this.MAX_ACTIVITIES) {
      const toDeleteCount = count - this.MAX_ACTIVITIES;
      const oldest = await this.activityRepo.findOldest(toDeleteCount);
      await this.activityRepo.deleteMany(oldest.map((a) => a.id));
    }

    return created;
  }

  async getRecent(limit = 10): Promise<Activity[]> {
    return this.activityRepo.findLatest(limit);
  }

  async getById(id: string): Promise<Activity | null> {
    return this.activityRepo.findById(id);
  }
}
