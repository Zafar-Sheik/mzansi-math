/** Number helpers shared by widgets, generators and tests. */

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** Largest k with k² | n: √n = k√m. */
export function simplifySurd(n: number): { k: number; m: number } {
  let k = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) {
    while (m % (f * f) === 0) {
      m /= f * f;
      k *= f;
    }
  }
  return { k, m };
}

/** k√m as LaTeX: 6\sqrt{2}, \sqrt{5}, 4. */
export function surdTex(k: number, m: number): string {
  if (m === 1) return String(k);
  if (k === 1) return `\\sqrt{${m}}`;
  if (k === -1) return `-\\sqrt{${m}}`;
  return `${k}\\sqrt{${m}}`;
}

/** k√m in "checker" syntax: 6sqrt(2). */
export function surdAns(k: number, m: number): string {
  if (m === 1) return String(k);
  if (k === 1) return `sqrt(${m})`;
  if (k === -1) return `-sqrt(${m})`;
  return `${k}sqrt(${m})`;
}

/** Reduced fraction as LaTeX: \frac{3}{4}, -\frac{1}{2}, 5. */
export function fracTex(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return String(n);
  return `${n < 0 ? "-" : ""}\\frac{${Math.abs(n)}}{${d}}`;
}

/** Reduced fraction in checker syntax: 3/4, -1/2, 5. */
export function fracAns(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d);
  n /= g;
  d /= g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

export function round(x: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round((x + Number.EPSILON * Math.sign(x)) * f) / f;
}

/** 12 345.67 – thin-space thousands separators (SA style), fixed decimals. */
export function fmt(x: number, dp = 2): string {
  const [i, f] = Math.abs(x).toFixed(dp).split(".");
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${x < 0 ? "-" : ""}${grouped}${f ? `.${f}` : ""}`;
}

export const money = (x: number) => `R${fmt(x, 2)}`;

/** Signed term for building expressions: ` + 3`, ` - 2`, `` for 0. */
export function signed(v: number, suffix = ""): string {
  if (v === 0) return "";
  const body = Math.abs(v) === 1 && suffix ? suffix : `${Math.abs(v)}${suffix}`;
  return v < 0 ? ` - ${body}` : ` + ${body}`;
}

/** Leading term: `3x^2`, `-x^2`, `x^2`. */
export function lead(v: number, suffix: string): string {
  if (v === 1) return suffix;
  if (v === -1) return `-${suffix}`;
  return `${v}${suffix}`;
}

/** ax² + bx + c as LaTeX (with the variable of your choice). */
export function quadTex(a: number, b: number, c: number, v = "x"): string {
  const s = `${lead(a, `${v}^2`)}${signed(b, v)}${signed(c)}`;
  return s || "0";
}

/** (x + p) or (x - p) – brackets for turning-point form. */
export function shift(p: number, v = "x"): string {
  return p === 0 ? v : `(${v}${p > 0 ? " + " : " - "}${Math.abs(p)})`;
}
