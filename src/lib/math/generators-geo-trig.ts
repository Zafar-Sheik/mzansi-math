/**
 * Phase 2 generators: Grade 11 analytical geometry, Euclidean geometry,
 * measurement and trigonometry. Same contract as generators.ts.
 */
import { seededRandom } from "@/lib/utils";
import { fmt, fracAns, fracTex, gcd, round, simplifySurd, surdAns, surdTex } from "./numbers";
import { type Generator, int, nonZero, pick } from "./gen-kit";

type Pt = [number, number];
const DEG = Math.PI / 180;
const onCircle = (r: number, deg: number): Pt => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)];
const deg = (x: number) => `${x}^\\circ`;

// ------------------------------------------------------------ exact values a·√k / d
interface Exact { n: number; d: number; k: number }
function norm(v: Exact): Exact {
  const s = simplifySurd(v.k);
  let n = v.n * s.k;
  let d = v.d;
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g, k: n === 0 ? 1 : s.m };
}
const mul = (a: Exact, b: Exact) => norm({ n: a.n * b.n, d: a.d * b.d, k: a.k * b.k });
const add = (a: Exact, b: Exact) => norm({ n: a.n * b.d + b.n * a.d, d: a.d * b.d, k: a.k });
const div = (a: Exact, b: Exact) => mul(a, norm({ n: b.d, d: b.n * b.k, k: b.k }));
function exTex({ n, d, k }: Exact): string {
  if (n === 0) return "0";
  if (k === 1) return fracTex(n, d);
  const sign = n < 0 ? "-" : "";
  const c = Math.abs(n);
  const top = `${c === 1 ? "" : c}\\sqrt{${k}}`;
  return d === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${d}}`;
}
const exAns = ({ n, d, k }: Exact) => (k === 1 ? fracAns(n, d) : `${n}*sqrt(${k})/${d}`);

type Fn = "sin" | "cos" | "tan";
const SPECIAL: Record<Fn, Record<number, Exact>> = {
  sin: { 0: { n: 0, d: 1, k: 1 }, 30: { n: 1, d: 2, k: 1 }, 45: { n: 1, d: 2, k: 2 }, 60: { n: 1, d: 2, k: 3 }, 90: { n: 1, d: 1, k: 1 } },
  cos: { 0: { n: 1, d: 1, k: 1 }, 30: { n: 1, d: 2, k: 3 }, 45: { n: 1, d: 2, k: 2 }, 60: { n: 1, d: 2, k: 1 }, 90: { n: 0, d: 1, k: 1 } },
  tan: { 0: { n: 0, d: 1, k: 1 }, 30: { n: 1, d: 3, k: 3 }, 45: { n: 1, d: 1, k: 1 }, 60: { n: 1, d: 1, k: 3 } },
};

// ------------------------------------------------------------ lines
/** y = (n/d)x + cn/cd as LaTeX and as a checker expression. */
function lineTex(n: number, d: number, cn: number, cd: number) {
  const m = n / d;
  const slope = n === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${fracTex(n, d)}x`;
  const c = cn / cd;
  if (!slope) return `y = ${fracTex(cn, cd)}`;
  return `y = ${slope}${c === 0 ? "" : c > 0 ? ` + ${fracTex(cn, cd)}` : ` - ${fracTex(-cn, cd)}`}`;
}
const lineAns = (n: number, d: number, cn: number, cd: number) => `(${n})/(${d})*x + (${cn})/(${cd})`;
function reduce(n: number, d: number): [number, number] {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return [n / g, d / g];
}
const ptTex = (name: string, [x, y]: Pt) => `${name}(${x};\\ ${y})`;

const distanceMidpoint: Generator = {
  id: "distance-midpoint",
  title: "Distance & midpoint",
  topic: "g11-analytical",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const A: Pt = [int(r, -6, 6), int(r, -6, 6)];
    const B: Pt = [A[0] + nonZero(r, -7, 7), A[1] + int(r, -7, 7)];
    const dx = B[0] - A[0], dy = B[1] - A[1];
    if (r() < 0.55) {
      const d2 = dx * dx + dy * dy;
      const { k, m } = simplifySurd(d2);
      return {
        q: `Calculate the length of $AB$ for $${ptTex("A", A)}$ and $${ptTex("B", B)}$. Leave your answer in simplest surd form if necessary.`,
        answer: surdAns(k, m),
        form: "simplified-surd",
        hint: "AB = √[(x₂ − x₁)² + (y₂ − y₁)²]",
        solution: `$$AB = \\sqrt{(${B[0]} - (${A[0]}))^2 + (${B[1]} - (${A[1]}))^2} = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${d2}}${m === d2 ? "" : ` = ${surdTex(k, m)}`}$$`,
      };
    }
    return {
      q: `Determine the coordinates of the midpoint $M$ of $AB$, with $${ptTex("A", A)}$ and $${ptTex("B", B)}$.`,
      answer: `(${fracAns(A[0] + B[0], 2)}; ${fracAns(A[1] + B[1], 2)})`,
      kind: "point",
      hint: "Average the x-values and average the y-values.",
      solution: `$$M\\left(\\frac{${A[0]} + (${B[0]})}{2};\\ \\frac{${A[1]} + (${B[1]})}{2}\\right) = M\\left(${fracTex(A[0] + B[0], 2)};\\ ${fracTex(A[1] + B[1], 2)}\\right)$$`,
    };
  },
};

const gradientInclination: Generator = {
  id: "gradient-inclination",
  title: "Gradient & inclination",
  topic: "g11-analytical",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    if (t === 2) {
      const ang = pick(r, [30, 45, 60, 120, 135, 150]);
      const ref = ang > 90 ? 180 - ang : ang;
      const v = SPECIAL.tan[ref];
      const val = ang > 90 ? { ...v, n: -v.n } : v;
      return {
        q: `A line has an inclination of $${deg(ang)}$. Determine its gradient exactly (no decimals).`,
        answer: exAns(val),
        hint: "m = tan θ. Use special angles (and a reduction formula if θ > 90°).",
        solution: `$$m = \\tan ${deg(ang)}${ang > 90 ? ` = -\\tan ${deg(ref)}` : ""} = ${exTex(val)}$$`,
      };
    }
    const A: Pt = [int(r, -5, 4), int(r, -5, 5)];
    const B: Pt = [A[0] + int(r, 1, 6), A[1] + nonZero(r, -6, 6)];
    const dx = B[0] - A[0], dy = B[1] - A[1];
    if (t === 0) {
      return {
        q: `Calculate the gradient of the line through $${ptTex("A", A)}$ and $${ptTex("B", B)}$.`,
        answer: fracAns(dy, dx),
        hint: "m = (y₂ − y₁) / (x₂ − x₁)",
        solution: `$$m_{AB} = \\frac{${B[1]} - (${A[1]})}{${B[0]} - (${A[0]})} = ${fracTex(dy, dx)}$$`,
      };
    }
    let th = Math.atan(dy / dx) / DEG;
    const neg = th < 0;
    if (neg) th += 180;
    return {
      q: `Calculate the inclination of the line through $${ptTex("A", A)}$ and $${ptTex("B", B)}$, correct to one decimal place.`,
      answer: String(round(th, 1)),
      tol: 0.06,
      hint: "tan θ = m. If m is negative, θ is obtuse: θ = 180° + tan⁻¹(m).",
      solution: `$$\\tan\\theta = m = ${fracTex(dy, dx)}$$${neg ? `\n\nThe gradient is negative, so $\\theta$ is obtuse: $\\theta = 180^\\circ + \\tan^{-1}\\left(${fracTex(dy, dx)}\\right) = ${fmt(round(th, 1), 1)}^\\circ$` : `\n\n$$\\theta = \\tan^{-1}\\left(${fracTex(dy, dx)}\\right) = ${fmt(round(th, 1), 1)}^\\circ$$`}`,
    };
  },
};

const SLOPES: [number, number][] = [[1, 1], [-1, 1], [2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2], [1, 3], [-1, 3], [3, 2], [-2, 3]];

const lineEquation: Generator = {
  id: "line-equation",
  title: "Equation of a line",
  topic: "g11-analytical",
  make(seed) {
    const r = seededRandom(seed);
    const [n, d] = pick(r, SLOPES);
    const A: Pt = [int(r, -5, 5), int(r, -5, 5)];
    const [cn, cd] = reduce(A[1] * d - n * A[0], d);
    if (r() < 0.5) {
      const k = pick(r, [1, 2, -1]);
      const B: Pt = [A[0] + d * k, A[1] + n * k];
      return {
        q: `Determine the equation of the line through $${ptTex("A", A)}$ and $${ptTex("B", B)}$ in the form $y = mx + c$.`,
        answer: lineAns(n, d, cn, cd),
        kind: "expr",
        hint: "Find m first, then substitute a point into y = mx + c (or use y − y₁ = m(x − x₁)).",
        solution: `$$m = \\frac{${B[1]} - (${A[1]})}{${B[0]} - (${A[0]})} = ${fracTex(n, d)}$$\n$$y - (${A[1]}) = ${fracTex(n, d)}(x - (${A[0]})) \\;\\Rightarrow\\; ${lineTex(n, d, cn, cd)}$$`,
      };
    }
    return {
      q: `Determine the equation of the line with gradient $${fracTex(n, d)}$ passing through $${ptTex("P", A)}$, in the form $y = mx + c$.`,
      answer: lineAns(n, d, cn, cd),
      kind: "expr",
      hint: "y − y₁ = m(x − x₁)",
      solution: `$$y - (${A[1]}) = ${fracTex(n, d)}(x - (${A[0]})) \\;\\Rightarrow\\; ${lineTex(n, d, cn, cd)}$$`,
    };
  },
};

const perpParallel: Generator = {
  id: "perp-parallel",
  title: "Parallel & perpendicular lines",
  topic: "g11-analytical",
  make(seed) {
    const r = seededRandom(seed);
    const [n, d] = pick(r, SLOPES);
    const c0 = int(r, -6, 6);
    const P: Pt = [int(r, -5, 5), int(r, -5, 5)];
    const perp = r() < 0.65;
    const [pn, pd] = perp ? reduce(-d, n) : [n, d];
    const [cn, cd] = reduce(P[1] * pd - pn * P[0], pd);
    return {
      q: `Determine the equation of the line ${perp ? "**perpendicular**" : "**parallel**"} to $${lineTex(n, d, c0, 1)}$ that passes through $${ptTex("P", P)}$.`,
      answer: lineAns(pn, pd, cn, cd),
      kind: "expr",
      hint: perp ? "Perpendicular: m₁ × m₂ = −1, so flip the fraction and change the sign." : "Parallel lines have equal gradients.",
      solution: `${perp ? `$$m_\\perp = -\\frac{1}{${fracTex(n, d)}} = ${fracTex(pn, pd)}$$` : `$$m_{\\parallel} = ${fracTex(n, d)}$$`}\n$$y - (${P[1]}) = ${fracTex(pn, pd)}(x - (${P[0]})) \\;\\Rightarrow\\; ${lineTex(pn, pd, cn, cd)}$$`,
    };
  },
};

// ------------------------------------------------------------ circle geometry
const circleAngle: Generator = {
  id: "circle-angle",
  title: "Circle-theorem angles",
  topic: "g11-euclidean",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const R = 3;
    const O: Pt = [0, 0];
    const t = int(r, 0, 5);
    if (t === 0) {
      const x = int(r, 25, 72);
      const A = onCircle(R, 270 - x), B = onCircle(R, 270 + x), C = onCircle(R, 90 + int(r, -35, 35));
      const fwd = r() < 0.5;
      return {
        q: fwd ? `$O$ is the centre of the circle and $\\hat{C} = ${deg(x)}$. Calculate $A\\hat{O}B$.` : `$O$ is the centre of the circle and $A\\hat{O}B = ${deg(2 * x)}$. Calculate $\\hat{C}$.`,
        answer: String(fwd ? 2 * x : x),
        hint: "∠ at centre = 2 × ∠ at circumference",
        solution: fwd ? `$$A\\hat{O}B = 2 \\times ${deg(x)} = ${deg(2 * x)}$$ (∠ at centre = 2 × ∠ at circumference)` : `$$\\hat{C} = \\tfrac{1}{2} \\times ${deg(2 * x)} = ${deg(x)}$$ (∠ at centre = 2 × ∠ at circumference)`,
        figure: { widget: "figure", props: { points: { O, A, B, C }, circles: [{ centre: "O", r: R }], segments: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: [{ at: "C", from: "A", to: "B", label: fwd ? `${x}°` : "?" }, { at: "O", from: "A", to: "B", label: fwd ? "?" : `${2 * x}°` }] } },
      };
    }
    if (t === 1) {
      const x = int(r, 15, 70);
      const A = onCircle(R, 180), B = onCircle(R, 0), C = onCircle(R, 2 * x);
      return {
        q: `$AB$ is a diameter of the circle with centre $O$, and $C\\hat{A}B = ${deg(x)}$. Calculate $C\\hat{B}A$.`,
        answer: String(90 - x),
        hint: "What is the angle at C? Then use the angle sum of the triangle.",
        solution: `$\\hat{C} = 90^\\circ$ (∠ in semi-circle)\n\n$$C\\hat{B}A = 180^\\circ - 90^\\circ - ${deg(x)} = ${deg(90 - x)}$$ (sum of ∠s in Δ)`,
        figure: { widget: "figure", props: { points: { O, A, B, C }, circles: [{ centre: "O", r: R }], segments: [["A", "B"], ["A", "C"], ["C", "B"]], angles: [{ at: "A", from: "C", to: "B", label: `${x}°` }, { at: "C", from: "A", to: "B", right: true }, { at: "B", from: "C", to: "A", label: "?" }] } },
      };
    }
    if (t === 2) {
      const u = int(r, 25, 70);
      const A = onCircle(R, 270 - u), B = onCircle(R, 270 + u), C = onCircle(R, 90 + int(r, 20, 45)), D = onCircle(R, 90 - int(r, 20, 45));
      return {
        q: `In the circle, $A\\hat{C}B = ${deg(u)}$. Calculate $A\\hat{D}B$.`,
        answer: String(u),
        hint: "C and D are on the same side of chord AB.",
        solution: `$$A\\hat{D}B = A\\hat{C}B = ${deg(u)}$$ (∠s in the same seg)`,
        figure: { widget: "figure", props: { points: { A, B, C, D }, circles: [{ centre: [0, 0], r: R }], segments: [["A", "C"], ["B", "C"], ["A", "D"], ["B", "D"]], angles: [{ at: "C", from: "A", to: "B", label: `${u}°` }, { at: "D", from: "A", to: "B", label: "?" }] } },
      };
    }
    if (t === 3) {
      const x = int(r, 50, 110);
      const a = 120, b = 120 + 60 + int(r, 0, 30);
      const A = onCircle(R, a), B = onCircle(R, b), C = onCircle(R, b + x), D = onCircle(R, b + 2 * x);
      return {
        q: `$ABCD$ is a cyclic quadrilateral with $B\\hat{A}D = ${deg(x)}$. Calculate $B\\hat{C}D$.`,
        answer: String(180 - x),
        hint: "Opposite angles of a cyclic quadrilateral…",
        solution: `$$B\\hat{C}D = 180^\\circ - ${deg(x)} = ${deg(180 - x)}$$ (opp ∠s of cyclic quad)`,
        figure: { widget: "figure", props: { points: { A, B, C, D }, circles: [{ centre: [0, 0], r: R }], segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]], angles: [{ at: "A", from: "B", to: "D", label: `${x}°` }, { at: "C", from: "B", to: "D", label: "?" }] } },
      };
    }
    if (t === 4) {
      const y = int(r, 25, 70);
      const A = onCircle(R, 270), B = onCircle(R, 270 + 2 * y), C = onCircle(R, 90 + y + int(r, -20, 20));
      const T: Pt = [4.2, -R], S: Pt = [-4.2, -R];
      return {
        q: `$TA$ is a tangent to the circle at $A$, and $A\\hat{C}B = ${deg(y)}$. Calculate $T\\hat{A}B$.`,
        answer: String(y),
        hint: "The angle between a tangent and a chord equals the angle in the alternate segment.",
        solution: `$$T\\hat{A}B = A\\hat{C}B = ${deg(y)}$$ (tan chord theorem)`,
        figure: { widget: "figure", props: { points: { A, B, C, T, S }, hidden: ["S"], circles: [{ centre: [0, 0], r: R }], segments: [{ from: "S", to: "T", colour: "var(--t-geometry)" }, ["A", "B"], ["A", "C"], ["C", "B"]], angles: [{ at: "C", from: "A", to: "B", label: `${y}°` }, { at: "A", from: "T", to: "B", label: "?" }] } },
      };
    }
    const x = 2 * int(r, 20, 70);
    const A = onCircle(R, 270 - x / 2), B = onCircle(R, 270 + x / 2);
    return {
      q: `$O$ is the centre of the circle and $A\\hat{O}B = ${deg(x)}$. Calculate $O\\hat{A}B$.`,
      answer: String((180 - x) / 2),
      hint: "OA and OB are both radii – what kind of triangle is OAB?",
      solution: `$OA = OB$ (radii), so $O\\hat{A}B = O\\hat{B}A$ (∠s opp equal sides)\n\n$$O\\hat{A}B = \\frac{180^\\circ - ${deg(x)}}{2} = ${deg((180 - x) / 2)}$$ (sum of ∠s in Δ)`,
      figure: { widget: "figure", props: { points: { O, A, B }, circles: [{ centre: "O", r: R }], segments: [["O", "A"], ["O", "B"], ["A", "B"]], ticks: [{ from: "O", to: "A" }, { from: "O", to: "B" }], angles: [{ at: "O", from: "A", to: "B", label: `${x}°` }, { at: "A", from: "O", to: "B", label: "?" }] } },
    };
  },
};

// ------------------------------------------------------------ measurement
const solidMeasure: Generator = {
  id: "solid-measure",
  title: "Volume & surface area",
  topic: "g11-measurement",
  make(seed) {
    const r = seededRandom(seed);
    const solid = pick(r, ["cylinder", "cone", "sphere", "hemisphere", "pyramid"] as const);
    const vol = r() < 0.5;
    const a = int(r, 2, 12), h = int(r, 3, 15);
    let value = 0, q = "", sol = "", hint = "";
    if (solid === "cylinder") {
      value = vol ? Math.PI * a * a * h : 2 * Math.PI * a * a + 2 * Math.PI * a * h;
      q = `a closed cylinder with radius ${a} cm and height ${h} cm`;
      hint = vol ? "V = πr²h" : "SA = 2πr² + 2πrh";
      sol = vol ? `$$V = \\pi r^2 h = \\pi(${a})^2(${h})$$` : `$$SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(${a})^2 + 2\\pi(${a})(${h})$$`;
    } else if (solid === "cone") {
      const s = Math.sqrt(a * a + h * h);
      value = vol ? (Math.PI * a * a * h) / 3 : Math.PI * a * a + Math.PI * a * s;
      q = `a solid cone with base radius ${a} cm and perpendicular height ${h} cm`;
      hint = vol ? "V = ⅓πr²h" : "SA = πr² + πrs, where s = √(r² + h²) is the slant height";
      sol = vol ? `$$V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi(${a})^2(${h})$$` : `$$s = \\sqrt{${a}^2 + ${h}^2} = \\sqrt{${a * a + h * h}}$$\n$$SA = \\pi r^2 + \\pi r s = \\pi(${a})^2 + \\pi(${a})\\sqrt{${a * a + h * h}}$$`;
    } else if (solid === "sphere") {
      value = vol ? (4 / 3) * Math.PI * a ** 3 : 4 * Math.PI * a * a;
      q = `a sphere with radius ${a} cm`;
      hint = vol ? "V = ⁴⁄₃πr³" : "SA = 4πr²";
      sol = vol ? `$$V = \\tfrac{4}{3}\\pi(${a})^3$$` : `$$SA = 4\\pi(${a})^2$$`;
    } else if (solid === "hemisphere") {
      value = vol ? (2 / 3) * Math.PI * a ** 3 : 3 * Math.PI * a * a;
      q = `a solid hemisphere with radius ${a} cm`;
      hint = vol ? "Half of a sphere: V = ⅔πr³" : "Curved part 2πr² plus the flat circle πr²";
      sol = vol ? `$$V = \\tfrac{1}{2} \\times \\tfrac{4}{3}\\pi(${a})^3 = \\tfrac{2}{3}\\pi(${a})^3$$` : `$$SA = 2\\pi(${a})^2 + \\pi(${a})^2 = 3\\pi(${a})^2$$`;
    } else {
      const hs = Math.sqrt(h * h + (a / 2) ** 2);
      value = vol ? (a * a * h) / 3 : a * a + 2 * a * hs;
      q = `a square-based pyramid with base side ${a} cm and perpendicular height ${h} cm`;
      hint = vol ? "V = ⅓ × base area × h" : "Base + 4 triangles; the slant height of each face is √(h² + (b/2)²)";
      sol = vol ? `$$V = \\tfrac{1}{3}(${a})^2(${h})$$` : `$$h_s = \\sqrt{${h}^2 + ${fmt(a / 2, a % 2 ? 1 : 0)}^2}$$\n$$SA = ${a}^2 + 4 \\times \\tfrac{1}{2}(${a})h_s$$`;
    }
    return {
      q: `Calculate the ${vol ? "volume" : "total surface area"} of ${q}, correct to two decimal places.`,
      answer: String(round(value, 2)),
      tol: Math.max(0.011, value * 0.001),
      hint: `${hint}. Use the π key and keep full values in your calculator.`,
      solution: `${sol}\n$$= ${fmt(round(value, 2))} \\text{ cm}^${vol ? 3 : 2}$$`,
    };
  },
};

// ------------------------------------------------------------ trigonometry
const fnTex = (f: Fn, a: string) => `\\${f} ${a}`;

const specialAngles: Generator = {
  id: "special-angles",
  title: "Special angles (no calculator)",
  topic: "g11-trig",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const any = (): [Fn, number] => {
      const f = pick(r, ["sin", "cos", "tan"] as const);
      return [f, pick(r, f === "tan" ? [30, 45, 60] : [30, 45, 60, 90])];
    };
    const t = int(r, 0, 3);
    let [f1, a1] = any();
    let [f2, a2] = any();
    if (t === 1) {
      // sums need like surds
      for (let k = 0; k < 30 && SPECIAL[f1][a1].k !== SPECIAL[f2][a2].k; k++) [f2, a2] = any();
      if (SPECIAL[f1][a1].k !== SPECIAL[f2][a2].k) [f1, a1, f2, a2] = ["sin", 30, "cos", 60];
    }
    if (t === 3) while (SPECIAL[f2][a2].n === 0) [f2, a2] = any();
    const v1 = SPECIAL[f1][a1], v2 = SPECIAL[f2][a2];
    const T1 = fnTex(f1, deg(a1)), T2 = fnTex(f2, deg(a2));
    let qTex = "", val: Exact, work = "";
    if (t === 0) { qTex = `${T1} \\cdot ${T2}`; val = mul(v1, v2); work = `${exTex(v1)} \\cdot ${exTex(v2)}`; }
    else if (t === 1) { qTex = `${T1} + ${T2}`; val = add(v1, v2); work = `${exTex(v1)} + ${exTex(v2)}`; }
    else if (t === 2) { qTex = `\\${f1}^2 ${deg(a1)} + \\${f2}^2 ${deg(a2)}`; val = add(mul(v1, v1), mul(v2, v2)); work = `\\left(${exTex(v1)}\\right)^2 + \\left(${exTex(v2)}\\right)^2`; }
    else { qTex = `\\dfrac{${T1}}{${T2}}`; val = div(v1, v2); work = `\\dfrac{${exTex(v1)}}{${exTex(v2)}}`; }
    return {
      q: `Without a calculator, determine the exact value of $${qTex}$`,
      answer: exAns(val),
      hint: "Draw the 30°-60°-90° and 45°-45°-90° triangles (sides 1; 2; √3 and 1; 1; √2).",
      solution: `$$${qTex} = ${work} = ${exTex(val)}$$`,
    };
  },
};

/** CAST sign of a function in the quadrant containing angle a (degrees, any value). */
function castSign(f: Fn, a: number) {
  const v = f === "sin" ? Math.sin(a * DEG) : f === "cos" ? Math.cos(a * DEG) : Math.tan(a * DEG);
  return v < 0 ? -1 : 1;
}

const reductionEval: Generator = {
  id: "reduction-eval",
  title: "Reduction formulae: exact values",
  topic: "g11-trig",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const f = pick(r, ["sin", "cos", "tan"] as const);
    const ref = pick(r, [30, 45, 60]);
    const [form, a] = pick(r, [["180-", 180 - ref], ["180+", 180 + ref], ["360-", 360 - ref], ["-", -ref]] as const);
    const sgn = castSign(f, a);
    const base = SPECIAL[f][ref];
    const val = sgn < 0 ? { ...base, n: -base.n } : base;
    const inner = form === "-" ? `-${deg(ref)}` : `${deg(Number(form.slice(0, 3)))} ${form[3]} ${deg(ref)}`;
    return {
      q: `Without a calculator, determine the value of $\\${f}(${deg(a)})$`,
      answer: exAns(val),
      hint: "Write the angle as 180° ± θ, 360° − θ or −θ, use CAST for the sign, then the special angle.",
      solution: `$$\\${f}(${deg(a)}) = \\${f}(${inner}) = ${sgn < 0 ? "-" : ""}\\${f} ${deg(ref)} = ${exTex(val)}$$`,
    };
  },
};

const REDUCE: { f: Fn; arg: string; to: Fn; sign: 1 | -1 }[] = [
  { f: "sin", arg: "180^\\circ - x", to: "sin", sign: 1 }, { f: "sin", arg: "180^\\circ + x", to: "sin", sign: -1 },
  { f: "sin", arg: "360^\\circ - x", to: "sin", sign: -1 }, { f: "sin", arg: "-x", to: "sin", sign: -1 },
  { f: "sin", arg: "90^\\circ - x", to: "cos", sign: 1 }, { f: "sin", arg: "90^\\circ + x", to: "cos", sign: 1 },
  { f: "cos", arg: "180^\\circ - x", to: "cos", sign: -1 }, { f: "cos", arg: "180^\\circ + x", to: "cos", sign: -1 },
  { f: "cos", arg: "360^\\circ - x", to: "cos", sign: 1 }, { f: "cos", arg: "-x", to: "cos", sign: 1 },
  { f: "cos", arg: "90^\\circ - x", to: "sin", sign: 1 }, { f: "cos", arg: "90^\\circ + x", to: "sin", sign: -1 },
  { f: "tan", arg: "180^\\circ - x", to: "tan", sign: -1 }, { f: "tan", arg: "180^\\circ + x", to: "tan", sign: 1 },
  { f: "tan", arg: "360^\\circ - x", to: "tan", sign: -1 }, { f: "tan", arg: "-x", to: "tan", sign: -1 },
];

const reductionSimplify: Generator = {
  id: "reduction-simplify",
  title: "Simplify with reduction formulae",
  topic: "g11-trig",
  make(seed) {
    const r = seededRandom(seed);
    const n = pick(r, [1, 2, 3]);
    const terms = Array.from({ length: n }, () => pick(r, REDUCE));
    const sign = terms.reduce((s, t) => s * t.sign, 1);
    const num = n === 3 ? terms.slice(0, 2) : terms.slice(0, 1);
    const den = n === 3 ? terms.slice(2) : n === 2 ? terms.slice(1) : [];
    const qT = (ts: typeof terms) => ts.map((t) => `\\${t.f}(${t.arg})`).join(" \\cdot ");
    const aT = (ts: typeof terms) => ts.map((t) => `\\${t.to} x`).join(" \\cdot ");
    const aA = (ts: typeof terms) => ts.map((t) => `${t.to}(x)`).join("*");
    const qTex = den.length ? `\\dfrac{${qT(num)}}{${qT(den)}}` : qT(num);
    const resTex = `${sign < 0 ? "-" : ""}${den.length ? `\\dfrac{${aT(num)}}{${aT(den)}}` : aT(num)}`;
    const ans = `${sign < 0 ? "-" : ""}(${aA(num)})${den.length ? `/(${aA(den)})` : ""}`;
    return {
      q: `Simplify: $${qTex}$`,
      answer: ans,
      kind: "expr",
      hint: "Reduce each part separately: CAST decides the sign, and 90° ± x swaps sin ↔ cos. Type sin x, cos x, tan x.",
      solution: `${terms.map((t) => `$\\${t.f}(${t.arg}) = ${t.sign < 0 ? "-" : ""}\\${t.to} x$`).join("\n\n")}\n\n$$${qTex} = ${resTex}$$${den.length ? "\n\nAny equivalent simplified form (e.g. using identities) is also correct." : ""}`,
    };
  },
};

const IDENTITIES: [string, string, string][] = [
  ["\\dfrac{1 - \\cos^2 x}{\\sin x}", "sin(x)", "1 - \\cos^2 x = \\sin^2 x, \\text{ so } \\dfrac{\\sin^2 x}{\\sin x} = \\sin x"],
  ["\\dfrac{\\sin x}{\\tan x}", "cos(x)", "\\sin x \\div \\dfrac{\\sin x}{\\cos x} = \\cos x"],
  ["\\tan x \\cdot \\cos x", "sin(x)", "\\dfrac{\\sin x}{\\cos x} \\cdot \\cos x = \\sin x"],
  ["\\dfrac{1 - \\sin^2 x}{\\cos^2 x}", "1", "\\dfrac{\\cos^2 x}{\\cos^2 x} = 1"],
  ["\\dfrac{\\sin^2 x}{1 - \\sin^2 x}", "tan(x)^2", "\\dfrac{\\sin^2 x}{\\cos^2 x} = \\tan^2 x"],
  ["\\dfrac{\\tan x}{\\sin x}", "1/cos(x)", "\\dfrac{\\sin x}{\\cos x} \\cdot \\dfrac{1}{\\sin x} = \\dfrac{1}{\\cos x}"],
  ["\\cos^2 x - 1", "-sin(x)^2", "-(1 - \\cos^2 x) = -\\sin^2 x"],
  ["(\\sin x + \\cos x)^2 - 2\\sin x \\cos x", "1", "\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x - 2\\sin x \\cos x = 1"],
  ["\\sin^4 x - \\cos^4 x", "sin(x)^2 - cos(x)^2", "(\\sin^2 x - \\cos^2 x)(\\sin^2 x + \\cos^2 x) = \\sin^2 x - \\cos^2 x"],
  ["\\tan x \\cdot \\cos x \\cdot \\sin x + \\cos^2 x", "1", "\\sin^2 x + \\cos^2 x = 1"],
];

const identitySimplify: Generator = {
  id: "identity-simplify",
  title: "Simplify with identities",
  topic: "g11-trig",
  make(seed) {
    const r = seededRandom(seed);
    const [q, a, work] = pick(r, IDENTITIES);
    return {
      q: `Simplify: $${q}$`,
      answer: a,
      kind: "expr",
      hint: "Use tan x = sin x / cos x and sin²x + cos²x = 1. Type sin^2 x for sin²x.",
      solution: `$$${q} = ${work}$$`,
    };
  },
};

/** Solutions of f(x) = v for 0° ≤ x ≤ 360°. */
export function solveBasic(f: Fn, v: number): number[] {
  if (f === "tan") {
    const ref = Math.atan(Math.abs(v)) / DEG;
    return v >= 0 ? [ref, 180 + ref] : [180 - ref, 360 - ref];
  }
  const ref = (f === "sin" ? Math.asin(Math.abs(v)) : Math.acos(Math.abs(v))) / DEG;
  if (f === "sin") return v >= 0 ? [ref, 180 - ref] : [180 + ref, 360 - ref];
  return v >= 0 ? [ref, 360 - ref] : [180 - ref, 180 + ref];
}

const trigEquation: Generator = {
  id: "trig-equation",
  title: "Trig equations in [0°; 360°]",
  topic: "g11-trig",
  make(seed) {
    const r = seededRandom(seed);
    const f = pick(r, ["sin", "cos", "tan"] as const);
    const v = f === "tan" ? pick(r, [0.5, 1.2, 2.5, 3, -0.7, -1.8, -2.4]) : pick(r, [0.3, 0.45, 0.6, 0.7, 0.85, -0.25, -0.4, -0.55, -0.8]);
    const a = pick(r, [1, 1, 2, 4, 5]);
    const b = a === 1 ? 0 : int(r, -3, 3);
    const rhs = round(a * v + b, 2);
    const eq = a === 1 ? `\\${f} x = ${v}` : `${a}\\${f} x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rhs}`.replace(" + 0 ", " ");
    const sols = solveBasic(f, v).map((x) => round(x, 1));
    const ref = round(f === "tan" ? Math.atan(Math.abs(v)) / DEG : f === "sin" ? Math.asin(Math.abs(v)) / DEG : Math.acos(Math.abs(v)) / DEG, 1);
    return {
      q: `Solve for $x$ if $0^\\circ \\leq x \\leq 360^\\circ$, correct to one decimal place: $${eq}$`,
      answer: sols.join("; "),
      kind: "set",
      tol: 0.06,
      hint: "Isolate the trig function, find the reference angle with a POSITIVE value, then use CAST to place it in the right quadrants.",
      solution: `${a === 1 ? "" : `$$\\${f} x = \\frac{${rhs} - (${b})}{${a}} = ${v}$$\n`}Reference angle: $\\${f}^{-1}(${Math.abs(v)}) = ${fmt(ref, 1)}^\\circ$. ${v < 0 ? `$\\${f}$ is negative` : `$\\${f}$ is positive`} in quadrants ${f === "sin" ? (v < 0 ? "3 and 4" : "1 and 2") : f === "cos" ? (v < 0 ? "2 and 3" : "1 and 4") : v < 0 ? "2 and 4" : "1 and 3"}.\n$$x = ${sols.map((s) => `${fmt(s, 1)}^\\circ`).join(" \\text{ or } ")}$$`,
    };
  },
};

const trigGraphFeatures: Generator = {
  id: "trig-graph-features",
  title: "Trig graphs: period, amplitude, range",
  topic: "g11-trig",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const f = pick(r, ["sin", "cos", "tan"] as const);
    const a = pick(r, [1, 2, 3, -2, 4]);
    const k = pick(r, [1, 2, 3, 0.5]);
    const q = f === "tan" ? 0 : int(r, -2, 2);
    const kTex = k === 1 ? "" : k === 0.5 ? "\\tfrac{1}{2}" : String(k);
    const eq = `y = ${a === 1 ? "" : a === -1 ? "-" : a}\\${f} ${kTex}x${q ? (q > 0 ? ` + ${q}` : ` - ${-q}`) : ""}`;
    const period = (f === "tan" ? 180 : 360) / k;
    const ask = f === "tan" ? "period" : pick(r, ["period", "amplitude", "max", "min"] as const);
    const answer = ask === "period" ? period : ask === "amplitude" ? Math.abs(a) : ask === "max" ? Math.abs(a) + q : q - Math.abs(a);
    const label = ask === "period" ? "the period (in degrees)" : ask === "amplitude" ? "the amplitude" : ask === "max" ? "the maximum value" : "the minimum value";
    return {
      q: `Write down ${label} of $${eq}$.`,
      answer: String(answer),
      hint: f === "tan" ? "Period of tan kx = 180° ÷ k" : "Period of sin kx / cos kx = 360° ÷ k; amplitude = |a|; q shifts everything up or down.",
      solution: ask === "period" ? `$$\\text{period} = \\frac{${f === "tan" ? 180 : 360}^\\circ}{${k}} = ${period}^\\circ$$` : ask === "amplitude" ? `Amplitude $= |a| = ${Math.abs(a)}$` : `Range: $${q - Math.abs(a)} \\leq y \\leq ${Math.abs(a) + q}$, so the ${ask === "max" ? "maximum" : "minimum"} is $${answer}$.`,
    };
  },
};

const triangleRules: Generator = {
  id: "triangle-rules",
  title: "Sine, cosine & area rules",
  topic: "g11-trig",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 4);
    // Build a valid triangle from two angles and a side.
    const B = int(r, 35, 80), C = int(r, 35, 80), A = 180 - B - C;
    const b = int(r, 6, 20);
    const a = (b * Math.sin(A * DEG)) / Math.sin(B * DEG);
    const c = (b * Math.sin(C * DEG)) / Math.sin(B * DEG);
    const pts = { A: [c * Math.cos(B * DEG), c * Math.sin(B * DEG)] as Pt, B: [0, 0] as Pt, C: [a, 0] as Pt };
    const fig = (angles: { at: string; from: string; to: string; label: string }[], sides: { from: string; to: string; label: string }[]) =>
      ({ widget: "figure" as const, props: { points: pts, segments: [["A", "B"], ["B", "C"], ["C", "A"]], angles, sideLabels: sides } });
    if (t === 0) {
      return {
        q: `In $\\triangle ABC$, $\\hat{B} = ${deg(B)}$, $\\hat{C} = ${deg(C)}$ and $b = ${b}$ cm. Calculate $c$, correct to two decimal places.`,
        answer: String(round(c, 2)), tol: 0.011,
        hint: "Sine rule: c / sin C = b / sin B",
        solution: `$$\\frac{c}{\\sin ${deg(C)}} = \\frac{${b}}{\\sin ${deg(B)}} \\;\\Rightarrow\\; c = \\frac{${b}\\sin ${deg(C)}}{\\sin ${deg(B)}} = ${fmt(round(c, 2))} \\text{ cm}$$`,
        figure: fig([{ at: "B", from: "A", to: "C", label: `${B}°` }, { at: "C", from: "A", to: "B", label: `${C}°` }], [{ from: "A", to: "C", label: `b = ${b}` }, { from: "A", to: "B", label: "c = ?" }]),
      };
    }
    if (t === 1) {
      const bb = int(r, 5, 15), cc = int(r, 5, 15), AA = int(r, 30, 120);
      const aa = Math.sqrt(bb * bb + cc * cc - 2 * bb * cc * Math.cos(AA * DEG));
      return {
        q: `In $\\triangle ABC$, $b = ${bb}$, $c = ${cc}$ and $\\hat{A} = ${deg(AA)}$. Calculate $a$, correct to two decimal places.`,
        answer: String(round(aa, 2)), tol: 0.011,
        hint: "Two sides and the included angle → cosine rule: a² = b² + c² − 2bc cos A",
        solution: `$$a^2 = ${bb}^2 + ${cc}^2 - 2(${bb})(${cc})\\cos ${deg(AA)} \\;\\Rightarrow\\; a = ${fmt(round(aa, 2))}$$`,
      };
    }
    if (t === 2) {
      let x = 0, y = 0, z = 0;
      do { x = int(r, 4, 14); y = int(r, 4, 14); z = int(r, 4, 14); } while (x + y <= z || x + z <= y || y + z <= x);
      const ang = Math.acos((y * y + z * z - x * x) / (2 * y * z)) / DEG;
      return {
        q: `In $\\triangle ABC$, $a = ${x}$, $b = ${y}$ and $c = ${z}$. Calculate $\\hat{A}$, correct to one decimal place.`,
        answer: String(round(ang, 1)), tol: 0.06,
        hint: "Three sides → cosine rule: cos A = (b² + c² − a²) / 2bc",
        solution: `$$\\cos \\hat{A} = \\frac{${y}^2 + ${z}^2 - ${x}^2}{2(${y})(${z})} = ${fmt((y * y + z * z - x * x) / (2 * y * z), 4)} \\;\\Rightarrow\\; \\hat{A} = ${fmt(round(ang, 1), 1)}^\\circ$$`,
      };
    }
    if (t === 3) {
      const p = int(r, 4, 15), s = int(r, 4, 15), CC = int(r, 25, 150);
      const area = 0.5 * p * s * Math.sin(CC * DEG);
      return {
        q: `In $\\triangle ABC$, $a = ${p}$ cm, $b = ${s}$ cm and $\\hat{C} = ${deg(CC)}$. Calculate the area of the triangle, correct to two decimal places.`,
        answer: String(round(area, 2)), tol: 0.011,
        hint: "Area = ½ab sin C (two sides and the angle between them)",
        solution: `$$\\text{Area} = \\tfrac{1}{2}(${p})(${s})\\sin ${deg(CC)} = ${fmt(round(area, 2))} \\text{ cm}^2$$`,
      };
    }
    const AA = int(r, 25, 70);
    const aa = int(r, 8, 16), bb = int(r, 3, aa - 1);
    const BB = Math.asin((bb * Math.sin(AA * DEG)) / aa) / DEG;
    return {
      q: `In $\\triangle ABC$, $a = ${aa}$, $b = ${bb}$ and $\\hat{A} = ${deg(AA)}$. Calculate $\\hat{B}$, correct to one decimal place.`,
      answer: String(round(BB, 1)), tol: 0.06,
      hint: "Sine rule: sin B / b = sin A / a. (Since a > b, B is smaller than A, so B is acute.)",
      solution: `$$\\sin \\hat{B} = \\frac{${bb}\\sin ${deg(AA)}}{${aa}} \\;\\Rightarrow\\; \\hat{B} = ${fmt(round(BB, 1), 1)}^\\circ$$`,
    };
  },
};

export const GEO_TRIG_GENERATORS: Generator[] = [
  distanceMidpoint, gradientInclination, lineEquation, perpParallel,
  circleAngle,
  solidMeasure,
  specialAngles, reductionEval, reductionSimplify, identitySimplify, trigEquation, trigGraphFeatures, triangleRules,
];
