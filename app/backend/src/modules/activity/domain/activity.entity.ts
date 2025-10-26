import { ActivityType } from '@prisma/client';

export class Activity {
  private _id: string;
  private _type: ActivityType;
  private _title: string;
  private _description?: string;
  private _createdAt: Date;

  constructor(
    id: string,
    type: ActivityType,
    title: string,
    description?: string,
    createdAt?: Date,
  ) {
    this._id = id;
    this._type = type;
    this._title = title;
    this._description = description;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get type(): ActivityType {
    return this._type;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  update(fields: Partial<Omit<Activity, 'id'>>) {
    Object.assign(this, fields);
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      title: this._title,
      description: this._description,
      createdAt: this._createdAt,
    };
  }
}
