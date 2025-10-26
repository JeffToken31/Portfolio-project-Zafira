import { Prisma } from '@prisma/client';
import { Activity } from '../domain/activity.entity';

export type RawActivityData = Prisma.ActivityGetPayload<{
  select: {
    id: true;
    type: true;
    title: true;
    description: true;
    createdAt: true;
  };
}>;

export class ActivityMapper {
  static toDomain(raw: RawActivityData): Activity {
    return new Activity(
      raw.id,
      raw.type,
      raw.title,
      raw.description ?? undefined,
      raw.createdAt,
    );
  }

  static toPersistence(activity: Activity): Prisma.ActivityCreateInput {
    return {
      type: activity.type,
      title: activity.title,
      description: activity.description ?? null,
    };
  }
}
