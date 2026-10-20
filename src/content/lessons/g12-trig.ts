import type { Lesson } from "../types";

const m = String.raw;

export const G12_TRIG: Lesson[] = [
  {
    slug: "compound-angles",
    topic: "g12-trig",
    order: 1,
    title: "Compound angles",
    tagline: "sin(α + β) is NOT sin α + sin β – here's what it really is.",
    emoji: "🔀",
    caps: "CAPS Gr 12 · Trigonometry: compound angle identities cos(α ± β) and sin(α ± β); derivation of cos(α − β) using the distance formula; exact values using compound angles.",
    objectives: [
      "Know the four compound angle formulae",
      "Derive cos(α − β) (examinable)",
      "Find exact values like sin 75° without a calculator",
      "Recognise an expansion and write it as one trig ratio",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "sin(α + β)", def: m`$\sin\alpha\cos\beta + \cos\alpha\sin\beta$` },
      { term: "sin(α − β)", def: m`$\sin\alpha\cos\beta - \cos\alpha\sin\beta$` },
      { term: "cos(α + β)", def: m`$\cos\alpha\cos\beta - \sin\alpha\sin\beta$` },
      { term: "cos(α − β)", def: m`$\cos\alpha\cos\beta + \sin\alpha\sin\beta$` },
      { term: "Compound angle", def: m`An angle made from two angles, like $\alpha + \beta$ or $45^\circ - 30^\circ$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "The trap",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Is $\sin(30^\circ + 60^\circ) = \sin 30^\circ + \sin 60^\circ$? The left side is $\sin 90^\circ = 1$. The right side is $\frac{1}{2} + \frac{\sqrt{3}}{2} \approx 1{,}37$. Not even close! Sine doesn't "distribute" over a sum. Test it yourself below.` },
          { type: "widget", widget: "compound-lab", props: { op: "sin+" } },
          { type: "callout", variant: "exam", md: m`Grade 12 trigonometry (compound and double angles, identities, equations and 2D/3D problems) is worth about 40–50 marks of Paper 2. The derivation of $\cos(\alpha - \beta)$ is examinable.` },
        ],
      },
      {
        id: "formulas",
        title: "The four formulae",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["Expand", "Into"],
            rows: [[m`$\sin(\alpha + \beta)$`, m`$\sin\alpha\cos\beta + \cos\alpha\sin\beta$`], [m`$\sin(\alpha - \beta)$`, m`$\sin\alpha\cos\beta - \cos\alpha\sin\beta$`], [m`$\cos(\alpha + \beta)$`, m`$\cos\alpha\cos\beta - \sin\alpha\sin\beta$`], [m`$\cos(\alpha - \beta)$`, m`$\cos\alpha\cos\beta + \sin\alpha\sin\beta$`]],
            caption: "These are on the formula sheet – but you must recognise them in reverse too.",
          },
          { type: "callout", variant: "memory", md: m`**sin** keeps the sign and **mixes** (sin cos, cos sin). **cos** **changes** the sign and **keeps the same** together (cos cos, sin sin).` },
          {
            type: "match",
            id: "compound-match",
            title: "Match the expansion to the compound angle",
            pairs: [
              { left: m`$\sin 50^\circ\cos 10^\circ + \cos 50^\circ\sin 10^\circ$`, right: m`$\sin 60^\circ$` },
              { left: m`$\cos 50^\circ\cos 10^\circ + \sin 50^\circ\sin 10^\circ$`, right: m`$\cos 40^\circ$` },
              { left: m`$\cos 50^\circ\cos 10^\circ - \sin 50^\circ\sin 10^\circ$`, right: m`$\cos 60^\circ$` },
              { left: m`$\sin 50^\circ\cos 10^\circ - \cos 50^\circ\sin 10^\circ$`, right: m`$\sin 40^\circ$` },
            ],
          },
        ],
      },
      {
        id: "proof",
        title: "Deriving cos(α − β)",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "figure", props: { points: { O: [0, 0], P: [Math.cos(1.8), Math.sin(1.8)], Q: [Math.cos(0.6), Math.sin(0.6)] }, circles: [{ centre: "O", r: 1 }], segments: [["O", "P"], ["O", "Q"], { from: "P", to: "Q", colour: "var(--curve-2)" }], angles: [{ at: "O", from: "Q", to: "P", label: "α − β" }], caption: "P(cos α; sin α) and Q(cos β; sin β) on the unit circle." } },
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`Prove that $\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$.`,
            steps: [
              { md: m`Let $P(\cos\alpha;\ \sin\alpha)$ and $Q(\cos\beta;\ \sin\beta)$ be points on the unit circle, so $P\hat{O}Q = \alpha - \beta$.`, why: "Any point on a circle of radius 1 is (cos θ; sin θ)." },
              { md: m`Distance formula: $PQ^2 = (\cos\alpha - \cos\beta)^2 + (\sin\alpha - \sin\beta)^2$` },
              { md: m`$= \cos^2\alpha + \sin^2\alpha + \cos^2\beta + \sin^2\beta - 2\cos\alpha\cos\beta - 2\sin\alpha\sin\beta$` },
              { md: m`$= 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta)$`, why: m`$\sin^2 + \cos^2 = 1$, twice.` },
              { md: m`Cosine rule in $\triangle POQ$: $PQ^2 = 1^2 + 1^2 - 2(1)(1)\cos(\alpha - \beta) = 2 - 2\cos(\alpha - \beta)$` },
              { md: m`Equate: $\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$` },
            ],
          },
          { type: "callout", variant: "tip", title: "The other three", md: m`Replace $\beta$ by $-\beta$: $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$. Use $\sin\theta = \cos(90^\circ - \theta)$: $\sin(\alpha + \beta) = \cos\big((90^\circ - \alpha) - \beta\big) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$.` },
        ],
      },
      {
        id: "exact",
        title: "Exact values",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "sin 75° without a calculator",
            problem: m`Determine the exact value of $\sin 75^\circ$.`,
            steps: [
              { md: m`$\sin 75^\circ = \sin(45^\circ + 30^\circ)$`, why: "Split into special angles." },
              { md: m`$= \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ$` },
              { md: m`$= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}$` },
            ],
          },
          {
            type: "practice",
            id: "compound-practice",
            problems: [
              { q: m`Simplify without a calculator: $\cos 80^\circ\cos 20^\circ + \sin 80^\circ\sin 20^\circ$`, answer: "1/2", solution: m`$$= \cos(80^\circ - 20^\circ) = \cos 60^\circ = \tfrac{1}{2}$$` },
              { q: m`Simplify without a calculator: $\sin 25^\circ\cos 35^\circ + \cos 25^\circ\sin 35^\circ$`, answer: "sqrt(3)/2", solution: m`$$= \sin(25^\circ + 35^\circ) = \sin 60^\circ = \tfrac{\sqrt{3}}{2}$$` },
              { q: m`Determine the exact value of $\cos 15^\circ$.`, answer: "(sqrt(6) + sqrt(2))/4", hint: "15° = 45° − 30°", solution: m`$$\cos(45^\circ - 30^\circ) = \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}$$` },
              { q: m`Expand $\cos(x + 60^\circ)$ fully (exact values).`, answer: "cos(x)/2 - sqrt(3)/2*sin(x)", kind: "expr", solution: m`$$\cos x\cos 60^\circ - \sin x\sin 60^\circ = \tfrac{1}{2}\cos x - \tfrac{\sqrt{3}}{2}\sin x$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["compound-exact"], title: "Compound angle drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["sin(α ± β) = sin α cos β ± cos α sin β.", "cos(α ± β) = cos α cos β ∓ sin α sin β.", "Spot expansions in reverse and collapse them.", "cos(α − β) is derived with the distance formula + cosine rule."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "compound-quiz",
            questions: [
              { q: m`$\cos(\alpha + \beta) = $`, options: [m`$\cos\alpha + \cos\beta$`, m`$\cos\alpha\cos\beta + \sin\alpha\sin\beta$`, m`$\cos\alpha\cos\beta - \sin\alpha\sin\beta$`, m`$\sin\alpha\cos\beta + \cos\alpha\sin\beta$`], answer: 2, explain: "cos changes the sign." },
              { q: m`$\sin 40^\circ\cos 20^\circ + \cos 40^\circ\sin 20^\circ = $`, options: [m`$\sin 20^\circ$`, m`$\sin 60^\circ$`, m`$\cos 60^\circ$`, m`$\sin 800^\circ$`], answer: 1, explain: m`$\sin(40^\circ + 20^\circ)$.` },
              { q: m`$105^\circ$ can be written as…`, options: [m`$60^\circ + 45^\circ$`, m`$90^\circ + 30^\circ$`, m`$45^\circ + 45^\circ$`, m`$120^\circ - 30^\circ$`], answer: 0, explain: m`$60 + 45 = 105$ – both special angles.` },
              { q: m`The proof of $\cos(\alpha - \beta)$ uses…`, options: ["the sine rule and area rule", "the distance formula and the cosine rule", "similar triangles", "the tan-chord theorem"], answer: 1, explain: m`Two expressions for $PQ^2$, set equal.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "double-angles",
    topic: "g12-trig",
    order: 2,
    title: "Double angles & identities",
    tagline: "Set β = α and the compound formulae hand you three versions of cos 2α.",
    emoji: "✌️",
    caps: "CAPS Gr 12 · Trigonometry: double angle identities sin 2α, cos 2α (three forms); proving identities; evaluating without a calculator from a sketch; expressing ratios in terms of a given ratio (e.g. if sin 22° = p).",
    objectives: [
      "Derive and use sin 2α and the three forms of cos 2α",
      "Calculate double-angle ratios from a sketch",
      "Prove identities and state where they are undefined",
      "Express ratios in terms of p when sin x = p",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "sin 2α", def: m`$2\sin\alpha\cos\alpha$` },
      { term: "cos 2α", def: m`$\cos^2\alpha - \sin^2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha$` },
      { term: "Choosing a cos 2α form", def: m`Use $1 - 2\sin^2\alpha$ when you want to get rid of a $1$ with $\sin$, and $2\cos^2\alpha - 1$ for $\cos$.` },
      { term: "Undefined", def: "An identity is undefined where a denominator is 0 (or tan is undefined) – state those values." },
      { term: "In terms of p", def: m`Draw a triangle for the given ratio, find the third side with Pythagoras, then use co-functions and double angles.` },
    ],
    chunks: [
      {
        id: "derive",
        title: "Where they come from",
        minutes: 6,
        blocks: [
          { type: "text", md: m`Put $\beta = \alpha$ into the compound formulae:
$$\sin 2\alpha = \sin(\alpha + \alpha) = 2\sin\alpha\cos\alpha$$
$$\cos 2\alpha = \cos^2\alpha - \sin^2\alpha$$
Replace $\sin^2\alpha = 1 - \cos^2\alpha$ (or the other way round) to get two more forms:
$$\cos 2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha$$` },
          { type: "widget", widget: "compound-lab", props: { op: "cos2" } },
        ],
      },
      {
        id: "sketch",
        title: "From a sketch",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "θ in quadrant 2",
            problem: m`If $\sin\theta = \frac{3}{5}$ and $90^\circ < \theta < 180^\circ$, determine $\sin 2\theta$ and $\cos 2\theta$ without a calculator.`,
            steps: [
              { md: m`$y = 3$, $r = 5$, and $x = -4$ (Pythagoras; quadrant 2 so $x < 0$)` },
              { md: m`$\sin 2\theta = 2\sin\theta\cos\theta = 2\left(\frac{3}{5}\right)\left(-\frac{4}{5}\right) = -\frac{24}{25}$` },
              { md: m`$\cos 2\theta = \cos^2\theta - \sin^2\theta = \frac{16}{25} - \frac{9}{25} = \frac{7}{25}$` },
            ],
          },
          {
            type: "worked",
            title: "In terms of p",
            problem: m`If $\sin 22^\circ = p$, express $\cos 44^\circ$ and $\sin 68^\circ$ in terms of $p$.`,
            steps: [
              { md: m`$\cos 44^\circ = \cos 2(22^\circ) = 1 - 2\sin^2 22^\circ = 1 - 2p^2$` },
              { md: m`Sketch: $y = p$, $r = 1$, so $x = \sqrt{1 - p^2}$` },
              { md: m`$\sin 68^\circ = \cos 22^\circ = \sqrt{1 - p^2}$`, why: m`Co-functions: $\sin(90^\circ - \theta) = \cos\theta$.` },
            ],
          },
          {
            type: "practice",
            id: "double-sketch-practice",
            problems: [
              { q: m`If $\cos\theta = -\frac{5}{13}$ and $180^\circ < \theta < 270^\circ$, determine $\sin 2\theta$.`, answer: "120/169", solution: m`$x = -5$, $r = 13$, $y = -12$. $$\sin 2\theta = 2\left(-\tfrac{12}{13}\right)\left(-\tfrac{5}{13}\right) = \tfrac{120}{169}$$` },
              { q: m`If $\cos 20^\circ = t$, express $\cos 40^\circ$ in terms of $t$.`, answer: "2t^2 - 1", kind: "expr", vars: ["t"], solution: m`$$\cos 40^\circ = 2\cos^2 20^\circ - 1 = 2t^2 - 1$$` },
              { q: m`If $\sin 22^\circ = p$, express $\cos 44^\circ$ in terms of $p$.`, answer: "1 - 2p^2", kind: "expr", vars: ["p"], solution: m`$$\cos 44^\circ = 1 - 2\sin^2 22^\circ = 1 - 2p^2$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["double-angle"], title: "Double angle drill" } },
        ],
      },
      {
        id: "identities",
        title: "Proving identities",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "A classic",
            problem: m`Prove that $\frac{1 - \cos 2x}{\sin 2x} = \tan x$, and state for which values of $x \in [0^\circ;\ 360^\circ]$ it is undefined.`,
            steps: [
              { md: m`LHS $= \frac{1 - (1 - 2\sin^2 x)}{2\sin x\cos x}$`, why: m`Choose $1 - 2\sin^2 x$ so the 1s cancel.` },
              { md: m`$= \frac{2\sin^2 x}{2\sin x\cos x} = \frac{\sin x}{\cos x} = \tan x =$ RHS` },
              { md: m`Undefined when $\sin 2x = 0$: $x = 0^\circ;\ 90^\circ;\ 180^\circ;\ 270^\circ;\ 360^\circ$` },
            ],
          },
          {
            type: "worked",
            title: "Expand first",
            problem: m`Prove that $(\sin x + \cos x)^2 = 1 + \sin 2x$.`,
            steps: [
              { md: m`LHS $= \sin^2 x + 2\sin x\cos x + \cos^2 x$` },
              { md: m`$= 1 + \sin 2x =$ RHS` },
            ],
          },
          {
            type: "practice",
            id: "double-identity-practice",
            problems: [
              { q: m`Simplify: $\frac{\sin 2x}{1 + \cos 2x}$`, answer: "tan(x)", kind: "expr", solution: m`$$\frac{2\sin x\cos x}{1 + 2\cos^2 x - 1} = \frac{2\sin x\cos x}{2\cos^2 x} = \tan x$$` },
              { q: m`Simplify: $\cos^4 x - \sin^4 x$`, answer: "cos(2x)", kind: "expr", hint: "Difference of squares.", solution: m`$$(\cos^2 x - \sin^2 x)(\cos^2 x + \sin^2 x) = \cos 2x$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["double-simplify"], title: "Simplify drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "exam", question: { id: "double-identity-exam", q: m`Prove that $\frac{\sin 2x + \sin x}{\cos 2x + \cos x + 1} = \tan x$.`, marks: 4, level: "complex", memo: [m`numerator: $2\sin x\cos x + \sin x = \sin x(2\cos x + 1)$`, m`denominator: $2\cos^2 x - 1 + \cos x + 1 = 2\cos^2 x + \cos x$`, m`$= \cos x(2\cos x + 1)$`, m`$\frac{\sin x(2\cos x + 1)}{\cos x(2\cos x + 1)} = \tan x$`] } },
          { type: "keypoints", points: ["sin 2α = 2 sin α cos α.", "cos 2α has three forms – pick the one that cancels.", "From a sketch: watch the sign of x and y.", "State where an identity is undefined."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "double-quiz",
            questions: [
              { q: m`Which is NOT equal to $\cos 2x$?`, options: [m`$1 - 2\sin^2 x$`, m`$2\cos^2 x - 1$`, m`$2\cos x$`, m`$\cos^2 x - \sin^2 x$`], answer: 2, explain: m`$2\cos x$ is the trap.` },
              { q: m`$2\sin 15^\circ\cos 15^\circ = $`, options: [m`$\sin 30^\circ = \frac{1}{2}$`, m`$\sin 15^\circ$`, m`$\cos 30^\circ$`, m`$1$`], answer: 0, explain: m`$\sin 2(15^\circ)$.` },
              { q: m`To simplify $\frac{1 + \cos 2x}{\sin 2x}$, use $\cos 2x = $`, options: [m`$1 - 2\sin^2 x$`, m`$2\cos^2 x - 1$`, m`$\cos^2 x - \sin^2 x$`], answer: 1, explain: m`Then $1 + 2\cos^2 x - 1 = 2\cos^2 x$.` },
              { q: m`$\cos^2 22{,}5^\circ - \sin^2 22{,}5^\circ = $`, options: [m`$\frac{\sqrt{2}}{2}$`, m`$\frac{1}{2}$`, m`$1$`, m`$0$`], answer: 0, explain: m`$\cos 45^\circ$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "compound-equations",
    topic: "g12-trig",
    order: 3,
    title: "Equations with compound & double angles",
    tagline: "Make all the angles the same – then it's a Grade 11 equation.",
    emoji: "🧩",
    caps: "CAPS Gr 12 · Trigonometry: general solutions of trigonometric equations involving compound and double angles; solutions in a given interval.",
    objectives: [
      "Rewrite an equation so it contains only one angle",
      "Factorise and solve, finding the general solution",
      "Solve cos A = cos B and sin A = sin B type equations",
      "List the solutions in a given interval",
    ],
    styles: ["read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "General solution", def: m`All solutions: $x = \theta + k \cdot 360^\circ$ (sin, cos) or $x = \theta + k \cdot 180^\circ$ (tan), $k \in \mathbb{Z}$.` },
      { term: "sin A = sin B", def: m`$A = B + k \cdot 360^\circ$ or $A = 180^\circ - B + k \cdot 360^\circ$.` },
      { term: "cos A = cos B", def: m`$A = \pm B + k \cdot 360^\circ$.` },
      { term: "Never divide by a trig ratio", def: m`Dividing by $\cos x$ loses the solutions where $\cos x = 0$. Factorise instead.` },
    ],
    chunks: [
      {
        id: "factorise",
        title: "One angle, then factorise",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "sin 2x = cos x",
            problem: m`Determine the general solution of $\sin 2x = \cos x$.`,
            steps: [
              { md: m`$2\sin x\cos x - \cos x = 0$`, why: "Double angle → only x left. Everything on one side." },
              { md: m`$\cos x(2\sin x - 1) = 0$`, why: m`Factorise – DON'T divide by $\cos x$.` },
              { md: m`$\cos x = 0 \Rightarrow x = 90^\circ + k \cdot 180^\circ$` },
              { md: m`$\sin x = \frac{1}{2} \Rightarrow x = 30^\circ + k \cdot 360^\circ$ or $x = 150^\circ + k \cdot 360^\circ$, $k \in \mathbb{Z}$` },
            ],
          },
          {
            type: "worked",
            title: "A quadratic in sin x",
            problem: m`Determine the general solution of $\cos 2x + 3\sin x - 2 = 0$.`,
            steps: [
              { md: m`$1 - 2\sin^2 x + 3\sin x - 2 = 0$`, why: m`Choose the form of $\cos 2x$ with only $\sin$.` },
              { md: m`$2\sin^2 x - 3\sin x + 1 = 0 \Rightarrow (2\sin x - 1)(\sin x - 1) = 0$` },
              { md: m`$\sin x = \frac{1}{2}$: $x = 30^\circ + k \cdot 360^\circ$ or $x = 150^\circ + k \cdot 360^\circ$` },
              { md: m`$\sin x = 1$: $x = 90^\circ + k \cdot 360^\circ$, $k \in \mathbb{Z}$` },
            ],
          },
          {
            type: "sequence",
            id: "trig-eq-steps",
            title: "Solving a Grade 12 trig equation",
            steps: ["Use compound/double angle formulae so there is only one angle", "Get everything on one side (= 0)", "Factorise (common factor or trinomial)", "Solve each factor as a basic equation with a reference angle", "Write the general solution with k ∈ ℤ", "Pick out solutions in the given interval"],
            explain: "Same skeleton as Grade 11 – only the first step is new.",
          },
        ],
      },
      {
        id: "equal-ratios",
        title: "cos A = cos B",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Two different angles",
            problem: m`Determine the general solution of $\cos 2x = \cos(x - 30^\circ)$.`,
            steps: [
              { md: m`$2x = (x - 30^\circ) + k \cdot 360^\circ$ or $2x = -(x - 30^\circ) + k \cdot 360^\circ$`, why: "Cosines are equal when the angles are equal or opposite (plus full turns)." },
              { md: m`$x = -30^\circ + k \cdot 360^\circ$` },
              { md: m`or $3x = 30^\circ + k \cdot 360^\circ \Rightarrow x = 10^\circ + k \cdot 120^\circ$, $k \in \mathbb{Z}$`, why: "Divide the k-term by 3 too!" },
            ],
          },
          {
            type: "worked",
            title: "sin and cos: use a co-function",
            problem: m`Determine the general solution of $\sin 3x = \cos x$.`,
            steps: [
              { md: m`$\sin 3x = \sin(90^\circ - x)$` },
              { md: m`$3x = 90^\circ - x + k \cdot 360^\circ \Rightarrow x = 22{,}5^\circ + k \cdot 90^\circ$` },
              { md: m`or $3x = 180^\circ - (90^\circ - x) + k \cdot 360^\circ \Rightarrow x = 45^\circ + k \cdot 180^\circ$, $k \in \mathbb{Z}$` },
            ],
          },
          {
            type: "practice",
            id: "compound-eq-practice",
            problems: [
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $\cos 2x = \cos(x - 30^\circ)$`, answer: "10; 130; 250; 330", kind: "set", solution: m`From the general solution: $x = -30^\circ + 360^\circ = 330^\circ$, and $x = 10^\circ;\ 130^\circ;\ 250^\circ$.` },
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $\sin 2x = \sin x$`, answer: "0; 60; 180; 300; 360", kind: "set", solution: m`$$\sin x(2\cos x - 1) = 0 \Rightarrow \sin x = 0 \text{ or } \cos x = \tfrac{1}{2}$$ $$x = 0^\circ;\ 60^\circ;\ 180^\circ;\ 300^\circ;\ 360^\circ$$` },
              { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $\cos 2x + 3\sin x - 2 = 0$`, answer: "30; 90; 150", kind: "set", solution: m`$(2\sin x - 1)(\sin x - 1) = 0$: $$x = 30^\circ;\ 90^\circ;\ 150^\circ$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["compound-equation"], title: "Equation drill" } },
          { type: "keypoints", points: ["Make every angle the same first.", "Factorise – never divide by sin x or cos x.", "cos A = cos B ⇒ A = ±B + k·360°.", "sin A = sin B ⇒ A = B or 180° − B, + k·360°."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "compound-eq-quiz",
            questions: [
              { q: m`Solving $\sin 2x = \sin x$, a learner divides by $\sin x$. What happens?`, options: ["nothing – it's fine", m`they lose the solutions where $\sin x = 0$`, "they get extra wrong solutions", "they get the general solution"], answer: 1, explain: "Dividing by an expression that can be 0 throws away solutions." },
              { q: m`$3x = 60^\circ + k \cdot 360^\circ \Rightarrow x = $`, options: [m`$20^\circ + k \cdot 360^\circ$`, m`$20^\circ + k \cdot 120^\circ$`, m`$60^\circ + k \cdot 120^\circ$`, m`$180^\circ + k \cdot 360^\circ$`], answer: 1, explain: "Divide every term, including the period, by 3." },
              { q: m`For $\cos 2x - \sin x = 0$, which form of $\cos 2x$ do you use?`, options: [m`$1 - 2\sin^2 x$`, m`$2\cos^2 x - 1$`, m`$\cos^2 x - \sin^2 x$`], answer: 0, explain: m`Then everything is in terms of $\sin x$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "heights-distances-3d",
    topic: "g12-trig",
    order: 4,
    title: "2D & 3D problems",
    tagline: "Towers, cliffs and flagpoles – solve the flat triangle first.",
    emoji: "🗼",
    caps: "CAPS Gr 12 · Trigonometry: solve problems in two and three dimensions using the sine, cosine and area rules and right-triangle trigonometry; angles of elevation and depression.",
    objectives: [
      "Use angles of elevation and depression correctly",
      "Solve 2D problems with two observers",
      "Identify horizontal and vertical triangles in a 3D diagram",
      "Derive a general formula (\"show that\") with compound angles",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 75,
    terms: [
      { term: "Angle of elevation", def: "The angle from the horizontal UP to an object." },
      { term: "Angle of depression", def: "The angle from the horizontal DOWN to an object. It equals the angle of elevation from the object (alt ∠s)." },
      { term: "Vertical and horizontal", def: m`A vertical line is perpendicular to every line in the horizontal plane – look for the hidden $90^\circ$ angles.` },
      { term: "Two-triangle strategy", def: "Find a side shared by both triangles in the triangle with the most information, then move to the other triangle." },
      { term: "Sine rule", def: m`$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$ – use with a side and its opposite angle.` },
    ],
    chunks: [
      {
        id: "two-d",
        title: "Two angles of elevation",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "heights-lab", props: { mode: "2d" } },
          {
            type: "worked",
            title: "Two learners and a tower",
            problem: m`$A$ and $B$ are 50 m apart in line with the foot $F$ of a tower, $B$ closer. The angles of elevation of the top $T$ from $A$ and $B$ are $30^\circ$ and $52^\circ$. Calculate the height of the tower.`,
            steps: [
              { md: m`$A\hat{T}B = 52^\circ - 30^\circ = 22^\circ$ (ext ∠ of △)`, why: "The exterior angle at B equals the two interior opposite angles." },
              { md: m`$\frac{BT}{\sin 30^\circ} = \frac{50}{\sin 22^\circ} \Rightarrow BT = 66{,}74$ m` },
              { md: m`$TF = BT\sin 52^\circ = 52{,}59$ m` },
            ],
          },
          {
            type: "practice",
            id: "two-d-practice",
            problems: [
              { q: m`Two points $A$ and $B$, 40 m apart, are in line with the foot of a tower ($B$ closer). The angles of elevation of the top from $A$ and $B$ are $20^\circ$ and $45^\circ$. Calculate the height of the tower (2 decimals).`, answer: "22.89", tol: 0.02, solution: m`$$A\hat{T}B = 25^\circ;\quad BT = \frac{40\sin 20^\circ}{\sin 25^\circ} = 32{,}37$$ $$h = 32{,}37\sin 45^\circ = 22{,}89 \text{ m}$$` },
              { q: m`From the top of a 60 m cliff, the angle of depression of a boat is $25^\circ$. How far is the boat from the foot of the cliff (2 decimals)?`, answer: "128.67", tol: 0.02, hint: "The angle of elevation from the boat to the top is also 25°.", solution: m`$$\tan 25^\circ = \frac{60}{d} \Rightarrow d = \frac{60}{\tan 25^\circ} = 128{,}67 \text{ m}$$` },
            ],
          },
        ],
      },
      {
        id: "three-d",
        title: "A tower on a flat plane",
        minutes: 9,
        blocks: [
          { type: "text", md: m`In 3D questions, $A$, $B$ and $C$ usually lie in a **horizontal plane** and $TB$ is a **vertical** tower. That means $T\hat{B}A = T\hat{B}C = 90^\circ$ – even though the diagram doesn't look like it. Turn the view to see.` },
          { type: "widget", widget: "heights-lab", props: { mode: "3d" } },
          {
            type: "worked",
            title: "Flat triangle first, then upright",
            problem: m`$TB$ is a vertical tower. $A$, $B$, $C$ are in a horizontal plane with $AC = 60$ m, $B\hat{A}C = 55^\circ$ and $B\hat{C}A = 65^\circ$. The angle of elevation of $T$ from $A$ is $30^\circ$. Calculate $TB$.`,
            steps: [
              { md: m`$A\hat{B}C = 180^\circ - 55^\circ - 65^\circ = 60^\circ$ (∠s of △)` },
              { md: m`$\frac{AB}{\sin 65^\circ} = \frac{60}{\sin 60^\circ} \Rightarrow AB = 62{,}79$ m`, why: "Sine rule in the horizontal triangle ABC." },
              { md: m`$\tan 30^\circ = \frac{TB}{AB} \Rightarrow TB = 62{,}79\tan 30^\circ = 36{,}25$ m`, why: m`Right angle at $B$ in the vertical triangle $TBA$.` },
            ],
          },
          {
            type: "practice",
            id: "three-d-practice",
            problems: [
              { q: m`$TB$ is a vertical tower; $A$, $B$, $C$ are on level ground with $AC = 45$ m, $B\hat{A}C = 62^\circ$ and $B\hat{C}A = 48^\circ$. The angle of elevation of $T$ from $A$ is $35^\circ$. Calculate $TB$ (2 decimals).`, answer: "24.92", tol: 0.02, solution: m`$$A\hat{B}C = 70^\circ;\quad AB = \frac{45\sin 48^\circ}{\sin 70^\circ} = 35{,}59 \text{ m}$$ $$TB = 35{,}59\tan 35^\circ = 24{,}92 \text{ m}$$` },
              { q: m`$A$, $B$ and $C$ are on level ground with $AB = 25$ m, $BC = 30$ m and $A\hat{B}C = 100^\circ$. Calculate $AC$ (2 decimals).`, answer: "42.25", tol: 0.02, hint: "Two sides and the included angle: cosine rule.", solution: m`$$AC^2 = 25^2 + 30^2 - 2(25)(30)\cos 100^\circ = 1785{,}47 \Rightarrow AC = 42{,}25 \text{ m}$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["heights-3d"], title: "2D & 3D drill" } },
        ],
      },
      {
        id: "show-that",
        title: "\"Show that\" questions",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Exams often ask for a **formula** first ("show that $h = \dots$"), then a calculation. Work with letters exactly as you would with numbers.` },
          {
            type: "worked",
            title: "A general formula",
            problem: m`In the 2D problem, $AB = d$ and the angles of elevation from $A$ and $B$ are $\alpha$ and $\beta$. Show that the height is $h = \frac{d\sin\alpha\sin\beta}{\sin(\beta - \alpha)}$.`,
            steps: [
              { md: m`$A\hat{T}B = \beta - \alpha$ (ext ∠ of △)` },
              { md: m`$\frac{BT}{\sin\alpha} = \frac{d}{\sin(\beta - \alpha)} \Rightarrow BT = \frac{d\sin\alpha}{\sin(\beta - \alpha)}$` },
              { md: m`$h = BT\sin\beta = \frac{d\sin\alpha\sin\beta}{\sin(\beta - \alpha)}$` },
            ],
          },
          { type: "callout", variant: "tip", md: m`A compound angle may appear in the answer: e.g. $\sin(180^\circ - (\alpha + \beta)) = \sin(\alpha + \beta)$. Use reduction formulae to tidy it.` },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "exam", question: { id: "heights-exam", q: m`$TB$ is a vertical pole. $A$ and $C$ are on level ground with $B$, $A\hat{B}C = 120^\circ$, $AB = 15$ m and $BC = 20$ m. The angle of elevation of $T$ from $A$ is $40^\circ$. Calculate $AC$ and $TB$ (2 decimals).`, marks: 5, level: "complex", memo: [m`$AC^2 = 15^2 + 20^2 - 2(15)(20)\cos 120^\circ$`, m`$AC^2 = 925$`, m`$AC = 30{,}41$ m`, m`$TB = 15\tan 40^\circ$`, m`$TB = 12{,}59$ m`] } },
          { type: "keypoints", points: ["Elevation is measured up from the horizontal; depression down.", "Vertical tower ⇒ 90° at its foot in every vertical triangle.", "Solve the triangle with the most information first.", "Show-that questions: same steps, with letters."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "heights-quiz",
            questions: [
              { q: "The angle of depression from a cliff top to a boat is 30°. The angle of elevation from the boat to the cliff top is…", options: ["60°", "30°", "120°", "it depends on the height"], answer: 1, explain: "Alternate angles between horizontal lines." },
              { q: "In a 3D problem, TB is vertical and A is on the ground. Then T̂BA = ", options: ["the angle of elevation", "90°", "180° minus the elevation", "unknown"], answer: 1, explain: "A vertical line is perpendicular to every line in the horizontal plane." },
              { q: "You know AC and both base angles of △ABC. To find AB, use…", options: ["the cosine rule", "the sine rule", "the area rule", "Pythagoras"], answer: 1, explain: "Find the third angle, then the sine rule." },
            ],
          },
        ],
      },
    ],
  },
];
