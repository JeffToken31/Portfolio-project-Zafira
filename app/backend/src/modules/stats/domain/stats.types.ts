export interface RawDailyVisit {
  id: number;
  date: Date;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RawMonthlyVisit {
  id: number;
  month: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RawStats {
  id: number;
  totalVisitors: number;
}
