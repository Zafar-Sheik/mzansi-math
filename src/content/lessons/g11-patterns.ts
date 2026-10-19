import type { Lesson } from "../types";

const m = String.raw;

export const PATTERNS: Lesson[] = [
  {
    slug: "quadratic-patterns",
    topic: "g11-patterns",
    order: 1,
    title: "Quadratic number patterns",
    tagline: "When the gaps grow steadily – crack the formula with second differences.",
    emoji: "🔢",
    caps: "CAPS Gr 11 · Number patterns: investigate patterns with a constant second difference and determine the general term Tₙ = an² + bn + c.",
    objectives: [
      "Tell linear and quadratic patterns apart using differences",
      "Find the general term of a quadratic pattern",
      "Use the general term to find any term, or which term has a given value",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Number pattern", def: "A list of numbers that follows a rule. Terms are separated by semicolons: 3; 8; 15; 24; …" },
      { term: "General term", def: m`A formula $T_n$ that gives any term from its position $n$, e.g. $T_n = n^2 + 2n$.` },
      { term: "First difference", def: m`The gap between consecutive terms: $T_2 - T_1$, $T_3 - T_2$, …` },
      { term: "Second difference", def: "The gap between consecutive first differences. Constant second difference → quadratic pattern." },
      { term: "Linear pattern", def: m`Constant first difference $d$; general term $T_n = dn + c$.` },
      { term: "Quadratic pattern", def: m`Constant second difference; general term $T_n = an^2 + bn + c$ with $2a$ = second difference.` },
      { term: "The a, b, c method", def: m`$2a$ = second difference; $3a + b = T_2 - T_1$; $a + b + c = T_1$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Everyone DMs everyone",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Your class group chat has $n$ people and everyone sends every other person one private message. With 2 people: 2 messages. 3 people: 6. 4 people: 12. 5 people: 20.

The gaps are 4, 6, 8, … – they **grow by 2 every time**. That's the fingerprint of a **quadratic pattern**. (The rule? $T_n = n^2 - n$. With 40 learners that's 1 560 messages. Eish.)` },
          { type: "widget", widget: "pattern-machine" },
        ],
      },
      {
        id: "spot",
        title: "Linear, quadratic or neither?",
        minutes: 5,
        blocks: [
          { type: "text", md: m`Work out the **first differences**. If they're constant, the pattern is **linear**. If not, work out the **second differences** – constant means **quadratic**.

| Pattern | 1st differences | 2nd differences | Type |
|---|---|---|---|
| 3; 7; 11; 15 | 4; 4; 4 | – | linear |
| 2; 5; 10; 17 | 3; 5; 7 | 2; 2 | quadratic |
| 1; 2; 4; 8 | 1; 2; 4 | 1; 2 | neither (it doubles) |` },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "pattern-types", title: "Sort the patterns", buckets: ["Linear", "Quadratic", "Neither"], colour: "var(--t-algebra)",
              items: [
                { text: "3; 7; 11; 15", bucket: "Linear" }, { text: "5; 2; −1; −4", bucket: "Linear" },
                { text: "2; 5; 10; 17", bucket: "Quadratic" }, { text: "0; 3; 8; 15", bucket: "Quadratic" }, { text: "1; 4; 9; 16", bucket: "Quadratic" },
                { text: "1; 2; 4; 8", bucket: "Neither" }, { text: "1; 1; 2; 3; 5", bucket: "Neither" },
              ],
            },
          },
        ],
      },
      {
        id: "general-term",
        title: "Finding the general term",
        minutes: 8,
        blocks: [
          { type: "text", md: m`For $T_n = an^2 + bn + c$, the first terms are $T_1 = a + b + c$, $T_2 = 4a + 2b + c$, $T_3 = 9a + 3b + c$. Working out the differences gives three magic equations:

$$2a = \text{second difference} \qquad 3a + b = T_2 - T_1 \qquad a + b + c = T_1$$` },
          {
            type: "worked",
            title: "The a, b, c method",
            problem: m`Find the general term of $4;\ 11;\ 22;\ 37;\ \dots$`,
            steps: [
              { md: m`First differences: $7;\ 11;\ 15$. Second difference: $4$ (constant → quadratic).` },
              { md: m`$2a = 4 \Rightarrow a = 2$` },
              { md: m`$3a + b = T_2 - T_1 = 7 \Rightarrow 6 + b = 7 \Rightarrow b = 1$` },
              { md: m`$a + b + c = T_1 = 4 \Rightarrow 2 + 1 + c = 4 \Rightarrow c = 1$` },
              { md: m`$T_n = 2n^2 + n + 1$`, why: m`Check with $T_4$: $2(16) + 4 + 1 = 37$ ✓ – always check a term you didn't use.` },
            ],
          },
          {
            type: "practice",
            id: "general-term-practice",
            problems: [
              { q: m`Find $T_n$ for $3;\ 8;\ 15;\ 24;\ \dots$`, answer: "n^2 + 2n", kind: "expr", vars: ["n"], hint: "Second difference = 2, so a = 1.", solution: m`First differences $5;\ 7;\ 9$, second difference $2$.

$2a = 2 \Rightarrow a = 1$; $3(1) + b = 5 \Rightarrow b = 2$; $1 + 2 + c = 3 \Rightarrow c = 0$.

$$T_n = n^2 + 2n$$` },
              { q: m`Find $T_n$ for $6;\ 11;\ 18;\ 27;\ \dots$`, answer: "n^2 + 2n + 3", kind: "expr", vars: ["n"], solution: m`First differences $5;\ 7;\ 9$, second difference $2$, so $a = 1$, $b = 5 - 3 = 2$, $c = 6 - 1 - 2 = 3$.

$$T_n = n^2 + 2n + 3$$` },
              { q: m`Find $T_n$ for $-1;\ 2;\ 7;\ 14;\ \dots$`, answer: "n^2 - 2", kind: "expr", vars: ["n"], solution: m`First differences $3;\ 5;\ 7$, second difference $2$, so $a = 1$, $b = 3 - 3 = 0$, $c = -1 - 1 - 0 = -2$.

$$T_n = n^2 - 2$$` },
            ],
          },
        ],
      },
      {
        id: "use-it",
        title: "Using the general term",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Which term is 529?",
            problem: m`For $T_n = 2n^2 + n + 1$, which term is equal to $529$?`,
            steps: [
              { md: m`$2n^2 + n + 1 = 529$`, why: "Set the general term equal to the value." },
              { md: m`$2n^2 + n - 528 = 0 \Rightarrow (2n + 33)(n - 16) = 0$` },
              { md: m`$n = -\frac{33}{2}$ or $n = 16$`, why: "n is a position, so it must be a natural number." },
              { md: m`It's the **16th term**.` },
            ],
          },
          { type: "callout", variant: "exam", md: m`"Which term…?" questions want **n** (the position), not the value. Reject negative and non-integer values of $n$ with a reason: "$n \in \mathbb{N}$".` },
          {
            type: "practice",
            id: "use-general-term-practice",
            problems: [
              { q: m`For $T_n = 2n^2 + n + 1$, calculate $T_{50}$.`, answer: "5051", solution: m`$$T_{50} = 2(50)^2 + 50 + 1 = 5000 + 51 = 5051$$` },
              { q: m`Which term of $2;\ 7;\ 14;\ 23;\ \dots$ is equal to $359$?`, answer: "18", hint: "Find Tₙ first, then set it equal to 359.", solution: m`$a = 1$, $b = 5 - 3 = 2$, $c = 2 - 3 = -1$, so $T_n = n^2 + 2n - 1$.

$$n^2 + 2n - 1 = 359 \Rightarrow n^2 + 2n - 360 = 0 \Rightarrow (n + 20)(n - 18) = 0$$

$n = 18$ (reject $n = -20$).` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["pattern-general", "pattern-term"], title: "Pattern drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Constant 1st difference → linear; constant 2nd difference → quadratic.", m`$2a$ = 2nd difference, $3a + b = T_2 - T_1$, $a + b + c = T_1$.`, "Check your formula with a term you didn't use.", m`"Which term" → solve for $n$, keep only natural numbers.`] },
          { type: "terms" },
          {
            type: "quiz",
            id: "patterns-quiz",
            questions: [
              { q: "The second difference of 1; 4; 9; 16; … is…", options: ["3", "2", "5", "7"], answer: 1, explain: "First differences 3; 5; 7 → second difference 2." },
              { q: m`If the second difference is $-6$, then $a = $`, options: [m`$-6$`, m`$-12$`, m`$-3$`, m`$3$`], answer: 2, explain: m`$2a = -6 \Rightarrow a = -3$.` },
              { q: "Which pattern is quadratic?", options: ["2; 4; 8; 16", "5; 9; 13; 17", "1; 3; 7; 13", "10; 7; 4; 1"], answer: 2, explain: "1; 3; 7; 13 has first differences 2; 4; 6 and a constant second difference of 2." },
              { q: m`For $T_n = n^2 - 3n + 5$, $T_{10} = $`, options: ["75", "65", "105", "35"], answer: 0, explain: m`$100 - 30 + 5 = 75$.` },
              { q: m`Solving "which term is 200?" gives $n = 12$ or $n = -\frac{50}{3}$. The answer is…`, options: ["both", "the 12th term", m`$n = -\frac{50}{3}$`, "neither"], answer: 1, explain: "A term's position must be a natural number." },
              { q: m`The next term of $3;\ 8;\ 15;\ 24;\ \dots$ is…`, options: ["33", "35", "31", "48"], answer: 1, explain: "The first differences 5; 7; 9 continue with 11: 24 + 11 = 35." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "pattern-problems",
    topic: "g11-patterns",
    order: 2,
    title: "Patterns in the wild",
    tagline: "Matchsticks, stadium seats and hidden maximums – word problems, sorted.",
    emoji: "🏟️",
    caps: "CAPS Gr 11 · Number patterns: solve problems involving quadratic patterns, including in context, and work with the first-difference pattern.",
    objectives: [
      "Model a real-life situation with a quadratic pattern",
      "Work with the pattern of first differences",
      "Find the largest (or smallest) term of a quadratic pattern",
      "Find a missing term from the constant second difference",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "First-difference pattern", def: m`The first differences of a quadratic pattern form a LINEAR pattern: $T_{n+1} - T_n = 2an + (a + b)$.` },
      { term: "Maximum term", def: m`If $a < 0$ the terms increase then decrease; the biggest term is near $n = -\frac{b}{2a}$.` },
      { term: "Missing term", def: "Use the constant second difference to set up an equation for the unknown term." },
      { term: "Position (n)", def: m`The place of a term in the pattern: $n = 1, 2, 3, \dots$ – always a natural number.` },
      { term: "Modelling", def: "Turning a real situation (seats, tiles, matchsticks) into a pattern so you can predict any term." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Matchstick triangles",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Build triangles of triangles out of matchsticks. Picture 1 uses **3** sticks, picture 2 uses **9**, picture 3 uses **18**, picture 4 uses **30**. How many for picture 20? Nobody's building that – let's use maths.` },
          {
            type: "worked",
            title: "Model it",
            problem: m`Find $T_n$ for $3;\ 9;\ 18;\ 30;\ \dots$ and use it to find $T_{20}$.`,
            steps: [
              { md: m`First differences $6;\ 9;\ 12$, second difference $3$.` },
              { md: m`$2a = 3 \Rightarrow a = \frac{3}{2}$; $\ 3a + b = 6 \Rightarrow b = \frac{3}{2}$; $\ a + b + c = 3 \Rightarrow c = 0$` },
              { md: m`$T_n = \frac{3}{2}n^2 + \frac{3}{2}n = \frac{3n(n+1)}{2}$`, why: "Fractions for a and b are completely normal." },
              { md: m`$T_{20} = \frac{3(20)(21)}{2} = 630$ matchsticks.` },
            ],
          },
        ],
      },
      {
        id: "first-differences",
        title: "The pattern inside the pattern",
        minutes: 7,
        blocks: [
          { type: "text", md: m`The first differences of a quadratic pattern are themselves a **linear** pattern. For $4;\ 11;\ 22;\ 37;\ \dots$ the first differences are $7;\ 11;\ 15;\ \dots$ – going up by 4 each time, so the general first difference is $4n + 3$.` },
          {
            type: "worked",
            title: "Between which terms?",
            problem: m`In $4;\ 11;\ 22;\ 37;\ \dots$, between which two consecutive terms is the difference $99$?`,
            steps: [
              { md: m`First differences: $7;\ 11;\ 15;\ \dots$ with general term $4n + 3$.` },
              { md: m`$4n + 3 = 99 \Rightarrow n = 24$` },
              { md: m`The 24th first difference is $T_{25} - T_{24}$, so it's between **$T_{24}$ and $T_{25}$**.`, why: "First difference number n sits between term n and term n + 1." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`The first difference with position $n$ is $T_{n+1} - T_n$, so the answer is "between term 24 and term 25", not "term 24".` },
        ],
      },
      {
        id: "max-and-missing",
        title: "Biggest terms & missing terms",
        minutes: 8,
        blocks: [
          { type: "text", md: m`When $a < 0$, the pattern climbs then falls – like a ball thrown up. The largest term is at (or next to) $n = -\frac{b}{2a}$, the axis of symmetry of the parabola.` },
          {
            type: "practice",
            id: "pattern-problems-practice",
            problems: [
              { q: m`For $T_n = -2n^2 + 24n - 10$, which term is the largest? (Give $n$.)`, answer: "6", hint: "n = −b / 2a", solution: m`$$n = -\frac{24}{2(-2)} = 6$$

So $T_6$ is the largest term: $T_6 = -72 + 144 - 10 = 62$.` },
              { q: m`A stand has 12 seats in row 1, 15 in row 2, 20 in row 3 and 27 in row 4. How many seats are in row 10?`, answer: "111", hint: "Find Tₙ for 12; 15; 20; 27.", solution: m`First differences $3;\ 5;\ 7$, second difference $2$: $a = 1$, $b = 3 - 3 = 0$, $c = 12 - 1 = 11$.

$$T_n = n^2 + 11 \Rightarrow T_{10} = 111$$` },
              { q: m`$x;\ 8;\ 17;\ 30;\ \dots$ is a quadratic pattern. Find $x$.`, answer: "3", hint: "Write the first differences in terms of x, then make the second differences equal.", solution: m`First differences: $8 - x;\ 9;\ 13$. Second differences: $9 - (8 - x) = 1 + x$ and $13 - 9 = 4$.

$$1 + x = 4 \Rightarrow x = 3$$` },
            ],
          },
          { type: "widget", widget: "pattern-machine" },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Real-life pattern? Write the first few terms, then use the a, b, c method.", m`First differences are linear: $T_{n+1} - T_n = 2an + a + b$.`, m`$a < 0$: largest term near $n = -\frac{b}{2a}$.`, "Missing term: make the second differences equal."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "pattern-problems-quiz",
            questions: [
              { q: "The first differences of a quadratic pattern form…", options: ["another quadratic pattern", "a linear pattern", "a constant", "a geometric pattern"], answer: 1, explain: "They go up by the (constant) second difference each time – that's linear." },
              { q: m`For $T_n = -n^2 + 10n$, the largest term is…`, options: [m`$T_5 = 25$`, m`$T_{10} = 0$`, m`$T_1 = 9$`, m`$T_{-5}$`], answer: 0, explain: m`$n = -\frac{10}{2(-1)} = 5$ and $T_5 = -25 + 50 = 25$.` },
              { q: m`The 7th first difference is…`, options: [m`$T_7 - T_6$`, m`$T_8 - T_7$`, m`$T_7$`, m`$T_8 - T_6$`], answer: 1, explain: m`The first difference in position $n$ is $T_{n+1} - T_n$.` },
              { q: m`$T_n = \frac{1}{2}n^2 + \frac{1}{2}n$ gives $T_4 = $`, options: ["8", "10", "20", "6"], answer: 1, explain: m`$\frac{1}{2}(16) + \frac{1}{2}(4) = 8 + 2 = 10$ (the triangular numbers!).` },
              { q: "A quadratic pattern has a second difference of 0. It is actually…", options: ["quadratic", "linear (or constant)", "impossible", "geometric"], answer: 1, explain: "2a = 0 means a = 0, so Tₙ = bn + c – linear." },
            ],
          },
        ],
      },
    ],
  },
];
