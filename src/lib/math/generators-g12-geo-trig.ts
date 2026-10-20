/**
 * Phase 4 generators: Grade 12 analytical geometry (circles and tangents),
 * Euclidean geometry (proportionality and similarity) and trigonometry
 * (compound and double angles, equations, 2D and 3D problems).
 * Same contract as generators.ts.
 */
import { seededRandom } from "@/lib/utils";
import { fmt, fracAns, fracTex, gcd, round, simplifySurd, surdAns, surdTex } from "./numbers";
import { type Generator, int, nonZero, pick } from "./gen-kit";

type Pt = [number, number];
const DEG = Math.PI / 180;
const deg = (x: number) => `${x}^\\circ`;
const ptTex = (name: string, [x, y]: Pt) => `${name}(${x};\\ ${y})`;

function reduce(n: number, d: number): [number, number] {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
/** y = (n/d)x + cn/cd as LaTeX and as a checker expression. */
function lineTex(n: number, d: number, cn: number, cd: number) {
  const m = n / d;
  const slope = n === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${fracTex(n, d)}x`;
  const c = cn / cd;
  if (!slope) return `y = ${fracTex(cn, cd)}`;
  return `y = ${slope}${c === 0 ? "" : c > 0 ? ` + ${fracTex(cn, cd)}` : ` - ${fracTex(-cn, cd)}`}`;
}
const lineAns = (n: number, d: number, cn: number, cd: number) => `(${n})/(${d})*x + (${cn})/(${cd})`;

/** (x − a)² written nicely: x², (x − 3)², (x + 2)². */
const sq = (v: string, a: number) => (a === 0 ? `${v}^2` : `(${v} ${a > 0 ? "-" : "+"} ${Math.abs(a)})^2`);
const circleTex = (a: number, b: number, r2: number) => `${sq("x", a)} + ${sq("y", b)} = ${r2}`;
/** A signed term for a general-form equation: " + 4x", " - y", " - 7". */
const term = (k: number, v = "") => (k === 0 ? "" : `${k > 0 ? " + " : " - "}${Math.abs(k) === 1 && v ? "" : Math.abs(k)}${v}`);

// ------------------------------------------------------------ analytical geometry: circles
const circleCentreRadius: Generator = {
  id: "circle-centre-radius",
  title: "Centre & radius of a circle",
  topic: "g12-analytical",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = nonZero(r, -5, 5), b = int(r, -5, 5);
    const r2 = int(r, 4, 45);
    const D = -2 * a, E = -2 * b, F = a * a + b * b - r2;
    const eq = `x^2 + y^2${term(D, "x")}${term(E, "y")}${term(F)} = 0`;
    const work = `$$x^2${term(D, "x")} + ${a * a} + y^2${term(E, "y")}${b ? ` + ${b * b}` : ""} = ${-F} + ${a * a}${b ? ` + ${b * b}` : ""}$$\n$$${circleTex(a, b, r2)}$$`;
    const { k, m } = simplifySurd(r2);
    if (r() < 0.5) {
      return {
        q: `Determine the coordinates of the centre of the circle $${eq}$.`,
        answer: `(${a}; ${b})`,
        kind: "point",
        hint: "Complete the square for x and for y: add (half the coefficient)² to both sides.",
        solution: `${work}\nCentre $(${a};\\ ${b})$.`,
      };
    }
    return {
      q: `Determine the radius of the circle $${eq}$. Leave your answer in simplest surd form if necessary.`,
      answer: surdAns(k, m),
      form: "simplified-surd",
      hint: "Complete the square for x and for y; the number on the right is r².",
      solution: `${work}\n$$r = \\sqrt{${r2}}${m === r2 ? "" : ` = ${surdTex(k, m)}`}$$`,
    };
  },
};

/** Radius vectors (p; q) with whole-number lengths or small r², none vertical or horizontal. */
const RADII: Pt[] = [[3, 4], [4, 3], [-3, 4], [3, -4], [-4, -3], [4, -3], [1, 2], [2, 1], [-1, 2], [2, -1], [-2, -1], [1, 1], [-1, 1], [1, 3], [-3, 1], [2, 3], [-3, -2]];

const circleTangent: Generator = {
  id: "circle-tangent",
  title: "Tangent to a circle",
  topic: "g12-analytical",
  make(seed) {
    const r = seededRandom(seed);
    const origin = r() < 0.35;
    const a = origin ? 0 : int(r, -4, 4), b = origin ? 0 : int(r, -4, 4);
    const [p, q] = pick(r, RADII);
    const P: Pt = [a + p, b + q];
    const r2 = p * p + q * q;
    const [n, d] = reduce(-p, q);
    const [cn, cd] = reduce(P[1] * d - n * P[0], d);
    const eq = origin ? `x^2 + y^2 = ${r2}` : circleTex(a, b, r2);
    return {
      q: `Determine the equation of the tangent to the circle $${eq}$ at the point $${ptTex("P", P)}$, in the form $y = mx + c$.`,
      answer: lineAns(n, d, cn, cd),
      kind: "expr",
      hint: "The tangent is perpendicular to the radius at P: find the gradient of the radius from the centre to P, then m_tangent × m_radius = −1.",
      solution: `Centre $${ptTex("M", [a, b])}$.\n$$m_{MP} = \\frac{${P[1]} - (${b})}{${P[0]} - (${a})} = ${fracTex(q, p)} \\Rightarrow m_{\\text{tangent}} = ${fracTex(n, d)} \\text{ (tan} \\perp \\text{radius)}$$\n$$y - (${P[1]}) = ${fracTex(n, d)}(x - (${P[0]})) \\;\\Rightarrow\\; ${lineTex(n, d, cn, cd)}$$`,
    };
  },
};

const circlePoint: Generator = {
  id: "circle-point",
  title: "Points on a circle",
  topic: "g12-analytical",
  make(seed) {
    const r = seededRandom(seed);
    const [p, q] = pick(r, [[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6], [1, 2], [2, 1], [2, 3]] as Pt[]);
    const a = int(r, -4, 4), b = int(r, -4, 4);
    const r2 = p * p + q * q;
    const sgn = r() < 0.5 ? 1 : -1;
    const yv = b + sgn * q;
    return {
      q: `The point $(k;\\ ${yv})$ lies on the circle $${a === 0 && b === 0 ? `x^2 + y^2 = ${r2}` : circleTex(a, b, r2)}$. Determine the possible values of $k$.`,
      answer: `${a + p}; ${a - p}`,
      kind: "set",
      hint: "Substitute x = k and the given y-value, then solve for k.",
      solution: `$$${sq("k", a)} + (${yv} ${b >= 0 ? "-" : "+"} ${Math.abs(b)})^2 = ${r2}$$\n$$${sq("k", a)} = ${r2} - ${q * q} = ${p * p} \\Rightarrow k ${a ? `${a > 0 ? "-" : "+"} ${Math.abs(a)} ` : ""}= \\pm ${p}$$\n$$k = ${a + p} \\text{ or } k = ${a - p}$$`,
    };
  },
};

// ------------------------------------------------------------ Euclidean geometry
const proportion: Generator = {
  id: "proportion",
  title: "Proportionality theorem",
  topic: "g12-euclidean",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const AD = int(r, 2, 9), DB = int(r, 2, 9), AE = int(r, 2, 12);
    const fig = { widget: "figure" as const, props: { points: { A: [2, 5] as Pt, B: [0, 0] as Pt, C: [7, 0] as Pt, D: [2 - 2 * (AD / (AD + DB)), 5 - 5 * (AD / (AD + DB))] as Pt, E: [2 + 5 * (AD / (AD + DB)), 5 - 5 * (AD / (AD + DB))] as Pt }, segments: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"]] } };
    if (r() < 0.55) {
      return {
        q: `In $\\triangle ABC$, $D$ lies on $AB$ and $E$ on $AC$ with $DE \\parallel BC$. $AD = ${AD}$, $DB = ${DB}$ and $AE = ${AE}$. Calculate $EC$.`,
        answer: fracAns(AE * DB, AD),
        hint: "Line ∥ one side of a triangle divides the other two sides in proportion: AD/DB = AE/EC.",
        solution: `$$\\frac{AD}{DB} = \\frac{AE}{EC} \\text{ (line } \\parallel \\text{ one side of } \\triangle) \\Rightarrow \\frac{${AD}}{${DB}} = \\frac{${AE}}{EC}$$\n$$EC = \\frac{${AE} \\times ${DB}}{${AD}} = ${fracTex(AE * DB, AD)}$$`,
        figure: fig,
      };
    }
    const AC = AE + int(r, 2, 10);
    const g = gcd(AD, DB);
    const [u, v] = [AD / g, DB / g];
    return {
      q: `In $\\triangle ABC$, $DE \\parallel BC$ with $D$ on $AB$ and $E$ on $AC$. If $AD : DB = ${u} : ${v}$ and $AC = ${AC}$, calculate $AE$.`,
      answer: fracAns(AC * u, u + v),
      hint: "AE/AC = AD/AB, and AB has AD + DB parts.",
      solution: `$$\\frac{AE}{AC} = \\frac{AD}{AB} = \\frac{${u}}{${u + v}} \\text{ (line } \\parallel \\text{ one side of } \\triangle)$$\n$$AE = \\frac{${u}}{${u + v}} \\times ${AC} = ${fracTex(AC * u, u + v)}$$`,
      figure: fig,
    };
  },
};

const similarSides: Generator = {
  id: "similar-sides",
  title: "Similar triangles",
  topic: "g12-euclidean",
  make(seed) {
    const r = seededRandom(seed);
    const AB = int(r, 3, 12), BC = int(r, 3, 12), DE = int(r, 2, 20);
    const t = int(r, 0, 2);
    if (t === 2) {
      const [n, d] = reduce(DE, AB);
      return {
        q: `$\\triangle ABC \\,|||\\, \\triangle DEF$ with $AB = ${AB}$ and $DE = ${DE}$. The area of $\\triangle ABC$ is ${d * d * 2} cm². Calculate the area of $\\triangle DEF$.`,
        answer: fracAns(n * n * 2 * d * d, d * d),
        hint: "If the sides are in the ratio k, the areas are in the ratio k².",
        solution: `$$k = \\frac{DE}{AB} = ${fracTex(n, d)} \\Rightarrow \\text{area ratio} = k^2 = ${fracTex(n * n, d * d)}$$\n$$\\text{Area } \\triangle DEF = ${fracTex(n * n, d * d)} \\times ${d * d * 2} = ${fracTex(n * n * 2, 1)} \\text{ cm}^2$$`,
      };
    }
    const flip = t === 1;
    return {
      q: flip
        ? `$\\triangle ABC \\,|||\\, \\triangle DEF$ with $DE = ${DE}$, $EF = ${BC}$ and $AB = ${AB}$. Calculate $BC$.`
        : `$\\triangle ABC \\,|||\\, \\triangle DEF$ with $AB = ${AB}$, $BC = ${BC}$ and $DE = ${DE}$. Calculate $EF$.`,
      answer: flip ? fracAns(BC * AB, DE) : fracAns(BC * DE, AB),
      hint: "Similar triangles have sides in proportion: AB/DE = BC/EF = AC/DF (match the letters in order).",
      solution: flip
        ? `$$\\frac{BC}{EF} = \\frac{AB}{DE} \\text{ (|||} \\triangle s) \\Rightarrow BC = \\frac{${AB} \\times ${BC}}{${DE}} = ${fracTex(BC * AB, DE)}$$`
        : `$$\\frac{EF}{BC} = \\frac{DE}{AB} \\text{ (|||} \\triangle s) \\Rightarrow EF = \\frac{${DE} \\times ${BC}}{${AB}} = ${fracTex(BC * DE, AB)}$$`,
    };
  },
};

// ------------------------------------------------------------ trigonometry
const SPEC: Record<"sin" | "cos", Record<number, [string, string]>> = {
  sin: { 30: ["\\frac{1}{2}", "1/2"], 45: ["\\frac{\\sqrt{2}}{2}", "sqrt(2)/2"], 60: ["\\frac{\\sqrt{3}}{2}", "sqrt(3)/2"], 90: ["1", "1"], 120: ["\\frac{\\sqrt{3}}{2}", "sqrt(3)/2"], 150: ["\\frac{1}{2}", "1/2"] },
  cos: { 30: ["\\frac{\\sqrt{3}}{2}", "sqrt(3)/2"], 45: ["\\frac{\\sqrt{2}}{2}", "sqrt(2)/2"], 60: ["\\frac{1}{2}", "1/2"], 90: ["0", "0"], 120: ["-\\frac{1}{2}", "-1/2"], 150: ["-\\frac{\\sqrt{3}}{2}", "-sqrt(3)/2"] },
};

/** Exact values of 15°, 75°, 105° and 165° via a compound angle. */
const EXACT: { f: "sin" | "cos"; x: number; split: string; work: string; tex: string; ans: string }[] = [
  { f: "sin", x: 75, split: "45^\\circ + 30^\\circ", work: "\\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}", tex: "\\frac{\\sqrt{6} + \\sqrt{2}}{4}", ans: "(sqrt(6) + sqrt(2))/4" },
  { f: "cos", x: 75, split: "45^\\circ + 30^\\circ", work: "\\cos 45^\\circ\\cos 30^\\circ - \\sin 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}", tex: "\\frac{\\sqrt{6} - \\sqrt{2}}{4}", ans: "(sqrt(6) - sqrt(2))/4" },
  { f: "sin", x: 15, split: "45^\\circ - 30^\\circ", work: "\\sin 45^\\circ\\cos 30^\\circ - \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}", tex: "\\frac{\\sqrt{6} - \\sqrt{2}}{4}", ans: "(sqrt(6) - sqrt(2))/4" },
  { f: "cos", x: 15, split: "45^\\circ - 30^\\circ", work: "\\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}", tex: "\\frac{\\sqrt{6} + \\sqrt{2}}{4}", ans: "(sqrt(6) + sqrt(2))/4" },
  { f: "cos", x: 105, split: "60^\\circ + 45^\\circ", work: "\\cos 60^\\circ\\cos 45^\\circ - \\sin 60^\\circ\\sin 45^\\circ = \\frac{1}{2}\\cdot\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{2}}{2}", tex: "\\frac{\\sqrt{2} - \\sqrt{6}}{4}", ans: "(sqrt(2) - sqrt(6))/4" },
  { f: "sin", x: 105, split: "60^\\circ + 45^\\circ", work: "\\sin 60^\\circ\\cos 45^\\circ + \\cos 60^\\circ\\sin 45^\\circ = \\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{2}}{2} + \\frac{1}{2}\\cdot\\frac{\\sqrt{2}}{2}", tex: "\\frac{\\sqrt{6} + \\sqrt{2}}{4}", ans: "(sqrt(6) + sqrt(2))/4" },
];

const compoundExact: Generator = {
  id: "compound-exact",
  title: "Compound angles: exact values",
  topic: "g12-trig",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    if (r() < 0.35) {
      const e = pick(r, EXACT);
      return {
        q: `Without a calculator, determine the exact value of $\\${e.f} ${deg(e.x)}$ by writing it as a compound angle.`,
        answer: e.ans,
        hint: `Write ${e.x}° as a sum or difference of special angles, then expand.`,
        solution: `$$\\${e.f} ${deg(e.x)} = \\${e.f}(${e.split}) = ${e.work} = ${e.tex}$$`,
      };
    }
    const f = pick(r, ["sin", "cos"] as const);
    const plus = r() < 0.5;
    const R = pick(r, [30, 45, 60, 90, 120, 150]);
    const B = 5 * int(r, 1, plus ? Math.floor((R - 5) / 5) : 6);
    const A = plus ? R - B : R + B;
    const expr = f === "sin"
      ? `\\sin ${deg(A)}\\cos ${deg(B)} ${plus ? "+" : "-"} \\cos ${deg(A)}\\sin ${deg(B)}`
      : `\\cos ${deg(A)}\\cos ${deg(B)} ${plus ? "-" : "+"} \\sin ${deg(A)}\\sin ${deg(B)}`;
    const [tex, ans] = SPEC[f][R];
    return {
      q: `Without a calculator, simplify: $${expr}$`,
      answer: ans,
      hint: f === "sin" ? "sin A cos B ± cos A sin B = sin(A ± B)" : "cos A cos B ∓ sin A sin B = cos(A ± B)",
      solution: `$$${expr} = \\${f}(${deg(A)} ${plus ? "+" : "-"} ${deg(B)}) = \\${f} ${deg(R)} = ${tex}$$`,
    };
  },
};

const TRIPLES: [number, number, number][] = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [4, 3, 5], [12, 5, 13]];
const QUADS = [
  { sx: 1, sy: 1, range: "0^\\circ < \\theta < 90^\\circ" },
  { sx: -1, sy: 1, range: "90^\\circ < \\theta < 180^\\circ" },
  { sx: -1, sy: -1, range: "180^\\circ < \\theta < 270^\\circ" },
  { sx: 1, sy: -1, range: "270^\\circ < \\theta < 360^\\circ" },
];

const doubleAngle: Generator = {
  id: "double-angle",
  title: "Double angles from a sketch",
  topic: "g12-trig",
  make(seed) {
    const r = seededRandom(seed);
    const [p, q, h] = pick(r, TRIPLES);
    const Q = pick(r, QUADS);
    const x = Q.sx * p, y = Q.sy * q;
    const givenSin = r() < 0.5;
    const given = givenSin ? `\\sin\\theta = ${fracTex(y, h)}` : `\\cos\\theta = ${fracTex(x, h)}`;
    const ask = pick(r, ["sin", "cos"] as const);
    const val = ask === "sin" ? [2 * x * y, h * h] : [x * x - y * y, h * h];
    return {
      q: `If $${given}$ and $${Q.range}$, determine without a calculator the value of $\\${ask} 2\\theta$.`,
      answer: fracAns(val[0], val[1]),
      hint: "Sketch θ in the right quadrant, find the missing side with Pythagoras (watch the sign!), then use the double-angle formula.",
      solution: `$x = ${x}$, $y = ${y}$, $r = ${h}$ (Pythagoras, quadrant ${QUADS.indexOf(Q) + 1}).\n$$${ask === "sin" ? `\\sin 2\\theta = 2\\sin\\theta\\cos\\theta = 2\\left(${fracTex(y, h)}\\right)\\left(${fracTex(x, h)}\\right)` : `\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = \\left(${fracTex(x, h)}\\right)^2 - \\left(${fracTex(y, h)}\\right)^2`} = ${fracTex(val[0], val[1])}$$`,
    };
  },
};

const DOUBLE_SIMPLIFY: [string, string, string][] = [
  ["\\frac{\\sin 2x}{2\\cos x}", "sin(x)", "\\frac{2\\sin x\\cos x}{2\\cos x} = \\sin x"],
  ["\\frac{\\sin 2x}{1 + \\cos 2x}", "tan(x)", "\\frac{2\\sin x\\cos x}{1 + 2\\cos^2 x - 1} = \\frac{2\\sin x\\cos x}{2\\cos^2 x} = \\tan x"],
  ["\\frac{1 - \\cos 2x}{\\sin 2x}", "tan(x)", "\\frac{1 - (1 - 2\\sin^2 x)}{2\\sin x\\cos x} = \\frac{2\\sin^2 x}{2\\sin x\\cos x} = \\tan x"],
  ["\\cos^4 x - \\sin^4 x", "cos(2x)", "(\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x) = \\cos 2x \\cdot 1 = \\cos 2x"],
  ["(\\sin x + \\cos x)^2 - 1", "sin(2x)", "\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x - 1 = 1 + \\sin 2x - 1 = \\sin 2x"],
  ["\\frac{\\cos 2x + 1}{2\\cos x}", "cos(x)", "\\frac{2\\cos^2 x - 1 + 1}{2\\cos x} = \\frac{2\\cos^2 x}{2\\cos x} = \\cos x"],
  ["\\frac{1 - \\cos 2x}{2\\sin x}", "sin(x)", "\\frac{2\\sin^2 x}{2\\sin x} = \\sin x"],
  ["\\frac{\\cos 2x}{\\cos x + \\sin x}", "cos(x) - sin(x)", "\\frac{(\\cos x - \\sin x)(\\cos x + \\sin x)}{\\cos x + \\sin x} = \\cos x - \\sin x"],
  ["\\sin(90^\\circ + x)\\cos x - \\sin^2 x", "cos(2x)", "\\cos x \\cdot \\cos x - \\sin^2 x = \\cos^2 x - \\sin^2 x = \\cos 2x"],
  ["4\\sin x\\cos x\\cos 2x", "sin(4x)", "2(2\\sin x\\cos x)\\cos 2x = 2\\sin 2x\\cos 2x = \\sin 4x"],
];

const doubleSimplify: Generator = {
  id: "double-simplify",
  title: "Simplify with double angles",
  topic: "g12-trig",
  make(seed) {
    const r = seededRandom(seed);
    const [q, a, work] = pick(r, DOUBLE_SIMPLIFY);
    return {
      q: `Simplify to a single trig term (or difference): $${q}$`,
      answer: a,
      kind: "expr",
      hint: "sin 2x = 2 sin x cos x; cos 2x = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x. Pick the cos 2x form that cancels.",
      solution: `$$${q} = ${work}$$`,
    };
  },
};

/** Compound and double-angle equations whose solutions in [0°; 360°] are whole degrees. */
const EQUATIONS: { tex: string; f: (x: number) => number; work: string }[] = [
  { tex: "\\sin 2x = \\cos x", f: (x) => Math.sin(2 * x) - Math.cos(x), work: "2\\sin x\\cos x - \\cos x = 0 \\Rightarrow \\cos x(2\\sin x - 1) = 0 \\Rightarrow \\cos x = 0 \\text{ or } \\sin x = \\tfrac{1}{2}" },
  { tex: "\\sin 2x = -\\cos x", f: (x) => Math.sin(2 * x) + Math.cos(x), work: "\\cos x(2\\sin x + 1) = 0 \\Rightarrow \\cos x = 0 \\text{ or } \\sin x = -\\tfrac{1}{2}" },
  { tex: "\\sin 2x = \\sin x", f: (x) => Math.sin(2 * x) - Math.sin(x), work: "\\sin x(2\\cos x - 1) = 0 \\Rightarrow \\sin x = 0 \\text{ or } \\cos x = \\tfrac{1}{2}" },
  { tex: "\\sin 2x + \\sin x = 0", f: (x) => Math.sin(2 * x) + Math.sin(x), work: "\\sin x(2\\cos x + 1) = 0 \\Rightarrow \\sin x = 0 \\text{ or } \\cos x = -\\tfrac{1}{2}" },
  { tex: "\\cos 2x = \\sin x", f: (x) => Math.cos(2 * x) - Math.sin(x), work: "1 - 2\\sin^2 x - \\sin x = 0 \\Rightarrow (2\\sin x - 1)(\\sin x + 1) = 0 \\Rightarrow \\sin x = \\tfrac{1}{2} \\text{ or } \\sin x = -1" },
  { tex: "\\cos 2x + \\sin x = 0", f: (x) => Math.cos(2 * x) + Math.sin(x), work: "2\\sin^2 x - \\sin x - 1 = 0 \\Rightarrow (2\\sin x + 1)(\\sin x - 1) = 0 \\Rightarrow \\sin x = -\\tfrac{1}{2} \\text{ or } \\sin x = 1" },
  { tex: "\\cos 2x = \\cos x", f: (x) => Math.cos(2 * x) - Math.cos(x), work: "2\\cos^2 x - \\cos x - 1 = 0 \\Rightarrow (2\\cos x + 1)(\\cos x - 1) = 0 \\Rightarrow \\cos x = -\\tfrac{1}{2} \\text{ or } \\cos x = 1" },
  { tex: "\\cos 2x + \\cos x = 0", f: (x) => Math.cos(2 * x) + Math.cos(x), work: "2\\cos^2 x + \\cos x - 1 = 0 \\Rightarrow (2\\cos x - 1)(\\cos x + 1) = 0 \\Rightarrow \\cos x = \\tfrac{1}{2} \\text{ or } \\cos x = -1" },
  { tex: "\\sin x\\cos 30^\\circ + \\cos x\\sin 30^\\circ = \\tfrac{1}{2}", f: (x) => Math.sin(x + 30 * DEG) - 0.5, work: "\\sin(x + 30^\\circ) = \\tfrac{1}{2} \\Rightarrow x + 30^\\circ = 30^\\circ,\\ 150^\\circ \\text{ or } 390^\\circ" },
  { tex: "\\cos x\\cos 20^\\circ - \\sin x\\sin 20^\\circ = \\tfrac{1}{2}", f: (x) => Math.cos(x + 20 * DEG) - 0.5, work: "\\cos(x + 20^\\circ) = \\tfrac{1}{2} \\Rightarrow x + 20^\\circ = 60^\\circ \\text{ or } 300^\\circ" },
  { tex: "\\sin x\\cos 40^\\circ - \\cos x\\sin 40^\\circ = \\tfrac{\\sqrt{3}}{2}", f: (x) => Math.sin(x - 40 * DEG) - Math.sqrt(3) / 2, work: "\\sin(x - 40^\\circ) = \\tfrac{\\sqrt{3}}{2} \\Rightarrow x - 40^\\circ = 60^\\circ \\text{ or } 120^\\circ" },
  { tex: "2\\sin x\\cos x = \\tfrac{1}{2}", f: (x) => Math.sin(2 * x) - 0.5, work: "\\sin 2x = \\tfrac{1}{2} \\Rightarrow 2x = 30^\\circ,\\ 150^\\circ,\\ 390^\\circ \\text{ or } 510^\\circ" },
  { tex: "\\cos^2 x - \\sin^2 x = -\\tfrac{1}{2}", f: (x) => Math.cos(2 * x) + 0.5, work: "\\cos 2x = -\\tfrac{1}{2} \\Rightarrow 2x = 120^\\circ,\\ 240^\\circ,\\ 480^\\circ \\text{ or } 600^\\circ" },
];

/** Whole-degree roots of f in [0°; 360°]. */
export function wholeDegreeRoots(f: (x: number) => number): number[] {
  const out: number[] = [];
  for (let d = 0; d <= 360; d++) if (Math.abs(f(d * DEG)) < 1e-9) out.push(d);
  return out;
}

const compoundEquation: Generator = {
  id: "compound-equation",
  title: "Compound & double-angle equations",
  topic: "g12-trig",
  make(seed) {
    const r = seededRandom(seed);
    const e = pick(r, EQUATIONS);
    const roots = wholeDegreeRoots(e.f);
    return {
      q: `Solve for $x$ if $0^\\circ \\leq x \\leq 360^\\circ$: $${e.tex}$`,
      answer: roots.join("; "),
      kind: "set",
      hint: "Use a compound or double-angle formula so there is only ONE kind of angle, then factorise or solve a basic equation. Don't divide by cos x or sin x – you lose solutions!",
      solution: `$$${e.work}$$\n$$x = ${roots.map(deg).join(";\\ ")}$$`,
    };
  },
};

const heights: Generator = {
  id: "heights-3d",
  title: "Heights & distances (2D and 3D)",
  topic: "g12-trig",
  make(seed) {
    const r = seededRandom(seed);
    if (r() < 0.6) {
      // 3D: tower TB at B; A and C on the ground.
      const d = 10 * int(r, 3, 12), x = 5 * int(r, 5, 14), y = 5 * int(r, 5, 14), th = int(r, 15, 55);
      const B = 180 - x - y;
      const AB = (d * Math.sin(y * DEG)) / Math.sin(B * DEG);
      const TB = AB * Math.tan(th * DEG);
      return {
        q: `$TB$ is a vertical tower. $A$, $B$ and $C$ lie in the same horizontal plane, with $AC = ${d}$ m, $B\\hat{A}C = ${deg(x)}$ and $B\\hat{C}A = ${deg(y)}$. The angle of elevation of $T$ from $A$ is $${deg(th)}$. Calculate the height of the tower, correct to two decimal places.`,
        answer: String(round(TB, 2)),
        tol: 0.03,
        hint: "First find AB in the horizontal triangle ABC (sine rule – you need the angle at B), then use tan in the vertical right triangle TBA.",
        solution: `$$A\\hat{B}C = 180^\\circ - ${deg(x)} - ${deg(y)} = ${deg(B)}$$\n$$\\frac{AB}{\\sin ${deg(y)}} = \\frac{${d}}{\\sin ${deg(B)}} \\Rightarrow AB = ${fmt(round(AB, 2))} \\text{ m}$$\n$$TB = AB\\tan ${deg(th)} = ${fmt(round(TB, 2))} \\text{ m}$$`,
      };
    }
    // 2D: two observers on the same side of the tower.
    const d = 10 * int(r, 2, 10), a = int(r, 15, 35), b = a + int(r, 10, 30);
    const AT = (d * Math.sin(a * DEG)) / Math.sin((b - a) * DEG);
    const h = AT * Math.sin(b * DEG);
    return {
      q: `Two learners, $A$ and $B$, stand ${d} m apart in a straight line with the foot $F$ of a tower, $B$ closer to the tower. The angles of elevation of the top $T$ from $A$ and $B$ are $${deg(a)}$ and $${deg(b)}$. Calculate the height of the tower, correct to two decimal places.`,
      answer: String(round(h, 2)),
      tol: 0.03,
      hint: "In △ABT: the angle at T is the difference of the elevations (exterior angle). Use the sine rule to find BT, then sin in the right triangle TFB.",
      solution: `$$A\\hat{T}B = ${deg(b)} - ${deg(a)} = ${deg(b - a)} \\text{ (ext } \\angle \\text{ of } \\triangle)$$\n$$\\frac{BT}{\\sin ${deg(a)}} = \\frac{${d}}{\\sin ${deg(b - a)}} \\Rightarrow BT = ${fmt(round(AT, 2))} \\text{ m}$$\n$$TF = BT\\sin ${deg(b)} = ${fmt(round(h, 2))} \\text{ m}$$`,
    };
  },
};

export const G12_GEO_TRIG_GENERATORS: Generator[] = [
  circleCentreRadius, circleTangent, circlePoint,
  proportion, similarSides,
  compoundExact, doubleAngle, doubleSimplify, compoundEquation, heights,
];
