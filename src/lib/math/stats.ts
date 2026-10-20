/**
 * Statistics helpers shared by the generators and the data widgets.
 * Conventions follow CAPS: quartiles are the medians of the lower and upper
 * halves (the median itself is left out when n is odd), and the standard
 * deviation is the population one (divide by n), as on a Casio in SD mode (σx).
 */
export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
export const mean = (xs: number[]) => sum(xs) / xs.length;

export function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function fiveNumber(xs: number[]) {
  const s = [...xs].sort((a, b) => a - b);
  const h = Math.floor(s.length / 2);
  const lower = s.slice(0, h);
  const upper = s.slice(s.length % 2 ? h + 1 : h);
  return { min: s[0], q1: median(lower), q2: median(s), q3: median(upper), max: s[s.length - 1] };
}

export const variance = (xs: number[]) => {
  const m = mean(xs);
  return sum(xs.map((x) => (x - m) ** 2)) / xs.length;
};
export const sd = (xs: number[]) => Math.sqrt(variance(xs));

/** Values outside Q1 − 1,5·IQR and Q3 + 1,5·IQR. */
export function outliers(xs: number[]) {
  const f = fiveNumber(xs);
  const iqr = f.q3 - f.q1;
  const lo = f.q1 - 1.5 * iqr, hi = f.q3 + 1.5 * iqr;
  return { lo, hi, values: xs.filter((x) => x < lo || x > hi) };
}

/** Least squares line ŷ = a + bx and the correlation coefficient r. */
export function regression(xs: number[], ys: number[]) {
  const mx = mean(xs), my = mean(ys);
  const sxy = sum(xs.map((x, i) => (x - mx) * (ys[i] - my)));
  const sxx = sum(xs.map((x) => (x - mx) ** 2));
  const syy = sum(ys.map((y) => (y - my) ** 2));
  const b = sxx ? sxy / sxx : 0;
  return { a: my - b * mx, b, r: sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0 };
}

export function describeR(r: number) {
  const a = Math.abs(r);
  const strength = a >= 0.9 ? "very strong" : a >= 0.7 ? "strong" : a >= 0.5 ? "moderate" : a >= 0.3 ? "weak" : a > 0.1 ? "very weak" : "no";
  return strength === "no" ? "no correlation" : `${strength} ${r > 0 ? "positive" : "negative"}`;
}

export function factorial(n: number): number {
  let f = 1;
  for (let k = 2; k <= n; k++) f *= k;
  return f;
}

/** Distinct arrangements of all the letters of a word (repeated letters divide out). */
export function arrangements(word: string): number {
  const counts = new Map<string, number>();
  for (const ch of word) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let n = factorial(word.length);
  for (const c of counts.values()) n /= factorial(c);
  return n;
}

/** Every distinct arrangement of the letters of a word (use for words up to about 7 letters). */
export function distinctPerms(word: string): string[] {
  const out = new Set<string>();
  const go = (rest: string, acc: string) => {
    if (!rest) {
      out.add(acc);
      return;
    }
    const seen = new Set<string>();
    for (let i = 0; i < rest.length; i++) {
      if (seen.has(rest[i])) continue;
      seen.add(rest[i]);
      go(rest.slice(0, i) + rest.slice(i + 1), acc + rest[i]);
    }
  };
  go(word, "");
  return [...out];
}
