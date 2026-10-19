/** The maths engine: parser, answer checker, helpers and every problem generator. */
import { describe, expect, it } from "vitest";
import { evaluate, parse, toTex, value } from "@/lib/math/expr";
import { checkAnswer, inferKind } from "@/lib/math/check";
import { fracAns, simplifySurd } from "@/lib/math/numbers";
import { compoundGrowth, effectiveRate, reducingBalance, simpleGrowth, straightLine } from "@/lib/math/finance";
import { quadraticFromTerms } from "@/lib/math/patterns";
import { GENERATORS } from "@/lib/math/generators";
import katex from "katex";

describe("expression parser", () => {
  it("handles what learners type", () => {
    expect(value("2sqrt(3)")).toBeCloseTo(2 * Math.sqrt(3));
    expect(value("2√3")).toBeCloseTo(2 * Math.sqrt(3));
    expect(value("-2^2")).toBe(-4);
    expect(value("2^-1")).toBe(0.5);
    expect(value("3/4")).toBe(0.75);
    expect(value("(1+2)(3+4)")).toBe(21);
    expect(value("8^(2/3)")).toBeCloseTo(4);
    expect(value("(-8)^(1/3)")).toBeCloseTo(-2);
    expect(value("sin30")).toBeCloseTo(0.5);
    expect(value("2π")).toBeCloseTo(2 * Math.PI);
    expect(value("5²")).toBe(25);
    expect(evaluate(parse("2x^2 - 3x", ["x"]), { x: 2 })).toBe(2);
    expect(evaluate(parse("3n(n+1)", ["n"]), { n: 2 })).toBe(18);
  });
  it("rejects nonsense safely", () => {
    expect(value("2+")).toBeNaN();
    expect(value("(2")).toBeNaN();
    expect(value("alert(1)")).toBeNaN();
  });
  it("produces LaTeX that KaTeX can render", () => {
    for (const s of ["2sqrt(3)", "(x+1)/(x-2)", "x^2 - 3x + 2", "-(a+b)", "3^(x+1)", "sqrt(2)^2"]) {
      const tex = toTex(parse(s, ["x", "a", "b"]));
      expect(() => katex.renderToString(tex, { throwOnError: true })).not.toThrow();
    }
  });
});

describe("answer checker", () => {
  it("numbers, fractions, surds, decimal commas and money", () => {
    expect(checkAnswer("0.75", { answer: "3/4" }).ok).toBe(true);
    expect(checkAnswer("x = 3/4", { answer: "3/4" }).ok).toBe(true);
    expect(checkAnswer("1,5", { answer: "3/2" }).ok).toBe(true);
    expect(checkAnswer("R12 345,67", { answer: "12345.67", tol: 0.011 }).ok).toBe(true);
    expect(checkAnswer("12.68%", { answer: "12.68", tol: 0.006 }).ok).toBe(true);
    expect(checkAnswer("-3/4", { answer: "3/4" }).message).toMatch(/sign/);
    expect(checkAnswer("1.41", { answer: "sqrt(2)" }).message).toMatch(/exact/);
  });
  it("enforces simplest surd form and rationalised denominators", () => {
    expect(checkAnswer("sqrt(72)", { answer: "6sqrt(2)", form: "simplified-surd" }).ok).toBe(false);
    expect(checkAnswer("6√2", { answer: "6sqrt(2)", form: "simplified-surd" }).ok).toBe(true);
    expect(checkAnswer("5/sqrt(3)", { answer: "5sqrt(3)/3", form: "rationalised" }).ok).toBe(false);
    expect(checkAnswer("5sqrt3/3", { answer: "5sqrt(3)/3", form: "rationalised" }).ok).toBe(true);
  });
  it("solution sets in any order, with partial feedback", () => {
    expect(checkAnswer("x = -3 or x = 2", { answer: "2; -3" }).ok).toBe(true);
    expect(checkAnswer("2; -3", { answer: "-3; 2" }).ok).toBe(true);
    expect(checkAnswer("x = -1 ± √3", { answer: "-1 + sqrt(3); -1 - sqrt(3)" }).ok).toBe(true);
    expect(checkAnswer("2", { answer: "2; -3" }).message).toMatch(/1 of 2/);
    expect(checkAnswer("2; -3; 5", { answer: "2; -3" }).message).toMatch(/extra/);
  });
  it("points", () => {
    expect(checkAnswer("(2; -3)", { answer: "(2; -3)" }).ok).toBe(true);
    expect(checkAnswer("(2,-3)", { answer: "(2; -3)" }).ok).toBe(true);
    expect(checkAnswer("(-3; 2)", { answer: "(2; -3)" }).message).toMatch(/Swap/);
  });
  it("algebraic expressions by random substitution", () => {
    expect(checkAnswer("T_n = 2n^2+3n-1", { answer: "2n^2 + 3n - 1", kind: "expr", vars: ["n"] }).ok).toBe(true);
    expect(checkAnswer("n(2n+3)-1", { answer: "2n^2 + 3n - 1", kind: "expr", vars: ["n"] }).ok).toBe(true);
    expect(checkAnswer("2n^2+3n+1", { answer: "2n^2 + 3n - 1", kind: "expr", vars: ["n"] }).ok).toBe(false);
    expect(checkAnswer("2x+1", { answer: "2n+1", kind: "expr", vars: ["n"] }).message).toMatch(/only n/);
  });
  it("infers kinds", () => {
    expect(inferKind("2; -3")).toBe("set");
    expect(inferKind("(1; 2)")).toBe("point");
    expect(inferKind("3n^2 + 1")).toBe("expr");
    expect(inferKind("6sqrt(2)")).toBe("number");
  });
});

describe("helpers", () => {
  it("surds, fractions, patterns, finance", () => {
    expect(simplifySurd(72)).toEqual({ k: 6, m: 2 });
    expect(simplifySurd(50)).toEqual({ k: 5, m: 2 });
    expect(simplifySurd(30)).toEqual({ k: 1, m: 30 });
    expect(fracAns(6, -8)).toBe("-3/4");
    expect(quadraticFromTerms(4, 11, 22)).toEqual({ a: 2, b: 1, c: 1 });
    expect(simpleGrowth(1000, 0.1, 3)).toBeCloseTo(1300);
    expect(compoundGrowth(1000, 0.1, 3)).toBeCloseTo(1331);
    expect(straightLine(10000, 0.2, 2)).toBeCloseTo(6000);
    expect(reducingBalance(10000, 0.2, 2)).toBeCloseTo(6400);
    expect(effectiveRate(0.12, 12) * 100).toBeCloseTo(12.6825, 3);
  });
});

describe("problem generators", () => {
  for (const g of GENERATORS) {
    it(`${g.id}: every memo answer passes its own checker and renders`, () => {
      for (let seed = 0; seed < 150; seed++) {
        const p = g.make(seed);
        const res = checkAnswer(p.answer, p);
        expect(res.ok, `${g.id} seed ${seed}: ${p.q} → ${p.answer} (${res.message})`).toBe(true);
        for (const m of `${p.q}\n${p.solution}`.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g)) {
          const tex = m[1] ?? m[2];
          expect(() => katex.renderToString(tex, { throwOnError: true, displayMode: Boolean(m[1]) }), `${g.id} seed ${seed}: ${tex}`).not.toThrow();
        }
      }
    });
  }
});

describe("trig input", () => {
  it("reads degrees, θ and sin^2", () => {
    expect(value("sin 30°")).toBeCloseTo(0.5);
    expect(evaluate(parse("sin^2 x + cos^2 x", ["x"]), { x: 37 })).toBeCloseTo(1);
    expect(evaluate(parse("tanθ", ["x"]), { x: 45 })).toBeCloseTo(1);
    expect(checkAnswer("-sin θ", { answer: "-sin(x)", kind: "expr" }).ok).toBe(true);
    expect(checkAnswer("cos x", { answer: "-sin(x)", kind: "expr" }).ok).toBe(false);
  });
});

describe("logs", () => {
  it("reads logs with a base", () => {
    expect(value("log_2(8)")).toBeCloseTo(3);
    expect(value("log2(32)")).toBeCloseTo(5);
    expect(value("log_{1/2}(4)")).toBeCloseTo(-2);
    expect(value("log 1000")).toBeCloseTo(3);
    expect(checkAnswer("y = log_3 x", { answer: "log(x)/log(3)", kind: "expr" }).ok).toBe(true);
    expect(checkAnswer("log_2(x)", { answer: "log(x)/log(3)", kind: "expr" }).ok).toBe(false);
  });
});
