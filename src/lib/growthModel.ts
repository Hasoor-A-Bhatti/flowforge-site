/** Assumptions and maths behind the growth calculator. */

export type TradeKey =
  | "plumbing"
  | "electrical"
  | "building"
  | "cleaning"
  | "landscaping"
  | "other";

export const tradePresets: Record<
  TradeKey,
  { label: string; jobs: number; value: number; margin: number }
> = {
  plumbing: { label: "Plumbing & heating", jobs: 60, value: 450, margin: 45 },
  electrical: { label: "Electrical", jobs: 55, value: 400, margin: 45 },
  building: { label: "Building & roofing", jobs: 10, value: 6500, margin: 25 },
  cleaning: { label: "Cleaning", jobs: 120, value: 120, margin: 35 },
  landscaping: { label: "Landscaping", jobs: 30, value: 1200, margin: 35 },
  other: { label: "Other services", jobs: 40, value: 650, margin: 35 },
};

export type SimState = {
  trade: TradeKey;
  jobs: number;
  value: number;
  extraJobs: number;
  margin: number;
  adminHours: number;
};

export function initialSim(trade: TradeKey = "plumbing"): SimState {
  const p = tradePresets[trade];
  return {
    trade,
    jobs: p.jobs,
    value: p.value,
    margin: p.margin,
    extraJobs: Math.max(1, Math.round(p.jobs * 0.15)),
    adminHours: 10,
  };
}

export function applyTrade(trade: TradeKey, prev: SimState): SimState {
  return { ...initialSim(trade), adminHours: prev.adminHours };
}

/** Results ramp up over the first three months while systems bed in. */
const RAMP = [0.25, 0.5, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const ADMIN_CUT = 0.4;
const WORK_WEEKS = 48;

export function maxExtra(jobs: number) {
  return Math.max(5, Math.round(jobs * 0.6));
}

export function compute(s: SimState) {
  const extraJobs = Math.min(s.extraJobs, maxExtra(s.jobs));
  const baseMonthly = s.jobs * s.value;
  const extraMonthly = extraJobs * s.value;
  const growthPct = s.jobs ? (extraJobs / s.jobs) * 100 : 0;

  let base = 0;
  let withFf = 0;
  const series = [{ m: 0, base: 0, withFf: 0 }];
  RAMP.forEach((r, i) => {
    base += baseMonthly;
    withFf += baseMonthly + extraMonthly * r;
    series.push({ m: i + 1, base, withFf });
  });

  const yearOneExtra = withFf - base;
  const yearOneProfit = yearOneExtra * (s.margin / 100);
  const extraJobsYear = Math.round(extraJobs * RAMP.reduce((a, b) => a + b, 0));
  const hoursBack = s.adminHours * ADMIN_CUT * WORK_WEEKS;

  return {
    extraJobs,
    baseMonthly,
    extraMonthly,
    growthPct,
    series,
    yearOneExtra,
    yearOneProfit,
    extraJobsYear,
    hoursBack,
    daysBack: hoursBack / 8,
  };
}

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
