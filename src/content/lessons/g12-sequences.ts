import type { Lesson } from "../types";

const m = String.raw;

export const SEQUENCES: Lesson[] = [
  {
    slug: "arithmetic-series",
    topic: "g12-sequences",
    order: 1,
    title: "Arithmetic sequences & series",
    tagline: "Add the same amount every time – and add them all up in one line.",
    emoji: "➕",
    caps: "CAPS Gr 12 · Number patterns: arithmetic sequences Tₙ = a + (n − 1)d; arithmetic series Sₙ = n/2[2a + (n − 1)d] including its proof.",
    objectives: [
      "Use Tₙ = a + (n − 1)d to find any term or which term has a value",
      "Prove and use the formula for the sum of an arithmetic series",
      "Solve problems where n is unknown",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Arithmetic sequence", def: m`A sequence with a constant difference $d$ between consecutive terms.` },
      { term: "Common difference (d)", def: m`$d = T_2 - T_1 = T_3 - T_2 = \dots$` },
      { term: "General term (arithmetic)", def: m`$T_n = a + (n - 1)d$.` },
      { term: "Series", def: "The sum of the terms of a sequence." },
      { term: "Sum of an arithmetic series", def: m`$S_n = \frac{n}{2}\left[2a + (n - 1)d\right]$ or $S_n = \frac{n}{2}(a + l)$ where $l$ is the last term.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "The 1 + 2 + … + 100 trick",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A teacher once told a class to add up $1 + 2 + 3 + \dots + 100$ to keep them busy. One kid (Carl Gauss, later a famous mathematician) answered in seconds: pair the first and last, $1 + 100 = 101$, then $2 + 99 = 101$… 50 pairs of 101 make **5 050**. That pairing trick is the proof of the arithmetic series formula.` },
          { type: "widget", widget: "series-lab", props: { kind: "arithmetic" } },
        ],
      },
      {
        id: "terms",
        title: "The general term",
        minutes: 6,
        blocks: [
          { type: "text", md: m`To get to term $n$ from term 1 you add $d$ exactly $(n - 1)$ times:

$$T_n = a + (n - 1)d$$` },
          {
            type: "worked",
            title: "Terms and positions",
            problem: m`For $3;\ 7;\ 11;\ \dots$ find $T_{50}$, and which term equals $99$.`,
            steps: [
              { md: m`$a = 3$, $d = 4$` },
              { md: m`$T_{50} = 3 + 49(4) = 199$` },
              { md: m`$3 + (n - 1)(4) = 99 \Rightarrow n - 1 = 24 \Rightarrow n = 25$` },
            ],
          },
          {
            type: "practice",
            id: "arith-terms-practice",
            problems: [
              { q: m`Find $T_{20}$ of $5;\ 8;\ 11;\ \dots$`, answer: "62", solution: m`$$T_{20} = 5 + 19(3) = 62$$` },
              { q: m`Which term of $5;\ 8;\ 11;\ \dots$ is $101$?`, answer: "33", solution: m`$$5 + (n - 1)3 = 101 \Rightarrow n - 1 = 32 \Rightarrow n = 33$$` },
              { q: m`$x;\ 2x + 1;\ 4x - 2$ are the first three terms of an arithmetic sequence. Find $x$.`, answer: "4", hint: "The two differences are equal.", solution: m`$$(2x + 1) - x = (4x - 2) - (2x + 1) \Rightarrow x + 1 = 2x - 3 \Rightarrow x = 4$$` },
            ],
          },
        ],
      },
      {
        id: "series",
        title: "Summing it up",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Proof of the formula (examinable)",
            problem: m`Prove that $S_n = \frac{n}{2}\left[2a + (n - 1)d\right]$.`,
            steps: [
              { md: m`$S_n = a + (a + d) + (a + 2d) + \dots + [a + (n - 1)d]$` },
              { md: m`$S_n = [a + (n - 1)d] + [a + (n - 2)d] + \dots + a$`, why: "Write the same sum backwards." },
              { md: m`$2S_n = [2a + (n - 1)d] + [2a + (n - 1)d] + \dots$ ($n$ times)`, why: "Add the two lines term by term – every pair is the same." },
              { md: m`$2S_n = n[2a + (n - 1)d] \Rightarrow S_n = \frac{n}{2}[2a + (n - 1)d]$` },
            ],
          },
          {
            type: "worked",
            title: "Finding n",
            problem: m`How many terms of $3 + 7 + 11 + \dots$ add up to $210$?`,
            steps: [
              { md: m`$\frac{n}{2}[2(3) + (n - 1)(4)] = 210 \Rightarrow n(2n + 1) = 210$` },
              { md: m`$2n^2 + n - 210 = 0 \Rightarrow (2n + 21)(n - 10) = 0$` },
              { md: m`$n = 10$ (n must be a natural number)` },
            ],
          },
          {
            type: "practice",
            id: "arith-series-practice",
            problems: [
              { q: m`Calculate $S_{20}$ for $5 + 8 + 11 + \dots$`, answer: "670", solution: m`$$S_{20} = \frac{20}{2}[2(5) + 19(3)] = 10(67) = 670$$` },
              { q: m`Calculate $1 + 2 + 3 + \dots + 100$.`, answer: "5050", solution: m`$$S_{100} = \frac{100}{2}(1 + 100) = 5050$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["arith-seq"], title: "Arithmetic drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$T_n = a + (n - 1)d$.`, m`$S_n = \frac{n}{2}[2a + (n - 1)d] = \frac{n}{2}(a + l)$.`, "Unknown n → set up an equation; n must be a natural number.", "Know the proof: write the sum forwards and backwards and add."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "arith-series-quiz",
            questions: [
              { q: m`In $10;\ 7;\ 4;\ \dots$, $d = $`, options: ["3", "−3", "10", "−7"], answer: 1, explain: "7 − 10 = −3." },
              { q: m`$T_{100}$ of $1;\ 3;\ 5;\ \dots$ is…`, options: ["200", "199", "201", "99"], answer: 1, explain: m`$1 + 99(2) = 199$.` },
              { q: m`The sum of the first 10 terms of $2 + 4 + 6 + \dots$ is…`, options: ["20", "110", "100", "220"], answer: 1, explain: m`$\frac{10}{2}(2 + 20) = 110$.` },
              { q: "An arithmetic sequence's graph (n against Tₙ) is…", options: ["a straight line of dots", "a parabola", "an exponential curve", "a hyperbola"], answer: 0, explain: "Tₙ = dn + (a − d) is linear in n." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "geometric-series",
    topic: "g12-sequences",
    order: 2,
    title: "Geometric sequences & series",
    tagline: "Multiply by the same ratio – viral growth, halving, and huge sums.",
    emoji: "✖️",
    caps: "CAPS Gr 12 · Number patterns: geometric sequences Tₙ = arⁿ⁻¹; geometric series Sₙ = a(rⁿ − 1)/(r − 1) including its proof.",
    objectives: [
      "Use Tₙ = arⁿ⁻¹",
      "Prove and use the formula for the sum of a geometric series",
      "Find n using exponential equations or logs",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Geometric sequence", def: m`A sequence with a constant ratio $r$ between consecutive terms.` },
      { term: "Common ratio (r)", def: m`$r = \dfrac{T_2}{T_1} = \dfrac{T_3}{T_2} = \dots$` },
      { term: "General term (geometric)", def: m`$T_n = ar^{n-1}$.` },
      { term: "Sum of a geometric series", def: m`$S_n = \dfrac{a(r^n - 1)}{r - 1}$ (or $\dfrac{a(1 - r^n)}{1 - r}$), $r \neq 1$.` },
      { term: "Geometric mean", def: m`If $a;\ x;\ b$ is geometric, $x^2 = ab$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Fold a piece of paper",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Fold a sheet of paper (0,1 mm thick) in half again and again. The thickness doubles each time: $0{,}1;\ 0{,}2;\ 0{,}4;\ \dots$ After 42 folds it would reach the Moon. That's a **geometric sequence** – multiply by the same number every time.` },
          { type: "widget", widget: "series-lab", props: { kind: "geometric" } },
        ],
      },
      {
        id: "terms",
        title: "Terms and ratios",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Terms and positions",
            problem: m`For $2;\ 6;\ 18;\ \dots$ find $T_8$, and which term is $1\,458$.`,
            steps: [
              { md: m`$a = 2$, $r = 3$` },
              { md: m`$T_8 = 2(3)^7 = 4\,374$` },
              { md: m`$2 \cdot 3^{n-1} = 1458 \Rightarrow 3^{n-1} = 729 = 3^6 \Rightarrow n = 7$`, why: "An exponential equation – same base, equal exponents." },
            ],
          },
          {
            type: "worked",
            title: "When the numbers aren't nice: logs",
            problem: m`Which is the first term of $2;\ 6;\ 18;\ \dots$ to exceed one million?`,
            steps: [
              { md: m`$2 \cdot 3^{n-1} > 1\,000\,000 \Rightarrow 3^{n-1} > 500\,000$` },
              { md: m`$n - 1 > \log_3 500\,000 = \dfrac{\log 500\,000}{\log 3} = 11{,}94$` },
              { md: m`$n - 1 = 12 \Rightarrow n = 13$: the 13th term`, why: "n must be a whole number, so round UP." },
            ],
          },
          {
            type: "practice",
            id: "geo-terms-practice",
            problems: [
              { q: m`Find $T_7$ of $64;\ 32;\ 16;\ \dots$`, answer: "1", solution: m`$$T_7 = 64\left(\tfrac{1}{2}\right)^6 = 1$$` },
              { q: m`$x;\ 6;\ 18$ is geometric. Find $x$.`, answer: "2", solution: m`$$\frac{6}{x} = \frac{18}{6} \Rightarrow x = 2$$` },
            ],
          },
        ],
      },
      {
        id: "series",
        title: "The sum formula",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Proof (examinable)",
            problem: m`Prove that $S_n = \dfrac{a(r^n - 1)}{r - 1}$, $r \neq 1$.`,
            steps: [
              { md: m`$S_n = a + ar + ar^2 + \dots + ar^{n-1}$` },
              { md: m`$rS_n = ar + ar^2 + \dots + ar^{n-1} + ar^n$`, why: "Multiply every term by r." },
              { md: m`$rS_n - S_n = ar^n - a$`, why: "Subtract: everything in the middle cancels." },
              { md: m`$S_n(r - 1) = a(r^n - 1) \Rightarrow S_n = \dfrac{a(r^n - 1)}{r - 1}$` },
            ],
          },
          {
            type: "practice",
            id: "geo-series-practice",
            problems: [
              { q: m`Calculate $S_8$ for $2 + 6 + 18 + \dots$`, answer: "6560", solution: m`$$S_8 = \frac{2(3^8 - 1)}{3 - 1} = 6560$$` },
              { q: m`Calculate $S_6$ for $3 - 6 + 12 - \dots$`, answer: "-63", solution: m`$$r = -2,\quad S_6 = \frac{3\left((-2)^6 - 1\right)}{-2 - 1} = \frac{3(63)}{-3} = -63$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["geo-seq"], title: "Geometric drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$T_n = ar^{n-1}$; $S_n = \frac{a(r^n - 1)}{r - 1}$.`, "r = any term ÷ the one before it.", "Unknown n: exponential equation or logs; round up for 'first term to exceed'.", "Know the proof: multiply by r and subtract."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "geo-series-quiz",
            questions: [
              { q: m`$r$ for $81;\ 27;\ 9;\ \dots$ is…`, options: ["3", m`$\frac{1}{3}$`, "−54", m`$-\frac{1}{3}$`], answer: 1, explain: m`$27 \div 81 = \frac{1}{3}$.` },
              { q: m`$T_5$ of $1;\ -2;\ 4;\ \dots$ is…`, options: ["16", "−16", "8", "−32"], answer: 0, explain: m`$1(-2)^4 = 16$.` },
              { q: "A geometric sequence with r = 1 is…", options: ["constant", "arithmetic with d = 1", "growing", "impossible"], answer: 0, explain: "Every term equals a. (The Sₙ formula can't be used – Sₙ = na.)" },
              { q: "Bacteria double every hour, starting with 50. After 10 hours there are…", options: ["500", "25 600", "51 200", "1 000"], answer: 2, explain: m`After 10 doublings: $50 \times 2^{10} = 51\,200$. (That's $T_{11}$, because $T_1 = 50$ is the start.)` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sigma-infinity",
    topic: "g12-sequences",
    order: 3,
    title: "Sigma notation & sum to infinity",
    tagline: "Σ shorthand, and how infinitely many numbers can add up to something finite.",
    emoji: "♾️",
    caps: "CAPS Gr 12 · Number patterns: sigma notation; the sum to infinity of a convergent geometric series S∞ = a/(1 − r), −1 < r < 1.",
    objectives: [
      "Read and evaluate sigma notation",
      "Decide whether a geometric series converges",
      "Calculate the sum to infinity",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Sigma notation", def: m`$\sum_{k=1}^{n} T_k$ means "add $T_k$ for $k = 1, 2, \dots, n$".` },
      { term: "Number of terms", def: m`In $\sum_{k=p}^{q}$ there are $q - p + 1$ terms.` },
      { term: "Convergent series", def: m`A series whose sum approaches a fixed number. A geometric series converges if $-1 < r < 1$.` },
      { term: "Sum to infinity", def: m`$S_\infty = \dfrac{a}{1 - r}$, valid only when $-1 < r < 1$.` },
      { term: "Divergent series", def: "A series whose sum grows without bound (or doesn't settle) – it has no sum to infinity." },
    ],
    chunks: [
      {
        id: "sigma",
        title: "Sigma notation",
        minutes: 7,
        blocks: [
          { type: "text", md: m`$$\sum_{k=1}^{5} (2k + 1) = 3 + 5 + 7 + 9 + 11 = 35$$

The variable under Σ runs from the bottom number to the top number. To evaluate a long one: write the first term, the last term and count the terms ($\text{top} - \text{bottom} + 1$), then use the right $S_n$ formula.` },
          {
            type: "worked",
            title: "Evaluate",
            problem: m`Evaluate $\displaystyle\sum_{k=1}^{20}(3k - 1)$.`,
            steps: [
              { md: m`$T_1 = 2$, $T_{20} = 59$, 20 terms, arithmetic` },
              { md: m`$S_{20} = \frac{20}{2}(2 + 59) = 610$` },
            ],
          },
          {
            type: "practice",
            id: "sigma-practice",
            problems: [
              { q: m`How many terms are in $\displaystyle\sum_{k=3}^{15} (2k - 1)$?`, answer: "13", solution: m`$15 - 3 + 1 = 13$` },
              { q: m`Evaluate $\displaystyle\sum_{k=1}^{10} 2^k$.`, answer: "2046", hint: "First term is 2¹ = 2, r = 2.", solution: m`$$S_{10} = \frac{2(2^{10} - 1)}{2 - 1} = 2046$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["sigma"], title: "Sigma drill" } },
        ],
      },
      {
        id: "infinity",
        title: "Sum to infinity",
        minutes: 8,
        blocks: [
          { type: "text", md: m`If $-1 < r < 1$, then $r^n \to 0$ as $n \to \infty$, so

$$S_\infty = \lim_{n\to\infty}\frac{a(1 - r^n)}{1 - r} = \frac{a}{1 - r}$$

Switch the series lab to **geometric** with $r = 0{,}5$ and push $n$ up: the running total flattens onto $S_\infty$.` },
          {
            type: "worked",
            title: "Converges or not?",
            problem: m`(a) Find $S_\infty$ of $8 + 4 + 2 + \dots$ (b) For which $x$ does $\sum_{k=1}^{\infty}(2x - 1)^k$ converge?`,
            steps: [
              { md: m`(a) $r = \frac{1}{2}$: $S_\infty = \dfrac{8}{1 - \frac{1}{2}} = 16$` },
              { md: m`(b) $r = 2x - 1$; converges if $-1 < 2x - 1 < 1$` },
              { md: m`$0 < 2x < 2 \Rightarrow 0 < x < 1$` },
            ],
          },
          {
            type: "practice",
            id: "infinity-practice",
            problems: [
              { q: m`Find the sum to infinity of $18 + 6 + 2 + \dots$`, answer: "27", solution: m`$$S_\infty = \frac{18}{1 - \frac{1}{3}} = 27$$` },
              { q: m`A geometric series has $S_\infty = 20$ and $a = 5$. Find $r$.`, answer: "3/4", solution: m`$$\frac{5}{1 - r} = 20 \Rightarrow 1 - r = \frac{1}{4} \Rightarrow r = \frac{3}{4}$$` },
            ],
          },
          { type: "callout", variant: "real-world", md: m`A ball dropped from 2 m bounces back to half its height each time. The total distance it travels is finite: $2 + 2(1 + \frac{1}{2} + \frac{1}{4} + \dots) = 2 + 2 \times 2 = 6$ m – even though it bounces "forever".` },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`Terms in $\sum_{k=p}^{q}$: $q - p + 1$.`, "Find the first term, last term and number of terms, then use Sₙ.", m`$S_\infty = \frac{a}{1 - r}$ only if $-1 < r < 1$.`, "Converge questions: solve −1 < r < 1 for the unknown."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "sigma-quiz",
            questions: [
              { q: m`$\sum_{k=1}^{4} k^2 = $`, options: ["10", "30", "16", "20"], answer: 1, explain: "1 + 4 + 9 + 16 = 30." },
              { q: "Which geometric series has a sum to infinity?", options: [m`$r = 1{,}5$`, m`$r = -1$`, m`$r = -0{,}9$`, m`$r = 2$`], answer: 2, explain: "Only −1 < r < 1 converges." },
              { q: m`$\sum_{k=1}^{\infty} (x - 2)^k$ converges when…`, options: [m`$-1 < x < 1$`, m`$1 < x < 3$`, m`$x < 3$`, m`$-3 < x < -1$`], answer: 1, explain: m`$-1 < x - 2 < 1 \Rightarrow 1 < x < 3$.` },
              { q: m`$S_\infty$ of $1 + \frac{1}{2} + \frac{1}{4} + \dots$ is…`, options: ["1", "2", "∞", m`$\frac{3}{2}$`], answer: 1, explain: m`$\frac{1}{1 - \frac{1}{2}} = 2$.` },
            ],
          },
        ],
      },
    ],
  },
];
