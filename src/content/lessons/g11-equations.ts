import type { Lesson } from "../types";

const m = String.raw;

export const EQUATIONS: Lesson[] = [
  {
    slug: "quadratic-equations",
    topic: "g11-equations",
    order: 1,
    title: "Quadratic equations: three ways in",
    tagline: "Factorise, complete the square, or use the formula – and know which to pick.",
    emoji: "⚽",
    caps: "CAPS Gr 11 · Equations: solve quadratic equations by factorisation, completing the square and the quadratic formula.",
    objectives: [
      "Solve quadratic equations by factorising (zero-product rule)",
      "Solve by completing the square",
      "Use the quadratic formula, rounding correctly",
      "Choose the quickest method for a given equation",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Quadratic equation", def: m`An equation where the highest power of the variable is 2: $ax^2 + bx + c = 0$, $a \neq 0$.` },
      { term: "Standard form", def: m`$ax^2 + bx + c = 0$ – everything on one side, zero on the other. Always get here first.` },
      { term: "Roots", def: "The solutions of an equation – for a quadratic, the x-intercepts of its graph." },
      { term: "Zero-product rule", def: m`If $A \times B = 0$ then $A = 0$ or $B = 0$. It ONLY works when the product equals zero.` },
      { term: "Completing the square", def: m`Rewriting $x^2 + bx + c$ as $\left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2 + c$ so the equation can be solved by square-rooting.` },
      { term: "Quadratic formula", def: m`$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ – solves ANY quadratic $ax^2 + bx + c = 0$.` },
      { term: "Difference of two squares", def: m`$a^2 - b^2 = (a - b)(a + b)$, e.g. $x^2 - 9 = (x - 3)(x + 3)$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "When does the ball land?",
        minutes: 3,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A goalkeeper kicks a ball straight up. Its height after $t$ seconds is $h = 20t - 5t^2$ metres. When does it land? Set $h = 0$:

$$20t - 5t^2 = 0 \;\Rightarrow\; 5t(4 - t) = 0 \;\Rightarrow\; t = 0 \text{ or } t = 4$$

It leaves the ground at 0 s and lands after **4 seconds**. Two answers – that's what quadratics do.` },
          { type: "text", md: m`A quadratic equation can have **two, one or no real solutions**. There are three ways to find them. Factorising is fastest when it works; the formula *always* works.` },
        ],
      },
      {
        id: "factorise",
        title: "Method 1: factorise",
        minutes: 8,
        blocks: [
          { type: "text", md: m`**Step 1:** get standard form ($= 0$). **Step 2:** factorise. **Step 3:** set each factor equal to zero (zero-product rule).` },
          {
            type: "worked",
            title: "Factorising with a ≠ 1",
            problem: m`Solve for $x$: $2x^2 + 5x = 3$`,
            steps: [
              { md: m`$2x^2 + 5x - 3 = 0$`, why: "Standard form first – the zero-product rule needs a 0 on one side." },
              { md: m`$(2x - 1)(x + 3) = 0$`, why: m`Check by expanding: $2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$ ✓` },
              { md: m`$2x - 1 = 0 \text{ or } x + 3 = 0$` },
              { md: m`$x = \frac{1}{2} \text{ or } x = -3$` },
            ],
          },
          { type: "callout", variant: "mistake", title: "Two ways to lose marks", md: m`- $x(x - 3) = 4$ does **not** mean $x = 4$ or $x - 3 = 4$. The zero-product rule only works with **= 0**.
- Never divide both sides by $x$: from $x^2 = 3x$ you'd get only $x = 3$ and lose $x = 0$. Rather: $x^2 - 3x = 0 \Rightarrow x(x - 3) = 0$.` },
          {
            type: "practice",
            id: "quad-factor-practice",
            problems: [
              { q: m`Solve for $x$: $x^2 + 5x + 6 = 0$`, answer: "-2; -3", hint: "Two numbers that multiply to 6 and add to 5.", solution: m`$$(x + 2)(x + 3) = 0 \Rightarrow x = -2 \text{ or } x = -3$$` },
              { q: m`Solve for $x$: $3x^2 = 12x$`, answer: "0; 4", hint: "Don't divide by x! Bring everything to one side.", solution: m`$$3x^2 - 12x = 0 \Rightarrow 3x(x - 4) = 0 \Rightarrow x = 0 \text{ or } x = 4$$` },
              { q: m`Solve for $x$: $x^2 - 49 = 0$`, answer: "7; -7", hint: "Difference of two squares.", solution: m`$$(x - 7)(x + 7) = 0 \Rightarrow x = 7 \text{ or } x = -7$$` },
              { q: m`Solve for $x$: $x(x + 1) = 12$`, answer: "3; -4", hint: "Multiply out and get = 0 first.", solution: m`$$x^2 + x - 12 = 0 \Rightarrow (x + 4)(x - 3) = 0 \Rightarrow x = -4 \text{ or } x = 3$$` },
              { q: m`Solve for $x$: $2x^2 - 7x + 3 = 0$`, answer: "1/2; 3", solution: m`$$(2x - 1)(x - 3) = 0 \Rightarrow x = \tfrac{1}{2} \text{ or } x = 3$$` },
            ],
          },
        ],
      },
      {
        id: "complete-square",
        title: "Method 2: complete the square",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Completing the square turns any quadratic into "something squared = a number", which you can square-root. It's also how the quadratic formula is proved, and how you get **turning-point form** for graphs.` },
          {
            type: "worked",
            title: "Completing the square",
            problem: m`Solve by completing the square: $x^2 + 6x - 7 = 0$`,
            steps: [
              { md: m`$x^2 + 6x = 7$`, why: "Move the constant to the right." },
              { md: m`$x^2 + 6x + 9 = 7 + 9$`, why: m`Add $\left(\frac{b}{2}\right)^2 = \left(\frac{6}{2}\right)^2 = 9$ to BOTH sides.` },
              { md: m`$(x + 3)^2 = 16$`, why: "The left side is now a perfect square." },
              { md: m`$x + 3 = \pm 4 \Rightarrow x = 1 \text{ or } x = -7$`, why: "Square root both sides – don't forget the ±." },
            ],
          },
          {
            type: "sequence",
            id: "complete-square-steps",
            title: "Order the steps for completing the square",
            steps: [m`Divide every term by $a$ (so the $x^2$ coefficient is 1)`, "Move the constant term to the right-hand side", m`Add $\left(\frac{b}{2}\right)^2$ to both sides`, "Write the left side as a perfect square", "Square root both sides (remember ±) and solve"],
            explain: "Same steps every time – this exact routine also gives you the turning point of a parabola.",
          },
          { type: "widget", widget: "quadratic-lab", props: { mode: "square" } },
        ],
      },
      {
        id: "formula",
        title: "Method 3: the quadratic formula",
        minutes: 8,
        blocks: [
          { type: "text", md: m`For $ax^2 + bx + c = 0$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

It always works – use it when the question says "correct to two decimal places" (that's a clue the roots are irrational).` },
          { type: "widget", widget: "quadratic-lab", props: { mode: "formula" } },
          {
            type: "worked",
            title: "Using the formula",
            problem: m`Solve for $x$, correct to two decimal places: $2x^2 - 3x - 4 = 0$`,
            steps: [
              { md: m`$a = 2,\ b = -3,\ c = -4$`, why: "Write them down first – most errors are sign errors." },
              { md: m`$x = \dfrac{-(-3) \pm \sqrt{(-3)^2 - 4(2)(-4)}}{2(2)} = \dfrac{3 \pm \sqrt{41}}{4}$`, why: m`Brackets around negatives: $(-3)^2 = 9$, and $-4(2)(-4) = +32$.` },
              { md: m`$x = 2{,}35 \text{ or } x = -0{,}85$`, why: "Calculate each root separately, round only at the end." },
            ],
          },
          { type: "callout", variant: "memory", md: m`Sing it to "Pop Goes the Weasel": *"x equals negative b, plus or minus the square root, of b squared minus 4ac, all over 2a."* 🎵` },
          {
            type: "practice",
            id: "quad-formula-practice",
            problems: [
              { q: m`Solve for $x$ correct to two decimal places: $x^2 - 4x + 1 = 0$`, answer: "3.73; 0.27", kind: "set", tol: 0.011, solution: m`$$x = \frac{4 \pm \sqrt{16 - 4}}{2} = \frac{4 \pm \sqrt{12}}{2} = 2 \pm \sqrt{3}$$
$$x = 3{,}73 \text{ or } x = 0{,}27$$` },
              { q: m`Solve for $x$ correct to two decimal places: $3x^2 + x - 5 = 0$`, answer: "1.14; -1.47", kind: "set", tol: 0.011, solution: m`$$x = \frac{-1 \pm \sqrt{1 + 60}}{6} = \frac{-1 \pm \sqrt{61}}{6}$$
$$x = 1{,}14 \text{ or } x = -1{,}47$$` },
              { q: m`Solve for $x$, leaving your answer in simplest surd form: $x^2 + 2x - 2 = 0$`, answer: "-1 + sqrt(3); -1 - sqrt(3)", kind: "set", hint: "Use the formula, then simplify √12.", solution: m`$$x = \frac{-2 \pm \sqrt{4 + 8}}{2} = \frac{-2 \pm 2\sqrt{3}}{2} = -1 \pm \sqrt{3}$$` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Endless practice & quick check",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["quad-factor", "quad-formula"], title: "Quadratic drill" } },
          { type: "keypoints", points: ["Standard form (= 0) before anything else.", "Factorise if you can – it's fastest.", "Decimals asked for? Use the formula; round only at the end.", "Never divide by x – you lose a root."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "quad-eq-quiz",
            questions: [
              { q: m`The solutions of $(x - 2)(x + 5) = 0$ are…`, options: [m`$x = -2$ or $x = 5$`, m`$x = 2$ or $x = -5$`, m`$x = 2$ or $x = 5$`, m`$x = -10$`], answer: 1, explain: m`$x - 2 = 0 \Rightarrow x = 2$ and $x + 5 = 0 \Rightarrow x = -5$.` },
              { q: m`For $3x^2 - x - 7 = 0$, which values go into the formula?`, options: [m`$a = 3, b = 1, c = 7$`, m`$a = 3, b = -1, c = -7$`, m`$a = -3, b = 1, c = 7$`, m`$a = 3, b = -x, c = -7$`], answer: 1, explain: "Take the sign in front of each term: a = 3, b = −1, c = −7." },
              { q: m`What do you add to both sides to complete the square in $x^2 - 10x = 3$?`, options: ["10", "100", "25", "5"], answer: 2, explain: m`$\left(\frac{b}{2}\right)^2 = \left(\frac{-10}{2}\right)^2 = 25$.` },
              { q: m`A learner solves $x^2 = 5x$ by dividing by $x$ to get $x = 5$. What's wrong?`, options: ["Nothing", m`They lost the solution $x = 0$`, m`The answer should be $x = -5$`, m`They should have square-rooted to get $x = \sqrt{5}$`], answer: 1, explain: m`$x^2 - 5x = 0 \Rightarrow x(x - 5) = 0$, so $x = 0$ or $x = 5$. Dividing by $x$ assumes $x \neq 0$.` },
              { q: m`Which method is BEST for $x^2 - 3x - 1 = 0$ (answer to 2 decimals)?`, options: ["Factorising", "Quadratic formula", "Guess and check", "Square root both sides"], answer: 1, explain: m`$b^2 - 4ac = 13$ isn't a perfect square, so it won't factorise nicely – use the formula.` },
              { q: m`$x^2 - 16 = 0$ factorises as…`, options: [m`$(x - 4)^2$`, m`$(x - 8)(x + 2)$`, m`$(x - 4)(x + 4)$`, m`$x(x - 16)$`], answer: 2, explain: "Difference of two squares: a² − b² = (a − b)(a + b)." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "nature-of-roots",
    topic: "g11-equations",
    order: 2,
    title: "The discriminant: predict the roots",
    tagline: "Know what kind of answers you'll get – before you solve.",
    emoji: "🔮",
    caps: "CAPS Gr 11 · Equations: determine the nature of roots using the discriminant; find unknown coefficients for given types of roots.",
    objectives: [
      "Calculate the discriminant Δ = b² − 4ac",
      "Describe the nature of the roots from Δ",
      "Find unknown values (like k) for equal, real or non-real roots",
      "Prove that roots are real for all values of a parameter",
    ],
    styles: ["visual", "read-write"],
    xp: 60,
    terms: [
      { term: "Discriminant", def: m`$\Delta = b^2 - 4ac$ – the part under the root in the quadratic formula. It decides the nature of the roots.` },
      { term: "Non-real roots", def: m`When $\Delta < 0$: no real solutions; the parabola doesn't cut the x-axis.` },
      { term: "Equal roots", def: m`When $\Delta = 0$: one repeated real, rational root; the parabola touches the x-axis.` },
      { term: "Real, rational, unequal roots", def: m`When $\Delta > 0$ and $\Delta$ is a perfect square (with rational $a, b, c$).` },
      { term: "Real, irrational, unequal roots", def: m`When $\Delta > 0$ and $\Delta$ is NOT a perfect square.` },
      { term: "Real roots", def: m`When $\Delta \geq 0$ – this includes equal roots.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "The weather forecast for roots",
        minutes: 4,
        blocks: [
          { type: "text", md: m`Look inside the quadratic formula: $x = \dfrac{-b \pm \sqrt{\color{orange}{b^2 - 4ac}}}{2a}$. That orange bit decides everything:

- **negative** → you can't square-root it → **no real roots**
- **zero** → $\pm 0$ gives the same answer twice → **equal roots**
- **positive** → two different answers → **two real roots**

It's called the **discriminant**, $\Delta$ (delta). Checking it is like checking the weather before you leave the house.` },
          { type: "widget", widget: "quadratic-lab", props: { mode: "discriminant" } },
        ],
      },
      {
        id: "cases",
        title: "The four cases",
        minutes: 5,
        blocks: [
          {
            type: "table",
            headers: ["Discriminant", "Nature of the roots", "Graph"],
            rows: [
              [m`$\Delta < 0$`, "Non-real", "Doesn't touch the x-axis"],
              [m`$\Delta = 0$`, "Real, rational, equal", "Touches the x-axis at one point (TP on the axis)"],
              [m`$\Delta > 0$, perfect square`, "Real, rational, unequal", "Cuts the x-axis twice"],
              [m`$\Delta > 0$, not a perfect square`, "Real, irrational, unequal", "Cuts the x-axis twice"],
            ],
          },
          {
            type: "match",
            id: "discriminant-match",
            title: "Match the equation to the nature of its roots",
            pairs: [
              { left: m`$x^2 - 6x + 9 = 0$ ($\Delta = 0$)`, right: "Real, rational and equal" },
              { left: m`$x^2 + x + 1 = 0$ ($\Delta = -3$)`, right: "Non-real" },
              { left: m`$x^2 - 5x + 6 = 0$ ($\Delta = 1$)`, right: "Real, rational and unequal" },
              { left: m`$x^2 - 2x - 1 = 0$ ($\Delta = 8$)`, right: "Real, irrational and unequal" },
            ],
          },
          { type: "callout", variant: "exam", md: m`Use the exact CAPS words: **"real, rational and unequal"**, not "two answers". And always show $\Delta$ with the substitution: $\Delta = (-5)^2 - 4(1)(6) = 1$.` },
        ],
      },
      {
        id: "find-k",
        title: "Finding the unknown",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Equal, real and non-real",
            problem: m`For which values of $k$ does $x^2 - 4x + k = 0$ have (a) equal roots (b) real roots (c) non-real roots?`,
            steps: [
              { md: m`$\Delta = (-4)^2 - 4(1)(k) = 16 - 4k$` },
              { md: m`(a) Equal: $16 - 4k = 0 \Rightarrow k = 4$` },
              { md: m`(b) Real: $16 - 4k \geq 0 \Rightarrow k \leq 4$`, why: "Real roots include equal roots, so ≥ (not >)." },
              { md: m`(c) Non-real: $16 - 4k < 0 \Rightarrow k > 4$`, why: "Dividing by −4 flips the inequality sign." },
            ],
          },
          {
            type: "worked",
            title: "Prove it for every k",
            problem: m`Show that the roots of $x^2 + (k - 2)x - 2k = 0$ are real and rational for all real values of $k$.`,
            steps: [
              { md: m`$\Delta = (k - 2)^2 - 4(1)(-2k) = k^2 - 4k + 4 + 8k$` },
              { md: m`$= k^2 + 4k + 4 = (k + 2)^2$`, why: "Look for a perfect square – that's the whole trick." },
              { md: m`$(k + 2)^2 \geq 0$ for all $k$, and it's a perfect square, so the roots are **real and rational** for every $k$.` },
            ],
          },
          {
            type: "practice",
            id: "discriminant-practice",
            problems: [
              { q: m`Calculate the discriminant of $2x^2 - 3x + 5 = 0$.`, answer: "-31", solution: m`$$\Delta = (-3)^2 - 4(2)(5) = 9 - 40 = -31$$
\nSo the roots are non-real.` },
              { q: m`For which positive value of $p$ does $x^2 + px + 9 = 0$ have equal roots?`, answer: "6", hint: "Set Δ = 0.", solution: m`$$p^2 - 36 = 0 \Rightarrow p = \pm 6$$
\nThe positive value is $p = 6$.` },
              { q: m`Find the largest integer $k$ for which $2x^2 + 4x + k = 0$ has real roots.`, answer: "2", hint: "Real roots: Δ ≥ 0.", solution: m`$$\Delta = 16 - 8k \geq 0 \Rightarrow k \leq 2$$
\nThe largest integer is $k = 2$.` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Endless practice & quick check",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["discriminant"], title: "Discriminant drill" } },
          { type: "keypoints", points: [m`$\Delta = b^2 - 4ac$ – show the substitution.`, m`$\Delta < 0$ non-real · $\Delta = 0$ equal · $\Delta > 0$ unequal (rational if a perfect square).`, m`"Real roots" means $\Delta \geq 0$.`, "To prove 'real for all k', write Δ as a perfect square (or show it's always positive)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "discriminant-quiz",
            questions: [
              { q: m`If $\Delta = 0$, the roots are…`, options: ["Non-real", "Real, rational and equal", "Real, irrational and unequal", "Real, rational and unequal"], answer: 1, explain: m`$\pm\sqrt{0}$ gives one repeated root – the graph just touches the x-axis.` },
              { q: m`The discriminant of $x^2 + 3x - 4 = 0$ is…`, options: ["−7", "25", "−25", "7"], answer: 1, explain: m`$3^2 - 4(1)(-4) = 9 + 16 = 25$ – a perfect square, so real, rational, unequal roots.` },
              { q: m`A parabola that doesn't cut or touch the x-axis has…`, options: [m`$\Delta > 0$`, m`$\Delta = 0$`, m`$\Delta < 0$`, "a turning point at the origin"], answer: 2, explain: "No x-intercepts means no real roots, so Δ < 0." },
              { q: m`$\Delta = 12$. The roots are…`, options: ["Real, rational and unequal", "Real, irrational and unequal", "Non-real", "Equal"], answer: 1, explain: "12 > 0 but it isn't a perfect square, so the roots are irrational." },
              { q: m`For real roots we need…`, options: [m`$\Delta > 0$`, m`$\Delta \geq 0$`, m`$\Delta < 0$`, m`$\Delta \neq 0$`], answer: 1, explain: "'Real' includes the equal-roots case, so Δ ≥ 0." },
              { q: m`$x^2 - 2x + k = 0$ has non-real roots when…`, options: [m`$k < 1$`, m`$k = 1$`, m`$k > 1$`, m`$k > -1$`], answer: 2, explain: m`$\Delta = 4 - 4k < 0 \Rightarrow k > 1$.` },
            ],
          },
          { type: "exam", question: { id: "discriminant-exam", q: m`Determine the value(s) of $k$ for which $kx^2 - 6x + 3 = 0$ has equal roots. ($k \neq 0$)`, marks: 3, level: "routine", memo: [m`$\Delta = (-6)^2 - 4(k)(3)$`, m`$36 - 12k = 0$`, m`$k = 3$`] } },
        ],
      },
    ],
  },
  {
    slug: "quadratic-inequalities",
    topic: "g11-equations",
    order: 3,
    title: "Quadratic inequalities",
    tagline: "Not one answer – a whole range of them. Read it off the graph.",
    emoji: "📊",
    caps: "CAPS Gr 11 · Equations & inequalities: solve quadratic inequalities in one variable and interpret the solution graphically.",
    objectives: [
      "Find the critical values of a quadratic inequality",
      "Use a sketch or number line to choose the correct region",
      "Write solutions in inequality and interval notation",
      "Avoid the classic sign-flip mistakes",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Inequality", def: m`A statement using $<$, $\leq$, $>$ or $\geq$. Its solution is usually a range of values.` },
      { term: "Critical values", def: "The values where the expression equals zero – the roots. They split the number line into regions." },
      { term: "Interval notation", def: m`Writing a range with brackets: $(2;\ 5]$ means $2 < x \leq 5$. Round brackets exclude, square brackets include.` },
      { term: "Inside the roots", def: m`For a positive parabola, $\text{expression} < 0$ (or $\leq 0$) BETWEEN the roots: $r_1 < x < r_2$.` },
      { term: "Outside the roots", def: m`For a positive parabola, $\text{expression} > 0$ (or $\geq 0$) OUTSIDE the roots: $x < r_1$ or $x > r_2$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "When does the coffee cart make money?",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A kasi coffee cart's weekly profit (in R100s) when it sells $x$ hundred cups is $P = -2x^2 + 40x - 150$. When is the profit **positive**? Solve $-2x^2 + 40x - 150 > 0$:

$$x^2 - 20x + 75 < 0 \;\Rightarrow\; (x - 5)(x - 15) < 0 \;\Rightarrow\; 5 < x < 15$$

Sell between 500 and 1 500 cups and you're making money. Sell more than that and costs (staff, stock) eat the profit.` },
          { type: "text", md: m`Notice the sign flipped from $>$ to $<$ when we divided by $-2$. More on that below.` },
        ],
      },
      {
        id: "method",
        title: "The graph method",
        minutes: 8,
        blocks: [
          { type: "text", md: m`1. Get **0 on one side**. Make the $x^2$ coefficient **positive** (multiply by −1 and flip the sign if needed).
2. **Factorise** to find the critical values.
3. **Sketch** the parabola through the roots (a smiley face, because $a > 0$).
4. **Read off**: "$< 0$" is where the graph is **below** the x-axis, "$> 0$" is **above**.` },
          { type: "widget", widget: "inequality-lab" },
          {
            type: "worked",
            title: "Inside the roots",
            problem: m`Solve: $x^2 - x - 6 \leq 0$`,
            steps: [
              { md: m`$(x - 3)(x + 2) \leq 0$`, why: "Critical values: x = 3 and x = −2." },
              { md: m`The parabola is below (or on) the x-axis between the roots.`, why: "≤ 0 means below or on the axis." },
              { md: m`$-2 \leq x \leq 3$, or in interval notation $x \in [-2;\ 3]$`, why: "≤ includes the roots, so square brackets." },
            ],
          },
          {
            type: "worked",
            title: "Negative x² – flip first",
            problem: m`Solve: $-x^2 + 4x + 5 < 0$`,
            steps: [
              { md: m`$x^2 - 4x - 5 > 0$`, why: "Multiply both sides by −1 and FLIP the sign." },
              { md: m`$(x - 5)(x + 1) > 0$` },
              { md: m`$x < -1 \text{ or } x > 5$`, why: "> 0 means above the axis: outside the roots. You need 'or' – x can't be in both regions at once." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`- Forgetting to flip the sign when multiplying or dividing by a negative.
- Writing $5 < x < -1$ for an "outside" answer – that's impossible. Outside answers need **two** separate inequalities joined by **or**.
- Solving $x^2 > 9$ as $x > \pm 3$. It's $x < -3$ or $x > 3$.` },
        ],
      },
      {
        id: "notation",
        title: "Saying it properly",
        minutes: 5,
        blocks: [
          {
            type: "table",
            headers: ["Inequality", "Interval notation", "Number line"],
            rows: [
              [m`$-2 < x < 3$`, m`$(-2;\ 3)$`, "open dots at −2 and 3, shaded between"],
              [m`$-2 \leq x \leq 3$`, m`$[-2;\ 3]$`, "closed dots, shaded between"],
              [m`$x < 1$ or $x \geq 4$`, m`$(-\infty;\ 1) \cup [4;\ \infty)$`, "shaded outwards from an open dot at 1 and a closed dot at 4"],
            ],
          },
          {
            type: "match",
            id: "inequality-notation-match",
            title: "Match the inequality to its interval",
            pairs: [
              { left: m`$1 < x \leq 6$`, right: m`$(1;\ 6]$` },
              { left: m`$x \leq -2$ or $x \geq 2$`, right: m`$(-\infty;\ -2] \cup [2;\ \infty)$` },
              { left: m`$-4 \leq x < 0$`, right: m`$[-4;\ 0)$` },
              { left: m`$x > 3$`, right: m`$(3;\ \infty)$` },
            ],
          },
          { type: "callout", variant: "tip", md: m`$\infty$ always gets a round bracket – you can never actually reach infinity.` },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: ["Zero on one side, positive x², factorise.", "< 0: below the axis (between the roots, for a positive parabola).", "> 0: above the axis (outside the roots) – use 'or'.", "Multiply or divide by a negative → flip the sign."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "inequalities-quiz",
            questions: [
              { q: m`Solve: $(x - 1)(x - 4) < 0$`, options: [m`$x < 1$ or $x > 4$`, m`$1 < x < 4$`, m`$1 \leq x \leq 4$`, m`$x > 4$`], answer: 1, explain: "Positive parabola, < 0: between the roots, with open ends." },
              { q: m`Solve: $x^2 \geq 16$`, options: [m`$x \geq \pm 4$`, m`$-4 \leq x \leq 4$`, m`$x \leq -4$ or $x \geq 4$`, m`$x \geq 4$`], answer: 2, explain: m`$x^2 - 16 \geq 0 \Rightarrow (x - 4)(x + 4) \geq 0$: outside the roots, including them.` },
              { q: m`$-x^2 + 9 > 0$ is equivalent to…`, options: [m`$x^2 - 9 > 0$`, m`$x^2 - 9 < 0$`, m`$x^2 + 9 < 0$`, m`$x^2 > -9$`], answer: 1, explain: "Multiply by −1 and flip: x² − 9 < 0, so −3 < x < 3." },
              { q: m`In interval notation, $-1 \leq x < 5$ is…`, options: [m`$(-1;\ 5)$`, m`$[-1;\ 5]$`, m`$[-1;\ 5)$`, m`$(-1;\ 5]$`], answer: 2, explain: "≤ at −1 → square bracket; < at 5 → round bracket." },
              { q: m`The solution of $x^2 - 2x + 1 > 0$ is…`, options: [m`$x \neq 1$`, "no solution", m`$x = 1$`, "all real x"], answer: 0, explain: m`$(x - 1)^2 > 0$ for every $x$ except $x = 1$, where it equals 0.` },
              { q: m`Solve: $x^2 + 2x - 3 \geq 0$`, options: [m`$-3 \leq x \leq 1$`, m`$x \leq -3$ or $x \geq 1$`, m`$x \leq -1$ or $x \geq 3$`, m`$-1 \leq x \leq 3$`], answer: 1, explain: m`$(x + 3)(x - 1) \geq 0$: outside the roots −3 and 1, roots included.` },
            ],
          },
          { type: "exam", question: { id: "inequality-exam", q: m`Solve for $x$: $2x^2 - 5x - 3 > 0$`, marks: 3, level: "routine", memo: [m`$(2x + 1)(x - 3) > 0$ (factors)`, m`critical values $-\frac{1}{2}$ and $3$`, m`$x < -\frac{1}{2}$ or $x > 3$`] } },
        ],
      },
    ],
  },
  {
    slug: "simultaneous-equations",
    topic: "g11-equations",
    order: 4,
    title: "Simultaneous equations: line meets curve",
    tagline: "One linear, one quadratic – where do they cross?",
    emoji: "🎯",
    caps: "CAPS Gr 11 · Equations: solve simultaneous equations in two unknowns, one linear and one quadratic, algebraically and graphically.",
    objectives: [
      "Solve a linear and a quadratic equation simultaneously by substitution",
      "Write the solutions as coordinate pairs",
      "Interpret the solutions as points of intersection",
      "Use the discriminant to decide whether a line cuts, touches or misses a curve",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Simultaneous equations", def: "Two (or more) equations that must be true at the same time. Their solutions are the points the graphs share." },
      { term: "Substitution method", def: "Make one variable the subject of the LINEAR equation and substitute it into the other equation." },
      { term: "Point of intersection", def: "A point where two graphs meet – its coordinates satisfy both equations." },
      { term: "Tangent", def: "A line that touches a curve at exactly one point. Substituting gives a quadratic with Δ = 0." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Where the drone meets the hill",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A drone flies in a straight line $y = x + 5$ towards a hill shaped like $y = x^2 - 3x$. Where could it crash into the hill? Wherever **both** equations are true at once – the points of intersection.` },
          { type: "widget", widget: "intersection-lab" },
          { type: "text", md: m`A line and a parabola can meet at **two points, one point (a tangent) or not at all**. Sound familiar? That's the discriminant again.` },
        ],
      },
      {
        id: "method",
        title: "The substitution method",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Drone vs hill",
            problem: m`Solve simultaneously: $y = x + 5$ and $y = x^2 - 3x$`,
            steps: [
              { md: m`$x^2 - 3x = x + 5$`, why: "Both equal y, so set them equal (this IS substitution)." },
              { md: m`$x^2 - 4x - 5 = 0 \Rightarrow (x - 5)(x + 1) = 0$` },
              { md: m`$x = 5$ or $x = -1$` },
              { md: m`$y = 5 + 5 = 10$ and $y = -1 + 5 = 4$`, why: "Substitute back into the LINEAR equation – it's simpler." },
              { md: m`Solutions: $(5;\ 10)$ and $(-1;\ 4)$`, why: "Pair each x with its own y." },
            ],
          },
          {
            type: "worked",
            title: "When neither is 'y = '",
            problem: m`Solve simultaneously: $x + y = 5$ and $xy = 6$`,
            steps: [
              { md: m`$y = 5 - x$`, why: "Make y the subject of the linear equation." },
              { md: m`$x(5 - x) = 6 \Rightarrow 5x - x^2 = 6 \Rightarrow x^2 - 5x + 6 = 0$` },
              { md: m`$(x - 2)(x - 3) = 0 \Rightarrow x = 2 \text{ or } x = 3$` },
              { md: m`$y = 3$ or $y = 2$, so the solutions are $(2;\ 3)$ and $(3;\ 2)$.` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Substituting back into the **quadratic** can give extra y-values that don't fit the line. Always substitute into the **linear** equation, and present answers as pairs.` },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "simultaneous-practice",
            problems: [
              { q: m`Solve simultaneously: $y = x + 3$ and $y = x^2 + 1$. Give the $x$-values.`, answer: "2; -1", hint: "Set x² + 1 = x + 3.", solution: m`$$x^2 + 1 = x + 3 \Rightarrow x^2 - x - 2 = 0 \Rightarrow (x - 2)(x + 1) = 0$$

$x = 2$ or $x = -1$ (giving the points $(2;\ 5)$ and $(-1;\ 2)$).` },
              { q: m`For the same system, write down the point of intersection with the larger $x$-value.`, answer: "(2; 5)", kind: "point", solution: m`When $x = 2$: $y = 2 + 3 = 5$, so $(2;\ 5)$.` },
              { q: m`Solve: $y = 2x - 3$ and $y = x^2 - 2x + 1$. How many points of intersection are there?`, answer: "1", hint: "Substitute and look at the discriminant (or factorise).", solution: m`$$x^2 - 2x + 1 = 2x - 3 \Rightarrow x^2 - 4x + 4 = 0 \Rightarrow (x - 2)^2 = 0$$
\nOne (repeated) solution, $x = 2$: the line is a **tangent** at $(2;\ 1)$.` },
              { q: m`Solve simultaneously: $y - 2x = 1$ and $x^2 + y^2 = 2$. Give the $x$-values.`, answer: "1/5; -1", hint: "y = 2x + 1. Substitute into the second equation.", solution: m`$$x^2 + (2x + 1)^2 = 2 \Rightarrow 5x^2 + 4x + 1 = 2 \Rightarrow 5x^2 + 4x - 1 = 0$$
$$(5x - 1)(x + 1) = 0 \Rightarrow x = \tfrac{1}{5} \text{ or } x = -1$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["simultaneous"], title: "Line-meets-parabola drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Make x or y the subject of the LINEAR equation.", "Substitute into the quadratic, get = 0, solve.", "Substitute back into the linear equation; give coordinate pairs.", "Number of intersections = number of real roots (use Δ)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "simultaneous-quiz",
            questions: [
              { q: m`To solve $y = 3x - 1$ and $y = x^2 + 1$ simultaneously, the first step is…`, options: [m`$x^2 + 1 = 3x - 1$`, m`$x^2 + 1 = 0$`, m`$3x - 1 = 0$`, m`$y = x^2 + 3x$`], answer: 0, explain: "Both expressions equal y, so set them equal." },
              { q: m`If substituting gives $x^2 - 6x + 9 = 0$, the line…`, options: ["cuts the curve twice", "is a tangent to the curve", "misses the curve", "is parallel to the curve"], answer: 1, explain: m`$\Delta = 36 - 36 = 0$: one repeated root, so one point of contact.` },
              { q: m`The solutions of a linear–quadratic system are best written as…`, options: ["two separate lists of x and y", "coordinate pairs (x; y)", "a single number", "an interval"], answer: 1, explain: "Each solution is a point, so pair each x with its matching y." },
              { q: m`Which equation should you substitute back into to find y?`, options: ["The quadratic", "The linear one", "Either – it never matters", "Neither"], answer: 1, explain: "The linear equation gives exactly one y for each x – the quadratic can give extra, wrong values." },
              { q: m`$y = x^2 + 4$ and $y = 2$ have how many points of intersection?`, options: ["2", "1", "0", "infinitely many"], answer: 2, explain: m`$x^2 + 4 = 2 \Rightarrow x^2 = -2$: no real solutions. The parabola's lowest point is at $y = 4$.` },
            ],
          },
        ],
      },
    ],
  },
];
