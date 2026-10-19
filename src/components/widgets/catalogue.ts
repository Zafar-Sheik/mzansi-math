import type { Topic, WidgetName } from "@/content/types";

/** Every interactive tool, used by the Toolkit page and the docs. */
export const WIDGET_CATALOGUE: { name: WidgetName; title: string; topic: Topic; description: string; props?: Record<string, unknown> }[] = [
  { name: "exponent-laws", title: "Exponent laws, visualised", topic: "g11-exponents", description: "See why the laws work – merge, cancel and group the tiles." },
  { name: "surd-simplifier", title: "Surd simplifier", topic: "g11-exponents", description: "Biggest square factor, simplest surd form, and √n on a number line." },
  {
    name: "sorter", title: "Rational or irrational?", topic: "g11-exponents", description: "Sort numbers into rational and irrational.",
    props: {
      id: "toolkit-rational", title: "Rational or irrational?", buckets: ["Rational", "Irrational"], colour: "var(--t-algebra)",
      items: [
        { text: "$\\sqrt{49}$", bucket: "Rational" }, { text: "$\\sqrt{50}$", bucket: "Irrational" }, { text: "$\\pi$", bucket: "Irrational" },
        { text: "$0{,}\\overline{3}$", bucket: "Rational" }, { text: "$\\sqrt[3]{27}$", bucket: "Rational" }, { text: "$\\sqrt{2} \\times \\sqrt{8}$", bucket: "Rational" },
        { text: "$\\frac{22}{7}$", bucket: "Rational" }, { text: "$1 + \\sqrt{3}$", bucket: "Irrational" },
      ],
    },
  },
  { name: "quadratic-lab", title: "Quadratic lab", topic: "g11-equations", description: "Quadratic formula, discriminant and completing the square – live." },
  { name: "inequality-lab", title: "Inequality lab", topic: "g11-equations", description: "Solve quadratic inequalities with a graph and a number line." },
  { name: "intersection-lab", title: "Where do they meet?", topic: "g11-equations", description: "Line meets parabola: simultaneous equations as intersecting graphs." },
  { name: "pattern-machine", title: "Pattern machine", topic: "g11-patterns", description: "Difference tables and the general term of a quadratic pattern." },
  { name: "function-grapher", title: "Function grapher", topic: "g11-functions", description: "Lines, parabolas, hyperbolas, exponentials – sliders for a, p and q." },
  { name: "function-grapher", title: "Graph match challenge", topic: "g11-functions", description: "Hit the target graph by setting a, p and q. Addictive.", props: { challenge: true, title: "Graph match challenge" } },
  { name: "finance-lab", title: "Money lab", topic: "g11-finance", description: "Simple vs compound, depreciation, nominal vs effective rates." },
  { name: "timeline", title: "Investment timeline", topic: "g11-finance", description: "Deposits, withdrawals and changing rates – moved to the end of the timeline." },
  { name: "drill", title: "Endless drill (everything)", topic: "g11-exponents", description: "Randomly generated questions from every Phase 1 skill, with working." },
];

export const WIDGET_COUNT = new Set(WIDGET_CATALOGUE.map((w) => w.title)).size;
