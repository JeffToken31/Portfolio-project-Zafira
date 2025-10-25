export class DailyVisit {
  constructor(
    private _id: number,
    private _date: Date,
    private _count: number,
  ) {}

  get id(): number {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }

  get count(): number {
    return this._count;
  }

  increment(): void {
    this._count += 1;
  }

  toJSON() {
    return {
      id: this._id,
      date: this._date,
      count: this._count,
    };
  }
}
