import type { Lesson } from "../types";

const m = String.raw;

export const G12_COUNTING: Lesson[] = [
  {
    slug: "counting-principle",
    topic: "g12-counting",
    order: 1,
    title: "The fundamental counting principle",
    tagline: "Multiply the choices – and the numbers get huge, fast.",
    emoji: "🔐",
    caps: "CAPS Gr 12 · Counting principles: the fundamental counting principle; factorial notation; codes and arrangements with and without repetition.",
    objectives: [
      "Use the fundamental counting principle",
      "Count codes with and without repetition",
      "Use factorial notation",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 55,
    terms: [
      { term: "Fundamental counting principle", def: m`If one choice can be made in $m$ ways and a second in $n$ ways, together they can be made in $m \times n$ ways.` },
      { term: "Factorial", def: m`$n! = n \times (n - 1) \times \dots \times 2 \times 1$. By definition $0! = 1$.` },
      { term: "With repetition", def: m`Each position has all the choices: $k$ positions from $n$ items gives $n^k$.` },
      { term: "Without repetition", def: m`Each position has one choice fewer: $n \times (n - 1) \times \dots$ ($k$ factors).` },
    ],
    chunks: [
      {
        id: "hook",
        title: "How safe is your PIN?",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A 4-digit bank PIN: 10 choices for each digit, so $10 \times 10 \times 10 \times 10 = 10\,000$ PINs. A thief has 3 tries – a $\frac{3}{10\,000}$ chance. South African number plates like **CA 123-456** or **ND 456 789**? Count them and you'll see why provinces rarely run out.` },
          { type: "widget", widget: "counting-lab", props: { mode: "slots" } },
          { type: "callout", variant: "exam", md: m`Counting and probability is about 15 marks of Grade 12 **Paper 1** – short, well-structured questions that reward clear reasoning.` },
        ],
      },
      {
        id: "codes",
        title: "Codes and the counting principle",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Codes",
            problem: m`How many 4-digit PINs are there (a) if digits may repeat, (b) if digits may not repeat, (c) if digits may not repeat and the PIN may not start with 0?`,
            steps: [
              { md: m`(a) $10 \times 10 \times 10 \times 10 = 10\,000$` },
              { md: m`(b) $10 \times 9 \times 8 \times 7 = 5\,040$`, why: "One digit fewer is available for each next position." },
              { md: m`(c) $9 \times 9 \times 8 \times 7 = 4\,536$`, why: "First place: 1–9 (9 choices). Second place: 0 is back, but the first digit is used – still 9." },
            ],
          },
          {
            type: "worked",
            title: "Factorials",
            problem: m`In how many ways can 6 learners stand in a row?`,
            steps: [
              { md: m`$6 \times 5 \times 4 \times 3 \times 2 \times 1 = 6! = 720$` },
            ],
          },
          {
            type: "practice",
            id: "codes-practice",
            problems: [
              { q: m`How many number plates have 3 letters followed by 3 digits (letters and digits may repeat)?`, answer: "17576000", solution: m`$$26^3 \times 10^3 = 17\,576 \times 1\,000 = 17\,576\,000$$` },
              { q: m`A restaurant has 4 starters, 6 mains and 3 desserts. How many 3-course meals are possible?`, answer: "72", solution: m`$$4 \times 6 \times 3 = 72$$` },
              { q: m`Calculate $\frac{8!}{5!}$.`, answer: "336", solution: m`$$\frac{8!}{5!} = 8 \times 7 \times 6 = 336$$` },
              { q: m`How many 3-letter "words" (any letters, no repeats) can be formed from A–Z?`, answer: "15600", solution: m`$$26 \times 25 \times 24 = 15\,600$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Multiply the number of choices for each position.", "With repetition: n × n × n…", "Without repetition: n × (n − 1) × (n − 2)…", "n objects in a row: n!"] },
          { type: "terms" },
          {
            type: "quiz",
            id: "counting-principle-quiz",
            questions: [
              { q: "5! = ", options: ["25", "120", "60", "15"], answer: 1, explain: "5 × 4 × 3 × 2 × 1." },
              { q: "3 shirts and 4 pairs of trousers make how many outfits?", options: ["7", "12", "34", "81"], answer: 1, explain: "Counting principle: 3 × 4 = 12." },
              { q: "Number of 2-digit codes from 0–9, no repetition:", options: ["100", "90", "20", "45"], answer: 1, explain: "10 choices, then 9: 10 × 9 = 90." },
              { q: "0! = ", options: ["0", "1", "undefined", "10"], answer: 1, explain: "By definition – there's exactly one way to arrange nothing." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "arrangements",
    topic: "g12-counting",
    order: 2,
    title: "Arrangements with restrictions",
    tagline: "Fill the fussy positions first.",
    emoji: "🔤",
    caps: "CAPS Gr 12 · Counting principles: arrangements of n different objects; arrangements with identical objects; arrangements with restrictions (fixed positions, objects together or apart).",
    objectives: [
      "Arrange different objects in a row",
      "Divide out repeated (identical) letters",
      "Handle fixed positions and objects that must be together or apart",
    ],
    styles: ["kinaesthetic", "read-write"],
    xp: 65,
    terms: [
      { term: "Arrangement of n objects", def: m`$n!$ ways (all different).` },
      { term: "Identical objects", def: m`Divide by $k!$ for each object repeated $k$ times: e.g. SOWETO has $\frac{6!}{2!} = 360$ arrangements.` },
      { term: "Fixed position", def: "Fill the restricted position(s) first, then arrange the rest." },
      { term: "Together", def: m`Glue them into one block: arrange the blocks, then multiply by the ways to arrange inside the block.` },
      { term: "Apart", def: "Total arrangements minus the arrangements where they are together." },
    ],
    chunks: [
      {
        id: "words",
        title: "Arranging letters",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "counting-lab", props: { mode: "words" } },
          {
            type: "worked",
            title: "Repeated letters",
            problem: m`How many arrangements are there of the letters of (a) MZANSI and (b) LIMPOPO?`,
            steps: [
              { md: m`(a) 6 different letters: $6! = 720$` },
              { md: m`(b) 7 letters with P twice and O three times: $\frac{7!}{2! \times 3!} = \frac{5\,040}{12} = 420$`, why: "Swapping the two P's (or the three O's) gives the same 'word', so each arrangement was counted 2! × 3! times." },
            ],
          },
          {
            type: "worked",
            title: "Restrictions",
            problem: m`The letters of MZANSI are arranged. How many arrangements (a) begin with a vowel, (b) begin with M and end with I, (c) have Z and A next to each other?`,
            steps: [
              { md: m`(a) 2 vowels (A, I) for the first place, then $5!$ for the rest: $2 \times 120 = 240$` },
              { md: m`(b) both ends fixed, arrange the middle 4: $4! = 24$` },
              { md: m`(c) block ZA: 5 blocks give $5! = 120$, times 2 for ZA or AZ: $240$` },
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
            id: "arrangement-practice",
            problems: [
              { q: m`How many arrangements are there of the letters of SOWETO?`, answer: "360", solution: m`$$\frac{6!}{2!} = 360 \text{ (two O's)}$$` },
              { q: m`6 learners stand in a row. In how many ways can they stand if Lindiwe and Pieter must stand next to each other?`, answer: "240", solution: m`$$2 \times 5! = 240$$` },
              { q: m`In how many ways can the same 6 learners stand if Lindiwe and Pieter may NOT stand next to each other?`, answer: "480", solution: m`$$6! - 2 \times 5! = 720 - 240 = 480$$` },
              { q: m`The letters of MATRIC are arranged. How many arrangements begin and end with a vowel?`, answer: "48", hint: "Vowels: A and I. Two ways to place them at the ends.", solution: m`$$2 \times 1 \times 4! = 48$$` },
            ],
          },
          { type: "sequence", id: "counting-steps", title: "Counting with restrictions", steps: ["Read the restriction carefully", "Fill the restricted positions (or glue the 'together' objects) first", "Count the ways to arrange everything that's left", "Multiply (and divide by k! for identical objects)", "For 'not together': subtract the 'together' count from the total"], explain: "Restricted first, free last – the opposite order gives wrong answers." },
          { type: "widget", widget: "drill", props: { generators: ["counting"], title: "Counting drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["n different objects: n!", "Identical objects: divide by k! for each.", "Fixed positions first.", "Together: glue (× ways inside the block). Apart: total − together."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "arrangements-quiz",
            questions: [
              { q: "Arrangements of the letters of KAROO:", options: ["120", "60", "24", "30"], answer: 1, explain: "5!/2! = 60 (two O's)." },
              { q: "5 people in a row, two must sit together:", options: ["24", "48", "120", "72"], answer: 1, explain: "2 × 4! = 48." },
              { q: "To count 'A and B NOT together', you…", options: ["glue them", "subtract the 'together' count from the total", "divide by 2", "use n²"], answer: 1, explain: "Complement counting." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "counting-probability",
    topic: "g12-counting",
    order: 3,
    title: "Probability with counting",
    tagline: "Count the good outcomes, count all outcomes, divide.",
    emoji: "🎰",
    caps: "CAPS Gr 12 · Counting principles applied to probability: probability of an event as the number of favourable arrangements divided by the total number of arrangements.",
    objectives: [
      "Use counting to find probabilities",
      "Combine counting with the addition rule and complements",
    ],
    styles: ["read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Probability by counting", def: m`$P(E) = \frac{n(E)}{n(S)} = \frac{\text{number of favourable arrangements}}{\text{total number of arrangements}}$` },
      { term: "At least one", def: m`Often easiest with the complement: $P(\text{at least one}) = 1 - P(\text{none})$.` },
      { term: "Random arrangement", def: "Every arrangement is equally likely, so probabilities can be found by counting." },
      { term: "Lotto-style odds", def: "A single ticket wins with probability 1 ÷ (total number of possible tickets)." },
    ],
    chunks: [
      {
        id: "prob",
        title: "Counting meets probability",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A 4-digit PIN is chosen at random. What's the chance that it has no repeated digits? There are $10\,000$ PINs and $5\,040$ with all digits different, so the probability is $\frac{5\,040}{10\,000} = 0{,}504$ – barely more than half! Repeated digits are more common than people think.` },
          {
            type: "worked",
            title: "Random arrangements",
            problem: m`The letters of MATRIC are arranged at random. Calculate the probability that (a) the arrangement begins and ends with a vowel, (b) T and R are next to each other.`,
            steps: [
              { md: m`Total: $6! = 720$` },
              { md: m`(a) $\frac{2 \times 4!}{720} = \frac{48}{720} = \frac{1}{15}$` },
              { md: m`(b) $\frac{2 \times 5!}{720} = \frac{240}{720} = \frac{1}{3}$` },
            ],
          },
          {
            type: "practice",
            id: "counting-prob-practice",
            problems: [
              { q: m`The letters of MZANSI are arranged at random. What is the probability that the arrangement begins with M and ends with I?`, answer: "1/30", solution: m`$$\frac{4!}{6!} = \frac{24}{720} = \frac{1}{30}$$` },
              { q: m`A 3-digit code is formed from 0–9 (repetition allowed). What is the probability that all three digits are the same?`, answer: "1/100", solution: m`$$\frac{10}{1\,000} = \frac{1}{100}$$` },
              { q: m`5 friends sit in a row at random. What is the probability that the two oldest sit next to each other?`, answer: "2/5", solution: m`$$\frac{2 \times 4!}{5!} = \frac{48}{120} = \frac{2}{5}$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["counting-probability", "counting"], title: "Counting & probability drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "exam", question: { id: "counting-exam", q: m`A 4-digit code is formed from the digits 1 to 9 without repetition. (a) How many codes are possible? (b) How many codes are even? (c) What is the probability that a random code is even and greater than 5 000?`, marks: 6, level: "complex", memo: [m`(a) $9 \times 8 \times 7 \times 6$`, m`$= 3\,024$`, m`(b) last digit 2, 4, 6 or 8: $4 \times 8 \times 7 \times 6 = 1\,344$`, m`(c) first digit 5–9 and last digit even, case 1: first digit odd (5, 7, 9): $3 \times 4 \times 7 \times 6 = 504$`, m`case 2: first digit even (6, 8): $2 \times 3 \times 7 \times 6 = 252$`, m`$P = \frac{756}{3\,024} = \frac{1}{4}$`] } },
          { type: "keypoints", points: ["P = favourable ÷ total.", "Count both with the same method.", "'At least one': use 1 − P(none).", "Split into cases when one choice affects another."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "counting-prob-quiz",
            questions: [
              { q: "The letters of CAPE are arranged at random. P(starts with C) = ", options: ["1/24", "1/4", "1/6", "1/2"], answer: 1, explain: "3!/4! = 1/4 – any of the 4 letters is equally likely to be first." },
              { q: "A 2-digit code (0–9, repetition allowed). P(both digits even) = ", options: ["1/2", "1/4", "1/5", "25/90"], answer: 1, explain: "(5 × 5)/100 = 1/4." },
              { q: "When one restricted choice affects another (e.g. 'odd first, even last' from the same digits), you should…", options: ["ignore it", "split the count into cases", "multiply by 2", "use the complement only"], answer: 1, explain: "Work out each case separately, then add." },
            ],
          },
        ],
      },
    ],
  },
];
