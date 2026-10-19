import type { AnswerKind, PracticeProblem } from "@/content/types";
import { evaluate, type Node, parse, ParseError, variablesIn, walk } from "./expr";
import { seededRandom } from "@/lib/utils";

export interface CheckResult {
  ok: boolean;
  /** Friendly feedback ("Close – leave it in surd form", "You found 1 of 2 solutions"…). */
  message?: string;
  /** Could not read the input at all. */
  unreadable?: boolean;
}

type Spec = Pick<PracticeProblem, "answer" | "kind" | "tol" | "vars" | "form">;

/** Guess the answer kind from the memo answer when a problem doesn't say. */
export function inferKind(answer: string): AnswerKind {
  const a = answer.trim();
  if (/^\(.*\)$/.test(a) && /[;,]/.test(a)) return "point";
  if (/;|\bor\b/.test(a)) return "set";
  const letters = a.replace(/sqrt|cbrt|pi|sin|cos|tan|log|ln|abs/gi, "").replace(/^[a-zA-Z]\s*=/, "");
  if (/[a-zA-Z]/.test(letters)) return "expr";
  return "number";
}

/** Strip what learners naturally add around a number: "x =", "R", "%", spaces in 12 345, decimal commas. */
function cleanNumber(s: string): string {
  let t = s.trim();
  t = t.replace(/^.*=\s*/, "");
  t = t.replace(/^R\s*/i, "");
  t = t.replace(/%\s*$/, "");
  t = t.replace(/(\d)[\s  ]+(?=\d{3}\b)/g, "$1");
  t = t.replace(/(\d),(\d)/g, "$1.$2");
  return t.trim();
}

function num(s: string): { v: number; tree: Node } {
  const tree = parse(cleanNumber(s));
  return { v: evaluate(tree), tree };
}

function splitSet(s: string): string[] {
  let parts = s.split(/;|\bor\b|\band\b|\|/i);
  if (parts.length === 1 && /,\s/.test(s)) parts = s.split(/,\s*/);
  // "-1 ± √3" (or +-, +/-) means two answers.
  parts = parts.flatMap((x) => (/±|\+-|\+\/-/.test(x) ? [x.replace(/±|\+-|\+\/-/, "+"), x.replace(/±|\+-|\+\/-/, "-")] : [x]));
  return parts.map((x) => x.trim()).filter(Boolean);
}

function splitPoint(s: string): string[] {
  const inner = s.trim().replace(/^\(/, "").replace(/\)$/, "");
  if (inner.includes(";")) return inner.split(";");
  // "(2,-3)" with comma separator (no decimals involved)
  const parts = inner.split(",");
  return parts.length === 2 ? parts : [inner];
}

const close = (a: number, b: number, tol?: number) => Math.abs(a - b) <= (tol ?? 1e-9 * Math.max(1, Math.abs(b)));
const nearly = (a: number, b: number) => Math.abs(a - b) <= 0.011 * Math.max(1, Math.abs(b));

function isSquareFree(n: number) {
  for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) return false;
  return true;
}

/** Form checks: simplest surd form and rationalised denominators. */
function formProblem(tree: Node, form: Spec["form"]): string | null {
  if (!form) return null;
  let problem: string | null = null;
  walk(tree, (n) => {
    if (n.k === "fn" && n.f === "sqrt" && n.a.k === "num" && Number.isInteger(n.a.v)) {
      if (n.a.v > 1 && !isSquareFree(n.a.v)) problem = `√${n.a.v} can still be simplified – look for a square factor.`;
      if (n.a.v === 1 || n.a.v === 0) problem = `√${n.a.v} is just ${n.a.v}.`;
    }
    if (form === "rationalised" && n.k === "bin" && n.op === "/") {
      let rootBelow = false;
      walk(n.b, (m) => {
        if (m.k === "fn" && m.f === "sqrt") rootBelow = true;
      });
      if (rootBelow) problem = "Rationalise the denominator – no surds in the bottom.";
    }
  });
  return problem;
}

/** Check a typed answer against a memo answer. Never throws. */
export function checkAnswer(input: string, spec: Spec): CheckResult {
  const kind = spec.kind ?? inferKind(spec.answer);
  if (!input.trim()) return { ok: false, unreadable: true, message: "Type an answer first." };
  try {
    if (kind === "number") {
      const a = num(spec.answer).v;
      const u = num(input);
      if (!Number.isFinite(u.v)) return { ok: false, message: "That works out to something undefined – check for dividing by 0 or √ of a negative." };
      if (close(u.v, a, spec.tol)) {
        const f = formProblem(u.tree, spec.form);
        return f ? { ok: false, message: `Right value, wrong form: ${f}` } : { ok: true };
      }
      if (!spec.tol && nearly(u.v, a)) return { ok: false, message: "Very close! Give the exact answer (keep surds and fractions) unless the question asks you to round." };
      if (close(-u.v, a, spec.tol) && a !== 0) return { ok: false, message: "Check your sign – you're out by a minus." };
      return { ok: false };
    }

    if (kind === "set") {
      const want = splitSet(spec.answer).map((x) => num(x).v).sort((x, y) => x - y);
      const parts = splitSet(input);
      const got = parts.map((x) => num(x).v).sort((x, y) => x - y);
      const used = new Set<number>();
      let hits = 0;
      for (const g of got) {
        const k = want.findIndex((w, i) => !used.has(i) && close(g, w, spec.tol));
        if (k >= 0) {
          used.add(k);
          hits++;
        }
      }
      if (hits === want.length && got.length === want.length) return { ok: true };
      if (got.length < want.length && hits === got.length) return { ok: false, message: `So far so good – you found ${hits} of ${want.length} solutions. Separate answers with “;” or “or”.` };
      if (got.length > want.length && hits === want.length) return { ok: false, message: "You have all the right values plus an extra one – did you check for invalid (extraneous) solutions?" };
      return { ok: false, message: hits ? `${hits} of ${want.length} correct.` : undefined };
    }

    if (kind === "point") {
      const want = splitPoint(spec.answer).map((x) => num(x).v);
      const got = splitPoint(input).map((x) => num(x).v);
      if (got.length !== want.length) return { ok: false, message: `Give a coordinate like (2; -3).` };
      if (got.every((g, i) => close(g, want[i], spec.tol))) return { ok: true };
      if (got.length === 2 && close(got[0], want[1], spec.tol) && close(got[1], want[0], spec.tol)) return { ok: false, message: "Swap them around – the x-coordinate comes first." };
      return { ok: false, message: got.some((g, i) => close(g, want[i], spec.tol)) ? "One coordinate is right." : undefined };
    }

    // expr: compare the two expressions at random points
    const vars = spec.vars ?? ["x"];
    const rhs = (s: string) => s.replace(/^.*=\s*/, "").replace(/(\d),(\d)/g, "$1.$2");
    const a = parse(rhs(spec.answer), vars);
    const u = parse(rhs(input), vars);
    const extra = variablesIn(u).filter((v) => !vars.includes(v));
    if (extra.length) return { ok: false, message: `Use only ${vars.join(", ")} in your answer.` };
    const rnd = seededRandom(spec.answer);
    let tested = 0;
    for (let k = 0; k < 40 && tested < 8; k++) {
      const scope = Object.fromEntries(vars.map((v) => [v, Math.round((rnd() * 8 - 3.7) * 1000) / 1000 || 0.37]));
      const av = evaluate(a, scope);
      if (!Number.isFinite(av)) continue;
      const uv = evaluate(u, scope);
      tested++;
      if (!Number.isFinite(uv) || Math.abs(uv - av) > 1e-7 * Math.max(1, Math.abs(av))) return { ok: false };
    }
    const f = formProblem(u, spec.form);
    return f ? { ok: false, message: f } : { ok: true };
  } catch (e) {
    return { ok: false, unreadable: true, message: e instanceof ParseError ? e.message : "I couldn't read that – check the brackets and symbols." };
  }
}
