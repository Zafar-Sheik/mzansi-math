/**
 * Phase 6 generators: Grade 11 statistics and probability, Grade 12
 * regression and correlation, counting and probability.
 * Same contract as generators.ts.
 */
import { seededRandom } from "@/lib/utils";
import { fracAns, fracTex, round } from "./numbers";
import { type Generator, int, pick, type Rng } from "./gen-kit";
import { arrangements, distinctPerms as perms, factorial, fiveNumber, mean, regression, sd, sum } from "./stats";

/** Decimal with a comma for LaTeX: 0,35 → 0{,}35. */
const dec = (x: number) => String(round(x, 4)).replace(".", "{,}");
/** Whole number with thin spaces between thousands, for LaTeX. */
const big = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const f2 = (x: number) => round(x, 2).toFixed(2).replace(".", "{,}");
const list = (xs: number[]) => xs.join(";\\ ");

function dataSet(r: Rng, n: number, lo: number, hi: number) {
  return Array.from({ length: n }, () => int(r, lo, hi));
}

// ------------------------------------------------------------ Grade 11 statistics
const fiveNumberGen: Generator = {
  id: "five-number",
  title: "Five-number summary & IQR",
  topic: "g11-statistics",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const n = int(r, 7, 12);
    const xs = dataSet(r, n, 10, 70);
    const s = [...xs].sort((a, b) => a - b);
    const f = fiveNumber(xs);
    const ask = pick(r, ["median", "lower quartile", "upper quartile", "interquartile range", "range"] as const);
    const value = ask === "median" ? f.q2 : ask === "lower quartile" ? f.q1 : ask === "upper quartile" ? f.q3 : ask === "interquartile range" ? f.q3 - f.q1 : f.max - f.min;
    return {
      q: `The marks of ${n} learners in a test (out of 70) were: $${list(xs)}$. Determine the **${ask}**.`,
      answer: String(value),
      hint: n % 2 ? "Sort the data first. With an odd number of values, leave the median out when you split into the lower and upper halves." : "Sort the data first. Split the sorted data into two equal halves; the quartiles are the medians of the halves.",
      solution: `Sorted: $${list(s)}$\n\n$$\\text{min} = ${f.min};\\ Q_1 = ${dec(f.q1)};\\ \\text{median} = ${dec(f.q2)};\\ Q_3 = ${dec(f.q3)};\\ \\text{max} = ${f.max}$$\n\n${ask === "interquartile range" ? `$$\\text{IQR} = Q_3 - Q_1 = ${dec(f.q3)} - ${dec(f.q1)} = ${dec(value)}$$` : ask === "range" ? `$$\\text{range} = ${f.max} - ${f.min} = ${value}$$` : `The ${ask} is $${dec(value)}$.`}`,
    };
  },
};

const meanSd: Generator = {
  id: "mean-sd",
  title: "Mean & standard deviation",
  topic: "g11-statistics",
  make(seed) {
    const r = seededRandom(seed);
    const n = int(r, 5, 8);
    const xs = dataSet(r, n, 2, 20);
    const m = mean(xs);
    const s = sd(xs);
    const devs = xs.map((x) => (x - m) ** 2);
    const askSd = r() < 0.6;
    return {
      q: `The number of goals scored by a soccer team in ${n} matches was: $${list(xs)}$. Calculate the ${askSd ? "**standard deviation**" : "**mean**"}, correct to two decimal places.`,
      answer: String(round(askSd ? s : m, 2)),
      tol: 0.011,
      hint: askSd ? "σ = √[Σ(x − x̄)² / n]. On a calculator use σx (population SD), not sx." : "Mean = sum of the values ÷ number of values.",
      solution: `$$\\bar{x} = \\frac{${sum(xs)}}{${n}} = ${f2(m)}$$${askSd ? `\n\n$$\\sum(x - \\bar{x})^2 = ${f2(sum(devs))}$$\n\n$$\\sigma = \\sqrt{\\frac{${f2(sum(devs))}}{${n}}} = ${f2(s)}$$` : ""}`,
    };
  },
};

const groupedData: Generator = {
  id: "grouped-data",
  title: "Grouped data & ogives",
  topic: "g11-statistics",
  make(seed) {
    const r = seededRandom(seed);
    const start = 10 * int(r, 2, 5), w = 10;
    const fs = Array.from({ length: 5 }, () => int(r, 2, 14));
    const rows = fs.map((f, i) => ({ lo: start + i * w, hi: start + (i + 1) * w, f, mid: start + i * w + w / 2 }));
    const table = `\n\n| Mass (kg) | Frequency |\n|---|---|\n${rows.map((x) => `| $${x.lo} \\leq m < ${x.hi}$ | ${x.f} |`).join("\n")}\n\n`;
    if (r() < 0.5) {
      const est = sum(rows.map((x) => x.f * x.mid)) / sum(fs);
      return {
        q: `The masses of learners in a class are summarised below.${table}Estimate the **mean** mass, correct to two decimal places.`,
        answer: String(round(est, 2)),
        tol: 0.011,
        hint: "Use the midpoint of each class: Σ(f × midpoint) ÷ Σf.",
        solution: `$$\\bar{x} \\approx \\frac{${rows.map((x) => `${x.f}(${x.mid})`).join(" + ")}}{${sum(fs)}} = \\frac{${sum(rows.map((x) => x.f * x.mid))}}{${sum(fs)}} = ${f2(est)} \\text{ kg}$$`,
      };
    }
    const k = int(r, 1, 3);
    const cum = sum(fs.slice(0, k + 1));
    return {
      q: `The masses of learners in a class are summarised below.${table}How many learners have a mass of **less than ${rows[k].hi} kg**? (This is the point $(${rows[k].hi};\\ ?)$ on the ogive.)`,
      answer: String(cum),
      hint: "Add the frequencies of every class up to and including the one ending at that value (cumulative frequency).",
      solution: `$$${fs.slice(0, k + 1).join(" + ")} = ${cum}$$\n\nThe ogive passes through $(${rows[k].hi};\\ ${cum})$ – cumulative frequencies are plotted at the **upper** limit of each class.`,
    };
  },
};

// ------------------------------------------------------------ Grade 11 probability
const probRules: Generator = {
  id: "prob-rules",
  title: "Probability rules",
  topic: "g11-probability",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const a = int(r, 2, 6) * 5, b = int(r, 2, 6) * 5; // percentages
    const t = int(r, 0, 4);
    const P = (x: number) => dec(x / 100);
    if (t === 0) {
      const ab = int(r, 1, Math.min(a, b) / 5) * 5;
      return {
        q: `$P(A) = ${P(a)}$, $P(B) = ${P(b)}$ and $P(A \\text{ and } B) = ${P(ab)}$. Calculate $P(A \\text{ or } B)$.`,
        answer: String((a + b - ab) / 100),
        hint: "Addition rule: P(A or B) = P(A) + P(B) − P(A and B).",
        solution: `$$P(A \\text{ or } B) = ${P(a)} + ${P(b)} - ${P(ab)} = ${P(a + b - ab)}$$`,
      };
    }
    if (t === 1) {
      return {
        q: `$A$ and $B$ are **mutually exclusive** with $P(A) = ${P(a)}$ and $P(B) = ${P(b)}$. Calculate $P(\\text{not } (A \\text{ or } B))$.`,
        answer: String((100 - a - b) / 100),
        hint: "Mutually exclusive: P(A and B) = 0, so P(A or B) = P(A) + P(B). Then use the complement.",
        solution: `$$P(A \\text{ or } B) = ${P(a)} + ${P(b)} = ${P(a + b)}$$\n$$P(\\text{not } (A \\text{ or } B)) = 1 - ${P(a + b)} = ${P(100 - a - b)}$$`,
      };
    }
    if (t === 2) {
      return {
        q: `$A$ and $B$ are **independent** with $P(A) = ${P(a)}$ and $P(B) = ${P(b)}$. Calculate $P(A \\text{ and } B)$.`,
        answer: String((a * b) / 10000),
        hint: "Independent: P(A and B) = P(A) × P(B).",
        solution: `$$P(A \\text{ and } B) = ${P(a)} \\times ${P(b)} = ${dec((a * b) / 10000)}$$`,
      };
    }
    if (t === 3) {
      const union = a * 100 + b * 100 - a * b; // in ten-thousandths
      return {
        q: `$A$ and $B$ are **independent**, $P(A) = ${P(a)}$ and $P(A \\text{ or } B) = ${dec(union / 10000)}$. Calculate $P(B)$.`,
        answer: String(b / 100),
        hint: "P(A or B) = P(A) + P(B) − P(A)·P(B). Let P(B) = x and solve.",
        solution: `$$${dec(union / 10000)} = ${P(a)} + x - ${P(a)}x \\Rightarrow ${dec((union - a * 100) / 10000)} = ${dec(1 - a / 100)}x \\Rightarrow x = ${P(b)}$$`,
      };
    }
    const ab = int(r, 1, Math.min(a, b) / 5) * 5;
    return {
      q: `$P(A) = ${P(a)}$, $P(B) = ${P(b)}$ and $P(A \\text{ and } B) = ${P(ab)}$. Are $A$ and $B$ independent? Type the value of $P(A) \\times P(B)$ to decide.`,
      answer: String((a * b) / 10000),
      hint: "Independent exactly when P(A) × P(B) = P(A and B).",
      solution: `$$P(A) \\times P(B) = ${P(a)} \\times ${P(b)} = ${dec((a * b) / 10000)}$$\n\n${a * b === ab * 100 ? `This equals $P(A \\text{ and } B)$, so the events **are** independent.` : `This is not equal to $P(A \\text{ and } B) = ${P(ab)}$, so the events are **not** independent.`}`,
    };
  },
};

const treeDiagram: Generator = {
  id: "tree-diagram",
  title: "Tree diagrams",
  topic: "g11-probability",
  make(seed) {
    const r = seededRandom(seed);
    const red = int(r, 2, 6), blue = int(r, 2, 6), n = red + blue;
    const replace = r() < 0.5;
    const ask = pick(r, ["both red", "one of each colour", "at least one blue"] as const);
    const d = replace ? n * n : n * (n - 1);
    const rr = replace ? red * red : red * (red - 1);
    const mix = 2 * red * blue;
    const num = ask === "both red" ? rr : ask === "one of each colour" ? mix : d - rr;
    const second = (x: number) => (replace ? `\\frac{${x}}{${n}}` : `\\frac{${x - 1}}{${n - 1}}`);
    return {
      q: `A bag holds ${red} red and ${blue} blue sweets. Two sweets are taken one after the other, **${replace ? "with" : "without"} replacement**. Determine the probability of getting **${ask}**.`,
      answer: fracAns(num, d),
      hint: `Draw a tree diagram. ${replace ? "With replacement the second draw is the same as the first." : "Without replacement there is one sweet fewer on the second draw."} Multiply along branches, add the branches you want.`,
      solution: ask === "both red"
        ? `$$P(RR) = \\frac{${red}}{${n}} \\times ${second(red)} = ${fracTex(num, d)}$$`
        : ask === "one of each colour"
          ? `$$P(RB) + P(BR) = \\frac{${red}}{${n}} \\times ${replace ? `\\frac{${blue}}{${n}}` : `\\frac{${blue}}{${n - 1}}`} + \\frac{${blue}}{${n}} \\times ${replace ? `\\frac{${red}}{${n}}` : `\\frac{${red}}{${n - 1}}`} = ${fracTex(num, d)}$$`
          : `$$P(\\text{at least one blue}) = 1 - P(RR) = 1 - \\frac{${red}}{${n}} \\times ${second(red)} = ${fracTex(num, d)}$$`,
    };
  },
};

const TABLES = [
  { rowA: "Grade 11", rowB: "Grade 12", colA: "takes the bus", colB: "walks" },
  { rowA: "boys", rowB: "girls", colA: "plays a sport", colB: "plays no sport" },
  { rowA: "Gauteng", rowB: "KZN", colA: "owns a smartphone", colB: "no smartphone" },
];

const contingency: Generator = {
  id: "contingency",
  title: "Two-way (contingency) tables",
  topic: "g11-probability",
  make(seed) {
    const r = seededRandom(seed);
    const T = pick(r, TABLES);
    const independent = r() < 0.4;
    let a: number, b: number, c: number, d: number;
    if (independent) {
      // rows in ratio p:q, columns in ratio s:t – every cell is a product, so the events are independent.
      const p = int(r, 1, 4), q = int(r, 1, 4), s = int(r, 1, 4), t = int(r, 1, 4), k = int(r, 3, 6);
      [a, b, c, d] = [p * s * k, p * t * k, q * s * k, q * t * k];
    } else {
      [a, b, c, d] = [int(r, 8, 40), int(r, 8, 40), int(r, 8, 40), int(r, 8, 40)];
    }
    const N = a + b + c + d;
    const table = `\n\n| | ${T.colA} | ${T.colB} | Total |\n|---|---|---|---|\n| ${T.rowA} | ${a} | ${b} | ${a + b} |\n| ${T.rowB} | ${c} | ${d} | ${c + d} |\n| Total | ${a + c} | ${b + d} | ${N} |\n\n`;
    const ask = int(r, 0, 2);
    if (ask === 0) {
      return {
        q: `A survey of learners gave the table below.${table}A learner is chosen at random. What is the probability that the learner is from ${T.rowA} **and** ${T.colA}?`,
        answer: fracAns(a, N),
        hint: "Read the single cell where the row and the column meet, divided by the grand total.",
        solution: `$$P = \\frac{${a}}{${N}}${fracTex(a, N) === `\\frac{${a}}{${N}}` ? "" : ` = ${fracTex(a, N)}`}$$`,
      };
    }
    if (ask === 1) {
      return {
        q: `A survey of learners gave the table below.${table}A learner is chosen at random. What is the probability that the learner is from ${T.rowB} **or** ${T.colA}?`,
        answer: fracAns(c + d + a, N),
        hint: "P(A or B) = P(A) + P(B) − P(A and B) – or count every learner in the row or the column once.",
        solution: `$$P = \\frac{${c + d} + ${a + c} - ${c}}{${N}} = ${fracTex(c + d + a, N)}$$`,
      };
    }
    return {
      q: `A survey of learners gave the table below.${table}Calculate $P(\\text{${T.rowA}}) \\times P(\\text{${T.colA}})$ and compare it with $P(\\text{${T.rowA} and ${T.colA}})$. Type the value of the product as a fraction.`,
      answer: fracAns((a + b) * (a + c), N * N),
      hint: "If the product equals P(both), the events are independent.",
      solution: `$$P(\\text{${T.rowA}}) \\times P(\\text{${T.colA}}) = \\frac{${a + b}}{${N}} \\times \\frac{${a + c}}{${N}} = ${fracTex((a + b) * (a + c), N * N)}$$\n$$P(\\text{both}) = ${fracTex(a, N)}$$\n\n${(a + b) * (a + c) === a * N ? "They are equal, so the events **are independent**." : "They are not equal, so the events are **not independent**."}`,
    };
  },
};

// ------------------------------------------------------------ Grade 12 statistics
const CONTEXTS = [
  { x: "hours studied", y: "test mark (%)", x0: 1, dx: 1, y0: 35, slope: [5, 9] },
  { x: "temperature (°C)", y: "cold drinks sold", x0: 18, dx: 2, y0: 20, slope: [3, 6] },
  { x: "age of a car (years)", y: "value (R thousands)", x0: 1, dx: 1, y0: 220, slope: [-22, -12] },
];

const regressionGen: Generator = {
  id: "regression",
  title: "Regression line & correlation",
  topic: "g12-statistics",
  make(seed) {
    const r = seededRandom(seed);
    const C = pick(r, CONTEXTS);
    const n = int(r, 5, 7);
    const slope = int(r, C.slope[0], C.slope[1]);
    const xs = Array.from({ length: n }, (_, i) => C.x0 + i * C.dx);
    const ys = xs.map((x) => Math.round(C.y0 + (slope * (x - C.x0)) / C.dx + int(r, -6, 6)));
    const { a, b, r: rr } = regression(xs, ys);
    const table = `\n\n| ${C.x} ($x$) | ${xs.join(" | ")} |\n|${"---|".repeat(n + 1)}\n| ${C.y} ($y$) | ${ys.join(" | ")} |\n\n`;
    const ask = pick(r, ["b", "a", "r", "predict"] as const);
    const x0 = xs[n - 1] + C.dx;
    const pred = a + b * x0;
    const answers = { b, a, r: rr, predict: pred };
    return {
      q: `The table shows ${C.x} and ${C.y}.${table}${ask === "b" ? "Determine the **gradient $b$** of the least squares regression line $\\hat{y} = a + bx$" : ask === "a" ? "Determine the **y-intercept $a$** of the least squares regression line $\\hat{y} = a + bx$" : ask === "r" ? "Determine the **correlation coefficient $r$**" : `Use the least squares regression line to **predict** $y$ when $x = ${x0}$`}, correct to two decimal places.`,
      answer: String(round(answers[ask], 2)),
      tol: ask === "predict" ? 0.06 : 0.011,
      hint: "Use your calculator in STAT (A+BX) mode: enter the x and y values, then read off A, B and r.",
      solution: `$$\\hat{y} = ${f2(a)} ${b < 0 ? "-" : "+"} ${f2(Math.abs(b))}x \\qquad r = ${f2(rr)}$$${ask === "predict" ? `\n$$\\hat{y} = ${f2(a)} ${b < 0 ? "-" : "+"} ${f2(Math.abs(b))}(${x0}) = ${f2(pred)}$$` : ""}${ask === "r" ? `\n\nThis is a ${Math.abs(rr) >= 0.7 ? "strong" : Math.abs(rr) >= 0.5 ? "moderate" : "weak"} ${rr > 0 ? "positive" : "negative"} correlation.` : ""}`,
    };
  },
};

// ------------------------------------------------------------ Grade 12 counting & probability
const WORDS = ["MATHS", "NUMBER", "DURBAN", "MZANSI", "SOWETO", "KAROO", "SANDTON", "GAUTENG", "LIMPOPO", "CAPE"];
const VOWELS = new Set("AEIOU");

function restriction(r: Rng, word: string) {
  const singles = [...new Set(word)].filter((ch) => word.split(ch).length === 2);
  const options: { text: string; test: (s: string) => boolean; work: string }[] = [
    { text: "begin with a vowel", test: (s) => VOWELS.has(s[0]), work: "Fill the first place with a vowel, then arrange the remaining letters." },
    { text: "begin and end with a consonant", test: (s) => !VOWELS.has(s[0]) && !VOWELS.has(s[s.length - 1]), work: "Fill the first and last places with consonants, then arrange the letters in between." },
  ];
  if (singles.length >= 2) {
    const [p, q] = [singles[0], singles[singles.length - 1]];
    options.push({ text: `have the letters ${p} and ${q} next to each other`, test: (s) => Math.abs(s.indexOf(p) - s.indexOf(q)) === 1, work: `Glue ${p} and ${q} into one block (which can be ${p}${q} or ${q}${p}), arrange the blocks, then multiply by 2.` });
  }
  return pick(r, options);
}

const countingGen: Generator = {
  id: "counting",
  title: "Counting & arrangements",
  topic: "g12-counting",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 0) {
      const w = pick(r, [...WORDS, "PRETORIA", "LIMPOPO"]);
      const reps = [...new Set(w)].filter((ch) => w.split(ch).length > 2);
      return {
        q: `How many different arrangements can be made using **all** the letters of the word **${w}**?`,
        answer: String(arrangements(w)),
        hint: reps.length ? "n! arrangements, but divide by k! for each letter that repeats k times." : "All the letters are different: n!",
        solution: `$$${reps.length ? `\\frac{${w.length}!}{${reps.map((ch) => `${w.split(ch).length - 1}!`).join(" \\times ")}}` : `${w.length}!`} = ${big(arrangements(w))}$$${reps.length ? `\n\nThe repeated letter${reps.length > 1 ? "s are" : " is"} ${reps.join(" and ")} – swapping identical letters gives the same word.` : ""}`,
      };
    }
    if (t === 1) {
      const w = pick(r, WORDS);
      const rule = restriction(r, w);
      const count = perms(w).filter(rule.test).length;
      return {
        q: `The letters of the word **${w}** are arranged. How many arrangements **${rule.text}**?`,
        answer: String(count),
        hint: rule.work,
        solution: `${rule.work}\n\n$$\\text{Number of arrangements} = ${big(count)}$$`,
      };
    }
    if (t === 2) {
      const k = int(r, 3, 5);
      const rep = r() < 0.5;
      const firstNonZero = r() < 0.4;
      const count = rep ? (firstNonZero ? 9 * 10 ** (k - 1) : 10 ** k) : (firstNonZero ? 9 * factorial(9) / factorial(10 - k) : factorial(10) / factorial(10 - k));
      const work = rep ? `${firstNonZero ? "9" : "10"}${` \\times 10`.repeat(k - 1)}` : Array.from({ length: k }, (_, i) => (firstNonZero ? (i === 0 ? 9 : 10 - i) : 10 - i)).join(" \\times ");
      return {
        q: `How many ${k}-digit codes can be made from the digits 0–9 if digits **${rep ? "may" : "may not"}** be repeated${firstNonZero ? " and the code may not start with 0" : ""}?`,
        answer: String(count),
        hint: "Fundamental counting principle: multiply the number of choices for each position.",
        solution: `$$${work} = ${big(count)}$$`,
      };
    }
    const n = int(r, 5, 8);
    const together = r() < 0.5;
    const count = together ? 2 * factorial(n - 1) : factorial(n) - 2 * factorial(n - 1);
    return {
      q: `${n} friends, including Thabo and Zanele, sit in a row for a photo. In how many ways can they sit if Thabo and Zanele **${together ? "must" : "may not"}** sit next to each other?`,
      answer: String(count),
      hint: together ? "Treat Thabo and Zanele as one block: (n − 1)! arrangements, times 2 for their order." : "Total arrangements minus the arrangements where they sit together.",
      solution: together ? `$$2 \\times ${n - 1}! = 2 \\times ${big(factorial(n - 1))} = ${big(count)}$$` : `$$${n}! - 2 \\times ${n - 1}! = ${big(factorial(n))} - ${big(2 * factorial(n - 1))} = ${big(count)}$$`,
    };
  },
};

const countingProb: Generator = {
  id: "counting-probability",
  title: "Probability with counting",
  topic: "g12-counting",
  make(seed) {
    const r = seededRandom(seed);
    if (r() < 0.6) {
      const w = pick(r, WORDS);
      const rule = restriction(r, w);
      const all = perms(w);
      const count = all.filter(rule.test).length;
      return {
        q: `The letters of the word **${w}** are arranged at random. What is the probability that the arrangement will **${rule.text}**?`,
        answer: fracAns(count, all.length),
        hint: "P = (number of arrangements that satisfy the condition) ÷ (total number of arrangements).",
        solution: `$$P = \\frac{${big(count)}}{${big(all.length)}} = ${fracTex(count, all.length)}$$`,
      };
    }
    const k = int(r, 3, 4);
    const noRepeat = factorial(10) / factorial(10 - k);
    return {
      q: `A ${k}-digit PIN is chosen at random from the digits 0–9 (digits may repeat). What is the probability that **no digit is repeated**?`,
      answer: fracAns(noRepeat, 10 ** k),
      hint: "Count the PINs with all different digits, then divide by all possible PINs (10 choices per digit).",
      solution: `$$P = \\frac{${Array.from({ length: k }, (_, i) => 10 - i).join(" \\times ")}}{10^{${k}}} = \\frac{${big(noRepeat)}}{${big(10 ** k)}} = ${fracTex(noRepeat, 10 ** k)}$$`,
    };
  },
};

export const STATS_PROB_GENERATORS: Generator[] = [fiveNumberGen, meanSd, groupedData, probRules, treeDiagram, contingency, regressionGen, countingGen, countingProb];
