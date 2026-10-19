import type { Lesson } from "../types";

const m = String.raw;

export const TRIG: Lesson[] = [
  {
    slug: "trig-ratios-cast",
    topic: "g11-trig",
    order: 1,
    title: "Trig ratios on the Cartesian plane",
    tagline: "x, y, r and CAST – trig for ANY angle, plus the special angles.",
    emoji: "📡",
    caps: "CAPS Gr 11 · Trigonometry: definitions of the trig ratios in terms of x, y and r for any angle; signs in the four quadrants (CAST); special-angle values without a calculator.",
    objectives: [
      "Define sin θ, cos θ and tan θ using x, y and r",
      "Use CAST to decide the sign of a ratio in each quadrant",
      "Find other ratios from one ratio without a calculator",
      "Use the special angles 0°, 30°, 45°, 60° and 90°",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "sin θ (Cartesian)", def: m`$\sin\theta = \dfrac{y}{r}$, where $P(x;\ y)$ is on the terminal arm and $r = OP$.` },
      { term: "cos θ (Cartesian)", def: m`$\cos\theta = \dfrac{x}{r}$.` },
      { term: "tan θ (Cartesian)", def: m`$\tan\theta = \dfrac{y}{x}$ (undefined when $x = 0$).` },
      { term: "r", def: m`The distance from the origin to $P$: $r = \sqrt{x^2 + y^2}$. It is ALWAYS positive.` },
      { term: "CAST", def: "Which ratio is positive in each quadrant: Q1 All, Q2 Sin, Q3 Tan, Q4 Cos (anticlockwise from Q1)." },
      { term: "Reference angle", def: "The acute angle between the terminal arm and the x-axis." },
      { term: "Special angles", def: m`$\sin 30^\circ = \frac{1}{2}$, $\sin 45^\circ = \frac{\sqrt{2}}{2}$, $\sin 60^\circ = \frac{\sqrt{3}}{2}$, $\tan 45^\circ = 1$, $\tan 60^\circ = \sqrt{3}$ …` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Trig beyond triangles",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A seat on the Ferris wheel at Gold Reef City goes round and round – past 90°, past 180°, all the way to 360°. Its height follows the **sine** of the angle turned. Grade 10 trig only worked inside right-angled triangles (angles up to 90°). Now we make sin, cos and tan work for **any** angle.` },
          { type: "text", md: m`Put a point $P(x;\ y)$ on the **terminal arm** of angle $\theta$ (measured anticlockwise from the positive x-axis), and let $r = OP = \sqrt{x^2 + y^2}$:

$$\sin\theta = \frac{y}{r} \qquad \cos\theta = \frac{x}{r} \qquad \tan\theta = \frac{y}{x}$$

Because $x$ and $y$ can be negative, the ratios can be negative too. Drag $P$:` },
          { type: "widget", widget: "unit-circle", props: { start: 150 } },
        ],
      },
      {
        id: "cast",
        title: "CAST and finding ratios without a calculator",
        minutes: 9,
        blocks: [
          { type: "text", md: m`$r$ is always positive, so the sign of each ratio depends on the signs of $x$ and $y$:

| Quadrant | x | y | Positive |
|---|---|---|---|
| 1 (0°–90°) | + | + | **A**ll |
| 2 (90°–180°) | − | + | **S**in |
| 3 (180°–270°) | − | − | **T**an |
| 4 (270°–360°) | + | − | **C**os |` },
          { type: "callout", variant: "memory", md: m`**"All Students Take Calculus"** – start in quadrant 1 and go anticlockwise: All, Sin, Tan, Cos.` },
          {
            type: "worked",
            title: "Draw the triangle",
            problem: m`If $5\sin\theta + 3 = 0$ and $90^\circ < \theta < 270^\circ$, find $\cos\theta$ and $\tan\theta$ without a calculator.`,
            steps: [
              { md: m`$\sin\theta = -\dfrac{3}{5} = \dfrac{y}{r}$, so $y = -3$, $r = 5$`, why: "r is always positive, so the minus belongs to y." },
              { md: m`sin is negative and $90^\circ < \theta < 270^\circ$ → quadrant 3, so $x < 0$` },
              { md: m`$x^2 = 5^2 - (-3)^2 = 16 \Rightarrow x = -4$`, why: "Pythagoras; choose the sign from the quadrant." },
              { md: m`$\cos\theta = \dfrac{-4}{5}$ and $\tan\theta = \dfrac{-3}{-4} = \dfrac{3}{4}$` },
            ],
          },
          {
            type: "practice",
            id: "cast-practice",
            problems: [
              { q: m`$\tan\theta = \dfrac{12}{5}$ and $\sin\theta < 0$. Find $\cos\theta$.`, answer: "-5/13", hint: "tan positive and sin negative → which quadrant?", solution: m`tan $> 0$ and sin $< 0$ → quadrant 3: $x = -5$, $y = -12$, $r = 13$.
$$\cos\theta = -\frac{5}{13}$$` },
              { q: m`$\cos\beta = -\dfrac{8}{17}$ and $180^\circ < \beta < 360^\circ$. Find $\tan\beta$.`, answer: "15/8", solution: m`cos negative between 180° and 360° → quadrant 3: $x = -8$, $r = 17$, $y = -15$.
$$\tan\beta = \frac{-15}{-8} = \frac{15}{8}$$` },
              { q: m`$P(-5;\ 12)$ is on the terminal arm of $\theta$. Calculate $\sin\theta + \cos\theta$.`, answer: "7/13", solution: m`$r = \sqrt{25 + 144} = 13$
$$\sin\theta + \cos\theta = \frac{12}{13} - \frac{5}{13} = \frac{7}{13}$$` },
            ],
          },
        ],
      },
      {
        id: "special",
        title: "The special angles",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Two triangles give you every special value – learn to draw them, not just the table:

- **45°–45°–90°** with sides $1;\ 1;\ \sqrt{2}$
- **30°–60°–90°** with sides $1;\ \sqrt{3};\ 2$ (half of an equilateral triangle with sides 2)` },
          {
            type: "table",
            headers: ["", "0°", "30°", "45°", "60°", "90°"],
            rows: [
              ["sin", "0", m`$\frac{1}{2}$`, m`$\frac{\sqrt{2}}{2}$`, m`$\frac{\sqrt{3}}{2}$`, "1"],
              ["cos", "1", m`$\frac{\sqrt{3}}{2}$`, m`$\frac{\sqrt{2}}{2}$`, m`$\frac{1}{2}$`, "0"],
              ["tan", "0", m`$\frac{\sqrt{3}}{3}$`, "1", m`$\sqrt{3}$`, "undefined"],
            ],
          },
          { type: "widget", widget: "figure", props: { title: "The special triangles", points: { A: [0, 0], B: [1.732, 0], C: [1.732, 1], D: [3, 0], E: [4, 0], F: [4, 1] }, segments: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"], ["E", "F"], ["F", "D"]], angles: [{ at: "A", from: "B", to: "C", label: "30°" }, { at: "C", from: "A", to: "B", label: "60°" }, { at: "B", from: "A", to: "C", right: true }, { at: "D", from: "E", to: "F", label: "45°" }, { at: "E", from: "D", to: "F", right: true }], sideLabels: [{ from: "A", to: "B", label: "√3" }, { from: "B", to: "C", label: "1" }, { from: "A", to: "C", label: "2" }, { from: "D", to: "E", label: "1" }, { from: "E", to: "F", label: "1" }, { from: "D", to: "F", label: "√2" }] } },
          { type: "widget", widget: "drill", props: { generators: ["special-angles"], title: "Special angle drill (no calculator!)" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$\sin\theta = \frac{y}{r}$, $\cos\theta = \frac{x}{r}$, $\tan\theta = \frac{y}{x}$, with $r > 0$.`, "CAST: All, Sin, Tan, Cos – anticlockwise from quadrant 1.", "From one ratio: find the quadrant, draw x, y, r, use Pythagoras.", "Draw the two special triangles to get exact values."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cast-quiz",
            questions: [
              { q: "In which quadrant is sin negative and cos positive?", options: ["1", "2", "3", "4"], answer: 3, explain: "Quadrant 4: x > 0, y < 0 – only cos is positive." },
              { q: m`$\cos 60^\circ + \sin 30^\circ = $`, options: [m`$\frac{1}{2}$`, "1", m`$\sqrt{3}$`, m`$\frac{\sqrt{3}}{2}$`], answer: 1, explain: m`$\frac{1}{2} + \frac{1}{2} = 1$.` },
              { q: m`$P(3;\ -4)$ is on the terminal arm of $\theta$. $\tan\theta = $`, options: [m`$-\frac{4}{3}$`, m`$\frac{3}{4}$`, m`$-\frac{3}{4}$`, m`$\frac{4}{5}$`], answer: 0, explain: m`$\tan\theta = \frac{y}{x} = \frac{-4}{3}$.` },
              { q: m`Which value is NOT possible for $\sin\theta$?`, options: [m`$-1$`, m`$0{,}99$`, m`$\frac{3}{2}$`, m`$-\frac{1}{2}$`], answer: 2, explain: m`$|y| \leq r$, so $-1 \leq \sin\theta \leq 1$.` },
              { q: m`$\tan 60^\circ = $`, options: [m`$\frac{\sqrt{3}}{3}$`, m`$\sqrt{3}$`, m`$\frac{\sqrt{3}}{2}$`, m`$\frac{1}{2}$`], answer: 1, explain: m`$\frac{\sin 60^\circ}{\cos 60^\circ} = \frac{\sqrt{3}/2}{1/2} = \sqrt{3}$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "reduction-formulae",
    topic: "g11-trig",
    order: 2,
    title: "Reduction formulae",
    tagline: "Shrink any angle to an acute one – and swap sin ↔ cos with 90°.",
    emoji: "🔄",
    caps: "CAPS Gr 11 · Trigonometry: derive and use reduction formulae for 180° ± θ, 360° ± θ, −θ and 90° ± θ (co-functions) to simplify expressions and evaluate without a calculator.",
    objectives: [
      "Reduce sin, cos and tan of 180° ± θ, 360° − θ and −θ",
      "Use co-functions for 90° ± θ",
      "Evaluate trig expressions with non-acute angles without a calculator",
      "Simplify expressions using reduction formulae",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "180° − θ", def: m`Quadrant 2: $\sin(180^\circ - \theta) = \sin\theta$, $\cos(180^\circ - \theta) = -\cos\theta$, $\tan(180^\circ - \theta) = -\tan\theta$.` },
      { term: "180° + θ", def: m`Quadrant 3: $\sin(180^\circ + \theta) = -\sin\theta$, $\cos(180^\circ + \theta) = -\cos\theta$, $\tan(180^\circ + \theta) = \tan\theta$.` },
      { term: "360° − θ (and −θ)", def: m`Quadrant 4: $\sin(-\theta) = -\sin\theta$, $\cos(-\theta) = \cos\theta$, $\tan(-\theta) = -\tan\theta$.` },
      { term: "Co-functions", def: m`$\sin(90^\circ - \theta) = \cos\theta$, $\cos(90^\circ - \theta) = \sin\theta$, $\sin(90^\circ + \theta) = \cos\theta$, $\cos(90^\circ + \theta) = -\sin\theta$.` },
      { term: "Angles over 360°", def: m`Subtract multiples of 360°: $\sin 480^\circ = \sin 120^\circ$.` },
    ],
    chunks: [
      {
        id: "idea",
        title: "The big idea",
        minutes: 5,
        blocks: [
          { type: "text", md: m`Every angle has an acute **reference angle** in quadrant 1, and the ratio has the same size there – only the **sign** may change. So:

1. Write the angle as $180^\circ \pm \theta$, $360^\circ - \theta$ or $-\theta$.
2. Keep the **same function**.
3. Use **CAST** to choose the sign.

Drag $P$ to $210^\circ$ – the readout shows $\sin 210^\circ = -\sin 30^\circ$.` },
          { type: "widget", widget: "unit-circle", props: { start: 210 } },
        ],
      },
      {
        id: "formulas",
        title: "The formulas",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["", m`$180^\circ - \theta$ (Q2)`, m`$180^\circ + \theta$ (Q3)`, m`$360^\circ - \theta$ or $-\theta$ (Q4)`],
            rows: [
              ["sin", m`$\sin\theta$`, m`$-\sin\theta$`, m`$-\sin\theta$`],
              ["cos", m`$-\cos\theta$`, m`$-\cos\theta$`, m`$\cos\theta$`],
              ["tan", m`$-\tan\theta$`, m`$\tan\theta$`, m`$-\tan\theta$`],
            ],
          },
          { type: "callout", variant: "key", title: "Co-functions (90° ± θ)", md: m`With $90^\circ$, the function **swaps**: sin ↔ cos.

$$\sin(90^\circ - \theta) = \cos\theta \quad \cos(90^\circ - \theta) = \sin\theta$$
$$\sin(90^\circ + \theta) = \cos\theta \quad \cos(90^\circ + \theta) = -\sin\theta$$

The sign still comes from CAST: $90^\circ + \theta$ is in quadrant 2, where cos is negative.` },
          {
            type: "worked",
            title: "Evaluate without a calculator",
            problem: m`Evaluate: (a) $\sin 330^\circ$ (b) $\cos 135^\circ$ (c) $\tan(-240^\circ)$`,
            steps: [
              { md: m`(a) $\sin(360^\circ - 30^\circ) = -\sin 30^\circ = -\dfrac{1}{2}$` },
              { md: m`(b) $\cos(180^\circ - 45^\circ) = -\cos 45^\circ = -\dfrac{\sqrt{2}}{2}$` },
              { md: m`(c) $\tan(-240^\circ) = \tan(-240^\circ + 360^\circ) = \tan 120^\circ = \tan(180^\circ - 60^\circ) = -\sqrt{3}$`, why: "Adding 360° doesn't change the angle's position." },
            ],
          },
          {
            type: "worked",
            title: "Simplify an expression",
            problem: m`Simplify: $\dfrac{\sin(180^\circ - x)\cos(360^\circ - x)}{\sin(-x)\cos(90^\circ + x)}$`,
            steps: [
              { md: m`$= \dfrac{\sin x \cdot \cos x}{(-\sin x)(-\sin x)}$`, why: "Reduce each factor on its own." },
              { md: m`$= \dfrac{\sin x \cos x}{\sin^2 x} = \dfrac{\cos x}{\sin x}$` },
            ],
          },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "reduction-practice",
            problems: [
              { q: m`Evaluate without a calculator: $\cos 315^\circ$`, answer: "sqrt(2)/2", solution: m`$$\cos(360^\circ - 45^\circ) = \cos 45^\circ = \frac{\sqrt{2}}{2}$$` },
              { q: m`Evaluate without a calculator: $\tan 150^\circ$`, answer: "-sqrt(3)/3", solution: m`$$\tan(180^\circ - 30^\circ) = -\tan 30^\circ = -\frac{\sqrt{3}}{3}$$` },
              { q: m`Evaluate without a calculator: $\sin 480^\circ$`, answer: "sqrt(3)/2", solution: m`$$\sin 480^\circ = \sin 120^\circ = \sin(180^\circ - 60^\circ) = \sin 60^\circ = \frac{\sqrt{3}}{2}$$` },
              { q: m`Simplify: $\dfrac{\cos(180^\circ - x)}{\sin(90^\circ + x)}$`, answer: "-1", kind: "expr", solution: m`$$\frac{-\cos x}{\cos x} = -1$$` },
              { q: m`Simplify: $\dfrac{\tan(180^\circ + x)\sin(360^\circ - x)}{\cos(90^\circ - x)}$`, answer: "-tan(x)", kind: "expr", solution: m`$$\frac{\tan x \cdot (-\sin x)}{\sin x} = -\tan x$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["reduction-eval", "reduction-simplify"], title: "Reduction drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Same function for 180° ± θ, 360° − θ and −θ; sign from CAST.", "90° ± θ: sin ↔ cos; sign from CAST.", "Subtract (or add) 360° until the angle is between 0° and 360°.", "Reduce each factor separately, then simplify."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "reduction-quiz",
            questions: [
              { q: m`$\sin(180^\circ + x) = $`, options: [m`$\sin x$`, m`$-\sin x$`, m`$\cos x$`, m`$-\cos x$`], answer: 1, explain: "Quadrant 3: sin is negative." },
              { q: m`$\cos(-x) = $`, options: [m`$-\cos x$`, m`$\cos x$`, m`$\sin x$`, m`$-\sin x$`], answer: 1, explain: "−x is in quadrant 4, where cos is positive." },
              { q: m`$\cos(90^\circ + x) = $`, options: [m`$\sin x$`, m`$-\sin x$`, m`$\cos x$`, m`$-\cos x$`], answer: 1, explain: "Co-function swaps to sin; 90° + x is in quadrant 2 where cos is negative." },
              { q: m`$\cos 240^\circ = $`, options: [m`$\frac{1}{2}$`, m`$-\frac{1}{2}$`, m`$-\frac{\sqrt{3}}{2}$`, m`$\frac{\sqrt{3}}{2}$`], answer: 1, explain: m`$\cos(180^\circ + 60^\circ) = -\cos 60^\circ = -\frac{1}{2}$.` },
              { q: m`$\tan(360^\circ - x) = $`, options: [m`$\tan x$`, m`$-\tan x$`, m`$\frac{1}{\tan x}$`, m`$-\frac{1}{\tan x}$`], answer: 1, explain: "Quadrant 4: tan is negative." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "trig-identities",
    topic: "g11-trig",
    order: 3,
    title: "Trig identities",
    tagline: "Two identities, endless proofs – start with the messy side.",
    emoji: "🪪",
    caps: "CAPS Gr 11 · Trigonometry: derive and use the identities tan θ = sin θ / cos θ and sin²θ + cos²θ = 1 to simplify expressions and prove identities; values for which identities are undefined.",
    objectives: [
      "Derive tan θ = sin θ / cos θ and sin²θ + cos²θ = 1",
      "Simplify expressions with the identities",
      "Prove identities, working from one side",
      "State the values for which an identity is undefined",
    ],
    styles: ["read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Quotient identity", def: m`$\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ (for $\cos\theta \neq 0$).` },
      { term: "Square identity", def: m`$\sin^2\theta + \cos^2\theta = 1$, so also $\sin^2\theta = 1 - \cos^2\theta$ and $\cos^2\theta = 1 - \sin^2\theta$.` },
      { term: "Identity", def: "An equation that is true for EVERY value of the variable where both sides are defined." },
      { term: "Undefined values", def: "Values that make a denominator zero (or tan undefined) – the identity doesn't hold there." },
      { term: "LHS / RHS", def: "Left-hand side / right-hand side. Prove an identity by turning one side into the other." },
    ],
    chunks: [
      {
        id: "derive",
        title: "Where the identities come from",
        minutes: 5,
        blocks: [
          { type: "text", md: m`From the definitions:

$$\frac{\sin\theta}{\cos\theta} = \frac{y/r}{x/r} = \frac{y}{x} = \tan\theta$$

and since $x^2 + y^2 = r^2$ (Pythagoras), divide by $r^2$:

$$\left(\frac{x}{r}\right)^2 + \left(\frac{y}{r}\right)^2 = 1 \;\Rightarrow\; \cos^2\theta + \sin^2\theta = 1$$` },
          { type: "callout", variant: "tip", md: m`$\sin^2\theta$ means $(\sin\theta)^2$. On this site you can type it as **sin^2 x** or **(sin x)^2**.` },
        ],
      },
      {
        id: "proofs",
        title: "Proving identities",
        minutes: 9,
        blocks: [
          {
            type: "sequence",
            id: "identity-steps",
            title: "A reliable strategy for proofs",
            steps: ["Start with the more complicated side", "Change tan into sin/cos", "Get a common denominator / expand brackets", "Use sin² + cos² = 1 (or a version of it)", "Factorise and cancel until it matches the other side"],
            explain: "Never move terms across the equals sign – work on ONE side until it becomes the other.",
          },
          {
            type: "worked",
            title: "Prove it",
            problem: m`Prove: $\dfrac{1}{\cos x} - \cos x = \sin x \tan x$`,
            steps: [
              { md: m`LHS $= \dfrac{1 - \cos^2 x}{\cos x}$`, why: "Common denominator." },
              { md: m`$= \dfrac{\sin^2 x}{\cos x}$`, why: m`$1 - \cos^2 x = \sin^2 x$.` },
              { md: m`$= \sin x \cdot \dfrac{\sin x}{\cos x} = \sin x \tan x =$ RHS` },
            ],
          },
          {
            type: "worked",
            title: "Expand first",
            problem: m`Prove: $(\sin x + \cos x)^2 - 1 = 2\sin x\cos x$`,
            steps: [
              { md: m`LHS $= \sin^2 x + 2\sin x\cos x + \cos^2 x - 1$` },
              { md: m`$= 1 + 2\sin x \cos x - 1 = 2\sin x \cos x =$ RHS` },
            ],
          },
          { type: "callout", variant: "exam", md: m`"For which values of $x$ is the identity undefined?" Find where any denominator is 0 or tan is undefined. For $\frac{\sin x}{\tan x}$: $\tan x$ is undefined at $90^\circ, 270^\circ$ and zero at $0^\circ, 180^\circ, 360^\circ$ – all of those are excluded.` },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "identity-practice",
            problems: [
              { q: m`Simplify: $\dfrac{1 - \cos^2 x}{\sin x}$`, answer: "sin(x)", kind: "expr", solution: m`$$\frac{\sin^2 x}{\sin x} = \sin x$$` },
              { q: m`Simplify: $\dfrac{\tan x \cos x}{\sin x}$`, answer: "1", kind: "expr", solution: m`$$\frac{\frac{\sin x}{\cos x} \cdot \cos x}{\sin x} = \frac{\sin x}{\sin x} = 1$$` },
              { q: m`Simplify: $(1 - \sin^2 x)\tan x$`, answer: "sin(x)*cos(x)", kind: "expr", solution: m`$$\cos^2 x \cdot \frac{\sin x}{\cos x} = \sin x \cos x$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["identity-simplify"], title: "Identity drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$\tan\theta = \frac{\sin\theta}{\cos\theta}$; $\sin^2\theta + \cos^2\theta = 1$.`, "Prove by working on one side only.", "Common denominators, factorising and the square identity do most of the work.", "Undefined where a denominator is 0."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "identity-quiz",
            questions: [
              { q: m`$1 - \sin^2 x = $`, options: [m`$\cos x$`, m`$\cos^2 x$`, m`$\tan^2 x$`, m`$-\cos^2 x$`], answer: 1, explain: m`From $\sin^2 x + \cos^2 x = 1$.` },
              { q: m`$\dfrac{\sin x}{\cos x} \cdot \cos^2 x = $`, options: [m`$\sin x \cos x$`, m`$\tan x$`, m`$\sin^2 x$`, m`$\cos x$`], answer: 0, explain: "One cos cancels." },
              { q: m`$\dfrac{1}{\tan x}$ is undefined when…`, options: [m`$x = 45^\circ$`, m`$x = 0^\circ$ or $180^\circ$`, m`$x = 60^\circ$`, "never"], answer: 1, explain: m`$\tan 0^\circ = \tan 180^\circ = 0$ – division by zero.` },
              { q: "When proving an identity you should…", options: ["work on both sides at once", "transform one side into the other", "substitute one value of x", "move terms across the equals sign"], answer: 1, explain: "Checking one value only shows it's true for that value, not for all values." },
              { q: m`$\sin^2 37^\circ + \cos^2 37^\circ = $`, options: ["0", "1", m`$\tan 37^\circ$`, "2"], answer: 1, explain: "The square identity works for any angle." },
            ],
          },
          { type: "exam", question: { id: "identity-exam", q: m`Prove that $\dfrac{1 - \cos^2 x}{\sin x \cos x} = \tan x$.`, marks: 3, level: "routine", memo: [m`$= \dfrac{\sin^2 x}{\sin x \cos x}$ (square identity)`, m`$= \dfrac{\sin x}{\cos x}$`, m`$= \tan x$ = RHS`] } },
        ],
      },
    ],
  },
  {
    slug: "trig-equations",
    topic: "g11-trig",
    order: 4,
    title: "Trig equations & the general solution",
    tagline: "Infinitely many answers – written in one neat line.",
    emoji: "♾️",
    caps: "CAPS Gr 11 · Trigonometry: determine the general solution of trigonometric equations, and the solutions in a given interval, including equations needing factorising or identities.",
    objectives: [
      "Find the reference angle and use CAST to place the solutions",
      "Write the general solution of sin, cos and tan equations",
      "Pick out the solutions in a given interval",
      "Solve equations that need factorising or an identity",
    ],
    styles: ["read-write", "visual"],
    xp: 80,
    terms: [
      { term: "General solution (sin)", def: m`If $\sin x = \sin\alpha$: $x = \alpha + k \cdot 360^\circ$ or $x = 180^\circ - \alpha + k \cdot 360^\circ$, $k \in \mathbb{Z}$.` },
      { term: "General solution (cos)", def: m`If $\cos x = \cos\alpha$: $x = \pm\alpha + k \cdot 360^\circ$, $k \in \mathbb{Z}$.` },
      { term: "General solution (tan)", def: m`If $\tan x = \tan\alpha$: $x = \alpha + k \cdot 180^\circ$, $k \in \mathbb{Z}$.` },
      { term: "k ∈ ℤ", def: "k is any integer (…, −2, −1, 0, 1, 2, …) – each value gives another solution one period away." },
      { term: "Reference angle (equations)", def: "Use the POSITIVE value with the inverse function to get the acute reference angle." },
    ],
    chunks: [
      {
        id: "method",
        title: "The method",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Because sin, cos and tan repeat, a trig equation has **infinitely many** solutions. The method:

1. Isolate the trig function.
2. Reference angle: inverse of the **positive** value.
3. CAST: which quadrants make the sign right?
4. Write the general solution (add $k \cdot 360^\circ$, or $k \cdot 180^\circ$ for tan).
5. If an interval is given, substitute values of $k$.` },
          {
            type: "worked",
            title: "A negative sine",
            problem: m`Solve $2\sin x + 1 = 0$: (a) the general solution (b) $x \in [-180^\circ;\ 180^\circ]$.`,
            steps: [
              { md: m`$\sin x = -\dfrac{1}{2}$; reference angle $\sin^{-1}\left(\frac{1}{2}\right) = 30^\circ$` },
              { md: m`sin negative → quadrants 3 and 4: $x = 180^\circ + 30^\circ = 210^\circ$ or $x = 360^\circ - 30^\circ = 330^\circ$` },
              { md: m`(a) $x = 210^\circ + k \cdot 360^\circ$ or $x = 330^\circ + k \cdot 360^\circ$, $k \in \mathbb{Z}$` },
              { md: m`(b) $k = -1$: $x = -150^\circ$ or $x = -30^\circ$`, why: "k = 0 gives 210° and 330°, which are outside the interval." },
            ],
          },
          {
            type: "worked",
            title: "Tan – period 180°",
            problem: m`Find the general solution of $\tan x = 2{,}5$.`,
            steps: [
              { md: m`$x = \tan^{-1}(2{,}5) = 68{,}2^\circ$` },
              { md: m`$x = 68{,}2^\circ + k \cdot 180^\circ$, $k \in \mathbb{Z}$`, why: "tan repeats every 180°, so ONE line covers both quadrants 1 and 3." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Typing $\sin^{-1}(-0{,}5)$ and using $-30^\circ$ as the reference angle. Always use the **positive** value for the reference angle and let CAST handle the sign.` },
        ],
      },
      {
        id: "harder",
        title: "Factorising & identities",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Factorise",
            problem: m`Solve for $x$ (general solution): $2\sin^2 x - \sin x = 0$`,
            steps: [
              { md: m`$\sin x(2\sin x - 1) = 0$`, why: "Common factor – never divide by sin x, you'd lose solutions." },
              { md: m`$\sin x = 0 \Rightarrow x = k \cdot 180^\circ$` },
              { md: m`$\sin x = \frac{1}{2} \Rightarrow x = 30^\circ + k \cdot 360^\circ$ or $x = 150^\circ + k \cdot 360^\circ$, $k \in \mathbb{Z}$` },
            ],
          },
          {
            type: "worked",
            title: "Use an identity",
            problem: m`Solve: $\sin x = 2\cos x$`,
            steps: [
              { md: m`$\dfrac{\sin x}{\cos x} = 2$ (dividing by $\cos x \neq 0$)` },
              { md: m`$\tan x = 2 \Rightarrow x = 63{,}4^\circ + k \cdot 180^\circ$, $k \in \mathbb{Z}$` },
            ],
          },
          {
            type: "practice",
            id: "trig-eq-practice",
            problems: [
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $2\cos x = 1$`, answer: "60; 300", kind: "set", tol: 0.06, solution: m`$\cos x = \frac{1}{2}$, reference angle $60^\circ$, cos positive in Q1 and Q4:
$$x = 60^\circ \text{ or } x = 300^\circ$$` },
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $\tan x = -1$`, answer: "135; 315", kind: "set", tol: 0.06, solution: m`Reference angle $45^\circ$, tan negative in Q2 and Q4: $x = 135^\circ$ or $x = 315^\circ$.` },
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$, to one decimal place: $3\sin x = 2$`, answer: "41.8; 138.2", kind: "set", tol: 0.06, solution: m`$\sin x = \frac{2}{3}$, reference angle $41{,}8^\circ$; sin positive in Q1 and Q2:
$$x = 41{,}8^\circ \text{ or } x = 138{,}2^\circ$$` },
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $\sin x = \cos x$`, answer: "45; 225", kind: "set", tol: 0.06, hint: "Divide both sides by cos x.", solution: m`$\tan x = 1$, so $x = 45^\circ$ or $x = 225^\circ$.` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["trig-equation"], title: "Trig equation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Reference angle from the positive value; CAST for the quadrants.", m`sin: $\alpha$ and $180^\circ - \alpha$; cos: $\pm\alpha$; tan: $\alpha$, period $180^\circ$.`, m`Add $k \cdot 360^\circ$ ($k \cdot 180^\circ$ for tan), $k \in \mathbb{Z}$.`, "Factorise – don't divide by a trig function that could be zero."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "trig-eq-quiz",
            questions: [
              { q: m`The general solution of $\cos x = \frac{1}{2}$ is…`, options: [m`$x = 60^\circ + k \cdot 180^\circ$`, m`$x = \pm 60^\circ + k \cdot 360^\circ$`, m`$x = 60^\circ + k \cdot 360^\circ$ only`, m`$x = 30^\circ + k \cdot 360^\circ$`], answer: 1, explain: "cos is positive in Q1 and Q4: ±60° plus multiples of 360°." },
              { q: m`$\sin x = -0{,}6$ has solutions in quadrants…`, options: ["1 and 2", "2 and 3", "3 and 4", "1 and 4"], answer: 2, explain: "sin is negative below the x-axis." },
              { q: m`The period used in the general solution of a tan equation is…`, options: [m`$90^\circ$`, m`$180^\circ$`, m`$360^\circ$`, m`$720^\circ$`], answer: 1, explain: "tan repeats every 180°." },
              { q: m`$\sin x = 2$ has…`, options: ["one solution", "two solutions", "no solution", "infinitely many solutions"], answer: 2, explain: m`$-1 \leq \sin x \leq 1$.` },
              { q: m`To solve $\sin^2 x = \sin x$ you should…`, options: ["divide by sin x", "factorise: sin x(sin x − 1) = 0", "square root both sides", "use tan"], answer: 1, explain: "Dividing by sin x loses the solutions where sin x = 0." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "trig-graphs",
    topic: "g11-trig",
    order: 5,
    title: "Trig graphs: amplitude, period & shifts",
    tagline: "Waves you can tune: a stretches, k squeezes, p slides, q lifts.",
    emoji: "🌊",
    caps: "CAPS Gr 11 · Trigonometry: the effects of k and p on y = sin kx, y = cos kx, y = tan kx and y = sin(x + p), y = cos(x + p), y = tan(x + p), together with a and q; sketching and interpreting graphs.",
    objectives: [
      "Describe the effect of a, k, p and q on sin, cos and tan graphs",
      "Find the period, amplitude and range",
      "Sketch trig graphs and read information from them",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Amplitude", def: m`Half the distance between the maximum and minimum values: $|a|$ for $y = a\sin x$ or $y = a\cos x$. (tan has no amplitude.)` },
      { term: "Period", def: m`The horizontal length of one full cycle: $\frac{360^\circ}{k}$ for sin and cos, $\frac{180^\circ}{k}$ for tan.` },
      { term: "Effect of p (trig)", def: m`$y = \sin(x + p)$ shifts the graph $p$ degrees LEFT (right if $p < 0$).` },
      { term: "Effect of q (trig)", def: "Shifts the graph up by q – the range moves with it." },
      { term: "Asymptotes of tan", def: m`$y = \tan x$ has vertical asymptotes at $x = 90^\circ + k \cdot 180^\circ$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Waves",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Sound waves in your earphones, the tide at Durban harbour, alternating current in your wall socket (230 V, 50 cycles per second) – all sine waves. Tuning the amplitude makes it louder; tuning the period changes the pitch.` },
          { type: "widget", widget: "trig-graph-lab", props: { fn: "sin" } },
        ],
      },
      {
        id: "effects",
        title: "a, k, p and q",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["Parameter", "In", "Effect"],
            rows: [
              [m`$a$`, m`$y = a\sin x$`, m`Amplitude $|a|$; $a < 0$ reflects in the x-axis`],
              [m`$k$`, m`$y = \sin kx$`, m`Period $\frac{360^\circ}{k}$ (tan: $\frac{180^\circ}{k}$)`],
              [m`$p$`, m`$y = \sin(x + p)$`, m`Shift $p$ left (if $p > 0$)`],
              [m`$q$`, m`$y = \sin x + q$`, m`Shift up $q$; range $[q - |a|;\ q + |a|]$`],
            ],
          },
          { type: "widget", widget: "sketch", props: { title: "f(x) = 2 sin x and g(x) = cos 2x", view: { xMin: -190, xMax: 190, yMin: -2.5, yMax: 2.5 }, xStep: 90, yStep: 1, curves: [{ expr: "2*sin(x)", label: m`f(x) = 2\sin x` }, { expr: "cos(2x)", label: m`g(x) = \cos 2x` }] } },
          {
            type: "worked",
            title: "Read the graphs",
            problem: m`For $f(x) = 2\sin x$ and $g(x) = \cos 2x$ on $[-180^\circ;\ 180^\circ]$: give the period of $g$, the range of $f$, and where $f$ is increasing.`,
            steps: [
              { md: m`Period of $g$: $\frac{360^\circ}{2} = 180^\circ$` },
              { md: m`Range of $f$: $-2 \leq y \leq 2$` },
              { md: m`$f$ increases for $-90^\circ \leq x \leq 90^\circ$`, why: "From its minimum at −90° up to its maximum at 90°." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`$y = \sin(x - 30^\circ)$ moves **right** by $30^\circ$, not left – the same trap as $(x + p)^2$ for parabolas.` },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 7,
        blocks: [
          {
            type: "practice",
            id: "trig-graph-practice",
            problems: [
              { q: m`Write down the period of $y = \cos 3x$.`, answer: "120", solution: m`$\frac{360^\circ}{3} = 120^\circ$` },
              { q: m`Write down the amplitude of $y = -3\sin x$.`, answer: "3", solution: m`Amplitude $= |{-3}| = 3$ (the minus sign only reflects the graph).` },
              { q: m`Write down the maximum value of $y = 2\cos x - 1$.`, answer: "1", solution: m`The range is $-3 \leq y \leq 1$, so the maximum is 1.` },
              { q: m`Write down the period of $y = \tan 2x$.`, answer: "90", solution: m`$\frac{180^\circ}{2} = 90^\circ$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["trig-graph-features"], title: "Trig graph drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`Amplitude $|a|$; period $\frac{360^\circ}{k}$ ($\frac{180^\circ}{k}$ for tan).`, m`$(x + p)$ shifts left; $+q$ shifts up.`, "Range of a sin/cos graph: q ± |a|.", "tan has asymptotes, no amplitude."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "trig-graph-quiz",
            questions: [
              { q: m`The period of $y = \sin\frac{1}{2}x$ is…`, options: [m`$180^\circ$`, m`$360^\circ$`, m`$720^\circ$`, m`$90^\circ$`], answer: 2, explain: m`$\frac{360^\circ}{1/2} = 720^\circ$ – it's stretched out.` },
              { q: m`The range of $y = 3\sin x + 1$ is…`, options: [m`$-3 \leq y \leq 3$`, m`$-2 \leq y \leq 4$`, m`$-1 \leq y \leq 1$`, m`$1 \leq y \leq 4$`], answer: 1, explain: m`The centre line is $y = 1$ and the amplitude is 3: $1 \pm 3$.` },
              { q: m`$y = \cos(x + 45^\circ)$ is $y = \cos x$ shifted…`, options: ["45° right", "45° left", "45 units up", "45 units down"], answer: 1, explain: "+p shifts left." },
              { q: m`$y = \tan x$ has an asymptote at…`, options: [m`$x = 0^\circ$`, m`$x = 90^\circ$`, m`$x = 180^\circ$`, m`$x = 45^\circ$`], answer: 1, explain: m`$\cos 90^\circ = 0$, so tan is undefined.` },
              { q: m`$y = -2\cos x$ has its minimum value at…`, options: [m`$x = 0^\circ$`, m`$x = 90^\circ$`, m`$x = 180^\circ$`, m`$x = 270^\circ$`], answer: 0, explain: m`At $x = 0^\circ$: $y = -2(1) = -2$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sine-cosine-area",
    topic: "g11-trig",
    order: 6,
    title: "Sine, cosine & area rules",
    tagline: "Solve ANY triangle – no right angle required.",
    emoji: "🔺",
    caps: "CAPS Gr 11 · Trigonometry: prove and apply the sine, cosine and area rules; solve problems in two dimensions.",
    objectives: [
      "Choose between the sine rule, cosine rule and area rule",
      "Find unknown sides and angles in any triangle",
      "Calculate the area of a triangle without its height",
      "Solve two-dimensional problems",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 80,
    terms: [
      { term: "Sine rule", def: m`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$ – use with a side and its OPPOSITE angle known.` },
      { term: "Cosine rule", def: m`$a^2 = b^2 + c^2 - 2bc\cos A$ – use with two sides and the included angle, or with three sides.` },
      { term: "Area rule", def: m`$\text{Area} = \tfrac{1}{2}ab\sin C$ – two sides and the angle between them.` },
      { term: "Included angle", def: "The angle formed BETWEEN two given sides." },
      { term: "Ambiguous case", def: "With the sine rule (two sides and a non-included angle), sometimes two different triangles fit the data." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Triangles without right angles",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Surveyors measuring a farm boundary, a hiker working out how far apart two peaks in the Drakensberg are, cellphone towers triangulating your position – none of these triangles have a right angle. The sine, cosine and area rules solve **any** triangle.` },
          { type: "widget", widget: "triangle-solver", props: { mode: "sine-side" } },
        ],
      },
      {
        id: "rules",
        title: "Which rule when?",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["You know…", "You want…", "Use"],
            rows: [
              ["two angles and any side", "another side", "sine rule"],
              ["two sides and a non-included angle", "an angle", "sine rule"],
              ["two sides and the included angle", "the third side", "cosine rule"],
              ["three sides", "an angle", "cosine rule"],
              ["two sides and the included angle", "the area", "area rule"],
            ],
          },
          { type: "callout", variant: "memory", md: m`**Sine rule = pairs.** If you can see a side AND its opposite angle (a full "pair"), the sine rule works. No complete pair? Use the cosine rule.` },
          {
            type: "worked",
            title: "Three rules, one triangle",
            problem: m`From a harbour $H$, buoy $A$ is 12 km away and buoy $B$ is 15 km away, with $A\hat{H}B = 72^\circ$. Find (a) $AB$ (b) the area of $\triangle AHB$ (c) $H\hat{A}B$.`,
            steps: [
              { md: m`(a) $AB^2 = 12^2 + 15^2 - 2(12)(15)\cos 72^\circ \Rightarrow AB = 16{,}05$ km`, why: "Two sides and the included angle → cosine rule." },
              { md: m`(b) Area $= \tfrac{1}{2}(12)(15)\sin 72^\circ = 85{,}60$ km²` },
              { md: m`(c) $\dfrac{\sin H\hat{A}B}{15} = \dfrac{\sin 72^\circ}{16{,}05} \Rightarrow H\hat{A}B = 62{,}7^\circ$`, why: "Now we have a pair (AB and the 72° angle) → sine rule. HB = 15 is opposite Â. Use the unrounded AB from your calculator." },
            ],
          },
          { type: "widget", widget: "triangle-solver", props: { mode: "cos-side" } },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "triangle-rules-practice",
            problems: [
              { q: m`Calculate the area of a triangle with sides 8 cm and 11 cm and an included angle of $40^\circ$ (two decimals).`, answer: "28.28", tol: 0.011, solution: m`$$\tfrac{1}{2}(8)(11)\sin 40^\circ = 28{,}28 \text{ cm}^2$$` },
              { q: m`In $\triangle ABC$, $b = 7$, $c = 9$ and $\hat{A} = 60^\circ$. Calculate $a$ (two decimals).`, answer: "8.19", tol: 0.011, solution: m`$$a^2 = 49 + 81 - 2(7)(9)\cos 60^\circ = 67 \Rightarrow a = 8{,}19$$` },
              { q: m`In $\triangle ABC$, $\hat{A} = 40^\circ$, $\hat{B} = 75^\circ$ and $a = 10$. Calculate $b$ (two decimals).`, answer: "15.03", tol: 0.011, solution: m`$$\frac{b}{\sin 75^\circ} = \frac{10}{\sin 40^\circ} \Rightarrow b = 15{,}03$$` },
              { q: m`A triangle has sides 5, 7 and 8. Calculate the angle opposite the side of length 5 (one decimal).`, answer: "38.2", tol: 0.06, solution: m`$$\cos\theta = \frac{7^2 + 8^2 - 5^2}{2(7)(8)} = \frac{88}{112} \Rightarrow \theta = 38{,}2^\circ$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["triangle-rules"], title: "Triangle rules drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["A side–angle pair → sine rule.", "Two sides + included angle, or three sides → cosine rule.", m`Area $= \frac{1}{2}ab\sin C$ (included angle).`, "Keep unrounded values in the calculator between steps."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "triangle-rules-quiz",
            questions: [
              { q: "You know all three sides. To find an angle, use…", options: ["the sine rule", "the cosine rule", "the area rule", "Pythagoras"], answer: 1, explain: "No angle is known, so there's no side–angle pair for the sine rule." },
              { q: m`The area of a triangle with sides 6 and 10 and included angle $30^\circ$ is…`, options: ["30", "15", "60", "25,98"], answer: 1, explain: m`$\frac{1}{2}(6)(10)\sin 30^\circ = 15$.` },
              { q: m`If $\hat{A} = 90^\circ$, the cosine rule $a^2 = b^2 + c^2 - 2bc\cos A$ becomes…`, options: ["the sine rule", "Pythagoras' theorem", "the area rule", "undefined"], answer: 1, explain: m`$\cos 90^\circ = 0$, so $a^2 = b^2 + c^2$.` },
              { q: "Which needs the included angle?", options: ["sine rule", "cosine rule (to find a side) and the area rule", "only the area rule", "none of them"], answer: 1, explain: "Both use the angle between the two known sides." },
            ],
          },
          { type: "exam", question: { id: "triangle-rules-exam", q: m`In $\triangle PQR$, $PQ = 8$ m, $PR = 11$ m and $\hat{P} = 50^\circ$. Calculate (a) $QR$ and (b) the area of $\triangle PQR$.`, marks: 5, level: "routine", memo: [m`$QR^2 = 8^2 + 11^2 - 2(8)(11)\cos 50^\circ$`, m`$QR^2 = 71{,}87$`, m`$QR = 8{,}48$ m`, m`Area $= \tfrac{1}{2}(8)(11)\sin 50^\circ$`, m`$= 33{,}71$ m²`] } },
        ],
      },
    ],
  },
];
