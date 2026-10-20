import type { ExamQuestion } from "./types";

const m = String.raw;

/**
 * Phase 6 exam questions: statistics and probability for both grades, plus
 * extra questions on the other topics so that full mock papers come close to
 * the NSC's 150 marks. Same conventions as exam.ts (one memo line per mark).
 */
export const MORE_EXAM_QUESTIONS: ExamQuestion[] = [
  // ------------------------------------------------------------ Grade 11 Paper 1
  {
    id: "g11-functions-4",
    topic: "g11-functions",
    title: "A hyperbola",
    source: m`Given $f(x) = \dfrac{3}{x - 1} + 2$.`,
    figure: { widget: "sketch", props: { view: { xMin: -6, xMax: 8, yMin: -6, yMax: 8 }, curves: [{ expr: "3/(x - 1) + 2", label: "f" }] } },
    parts: [
      { q: m`Write down the equations of the asymptotes of $f$.`, marks: 2, level: "knowledge", memo: [m`$x = 1$`, m`$y = 2$`] },
      { q: m`Determine the intercepts of $f$ with the axes.`, marks: 3, level: "routine", memo: [m`y-intercept: $f(0) = -3 + 2 = -1$`, m`$\frac{3}{x - 1} = -2 \Rightarrow x - 1 = -\frac{3}{2}$`, m`x-intercept: $x = -\frac{1}{2}$`] },
      { q: m`Determine the equation of the axis of symmetry of $f$ that has a positive gradient.`, marks: 2, level: "routine", memo: [m`passes through $(1;\ 2)$ with gradient 1`, m`$y = x + 1$`] },
      { q: m`Write down the domain of $f$.`, marks: 1, level: "knowledge", memo: [m`$x \in \mathbb{R},\ x \neq 1$`] },
    ],
  },
  {
    id: "g11-probability-1",
    topic: "g11-probability",
    title: "Gym and swimming",
    source: m`In a survey of 120 learners, 58 go to gym (G), 45 swim (S) and 35 do neither.`,
    parts: [
      { q: m`Determine how many learners do both activities.`, marks: 3, level: "routine", memo: [m`$n(G \text{ or } S) = 120 - 35 = 85$`, m`$85 = 58 + 45 - x$`, m`$x = 18$`] },
      { q: m`A learner is chosen at random. Calculate the probability that the learner goes to gym only.`, marks: 2, level: "routine", memo: [m`$58 - 18 = 40$`, m`$P = \frac{40}{120} = \frac{1}{3}$`] },
      { q: m`Are the events G and S independent? Show your working.`, marks: 3, level: "complex", memo: [m`$P(G) \times P(S) = \frac{58}{120} \times \frac{45}{120} = 0{,}18$`, m`$P(G \text{ and } S) = \frac{18}{120} = 0{,}15$`, "not equal, so G and S are NOT independent"] },
      { q: m`Calculate $P(\text{not } G)$.`, marks: 1, level: "knowledge", memo: [m`$\frac{62}{120} = \frac{31}{60}$`] },
    ],
  },
  {
    id: "g11-probability-2",
    topic: "g11-probability",
    title: "Two soccer matches",
    source: m`A school soccer team plays two matches. The probability of winning the first match is $0{,}6$. If they win a match, the probability of winning the next one is $0{,}7$; if they lose, it is $0{,}4$.`,
    parts: [
      { q: "Calculate the probability that the team wins both matches.", marks: 2, level: "routine", memo: [m`$0{,}6 \times 0{,}7$`, m`$= 0{,}42$`] },
      { q: "Calculate the probability that the team wins exactly one match.", marks: 3, level: "routine", memo: [m`$0{,}6 \times 0{,}3 = 0{,}18$`, m`$0{,}4 \times 0{,}4 = 0{,}16$`, m`$0{,}18 + 0{,}16 = 0{,}34$`] },
      { q: "Calculate the probability that the team wins at least one match.", marks: 3, level: "complex", memo: [m`$P(\text{lose both}) = 0{,}4 \times 0{,}6$`, m`$= 0{,}24$`, m`$1 - 0{,}24 = 0{,}76$`] },
      { q: "Are the results of the two matches independent? Explain.", marks: 2, level: "problem-solving", memo: [m`$P(\text{win 2nd}) = 0{,}42 + 0{,}16 = 0{,}58$`, m`but after a win it is $0{,}7 \neq 0{,}58$, so the results are dependent`] },
    ],
  },
  // ------------------------------------------------------------ Grade 11 Paper 2
  {
    id: "g11-statistics-1",
    topic: "g11-statistics",
    title: "Test marks and a box plot",
    source: m`The marks (out of 100) of 15 learners: $22;\ 35;\ 38;\ 41;\ 45;\ 47;\ 50;\ 52;\ 55;\ 58;\ 60;\ 63;\ 67;\ 70;\ 99$`,
    parts: [
      { q: "Write down the five-number summary of the data.", marks: 3, level: "routine", memo: [m`min $= 22$ and max $= 99$`, m`$Q_1 = 41$ and $Q_3 = 63$`, m`median $= 52$`] },
      { q: "Calculate the interquartile range.", marks: 1, level: "knowledge", memo: [m`$63 - 41 = 22$`] },
      { q: m`Show that $99$ is an outlier.`, marks: 2, level: "routine", memo: [m`$Q_3 + 1{,}5 \times \text{IQR} = 63 + 33 = 96$`, m`$99 > 96$, so 99 is an outlier`] },
      { q: "Calculate the mean and the standard deviation of the marks.", marks: 3, level: "routine", memo: [m`$\bar{x} = \frac{802}{15}$`, m`$= 53{,}47$`, m`$\sigma = 17{,}40$`] },
      { q: "Is the data symmetric, positively skewed or negatively skewed? Give a reason.", marks: 2, level: "complex", memo: [m`mean $(53{,}47) >$ median $(52)$`, "so slightly positively skewed (skewed to the right)"] },
    ],
  },
  {
    id: "g11-statistics-2",
    topic: "g11-statistics",
    title: "Running times and an ogive",
    source: m`The times taken by 60 learners to run 2 km:

| Time (min) | Frequency |
|---|---|
| $8 \leq t < 10$ | 5 |
| $10 \leq t < 12$ | 12 |
| $12 \leq t < 14$ | 20 |
| $14 \leq t < 16$ | 15 |
| $16 \leq t < 18$ | 8 |`,
    figure: { widget: "ogive-lab", props: { view: "ogive", start: 8, width: 2, freqs: [5, 12, 20, 15, 8], label: "minutes" } },
    parts: [
      { q: "Write down the cumulative frequencies.", marks: 2, level: "knowledge", memo: [m`$5;\ 17;\ 37$`, m`$52;\ 60$`] },
      { q: "Write down the coordinates of the point on the ogive at the upper limit of the third class.", marks: 1, level: "knowledge", memo: [m`$(14;\ 37)$`] },
      { q: "Estimate the median time.", marks: 2, level: "routine", memo: [m`read at a cumulative frequency of $30$`, m`median $\approx 13{,}3$ minutes (accept $13{,}1$ – $13{,}5$)`] },
      { q: "Estimate the mean time.", marks: 3, level: "routine", memo: [m`midpoints $9;\ 11;\ 13;\ 15;\ 17$`, m`$\sum f \cdot x = 798$`, m`$\bar{x} \approx \frac{798}{60} = 13{,}3$ minutes`] },
      { q: "How many learners took 14 minutes or longer?", marks: 1, level: "routine", memo: [m`$60 - 37 = 23$`] },
    ],
  },
  {
    id: "g11-measurement-2",
    topic: "g11-measurement",
    title: "An ice-cream cone",
    source: m`An ice-cream is a cone (radius 3 cm, perpendicular height 10 cm) topped with a hemisphere of radius 3 cm. Use $V_{\text{cone}} = \tfrac{1}{3}\pi r^2 h$, $V_{\text{sphere}} = \tfrac{4}{3}\pi r^3$, curved surface of a cone $= \pi r s$ and $A_{\text{sphere}} = 4\pi r^2$.`,
    figure: { widget: "solid-viewer", props: { solid: "cone" } },
    parts: [
      { q: "Calculate the total volume (two decimals).", marks: 3, level: "routine", memo: [m`$\tfrac{1}{3}\pi(3)^2(10) = 30\pi$`, m`$\tfrac{2}{3}\pi(3)^3 = 18\pi$`, m`$48\pi = 150{,}80$ cm³`] },
      { q: "Calculate the total outer surface area (two decimals).", marks: 4, level: "complex", memo: [m`$s = \sqrt{3^2 + 10^2} = 10{,}44$ cm`, m`cone: $\pi(3)(10{,}44) = 98{,}40$ cm²`, m`hemisphere: $2\pi(3)^2 = 56{,}55$ cm²`, m`total $= 154{,}95$ cm²`] },
      { q: "Every dimension is doubled. Calculate the new volume.", marks: 2, level: "complex", memo: [m`$2^3 \times 48\pi$`, m`$= 1\,206{,}37$ cm³`] },
    ],
  },
  {
    id: "g11-analytical-3",
    topic: "g11-analytical",
    title: "A right-angled triangle",
    source: m`$A(-2;\ 1)$, $B(4;\ 5)$ and $C(6;\ 2)$ are the vertices of $\triangle ABC$.`,
    figure: { widget: "figure", props: { points: { A: [-2, 1], B: [4, 5], C: [6, 2] }, segments: [["A", "B"], ["B", "C"], ["C", "A"]], angles: [{ at: "B", from: "A", to: "C", right: true }] } },
    parts: [
      { q: m`Calculate the gradient of $AB$.`, marks: 2, level: "routine", memo: [m`$m_{AB} = \frac{5 - 1}{4 - (-2)}$`, m`$= \frac{2}{3}$`] },
      { q: m`Determine the equation of the line through $C$ parallel to $AB$.`, marks: 3, level: "routine", memo: [m`$m = \frac{2}{3}$`, m`$y - 2 = \frac{2}{3}(x - 6)$`, m`$y = \frac{2}{3}x - 2$`] },
      { q: m`Show that $A\hat{B}C = 90^\circ$.`, marks: 3, level: "complex", memo: [m`$m_{BC} = \frac{2 - 5}{6 - 4} = -\frac{3}{2}$`, m`$m_{AB} \times m_{BC} = \frac{2}{3} \times -\frac{3}{2}$`, m`$= -1$, so $AB \perp BC$`] },
      { q: m`Calculate the inclination of $AB$.`, marks: 2, level: "routine", memo: [m`$\tan\theta = \frac{2}{3}$`, m`$\theta = 33{,}69^\circ$`] },
      { q: m`Calculate the area of $\triangle ABC$.`, marks: 3, level: "complex", memo: [m`$AB = \sqrt{52}$`, m`$BC = \sqrt{13}$`, m`area $= \frac{1}{2}\sqrt{52}\sqrt{13} = \frac{1}{2}(26) = 13$ square units`] },
    ],
  },
  {
    id: "g11-euclidean-4",
    topic: "g11-euclidean",
    title: "A cyclic quadrilateral and a tangent",
    source: m`$ABCD$ is a cyclic quadrilateral in the circle with centre $O$. $B\hat{O}D = 140^\circ$ (the angle on the side of $C$), $C\hat{B}D = 35^\circ$, and $TD$ is a tangent at $D$.`,
    figure: { widget: "figure", props: { points: { O: [0, 0], A: [0, 3], B: [-2.819, -1.026], C: [0, -3], D: [2.819, -1.026], T: [3.503, 0.853] }, hidden: ["T"], circles: [{ centre: "O", r: 3 }], segments: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["B", "D"], { from: "O", to: "B", dashed: true }, { from: "O", to: "D", dashed: true }], lines: [{ through: ["D", "T"], extend: 1.5 }] } },
    parts: [
      { q: m`Calculate $B\hat{A}D$, with a reason.`, marks: 2, level: "routine", memo: [m`$B\hat{A}D = 70^\circ$`, "(∠ at centre = 2 × ∠ at circumference)"] },
      { q: m`Calculate $B\hat{C}D$, with a reason.`, marks: 2, level: "routine", memo: [m`$B\hat{C}D = 110^\circ$`, "(opp ∠s of cyclic quad)"] },
      { q: m`Calculate the angle between the tangent $TD$ and the chord $DC$ (on the side of $C$), with a reason.`, marks: 2, level: "complex", memo: [m`$= C\hat{B}D = 35^\circ$`, "(tan-chord theorem)"] },
    ],
  },
  {
    id: "g11-trig-5",
    topic: "g11-trig",
    title: "Reduction and a quadratic equation",
    parts: [
      { q: m`Simplify: $\dfrac{\cos(180^\circ - x)\tan(360^\circ - x)}{\sin(-x)}$`, marks: 4, level: "routine", memo: [m`$\cos(180^\circ - x) = -\cos x$`, m`$\tan(360^\circ - x) = -\tan x$`, m`$\sin(-x) = -\sin x$`, m`$\frac{(-\cos x)(-\tan x)}{-\sin x} = \frac{\sin x}{-\sin x} = -1$`] },
      { q: m`Solve for $x \in [0^\circ;\ 360^\circ]$: $2\cos^2 x + 3\cos x - 2 = 0$`, marks: 4, level: "complex", memo: [m`$(2\cos x - 1)(\cos x + 2) = 0$`, m`$\cos x = \frac{1}{2}$`, m`$\cos x = -2$ has no solution`, m`$x = 60^\circ$ or $x = 300^\circ$`] },
    ],
  },
  // ------------------------------------------------------------ Grade 12 Paper 1
  {
    id: "g12-sequences-3",
    topic: "g12-sequences",
    title: "Weekly savings",
    source: m`Thando saves R50 in week 1, R55 in week 2, R60 in week 3, and so on.`,
    parts: [
      { q: "How much does Thando save in week 20?", marks: 2, level: "routine", memo: [m`$T_{20} = 50 + 19(5)$`, m`$= \text{R}145$`] },
      { q: "How much has Thando saved altogether after 20 weeks?", marks: 2, level: "routine", memo: [m`$S_{20} = \frac{20}{2}(50 + 145)$`, m`$= \text{R}1\,950$`] },
      { q: "After how many weeks will the total first exceed R5 000?", marks: 4, level: "problem-solving", memo: [m`$\frac{n}{2}\left[100 + 5(n - 1)\right] > 5\,000$`, m`$n^2 + 19n - 2\,000 > 0$`, m`$n > 36{,}2$`, m`after 37 weeks`] },
    ],
  },
  {
    id: "g12-functions-2",
    topic: "g12-functions",
    title: "Exponential and quadratic inverses",
    source: m`Given $f(x) = \left(\frac{1}{3}\right)^x$ and $g(x) = 2x^2$ for $x \leq 0$.`,
    parts: [
      { q: m`Write down the equation of $f^{-1}$ in the form $y = \dots$`, marks: 2, level: "routine", memo: [m`$x = \left(\frac{1}{3}\right)^y$`, m`$y = \log_{\frac{1}{3}} x$`] },
      { q: m`For which values of $x$ is $f^{-1}(x) \geq -2$?`, marks: 3, level: "complex", memo: [m`$\left(\frac{1}{3}\right)^{-2} = 9$`, m`$f^{-1}$ is decreasing`, m`$0 < x \leq 9$`] },
      { q: m`Write down the range of $h(x) = f(x) - 3$.`, marks: 1, level: "knowledge", memo: [m`$y > -3$`] },
      { q: m`Determine the equation of $g^{-1}$.`, marks: 3, level: "complex", memo: [m`$x = 2y^2$`, m`$y^2 = \frac{x}{2}$`, m`$y = -\sqrt{\frac{x}{2}}$ (because $y \leq 0$)`] },
    ],
  },
  {
    id: "g12-calculus-5",
    topic: "g12-calculus",
    title: "A cubic touching the x-axis",
    source: m`Given $f(x) = -x^3 + 6x^2 - 9x + 4$.`,
    figure: { widget: "sketch", props: { view: { xMin: -1.5, xMax: 5.5, yMin: -3, yMax: 7 }, curves: [{ expr: "-x^3 + 6x^2 - 9x + 4", label: "f" }] } },
    parts: [
      { q: m`Show that $x - 4$ is a factor of $f(x)$ and factorise $f(x)$ fully.`, marks: 3, level: "routine", memo: [m`$f(4) = -64 + 96 - 36 + 4 = 0$`, m`$f(x) = -(x - 4)(x^2 - 2x + 1)$`, m`$= -(x - 4)(x - 1)^2$`] },
      { q: m`Determine the coordinates of the turning points of $f$.`, marks: 4, level: "routine", memo: [m`$f'(x) = -3x^2 + 12x - 9 = 0$`, m`$-3(x - 1)(x - 3) = 0$`, m`$(1;\ 0)$`, m`$(3;\ 4)$`] },
      { q: m`For which values of $x$ is $f$ concave down?`, marks: 2, level: "routine", memo: [m`$f''(x) = -6x + 12 < 0$`, m`$x > 2$`] },
      { q: m`For which values of $k$ will $f(x) = k$ have three distinct real roots?`, marks: 2, level: "complex", memo: [m`$0 < k$`, m`$k < 4$`] },
    ],
  },
  {
    id: "g12-counting-1",
    topic: "g12-counting",
    title: "Arranging PRETORIA",
    source: m`Consider all the arrangements of the letters of the word **PRETORIA**.`,
    parts: [
      { q: "How many different arrangements are possible?", marks: 2, level: "routine", memo: [m`$\frac{8!}{2!}$ (two R's)`, m`$= 20\,160$`] },
      { q: "How many arrangements begin with P and end with A?", marks: 2, level: "routine", memo: [m`$\frac{6!}{2!}$`, m`$= 360$`] },
      { q: "How many arrangements have all the vowels next to each other?", marks: 3, level: "complex", memo: [m`vowel block (E, O, I, A): $4! = 24$ orders`, m`block + P, R, T, R: $\frac{5!}{2!} = 60$`, m`$24 \times 60 = 1\,440$`] },
      { q: "A random arrangement is chosen. What is the probability that the vowels are together?", marks: 1, level: "routine", memo: [m`$\frac{1\,440}{20\,160} = \frac{1}{14}$`] },
    ],
  },
  {
    id: "g12-counting-2",
    topic: "g12-counting",
    title: "Codes",
    source: m`A code consists of 2 letters (A–Z) followed by 4 digits (0–9).`,
    parts: [
      { q: "How many codes are possible if letters and digits may be repeated?", marks: 2, level: "routine", memo: [m`$26^2 \times 10^4$`, m`$= 6\,760\,000$`] },
      { q: "How many codes are possible if nothing may be repeated?", marks: 2, level: "routine", memo: [m`$26 \times 25 \times 10 \times 9 \times 8 \times 7$`, m`$= 3\,276\,000$`] },
      { q: "With repetition allowed, a code is chosen at random. What is the probability that both letters are vowels and the code ends in 0?", marks: 3, level: "complex", memo: [m`favourable: $5 \times 5 \times 10 \times 10 \times 10 \times 1 = 25\,000$`, m`$P = \frac{25\,000}{6\,760\,000}$`, m`$= \frac{5}{1\,352}$`] },
    ],
  },
  {
    id: "g12-probability-1",
    topic: "g12-counting",
    title: "An even code greater than 5 000",
    source: m`A 4-digit code is formed from the digits 1 to 9 without repetition.`,
    parts: [
      { q: "How many codes are possible?", marks: 2, level: "routine", memo: [m`$9 \times 8 \times 7 \times 6$`, m`$= 3\,024$`] },
      { q: "How many of the codes are even?", marks: 2, level: "routine", memo: [m`last digit 2, 4, 6 or 8: $4 \times 8 \times 7 \times 6$`, m`$= 1\,344$`] },
      { q: "What is the probability that a random code is even and greater than 5 000?", marks: 4, level: "problem-solving", memo: [m`first digit 5, 7 or 9: $3 \times 4 \times 7 \times 6 = 504$`, m`first digit 6 or 8: $2 \times 3 \times 7 \times 6 = 252$`, m`$504 + 252 = 756$`, m`$P = \frac{756}{3\,024} = \frac{1}{4}$`] },
    ],
  },
  // ------------------------------------------------------------ Grade 12 Paper 2
  {
    id: "g12-statistics-1",
    topic: "g12-statistics",
    title: "Maths and Physics marks",
    source: m`The Mathematics and Physical Sciences marks (%) of 8 learners:

| Maths ($x$) | 45 | 52 | 60 | 65 | 70 | 75 | 82 | 90 |
|---|---|---|---|---|---|---|---|---|
| Physics ($y$) | 50 | 55 | 58 | 70 | 68 | 80 | 79 | 92 |`,
    parts: [
      { q: "Determine the equation of the least squares regression line.", marks: 3, level: "routine", memo: [m`$a = 6{,}75$`, m`$b = 0{,}92$`, m`$\hat{y} = 6{,}75 + 0{,}92x$`] },
      { q: "Write down the correlation coefficient and describe the correlation.", marks: 2, level: "routine", memo: [m`$r = 0{,}97$`, "very strong positive correlation"] },
      { q: "Predict the Physics mark of a learner who scored 78% for Mathematics.", marks: 2, level: "routine", memo: [m`$\hat{y} = 6{,}75 + 0{,}92(78)$`, m`$\approx 79\%$`] },
      { q: "Would it be reliable to use the line to predict the Physics mark of a learner who scored 15% for Mathematics? Explain.", marks: 1, level: "complex", memo: ["No – 15 is far outside the data (extrapolation)"] },
    ],
  },
  {
    id: "g12-statistics-2",
    topic: "g12-statistics",
    title: "Cellphone data",
    source: m`The data used (MB) by 10 learners in a day: $120;\ 135;\ 150;\ 150;\ 160;\ 175;\ 180;\ 200;\ 210;\ 320$`,
    parts: [
      { q: "Calculate the mean and standard deviation.", marks: 3, level: "routine", memo: [m`$\bar{x} = \frac{1\,800}{10}$`, m`$= 180$ MB`, m`$\sigma = 53{,}62$ MB`] },
      { q: "How many learners used an amount within one standard deviation of the mean?", marks: 2, level: "routine", memo: [m`$126{,}38$ to $233{,}62$`, m`$8$ learners`] },
      { q: "Determine the five-number summary and show that 320 is an outlier.", marks: 4, level: "complex", memo: [m`$(120;\ 150;\ 167{,}5;\ 200;\ 320)$`, m`$\text{IQR} = 50$`, m`$Q_3 + 1{,}5 \times 50 = 275$`, m`$320 > 275$, so it is an outlier`] },
      { q: "The outlier is removed. Explain the effect on the mean and the standard deviation.", marks: 2, level: "complex", memo: ["the mean decreases", "the standard deviation decreases (the data is less spread out)"] },
    ],
  },
  {
    id: "g12-analytical-3",
    topic: "g12-analytical",
    title: "Two circles that touch",
    source: m`Circle $M$: $x^2 + y^2 + 6x - 4y - 12 = 0$. Circle $N$ has centre $(5;\ 8)$. $P(1;\ 5)$ lies on circle $M$.`,
    figure: { widget: "figure", props: { points: { M: [-3, 2], N: [5, 8], P: [1, 5] }, circles: [{ centre: "M", r: 5 }, { centre: "N", r: 5 }], segments: [["M", "N"]] } },
    parts: [
      { q: m`Determine the centre and radius of circle $M$.`, marks: 3, level: "routine", memo: [m`$(x + 3)^2 + (y - 2)^2 = 12 + 9 + 4$`, m`centre $M(-3;\ 2)$`, m`$r = 5$`] },
      { q: m`Determine the equation of the tangent to circle $M$ at $P$.`, marks: 3, level: "routine", memo: [m`$m_{MP} = \frac{5 - 2}{1 + 3} = \frac{3}{4}$`, m`$m_{\text{tan}} = -\frac{4}{3}$`, m`$y = -\frac{4}{3}x + \frac{19}{3}$`] },
      { q: m`Circle $N$ touches circle $M$ externally. Calculate the radius of circle $N$.`, marks: 3, level: "complex", memo: [m`$MN = \sqrt{8^2 + 6^2}$`, m`$= 10$`, m`$r_N = 10 - 5 = 5$`] },
      { q: m`Show that the circles touch at $P$.`, marks: 2, level: "problem-solving", memo: [m`midpoint of $MN = \left(\frac{-3 + 5}{2};\ \frac{2 + 8}{2}\right) = (1;\ 5)$`, m`equal radii, so the point of contact is the midpoint: $P$`] },
    ],
  },
  {
    id: "g12-euclidean-3",
    topic: "g12-euclidean",
    title: "Proportion and area",
    source: m`In $\triangle ABC$, $D$ lies on $AB$ and $E$ on $AC$ with $DE \parallel BC$. $AD = 6$, $DB = 4$ and $EC = 5$.`,
    figure: { widget: "figure", props: { points: { A: [3, 6], B: [0, 0], C: [9, 0], D: [1.2, 2.4], E: [6.6, 2.4] }, segments: [["A", "B"], ["B", "C"], ["C", "A"], ["D", "E"]] } },
    parts: [
      { q: m`Calculate $AE$, with a reason.`, marks: 2, level: "routine", memo: [m`$\frac{AE}{EC} = \frac{AD}{DB}$ (line ∥ one side of △)`, m`$AE = \frac{6 \times 5}{4} = 7{,}5$`] },
      { q: m`Calculate $\dfrac{\text{area } \triangle ADE}{\text{area } \triangle ABC}$.`, marks: 3, level: "complex", memo: [m`$\triangle ADE \,|||\, \triangle ABC$ (∠∠∠)`, m`ratio of sides $\frac{AD}{AB} = \frac{6}{10} = \frac{3}{5}$`, m`ratio of areas $= \frac{9}{25}$`] },
      { q: m`Calculate $\dfrac{\text{area } \triangle ADE}{\text{area } \triangle DBE}$.`, marks: 2, level: "complex", memo: [m`same height from $E$`, m`$= \frac{AD}{DB} = \frac{3}{2}$`] },
    ],
  },
  {
    id: "g12-euclidean-4",
    topic: "g12-euclidean",
    title: "Intersecting chords",
    source: m`Chords $AB$ and $CD$ of a circle intersect at $E$. $AE = 6$, $EB = 4$ and $CE = 3$.`,
    figure: { widget: "figure", props: { points: { O: [0, 0], A: [-2.598, 1.5], B: [2.819, -1.026], C: [0.521, 2.954], D: [-1.928, -2.298], E: [-0.593, 0.565] }, hidden: ["O"], circles: [{ centre: "O", r: 3 }], segments: [["A", "B"], ["C", "D"], { from: "A", to: "D", dashed: true }, { from: "C", to: "B", dashed: true }] } },
    parts: [
      { q: m`Prove that $\triangle AED \,|||\, \triangle CEB$.`, marks: 3, level: "complex", memo: [m`$\hat{A} = \hat{C}$ (∠s in same seg)`, m`$A\hat{E}D = C\hat{E}B$ (vert opp ∠s)`, m`$\triangle AED \,|||\, \triangle CEB$ (∠∠∠)`] },
      { q: m`Hence prove that $AE \cdot EB = CE \cdot ED$.`, marks: 2, level: "complex", memo: [m`$\frac{AE}{CE} = \frac{ED}{EB}$ (|||△s)`, m`$AE \cdot EB = CE \cdot ED$`] },
      { q: m`Calculate $ED$.`, marks: 2, level: "routine", memo: [m`$6 \times 4 = 3 \times ED$`, m`$ED = 8$`] },
    ],
  },
  {
    id: "g12-trig-4",
    topic: "g12-trig",
    title: "Identities in terms of t",
    parts: [
      { q: m`If $\sin 34^\circ = t$, express $\cos 68^\circ$ and $\sin 56^\circ$ in terms of $t$.`, marks: 3, level: "routine", memo: [m`$\cos 68^\circ = 1 - 2\sin^2 34^\circ = 1 - 2t^2$`, m`$\sin 56^\circ = \cos 34^\circ$`, m`$= \sqrt{1 - t^2}$`] },
      { q: m`Simplify: $\dfrac{\cos 2x + \sin^2 x}{\cos x}$`, marks: 3, level: "routine", memo: [m`$\cos 2x = \cos^2 x - \sin^2 x$`, m`numerator $= \cos^2 x$`, m`$= \cos x$`] },
      { q: m`Prove that $\sin(x + 30^\circ) + \sin(x - 30^\circ) = \sqrt{3}\sin x$.`, marks: 4, level: "complex", memo: [m`$\sin x\cos 30^\circ + \cos x\sin 30^\circ$`, m`$+ \sin x\cos 30^\circ - \cos x\sin 30^\circ$`, m`$= 2\sin x\cos 30^\circ$`, m`$= 2\sin x \cdot \frac{\sqrt{3}}{2} = \sqrt{3}\sin x$`] },
    ],
  },
  {
    id: "g12-trig-5",
    topic: "g12-trig",
    title: "A triangular field",
    source: m`A triangular field $ABC$ has $AB = 120$ m, $AC = 95$ m and $B\hat{A}C = 68^\circ$.`,
    parts: [
      { q: m`Calculate $BC$.`, marks: 3, level: "routine", memo: [m`$BC^2 = 120^2 + 95^2 - 2(120)(95)\cos 68^\circ$`, m`$BC^2 = 14\,884{,}0$`, m`$BC = 122{,}00$ m`] },
      { q: "Calculate the area of the field.", marks: 2, level: "routine", memo: [m`$\frac{1}{2}(120)(95)\sin 68^\circ$`, m`$= 5\,284{,}95$ m²`] },
      { q: m`Calculate $A\hat{B}C$.`, marks: 3, level: "complex", memo: [m`$\frac{\sin A\hat{B}C}{95} = \frac{\sin 68^\circ}{122{,}00}$`, m`$\sin A\hat{B}C = 0{,}7220$`, m`$A\hat{B}C = 46{,}22^\circ$`] },
    ],
  },
];
