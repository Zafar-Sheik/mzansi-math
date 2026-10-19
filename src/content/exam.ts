import type { ExamQuestion } from "./types";

const m = String.raw;

/** A point on a circle of radius 3 centred at the origin (for exam figures). */
const on = (deg: number): [number, number] => [Math.round(3 * Math.cos((deg * Math.PI) / 180) * 1000) / 1000, Math.round(3 * Math.sin((deg * Math.PI) / 180) * 1000) / 1000];

/**
 * NSC-style exam questions. Every memo line is worth one mark (one tick),
 * like the DBE marking guidelines; follow-on (CA) marks are noted in the memos.
 */
export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: "g11-exponents-1",
    topic: "g11-exponents",
    title: "Exponents, surds & equations",
    parts: [
      { q: m`Simplify without using a calculator: $\dfrac{2^{x+2} \cdot 6^{x}}{12^{x} \cdot 4}$`, marks: 3, level: "routine", memo: [m`$= \dfrac{2^{x+2} \cdot 2^{x} \cdot 3^{x}}{2^{2x} \cdot 3^{x} \cdot 2^{2}}$ (prime bases)`, m`$= 2^{x + 2 + x - 2x - 2} \cdot 3^{x - x}$`, m`$= 1$`] },
      { q: m`Simplify: $\sqrt{50} - \sqrt{18} + \sqrt{32}$`, marks: 3, level: "routine", memo: [m`$5\sqrt{2}$`, m`$3\sqrt{2}$ and $4\sqrt{2}$`, m`$= 6\sqrt{2}$`] },
      { q: m`Solve for $x$: $2^{2x} - 6 \cdot 2^{x} + 8 = 0$`, marks: 4, level: "complex", memo: [m`Let $k = 2^x$: $k^2 - 6k + 8 = 0$`, m`$(k - 2)(k - 4) = 0$`, m`$2^x = 2 \Rightarrow x = 1$`, m`$2^x = 4 \Rightarrow x = 2$`] },
      { q: m`Solve for $x$: $\sqrt{x + 7} = x + 1$`, marks: 5, level: "complex", memo: [m`$x + 7 = x^2 + 2x + 1$ (squaring both sides)`, m`$x^2 + x - 6 = 0$`, m`$(x + 3)(x - 2) = 0$`, m`$x = 2$ or $x = -3$`, m`$x = -3$ rejected: $\sqrt{4} = 2 \neq -2$; so $x = 2$`] },
    ],
  },
  {
    id: "g11-equations-1",
    topic: "g11-equations",
    title: "Equations, inequalities & a system",
    parts: [
      { q: m`Solve for $x$: $x(x - 5) = 14$`, marks: 3, level: "routine", memo: [m`$x^2 - 5x - 14 = 0$`, m`$(x - 7)(x + 2) = 0$`, m`$x = 7$ or $x = -2$`] },
      { q: m`Solve for $x$, correct to TWO decimal places: $3x^2 - 2x - 4 = 0$`, marks: 4, level: "routine", memo: [m`$x = \dfrac{2 \pm \sqrt{(-2)^2 - 4(3)(-4)}}{2(3)}$ (substitution into the formula)`, m`$= \dfrac{2 \pm \sqrt{52}}{6}$`, m`$x = 1{,}54$`, m`$x = -0{,}87$`] },
      { q: m`Solve for $x$: $x^2 + 2x - 15 \leq 0$`, marks: 3, level: "routine", memo: [m`$(x + 5)(x - 3) \leq 0$`, m`critical values $-5$ and $3$`, m`$-5 \leq x \leq 3$`] },
      { q: m`Solve for $x$ and $y$ simultaneously: $y = 2x - 1$ and $x^2 + xy = 4$`, marks: 6, level: "complex", memo: [m`$x^2 + x(2x - 1) = 4$ (substitution)`, m`$3x^2 - x - 4 = 0$`, m`$(3x - 4)(x + 1) = 0$`, m`$x = \frac{4}{3}$ or $x = -1$`, m`$y = \frac{5}{3}$`, m`$y = -3$`] },
    ],
  },
  {
    id: "g11-equations-2",
    topic: "g11-equations",
    title: "Nature of the roots",
    parts: [
      { q: m`Without solving, determine the nature of the roots of $2x^2 - 3x - 5 = 0$.`, marks: 3, level: "routine", memo: [m`$\Delta = (-3)^2 - 4(2)(-5)$`, m`$\Delta = 49$`, "real, rational and unequal"] },
      { q: m`Determine the values of $k$ for which $x^2 - (k + 1)x + 4 = 0$ has equal roots.`, marks: 4, level: "complex", memo: [m`$\Delta = (k + 1)^2 - 4(1)(4)$`, m`$(k + 1)^2 - 16 = 0$`, m`$k + 1 = \pm 4$`, m`$k = 3$ or $k = -5$`] },
      { q: m`Show that the roots of $x^2 + kx + k - 1 = 0$ are real for all real values of $k$.`, marks: 3, level: "problem-solving", memo: [m`$\Delta = k^2 - 4(1)(k - 1) = k^2 - 4k + 4$`, m`$= (k - 2)^2$`, m`$(k - 2)^2 \geq 0$ for all $k$, so the roots are real`] },
    ],
  },
  {
    id: "g11-patterns-1",
    topic: "g11-patterns",
    title: "A quadratic pattern",
    source: m`Consider the quadratic pattern: $1;\ 6;\ 15;\ 28;\ \dots$`,
    parts: [
      { q: "Write down the next term of the pattern.", marks: 1, level: "knowledge", memo: [m`$45$ (first differences $5;\ 9;\ 13;\ 17$)`] },
      { q: m`Determine the general term $T_n$.`, marks: 4, level: "routine", memo: [m`second difference $= 4$, so $2a = 4 \Rightarrow a = 2$`, m`$3a + b = 5 \Rightarrow b = -1$`, m`$a + b + c = 1 \Rightarrow c = 0$`, m`$T_n = 2n^2 - n$`] },
      { q: m`Calculate $T_{30}$.`, marks: 2, level: "routine", memo: [m`$T_{30} = 2(30)^2 - 30$`, m`$= 1770$`] },
      { q: m`Which term of the pattern is equal to $1225$?`, marks: 4, level: "complex", memo: [m`$2n^2 - n = 1225$`, m`$2n^2 - n - 1225 = 0$`, m`$(2n + 49)(n - 25) = 0$`, m`$n = 25$ ($n = -\frac{49}{2}$ rejected): the 25th term`] },
    ],
  },
  {
    id: "g11-patterns-2",
    topic: "g11-patterns",
    title: "Stadium seating",
    source: m`A stand at a stadium has 20 seats in row 1, 24 seats in row 2, 30 seats in row 3 and 38 seats in row 4. The pattern continues.`,
    parts: [
      { q: m`Determine a formula for $T_n$, the number of seats in row $n$.`, marks: 4, level: "routine", memo: [m`first differences $4;\ 6;\ 8$; second difference $2 \Rightarrow a = 1$`, m`$3(1) + b = 4 \Rightarrow b = 1$`, m`$1 + 1 + c = 20 \Rightarrow c = 18$`, m`$T_n = n^2 + n + 18$`] },
      { q: "How many seats are in row 25?", marks: 2, level: "routine", memo: [m`$T_{25} = 25^2 + 25 + 18$`, m`$= 668$ seats`] },
      { q: "Which row has 438 seats?", marks: 3, level: "complex", memo: [m`$n^2 + n + 18 = 438 \Rightarrow n^2 + n - 420 = 0$`, m`$(n + 21)(n - 20) = 0$`, m`row 20 ($n = -21$ rejected)`] },
      { q: "Between which two consecutive rows does the number of seats increase by 50?", marks: 3, level: "problem-solving", memo: [m`general first difference: $2n + 2$`, m`$2n + 2 = 50 \Rightarrow n = 24$`, "between row 24 and row 25"] },
    ],
  },
  {
    id: "g11-functions-1",
    topic: "g11-functions",
    title: "A parabola and a line",
    source: m`The graphs of $f(x) = -x^2 + 2x + 3$ and $g(x) = x + 1$ are sketched below.`,
    figure: { widget: "sketch", props: { view: { xMin: -3, xMax: 5, yMin: -4, yMax: 6 }, curves: [{ expr: "-x^2 + 2x + 3", label: "f" }, { expr: "x + 1", label: "g" }] } },
    parts: [
      { q: m`Determine the x-intercepts of $f$.`, marks: 3, level: "routine", memo: [m`$-x^2 + 2x + 3 = 0 \Rightarrow x^2 - 2x - 3 = 0$`, m`$(x - 3)(x + 1) = 0$`, m`$(-1;\ 0)$ and $(3;\ 0)$`] },
      { q: m`Determine the coordinates of the turning point of $f$.`, marks: 3, level: "routine", memo: [m`$x = -\dfrac{b}{2a} = -\dfrac{2}{2(-1)} = 1$`, m`$f(1) = -1 + 2 + 3 = 4$`, m`$(1;\ 4)$`] },
      { q: m`Write $f$ in the form $y = a(x + p)^2 + q$.`, marks: 2, level: "routine", memo: [m`$a = -1$`, m`$y = -(x - 1)^2 + 4$`] },
      { q: m`Determine the points of intersection of $f$ and $g$.`, marks: 4, level: "routine", memo: [m`$-x^2 + 2x + 3 = x + 1$`, m`$x^2 - x - 2 = 0 \Rightarrow (x - 2)(x + 1) = 0$`, m`$x = 2$ or $x = -1$`, m`$(2;\ 3)$ and $(-1;\ 0)$`] },
      { q: m`For which values of $x$ is $f(x) \geq g(x)$?`, marks: 2, level: "complex", memo: [m`$-1 \leq x \leq 2$ (both endpoints)`, "correct inequality signs (inclusive)"] },
      { q: m`Write down the range of $f$.`, marks: 1, level: "knowledge", memo: [m`$y \leq 4$`] },
      { q: m`Calculate the average gradient of $f$ between $x = 0$ and $x = 2$.`, marks: 2, level: "routine", memo: [m`$\dfrac{f(2) - f(0)}{2 - 0} = \dfrac{3 - 3}{2}$`, m`$= 0$`] },
    ],
  },
  {
    id: "g11-functions-2",
    topic: "g11-functions",
    title: "A hyperbola",
    source: m`Given: $h(x) = \dfrac{2}{x - 1} + 1$`,
    parts: [
      { q: m`Write down the equations of the asymptotes of $h$.`, marks: 2, level: "knowledge", memo: [m`$x = 1$`, m`$y = 1$`] },
      { q: m`Determine the intercepts of $h$ with the axes.`, marks: 4, level: "routine", memo: [m`$h(0) = \dfrac{2}{-1} + 1$`, m`y-intercept $(0;\ -1)$`, m`$\dfrac{2}{x - 1} = -1 \Rightarrow x - 1 = -2$`, m`x-intercept $(-1;\ 0)$`] },
      { q: m`Determine the equation of the axis of symmetry of $h$ that has a negative gradient.`, marks: 2, level: "routine", memo: [m`$y = -(x - 1) + 1$`, m`$y = -x + 2$`] },
      { q: m`Write down the domain and range of $h$.`, marks: 2, level: "knowledge", memo: [m`domain: $x \in \mathbb{R},\ x \neq 1$`, m`range: $y \in \mathbb{R},\ y \neq 1$`] },
      { q: m`The graph of $h$ is shifted 3 units to the left. Write down the equation of the new graph.`, marks: 2, level: "complex", memo: [m`$\dfrac{2}{x + 2}$`, m`$y = \dfrac{2}{x + 2} + 1$`] },
    ],
  },
  {
    id: "g11-functions-3",
    topic: "g11-functions",
    title: "Exponential graphs",
    source: m`Given: $f(x) = 3 \cdot 2^{x} - 6$`,
    figure: { widget: "sketch", props: { view: { xMin: -5, xMax: 4, yMin: -8, yMax: 8 }, curves: [{ expr: "3*2^x - 6", label: "f" }], guides: [{ y: -6 }] } },
    parts: [
      { q: m`Write down the equation of the asymptote of $f$.`, marks: 1, level: "knowledge", memo: [m`$y = -6$`] },
      { q: m`Determine the intercepts of $f$ with the axes.`, marks: 4, level: "routine", memo: [m`$f(0) = 3 - 6 = -3$: $(0;\ -3)$`, m`$3 \cdot 2^{x} = 6$`, m`$2^{x} = 2$`, m`$x = 1$: $(1;\ 0)$`] },
      { q: m`Write down the range of $f$.`, marks: 1, level: "knowledge", memo: [m`$y > -6$`] },
      { q: m`The graph of $g(x) = b^{x}$ passes through $\left(-2;\ \frac{9}{4}\right)$. Determine $b$.`, marks: 3, level: "complex", memo: [m`$b^{-2} = \frac{9}{4}$`, m`$b^{2} = \frac{4}{9}$`, m`$b = \frac{2}{3}$ ($b > 0$)`] },
      { q: m`Is $g$ increasing or decreasing? Give a reason.`, marks: 1, level: "knowledge", memo: [m`decreasing, because $0 < b < 1$`] },
    ],
  },
  {
    id: "g11-finance-1",
    topic: "g11-finance",
    title: "Saving and depreciation",
    parts: [
      { q: m`Lerato invests R12 500 at 7,2% p.a. compounded monthly. Calculate the value of her investment after 5 years.`, marks: 3, level: "routine", memo: [m`$A = 12\,500\left(1 + \frac{0{,}072}{12}\right)^{60}$`, m`correct $i$ and $n$`, m`$A = \text{R}17\,897{,}36$`] },
      { q: "Calculate the effective annual interest rate of Lerato's investment.", marks: 3, level: "routine", memo: [m`$1 + i_{\text{eff}} = \left(1 + \frac{0{,}072}{12}\right)^{12}$`, m`$i_{\text{eff}} = 0{,}0744$`, m`$= 7{,}44\%$`] },
      { q: m`A car costing R320 000 depreciates at 14% p.a. on the reducing-balance method. Calculate its value after 6 years.`, marks: 3, level: "routine", memo: [m`$A = 320\,000(1 - 0{,}14)^{6}$`, m`correct substitution`, m`$A = \text{R}129\,461{,}52$`] },
      { q: m`If the same car depreciated at 14% p.a. on the straight-line method, after how many years would it be worth R0?`, marks: 2, level: "complex", memo: [m`$0 = 320\,000(1 - 0{,}14n)$`, m`$n = 7{,}14$ years (during the 8th year)`] },
      { q: m`R8 000 grows to R11 500 in 5 years. Calculate the annual interest rate, compounded quarterly.`, marks: 4, level: "complex", memo: [m`$11\,500 = 8000\left(1 + \frac{i}{4}\right)^{20}$`, m`$1 + \frac{i}{4} = 1{,}4375^{\frac{1}{20}}$`, m`$i = 4\left(1{,}4375^{\frac{1}{20}} - 1\right)$`, m`$i = 7{,}32\%$ p.a.`] },
    ],
  },
  {
    id: "g11-finance-2",
    topic: "g11-finance",
    title: "A timeline with a changing rate",
    source: m`Sipho deposits R15 000 into a savings account. Two years later he deposits another R10 000. Interest is 10% p.a. compounded quarterly for the first 3 years, and 8% p.a. compounded monthly after that.`,
    parts: [
      { q: m`Calculate the value of the first deposit (R15 000) at the end of 5 years.`, marks: 3, level: "complex", memo: [m`$15\,000\left(1 + \frac{0{,}1}{4}\right)^{12}$`, m`$\times \left(1 + \frac{0{,}08}{12}\right)^{24}$`, m`$= \text{R}23\,661{,}06$`] },
      { q: m`Calculate the value of the second deposit (R10 000) at the end of 5 years.`, marks: 3, level: "complex", memo: [m`$10\,000\left(1 + \frac{0{,}1}{4}\right)^{4}$`, m`$\times \left(1 + \frac{0{,}08}{12}\right)^{24}$`, m`$= \text{R}12\,946{,}49$`] },
      { q: "What is the total in the account after 5 years?", marks: 1, level: "routine", memo: [m`$\text{R}36\,607{,}55$`] },
    ],
  },
  {
    id: "g11-analytical-1",
    topic: "g11-analytical",
    title: "A right-angled triangle on the plane",
    source: m`$A(-3;\ 2)$, $B(5;\ 6)$ and $C(1;\ -6)$ are the vertices of $\triangle ABC$.`,
    figure: { widget: "sketch", props: { view: { xMin: -6, xMax: 8, yMin: -8, yMax: 8 }, curves: [{ expr: "0.5x + 3.5", from: -3, to: 5, label: "AB" }, { expr: "-2x - 4", from: -3, to: 1, label: "AC" }, { expr: "3x - 9", from: 1, to: 5, label: "BC" }], points: [{ x: -3, y: 2, label: "A" }, { x: 5, y: 6, label: "B" }, { x: 1, y: -6, label: "C" }] } },
    parts: [
      { q: m`Calculate the length of $AB$ in simplest surd form.`, marks: 2, level: "routine", memo: [m`$AB = \sqrt{(5 + 3)^2 + (6 - 2)^2} = \sqrt{80}$`, m`$= 4\sqrt{5}$`] },
      { q: m`Determine the coordinates of $M$, the midpoint of $AB$.`, marks: 2, level: "knowledge", memo: [m`$x_M = \frac{-3 + 5}{2} = 1$`, m`$M(1;\ 4)$`] },
      { q: m`Prove that $\hat{A} = 90^\circ$.`, marks: 3, level: "routine", memo: [m`$m_{AB} = \frac{6 - 2}{5 + 3} = \frac{1}{2}$`, m`$m_{AC} = \frac{-6 - 2}{1 + 3} = -2$`, m`$m_{AB} \times m_{AC} = -1$, so $AB \perp AC$ and $\hat{A} = 90^\circ$`] },
      { q: m`Determine the equation of $BC$.`, marks: 3, level: "routine", memo: [m`$m_{BC} = \frac{-6 - 6}{1 - 5} = 3$`, m`$y - 6 = 3(x - 5)$`, m`$y = 3x - 9$`] },
      { q: m`Calculate the inclination of $BC$.`, marks: 2, level: "routine", memo: [m`$\tan\theta = 3$`, m`$\theta = 71{,}57^\circ$`] },
      { q: m`Calculate the area of $\triangle ABC$.`, marks: 3, level: "complex", memo: [m`$AC = \sqrt{16 + 64} = 4\sqrt{5}$`, m`Area $= \frac{1}{2} \times AB \times AC$ (right angle at A)`, m`$= \frac{1}{2}(4\sqrt{5})(4\sqrt{5}) = 40$ square units`] },
    ],
  },
  {
    id: "g11-analytical-2",
    topic: "g11-analytical",
    title: "Perpendicular from a point",
    source: m`Line $\ell$ has equation $x + 3y = 6$. Point $P(2;\ -1)$ is not on $\ell$.`,
    parts: [
      { q: m`Write down the gradient of $\ell$.`, marks: 1, level: "knowledge", memo: [m`$y = -\frac{1}{3}x + 2$, so $m = -\frac{1}{3}$`] },
      { q: m`Determine the equation of the line through $P$ perpendicular to $\ell$.`, marks: 3, level: "routine", memo: [m`$m_\perp = 3$`, m`$y + 1 = 3(x - 2)$`, m`$y = 3x - 7$`] },
      { q: m`Determine the coordinates of $F$, where the two lines meet.`, marks: 3, level: "complex", memo: [m`$3x - 7 = -\frac{1}{3}x + 2$`, m`$10x = 27 \Rightarrow x = 2{,}7$`, m`$F(2{,}7;\ 1{,}1)$`] },
      { q: m`Hence calculate the shortest distance from $P$ to $\ell$ (two decimals).`, marks: 2, level: "complex", memo: [m`$PF = \sqrt{(2{,}7 - 2)^2 + (1{,}1 + 1)^2} = \sqrt{4{,}9}$`, m`$= 2{,}21$ units`] },
      { q: m`The point $(k;\ 5)$ lies on the perpendicular line. Find $k$.`, marks: 2, level: "routine", memo: [m`$5 = 3k - 7$`, m`$k = 4$`] },
    ],
  },
  {
    id: "g11-euclidean-1",
    topic: "g11-euclidean",
    title: "Centre, cyclic quad and an isosceles triangle",
    source: m`$O$ is the centre of the circle. $A$, $B$, $C$ and $D$ lie on the circle, and $A\hat{B}C = 112^\circ$.`,
    figure: { widget: "figure", props: { points: { O: [0, 0], A: on(202), B: on(270), C: on(338), D: on(100) }, circles: [{ centre: "O", r: 3 }], segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["O", "A"], ["O", "C"], ["A", "C"]], angles: [{ at: "B", from: "A", to: "C", label: "112°" }] } },
    parts: [
      { q: m`Calculate $A\hat{D}C$. Give a reason.`, marks: 2, level: "knowledge", memo: [m`$A\hat{D}C = 68^\circ$`, "(opp ∠s of cyclic quad)"] },
      { q: m`Calculate $A\hat{O}C$. Give a reason.`, marks: 2, level: "routine", memo: [m`$A\hat{O}C = 136^\circ$`, "(∠ at centre = 2 × ∠ at circumference)"] },
      { q: m`Calculate $O\hat{A}C$. Give reasons.`, marks: 3, level: "routine", memo: [m`$OA = OC$ (radii)`, m`$O\hat{A}C = O\hat{C}A$ (∠s opp equal sides)`, m`$O\hat{A}C = \frac{180^\circ - 136^\circ}{2} = 22^\circ$ (sum of ∠s in Δ)`] },
    ],
  },
  {
    id: "g11-euclidean-2",
    topic: "g11-euclidean",
    title: "Two tangents",
    source: m`$PA$ and $PB$ are tangents to the circle with centre $O$ at $A$ and $B$. $C$ is a point on the major arc $AB$ and $A\hat{P}B = 48^\circ$.`,
    figure: { widget: "figure", props: { points: { O: [0, 0], A: on(204), B: on(336), P: [0, -7.376], C: on(100) }, circles: [{ centre: "O", r: 3 }], segments: [["P", "A"], ["P", "B"], ["A", "B"], ["C", "A"], ["C", "B"], { from: "O", to: "A", dashed: true }, { from: "O", to: "B", dashed: true }], angles: [{ at: "P", from: "A", to: "B", label: "48°" }] } },
    parts: [
      { q: m`Calculate $P\hat{A}B$. Give reasons.`, marks: 3, level: "routine", memo: [m`$PA = PB$ (tans from common pt)`, m`$P\hat{A}B = P\hat{B}A$ (∠s opp equal sides)`, m`$P\hat{A}B = 66^\circ$ (sum of ∠s in Δ)`] },
      { q: m`Calculate $A\hat{C}B$. Give a reason.`, marks: 2, level: "routine", memo: [m`$A\hat{C}B = 66^\circ$`, "(tan chord theorem)"] },
      { q: m`Prove that $OAPB$ is a cyclic quadrilateral.`, marks: 3, level: "complex", memo: [m`$O\hat{A}P = 90^\circ$ (tan ⊥ radius)`, m`$O\hat{B}P = 90^\circ$ (tan ⊥ radius)`, m`$O\hat{A}P + O\hat{B}P = 180^\circ$, so $OAPB$ is cyclic (converse: opp ∠s of quad supp)`] },
    ],
  },
  {
    id: "g11-euclidean-3",
    topic: "g11-euclidean",
    title: "Prove a theorem",
    parts: [
      { q: m`Prove the theorem that states that the angle subtended by an arc at the centre of a circle is double the size of the angle subtended by the same arc at the circle (on the same side of the chord). Use a diagram with centre $O$, arc $AB$ and point $C$ on the circle.`, marks: 5, level: "knowledge", memo: [m`Construction: join $CO$ and produce to $D$`, m`$\hat{A} = \hat{C}_1$ (∠s opp equal sides; $OA = OC$, radii)`, m`$\hat{O}_1 = \hat{A} + \hat{C}_1 = 2\hat{C}_1$ (ext ∠ of Δ)`, m`Similarly $\hat{O}_2 = 2\hat{C}_2$`, m`$A\hat{O}B = \hat{O}_1 + \hat{O}_2 = 2(\hat{C}_1 + \hat{C}_2) = 2A\hat{C}B$`] },
    ],
  },
  {
    id: "g11-measurement-1",
    topic: "g11-measurement",
    title: "A grain silo",
    source: m`A silo is a cylinder with radius 2 m and height 6 m, with a cone-shaped roof of perpendicular height 1,5 m. Use $V_{\text{cone}} = \tfrac{1}{3}\pi r^2 h$ and curved surface of a cone $= \pi r s$.`,
    figure: { widget: "solid-viewer", props: { solid: "cylinder" } },
    parts: [
      { q: "Calculate the volume of the silo (two decimals).", marks: 3, level: "routine", memo: [m`$V = \pi(2)^2(6) + \tfrac{1}{3}\pi(2)^2(1{,}5)$`, m`$= 24\pi + 2\pi = 26\pi$`, m`$= 81{,}68$ m³`] },
      { q: "Calculate the area of the roof (two decimals).", marks: 3, level: "routine", memo: [m`$s = \sqrt{2^2 + 1{,}5^2} = 2{,}5$ m`, m`$\pi r s = \pi(2)(2{,}5)$`, m`$= 15{,}71$ m²`] },
      { q: "A new silo is built with every dimension doubled. What is its volume?", marks: 2, level: "complex", memo: [m`$V_{\text{new}} = 2^3 \times 26\pi$`, m`$= 653{,}45$ m³`] },
    ],
  },
  {
    id: "g11-trig-1",
    topic: "g11-trig",
    title: "Reduction, identities and CAST",
    parts: [
      { q: m`Without a calculator, evaluate: $\sin 150^\circ \cdot \tan 225^\circ - \cos 300^\circ$`, marks: 4, level: "routine", memo: [m`$\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$`, m`$\tan 225^\circ = \tan 45^\circ = 1$`, m`$\cos 300^\circ = \cos 60^\circ = \frac{1}{2}$`, m`$\frac{1}{2}(1) - \frac{1}{2} = 0$`] },
      { q: m`Simplify: $\dfrac{\sin(180^\circ + x)\cos(90^\circ - x)}{\tan(360^\circ - x)\cos(-x)}$`, marks: 5, level: "complex", memo: [m`$-\sin x$`, m`$\sin x$`, m`$-\tan x$`, m`$\cos x$`, m`$= \dfrac{-\sin^2 x}{-\frac{\sin x}{\cos x} \cos x} = \sin x$`] },
      { q: m`If $13\cos\theta + 5 = 0$ and $90^\circ \leq \theta \leq 180^\circ$, calculate without a calculator the value of $13\sin\theta + 5\tan\theta$.`, marks: 4, level: "complex", memo: [m`$x = -5$, $r = 13$ (quadrant 2)`, m`$y = 12$ (Pythagoras)`, m`$\sin\theta = \frac{12}{13}$ and $\tan\theta = -\frac{12}{5}$`, m`$13\left(\frac{12}{13}\right) + 5\left(-\frac{12}{5}\right) = 0$`] },
      { q: m`Prove that $\dfrac{1}{\cos x} - \cos x = \sin x\tan x$.`, marks: 3, level: "routine", memo: [m`LHS $= \dfrac{1 - \cos^2 x}{\cos x}$`, m`$= \dfrac{\sin^2 x}{\cos x}$`, m`$= \sin x \cdot \dfrac{\sin x}{\cos x} = \sin x \tan x$`] },
    ],
  },
  {
    id: "g11-trig-2",
    topic: "g11-trig",
    title: "Trig equations",
    parts: [
      { q: m`Determine the general solution of $2\sin x + 1 = 0$.`, marks: 3, level: "routine", memo: [m`$\sin x = -\frac{1}{2}$; reference angle $30^\circ$`, m`$x = 210^\circ + k \cdot 360^\circ$`, m`or $x = 330^\circ + k \cdot 360^\circ$, $k \in \mathbb{Z}$`] },
      { q: m`Hence write down the solutions for $x \in [-180^\circ;\ 180^\circ]$.`, marks: 2, level: "routine", memo: [m`$x = -150^\circ$`, m`$x = -30^\circ$`] },
      { q: m`Determine the general solution of $2\cos^2 x - \cos x - 1 = 0$.`, marks: 5, level: "complex", memo: [m`$(2\cos x + 1)(\cos x - 1) = 0$`, m`$\cos x = -\frac{1}{2}$ or $\cos x = 1$`, m`$x = 120^\circ + k \cdot 360^\circ$`, m`or $x = 240^\circ + k \cdot 360^\circ$`, m`or $x = k \cdot 360^\circ$, $k \in \mathbb{Z}$`] },
    ],
  },
  {
    id: "g11-trig-3",
    topic: "g11-trig",
    title: "Trig graphs",
    source: m`The graphs of $f(x) = 2\sin x$ and $g(x) = \cos 2x$ are sketched for $x \in [-180^\circ;\ 180^\circ]$.`,
    figure: { widget: "sketch", props: { view: { xMin: -190, xMax: 190, yMin: -2.5, yMax: 2.5 }, xStep: 90, yStep: 1, curves: [{ expr: "2*sin(x)", label: "f" }, { expr: "cos(2x)", label: "g" }] } },
    parts: [
      { q: m`Write down the period of $g$.`, marks: 1, level: "knowledge", memo: [m`$180^\circ$`] },
      { q: m`Write down the range of $f$.`, marks: 1, level: "knowledge", memo: [m`$-2 \leq y \leq 2$`] },
      { q: m`Write down the amplitude of $g$.`, marks: 1, level: "knowledge", memo: [m`$1$`] },
      { q: m`For which values of $x$ in the given interval is $f$ increasing?`, marks: 2, level: "routine", memo: [m`$-90^\circ \leq x$`, m`$x \leq 90^\circ$`] },
      { q: m`Describe how the graph of $f$ must be shifted to obtain $h(x) = 2\sin(x + 30^\circ)$.`, marks: 1, level: "routine", memo: [m`$30^\circ$ to the left`] },
    ],
  },
  {
    id: "g11-trig-4",
    topic: "g11-trig",
    title: "Two buoys and a harbour",
    source: m`From harbour $H$, buoy $A$ is 12 km away and buoy $B$ is 15 km away. $A\hat{H}B = 72^\circ$.`,
    parts: [
      { q: m`Calculate the distance $AB$ (two decimals).`, marks: 3, level: "routine", memo: [m`$AB^2 = 12^2 + 15^2 - 2(12)(15)\cos 72^\circ$`, m`$AB^2 = 257{,}75$`, m`$AB = 16{,}05$ km`] },
      { q: m`Calculate the area of $\triangle AHB$ (two decimals).`, marks: 2, level: "routine", memo: [m`Area $= \tfrac{1}{2}(12)(15)\sin 72^\circ$`, m`$= 85{,}60$ km²`] },
      { q: m`Calculate $H\hat{A}B$ (one decimal).`, marks: 3, level: "complex", memo: [m`$\dfrac{\sin H\hat{A}B}{15} = \dfrac{\sin 72^\circ}{16{,}05}$`, m`$\sin H\hat{A}B = 0{,}8886$`, m`$H\hat{A}B = 62{,}7^\circ$`] },
    ],
  },
];
