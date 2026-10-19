import type { Lesson } from "../types";

const m = String.raw;

export const CALCULUS: Lesson[] = [
  {
    slug: "first-principles",
    topic: "g12-calculus",
    order: 1,
    title: "Limits & first principles",
    tagline: "Zoom in on a curve until it's a straight line – that's a derivative.",
    emoji: "🔬",
    caps: "CAPS Gr 12 · Differential calculus: an intuitive understanding of limits; average gradient vs gradient at a point; the derivative from first principles for f(x) = ax² + bx + c and f(x) = a/x.",
    objectives: [
      "Evaluate simple limits by factorising",
      "Explain the derivative as the limit of average gradients",
      "Find f'(x) from first principles",
    ],
    styles: ["visual", "read-write"],
    xp: 80,
    terms: [
      { term: "Limit", def: m`$\lim_{x \to a} f(x)$ is the value $f(x)$ gets closer and closer to as $x$ gets closer to $a$.` },
      { term: "Average gradient", def: m`$\dfrac{f(x + h) - f(x)}{h}$ – the gradient of the secant between two points $h$ apart.` },
      { term: "Derivative", def: m`$f'(x) = \lim_{h \to 0}\dfrac{f(x + h) - f(x)}{h}$ – the gradient of the tangent at any point.` },
      { term: "First principles", def: "Finding the derivative using the limit definition, not the rules." },
      { term: "Tangent", def: "The straight line that touches a curve at a point and has the same gradient as the curve there." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Speed right now",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A speed camera on the N1 doesn't care about your *average* speed for the trip – it measures your speed **at one instant**. Calculus is the maths of "right now": take an average over a tiny time gap, then let the gap shrink to zero.` },
          { type: "widget", widget: "derivative-lab" },
        ],
      },
      {
        id: "limits",
        title: "Limits",
        minutes: 6,
        blocks: [
          { type: "text", md: m`You can't substitute $x = 3$ into $\dfrac{x^2 - 9}{x - 3}$ (you'd get $\frac{0}{0}$), but you can ask what it **approaches**:

$$\lim_{x \to 3}\frac{x^2 - 9}{x - 3} = \lim_{x \to 3}\frac{(x - 3)(x + 3)}{x - 3} = \lim_{x \to 3}(x + 3) = 6$$

Factorise, cancel, THEN substitute.` },
          {
            type: "practice",
            id: "limits-practice",
            problems: [
              { q: m`Evaluate $\displaystyle\lim_{x \to 2}\frac{x^2 + x - 6}{x - 2}$.`, answer: "5", solution: m`$$\lim_{x \to 2}\frac{(x + 3)(x - 2)}{x - 2} = \lim_{x \to 2}(x + 3) = 5$$` },
              { q: m`Evaluate $\displaystyle\lim_{h \to 0}\frac{4h + h^2}{h}$.`, answer: "4", solution: m`$$\lim_{h \to 0}(4 + h) = 4$$` },
            ],
          },
        ],
      },
      {
        id: "first-principles",
        title: "The derivative from first principles",
        minutes: 9,
        blocks: [
          { type: "text", md: m`$$f'(x) = \lim_{h \to 0}\frac{f(x + h) - f(x)}{h}$$

The method: (1) find $f(x + h)$; (2) subtract $f(x)$ and simplify; (3) divide by $h$ (factor it out); (4) let $h \to 0$.` },
          {
            type: "worked",
            title: "A quadratic",
            problem: m`Find $f'(x)$ from first principles if $f(x) = 2x^2 - 3$.`,
            steps: [
              { md: m`$f(x + h) = 2(x + h)^2 - 3 = 2x^2 + 4xh + 2h^2 - 3$` },
              { md: m`$f(x + h) - f(x) = 4xh + 2h^2$`, why: "Everything without an h cancels – a good check." },
              { md: m`$f'(x) = \lim_{h \to 0}\dfrac{h(4x + 2h)}{h} = \lim_{h \to 0}(4x + 2h) = 4x$` },
            ],
          },
          {
            type: "worked",
            title: "A hyperbola",
            problem: m`Find $f'(x)$ from first principles if $f(x) = \dfrac{2}{x}$.`,
            steps: [
              { md: m`$f(x + h) - f(x) = \dfrac{2}{x + h} - \dfrac{2}{x} = \dfrac{2x - 2(x + h)}{x(x + h)} = \dfrac{-2h}{x(x + h)}$` },
              { md: m`$f'(x) = \lim_{h \to 0}\dfrac{-2h}{h \cdot x(x + h)} = \lim_{h \to 0}\dfrac{-2}{x(x + h)} = -\dfrac{2}{x^2}$` },
            ],
          },
          { type: "callout", variant: "exam", md: m`First-principles questions give marks for **notation**: write $\lim_{h \to 0}$ on every line until you actually let $h \to 0$. Dropping it early loses a mark.` },
          { type: "widget", widget: "drill", props: { generators: ["first-principles"], title: "First principles drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Limits: factorise, cancel, substitute.", m`$f'(x) = \lim_{h \to 0}\frac{f(x + h) - f(x)}{h}$.`, "Expand, subtract, factor out h, let h → 0.", "Keep writing lim until you take the limit."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "first-principles-quiz",
            questions: [
              { q: "The derivative at a point is the gradient of the…", options: ["secant", "tangent", "axis", "asymptote"], answer: 1, explain: "The secant becomes the tangent as h → 0." },
              { q: m`$\lim_{x \to 1}\frac{x^2 - 1}{x - 1} = $`, options: ["0", "1", "2", "undefined"], answer: 2, explain: m`$(x + 1) \to 2$.` },
              { q: m`From first principles, $f(x) = x^2$ gives $f'(x) = $`, options: [m`$x$`, m`$2x$`, m`$x^2$`, "2"], answer: 1, explain: m`$\lim_{h \to 0}(2x + h) = 2x$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "differentiation-rules",
    topic: "g12-calculus",
    order: 2,
    title: "Rules of differentiation & tangents",
    tagline: "The power rule: bring the power down, subtract one.",
    emoji: "⚡",
    caps: "CAPS Gr 12 · Differential calculus: the rules d/dx(xⁿ) = nxⁿ⁻¹, d/dx(k·f) = k·f', d/dx(f ± g) = f' ± g'; notation; equations of tangents to graphs.",
    objectives: [
      "Use the power, constant and sum rules",
      "Rewrite roots and fractions as powers before differentiating",
      "Find the equation of a tangent to a curve",
    ],
    styles: ["read-write", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Power rule", def: m`$\dfrac{d}{dx}\left(x^n\right) = nx^{n-1}$.` },
      { term: "Constant rule", def: m`The derivative of a constant is 0; $\frac{d}{dx}(k f(x)) = k f'(x)$.` },
      { term: "Notation", def: m`$f'(x)$, $\dfrac{dy}{dx}$, $D_x[f(x)]$ all mean "the derivative".` },
      { term: "Tangent equation", def: m`At $x = a$: gradient $m = f'(a)$, point $(a;\ f(a))$, then $y - y_1 = m(x - x_1)$.` },
      { term: "Rewrite first", def: m`$\sqrt{x} = x^{\frac{1}{2}}$, $\frac{1}{x^2} = x^{-2}$, $\frac{x^2 - 4}{x - 2} = x + 2$ – simplify before you differentiate.` },
    ],
    chunks: [
      {
        id: "rules",
        title: "The rules",
        minutes: 8,
        blocks: [
          { type: "text", md: m`First principles always works, but it's slow. Doing it for $x^n$ gives a pattern:

$$\frac{d}{dx}\left(ax^n\right) = anx^{n-1}$$

"Multiply by the power, then subtract 1 from the power." Constants vanish; sums are differentiated term by term.` },
          {
            type: "worked",
            title: "Rewrite, then differentiate",
            problem: m`Find $\dfrac{dy}{dx}$ if $y = 3x^4 - \dfrac{2}{x} + 4\sqrt{x} - 7$.`,
            steps: [
              { md: m`$y = 3x^4 - 2x^{-1} + 4x^{\frac{1}{2}} - 7$`, why: "Powers of x only – no fractions or roots." },
              { md: m`$\dfrac{dy}{dx} = 12x^3 + 2x^{-2} + 2x^{-\frac{1}{2}}$` },
              { md: m`$= 12x^3 + \dfrac{2}{x^2} + \dfrac{2}{\sqrt{x}}$` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`- $\frac{d}{dx}\left(\frac{2}{x}\right) \neq \frac{2}{1}$. Rewrite as $2x^{-1}$ first → $-2x^{-2}$.
- You may NOT differentiate a product or quotient term by term: simplify $\frac{x^2 + 3x}{x} = x + 3$ first.` },
          {
            type: "practice",
            id: "rules-practice",
            problems: [
              { q: m`Differentiate: $f(x) = 5x^3 - 4x^2 + x - 9$`, answer: "15x^2 - 8x + 1", kind: "expr", solution: m`$$f'(x) = 15x^2 - 8x + 1$$` },
              { q: m`Differentiate: $y = \dfrac{x^2 - 4}{x - 2}$`, answer: "1", kind: "expr", hint: "Simplify first: difference of squares.", solution: m`$$y = \frac{(x - 2)(x + 2)}{x - 2} = x + 2 \Rightarrow \frac{dy}{dx} = 1$$` },
              { q: m`Differentiate: $y = \dfrac{3}{x^2}$`, answer: "-6/x^3", kind: "expr", solution: m`$$y = 3x^{-2} \Rightarrow \frac{dy}{dx} = -6x^{-3} = -\frac{6}{x^3}$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["differentiate"], title: "Differentiation drill" } },
        ],
      },
      {
        id: "tangents",
        title: "Equations of tangents",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Tangent to a cubic",
            problem: m`Find the equation of the tangent to $f(x) = x^3 - 2x$ at $x = 2$.`,
            steps: [
              { md: m`Point: $f(2) = 8 - 4 = 4$, so $(2;\ 4)$` },
              { md: m`Gradient: $f'(x) = 3x^2 - 2 \Rightarrow f'(2) = 10$` },
              { md: m`$y - 4 = 10(x - 2) \Rightarrow y = 10x - 16$` },
            ],
          },
          {
            type: "practice",
            id: "calc-tangent-practice",
            problems: [
              { q: m`Find the equation of the tangent to $y = x^2 - 4x + 1$ at $x = 3$.`, answer: "2x - 8", kind: "expr", solution: m`$y(3) = 9 - 12 + 1 = -2$; $\frac{dy}{dx} = 2x - 4 = 2$ at $x = 3$.
$$y + 2 = 2(x - 3) \Rightarrow y = 2x - 8$$` },
              { q: m`At which $x$ is the gradient of $f(x) = x^2 - 6x$ equal to 4?`, answer: "5", solution: m`$$f'(x) = 2x - 6 = 4 \Rightarrow x = 5$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["tangent-eq"], title: "Tangent drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: [m`$\frac{d}{dx}(ax^n) = anx^{n-1}$; constants → 0.`, "Rewrite roots and fractions as powers; simplify quotients first.", "Tangent: point (a; f(a)) and gradient f′(a)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "rules-quiz",
            questions: [
              { q: m`$\frac{d}{dx}(7) = $`, options: ["7", "1", "0", "7x"], answer: 2, explain: "A constant doesn't change, so its rate of change is 0." },
              { q: m`$\frac{d}{dx}\left(\sqrt{x}\right) = $`, options: [m`$\frac{1}{2}\sqrt{x}$`, m`$\frac{1}{2\sqrt{x}}$`, m`$2\sqrt{x}$`, m`$\sqrt{x}$`], answer: 1, explain: m`$x^{\frac{1}{2}} \to \frac{1}{2}x^{-\frac{1}{2}}$.` },
              { q: m`If $f'(a) = 0$, the tangent at $x = a$ is…`, options: ["vertical", "horizontal", "undefined", m`$y = x$`], answer: 1, explain: "Gradient 0 means a horizontal tangent – a stationary point." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cubic-graphs",
    topic: "g12-calculus",
    order: 3,
    title: "Cubic graphs",
    tagline: "Stationary points, inflection and sketching with calculus.",
    emoji: "〰️",
    caps: "CAPS Gr 12 · Differential calculus: sketch cubic functions using intercepts, stationary points (f'(x) = 0) and the point of inflection; concavity; increasing/decreasing; find the equation of a cubic.",
    objectives: [
      "Find stationary points and their nature",
      "Find the point of inflection and describe concavity",
      "Sketch a cubic graph with all its features",
      "Read f(x) and f′(x) information from graphs",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 90,
    terms: [
      { term: "Stationary point", def: m`A point where $f'(x) = 0$ – a local maximum, local minimum or horizontal point of inflection.` },
      { term: "Local maximum / minimum", def: "A turning point that's higher / lower than the points around it." },
      { term: "Point of inflection", def: m`Where the concavity changes: $f''(x) = 0$. For a cubic, $x = -\frac{b}{3a}$.` },
      { term: "Concave up / down", def: m`Concave up ($f''(x) > 0$) bends like a smile; concave down ($f''(x) < 0$) like a frown.` },
      { term: "Increasing", def: m`$f'(x) > 0$: the graph rises from left to right.` },
    ],
    chunks: [
      {
        id: "features",
        title: "The features of a cubic",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Roller-coaster designers (Gold Reef City, Ratanga…) shape the track with polynomial curves: the peaks and dips are the **stationary points**, and the point where the curve switches from bending one way to the other is the **point of inflection**.` },
          { type: "widget", widget: "cubic-lab" },
        ],
      },
      {
        id: "sketch",
        title: "Sketching step by step",
        minutes: 10,
        blocks: [
          {
            type: "worked",
            title: "Full sketch",
            problem: m`Sketch $f(x) = x^3 - 3x^2 - 9x + 2$.`,
            steps: [
              { md: m`y-intercept: $(0;\ 2)$` },
              { md: m`$f'(x) = 3x^2 - 6x - 9 = 3(x - 3)(x + 1) = 0 \Rightarrow x = -1$ or $x = 3$` },
              { md: m`$f(-1) = 7$ → local max $(-1;\ 7)$; $f(3) = -25$ → local min $(3;\ -25)$`, why: "a > 0: the graph rises, falls, rises – so the left one is the max." },
              { md: m`$f''(x) = 6x - 6 = 0 \Rightarrow x = 1$; point of inflection $(1;\ -9)$` },
              { md: m`Decreasing for $-1 < x < 3$; concave down for $x < 1$, concave up for $x > 1$` },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: "f(x) = x³ − 3x² − 9x + 2", view: { xMin: -4, xMax: 6, yMin: -30, yMax: 15 }, yStep: 5, curves: [{ expr: "x^3 - 3x^2 - 9x + 2", label: m`f(x) = x^3 - 3x^2 - 9x + 2` }], points: [{ x: -1, y: 7, label: "max (−1; 7)" }, { x: 3, y: -25, label: "min (3; −25)" }, { x: 1, y: -9, label: "inflection (1; −9)" }, { x: 0, y: 2, label: "(0; 2)" }] } },
          { type: "callout", variant: "exam", md: m`For x-intercepts, use the factor theorem to find one root, then factorise the quadratic. If the roots aren't nice, the question will usually give you one factor.` },
          {
            type: "practice",
            id: "cubic-graph-practice",
            problems: [
              { q: m`Find the x-coordinates of the stationary points of $f(x) = -x^3 + 3x^2 + 9x - 5$.`, answer: "-1; 3", kind: "set", solution: m`$$f'(x) = -3x^2 + 6x + 9 = -3(x - 3)(x + 1) = 0 \Rightarrow x = -1 \text{ or } x = 3$$` },
              { q: m`For the same $f$, write down the coordinates of the local MAXIMUM.`, answer: "(3; 22)", kind: "point", hint: "a < 0: falls, rises, falls – the right-hand turning point is the max.", solution: m`$f(3) = -27 + 27 + 27 - 5 = 22$, so $(3;\ 22)$. (The minimum is $(-1;\ -10)$.)` },
              { q: m`Find the x-coordinate of the point of inflection of $f(x) = -x^3 + 3x^2 + 9x - 5$.`, answer: "1", solution: m`$$f''(x) = -6x + 6 = 0 \Rightarrow x = 1$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["stationary-points"], title: "Stationary point drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Stationary points: f′(x) = 0.", "Point of inflection: f″(x) = 0 (x = −b/3a).", "a > 0: max then min; a < 0: min then max.", "f′(x) > 0 increasing; f″(x) > 0 concave up."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cubic-graph-quiz",
            questions: [
              { q: m`If $f'(x) < 0$ for $1 < x < 4$, then $f$ is…`, options: ["increasing there", "decreasing there", "concave up there", "zero there"], answer: 1, explain: "Negative gradient = falling." },
              { q: m`The point of inflection of $f(x) = x^3 - 6x^2 + 5$ is at $x = $`, options: ["6", "2", "0", "3"], answer: 1, explain: m`$f''(x) = 6x - 12 = 0 \Rightarrow x = 2$.` },
              { q: "A cubic can have at most how many stationary points?", options: ["1", "2", "3", "4"], answer: 1, explain: "f′(x) is a quadratic – at most 2 roots." },
              { q: m`$f'(x) = 3(x - 1)^2$. At $x = 1$ the graph has…`, options: ["a local max", "a local min", "a horizontal point of inflection", "no stationary point"], answer: 2, explain: "f′ is 0 but doesn't change sign – the graph flattens and keeps rising." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "optimisation",
    topic: "g12-calculus",
    order: 4,
    title: "Optimisation",
    tagline: "The biggest box, the most area, the least cost – set the derivative to zero.",
    emoji: "📦",
    caps: "CAPS Gr 12 · Differential calculus: solve practical problems involving optimisation (maximum and minimum values).",
    objectives: [
      "Write the quantity to optimise as a function of one variable",
      "Find its maximum or minimum with the derivative",
      "Interpret the answer in context",
    ],
    styles: ["kinaesthetic", "visual"],
    xp: 90,
    terms: [
      { term: "Optimisation", def: "Finding the best (maximum or minimum) value of a quantity." },
      { term: "Objective function", def: "The quantity you want to maximise or minimise, written in ONE variable." },
      { term: "Constraint", def: "A condition that links the variables (e.g. the perimeter is 60 m) – use it to eliminate a variable." },
      { term: "Optimum", def: m`The best value: set the derivative $= 0$ and check it's a max or min.` },
    ],
    chunks: [
      {
        id: "box",
        title: "The open box",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Packaging companies want the box that holds the most for the least cardboard. Farmers want the biggest camp for a fixed length of fencing. **Optimisation** answers both – and it's often the last, hardest question in Paper 1.` },
          { type: "widget", widget: "optimisation-lab" },
          { type: "text", md: m`For a 30 cm × 20 cm sheet, the best cut is $x \approx 3{,}92$ cm, giving a volume of about $1\,056$ cm³. Drag the slider until you find it!` },
        ],
      },
      {
        id: "method",
        title: "The method",
        minutes: 9,
        blocks: [
          {
            type: "sequence",
            id: "optimise-steps",
            title: "Order the optimisation method",
            steps: ["Draw a diagram and label the variables", "Write the quantity to optimise (area, volume, cost…)", "Use the constraint to write it in ONE variable", "Differentiate and set the derivative equal to 0", "Solve, check it's a max/min, and answer the question asked"],
            explain: "Most marks are for setting up the function correctly in step 3.",
          },
          {
            type: "worked",
            title: "Fencing along a river",
            problem: m`A farmer has 120 m of fencing to make a rectangular camp along a straight river (no fence needed on the river side). Find the maximum area.`,
            steps: [
              { md: m`Let the sides perpendicular to the river be $x$: the other side is $120 - 2x$` },
              { md: m`$A(x) = x(120 - 2x) = 120x - 2x^2$` },
              { md: m`$A'(x) = 120 - 4x = 0 \Rightarrow x = 30$` },
              { md: m`$A(30) = 30 \times 60 = 1\,800$ m² (a maximum, since $A''(x) = -4 < 0$)` },
            ],
          },
          {
            type: "practice",
            id: "optimise-practice",
            problems: [
              { q: m`A rectangle has a perimeter of 60 cm. What is its maximum possible area (cm²)?`, answer: "225", solution: m`$A = x(30 - x)$, $A' = 30 - 2x = 0 \Rightarrow x = 15$: a 15 × 15 square with area 225 cm².` },
              { q: m`Two positive numbers add up to 20. What is the largest possible product?`, answer: "100", solution: m`$P = x(20 - x)$, $P' = 20 - 2x = 0 \Rightarrow x = 10$, $P = 100$.` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["rate-of-change"], title: "Optimisation & rates drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Get the quantity in terms of ONE variable using the constraint.", "Derivative = 0 gives the candidate optimum.", "Check: second derivative or the context.", "Answer the actual question (the area, not just x)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "optimise-quiz",
            questions: [
              { q: "To maximise A(x), you solve…", options: [m`$A(x) = 0$`, m`$A'(x) = 0$`, m`$A''(x) = 0$`, m`$A(0) = x$`], answer: 1, explain: "At a maximum the gradient is zero." },
              { q: m`If $A''(x) < 0$ at the stationary point, it is a…`, options: ["minimum", "maximum", "point of inflection", "root"], answer: 1, explain: "Concave down → a peak." },
              { q: "Of all rectangles with the same perimeter, the one with the biggest area is…", options: ["very long and thin", "a square", "twice as long as it is wide", "any shape"], answer: 1, explain: "The derivative always gives equal sides." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "rates-of-change",
    topic: "g12-calculus",
    order: 5,
    title: "Rates of change",
    tagline: "Velocity, growth rates and 'how fast is it changing right now?'",
    emoji: "🏎️",
    caps: "CAPS Gr 12 · Differential calculus: the derivative as a rate of change; velocity and acceleration in practical problems.",
    objectives: [
      "Interpret the derivative as an instantaneous rate of change",
      "Find velocity from a distance (or height) function",
      "Solve practical rate-of-change problems",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Rate of change", def: m`How fast one quantity changes with another: $\dfrac{dy}{dx}$.` },
      { term: "Velocity", def: m`The rate of change of position (or height) with time: $v(t) = s'(t)$.` },
      { term: "Acceleration", def: m`The rate of change of velocity: $a(t) = v'(t) = s''(t)$.` },
      { term: "Instantaneous vs average", def: "Average: over an interval (secant). Instantaneous: at one moment (tangent/derivative)." },
    ],
    chunks: [
      {
        id: "velocity",
        title: "Velocity",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A cricket ball hit straight up at 20 m/s has height $h(t) = 20t - 5t^2$ metres. Its velocity at any moment is the derivative: $h'(t) = 20 - 10t$. At the top, the velocity is zero – that's how you find the maximum height.` },
          {
            type: "worked",
            title: "The cricket ball",
            problem: m`$h(t) = 20t - 5t^2$. Find (a) the velocity after 1 s (b) when it reaches its highest point (c) the maximum height (d) its velocity when it hits the ground.`,
            steps: [
              { md: m`(a) $h'(t) = 20 - 10t \Rightarrow h'(1) = 10$ m/s` },
              { md: m`(b) $h'(t) = 0 \Rightarrow t = 2$ s` },
              { md: m`(c) $h(2) = 40 - 20 = 20$ m` },
              { md: m`(d) $h(t) = 0 \Rightarrow 5t(4 - t) = 0 \Rightarrow t = 4$; $h'(4) = -20$ m/s`, why: "Negative: moving downwards at 20 m/s." },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: "h(t) = 20t − 5t²", view: { xMin: -0.5, xMax: 4.5, yMin: -3, yMax: 24 }, yStep: 5, curves: [{ expr: "20x - 5x^2", from: 0, to: 4, label: m`h(t) = 20t - 5t^2` }], points: [{ x: 2, y: 20, label: "max: v = 0" }] } },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "rates-practice",
            problems: [
              { q: m`The volume of water in a tank after $t$ minutes is $V(t) = 100 - 4t^2$ litres. At what rate is water flowing out at $t = 3$? (Give the rate of change of V.)`, answer: "-24", solution: m`$$V'(t) = -8t \Rightarrow V'(3) = -24 \text{ litres per minute}$$ (negative: the volume is decreasing).` },
              { q: m`A car's distance is $s(t) = t^3 - 6t^2 + 15t$ metres. Find its velocity at $t = 4$ s.`, answer: "15", solution: m`$$v(t) = 3t^2 - 12t + 15 \Rightarrow v(4) = 48 - 48 + 15 = 15 \text{ m/s}$$` },
              { q: m`For the same car, find its acceleration at $t = 4$ s.`, answer: "12", solution: m`$$a(t) = v'(t) = 6t - 12 \Rightarrow a(4) = 12 \text{ m/s}^2$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["rate-of-change"], title: "Rates drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Rate of change = derivative.", "Velocity = s′(t); acceleration = s″(t).", "Maximum height: velocity = 0.", "A negative rate means decreasing."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "rates-quiz",
            questions: [
              { q: m`$s(t) = 4t^2$. The velocity at $t = 2$ is…`, options: ["16", "8", "4", "32"], answer: 0, explain: m`$s'(t) = 8t = 16$.` },
              { q: "At the highest point of a throw, the velocity is…", options: ["maximum", "zero", "negative", "the same as at the start"], answer: 1, explain: "It stops rising for an instant." },
              { q: "A negative rate of change of temperature means…", options: ["it's below 0 °C", "it's cooling down", "it's heating up", "nothing"], answer: 1, explain: "The quantity is decreasing." },
            ],
          },
          { type: "exam", question: { id: "rates-exam", q: m`A stone is thrown upwards. Its height is $h(t) = 2 + 15t - 5t^2$ metres. Calculate the maximum height reached.`, marks: 4, level: "complex", memo: [m`$h'(t) = 15 - 10t$`, m`$15 - 10t = 0$`, m`$t = 1{,}5$ s`, m`$h(1{,}5) = 2 + 22{,}5 - 11{,}25 = 13{,}25$ m`] } },
        ],
      },
    ],
  },
];
