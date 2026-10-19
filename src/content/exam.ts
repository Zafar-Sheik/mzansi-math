import type { ExamQuestion } from "./types";

const m = String.raw;

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
];
