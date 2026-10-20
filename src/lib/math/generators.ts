/**
 * Problem generators: endless, fresh practice with a full worked solution.
 * Every generator is deterministic for a given seed, so tests can check that
 * each generated memo answer passes its own checker.
 */
import { seededRandom } from "@/lib/utils";
import { compoundGrowth, effectiveRate, reducingBalance, simpleGrowth, straightLine } from "./finance";
import { fmt, fracAns, fracTex, gcd, lead, quadTex, round, shift, signed, surdAns, surdTex } from "./numbers";
import { quadraticFromTerms, termOf } from "./patterns";
import { type Generator, int, nonZero, pick, type Rng } from "./gen-kit";
import { GEO_TRIG_GENERATORS } from "./generators-geo-trig";
import { G12_ALGEBRA_GENERATORS } from "./generators-g12-algebra";
import { G12_GEO_TRIG_GENERATORS } from "./generators-g12-geo-trig";

export type { Generator } from "./gen-kit";

const pw = (b: number, e: number) => (e >= 0 ? fracTex(b ** e, 1) : fracTex(1, b ** -e));
const pwAns = (b: number, e: number) => (e >= 0 ? String(b ** e) : fracAns(1, b ** -e));

// ------------------------------------------------------------ Exponents & surds
const expEval: Generator = {
  id: "exp-eval",
  title: "Exponents without a calculator",
  topic: "g11-exponents",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 0) {
      const [root, q] = pick(r, [[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [2, 3], [3, 3], [4, 3], [5, 3]] as const);
      const p = pick(r, q === 2 ? [1, 3, -1, -2] : [1, 2, -1, -2]);
      const base = root ** q;
      const exp = `${p < 0 ? "-" : ""}\\frac{${Math.abs(p)}}{${q}}`;
      return {
        q: `Simplify without a calculator: $${base}^{${exp}}$`,
        answer: pwAns(root, p),
        hint: `Write ${base} as a power of ${root} first.`,
        solution: `$$${base}^{${exp}} = \\left(${root}^{${q}}\\right)^{${exp}} = ${root}^{${p}} = ${pw(root, p)}$$`,
      };
    }
    if (t === 1) {
      let a = int(r, 1, 5);
      let b = int(r, 2, 6);
      while (gcd(a, b) !== 1 || a === b) {
        a = int(r, 1, 5);
        b = int(r, 2, 6);
      }
      const n = pick(r, [1, 2, 2, 3]);
      return {
        q: `Simplify: $\\left(\\frac{${a}}{${b}}\\right)^{-${n}}$`,
        answer: fracAns(b ** n, a ** n),
        hint: "A negative exponent flips the fraction.",
        solution: `$$\\left(\\frac{${a}}{${b}}\\right)^{-${n}} = \\left(\\frac{${b}}{${a}}\\right)^{${n}} = ${fracTex(b ** n, a ** n)}$$`,
      };
    }
    if (t === 2) {
      // (b^{x+a} · (b²)^{x+c}) / (b³)^{x+d}: the x-terms cancel.
      const b = pick(r, [2, 3]);
      let a = 0, c = 0, d = 0, e = 99;
      while (e < -3 || e > 4) {
        a = int(r, -2, 4);
        c = int(r, -1, 2);
        d = int(r, -1, 2);
        e = a + 2 * c - 3 * d;
      }
      const sq = b * b;
      const cu = b ** 3;
      const ex = (k: number) => `x${signed(k)}`.replace(/ /g, "");
      return {
        q: `Simplify: $\\dfrac{${b}^{${ex(a)}} \\times ${sq}^{${ex(c)}}}{${cu}^{${ex(d)}}}$`,
        answer: pwAns(b, e),
        hint: `Write every base as a power of ${b}, then add/subtract the exponents.`,
        solution: [
          `$$= \\dfrac{${b}^{${ex(a)}} \\times ${b}^{2x${signed(2 * c).replace(/ /g, "")}}}{${b}^{3x${signed(3 * d).replace(/ /g, "")}}}$$`,
          `$$= ${b}^{(x${signed(a)}) + (2x${signed(2 * c)}) - (3x${signed(3 * d)})} = ${b}^{${e}} = ${pw(b, e)}$$`,
        ].join("\n"),
      };
    }
    // Common factor: (b^{x+k} + s·b^x) / (d·b^x) = (b^k + s)/d
    const b = pick(r, [2, 3, 5]);
    const k = b === 5 ? 1 : int(r, 1, 3);
    let s = pick(r, [-1, 1, -2, 2]);
    if (b ** k + s === 0) s = 1;
    const N = b ** k + s;
    const divs = Array.from({ length: Math.abs(N) }, (_, i) => i + 1).filter((x) => N % x === 0 && x > 1);
    const d = divs.length ? pick(r, divs) : 1;
    const sTerm = `${s < 0 ? "-" : "+"} ${Math.abs(s) === 1 ? "" : Math.abs(s) + " \\cdot "}${b}^{x}`;
    return {
      q: `Simplify: $\\dfrac{${b}^{x+${k}} ${sTerm}}{${d === 1 ? "" : d + " \\cdot "}${b}^{x}}$`,
      answer: fracAns(N, d),
      hint: `Take out the common factor ${b}^x in the numerator.`,
      solution: `$$= \\dfrac{${b}^{x}\\left(${b}^{${k}} ${s < 0 ? "-" : "+"} ${Math.abs(s)}\\right)}{${d === 1 ? "" : d + " \\cdot "}${b}^{x}} = \\dfrac{${b ** k} ${s < 0 ? "-" : "+"} ${Math.abs(s)}}{${d}} = ${fracTex(N, d)}$$`,
    };
  },
};

const expEquation: Generator = {
  id: "exp-equation",
  title: "Exponential equations",
  topic: "g11-exponents",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    if (t === 0) {
      const b = pick(r, [2, 3, 5]);
      const m = b === 2 ? int(r, -4, 6) : b === 3 ? int(r, -3, 4) : int(r, -2, 3);
      const k = nonZero(r, -3, 3);
      const x = m - k;
      return {
        q: `Solve for $x$: $${b}^{x${signed(k)}} = ${pw(b, m)}$`,
        answer: String(x),
        hint: `Write the right-hand side as a power of ${b}, then equate the exponents.`,
        solution: `$$${b}^{x${signed(k)}} = ${b}^{${m}} \\;\\Rightarrow\\; x${signed(k)} = ${m} \\;\\Rightarrow\\; x = ${x}$$`,
      };
    }
    if (t === 1) {
      const [b, u, vs] = pick(r, [[2, 2, [-3, -1, 1, 3, 5]], [2, 3, [-2, -1, 1, 2, 4, 5]], [3, 2, [-3, -1, 1, 3]], [5, 2, [-3, -1, 1, 3]]] as const);
      const v = pick(r, vs);
      const B = b ** u;
      return {
        q: `Solve for $x$: $${B}^{x} = ${pw(b, v)}$`,
        answer: fracAns(v, u),
        hint: `Both sides are powers of ${b}.`,
        solution: `$$\\left(${b}^{${u}}\\right)^{x} = ${b}^{${v}} \\;\\Rightarrow\\; ${u}x = ${v} \\;\\Rightarrow\\; x = ${fracTex(v, u)}$$`,
      };
    }
    const b = pick(r, [2, 3]);
    const plus = r() < 0.6;
    const m = int(r, 1, b === 2 ? 5 : 3);
    const factor = plus ? b + 1 : b * b - 1;
    const N = factor * b ** m;
    return {
      q: plus ? `Solve for $x$: $${b}^{x+1} + ${b}^{x} = ${N}$` : `Solve for $x$: $${b}^{x+2} - ${b}^{x} = ${N}$`,
      answer: String(m),
      hint: `Factorise: take out ${b}^x.`,
      solution: plus
        ? `$$${b}^{x}(${b} + 1) = ${N} \\;\\Rightarrow\\; ${b}^{x} = ${N / factor} = ${b}^{${m}} \\;\\Rightarrow\\; x = ${m}$$`
        : `$$${b}^{x}(${b}^{2} - 1) = ${N} \\;\\Rightarrow\\; ${b}^{x} = ${N / factor} = ${b}^{${m}} \\;\\Rightarrow\\; x = ${m}$$`,
    };
  },
};

const surdSimplify: Generator = {
  id: "surd-simplify",
  title: "Simplify surds",
  topic: "g11-exponents",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const m = pick(r, [2, 3, 5, 6, 7, 10]);
    const k = int(r, 2, m >= 6 ? 5 : 7);
    const n = k * k * m;
    return {
      q: `Write in simplest surd form: $\\sqrt{${n}}$`,
      answer: surdAns(k, m),
      form: "simplified-surd",
      hint: `Find the biggest perfect square that divides ${n}.`,
      solution: `$$\\sqrt{${n}} = \\sqrt{${k * k} \\times ${m}} = \\sqrt{${k * k}}\\,\\sqrt{${m}} = ${surdTex(k, m)}$$`,
    };
  },
};

const surdAddSub: Generator = {
  id: "surd-addsub",
  title: "Add & subtract surds",
  topic: "g11-exponents",
  make(seed) {
    const r = seededRandom(seed);
    const m = pick(r, [2, 3, 5, 6, 7]);
    const k1 = int(r, 1, 5);
    let k2 = int(r, 2, 6);
    const op = r() < 0.5 ? 1 : -1;
    const c1 = pick(r, [1, 1, 2, 3]);
    if (c1 * k1 + op * k2 === 0) k2 += 1;
    const total = c1 * k1 + op * k2;
    const t1 = `${c1 === 1 ? "" : c1}\\sqrt{${k1 * k1 * m}}`;
    return {
      q: `Simplify: $${t1} ${op > 0 ? "+" : "-"} \\sqrt{${k2 * k2 * m}}$`,
      answer: surdAns(total, m),
      form: "simplified-surd",
      hint: `Simplify each surd first – they should all become multiples of √${m}.`,
      solution: `$$= ${c1 === 1 ? "" : c1 + " \\times "}${surdTex(k1, m)} ${op > 0 ? "+" : "-"} ${surdTex(k2, m)} = ${surdTex(total, m)}$$`,
    };
  },
};

const surdRationalise: Generator = {
  id: "surd-rationalise",
  title: "Rationalise the denominator",
  topic: "g11-exponents",
  make(seed) {
    const r = seededRandom(seed);
    const m = pick(r, [2, 3, 5, 6, 7]);
    const a = r() < 0.5 ? m * int(r, 1, 4) : int(r, 1, 9);
    const g = gcd(a, m);
    const num = a / g;
    const den = m / g;
    const numTex = `${num === 1 ? "" : num}\\sqrt{${m}}`;
    const ansTex = den === 1 ? numTex : `\\frac{${numTex}}{${den}}`;
    return {
      q: `Rationalise the denominator: $\\dfrac{${a}}{\\sqrt{${m}}}$`,
      answer: den === 1 ? `${num === 1 ? "" : num}sqrt(${m})` : `${num === 1 ? "" : num}sqrt(${m})/${den}`,
      form: "rationalised",
      hint: `Multiply top and bottom by √${m}.`,
      solution: `$$\\dfrac{${a}}{\\sqrt{${m}}} \\times \\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}} = \\dfrac{${a}\\sqrt{${m}}}{${m}} = ${ansTex}$$`,
    };
  },
};

// ------------------------------------------------------------ Equations
const quadFactor: Generator = {
  id: "quad-factor",
  title: "Solve quadratics by factorising",
  topic: "g11-equations",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    let a: number, b: number, c: number, roots: string, rootsTex: string, factored: string;
    if (r() < 0.7) {
      const r1 = int(r, -9, 9);
      let r2 = int(r, -9, 9);
      if (r2 === r1) r2 = r1 === 9 ? -2 : r1 + 1;
      a = 1;
      b = -(r1 + r2);
      c = r1 * r2;
      roots = `${r1}; ${r2}`;
      rootsTex = `x = ${r1} \\text{ or } x = ${r2}`;
      factored = `${shift(-r1)}${shift(-r2)} = 0`;
    } else {
      const p = pick(r, [2, 3]);
      let q = nonZero(r, -5, 5);
      if (gcd(q, p) !== 1) q += 1;
      const s = int(r, -6, 6);
      a = p;
      b = -(p * s + q);
      c = q * s;
      roots = `${fracAns(q, p)}; ${s}`;
      rootsTex = `x = ${fracTex(q, p)} \\text{ or } x = ${s}`;
      factored = `(${p}x ${q > 0 ? "-" : "+"} ${Math.abs(q)})${shift(-s)} = 0`;
    }
    const moved = r() < 0.3 && c !== 0;
    const eq = moved ? `${quadTex(a, b, 0)} = ${-c}` : `${quadTex(a, b, c)} = 0`;
    return {
      q: `Solve for $x$: $${eq}$`,
      answer: roots,
      kind: "set",
      hint: moved ? "Get everything on one side (= 0) first, then factorise." : "Find two numbers that multiply to give the constant and add to give the middle coefficient.",
      solution: `$$${moved ? `${quadTex(a, b, c)} = 0 \\\\ ` : ""}${factored} \\\\ ${rootsTex}$$`,
    };
  },
};

const quadFormula: Generator = {
  id: "quad-formula",
  title: "The quadratic formula",
  topic: "g11-equations",
  make(seed) {
    const r = seededRandom(seed);
    let a = 1, b = 0, c = 0, D = 0;
    for (;;) {
      a = pick(r, [1, 1, 2, 3, -2]);
      b = int(r, -7, 7);
      c = nonZero(r, -6, 6);
      D = b * b - 4 * a * c;
      if (D > 0 && !Number.isInteger(Math.sqrt(D))) break;
    }
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    return {
      q: `Solve for $x$, correct to TWO decimal places: $${quadTex(a, b, c)} = 0$`,
      answer: `${round(x1, 2)}; ${round(x2, 2)}`,
      kind: "set",
      tol: 0.011,
      hint: "Write down a, b and c, then substitute into the formula. Watch the signs!",
      solution: [
        `$a = ${a},\\ b = ${b},\\ c = ${c}$`,
        `$$x = \\frac{-(${b}) \\pm \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})} = \\frac{${-b} \\pm \\sqrt{${D}}}{${2 * a}}$$`,
        `$$x = ${fmt(round(x1, 2))} \\text{ or } x = ${fmt(round(x2, 2))}$$`,
      ].join("\n\n"),
    };
  },
};

const discriminant: Generator = {
  id: "discriminant",
  title: "Calculate the discriminant",
  topic: "g11-equations",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, [1, 2, 3, -1, 4]);
    const b = int(r, -8, 8);
    const c = int(r, -6, 6);
    const D = b * b - 4 * a * c;
    const nature = D < 0 ? "non-real" : D === 0 ? "real, rational and equal" : Number.isInteger(Math.sqrt(D)) ? "real, rational and unequal" : "real, irrational and unequal";
    return {
      q: `Calculate the discriminant of $${quadTex(a, b, c)} = 0$.`,
      answer: String(D),
      hint: "Δ = b² − 4ac",
      solution: `$$\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${D}$$\n\nSo the roots are **${nature}**.`,
    };
  },
};

const simultaneous: Generator = {
  id: "simultaneous",
  title: "Line meets parabola",
  topic: "g11-equations",
  make(seed) {
    const r = seededRandom(seed);
    const r1 = int(r, -5, 4);
    const r2 = r1 + int(r, 1, 5);
    const m = int(r, -3, 3);
    const k = int(r, -5, 5);
    const b = m - (r1 + r2);
    const c = k + r1 * r2;
    const line = m === 0 ? String(k) : `${lead(m, "x")}${signed(k)}`;
    return {
      q: `Find the $x$-values where the line $y = ${line}$ meets $y = ${quadTex(1, b, c)}$.`,
      answer: `${r1}; ${r2}`,
      kind: "set",
      hint: "At the intersection the y-values are equal: set the two right-hand sides equal and solve.",
      solution: [
        `$$${quadTex(1, b, c)} = ${line}$$`,
        `$$${quadTex(1, -(r1 + r2), r1 * r2)} = 0$$`,
        `$$${shift(-r1)}${shift(-r2)} = 0 \\;\\Rightarrow\\; x = ${r1} \\text{ or } x = ${r2}$$`,
      ].join("\n"),
    };
  },
};

// ------------------------------------------------------------ Patterns
function patternBits(r: Rng) {
  const a = pick(r, [1, 2, 3, -1, -2]);
  const b = int(r, -5, 5);
  const c = int(r, -6, 6);
  const terms = [1, 2, 3, 4].map((n) => termOf(a, b, c, n));
  return { a, b, c, terms };
}
const tnTex = (a: number, b: number, c: number) => quadTex(a, b, c, "n");
const tnAns = (a: number, b: number, c: number) => quadTex(a, b, c, "n").replace(/ /g, "");

function patternWorking(terms: number[]) {
  const d1 = [terms[1] - terms[0], terms[2] - terms[1], terms[3] - terms[2]];
  const d2 = d1[1] - d1[0];
  const { a, b, c } = quadraticFromTerms(terms[0], terms[1], terms[2]);
  return [
    `First differences: $${d1.join(";\\ ")}$ → second difference $= ${d2}$`,
    `$2a = ${d2} \\Rightarrow a = ${a}$`,
    `$3a + b = T_2 - T_1 = ${d1[0]} \\Rightarrow b = ${b}$`,
    `$a + b + c = T_1 = ${terms[0]} \\Rightarrow c = ${c}$`,
    `$$T_n = ${tnTex(a, b, c)}$$`,
  ].join("\n\n");
}

const patternGeneral: Generator = {
  id: "pattern-general",
  title: "Find the general term",
  topic: "g11-patterns",
  make(seed) {
    const r = seededRandom(seed);
    const { a, b, c, terms } = patternBits(r);
    return {
      q: `Determine the general term $T_n$ of the quadratic pattern: $${terms.join(";\\ ")};\\ \\dots$`,
      answer: tnAns(a, b, c),
      kind: "expr",
      vars: ["n"],
      hint: "2a = second difference; 3a + b = T₂ − T₁; a + b + c = T₁",
      solution: patternWorking(terms),
    };
  },
};

const patternTerm: Generator = {
  id: "pattern-term",
  title: "Use the general term",
  topic: "g11-patterns",
  make(seed) {
    const r = seededRandom(seed);
    const { a, b, c, terms } = patternBits(r);
    const n0 = int(r, 8, 20);
    const N = termOf(a, b, c, n0);
    const other = -b / a - n0;
    const ambiguous = Number.isInteger(other) && other > 0 && other !== n0;
    if (r() < 0.5 || ambiguous) {
      const k = pick(r, [10, 15, 20, 25, 30, 50]);
      return {
        q: `For the pattern $${terms.join(";\\ ")};\\ \\dots$ calculate $T_{${k}}$.`,
        answer: String(termOf(a, b, c, k)),
        hint: "Find the general term first, then substitute.",
        solution: `${patternWorking(terms)}\n\n$$T_{${k}} = ${a}(${k})^2${b ? `${b < 0 ? " - " : " + "}${Math.abs(b)}(${k})` : ""}${signed(c)} = ${termOf(a, b, c, k)}$$`,
      };
    }
    return {
      q: `Which term of the pattern $${terms.join(";\\ ")};\\ \\dots$ is equal to $${N}$?`,
      answer: String(n0),
      hint: "Find Tₙ, set it equal to the value and solve the quadratic. n must be a natural number.",
      solution: `${patternWorking(terms)}\n\n$$${tnTex(a, b, c)} = ${N} \\;\\Rightarrow\\; ${tnTex(a, b, c - N)} = 0$$\n\nThe only natural-number solution is $n = ${n0}$, so it is term ${n0}.`,
    };
  },
};

// ------------------------------------------------------------ Functions
const parabolaTp: Generator = {
  id: "parabola-tp",
  title: "Turning point of a parabola",
  topic: "g11-functions",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, [1, -1, 2, -2, 3]);
    const p = nonZero(r, -5, 5);
    const q = int(r, -8, 8);
    if (r() < 0.5) {
      return {
        q: `Write down the coordinates of the turning point of $y = ${lead(a, shift(p) + "^2")}${signed(q)}$.`,
        answer: `(${-p}; ${q})`,
        kind: "point",
        hint: "In y = a(x + p)² + q the turning point is (−p; q).",
        solution: `In $y = a(x+p)^2 + q$ the turning point is $(-p;\\ q)$, so it is $(${-p};\\ ${q})$.`,
      };
    }
    const b = 2 * a * p;
    const c = a * p * p + q;
    return {
      q: `Determine the coordinates of the turning point of $y = ${quadTex(a, b, c)}$.`,
      answer: `(${-p}; ${q})`,
      kind: "point",
      hint: "x = −b / 2a, then substitute to get y.",
      solution: `$$x = -\\frac{b}{2a} = -\\frac{${b}}{2(${a})} = ${-p}$$\n$$y = ${a}(${-p})^2${signed(b)}(${-p})${signed(c)} = ${q}$$\nTurning point $(${-p};\\ ${q})$.`,
    };
  },
};

const hyperbolaAsym: Generator = {
  id: "hyperbola-asym",
  title: "Hyperbola asymptotes & symmetry",
  topic: "g11-functions",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, [1, 2, 3, 4, 6, -1, -2, -3]);
    const p = nonZero(r, -4, 4);
    const q = int(r, -5, 5);
    const eq = `y = \\frac{${a}}{${shift(p).replace(/[()]/g, "")}}${signed(q)}`;
    const t = int(r, 0, 2);
    if (t === 0) return { q: `Write down the equation of the vertical asymptote of $${eq}$.`, answer: String(-p), hint: "The graph is undefined where the denominator is 0.", solution: `$x${signed(p)} = 0 \\Rightarrow x = ${-p}$` };
    if (t === 1) return { q: `Write down the equation of the horizontal asymptote of $${eq}$.`, answer: String(q), hint: "The horizontal asymptote is y = q.", solution: `The horizontal asymptote is $y = q$, so $y = ${q}$.` };
    const k = p + q;
    return {
      q: `Write down the equation of the axis of symmetry with a **positive** gradient for $${eq}$.`,
      answer: `x${signed(k)}`.replace(/ /g, "") || "x",
      kind: "expr",
      hint: "It passes through where the asymptotes cross, (−p; q), with gradient 1: y = (x + p) + q.",
      solution: `The asymptotes cross at $(${-p};\\ ${q})$. With gradient 1: $y = (x${signed(p)})${signed(q)}$, so $y = x${signed(k)}$.`,
    };
  },
};

const expGraph: Generator = {
  id: "exp-graph",
  title: "Exponential graph features",
  topic: "g11-functions",
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, [1, 2, 3, -1, -2]);
    const b = pick(r, [2, 3]);
    const p = int(r, -2, 2);
    const q = int(r, -4, 4);
    const eq = `y = ${a === 1 ? "" : a === -1 ? "-" : a + " \\cdot "}${b}^{${p === 0 ? "x" : `x${signed(p)}`.replace(/ /g, "")}}${signed(q)}`;
    if (r() < 0.4) return { q: `Write down the equation of the asymptote of $${eq}$.`, answer: String(q), hint: "Exponential graphs flatten out towards y = q.", solution: `The asymptote is $y = q = ${q}$.` };
    const num = p >= 0 ? a * b ** p + q : a + q * b ** -p;
    const den = p >= 0 ? 1 : b ** -p;
    return {
      q: `Determine the $y$-intercept of $${eq}$.`,
      answer: fracAns(num, den),
      hint: "Substitute x = 0.",
      solution: `$$y = ${a}\\cdot ${b}^{${p}}${signed(q)} = ${fracTex(num, den)}$$`,
    };
  },
};

const avgGradient: Generator = {
  id: "avg-gradient",
  title: "Average gradient",
  topic: "g11-functions",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, [1, -1, 2, -2, 3]);
    const b = int(r, -4, 4);
    const c = int(r, -5, 5);
    const x1 = int(r, -3, 2);
    const x2 = x1 + int(r, 1, 4);
    const f = (x: number) => a * x * x + b * x + c;
    const m = (f(x2) - f(x1)) / (x2 - x1);
    return {
      q: `Calculate the average gradient of $f(x) = ${quadTex(a, b, c)}$ between $x = ${x1}$ and $x = ${x2}$.`,
      answer: String(m),
      hint: "Average gradient = (f(x₂) − f(x₁)) / (x₂ − x₁)",
      solution: `$$f(${x2}) = ${f(x2)},\\quad f(${x1}) = ${f(x1)}$$\n$$\\text{av. gradient} = \\frac{${f(x2)} - (${f(x1)})}{${x2} - (${x1})} = \\frac{${f(x2) - f(x1)}}{${x2 - x1}} = ${m}$$`,
    };
  },
};

// ------------------------------------------------------------ Finance
const growth: Generator = {
  id: "growth",
  title: "Simple & compound growth",
  topic: "g11-finance",
  make(seed) {
    const r = seededRandom(seed);
    const P = int(r, 4, 100) * 500;
    const rate = pick(r, [4.5, 5, 6, 7.5, 8, 9, 10, 11.5, 12]);
    const years = int(r, 2, 10);
    const t = int(r, 0, 2);
    if (t === 0) {
      const A = simpleGrowth(P, rate / 100, years);
      return {
        q: `R${fmt(P, 0)} is invested at ${rate}% p.a. **simple** interest. Calculate the value after ${years} years.`,
        answer: String(round(A, 2)), tol: 0.011, hint: "A = P(1 + in)",
        solution: `$$A = ${P}\\left(1 + ${rate / 100} \\times ${years}\\right) = \\text{R}${fmt(round(A, 2))}$$`,
      };
    }
    const comp = t === 1 ? { label: "annually", m: 1 } : pick(r, [{ label: "monthly", m: 12 }, { label: "quarterly", m: 4 }, { label: "half-yearly", m: 2 }]);
    const A = compoundGrowth(P, rate / 100 / comp.m, years * comp.m);
    const iTex = comp.m === 1 ? `${rate / 100}` : `\\frac{${rate / 100}}{${comp.m}}`;
    return {
      q: `R${fmt(P, 0)} is invested at ${rate}% p.a. compounded **${comp.label}**. Calculate the value after ${years} years.`,
      answer: String(round(A, 2)), tol: 0.011, hint: comp.m === 1 ? "A = P(1 + i)ⁿ" : `A = P(1 + i)ⁿ with i = ${rate}% ÷ ${comp.m} and n = ${years} × ${comp.m}`,
      solution: `$$A = ${P}\\left(1 + ${iTex}\\right)^{${years * comp.m}} = \\text{R}${fmt(round(A, 2))}$$`,
    };
  },
};

const depreciation: Generator = {
  id: "depreciation",
  title: "Depreciation",
  topic: "g11-finance",
  make(seed) {
    const r = seededRandom(seed);
    const [item, P] = pick(r, [["laptop", 18000], ["taxi (minibus)", 520000], ["delivery bakkie", 380000], ["phone", 14000], ["printer", 6500], ["tractor", 900000]] as const);
    const rate = pick(r, [8, 10, 12, 12.5, 15, 18, 20, 25]);
    const years = int(r, 2, 5);
    if (r() < 0.5) {
      const A = straightLine(P, rate / 100, years);
      return {
        q: `A ${item} costs R${fmt(P, 0)} and depreciates at ${rate}% p.a. on the **straight-line** method. What is it worth after ${years} years?`,
        answer: String(round(A, 2)), tol: 0.011, hint: "A = P(1 − in)",
        solution: `$$A = ${P}\\left(1 - ${rate / 100} \\times ${years}\\right) = \\text{R}${fmt(round(A, 2))}$$`,
      };
    }
    const A = reducingBalance(P, rate / 100, years);
    return {
      q: `A ${item} costs R${fmt(P, 0)} and depreciates at ${rate}% p.a. on the **reducing-balance** method. What is it worth after ${years} years?`,
      answer: String(round(A, 2)), tol: 0.011, hint: "A = P(1 − i)ⁿ",
      solution: `$$A = ${P}\\left(1 - ${rate / 100}\\right)^{${years}} = \\text{R}${fmt(round(A, 2))}$$`,
    };
  },
};

const effective: Generator = {
  id: "effective-rate",
  title: "Nominal → effective rate",
  topic: "g11-finance",
  make(seed) {
    const r = seededRandom(seed);
    const nom = pick(r, [6, 7.5, 8, 9, 10, 11, 12, 15, 18, 21]);
    const comp = pick(r, [{ label: "monthly", m: 12 }, { label: "quarterly", m: 4 }, { label: "half-yearly", m: 2 }]);
    const eff = effectiveRate(nom / 100, comp.m) * 100;
    return {
      q: `Convert ${nom}% p.a. compounded ${comp.label} to an **effective** annual rate (as a %, two decimals).`,
      answer: String(round(eff, 2)), tol: 0.006, hint: "1 + i_eff = (1 + i_nom/m)^m",
      solution: `$$1 + i_{\\text{eff}} = \\left(1 + \\frac{${nom / 100}}{${comp.m}}\\right)^{${comp.m}} \\Rightarrow i_{\\text{eff}} = ${fmt(round(eff, 2))}\\%$$`,
    };
  },
};

export const GENERATORS: Generator[] = [
  expEval, expEquation, surdSimplify, surdAddSub, surdRationalise,
  quadFactor, quadFormula, discriminant, simultaneous,
  patternGeneral, patternTerm,
  parabolaTp, hyperbolaAsym, expGraph, avgGradient,
  growth, depreciation, effective,
  ...GEO_TRIG_GENERATORS,
  ...G12_ALGEBRA_GENERATORS,
  ...G12_GEO_TRIG_GENERATORS,
];

export function getGenerator(id: string): Generator | undefined {
  return GENERATORS.find((g) => g.id === id);
}
