/**
 * Phase 3 generators: Grade 12 sequences & series, functions & inverses,
 * logarithms, annuities, polynomials and differential calculus.
 */
import { seededRandom } from "@/lib/utils";
import { fmt, fracAns, fracTex, lead, quadTex, round, shift, signed } from "./numbers";
import { type Generator, int, nonZero, pick } from "./gen-kit";

/** Polynomial a₃x³ + a₂x² + a₁x + a₀ as LaTeX. */
function polyTex(c: number[], v = "x") {
  // c[i] is the coefficient of x^i
  let s = "";
  for (let p = c.length - 1; p >= 0; p--) {
    const k = c[p];
    if (k === 0) continue;
    const body = p === 0 ? "" : p === 1 ? v : `${v}^${p}`;
    if (!s) s = p === 0 ? String(k) : lead(k, body);
    else s += p === 0 ? signed(k) : signed(k, body);
  }
  return s || "0";
}
const evalPoly = (c: number[], x: number) => c.reduce((s, k, p) => s + k * x ** p, 0);
const mulPoly = (a: number[], b: number[]) => {
  const out = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return out;
};
const deriv = (c: number[]) => c.slice(1).map((k, i) => k * (i + 1));

// ------------------------------------------------------------ sequences & series
const arithmetic: Generator = {
  id: "arith-seq",
  title: "Arithmetic sequences & series",
  topic: "g12-sequences",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = int(r, -10, 20), d = nonZero(r, -6, 8);
    const terms = [0, 1, 2, 3].map((k) => a + k * d).join(";\\ ");
    const t = int(r, 0, 3);
    if (t === 0) {
      const n = int(r, 15, 60);
      return { q: `For the arithmetic sequence $${terms};\\ \\dots$ calculate $T_{${n}}$.`, answer: String(a + (n - 1) * d), hint: "Tₙ = a + (n − 1)d", solution: `$$a = ${a},\\ d = ${d}$$\n$$T_{${n}} = ${a} + (${n} - 1)(${d}) = ${a + (n - 1) * d}$$` };
    }
    if (t === 1) {
      return { q: `Determine the general term $T_n$ of $${terms};\\ \\dots$`, answer: `${d}n + (${a - d})`, kind: "expr", vars: ["n"], hint: "Tₙ = a + (n − 1)d – then simplify.", solution: `$$T_n = ${a} + (n - 1)(${d}) = ${lead(d, "n")}${signed(a - d)}$$` };
    }
    if (t === 2) {
      const n = int(r, 10, 40);
      const S = (n / 2) * (2 * a + (n - 1) * d);
      return { q: `Calculate the sum of the first ${n} terms of $${terms};\\ \\dots$`, answer: String(S), hint: "Sₙ = n/2 [2a + (n − 1)d]", solution: `$$S_{${n}} = \\frac{${n}}{2}\\left[2(${a}) + (${n} - 1)(${d})\\right] = ${S}$$` };
    }
    const n = int(r, 12, 50);
    const val = a + (n - 1) * d;
    return { q: `Which term of $${terms};\\ \\dots$ is equal to $${val}$?`, answer: String(n), hint: "Set Tₙ equal to the value and solve for n.", solution: `$$${a} + (n - 1)(${d}) = ${val} \\Rightarrow n - 1 = ${n - 1} \\Rightarrow n = ${n}$$` };
  },
};

const geometric: Generator = {
  id: "geo-seq",
  title: "Geometric sequences & series",
  topic: "g12-sequences",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 3) {
      // sum to infinity
      const [rn, rd] = pick(r, [[1, 2], [-1, 2], [1, 3], [2, 3], [-1, 3], [1, 4], [3, 4]] as const);
      const a = int(r, 2, 30);
      const terms = [0, 1, 2].map((k) => fracTex(a * rn ** k, rd ** k)).join(";\\ ");
      return {
        q: `Calculate the sum to infinity of $${terms};\\ \\dots$`,
        answer: fracAns(a * rd, rd - rn),
        hint: "S∞ = a / (1 − r), valid because −1 < r < 1.",
        solution: `$$r = ${fracTex(rn, rd)},\\quad S_\\infty = \\frac{a}{1 - r} = \\frac{${a}}{1 - (${fracTex(rn, rd)})} = ${fracTex(a * rd, rd - rn)}$$`,
      };
    }
    const a = int(r, 1, 6) * pick(r, [1, -1, 1]);
    const q = pick(r, [2, 3, -2, -3]);
    const terms = [0, 1, 2, 3].map((k) => a * q ** k).join(";\\ ");
    if (t === 0) {
      const n = int(r, 6, 11);
      return { q: `For the geometric sequence $${terms};\\ \\dots$ calculate $T_{${n}}$.`, answer: String(a * q ** (n - 1)), hint: "Tₙ = a·rⁿ⁻¹", solution: `$$r = ${q},\\quad T_{${n}} = ${a}(${q})^{${n - 1}} = ${a * q ** (n - 1)}$$` };
    }
    if (t === 1) {
      const n = int(r, 6, 12);
      const S = (a * (q ** n - 1)) / (q - 1);
      return { q: `Calculate the sum of the first ${n} terms of $${terms};\\ \\dots$`, answer: String(S), hint: "Sₙ = a(rⁿ − 1)/(r − 1)", solution: `$$S_{${n}} = \\frac{${a}\\left((${q})^{${n}} - 1\\right)}{${q} - 1} = ${S}$$` };
    }
    const n = int(r, 5, 10);
    const val = a * q ** (n - 1);
    return { q: `Which term of $${terms};\\ \\dots$ is equal to $${val}$?`, answer: String(n), hint: "Set a·rⁿ⁻¹ equal to the value and solve the exponential equation.", solution: `$$${a}(${q})^{n-1} = ${val} \\Rightarrow (${q})^{n-1} = ${val / a} = (${q})^{${n - 1}} \\Rightarrow n = ${n}$$` };
  },
};

const sigma: Generator = {
  id: "sigma",
  title: "Sigma notation",
  topic: "g12-sequences",
  make(seed) {
    const r = seededRandom(seed);
    if (r() < 0.6) {
      const p = nonZero(r, -4, 6), c = int(r, -8, 8), n = int(r, 8, 40);
      const first = p + c, last = p * n + c;
      const S = (n / 2) * (first + last);
      return {
        q: `Evaluate: $\\displaystyle\\sum_{k=1}^{${n}} (${lead(p, "k")}${signed(c)})$`,
        answer: String(S),
        hint: "Write out the first term and last term; it's an arithmetic series with n terms.",
        solution: `$T_1 = ${first}$, $T_{${n}} = ${last}$, $${n}$ terms.\n$$S = \\frac{${n}}{2}(${first} + ${last}) = ${S}$$`,
      };
    }
    const a = int(r, 1, 5), q = pick(r, [2, 3]), n = int(r, 5, 9);
    const S = (a * (q ** n - 1)) / (q - 1);
    return {
      q: `Evaluate: $\\displaystyle\\sum_{k=1}^{${n}} ${a === 1 ? "" : `${a} \\cdot `}${q}^{k-1}$`,
      answer: String(S),
      hint: "A geometric series: a = first term, r = the base.",
      solution: `$a = ${a},\\ r = ${q},\\ n = ${n}$\n$$S_{${n}} = \\frac{${a}(${q}^{${n}} - 1)}{${q} - 1} = ${S}$$`,
    };
  },
};

// ------------------------------------------------------------ inverses & logs
const inverse: Generator = {
  id: "inverse-fn",
  title: "Find the inverse",
  topic: "g12-functions",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 0) {
      const m = nonZero(r, -5, 5), c = int(r, -8, 8);
      return {
        q: `Determine $f^{-1}(x)$ if $f(x) = ${lead(m, "x")}${signed(c)}$.`,
        answer: `(x - (${c}))/(${m})`,
        kind: "expr",
        hint: "Swap x and y, then make y the subject.",
        solution: `$$x = ${lead(m, "y")}${signed(c)} \\Rightarrow y = \\frac{x${signed(-c)}}{${m}}$$\n$$f^{-1}(x) = ${m === 1 ? `x${signed(-c)}` : `\\frac{1}{${m}}x${c === 0 ? "" : ` ${-c / m > 0 ? "+" : "-"} ${fracTex(Math.abs(c), Math.abs(m))}`}`}$$`,
      };
    }
    if (t === 1) {
      const a = pick(r, [2, 3, 4, 5]);
      return {
        q: `$f(x) = ${a}x^2$ for $x \\geq 0$. Determine $f^{-1}(x)$.`,
        answer: `sqrt(x/${a})`,
        kind: "expr",
        hint: "Swap x and y and solve for y; the restriction x ≥ 0 means you take the positive root.",
        solution: `$$x = ${a}y^2 \\Rightarrow y^2 = \\frac{x}{${a}} \\Rightarrow y = \\sqrt{\\frac{x}{${a}}} \\quad (y \\geq 0)$$`,
      };
    }
    const b = pick(r, [2, 3, 5, 10]);
    if (t === 2) {
      return { q: `Determine the equation of $f^{-1}$ if $f(x) = ${b}^{x}$. (Write it as $y = \\dots$)`, answer: `log(x)/log(${b})`, kind: "expr", hint: "The inverse of an exponential is a logarithm with the same base. Type log_b(x).", solution: `$$x = ${b}^{y} \\Rightarrow y = \\log_{${b}} x$$` };
    }
    return { q: `Determine the equation of $g^{-1}$ if $g(x) = \\log_{${b}} x$.`, answer: `${b}^x`, kind: "expr", hint: "The inverse of log_b x is bˣ.", solution: `$$x = \\log_{${b}} y \\Rightarrow y = ${b}^{x}$$` };
  },
};

const logEval: Generator = {
  id: "log-eval",
  title: "Evaluate logarithms",
  topic: "g12-functions",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const [b, e] = pick(r, [[2, 5], [2, -3], [3, 4], [3, -2], [5, 3], [10, -3], [10, 4], [4, 0.5], [9, 0.5], [8, 1 / 3], [2, 0], [7, 2], [27, 2 / 3]] as const);
    const val = b ** e;
    const valTex = Number.isInteger(val) ? String(val) : e < 0 ? `\\frac{1}{${b ** -e}}` : String(round(val, 4));
    return {
      q: `Evaluate without a calculator: $\\log_{${b}} ${valTex}$`,
      answer: fracAns(Math.round(e * 6), 6),
      hint: `"${b} to the power WHAT gives ${valTex.replace(/\\frac\{1\}\{(\d+)\}/, "1/$1")}?"`,
      solution: `$$\\log_{${b}} ${valTex} = ${fracTex(Math.round(e * 6), 6)} \\quad \\text{because } ${b}^{${fracTex(Math.round(e * 6), 6)}} = ${valTex}$$`,
    };
  },
};

const logEquation: Generator = {
  id: "log-equation",
  title: "Solve with logs",
  topic: "g12-functions",
  make(seed) {
    const r = seededRandom(seed);
    const b = pick(r, [2, 3, 5, 1.5, 1.08, 1.12]);
    const k = pick(r, [7, 10, 20, 50, 100, 3]);
    const x = Math.log(k) / Math.log(b);
    return {
      q: `Solve for $x$, correct to two decimal places: $${b}^{x} = ${k}$`,
      answer: String(round(x, 2)),
      tol: 0.011,
      hint: "x = log k / log b (or x = log_b k).",
      solution: `$$x = \\log_{${b}} ${k} = \\frac{\\log ${k}}{\\log ${b}} = ${fmt(round(x, 2))}$$`,
    };
  },
};

// ------------------------------------------------------------ annuities
const fvAnnuity: Generator = {
  id: "fv-annuity",
  title: "Future value annuities",
  topic: "g12-finance",
  make(seed) {
    const r = seededRandom(seed);
    const x = int(r, 2, 40) * 100;
    const rate = pick(r, [6, 7.5, 8, 9, 10, 12]);
    const years = int(r, 3, 20);
    const i = rate / 1200, n = years * 12;
    const F = (x * ((1 + i) ** n - 1)) / i;
    return {
      q: `Thandi deposits R${fmt(x, 0)} at the end of every month into an account earning ${rate}% p.a. compounded monthly. How much is in the account after ${years} years (immediately after the last deposit)?`,
      answer: String(round(F, 2)), tol: 0.011,
      hint: "F = x[(1 + i)ⁿ − 1] / i with i = rate ÷ 12 and n = number of months.",
      solution: `$$F = \\frac{${x}\\left[\\left(1 + \\frac{${rate / 100}}{12}\\right)^{${n}} - 1\\right]}{\\frac{${rate / 100}}{12}} = \\text{R}${fmt(round(F, 2))}$$`,
    };
  },
};

const loanPayment: Generator = {
  id: "loan-payment",
  title: "Loan repayments (present value)",
  topic: "g12-finance",
  make(seed) {
    const r = seededRandom(seed);
    const P = int(r, 5, 120) * 5000;
    const rate = pick(r, [9, 10.5, 11, 12, 13.5, 15, 18]);
    const years = pick(r, [2, 3, 4, 5, 6, 10, 20]);
    const i = rate / 1200, n = years * 12;
    if (r() < 0.6) {
      const x = (P * i) / (1 - (1 + i) ** -n);
      return {
        q: `A loan of R${fmt(P, 0)} is repaid with equal monthly payments over ${years} years, starting one month after the loan is granted. Interest is ${rate}% p.a. compounded monthly. Calculate the monthly payment.`,
        answer: String(round(x, 2)), tol: 0.011,
        hint: "P = x[1 − (1 + i)⁻ⁿ] / i – solve for x.",
        solution: `$$${P} = \\frac{x\\left[1 - \\left(1 + \\frac{${rate / 100}}{12}\\right)^{-${n}}\\right]}{\\frac{${rate / 100}}{12}} \\Rightarrow x = \\text{R}${fmt(round(x, 2))}$$`,
      };
    }
    const x = round((P * i) / (1 - (1 + i) ** -n), -1) + 100;
    const nn = -Math.log(1 - (P * i) / x) / Math.log(1 + i);
    return {
      q: `A loan of R${fmt(P, 0)} at ${rate}% p.a. compounded monthly is repaid at R${fmt(x, 0)} per month, starting one month after the loan. How many payments are needed? (Give $n$ correct to two decimals.)`,
      answer: String(round(nn, 2)), tol: 0.011,
      hint: "Substitute into P = x[1 − (1 + i)⁻ⁿ] / i, isolate (1 + i)⁻ⁿ, then use logs.",
      solution: `$$${P} = \\frac{${x}\\left[1 - (1 + i)^{-n}\\right]}{i},\\quad i = \\frac{${rate / 100}}{12}$$\n$$(1 + i)^{-n} = 1 - \\frac{${P} i}{${x}} \\Rightarrow n = \\frac{-\\log\\left(1 - \\frac{${P} i}{${x}}\\right)}{\\log(1 + i)} = ${fmt(round(nn, 2))}$$\n\nSo ${Math.floor(nn)} full payments and a smaller final payment.`,
    };
  },
};

// ------------------------------------------------------------ polynomials
const remainder: Generator = {
  id: "remainder",
  title: "Remainder theorem",
  topic: "g12-polynomials",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const c = [int(r, -9, 9), int(r, -6, 6), int(r, -4, 4), pick(r, [1, 1, 2, -1])];
    const k = nonZero(r, -3, 3);
    const R = evalPoly(c, k);
    return {
      q: `Determine the remainder when $f(x) = ${polyTex(c)}$ is divided by $${shift(-k).replace(/[()]/g, "")}$.`,
      answer: String(R),
      hint: `The remainder when dividing by (x − k) is f(k).`,
      solution: `$$f(${k}) = ${polyTex(c).replace(/x/g, `(${k})`)} = ${R}$$`,
    };
  },
};

const cubicFactor: Generator = {
  id: "cubic-factor",
  title: "Solve cubic equations",
  topic: "g12-polynomials",
  make(seed) {
    const r = seededRandom(seed);
    const roots = new Set<number>();
    while (roots.size < 3) roots.add(int(r, -5, 5));
    const [p, q, s] = [...roots];
    const c = mulPoly(mulPoly([-p, 1], [-q, 1]), [-s, 1]);
    const quad = mulPoly([-q, 1], [-s, 1]);
    return {
      q: `Solve for $x$: $${polyTex(c)} = 0$`,
      answer: `${p}; ${q}; ${s}`,
      kind: "set",
      hint: "Use the factor theorem: try factors of the constant term until f(k) = 0. Then divide to get a quadratic.",
      solution: `$f(${p}) = 0$, so $${shift(-p)}$ is a factor.\n$$${polyTex(c)} = ${shift(-p)}(${quadTex(1, quad[1], quad[0])})$$\n$$= ${shift(-p)}${shift(-q)}${shift(-s)} = 0 \\Rightarrow x = ${p} \\text{ or } x = ${q} \\text{ or } x = ${s}$$`,
    };
  },
};

// ------------------------------------------------------------ calculus
const firstPrinciples: Generator = {
  id: "first-principles",
  title: "Derivative from first principles",
  topic: "g12-calculus",
  make(seed) {
    const r = seededRandom(seed);
    const a = nonZero(r, -4, 4), b = int(r, -6, 6), c = int(r, -5, 5);
    return {
      q: `Use first principles to find $f'(x)$ if $f(x) = ${quadTex(a, b, c)}$. (Type the final answer.)`,
      answer: `${2 * a}x + (${b})`,
      kind: "expr",
      hint: "f'(x) = lim (h→0) [f(x + h) − f(x)] / h. Expand f(x + h) carefully.",
      solution: `$$f(x + h) = ${a}(x + h)^2${signed(b)}(x + h)${signed(c)} = ${a}x^2 + ${2 * a}xh + ${a}h^2${signed(b, "x")}${signed(b, "h")}${signed(c)}$$
$$f(x + h) - f(x) = ${2 * a}xh + ${a}h^2${signed(b, "h")}$$
$$f'(x) = \\lim_{h \\to 0}\\frac{h(${2 * a}x + ${a}h${signed(b)})}{h} = \\lim_{h \\to 0}(${2 * a}x + ${a}h${signed(b)}) = ${lead(2 * a, "x")}${signed(b)}$$`.replace(/ \+ 0h/g, ""),
    };
  },
};

const differentiate: Generator = {
  id: "differentiate",
  title: "Differentiate (power rule)",
  topic: "g12-calculus",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const FORMS = [
      { tex: (k: number) => `${lead(k, "x^3")}`, ans: (k: number) => `${3 * k}*x^2`, n: 3 },
      { tex: (k: number) => `${lead(k, "x^2")}`, ans: (k: number) => `${2 * k}*x`, n: 2 },
      { tex: (k: number) => `${lead(k, "x")}`, ans: (k: number) => `${k}`, n: 1 },
      { tex: (k: number) => `\\frac{${k}}{x}`, ans: (k: number) => `${-k}/x^2`, n: -1 },
      { tex: (k: number) => `\\frac{${k}}{x^2}`, ans: (k: number) => `${-2 * k}/x^3`, n: -2 },
      { tex: (k: number) => `${k === 1 ? "" : k}\\sqrt{x}`, ans: (k: number) => `${k}/(2*sqrt(x))`, n: 0.5 },
      { tex: (k: number) => `${k}`, ans: () => "0", n: 0 },
    ];
    const count = int(r, 2, 3);
    const chosen = [...FORMS].sort(() => r() - 0.5).slice(0, count);
    const ks = chosen.map(() => pick(r, [1, 2, 3, 4, 5, 6, -2, -3]));
    const tex = chosen.map((f, i) => f.tex(ks[i])).join(" + ").replace(/\+ -/g, "- ");
    const ans = chosen.map((f, i) => `(${f.ans(ks[i])})`).join(" + ");
    return {
      q: `Find $\\dfrac{dy}{dx}$ if $y = ${tex}$.`,
      answer: ans,
      kind: "expr",
      hint: "Write every term as a power of x first (1/x = x⁻¹, √x = x^½), then d/dx(axⁿ) = naxⁿ⁻¹.",
      solution: `Write each term as $ax^n$, then multiply by the exponent and subtract 1 from it:\n$$\\frac{dy}{dx} = ${chosen.map((f, i) => {
        const k = ks[i];
        if (f.n === 0) return "0";
        if (f.n === 1) return String(k);
        if (f.n === 0.5) return `\\frac{${k}}{2\\sqrt{x}}`;
        if (f.n < 0) return `${f.n * k}x^{${f.n - 1}}`;
        return `${f.n * k}x${f.n - 1 === 1 ? "" : `^{${f.n - 1}}`}`;
      }).join(" + ").replace(/\+ -/g, "- ")}$$`,
    };
  },
};

const tangent: Generator = {
  id: "tangent-eq",
  title: "Equation of a tangent",
  topic: "g12-calculus",
  make(seed) {
    const r = seededRandom(seed);
    const cubic = r() < 0.5;
    const c = cubic ? [int(r, -5, 5), int(r, -4, 4), int(r, -3, 3), pick(r, [1, -1, 2])] : [int(r, -6, 6), int(r, -5, 5), nonZero(r, -3, 3)];
    const k = int(r, -2, 3);
    const y0 = evalPoly(c, k);
    const m = evalPoly(deriv(c), k);
    const cc = y0 - m * k;
    return {
      q: `Determine the equation of the tangent to $f(x) = ${polyTex(c)}$ at $x = ${k}$.`,
      answer: `${m}x + (${cc})`,
      kind: "expr",
      hint: "Gradient = f'(k). Point = (k; f(k)). Then y − y₁ = m(x − x₁).",
      solution: `$$f'(x) = ${polyTex(deriv(c))} \\Rightarrow m = f'(${k}) = ${m}$$\n$$f(${k}) = ${y0} \\Rightarrow y - (${y0}) = ${m}(x - (${k})) \\Rightarrow y = ${m === 0 ? cc : `${lead(m, "x")}${signed(cc)}`}$$`,
    };
  },
};

const stationary: Generator = {
  id: "stationary-points",
  title: "Stationary points of a cubic",
  topic: "g12-calculus",
  make(seed) {
    const r = seededRandom(seed);
    // f'(x) = 3(x − p)(x − q) → f(x) = x³ − (3/2)(p + q)x² + 3pq x + d; keep p + q even
    const p = int(r, -4, 3), q = p + 2 * int(r, 1, 3);
    const lo = Math.min(p, q), hi = Math.max(p, q);
    const d = int(r, -6, 6);
    const c = [d, 3 * lo * hi, (-3 * (lo + hi)) / 2, 1];
    const ask = r() < 0.5 ? "x" : "max";
    const maxY = evalPoly(c, lo);
    return ask === "x"
      ? {
        q: `Determine the x-coordinates of the stationary points of $f(x) = ${polyTex(c)}$.`,
        answer: `${lo}; ${hi}`, kind: "set",
        hint: "Set f'(x) = 0 and solve.",
        solution: `$$f'(x) = ${polyTex(deriv(c))} = 0 \\Rightarrow 3${shift(-lo)}${shift(-hi)} = 0 \\Rightarrow x = ${lo} \\text{ or } x = ${hi}$$`,
      }
      : {
        q: `Determine the coordinates of the local maximum of $f(x) = ${polyTex(c)}$.`,
        answer: `(${lo}; ${maxY})`, kind: "point",
        hint: "Solve f'(x) = 0. With a positive x³ coefficient, the local maximum is at the SMALLER x-value.",
        solution: `$$f'(x) = ${polyTex(deriv(c))} = 3${shift(-lo)}${shift(-hi)} = 0 \\Rightarrow x = ${lo} \\text{ or } ${hi}$$\nThe cubic rises, falls, then rises again, so the maximum is at $x = ${lo}$: $f(${lo}) = ${maxY}$, giving $(${lo};\\ ${maxY})$.`,
      };
  },
};

const rates: Generator = {
  id: "rate-of-change",
  title: "Rates of change & optimisation",
  topic: "g12-calculus",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    if (t === 0) {
      const v = int(r, 10, 40), h0 = int(r, 0, 30), k = int(r, 1, 3);
      return {
        q: `A ball is thrown upwards. Its height after $t$ seconds is $h(t) = ${h0 ? `${h0} + ` : ""}${v}t - 5t^2$ metres. Calculate its speed (rate of change of height) after ${k} s, in m/s.`,
        answer: String(v - 10 * k),
        hint: "The rate of change is h'(t).",
        solution: `$$h'(t) = ${v} - 10t \\Rightarrow h'(${k}) = ${v - 10 * k} \\text{ m/s}$$${v - 10 * k < 0 ? "\n\nNegative: the ball is already coming down." : ""}`,
      };
    }
    if (t === 1) {
      const v = int(r, 10, 40), h0 = int(r, 0, 30);
      const tm = v / 10, hm = h0 + v * tm - 5 * tm * tm;
      return {
        q: `A ball's height is $h(t) = ${h0 ? `${h0} + ` : ""}${v}t - 5t^2$ metres. Calculate the maximum height.`,
        answer: String(round(hm, 2)), tol: 0.011,
        hint: "Maximum where h'(t) = 0.",
        solution: `$$h'(t) = ${v} - 10t = 0 \\Rightarrow t = ${fmt(tm, tm % 1 ? 1 : 0)}$$\n$$h(${fmt(tm, tm % 1 ? 1 : 0)}) = ${fmt(round(hm, 2))} \\text{ m}$$`,
      };
    }
    const P = 4 * int(r, 5, 50);
    return {
      q: `A rectangular garden has a perimeter of ${P} m. What is the maximum possible area (in m²)?`,
      answer: String((P / 4) ** 2),
      hint: "Let one side be x: the other side is P/2 − x. Area A(x) = x(P/2 − x); set A'(x) = 0.",
      solution: `$$A(x) = x\\left(${P / 2} - x\\right) = ${P / 2}x - x^2 \\Rightarrow A'(x) = ${P / 2} - 2x = 0 \\Rightarrow x = ${P / 4}$$\nA square! Area $= ${P / 4}^2 = ${(P / 4) ** 2} \\text{ m}^2$.`,
    };
  },
};

export const G12_ALGEBRA_GENERATORS: Generator[] = [
  arithmetic, geometric, sigma,
  inverse, logEval, logEquation,
  fvAnnuity, loanPayment,
  remainder, cubicFactor,
  firstPrinciples, differentiate, tangent, stationary, rates,
];
