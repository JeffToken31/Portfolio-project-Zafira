// stats.dto.ts
export class DailyVisitDto {
  id: number;
  date: string; // string ISO pour JSON
  count: number;
}

export class MonthlyVisitDto {
  id: number;
  month: string;
  total: number;
}

export class StatsDto {
  id: number;
  totalVisitors: number;
}
