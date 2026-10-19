import type { Lesson } from "../types";

const m = String.raw;

export const G12_FUNCTIONS: Lesson[] = [
  {
    slug: "inverse-functions",
    topic: "g12-functions",
    order: 1,
    title: "Functions & their inverses",
    tagline: "Undo a function: swap x and y, reflect in y = x.",
    emoji: "🔁",
    caps: "CAPS Gr 12 · Functions: definition of a function; inverses of y = ax + q and y = ax² (with restricted domain); domain and range of inverses; graphs as reflections in y = x.",
    objectives: [
      "Decide whether a relation is a function (vertical line test)",
      "Find the inverse of linear and restricted quadratic functions",
      "Sketch a function and its inverse as reflections in y = x",
      "Decide whether an inverse is a function",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Function", def: "A relation in which every x-value has exactly one y-value (one-to-one or many-to-one)." },
      { term: "Vertical line test", def: "A graph is a function if no vertical line cuts it more than once." },
      { term: "Inverse function", def: m`$f^{-1}$ undoes $f$: swap $x$ and $y$ and make $y$ the subject. Its graph is the reflection of $f$ in $y = x$.` },
      { term: "One-to-one function", def: "Every y-value comes from exactly one x-value – its inverse is also a function (horizontal line test)." },
      { term: "Restricting the domain", def: m`Keeping only part of a graph (e.g. $x \geq 0$) so that the inverse is a function.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Undo!",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Converting °C to °F: $F = 1{,}8C + 32$. The **inverse** converts back: $C = \frac{F - 32}{1{,}8}$. Every "undo" button – decoding a message, converting currency back to rand – is an inverse function.` },
          { type: "widget", widget: "inverse-lab", props: { family: "linear" } },
        ],
      },
      {
        id: "find",
        title: "Finding the inverse",
        minutes: 8,
        blocks: [
          { type: "text", md: m`1. Write $y = f(x)$. 2. **Swap** $x$ and $y$. 3. Make $y$ the subject. 4. Write $f^{-1}(x) = \dots$ and state any restrictions.` },
          {
            type: "worked",
            title: "A line",
            problem: m`Find $f^{-1}$ if $f(x) = 3x - 6$.`,
            steps: [
              { md: m`$x = 3y - 6$`, why: "Swap x and y." },
              { md: m`$y = \dfrac{x + 6}{3} = \dfrac{1}{3}x + 2$` },
              { md: m`$f^{-1}(x) = \frac{1}{3}x + 2$` },
            ],
          },
          {
            type: "worked",
            title: "A restricted parabola",
            problem: m`$g(x) = 2x^2$, $x \geq 0$. Find $g^{-1}$ and its domain.`,
            steps: [
              { md: m`$x = 2y^2 \Rightarrow y^2 = \dfrac{x}{2}$` },
              { md: m`$y = \sqrt{\dfrac{x}{2}}$ (positive root because the original $x \geq 0$ becomes $y \geq 0$)` },
              { md: m`Domain of $g^{-1}$: $x \geq 0$ (= range of $g$)` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`$f^{-1}(x)$ is NOT $\frac{1}{f(x)}$. The $-1$ means "inverse function", not "one over".` },
          {
            type: "practice",
            id: "inverse-practice",
            problems: [
              { q: m`Find $f^{-1}(x)$ if $f(x) = 4x + 8$.`, answer: "x/4 - 2", kind: "expr", solution: m`$$x = 4y + 8 \Rightarrow y = \frac{x - 8}{4} = \frac{1}{4}x - 2$$` },
              { q: m`Find $h^{-1}(x)$ if $h(x) = -\frac{1}{2}x + 3$.`, answer: "-2x + 6", kind: "expr", solution: m`$$x = -\tfrac{1}{2}y + 3 \Rightarrow y = -2(x - 3) = -2x + 6$$` },
              { q: m`$k(x) = 3x^2$, $x \geq 0$. Find $k^{-1}(x)$.`, answer: "sqrt(x/3)", kind: "expr", solution: m`$$x = 3y^2 \Rightarrow y = \sqrt{\frac{x}{3}}$$` },
            ],
          },
          { type: "widget", widget: "inverse-lab", props: { family: "quadratic" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Swap x and y, then solve for y.", "The graph of f⁻¹ is f reflected in y = x.", "Domain of f⁻¹ = range of f, and vice versa.", "Restrict a parabola (e.g. x ≥ 0) so its inverse is a function."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "inverse-quiz",
            questions: [
              { q: m`The point $(2;\ 7)$ lies on $f$. Which point lies on $f^{-1}$?`, options: [m`$(-2;\ -7)$`, m`$(7;\ 2)$`, m`$(2;\ -7)$`, m`$(\frac{1}{2};\ \frac{1}{7})$`], answer: 1, explain: "Inverses swap x and y." },
              { q: m`The inverse of $y = x^2$ (no restriction) is…`, options: ["a function", "not a function", "the same graph", "a straight line"], answer: 1, explain: m`$y = \pm\sqrt{x}$ gives two y-values for each $x > 0$.` },
              { q: "The inverse of a function is the reflection in…", options: ["the x-axis", "the y-axis", m`$y = x$`, m`$y = -x$`], answer: 2, explain: "Swapping x and y reflects in y = x." },
              { q: m`$f(x) = x + 5$. $f^{-1}(x) = $`, options: [m`$x - 5$`, m`$\frac{1}{x + 5}$`, m`$-x - 5$`, m`$5 - x$`], answer: 0, explain: m`$x = y + 5 \Rightarrow y = x - 5$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "logarithms",
    topic: "g12-functions",
    order: 2,
    title: "Exponential & log functions",
    tagline: "log answers 'what power?' – the inverse of bˣ.",
    emoji: "🪵",
    caps: "CAPS Gr 12 · Functions: the inverse of y = bˣ is y = log_b x; definition of a logarithm; graphs of y = log_b x (b > 1 and 0 < b < 1); using logs to solve exponential equations.",
    objectives: [
      "Use the definition: y = log_b x ⇔ x = bʸ",
      "Evaluate logs without a calculator",
      "Sketch y = log_b x as the reflection of y = bˣ",
      "Solve exponential equations with logs",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Logarithm", def: m`$\log_b x$ is the exponent you put on $b$ to get $x$: $y = \log_b x \Leftrightarrow x = b^y$.` },
      { term: "Common log", def: m`$\log x$ means $\log_{10} x$ – the LOG key on your calculator.` },
      { term: "Log graph", def: m`$y = \log_b x$: domain $x > 0$, asymptote $x = 0$, passes through $(1;\ 0)$ and $(b;\ 1)$.` },
      { term: "Change of base", def: m`$\log_b x = \dfrac{\log x}{\log b}$ – use it to solve $b^x = k$ on a calculator.` },
      { term: "Increasing / decreasing log", def: m`$b > 1$: increasing; $0 < b < 1$: decreasing.` },
    ],
    chunks: [
      {
        id: "definition",
        title: "What a log means",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`The **Richter scale** for earthquakes and **decibels** for sound are logarithmic: each step up means 10 times bigger. A magnitude 6 quake shakes 10× more than a magnitude 5. Logs turn huge multiplications into small additions.` },
          { type: "text", md: m`$$\log_b x = y \quad\Leftrightarrow\quad b^y = x$$

Read $\log_2 8$ as "**2 to the power what is 8?**" – the answer is 3.` },
          {
            type: "match",
            id: "log-match",
            title: "Match each log to its value",
            pairs: [
              { left: m`$\log_2 32$`, right: "5" },
              { left: m`$\log_3 \frac{1}{9}$`, right: "−2" },
              { left: m`$\log_5 1$`, right: "0" },
              { left: m`$\log_4 2$`, right: m`$\frac{1}{2}$` },
              { left: m`$\log 1000$`, right: "3" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["log-eval"], title: "Log drill (no calculator)" } },
        ],
      },
      {
        id: "graphs",
        title: "The log graph",
        minutes: 7,
        blocks: [
          { type: "text", md: m`$y = \log_b x$ is the inverse of $y = b^x$, so its graph is the reflection in $y = x$:

| | $y = b^x$ | $y = \log_b x$ |
|---|---|---|
| Domain | $x \in \mathbb{R}$ | $x > 0$ |
| Range | $y > 0$ | $y \in \mathbb{R}$ |
| Asymptote | $y = 0$ | $x = 0$ |
| Key point | $(0;\ 1)$ | $(1;\ 0)$ |` },
          { type: "widget", widget: "inverse-lab", props: { family: "exponential" } },
          {
            type: "worked",
            title: "Find the base",
            problem: m`$(8;\ 3)$ lies on $y = \log_b x$. Find $b$.`,
            steps: [
              { md: m`$3 = \log_b 8 \Leftrightarrow b^3 = 8$` },
              { md: m`$b = 2$` },
            ],
          },
        ],
      },
      {
        id: "solve",
        title: "Solving with logs",
        minutes: 6,
        blocks: [
          {
            type: "worked",
            title: "Not a nice power",
            problem: m`Solve $2^x = 10$, correct to two decimals.`,
            steps: [
              { md: m`$x = \log_2 10$`, why: "By the definition of a log." },
              { md: m`$x = \dfrac{\log 10}{\log 2} = 3{,}32$` },
            ],
          },
          { type: "callout", variant: "tip", md: m`This is exactly how you'll find $n$ (the number of periods) in Grade 12 finance: isolate the power, then use logs.` },
          {
            type: "practice",
            id: "log-practice",
            problems: [
              { q: m`Write the inverse of $y = 3^x$ in the form $y = \dots$`, answer: "log(x)/log(3)", kind: "expr", hint: "Type log_3(x).", solution: m`$$x = 3^y \Rightarrow y = \log_3 x$$` },
              { q: m`Solve for $x$ (two decimals): $5^x = 40$`, answer: "2.29", tol: 0.011, solution: m`$$x = \frac{\log 40}{\log 5} = 2{,}29$$` },
              { q: m`Solve for $x$: $\log_2 x = 5$`, answer: "32", solution: m`$$x = 2^5 = 32$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["log-equation", "inverse-fn"], title: "Logs & inverses drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$\log_b x = y \Leftrightarrow b^y = x$.`, m`Inverse of $b^x$ is $\log_b x$; reflect in $y = x$.`, m`Log graph: $x > 0$, asymptote $x = 0$, through $(1;\ 0)$.`, m`Solve $b^x = k$: $x = \frac{\log k}{\log b}$.`] },
          { type: "terms" },
          {
            type: "quiz",
            id: "log-quiz",
            questions: [
              { q: m`$\log_3 81 = $`, options: ["27", "4", "3", "9"], answer: 1, explain: m`$3^4 = 81$.` },
              { q: m`The domain of $y = \log_2 x$ is…`, options: [m`$x \in \mathbb{R}$`, m`$x > 0$`, m`$x \geq 0$`, m`$y > 0$`], answer: 1, explain: "You can't take the log of 0 or a negative number." },
              { q: m`$y = \log_{\frac{1}{2}} x$ is…`, options: ["increasing", "decreasing", "constant", "undefined"], answer: 1, explain: "0 < b < 1 gives a decreasing graph." },
              { q: m`Every graph $y = \log_b x$ passes through…`, options: [m`$(0;\ 1)$`, m`$(1;\ 0)$`, m`$(0;\ 0)$`, m`$(b;\ 0)$`], answer: 1, explain: m`$\log_b 1 = 0$ because $b^0 = 1$.` },
            ],
          },
        ],
      },
    ],
  },
];

export const POLYNOMIALS: Lesson[] = [
  {
    slug: "remainder-factor",
    topic: "g12-polynomials",
    order: 1,
    title: "Remainder & factor theorems",
    tagline: "Divide without dividing: f(k) tells you the remainder.",
    emoji: "➗",
    caps: "CAPS Gr 12 · Polynomials: the remainder theorem and factor theorem for polynomials of degree ≤ 3; division of polynomials.",
    objectives: [
      "Use the remainder theorem: the remainder when f(x) is divided by (x − k) is f(k)",
      "Use the factor theorem to test for factors",
      "Divide a cubic by a linear factor (synthetic or long division)",
      "Find unknown coefficients",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Polynomial", def: m`A sum of terms $ax^n$ with whole-number exponents, e.g. $2x^3 - 3x^2 + 5$.` },
      { term: "Degree", def: "The highest power of x – a cubic has degree 3." },
      { term: "Remainder theorem", def: m`When $f(x)$ is divided by $(x - k)$, the remainder is $f(k)$. For $(ax - b)$ the remainder is $f\left(\frac{b}{a}\right)$.` },
      { term: "Factor theorem", def: m`$(x - k)$ is a factor of $f(x)$ if and only if $f(k) = 0$.` },
      { term: "Synthetic division", def: "A short way to divide a polynomial by (x − k) using only the coefficients." },
    ],
    chunks: [
      {
        id: "theorems",
        title: "The two theorems",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Dividing $f(x)$ by $(x - k)$ gives $f(x) = (x - k)Q(x) + R$. Put $x = k$: the first part becomes 0, so

$$R = f(k)$$

If that remainder is $0$, then $(x - k)$ divides exactly – it's a **factor**, and $x = k$ is a root of $f(x) = 0$.` },
          { type: "widget", widget: "polynomial-lab" },
        ],
      },
      {
        id: "use",
        title: "Using them",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Is it a factor?",
            problem: m`Show that $(x - 3)$ is a factor of $f(x) = 2x^3 - 3x^2 - 11x + 6$.`,
            steps: [
              { md: m`$f(3) = 2(27) - 3(9) - 11(3) + 6 = 54 - 27 - 33 + 6 = 0$` },
              { md: m`$\therefore (x - 3)$ is a factor (factor theorem)` },
            ],
          },
          {
            type: "worked",
            title: "Find the unknown",
            problem: m`$(x + 2)$ is a factor of $f(x) = x^3 + kx^2 - 4x - 12$. Find $k$.`,
            steps: [
              { md: m`$f(-2) = 0$`, why: "x + 2 = x − (−2), so k-value −2." },
              { md: m`$-8 + 4k + 8 - 12 = 0 \Rightarrow 4k = 12 \Rightarrow k = 3$` },
            ],
          },
          {
            type: "practice",
            id: "remainder-practice",
            problems: [
              { q: m`Find the remainder when $x^3 - 2x + 5$ is divided by $x - 2$.`, answer: "9", solution: m`$$f(2) = 8 - 4 + 5 = 9$$` },
              { q: m`Find the remainder when $2x^3 + x^2 - 1$ is divided by $x + 1$.`, answer: "-2", solution: m`$$f(-1) = -2 + 1 - 1 = -2$$` },
              { q: m`$(x - 1)$ is a factor of $x^3 + px^2 + x - 6$. Find $p$.`, answer: "4", solution: m`$$f(1) = 1 + p + 1 - 6 = 0 \Rightarrow p = 4$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["remainder"], title: "Remainder drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Remainder on division by (x − k) = f(k).", "f(k) = 0 ⇔ (x − k) is a factor.", "For (x + 2), substitute x = −2.", "Unknown coefficient: set f(k) = remainder (or 0) and solve."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "remainder-quiz",
            questions: [
              { q: m`The remainder when $f(x)$ is divided by $(x + 4)$ is…`, options: [m`$f(4)$`, m`$f(-4)$`, m`$-f(4)$`, "0"], answer: 1, explain: m`$x + 4 = x - (-4)$.` },
              { q: m`$f(5) = 0$ means…`, options: [m`$(x + 5)$ is a factor`, m`$(x - 5)$ is a factor`, "the remainder is 5", "f has no roots"], answer: 1, explain: "Factor theorem." },
              { q: "A cubic divided by a linear factor gives a quotient of degree…", options: ["1", "2", "3", "0"], answer: 1, explain: "3 − 1 = 2: a quadratic." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "solving-cubics",
    topic: "g12-polynomials",
    order: 2,
    title: "Factorising & solving cubics",
    tagline: "Find one factor, divide, then factorise the quadratic.",
    emoji: "🧩",
    caps: "CAPS Gr 12 · Polynomials: factorise third-degree polynomials and solve cubic equations using the factor theorem.",
    objectives: [
      "Find a first factor by trial using the factor theorem",
      "Divide to get a quadratic factor",
      "Factorise fully and solve cubic equations",
    ],
    styles: ["kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Trial factors", def: "Try x = ±1, ±2, … (factors of the constant term divided by factors of the leading coefficient) until f(k) = 0." },
      { term: "Quadratic factor", def: "What's left after dividing a cubic by a linear factor." },
      { term: "Fully factorised", def: m`Written as a product of factors that can't be factorised further, e.g. $(x - 1)(x - 3)(x + 2)$.` },
      { term: "Roots of a cubic", def: "A cubic equation has at most 3 real roots – the x-intercepts of the cubic graph." },
      { term: "Inspection", def: m`Finding the quadratic factor by matching coefficients: $(x - 1)(x^2 + bx + c)$ – choose $b$ and $c$ so the expansion matches.` },
    ],
    chunks: [
      {
        id: "method",
        title: "The method",
        minutes: 9,
        blocks: [
          {
            type: "sequence",
            id: "cubic-steps",
            title: "Order the steps to solve a cubic equation",
            steps: ["Try factors of the constant term until f(k) = 0", "Write (x − k) as a factor", "Divide (or use inspection) to find the quadratic factor", "Factorise the quadratic (or use the formula)", "Set each factor equal to zero and solve"],
            explain: "Always start by looking for one linear factor – everything else is Grade 11 maths.",
          },
          {
            type: "worked",
            title: "Factorise fully",
            problem: m`Solve $x^3 - 2x^2 - 5x + 6 = 0$.`,
            steps: [
              { md: m`$f(1) = 1 - 2 - 5 + 6 = 0$, so $(x - 1)$ is a factor` },
              { md: m`$f(x) = (x - 1)(x^2 - x - 6)$`, why: "By division or inspection: x·x² = x³ and −1·(−6) = 6 ✓." },
              { md: m`$= (x - 1)(x - 3)(x + 2) = 0$` },
              { md: m`$x = 1$ or $x = 3$ or $x = -2$` },
            ],
          },
          {
            type: "worked",
            title: "With a leading coefficient",
            problem: m`Solve $2x^3 - 3x^2 - 11x + 6 = 0$.`,
            steps: [
              { md: m`$f(3) = 0$, so $(x - 3)$ is a factor` },
              { md: m`$f(x) = (x - 3)(2x^2 + 3x - 2) = (x - 3)(2x - 1)(x + 2)$` },
              { md: m`$x = 3$ or $x = \frac{1}{2}$ or $x = -2$` },
            ],
          },
          {
            type: "practice",
            id: "cubic-practice",
            problems: [
              { q: m`Solve: $x^3 - 7x + 6 = 0$`, answer: "1; 2; -3", kind: "set", hint: "Try x = 1.", solution: m`$f(1) = 0$: $(x - 1)(x^2 + x - 6) = (x - 1)(x - 2)(x + 3) = 0$, so $x = 1$, $2$ or $-3$.` },
              { q: m`Solve: $x^3 + 2x^2 - x - 2 = 0$`, answer: "1; -1; -2", kind: "set", hint: "Group: x²(x + 2) − (x + 2).", solution: m`$$x^2(x + 2) - 1(x + 2) = (x + 2)(x - 1)(x + 1) = 0$$
$x = -2$, $1$ or $-1$.` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["cubic-factor"], title: "Cubic equation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Find one root by trial (factor theorem).", "Divide to get the quadratic factor.", "Factorise or use the formula for the rest.", "A cubic has at most three real roots."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cubic-quiz",
            questions: [
              { q: m`Which value should you try first for $x^3 - 6x^2 + 11x - 6$?`, options: [m`$x = 7$`, m`$x = 1$`, m`$x = 0$`, m`$x = 1{,}5$`], answer: 1, explain: "Try factors of the constant (6): 1, 2, 3… f(1) = 0 here." },
              { q: m`$(x - 2)(x^2 + 1) = 0$ has how many real roots?`, options: ["3", "2", "1", "0"], answer: 2, explain: m`$x^2 + 1 = 0$ has no real roots; only $x = 2$.` },
              { q: m`If $f(x) = (x + 1)(2x - 3)(x - 4)$, the roots are…`, options: [m`$1;\ \frac{3}{2};\ 4$`, m`$-1;\ \frac{3}{2};\ 4$`, m`$-1;\ -\frac{3}{2};\ -4$`, m`$-1;\ 3;\ 4$`], answer: 1, explain: "Set each factor to zero." },
            ],
          },
        ],
      },
    ],
  },
];
