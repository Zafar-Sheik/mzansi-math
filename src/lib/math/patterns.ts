/** Quadratic number patterns: T(n) = an² + bn + c. */

export function differences(terms: number[]): number[] {
  return terms.slice(1).map((t, i) => t - terms[i]);
}

/**
 * General term from the first three terms, using the CAPS method:
 *   2a = second difference, 3a + b = T2 − T1, a + b + c = T1.
 */
export function quadraticFromTerms(t1: number, t2: number, t3: number): { a: number; b: number; c: number } {
  const first1 = t2 - t1;
  const second = t3 - t2 - first1;
  const a = second / 2;
  const b = first1 - 3 * a;
  const c = t1 - a - b;
  return { a, b, c };
}

export const termOf = (a: number, b: number, c: number, n: number) => a * n * n + b * n + c;

/** Classify a list of terms. */
export function patternType(terms: number[]): "linear" | "quadratic" | "other" {
  const d1 = differences(terms);
  if (d1.length >= 2 && d1.every((d) => d === d1[0])) return "linear";
  const d2 = differences(d1);
  if (d2.length >= 1 && d2.every((d) => d === d2[0])) return "quadratic";
  return "other";
}
