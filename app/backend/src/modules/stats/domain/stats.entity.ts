export class Stats {
  constructor(
    private _id: number,
    private _totalVisitors: number,
  ) {}

  get id(): number {
    return this._id;
  }

  get totalVisitors(): number {
    return this._totalVisitors;
  }

  addVisitors(count: number): void {
    this._totalVisitors += count;
  }

  toJSON() {
    return {
      id: this._id,
      totalVisitors: this._totalVisitors,
    };
  }
}
