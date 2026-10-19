/** Shared helpers for the seeded problem generators. */
import type { PracticeProblem, Topic } from "@/content/types";

export type Rng = () => number;
export const int = (r: Rng, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));
export const pick = <T,>(r: Rng, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];
export const nonZero = (r: Rng, lo: number, hi: number) => {
  let v = 0;
  while (v === 0) v = int(r, lo, hi);
  return v;
};

export interface Generator {
  id: string;
  title: string;
  topic: Topic;
  /** Quick enough for the Speed Solve game. */
  speed?: boolean;
  make: (seed: number | string) => PracticeProblem;
}
