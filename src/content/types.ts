/**
 * Content model for lessons. Lessons are plain TypeScript data so that they
 * are type-checked and can be tested automatically: every quiz answer, every
 * practice answer, every formula (it must render in KaTeX) and every exam memo
 * is validated by the test-suite.
 *
 * Maths is written in Markdown with LaTeX: `$x^2$` inline, `$$...$$` display.
 */

export type Grade = 11 | 12;

/** The three strands this app covers. Algebra is NSC Paper 1; Geometry and Trigonometry are Paper 2. */
export type Strand = "Algebra" | "Geometry" | "Trigonometry";

/** NSC Mathematics is written as two 3-hour, 150-mark papers. */
export type Paper = 1 | 2;

/** A CAPS topic in a specific grade (see src/lib/topics.ts for titles, colours and phases). */
export type Topic =
  | "g11-exponents"
  | "g11-equations"
  | "g11-patterns"
  | "g11-functions"
  | "g11-finance"
  | "g11-analytical"
  | "g11-euclidean"
  | "g11-measurement"
  | "g11-trig"
  | "g12-sequences"
  | "g12-functions"
  | "g12-finance"
  | "g12-polynomials"
  | "g12-calculus"
  | "g12-analytical"
  | "g12-euclidean"
  | "g12-trig";

export type CalloutVariant = "key" | "tip" | "mistake" | "memory" | "exam" | "break" | "real-world";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Term {
  term: string;
  def: string;
}

/**
 * How a typed answer is checked (see src/lib/math/check.ts):
 * - number: one value, e.g. `3/4`, `2sqrt(5)`, `-1,5`, `x = 2`
 * - set:    several values in any order, e.g. `x = 2 or x = -3`
 * - point:  a coordinate, e.g. `(2; -3)`
 * - expr:   an algebraic expression, checked by substituting random values, e.g. `2n^2 + 3n - 1`
 */
export type AnswerKind = "number" | "set" | "point" | "expr";

export interface PracticeProblem {
  q: string;
  /** The memo answer, written so the checker can read it (e.g. `6sqrt(2)`, `2; -3`, `3n^2 - n + 2`). */
  answer: string;
  kind?: AnswerKind;
  /** Absolute tolerance for numbers (finance answers rounded to the cent use 0.01). */
  tol?: number;
  /** Variables for `expr` answers (default: x). */
  vars?: string[];
  /** Require simplest surd form (reject `sqrt(72)` for `6sqrt(2)`); "rationalised" also forbids surds in a denominator. */
  form?: "simplified-surd" | "rationalised";
  hint?: string;
  /** Full worked solution (markdown), shown after an attempt. */
  solution: string;
  /** Optional diagram shown with the question (e.g. a circle-geometry figure). */
  figure?: { widget: WidgetName; props?: Record<string, unknown> };
}

export interface WorkedStep {
  md: string;
  /** Why this step is allowed – the bit learners usually skip. */
  why?: string;
}

export type Block =
  | { type: "text"; md: string }
  | { type: "callout"; variant: CalloutVariant; title?: string; md: string }
  | { type: "keypoints"; points: string[] }
  | { type: "flashcards"; cards: { front: string; back: string }[] }
  /** Renders the lesson's own key terms as flashcards. */
  | { type: "terms" }
  | { type: "quiz"; id: string; questions: QuizQuestion[] }
  | { type: "widget"; widget: WidgetName; props?: Record<string, unknown> }
  /** Put the steps of a method in order. */
  | { type: "sequence"; id: string; title: string; steps: string[]; explain: string }
  /** Match each item to its partner (formula ↔ name, graph feature ↔ value…). */
  | { type: "match"; id: string; title: string; pairs: { left: string; right: string }[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  /** A worked example revealed one step at a time ("predict, then reveal"). */
  | { type: "worked"; title: string; problem: string; steps: WorkedStep[] }
  /** Typed-answer practice with hints, instant checking and full solutions. */
  | { type: "practice"; id: string; title?: string; problems: PracticeProblem[] }
  /** A short exam-style question with a memo the learner self-marks against. */
  | { type: "exam"; question: ExamPart & { id: string } };

export type WidgetName =
  | "sorter"
  | "drill"
  | "function-grapher"
  | "quadratic-lab"
  | "exponent-laws"
  | "surd-simplifier"
  | "pattern-machine"
  | "inequality-lab"
  | "intersection-lab"
  | "finance-lab"
  | "timeline"
  | "sketch"
  | "figure"
  | "coordinate-lab"
  | "circle-theorems"
  | "solid-viewer"
  | "unit-circle"
  | "trig-graph-lab"
  | "triangle-solver"
  | "series-lab"
  | "inverse-lab"
  | "annuity-lab"
  | "polynomial-lab"
  | "derivative-lab"
  | "cubic-lab"
  | "optimisation-lab"
  | "circle-lab"
  | "proportion-lab"
  | "compound-lab"
  | "heights-lab";

export interface Chunk {
  id: string;
  title: string;
  /** Rough reading/doing time in minutes – chunks are kept short (2–10 min). */
  minutes: number;
  blocks: Block[];
}

export interface Lesson {
  slug: string;
  topic: Topic;
  order: number;
  title: string;
  tagline: string;
  emoji: string;
  /** CAPS reference. */
  caps: string;
  objectives: string[];
  /** Learning style tags used in docs: visual, auditory, read-write, kinaesthetic */
  styles: ("visual" | "auditory" | "read-write" | "kinaesthetic")[];
  xp: number;
  /** Key concepts and formulas – feed the lesson flashcards, the global deck and the games. */
  terms: Term[];
  chunks: Chunk[];
}

/** Cognitive levels used in the DBE Mathematics examination guidelines. */
export type CognitiveLevel = "knowledge" | "routine" | "complex" | "problem-solving";

export interface ExamPart {
  q: string;
  marks: number;
  /** Each memo line is one mark (one tick), exactly like an NSC marking memo. */
  memo: string[];
  level?: CognitiveLevel;
}

export interface ExamQuestion {
  id: string;
  topic: Topic;
  title: string;
  /** Stimulus: information, a diagram description or data that the questions refer to. */
  source?: string;
  /** Optional interactive figure shown with the source. */
  figure?: { widget: WidgetName; props?: Record<string, unknown> };
  parts: ExamPart[];
}
