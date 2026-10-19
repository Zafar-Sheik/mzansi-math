import type { Lesson } from "../types";

const m = String.raw;

export const FUNCTIONS: Lesson[] = [
  {
    slug: "parabolas",
    topic: "g11-functions",
    order: 1,
    title: "Parabolas: y = a(x + p)² + q",
    tagline: "Every free kick, fountain and half-pipe – shifted, stretched and sketched.",
    emoji: "🏀",
    caps: "CAPS Gr 11 · Functions: the effects of a, p and q on y = a(x + p)² + q; sketching, domain & range, axis of symmetry, turning point; finding equations.",
    objectives: [
      "Describe the effect of a, p and q on a parabola",
      "Read the turning point and axis of symmetry from turning-point form",
      "Sketch a parabola with all intercepts and the turning point",
      "Find the equation of a parabola from its graph",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 80,
    terms: [
      { term: "Function", def: "A rule that gives exactly ONE output (y) for every input (x)." },
      { term: "Parabola", def: m`The U-shaped graph of a quadratic function, e.g. $y = a(x + p)^2 + q$.` },
      { term: "Turning point", def: m`The highest or lowest point of a parabola. For $y = a(x + p)^2 + q$ it's $(-p;\ q)$.` },
      { term: "Axis of symmetry", def: m`The vertical line through the turning point: $x = -p$ (or $x = -\frac{b}{2a}$).` },
      { term: "Domain", def: m`All the x-values a graph uses. For a parabola: $x \in \mathbb{R}$.` },
      { term: "Range", def: m`All the y-values a graph reaches. For a parabola with $a > 0$: $y \geq q$; with $a < 0$: $y \leq q$.` },
      { term: "Effect of a", def: m`Sign: $a > 0$ smile (min), $a < 0$ frown (max). Size: bigger $|a|$ → narrower.` },
      { term: "Effect of p", def: m`Horizontal shift: $(x + p)^2$ moves the graph $p$ units LEFT (for $p > 0$). Turning point x-value is $-p$.` },
      { term: "Effect of q", def: m`Vertical shift: $+q$ moves the graph up by $q$. Turning point y-value is $q$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Parabolas are everywhere",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Bafana's free kick, a basketball shot, the water arc of a fountain, the cable of a suspension bridge, the shape of a satellite dish – all parabolas. If you can describe a parabola with an equation, you can predict where the ball lands.` },
          { type: "text", md: m`Every parabola is the basic graph $y = x^2$, **stretched** by $a$, **shifted sideways** by $p$ and **shifted up/down** by $q$:

$$y = a(x + p)^2 + q$$

Drag the sliders. The dashed grey curve is $y = x^2$ for comparison.` },
          { type: "widget", widget: "function-grapher", props: { family: "parabola", families: ["parabola"] } },
        ],
      },
      {
        id: "apq",
        title: "What a, p and q do",
        minutes: 6,
        blocks: [
          {
            type: "table",
            headers: ["Parameter", "What it does", "Read off"],
            rows: [
              [m`$a > 0$ / $a < 0$`, "Smile (minimum) / frown (maximum)", "Shape"],
              [m`$\lvert a \rvert$ big / small`, "Narrower / wider", "–"],
              [m`$p$`, m`Shifts LEFT by $p$ (right if $p < 0$)`, m`Axis of symmetry $x = -p$`],
              [m`$q$`, m`Shifts UP by $q$ (down if $q < 0$)`, m`Turning point $(-p;\ q)$, range`],
            ],
          },
          { type: "callout", variant: "mistake", md: m`$y = (x + 3)^2$ moves **left**, not right. The turning point is where the bracket is zero: $x + 3 = 0 \Rightarrow x = -3$.` },
          {
            type: "match",
            id: "parabola-tp-match",
            title: "Match each parabola to its turning point",
            pairs: [
              { left: m`$y = (x - 3)^2 + 1$`, right: m`$(3;\ 1)$` },
              { left: m`$y = -2(x + 1)^2 - 5$`, right: m`$(-1;\ -5)$` },
              { left: m`$y = x^2 - 4$`, right: m`$(0;\ -4)$` },
              { left: m`$y = 3(x + 2)^2$`, right: m`$(-2;\ 0)$` },
            ],
          },
        ],
      },
      {
        id: "sketch",
        title: "Sketching like a pro",
        minutes: 8,
        blocks: [
          {
            type: "sequence",
            id: "parabola-sketch-steps",
            title: "Order the steps to sketch a parabola",
            steps: ["Shape: a > 0 smile, a < 0 frown", "y-intercept: let x = 0", "x-intercepts: let y = 0 and solve", "Turning point: (−p; q), or x = −b/2a then find y", "Plot the points, draw a smooth curve and label everything"],
            explain: "Examiners give marks for the shape, each intercept and the turning point – so label every one with coordinates.",
          },
          {
            type: "worked",
            title: "Sketch it",
            problem: m`Sketch $f(x) = -(x - 1)^2 + 4$. Give the domain and range.`,
            steps: [
              { md: m`Shape: $a = -1 < 0$, so a frown with a maximum.` },
              { md: m`Turning point: $(1;\ 4)$. Axis of symmetry: $x = 1$.` },
              { md: m`y-intercept: $f(0) = -(0 - 1)^2 + 4 = 3 \Rightarrow (0;\ 3)$` },
              { md: m`x-intercepts: $(x - 1)^2 = 4 \Rightarrow x - 1 = \pm 2 \Rightarrow x = 3$ or $x = -1$`, why: "Isolate the bracket, then square root – don't forget ±." },
              { md: m`Domain: $x \in \mathbb{R}$. Range: $y \leq 4$.` },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: m`Sketch of f(x) = −(x − 1)² + 4`, view: { xMin: -4, xMax: 6, yMin: -5, yMax: 6 }, curves: [{ expr: "-(x-1)^2 + 4", label: m`f(x) = -(x - 1)^2 + 4` }], points: [{ x: 1, y: 4, label: "TP (1; 4)" }, { x: 0, y: 3, label: "(0; 3)" }, { x: -1, y: 0, label: "(−1; 0)" }, { x: 3, y: 0, label: "(3; 0)" }], guides: [{ x: 1, label: "x = 1" }] } },
          {
            type: "worked",
            title: "From standard form",
            problem: m`Find the turning point of $y = 2x^2 - 8x + 6$.`,
            steps: [
              { md: m`$x = -\dfrac{b}{2a} = -\dfrac{-8}{2(2)} = 2$` },
              { md: m`$y = 2(2)^2 - 8(2) + 6 = -2$`, why: "Substitute the x-value back in." },
              { md: m`Turning point $(2;\ -2)$` },
            ],
          },
        ],
      },
      {
        id: "equation",
        title: "Finding the equation",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Two standard set-ups:

- **Given the turning point** $(-p;\ q)$: start with $y = a(x + p)^2 + q$, substitute another point to find $a$.
- **Given the x-intercepts** $x_1$ and $x_2$: start with $y = a(x - x_1)(x - x_2)$, substitute another point to find $a$.` },
          {
            type: "worked",
            title: "Using the turning point",
            problem: m`A parabola has turning point $(2;\ -3)$ and passes through $(0;\ 5)$. Find its equation.`,
            steps: [
              { md: m`$y = a(x - 2)^2 - 3$`, why: "TP (2; −3) means p = −2 and q = −3." },
              { md: m`$5 = a(0 - 2)^2 - 3 \Rightarrow 5 = 4a - 3 \Rightarrow a = 2$` },
              { md: m`$y = 2(x - 2)^2 - 3$` },
            ],
          },
          {
            type: "practice",
            id: "parabola-equation-practice",
            problems: [
              { q: m`A parabola has turning point $(-1;\ 4)$ and passes through $(1;\ 0)$. Write down its equation.`, answer: "-(x+1)^2 + 4", kind: "expr", hint: "y = a(x + 1)² + 4; substitute (1; 0).", solution: m`$$0 = a(1 + 1)^2 + 4 \Rightarrow 4a = -4 \Rightarrow a = -1$$
$$y = -(x + 1)^2 + 4$$` },
              { q: m`A parabola cuts the x-axis at $x = 2$ and $x = 5$ and the y-axis at $(0;\ 20)$. Find its equation in the form $y = ax^2 + bx + c$.`, answer: "2x^2 - 14x + 20", kind: "expr", hint: "y = a(x − 2)(x − 5); substitute (0; 20).", solution: m`$$20 = a(0 - 2)(0 - 5) = 10a \Rightarrow a = 2$$
$$y = 2(x - 2)(x - 5) = 2x^2 - 14x + 20$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["parabola-tp"], title: "Turning point drill" } },
        ],
      },
      {
        id: "challenge",
        title: "Graph match & quick check",
        minutes: 8,
        blocks: [
          { type: "text", md: m`**Challenge mode:** a target parabola appears (dashed orange). Set $a$, $p$ and $q$ to land on it exactly. Read the turning point first – it gives you $p$ and $q$ straight away.` },
          { type: "widget", widget: "function-grapher", props: { family: "parabola", families: ["parabola"], challenge: true } },
          { type: "keypoints", points: [m`Turning point $(-p;\ q)$; axis of symmetry $x = -p$.`, m`$a > 0$ minimum (range $y \geq q$); $a < 0$ maximum (range $y \leq q$).`, "Sketch: shape, both intercepts, turning point – all labelled.", "Equation: TP form or x-intercept form, then substitute a point for a."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "parabola-quiz",
            questions: [
              { q: m`The turning point of $y = 2(x - 4)^2 + 1$ is…`, options: [m`$(-4;\ 1)$`, m`$(4;\ 1)$`, m`$(4;\ -1)$`, m`$(2;\ 1)$`], answer: 1, explain: m`The bracket is zero when $x = 4$; $q = 1$.` },
              { q: m`The range of $y = -3(x + 1)^2 + 5$ is…`, options: [m`$y \geq 5$`, m`$y \leq 5$`, m`$y \leq -1$`, m`$y \in \mathbb{R}$`], answer: 1, explain: m`$a < 0$ gives a maximum value of 5.` },
              { q: m`Compared to $y = x^2$, the graph of $y = x^2 - 3$ is…`, options: ["3 units left", "3 units right", "3 units down", "narrower"], answer: 2, explain: m`$q = -3$ shifts it 3 units down.` },
              { q: m`Which parabola is the narrowest?`, options: [m`$y = \frac{1}{2}x^2$`, m`$y = x^2$`, m`$y = -4x^2$`, m`$y = 2x^2$`], answer: 2, explain: m`Width depends on $|a|$; $|-4| = 4$ is the biggest, so it's the narrowest (and it's a frown).` },
              { q: m`The axis of symmetry of $y = x^2 + 6x + 2$ is…`, options: [m`$x = 6$`, m`$x = -3$`, m`$x = 3$`, m`$x = 2$`], answer: 1, explain: m`$x = -\frac{b}{2a} = -\frac{6}{2} = -3$.` },
              { q: m`$y = a(x - 1)(x - 5)$ has x-intercepts at…`, options: [m`$-1$ and $-5$`, m`$1$ and $5$`, m`$a$ and $5$`, m`$0$ and $5$`], answer: 1, explain: "Each bracket is zero at x = 1 and x = 5." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "hyperbolas",
    topic: "g11-functions",
    order: 2,
    title: "Hyperbolas: y = a/(x + p) + q",
    tagline: "The graph that gets infinitely close – but never touches.",
    emoji: "🌀",
    caps: "CAPS Gr 11 · Functions: the effects of a, p and q on y = a/(x + p) + q; asymptotes, axes of symmetry, sketching, domain & range, finding equations.",
    objectives: [
      "Describe the effect of a, p and q on a hyperbola",
      "Write down the asymptotes, domain and range",
      "Find the axes of symmetry",
      "Sketch a hyperbola and find its equation",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Hyperbola", def: m`The graph of $y = \frac{a}{x + p} + q$ – two separate branches.` },
      { term: "Asymptote", def: "A line that a graph gets closer and closer to, but never touches." },
      { term: "Vertical asymptote", def: m`$x = -p$ – where the denominator is zero (the graph is undefined there).` },
      { term: "Horizontal asymptote", def: m`$y = q$ – the value the graph approaches as $x$ gets very big or very small.` },
      { term: "Axes of symmetry (hyperbola)", def: m`Two lines through the asymptotes' meeting point $(-p;\ q)$ with gradients 1 and −1: $y = (x + p) + q$ and $y = -(x + p) + q$.` },
      { term: "Effect of a (hyperbola)", def: m`$a > 0$: branches in the 1st and 3rd "quadrants" formed by the asymptotes; $a < 0$: 2nd and 4th.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Splitting the Uber",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`An Uber from Sandton to the stadium costs R600. Split between $n$ friends, each pays $\frac{600}{n}$. With 2 friends: R300. With 10: R60. With 100: R6. The cost keeps dropping – but it **never reaches R0**. That line it never reaches is an **asymptote**.` },
          { type: "widget", widget: "function-grapher", props: { family: "hyperbola", families: ["hyperbola"] } },
        ],
      },
      {
        id: "apq",
        title: "Asymptotes, domain & range",
        minutes: 7,
        blocks: [
          { type: "text", md: m`For $y = \dfrac{a}{x + p} + q$:

- **Vertical asymptote:** $x = -p$ (you can't divide by zero)
- **Horizontal asymptote:** $y = q$
- **Domain:** $x \in \mathbb{R},\ x \neq -p$ · **Range:** $y \in \mathbb{R},\ y \neq q$
- $a > 0$: branches top-right and bottom-left of where the asymptotes cross; $a < 0$: top-left and bottom-right.
- **Axes of symmetry** pass through $(-p;\ q)$ with gradients $1$ and $-1$.` },
          { type: "callout", variant: "mistake", md: m`The axes of symmetry go through the point where the **asymptotes cross**, not through the origin (unless $p = q = 0$). Use $y = \pm(x + p) + q$.` },
          { type: "callout", variant: "memory", md: m`**"p pushes the wall, q lifts the floor."** The vertical asymptote is a wall at $x = -p$; the horizontal asymptote is a floor/ceiling at $y = q$.` },
        ],
      },
      {
        id: "sketch",
        title: "Sketch & find the equation",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Sketch it",
            problem: m`Sketch $g(x) = \dfrac{3}{x + 1} - 2$ and give the axes of symmetry.`,
            steps: [
              { md: m`Asymptotes: $x = -1$ and $y = -2$.` },
              { md: m`y-intercept: $g(0) = 3 - 2 = 1 \Rightarrow (0;\ 1)$` },
              { md: m`x-intercept: $\dfrac{3}{x + 1} = 2 \Rightarrow x + 1 = \dfrac{3}{2} \Rightarrow x = \dfrac{1}{2}$`, why: "Set g(x) = 0, isolate the fraction, then flip." },
              { md: m`$a = 3 > 0$: branches top-right and bottom-left of $(-1;\ -2)$.` },
              { md: m`Axes of symmetry: $y = (x + 1) - 2 = x - 1$ and $y = -(x + 1) - 2 = -x - 3$.` },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: m`Sketch of g(x) = 3/(x + 1) − 2`, view: { xMin: -7, xMax: 5, yMin: -8, yMax: 5 }, curves: [{ expr: "3/(x+1) - 2", label: m`g(x) = \frac{3}{x+1} - 2` }, { expr: "x - 1", label: m`y = x - 1`, dashed: true, colour: "var(--curve-ghost)" }, { expr: "-x - 3", label: m`y = -x - 3`, dashed: true, colour: "var(--curve-ghost)" }], points: [{ x: 0, y: 1, label: "(0; 1)" }, { x: 0.5, y: 0, label: "(½; 0)" }], guides: [{ x: -1, label: "x = −1" }, { y: -2, label: "y = −2" }] } },
          {
            type: "worked",
            title: "Find the equation",
            problem: m`A hyperbola has asymptotes $x = 2$ and $y = -1$ and passes through $(3;\ 2)$. Find its equation.`,
            steps: [
              { md: m`$y = \dfrac{a}{x - 2} - 1$`, why: "The asymptotes give p and q directly." },
              { md: m`$2 = \dfrac{a}{3 - 2} - 1 \Rightarrow a = 3$` },
              { md: m`$y = \dfrac{3}{x - 2} - 1$` },
            ],
          },
          {
            type: "practice",
            id: "hyperbola-practice",
            problems: [
              { q: m`Write down the equation of the vertical asymptote of $y = \dfrac{5}{x - 4} + 1$. (Give the $x$-value.)`, answer: "4", solution: m`$x - 4 = 0 \Rightarrow x = 4$` },
              { q: m`Determine the x-intercept of $y = \dfrac{2}{x - 1} - 4$.`, answer: "3/2", kind: "number", hint: "Set y = 0.", solution: m`$$\frac{2}{x - 1} = 4 \Rightarrow x - 1 = \frac{1}{2} \Rightarrow x = \frac{3}{2}$$` },
              { q: m`A hyperbola $y = \dfrac{a}{x + 3} + 2$ passes through $(-2;\ 6)$. Find $a$.`, answer: "4", solution: m`$$6 = \frac{a}{-2 + 3} + 2 \Rightarrow a = 4$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["hyperbola-asym"], title: "Hyperbola drill" } },
        ],
      },
      {
        id: "check",
        title: "Graph match & quick check",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "function-grapher", props: { family: "hyperbola", families: ["hyperbola"], challenge: true } },
          { type: "keypoints", points: [m`Asymptotes $x = -p$ and $y = q$.`, m`Domain $x \neq -p$; range $y \neq q$.`, m`Axes of symmetry: $y = \pm(x + p) + q$.`, "Equation: asymptotes give p and q; a point gives a."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "hyperbola-quiz",
            questions: [
              { q: m`The asymptotes of $y = \dfrac{2}{x - 3} + 5$ are…`, options: [m`$x = -3$, $y = 5$`, m`$x = 3$, $y = 5$`, m`$x = 3$, $y = 2$`, m`$x = 5$, $y = 3$`], answer: 1, explain: m`$x - 3 = 0 \Rightarrow x = 3$, and $q = 5$.` },
              { q: m`The domain of $y = \dfrac{-1}{x + 2}$ is…`, options: [m`$x \in \mathbb{R}$`, m`$x \neq 2$`, m`$x \neq -2$`, m`$x > -2$`], answer: 2, explain: m`The graph is undefined where $x + 2 = 0$.` },
              { q: m`For $y = \dfrac{-4}{x}$ the branches are in quadrants…`, options: ["1 and 3", "2 and 4", "1 and 2", "3 and 4"], answer: 1, explain: m`$a < 0$ puts the branches in the 2nd and 4th quadrants.` },
              { q: m`The axis of symmetry with positive gradient for $y = \dfrac{1}{x - 1} + 2$ is…`, options: [m`$y = x + 1$`, m`$y = x - 1$`, m`$y = x + 2$`, m`$y = -x + 3$`], answer: 0, explain: m`$y = (x - 1) + 2 = x + 1$.` },
              { q: m`Which statement about $y = \dfrac{3}{x}$ is FALSE?`, options: ["It never touches the x-axis", "It passes through (1; 3)", "It passes through the origin", "Its range is y ≠ 0"], answer: 2, explain: m`At $x = 0$ it's undefined – it can't pass through $(0;\ 0)$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "exponential-graphs",
    topic: "g11-functions",
    order: 3,
    title: "Exponential graphs: y = a·bˣ⁺ᵖ + q",
    tagline: "Growth, decay and the asymptote they all share.",
    emoji: "📈",
    caps: "CAPS Gr 11 · Functions: the effects of a, b, p and q on y = a·bˣ⁺ᵖ + q; asymptote, intercepts, sketching, domain & range, finding equations.",
    objectives: [
      "Tell growth (b > 1) from decay (0 < b < 1)",
      "Describe the effects of a, p and q",
      "Find the asymptote, intercepts, domain and range",
      "Sketch an exponential graph and find its equation",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Exponential function", def: m`$y = a \cdot b^{x + p} + q$ with $b > 0$, $b \neq 1$.` },
      { term: "Growth", def: m`When $b > 1$ (and $a > 0$): the graph increases faster and faster.` },
      { term: "Decay", def: m`When $0 < b < 1$ (and $a > 0$): the graph decreases towards the asymptote.` },
      { term: "Asymptote (exponential)", def: m`The horizontal line $y = q$ that the graph approaches but never reaches.` },
      { term: "Range (exponential)", def: m`$y > q$ if $a > 0$; $y < q$ if $a < 0$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Views that triple",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A video gets 100 views in the first hour and the views **triple every hour**: $V = 100 \cdot 3^t$. After 5 hours: 24 300 views. After 10 hours: almost 6 million. That's **exponential growth** – slow, slow, then suddenly *everywhere*.` },
          { type: "widget", widget: "function-grapher", props: { family: "exponential", families: ["exponential"] } },
        ],
      },
      {
        id: "effects",
        title: "Growth, decay & the asymptote",
        minutes: 7,
        blocks: [
          { type: "text", md: m`For $y = a \cdot b^{x + p} + q$:

- $b > 1$: growth; $0 < b < 1$: decay
- $a < 0$: the graph is **reflected** in the asymptote (it goes below it)
- $p$: shifts left/right (the asymptote doesn't move)
- $q$: shifts up/down – **the asymptote is $y = q$**
- Domain: $x \in \mathbb{R}$. Range: $y > q$ (if $a > 0$) or $y < q$ (if $a < 0$).` },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "exp-increasing", title: "Increasing or decreasing?", buckets: ["Increasing", "Decreasing"], colour: "var(--t-algebra)",
              items: [
                { text: m`$y = 2^x$`, bucket: "Increasing" }, { text: m`$y = \left(\frac{1}{2}\right)^x$`, bucket: "Decreasing" },
                { text: m`$y = 3^{-x}$`, bucket: "Decreasing" }, { text: m`$y = -2^x$`, bucket: "Decreasing" },
                { text: m`$y = -\left(\frac{1}{3}\right)^x$`, bucket: "Increasing" }, { text: m`$y = 5^x + 2$`, bucket: "Increasing" },
                { text: m`$y = 2(0{,}8)^x$`, bucket: "Decreasing" }, { text: m`$y = -3\left(\frac{1}{2}\right)^x$`, bucket: "Increasing" },
              ],
            },
          },
          { type: "callout", variant: "tip", md: m`$3^{-x} = \left(\frac{1}{3}\right)^x$ – a negative in front of $x$ in the exponent turns growth into decay.` },
        ],
      },
      {
        id: "sketch",
        title: "Sketch & find the equation",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Sketch it",
            problem: m`Sketch $h(x) = 2^{x + 1} - 4$.`,
            steps: [
              { md: m`Asymptote: $y = -4$` },
              { md: m`y-intercept: $h(0) = 2^1 - 4 = -2 \Rightarrow (0;\ -2)$` },
              { md: m`x-intercept: $2^{x + 1} = 4 = 2^2 \Rightarrow x + 1 = 2 \Rightarrow x = 1 \Rightarrow (1;\ 0)$`, why: "An exponential equation – same base, equal exponents." },
              { md: m`$b = 2 > 1$ and $a > 0$: increasing. Range: $y > -4$.` },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: m`Sketch of h(x) = 2^(x+1) − 4`, view: { xMin: -6, xMax: 4, yMin: -6, yMax: 6 }, curves: [{ expr: "2^(x+1) - 4", label: m`h(x) = 2^{x+1} - 4` }], points: [{ x: 0, y: -2, label: "(0; −2)" }, { x: 1, y: 0, label: "(1; 0)" }], guides: [{ y: -4, label: "y = −4" }] } },
          {
            type: "practice",
            id: "exp-graph-practice",
            problems: [
              { q: m`Determine the y-intercept of $y = 3 \cdot 2^{x} - 5$.`, answer: "-2", solution: m`$y = 3(1) - 5 = -2$` },
              { q: m`Write down the equation of the asymptote of $y = \left(\frac{1}{2}\right)^{x - 1} + 3$. (Give the $y$-value.)`, answer: "3", solution: m`The asymptote is $y = q = 3$.` },
              { q: m`Determine the x-intercept of $y = 2^{x} - 8$.`, answer: "3", solution: m`$2^x = 8 = 2^3 \Rightarrow x = 3$` },
              { q: m`$y = b^x$ passes through $\left(2;\ \frac{9}{4}\right)$. Find $b$.`, answer: "3/2", hint: "Substitute and square root (b > 0).", solution: m`$$b^2 = \frac{9}{4} \Rightarrow b = \frac{3}{2} \quad (b > 0)$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["exp-graph"], title: "Exponential graph drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: [m`Asymptote $y = q$ – it moves only with $q$.`, m`$b > 1$ growth, $0 < b < 1$ decay; $a < 0$ reflects.`, m`Range: $y > q$ ($a > 0$) or $y < q$ ($a < 0$).`, "x-intercept: solve an exponential equation (if one exists)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "exp-graph-quiz",
            questions: [
              { q: m`The asymptote of $y = 3^{x} - 2$ is…`, options: [m`$x = -2$`, m`$y = -2$`, m`$y = 3$`, m`$y = 0$`], answer: 1, explain: "The asymptote is y = q." },
              { q: m`Which graph shows decay?`, options: [m`$y = 4^x$`, m`$y = (1{,}5)^x$`, m`$y = (0{,}4)^x$`, m`$y = 10^x$`], answer: 2, explain: m`$0 < 0{,}4 < 1$, so the graph decreases.` },
              { q: m`The range of $y = -2^x + 1$ is…`, options: [m`$y > 1$`, m`$y < 1$`, m`$y > -1$`, m`$y \in \mathbb{R}$`], answer: 1, explain: m`$a < 0$, so the graph lies below the asymptote $y = 1$.` },
              { q: m`$y = 2^x + 3$ cuts the x-axis…`, options: ["once", "twice", "never", "at x = −3"], answer: 2, explain: m`$2^x = -3$ has no solution – the whole graph lies above $y = 3$.` },
              { q: m`The y-intercept of $y = 5 \cdot 2^{x}$ is…`, options: ["10", "5", "2", "0"], answer: 1, explain: m`$5 \cdot 2^0 = 5$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "average-gradient",
    topic: "g11-functions",
    order: 4,
    title: "Average gradient & reading graphs",
    tagline: "Rates of change, intersections and 'for which x is f(x) > g(x)?'",
    emoji: "🧭",
    caps: "CAPS Gr 11 · Functions: average gradient between two points on a curve; interpret graphs including intersections and inequalities between functions.",
    objectives: [
      "Calculate the average gradient between two points on a curve",
      "Find the points of intersection of two graphs",
      "Read off where f(x) > g(x), f(x) > 0, or where f is increasing",
    ],
    styles: ["visual", "read-write"],
    xp: 60,
    terms: [
      { term: "Gradient", def: m`Steepness: $m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$.` },
      { term: "Average gradient", def: m`The gradient of the straight line (secant) joining two points on a curve: $\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ – the average rate of change.` },
      { term: "Secant", def: "A straight line joining two points on a curve." },
      { term: "f(x) > g(x)", def: "Where the graph of f lies ABOVE the graph of g." },
      { term: "Increasing function", def: "As x increases, y increases – the graph goes up from left to right." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Average speed on the N3",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Durban to Joburg on the N3: about 570 km in 6 hours. Your speed changed all the time (Van Reenen's Pass, roadworks, that Wimpy stop), but your **average speed** was $\frac{570}{6} = 95$ km/h. That's an **average gradient** – change in distance over change in time.` },
          { type: "text", md: m`On a curve, the average gradient between two points is the gradient of the straight line joining them:

$$\text{average gradient} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$$` },
        ],
      },
      {
        id: "average",
        title: "Calculating average gradient",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Average gradient of a parabola",
            problem: m`Calculate the average gradient of $f(x) = x^2 - 2$ between $x = 1$ and $x = 3$.`,
            steps: [
              { md: m`$f(3) = 9 - 2 = 7$ and $f(1) = 1 - 2 = -1$` },
              { md: m`$\dfrac{f(3) - f(1)}{3 - 1} = \dfrac{7 - (-1)}{2} = 4$`, why: "Brackets around negative values save marks." },
            ],
          },
          {
            type: "practice",
            id: "avg-gradient-practice",
            problems: [
              { q: m`Average gradient of $f(x) = -x^2 + 4x$ between $x = 0$ and $x = 2$.`, answer: "2", solution: m`$$\frac{f(2) - f(0)}{2 - 0} = \frac{4 - 0}{2} = 2$$` },
              { q: m`Average gradient of $g(x) = 2^x$ between $x = 0$ and $x = 3$.`, answer: "7/3", solution: m`$$\frac{8 - 1}{3 - 0} = \frac{7}{3}$$` },
              { q: m`Average gradient of $h(x) = \dfrac{6}{x}$ between $x = 1$ and $x = 3$.`, answer: "-2", solution: m`$$\frac{2 - 6}{3 - 1} = -2$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["avg-gradient"], title: "Average gradient drill" } },
        ],
      },
      {
        id: "reading",
        title: "Reading two graphs",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Where is f above g?",
            problem: m`$f(x) = -x^2 + 4$ and $g(x) = x + 2$. Find the points of intersection and solve $f(x) \geq g(x)$.`,
            steps: [
              { md: m`$-x^2 + 4 = x + 2 \Rightarrow x^2 + x - 2 = 0 \Rightarrow (x + 2)(x - 1) = 0$` },
              { md: m`$x = -2$ or $x = 1$; points $(-2;\ 0)$ and $(1;\ 3)$` },
              { md: m`$f(x) \geq g(x)$ where the parabola is on or above the line: $-2 \leq x \leq 1$`, why: "Look at the sketch: between the intersections, the parabola is on top." },
            ],
          },
          { type: "widget", widget: "sketch", props: { title: "f(x) = −x² + 4 and g(x) = x + 2", view: { xMin: -5, xMax: 4, yMin: -4, yMax: 6 }, curves: [{ expr: "-x^2 + 4", label: m`f(x) = -x^2 + 4` }, { expr: "x + 2", label: m`g(x) = x + 2` }], points: [{ x: -2, y: 0, label: "(−2; 0)" }, { x: 1, y: 3, label: "(1; 3)" }] } },
          { type: "callout", variant: "exam", md: m`"For which values of $x$ is…" questions are almost always answered by **reading the sketch**. Use the x-values of intercepts, turning points and intersections as the boundaries.` },
          { type: "widget", widget: "intersection-lab" },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: [m`Average gradient $= \frac{f(x_2) - f(x_1)}{x_2 - x_1}$.`, "Intersections: set f(x) = g(x) and solve.", "f(x) > g(x): where f is above g; f(x) > 0: where f is above the x-axis.", "Use the sketch's key x-values as boundaries."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "avg-gradient-quiz",
            questions: [
              { q: m`Average gradient of $f(x) = x^2$ between $x = 1$ and $x = 4$:`, options: ["5", "15", "3", "4"], answer: 0, explain: m`$\frac{16 - 1}{4 - 1} = \frac{15}{3} = 5$.` },
              { q: m`Using the sketch of $f(x) = -x^2 + 4$ and $g(x) = x + 2$: for which $x$ is $f(x) < g(x)$?`, options: [m`$-2 < x < 1$`, m`$x < -2$ or $x > 1$`, m`$x > 1$`, m`$x < 4$`], answer: 1, explain: "Outside the intersections the line is above the parabola." },
              { q: m`For which $x$ is $f(x) = -x^2 + 4$ increasing?`, options: [m`$x > 0$`, m`$x < 0$`, m`$x < 4$`, m`$-2 < x < 2$`], answer: 1, explain: "A frown increases up to its turning point at x = 0." },
              { q: m`A negative average gradient between two points means…`, options: ["the function decreased overall", "the function is undefined", "the points are equal", "the function is a hyperbola"], answer: 0, explain: m`$f(x_2) < f(x_1)$ – on average, the graph went down.` },
              { q: m`For which $x$ is $f(x) = -x^2 + 4 > 0$?`, options: [m`$-2 < x < 2$`, m`$x > 2$`, m`$x < -2$ or $x > 2$`, m`$x > 4$`], answer: 0, explain: m`The parabola is above the x-axis between its x-intercepts $\pm 2$.` },
            ],
          },
        ],
      },
    ],
  },
];
