/**
 * CAPS Grade 11 finance formulas. Rates are given as decimals (12% → 0.12),
 * n is the number of compounding periods.
 */

/** Simple growth: A = P(1 + in) */
export const simpleGrowth = (P: number, i: number, n: number) => P * (1 + i * n);

/** Compound growth: A = P(1 + i)^n */
export const compoundGrowth = (P: number, i: number, n: number) => P * (1 + i) ** n;

/** Straight-line (simple) depreciation: A = P(1 − in) */
export const straightLine = (P: number, i: number, n: number) => P * (1 - i * n);

/** Reducing-balance (compound) depreciation: A = P(1 − i)^n */
export const reducingBalance = (P: number, i: number, n: number) => P * (1 - i) ** n;

/** Effective annual rate from a nominal annual rate compounded m times a year: 1 + i_eff = (1 + i_nom/m)^m */
export const effectiveRate = (nominal: number, m: number) => (1 + nominal / m) ** m - 1;

/** Nominal annual rate (compounded m times a year) from an effective annual rate. */
export const nominalRate = (effective: number, m: number) => m * ((1 + effective) ** (1 / m) - 1);

/** Interest rate per period that grows P to A in n periods: i = (A/P)^(1/n) − 1 */
export const rateFor = (P: number, A: number, n: number) => (A / P) ** (1 / n) - 1;

export const COMPOUNDING: { id: string; label: string; m: number }[] = [
  { id: "annually", label: "annually", m: 1 },
  { id: "semi-annually", label: "half-yearly", m: 2 },
  { id: "quarterly", label: "quarterly", m: 4 },
  { id: "monthly", label: "monthly", m: 12 },
  { id: "daily", label: "daily", m: 365 },
];
