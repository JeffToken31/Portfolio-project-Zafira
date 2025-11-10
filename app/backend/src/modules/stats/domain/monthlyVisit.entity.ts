export class MonthlyVisit {
  constructor(
    private _id: number,
    private _month: string,
    private _total: number,
  ) {}

  get id(): number {
    return this._id;
  }

  get month(): string {
    return this._month;
  }

  get total(): number {
    return this._total;
  }

  addVisitors(count: number): void {
    this._total += count;
  }

  toJSON() {
    return {
      id: this._id,
      month: this._month,
      total: this._total,
    };
  }
}
