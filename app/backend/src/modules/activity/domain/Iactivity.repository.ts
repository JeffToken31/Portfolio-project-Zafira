import { Activity } from './activity.entity';

export interface IActivityRepository {
  findById(id: string): Promise<Activity | null>;
  findAll(): Promise<Activity[]>;
  findLatest(limit: number): Promise<Activity[]>;
  create(activity: Activity): Promise<Activity>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  findOldest(limit: number): Promise<Activity[]>;
  deleteMany(ids: string[]): Promise<void>;
}
