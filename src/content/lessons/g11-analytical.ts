import type { Lesson } from "../types";

const m = String.raw;

export const ANALYTICAL: Lesson[] = [
  {
    slug: "lines-toolkit",
    topic: "g11-analytical",
    order: 1,
    title: "Distance, midpoint & gradient",
    tagline: "The three formulas that power every analytical geometry question.",
    emoji: "📍",
    caps: "CAPS Gr 11 · Analytical geometry: use the distance, midpoint and gradient formulas; collinear points; find unknown coordinates.",
    objectives: [
      "Calculate the distance between two points",
      "Find the midpoint of a line segment – and work backwards from it",
      "Calculate gradients and use them to test for collinear points",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Distance formula", def: m`$AB = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ – it's Pythagoras on the Cartesian plane.` },
      { term: "Midpoint formula", def: m`$M\left(\dfrac{x_1 + x_2}{2};\ \dfrac{y_1 + y_2}{2}\right)$ – the average of the x's and the average of the y's.` },
      { term: "Gradient", def: m`$m = \dfrac{y_2 - y_1}{x_2 - x_1}$ – the change in y for every 1 unit change in x.` },
      { term: "Collinear", def: "Points that lie on the same straight line: the gradient between any two pairs is equal." },
      { term: "Horizontal line", def: m`Gradient $m = 0$; equation $y = k$.` },
      { term: "Vertical line", def: m`Gradient undefined (you'd divide by 0); equation $x = k$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Maths with a map",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`On a delivery app's map grid (in km), your house is at $(1;\ 2)$ and the mall is at $(7;\ 10)$. As the crow flies:

$$\sqrt{(7 - 1)^2 + (10 - 2)^2} = \sqrt{36 + 64} = 10 \text{ km}$$

That's the **distance formula** – Pythagoras with coordinates. Analytical geometry is just geometry you can calculate.` },
          { type: "widget", widget: "coordinate-lab" },
        ],
      },
      {
        id: "formulas",
        title: "The three formulas",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["What", "Formula", "Think of it as"],
            rows: [
              ["Distance", m`$\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`, "Pythagoras: horizontal gap² + vertical gap²"],
              ["Midpoint", m`$\left(\frac{x_1 + x_2}{2};\ \frac{y_1 + y_2}{2}\right)$`, "Averages"],
              ["Gradient", m`$\dfrac{y_2 - y_1}{x_2 - x_1}$`, "Rise over run"],
            ],
          },
          {
            type: "worked",
            title: "All three at once",
            problem: m`For $A(-2;\ 3)$ and $B(4;\ -5)$, find $AB$, the midpoint $M$ and the gradient of $AB$.`,
            steps: [
              { md: m`$AB = \sqrt{(4 - (-2))^2 + (-5 - 3)^2} = \sqrt{36 + 64} = 10$`, why: "Brackets around negatives – that's where most marks are lost." },
              { md: m`$M\left(\frac{-2 + 4}{2};\ \frac{3 + (-5)}{2}\right) = M(1;\ -1)$` },
              { md: m`$m_{AB} = \dfrac{-5 - 3}{4 - (-2)} = \dfrac{-8}{6} = -\dfrac{4}{3}$`, why: "Keep the same order on top and bottom: B minus A, and B minus A." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Mixing the order: $\frac{y_2 - y_1}{x_1 - x_2}$ gives the wrong SIGN. Whatever point you start with on top, start with on the bottom too.` },
        ],
      },
      {
        id: "backwards",
        title: "Working backwards & collinear points",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Find the missing point",
            problem: m`$M(2;\ 1)$ is the midpoint of $A(-1;\ 4)$ and $B(x;\ y)$. Find $B$.`,
            steps: [
              { md: m`$\dfrac{-1 + x}{2} = 2 \Rightarrow x = 5$` },
              { md: m`$\dfrac{4 + y}{2} = 1 \Rightarrow y = -2$` },
              { md: m`$B(5;\ -2)$` },
            ],
          },
          {
            type: "worked",
            title: "A distance with an unknown",
            problem: m`$A(1;\ 2)$ and $B(4;\ y)$ are 5 units apart. Find $y$.`,
            steps: [
              { md: m`$(4 - 1)^2 + (y - 2)^2 = 25$`, why: "Square both sides of the distance formula to get rid of the root." },
              { md: m`$(y - 2)^2 = 16 \Rightarrow y - 2 = \pm 4$` },
              { md: m`$y = 6$ or $y = -2$`, why: "Two answers – one above A's level and one below. Both are valid." },
            ],
          },
          { type: "text", md: m`**Collinear** points lie on one straight line. To prove $A$, $B$ and $C$ are collinear, show $m_{AB} = m_{BC}$ (they share point $B$, so equal gradients means the same line).` },
          {
            type: "practice",
            id: "lines-toolkit-practice",
            problems: [
              { q: m`Calculate the distance between $A(-3;\ 1)$ and $B(3;\ 9)$.`, answer: "10", solution: m`$$\sqrt{6^2 + 8^2} = \sqrt{100} = 10$$` },
              { q: m`Find the midpoint of $P(-4;\ 7)$ and $Q(2;\ -3)$.`, answer: "(-1; 2)", kind: "point", solution: m`$$\left(\frac{-4 + 2}{2};\ \frac{7 - 3}{2}\right) = (-1;\ 2)$$` },
              { q: m`Calculate the gradient of the line through $(2;\ -1)$ and $(5;\ 8)$.`, answer: "3", solution: m`$$m = \frac{8 - (-1)}{5 - 2} = \frac{9}{3} = 3$$` },
              { q: m`$A(1;\ 2)$, $B(3;\ 6)$ and $C(5;\ k)$ are collinear. Find $k$.`, answer: "10", hint: m`Set $m_{BC} = m_{AB}$.`, solution: m`$$m_{AB} = \frac{6 - 2}{3 - 1} = 2 \qquad m_{BC} = \frac{k - 6}{5 - 3} = 2 \Rightarrow k = 10$$` },
              { q: m`Find the length of $AB$ for $A(-1;\ -2)$ and $B(3;\ 2)$ in simplest surd form.`, answer: "4sqrt(2)", form: "simplified-surd", solution: m`$$\sqrt{4^2 + 4^2} = \sqrt{32} = 4\sqrt{2}$$` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Endless practice & quick check",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["distance-midpoint", "gradient-inclination"], title: "Coordinate drill" } },
          { type: "keypoints", points: ["Distance = Pythagoras; midpoint = averages; gradient = rise over run.", "Use brackets around negative coordinates.", "Collinear: equal gradients through a shared point.", "Squaring an unknown distance usually gives two answers."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "lines-toolkit-quiz",
            questions: [
              { q: m`The gradient of the line through $(1;\ 4)$ and $(3;\ 4)$ is…`, options: ["undefined", "0", "1", "4"], answer: 1, explain: "The y-values are equal, so the line is horizontal: m = 0/2 = 0." },
              { q: m`The midpoint of $(-6;\ 2)$ and $(4;\ 8)$ is…`, options: [m`$(-1;\ 5)$`, m`$(-5;\ 3)$`, m`$(1;\ 5)$`, m`$(-1;\ 3)$`], answer: 0, explain: m`$\left(\frac{-6 + 4}{2};\ \frac{2 + 8}{2}\right) = (-1;\ 5)$.` },
              { q: m`The distance between $(0;\ 0)$ and $(5;\ 12)$ is…`, options: ["17", "13", "169", "7"], answer: 1, explain: m`$\sqrt{25 + 144} = \sqrt{169} = 13$.` },
              { q: m`A line through $(2;\ 1)$ and $(2;\ 7)$ is…`, options: [m`horizontal, $y = 2$`, m`vertical, $x = 2$`, m`$y = 2x$`, "has gradient 6"], answer: 1, explain: "The x-values are equal: a vertical line with undefined gradient." },
              { q: "To prove A, B and C are collinear, show that…", options: [m`$AB = BC$`, m`$m_{AB} = m_{BC}$`, m`$m_{AB} \times m_{BC} = -1$`, "B is the midpoint"], answer: 1, explain: "Equal gradients through the shared point B means one straight line." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "line-equations",
    topic: "g11-analytical",
    order: 2,
    title: "Equations of lines & inclination",
    tagline: "y = mx + c, the angle a line makes – and the angle between two lines.",
    emoji: "📐",
    caps: "CAPS Gr 11 · Analytical geometry: the equation of a line through two points, or through a point with a given gradient; inclination of a line (m = tan θ).",
    objectives: [
      "Find the equation of a line from two points or a point and a gradient",
      "Use m = tan θ to find the inclination of a line",
      "Find the angle between two lines",
    ],
    styles: ["visual", "read-write"],
    xp: 60,
    terms: [
      { term: "Gradient–intercept form", def: m`$y = mx + c$: $m$ is the gradient, $c$ the y-intercept.` },
      { term: "Point–gradient form", def: m`$y - y_1 = m(x - x_1)$ – the quickest way to the equation when you know a point and the gradient.` },
      { term: "Inclination (θ)", def: m`The angle a line makes with the positive x-axis, measured anticlockwise: $0^\circ \leq \theta < 180^\circ$.` },
      { term: "m = tan θ", def: m`The gradient of a line equals the tangent of its angle of inclination.` },
      { term: "Obtuse inclination", def: m`If $m < 0$, $\theta$ is obtuse: $\theta = 180^\circ + \tan^{-1}(m)$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "How steep is that ramp?",
        minutes: 3,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Building regulations say a wheelchair ramp may rise at most 1 m for every 12 m: gradient $\frac{1}{12}$. Its angle is $\tan^{-1}\left(\frac{1}{12}\right) \approx 4{,}8^\circ$ – much gentler than it looks on paper. **Gradient and angle are two ways of saying the same thing: $m = \tan\theta$.**` },
        ],
      },
      {
        id: "equations",
        title: "Finding the equation",
        minutes: 7,
        blocks: [
          { type: "text", md: m`You need **a gradient and a point**. Then either substitute into $y = mx + c$ to find $c$, or use

$$y - y_1 = m(x - x_1)$$` },
          {
            type: "worked",
            title: "Through two points",
            problem: m`Find the equation of the line through $A(1;\ 3)$ and $B(4;\ 9)$.`,
            steps: [
              { md: m`$m = \dfrac{9 - 3}{4 - 1} = 2$` },
              { md: m`$y - 3 = 2(x - 1)$`, why: "Use either point – you'll get the same line." },
              { md: m`$y = 2x + 1$` },
            ],
          },
          {
            type: "practice",
            id: "line-eq-practice",
            problems: [
              { q: m`Find the equation of the line with gradient 3 through $(2;\ 5)$.`, answer: "3x - 1", kind: "expr", solution: m`$$y - 5 = 3(x - 2) \Rightarrow y = 3x - 1$$` },
              { q: m`Find the equation of the line through $(-2;\ 1)$ and $(2;\ 9)$.`, answer: "2x + 5", kind: "expr", solution: m`$$m = \frac{9 - 1}{2 + 2} = 2 \qquad y - 1 = 2(x + 2) \Rightarrow y = 2x + 5$$` },
              { q: m`Find the equation of the horizontal line through $(3;\ -4)$. (Type the right-hand side, e.g. $y = \dots$)`, answer: "-4", kind: "expr", solution: m`A horizontal line has $m = 0$: $y = -4$.` },
            ],
          },
        ],
      },
      {
        id: "inclination",
        title: "Inclination: m = tan θ",
        minutes: 8,
        blocks: [
          { type: "text", md: m`The **inclination** $\theta$ is the angle from the positive x-axis to the line, anticlockwise. Since gradient is "rise over run", and $\tan\theta = \frac{\text{opposite}}{\text{adjacent}}$:

$$m = \tan\theta$$

If $m < 0$ the line falls to the right and $\theta$ is **obtuse** – your calculator gives a negative angle, so add $180^\circ$.` },
          {
            type: "worked",
            title: "A negative gradient",
            problem: m`Find the inclination of the line through $(-1;\ 4)$ and $(3;\ -2)$.`,
            steps: [
              { md: m`$m = \dfrac{-2 - 4}{3 + 1} = -\dfrac{3}{2}$` },
              { md: m`$\tan\theta = -\dfrac{3}{2}$; the calculator gives $\tan^{-1}(-1{,}5) = -56{,}3^\circ$` },
              { md: m`$\theta = 180^\circ - 56{,}3^\circ = 123{,}7^\circ$`, why: "Inclination is always between 0° and 180°." },
            ],
          },
          {
            type: "worked",
            title: "The angle between two lines",
            problem: m`Line 1 has $m = 2$ and line 2 has $m = -1$. Find the acute angle between them.`,
            steps: [
              { md: m`$\theta_1 = \tan^{-1}(2) = 63{,}43^\circ$` },
              { md: m`$\theta_2 = 180^\circ + \tan^{-1}(-1) = 135^\circ$` },
              { md: m`Angle between $= 135^\circ - 63{,}43^\circ = 71{,}57^\circ$`, why: "The exterior angle of the triangle formed with the x-axis equals the sum of the interior opposite angles." },
            ],
          },
          {
            type: "practice",
            id: "inclination-practice",
            problems: [
              { q: m`Find the inclination of $y = -x + 4$.`, answer: "135", solution: m`$\tan\theta = -1 \Rightarrow \theta = 180^\circ - 45^\circ = 135^\circ$` },
              { q: m`A line has gradient $0{,}75$. Find its inclination, correct to one decimal place.`, answer: "36.9", tol: 0.06, solution: m`$$\theta = \tan^{-1}(0{,}75) = 36{,}9^\circ$$` },
              { q: m`A line has an inclination of $60^\circ$. Determine its gradient exactly.`, answer: "sqrt(3)", solution: m`$m = \tan 60^\circ = \sqrt{3}$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["line-equation", "gradient-inclination"], title: "Lines drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`Gradient + point → $y - y_1 = m(x - x_1)$.`, m`$m = \tan\theta$, with $0^\circ \leq \theta < 180^\circ$.`, m`$m < 0$: $\theta = 180^\circ + \tan^{-1}(m)$.`, "Angle between lines: subtract their inclinations."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "line-eq-quiz",
            questions: [
              { q: m`The inclination of a line with $m = 1$ is…`, options: [m`$1^\circ$`, m`$45^\circ$`, m`$90^\circ$`, m`$135^\circ$`], answer: 1, explain: m`$\tan\theta = 1 \Rightarrow \theta = 45^\circ$.` },
              { q: m`A line with inclination $120^\circ$ has gradient…`, options: [m`$\sqrt{3}$`, m`$-\sqrt{3}$`, m`$-\frac{1}{2}$`, m`$\frac{\sqrt{3}}{3}$`], answer: 1, explain: m`$\tan 120^\circ = -\tan 60^\circ = -\sqrt{3}$.` },
              { q: m`The line through $(0;\ -2)$ with gradient 4 is…`, options: [m`$y = -2x + 4$`, m`$y = 4x - 2$`, m`$y = 4x + 2$`, m`$y - 2 = 4x$`], answer: 1, explain: "c = −2 (the y-intercept), m = 4." },
              { q: m`$\tan^{-1}(-0{,}5)$ on a calculator gives $-26{,}6^\circ$. The inclination is…`, options: [m`$-26{,}6^\circ$`, m`$26{,}6^\circ$`, m`$153{,}4^\circ$`, m`$206{,}6^\circ$`], answer: 2, explain: m`Add $180^\circ$: $180^\circ - 26{,}6^\circ = 153{,}4^\circ$.` },
              { q: "A vertical line has inclination…", options: [m`$0^\circ$`, m`$90^\circ$`, m`$180^\circ$`, "undefined"], answer: 1, explain: "It's perpendicular to the x-axis: 90°. (Its gradient is undefined, since tan 90° is undefined.)" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "parallel-perpendicular",
    topic: "g11-analytical",
    order: 3,
    title: "Parallel & perpendicular lines",
    tagline: "Equal gradients, negative reciprocals – and proving right angles.",
    emoji: "➕",
    caps: "CAPS Gr 11 · Analytical geometry: parallel lines (m₁ = m₂) and perpendicular lines (m₁ × m₂ = −1); equations of parallel and perpendicular lines, perpendicular bisectors.",
    objectives: [
      "Use m₁ = m₂ for parallel lines and m₁ × m₂ = −1 for perpendicular lines",
      "Find the equation of a parallel or perpendicular line",
      "Find the perpendicular bisector of a line segment",
      "Prove that a triangle is right-angled",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Parallel lines", def: m`Lines with equal gradients: $m_1 = m_2$.` },
      { term: "Perpendicular lines", def: m`Lines that meet at 90°: $m_1 \times m_2 = -1$.` },
      { term: "Negative reciprocal", def: m`Flip the fraction and change the sign: the perpendicular to $m = \frac{2}{3}$ has $m = -\frac{3}{2}$.` },
      { term: "Perpendicular bisector", def: "The line through the midpoint of a segment, perpendicular to it. Every point on it is equally far from both ends." },
      { term: "Standard form of a line", def: m`$ax + by + c = 0$ – rewrite it as $y = mx + c$ before reading the gradient.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Grid streets",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Look at a map of a planned suburb like Umhlanga Ridge or a CBD grid: streets run **parallel** to each other and cross **perpendicular** ones. Town planners, architects and game-level designers use exactly these two gradient rules.` },
          { type: "text", md: m`- **Parallel:** same steepness, so $m_1 = m_2$.
- **Perpendicular:** $m_1 \times m_2 = -1$, i.e. $m_2 = -\dfrac{1}{m_1}$ (negative reciprocal).

Drag the points below and switch between parallel and perpendicular.` },
          { type: "widget", widget: "coordinate-lab" },
        ],
      },
      {
        id: "equations",
        title: "Parallel & perpendicular equations",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "A perpendicular line",
            problem: m`Find the equation of the line perpendicular to $y = 2x - 3$ that passes through $(4;\ 1)$.`,
            steps: [
              { md: m`$m_\perp = -\dfrac{1}{2}$`, why: "Negative reciprocal of 2." },
              { md: m`$y - 1 = -\dfrac{1}{2}(x - 4)$` },
              { md: m`$y = -\dfrac{1}{2}x + 3$` },
            ],
          },
          {
            type: "worked",
            title: "Perpendicular bisector",
            problem: m`Find the perpendicular bisector of $AB$ with $A(-2;\ 1)$ and $B(4;\ 5)$.`,
            steps: [
              { md: m`Midpoint: $M(1;\ 3)$` },
              { md: m`$m_{AB} = \dfrac{5 - 1}{4 + 2} = \dfrac{2}{3}$, so $m_\perp = -\dfrac{3}{2}$` },
              { md: m`$y - 3 = -\dfrac{3}{2}(x - 1) \Rightarrow y = -\dfrac{3}{2}x + \dfrac{9}{2}$` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Reading the gradient from $2y - 4x = 7$ as $-4$. Make $y$ the subject first: $y = 2x + \frac{7}{2}$, so $m = 2$.` },
          {
            type: "practice",
            id: "perp-practice",
            problems: [
              { q: m`Find the equation of the line perpendicular to $y = 3x + 1$ through $(3;\ 2)$.`, answer: "-x/3 + 3", kind: "expr", solution: m`$$m_\perp = -\frac{1}{3} \qquad y - 2 = -\frac{1}{3}(x - 3) \Rightarrow y = -\frac{1}{3}x + 3$$` },
              { q: m`Find the equation of the line parallel to $2y - 4x = 7$ through $(1;\ -1)$.`, answer: "2x - 3", kind: "expr", hint: "Make y the subject first to read off m.", solution: m`$y = 2x + \frac{7}{2}$, so $m = 2$.
$$y + 1 = 2(x - 1) \Rightarrow y = 2x - 3$$` },
              { q: m`The line through $(1;\ k)$ and $(3;\ 5)$ is perpendicular to $y = -2x + 1$. Find $k$.`, answer: "4", solution: m`The required gradient is $\frac{1}{2}$:
$$\frac{5 - k}{3 - 1} = \frac{1}{2} \Rightarrow 5 - k = 1 \Rightarrow k = 4$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["perp-parallel"], title: "Parallel & perpendicular drill" } },
        ],
      },
      {
        id: "proofs",
        title: "Proving shapes",
        minutes: 6,
        blocks: [
          {
            type: "worked",
            title: "Is it right-angled?",
            problem: m`Prove that $\triangle ABC$ with $A(1;\ 1)$, $B(4;\ 5)$ and $C(8;\ 2)$ is right-angled at $B$.`,
            steps: [
              { md: m`$m_{AB} = \dfrac{5 - 1}{4 - 1} = \dfrac{4}{3}$` },
              { md: m`$m_{BC} = \dfrac{2 - 5}{8 - 4} = -\dfrac{3}{4}$` },
              { md: m`$m_{AB} \times m_{BC} = \dfrac{4}{3} \times -\dfrac{3}{4} = -1$, so $AB \perp BC$ and $\hat{B} = 90^\circ$.`, why: "Always finish with the conclusion in words – it's a mark." },
            ],
          },
          { type: "callout", variant: "exam", md: m`Shape proofs with coordinates:
- **Parallelogram:** both pairs of opposite sides parallel (equal gradients) – or diagonals bisect each other (same midpoint).
- **Rectangle:** parallelogram + one right angle.
- **Rhombus:** parallelogram + diagonals perpendicular (or adjacent sides equal).
- **Square:** rhombus + a right angle.` },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`Parallel: $m_1 = m_2$. Perpendicular: $m_1 m_2 = -1$.`, "Negative reciprocal: flip and change the sign.", "Perpendicular bisector: midpoint + perpendicular gradient.", "Make y the subject before reading m."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "perp-quiz",
            questions: [
              { q: m`A line perpendicular to one with gradient $-\frac{2}{5}$ has gradient…`, options: [m`$\frac{2}{5}$`, m`$-\frac{5}{2}$`, m`$\frac{5}{2}$`, m`$-\frac{2}{5}$`], answer: 2, explain: m`Negative reciprocal: $-\frac{1}{-2/5} = \frac{5}{2}$.` },
              { q: m`Which line is parallel to $y = 3x - 7$?`, options: [m`$y = -3x + 1$`, m`$y = \frac{1}{3}x$`, m`$6x - 2y = 5$`, m`$3y = x$`], answer: 2, explain: m`$6x - 2y = 5 \Rightarrow y = 3x - \frac{5}{2}$: gradient 3.` },
              { q: m`If $m_{AB} \times m_{BC} = -1$ then…`, options: ["AB ∥ BC", m`$\hat{B} = 90^\circ$`, "A, B and C are collinear", "AB = BC"], answer: 1, explain: "Perpendicular lines meet at a right angle at their shared point B." },
              { q: "The perpendicular bisector of AB passes through…", options: ["A", "the midpoint of AB", "the origin", "B"], answer: 1, explain: "Bisector = cuts it in half, so it goes through the midpoint." },
              { q: m`The diagonals of a quadrilateral have the same midpoint. It must be a…`, options: ["square", "parallelogram", "rhombus", "kite"], answer: 1, explain: "Diagonals that bisect each other prove a parallelogram (more is needed for a rhombus or square)." },
            ],
          },
        ],
      },
    ],
  },
];
