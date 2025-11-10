// types/stats.ts
export interface DailyVisitDto {
  id: number;
  date: string;
  count: number;
}

export interface MonthlyVisitDto {
  id: number;
  month: string;
  total: number;
}
export interface GlobalStatsDto {
  id: number;
  totalVisitors: number;
}

export interface UsersCountDto {
  totalUsers: number;
}

export function getApiBase(ssr = false) {
  return ssr
    ? process.env.API_BASE_SSR
    : process.env.NEXT_PUBLIC_API_BASE;
}

export async function getCurrentMonthVisits(
  ssr = false
): Promise<MonthlyVisitDto> {
  const res = await fetch(`${getApiBase(ssr)}/stats/monthly/current`, {
    cache: ssr ? 'no-store' : 'default',
  });
  if (!res.ok) throw new Error('Impossible de récupérer les visites du mois');
  return res.json();
}

export async function getDailyVisits(
  ssr = false
): Promise<DailyVisitDto> {
  const res = await fetch(`${getApiBase(ssr)}/stats/daily/today`, {
    cache: ssr ? 'no-store' : 'default',
  });
  if (!res.ok) throw new Error('Impossible de récupérer les visites du jour');
  return res.json();
}

export async function getGlobalStats(ssr = false): Promise<GlobalStatsDto> {
  const res = await fetch(`${getApiBase(ssr)}/stats/global`, {
    cache: ssr ? 'no-store' : 'default',
  });
  if (!res.ok)
    throw new Error('Impossible de récupérer les statistiques globales');
  return res.json();
}

// Hit endpoint (record visit)
export async function recordVisit(ssr = false): Promise<{
  daily: DailyVisitDto;
  monthly: MonthlyVisitDto;
  global: GlobalStatsDto;
}> {
  const res = await fetch(`${getApiBase(ssr)}/stats/hit`, {method: 'POST'});
  if (!res.ok) throw new Error("Impossible d'enregistrer la visite");
  return res.json();
}

// Total users
export async function getTotalUsers(ssr = false): Promise<UsersCountDto> {
  const res = await fetch(`${getApiBase(ssr)}/user/count`, {
    cache: ssr ? 'no-store' : 'default',
  });
  if (!res.ok)
    throw new Error("Impossible de récupérer le nombre d'utilisateurs");
  return res.json();
}


export async function getStats(ssr = false) {
  const [daily, monthly, global] = await Promise.all([
    getDailyVisits(ssr),
    getCurrentMonthVisits(ssr),
    getGlobalStats(ssr),
  ]);

  return {
    daily: daily.count,
    monthly: monthly.total,
    global: global.totalVisitors,
  };
}