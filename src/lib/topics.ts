import type { Grade, Paper, Strand, Topic } from "@/content/types";

/** Every strand has ONE colour across the whole site (see docs/06-design-system.md). */
export const STRANDS: { strand: Strand; paper: Paper; colour: string; emoji: string; slug: string; blurb: string }[] = [
  { strand: "Algebra", paper: 1, colour: "var(--t-algebra)", emoji: "🧮", slug: "algebra", blurb: "Exponents, surds, equations, patterns, functions & graphs, finance – and in Grade 12, calculus." },
  { strand: "Geometry", paper: 2, colour: "var(--t-geometry)", emoji: "📐", slug: "geometry", blurb: "Analytical geometry on the Cartesian plane, Euclidean (circle) geometry and measurement." },
  { strand: "Trigonometry", paper: 2, colour: "var(--t-trig)", emoji: "📡", slug: "trig", blurb: "Identities, reduction formulae, equations, graphs, the sine/cosine/area rules and 2D & 3D problems." },
];

export interface TopicMeta {
  topic: Topic;
  grade: Grade;
  strand: Strand;
  title: string;
  emoji: string;
  slug: string;
  blurb: string;
  /** Build phase this topic ships in (see docs/12-roadmap.md). */
  phase: number;
  colour: string;
  paper: Paper;
}

const T = (topic: Topic, grade: Grade, strand: Strand, title: string, emoji: string, phase: number, blurb: string): TopicMeta => {
  const s = STRANDS.find((x) => x.strand === strand)!;
  return { topic, grade, strand, title, emoji, slug: topic, blurb, phase, colour: s.colour, paper: s.paper };
};

/** All CAPS Grade 11 & 12 topics in the Algebra, Geometry and Trigonometry strands, in teaching order. */
export const TOPICS: TopicMeta[] = [
  T("g11-exponents", 11, "Algebra", "Exponents & Surds", "⚡", 1, "Rational exponents, simplifying surds, rationalising and exponential equations."),
  T("g11-equations", 11, "Algebra", "Equations & Inequalities", "⚖️", 1, "Quadratic equations three ways, the discriminant, quadratic inequalities and simultaneous equations."),
  T("g11-patterns", 11, "Algebra", "Number Patterns", "🔢", 1, "Quadratic number patterns, second differences and finding the general term."),
  T("g11-functions", 11, "Algebra", "Functions & Graphs", "📈", 1, "Parabolas, hyperbolas and exponential graphs in turning-point form, plus average gradient."),
  T("g11-finance", 11, "Algebra", "Finance, Growth & Decay", "💸", 1, "Simple vs compound growth, depreciation, nominal vs effective rates and timelines."),
  T("g11-analytical", 11, "Geometry", "Analytical Geometry", "📍", 2, "Inclination of a line, parallel and perpendicular lines, equations of lines."),
  T("g11-euclidean", 11, "Geometry", "Euclidean Geometry", "⭕", 2, "Circle theorems, cyclic quadrilaterals and tangents – with proofs and riders."),
  T("g11-measurement", 11, "Geometry", "Measurement", "🧊", 2, "Surface area and volume of pyramids, cones, spheres and combined objects."),
  T("g11-trig", 11, "Trigonometry", "Trigonometry", "📡", 2, "Identities, reduction formulae, general solutions, graphs and the sine, cosine & area rules."),
  T("g12-sequences", 12, "Algebra", "Sequences & Series", "♾️", 3, "Arithmetic and geometric sequences and series, sigma notation and sum to infinity."),
  T("g12-functions", 12, "Algebra", "Functions & Inverses", "🔁", 3, "Inverse functions, logarithms and the exponential/log relationship."),
  T("g12-finance", 12, "Algebra", "Finance & Annuities", "🏦", 3, "Future and present value annuities, loans, sinking funds and outstanding balances."),
  T("g12-polynomials", 12, "Algebra", "Polynomials", "🧩", 3, "The remainder and factor theorems and factorising cubics."),
  T("g12-calculus", 12, "Algebra", "Differential Calculus", "🎢", 3, "Limits, first principles, rules of differentiation, cubic graphs and optimisation."),
  T("g12-analytical", 12, "Geometry", "Analytical Geometry", "🎯", 4, "The equation of a circle and tangents to a circle."),
  T("g12-euclidean", 12, "Geometry", "Euclidean Geometry", "🔺", 4, "Proportionality, the midpoint theorem and similar triangles (incl. Pythagoras by similarity)."),
  T("g12-trig", 12, "Trigonometry", "Trigonometry", "🛰️", 4, "Compound and double angles, identities, equations and 2D & 3D problems."),
];

export function topicMeta(t: Topic): TopicMeta {
  return TOPICS.find((x) => x.topic === t)!;
}

export function strandMeta(s: Strand) {
  return STRANDS.find((x) => x.strand === s)!;
}

export function paperLabel(p: Paper) {
  return `Paper ${p}`;
}

/** Short label used on chips, e.g. "Gr 11 · Exponents & Surds". */
export function topicLabel(t: Topic) {
  const m = topicMeta(t);
  return `Gr ${m.grade} · ${m.title}`;
}

/**
 * Approximate NSC/final-exam mark allocation per paper (DBE examination
 * guidelines; each figure is ±3). Statistics and probability are part of the
 * papers but outside this app's three strands.
 */
export const PAPER_INFO: Record<Grade, Record<Paper, { title: string; duration: string; marks: number; sections: { name: string; marks: number; inApp: boolean }[] }>> = {
  11: {
    1: {
      title: "Paper 1 – Algebra & Functions",
      duration: "3 hours",
      marks: 150,
      sections: [
        { name: "Algebraic expressions, equations & inequalities", marks: 45, inApp: true },
        { name: "Number patterns", marks: 25, inApp: true },
        { name: "Functions & graphs", marks: 45, inApp: true },
        { name: "Finance, growth & decay", marks: 15, inApp: true },
        { name: "Probability", marks: 20, inApp: false },
      ],
    },
    2: {
      title: "Paper 2 – Geometry & Trigonometry",
      duration: "3 hours",
      marks: 150,
      sections: [
        { name: "Statistics", marks: 20, inApp: false },
        { name: "Analytical geometry", marks: 30, inApp: true },
        { name: "Trigonometry", marks: 50, inApp: true },
        { name: "Euclidean geometry & measurement", marks: 50, inApp: true },
      ],
    },
  },
  12: {
    1: {
      title: "Paper 1 – Algebra, Functions & Calculus",
      duration: "3 hours",
      marks: 150,
      sections: [
        { name: "Algebra, equations & inequalities", marks: 25, inApp: true },
        { name: "Number patterns, sequences & series", marks: 25, inApp: true },
        { name: "Functions & graphs", marks: 35, inApp: true },
        { name: "Finance, growth & decay", marks: 15, inApp: true },
        { name: "Differential calculus", marks: 35, inApp: true },
        { name: "Counting & probability", marks: 15, inApp: false },
      ],
    },
    2: {
      title: "Paper 2 – Geometry & Trigonometry",
      duration: "3 hours",
      marks: 150,
      sections: [
        { name: "Statistics", marks: 20, inApp: false },
        { name: "Analytical geometry", marks: 40, inApp: true },
        { name: "Trigonometry", marks: 50, inApp: true },
        { name: "Euclidean geometry & measurement", marks: 40, inApp: true },
      ],
    },
  },
};
