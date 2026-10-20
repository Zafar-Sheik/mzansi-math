import type { Lesson } from "../types";

const m = String.raw;

export const G11_PROBABILITY: Lesson[] = [
  {
    slug: "venn-diagrams",
    topic: "g11-probability",
    order: 1,
    title: "Venn diagrams & the addition rule",
    tagline: "Draw the overlap – and never count anyone twice.",
    emoji: "⭕",
    caps: "CAPS Gr 11 · Probability: revise the addition rule and mutually exclusive and complementary events; Venn diagrams with up to three events to solve probability problems.",
    objectives: [
      "Use the sample space, complements and the addition rule",
      "Recognise mutually exclusive events",
      "Fill in a Venn diagram with two or three events from the inside out",
      "Calculate probabilities from a Venn diagram",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Sample space", def: m`$S$: the set of all possible outcomes. $P(S) = 1$.` },
      { term: "Complement", def: m`"Not A": $P(\text{not } A) = 1 - P(A)$.` },
      { term: "Addition rule", def: m`$P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$.` },
      { term: "Mutually exclusive", def: m`Events that cannot happen together: $P(A \text{ and } B) = 0$, so $P(A \text{ or } B) = P(A) + P(B)$.` },
      { term: "Exhaustive events", def: m`Events that together cover the whole sample space: $P(A \text{ or } B) = 1$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Counting the overlap",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`In a class of 40, 25 learners have TikTok and 20 have Instagram. That's 45 accounts – more than the class! Some learners have **both**, and they've been counted twice. The addition rule subtracts them once: that's the whole idea behind Venn diagrams.` },
          { type: "widget", widget: "probability-lab", props: { mode: "venn" } },
          { type: "callout", variant: "exam", md: m`Probability is about 15–20 marks of **Paper 1** in Grade 11 and (with counting) in Grade 12.` },
        ],
      },
      {
        id: "rules",
        title: "The rules",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Using the addition rule",
            problem: m`$P(A) = 0{,}45$, $P(B) = 0{,}3$ and $P(A \text{ or } B) = 0{,}6$. Calculate $P(A \text{ and } B)$ and $P(\text{not } A)$.`,
            steps: [
              { md: m`$0{,}6 = 0{,}45 + 0{,}3 - P(A \text{ and } B)$` },
              { md: m`$P(A \text{ and } B) = 0{,}15$` },
              { md: m`$P(\text{not } A) = 1 - 0{,}45 = 0{,}55$` },
            ],
          },
          {
            type: "practice",
            id: "addition-practice",
            problems: [
              { q: m`$A$ and $B$ are mutually exclusive, $P(A) = 0{,}25$ and $P(B) = 0{,}4$. Calculate $P(A \text{ or } B)$.`, answer: "0.65", solution: m`$$P(A \text{ or } B) = 0{,}25 + 0{,}4 = 0{,}65$$` },
              { q: m`$P(A) = 0{,}5$, $P(B) = 0{,}35$ and $P(A \text{ and } B) = 0{,}1$. Calculate $P(\text{not } (A \text{ or } B))$.`, answer: "0.25", solution: m`$$P(A \text{ or } B) = 0{,}5 + 0{,}35 - 0{,}1 = 0{,}75 \Rightarrow 1 - 0{,}75 = 0{,}25$$` },
              { q: m`In a class of 40, 25 use TikTok, 20 use Instagram and 8 use neither. How many use both?`, answer: "13", hint: "40 − 8 = 32 use at least one.", solution: m`$$32 = 25 + 20 - \text{both} \Rightarrow \text{both} = 13$$` },
            ],
          },
        ],
      },
      {
        id: "three",
        title: "Three events",
        minutes: 9,
        blocks: [
          { type: "text", md: m`With three events, fill the Venn diagram **from the inside out**: first the centre (all three), then each overlap of two (subtract the centre), then the "only" regions, and finally "none" outside the circles.` },
          { type: "widget", widget: "probability-lab", props: { venn3: { title: "Soccer, netball and chess: 100 learners", names: ["Soccer (S)", "Netball (N)", "Chess (C)"], counts: [25, 20, 10, 8, 6, 5, 4, 22] } } },
          {
            type: "worked",
            title: "Reading the Venn diagram",
            problem: m`Use the diagram. A learner is chosen at random. Calculate (a) $P(S)$, (b) $P(\text{exactly one activity})$, (c) $P(S \text{ and not } C)$.`,
            steps: [
              { md: m`(a) $n(S) = 25 + 8 + 6 + 4 = 43$, so $P(S) = \frac{43}{100}$` },
              { md: m`(b) $25 + 20 + 10 = 55$, so $P = \frac{55}{100} = \frac{11}{20}$` },
              { md: m`(c) inside S but outside C: $25 + 8 = 33$, so $P = \frac{33}{100}$` },
            ],
          },
          {
            type: "practice",
            id: "venn-three-practice",
            problems: [
              { q: m`Using the same diagram, calculate $P(\text{none of the activities})$.`, answer: "11/50", solution: m`$$\frac{22}{100} = \frac{11}{50}$$` },
              { q: m`Calculate $P(N \text{ and } C)$ (in both, whether or not in S).`, answer: "9/100", solution: m`$$\frac{5 + 4}{100} = \frac{9}{100}$$` },
              { q: m`Calculate $P(\text{at least two activities})$.`, answer: "23/100", solution: m`$$\frac{8 + 6 + 5 + 4}{100} = \frac{23}{100}$$` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 6,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["prob-rules"], title: "Probability rules drill" } },
          { type: "keypoints", points: ["P(A or B) = P(A) + P(B) − P(A and B).", "Mutually exclusive: P(A and B) = 0.", "P(not A) = 1 − P(A).", "Three-event Venn: fill from the centre outwards."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "venn-quiz",
            questions: [
              { q: "Two events are mutually exclusive. Then P(A and B) = ", options: ["1", "P(A) × P(B)", "0", "P(A) + P(B)"], answer: 2, explain: "They can't happen at the same time." },
              { q: m`$P(A) = 0{,}7$. $P(\text{not } A) = $`, options: [m`$0{,}7$`, m`$0{,}3$`, m`$1{,}7$`, m`$0$`], answer: 1, explain: m`$1 - 0{,}7$.` },
              { q: "When filling a three-event Venn diagram, start with…", options: ["the 'only' regions", "the region outside", "the centre (all three)", "the biggest number"], answer: 2, explain: "Then subtract it from each overlap of two." },
              { q: m`$P(A) = 0{,}4$, $P(B) = 0{,}5$, $P(A \text{ or } B) = 0{,}9$. The events are…`, options: ["mutually exclusive", "impossible", "independent", "complementary only"], answer: 0, explain: m`$0{,}4 + 0{,}5 = 0{,}9$, so $P(A \text{ and } B) = 0$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "independent-events",
    topic: "g11-probability",
    order: 2,
    title: "Independent events, trees & two-way tables",
    tagline: "Does one thing change the chance of the other?",
    emoji: "🌳",
    caps: "CAPS Gr 11 · Probability: dependent and independent events; the product rule for independent events; tree diagrams and contingency (two-way) tables for solving probability problems where events are not necessarily independent.",
    objectives: [
      "Test whether two events are independent",
      "Draw tree diagrams with and without replacement",
      "Use two-way (contingency) tables",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 70,
    terms: [
      { term: "Independent events", def: m`The outcome of one doesn't affect the other: $P(A \text{ and } B) = P(A) \times P(B)$.` },
      { term: "Dependent events", def: "The outcome of one changes the probability of the other – e.g. drawing without replacement." },
      { term: "Tree diagram", def: "Branches show each stage. Multiply along a branch; add the branches you want." },
      { term: "Contingency table", def: "A two-way table of counts for two categories, with row and column totals." },
      { term: "Testing independence", def: m`Calculate $P(A) \times P(B)$ and compare with $P(A \text{ and } B)$: equal ⇒ independent.` },
    ],
    chunks: [
      {
        id: "trees",
        title: "Tree diagrams",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A bag of Jelly Tots has 5 green and 3 yellow sweets. You take one, eat it, take another. The second draw **depends** on the first – there's one sweet fewer, and maybe one green fewer. Tree diagrams keep track.` },
          { type: "widget", widget: "probability-lab", props: { mode: "tree" } },
          {
            type: "worked",
            title: "Without replacement",
            problem: m`A bag holds 5 green and 3 yellow sweets. Two are taken without replacement. Calculate $P(\text{both green})$ and $P(\text{two different colours})$.`,
            steps: [
              { md: m`$P(GG) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}$`, why: "After one green is taken, 4 of the 7 left are green." },
              { md: m`$P(GY) + P(YG) = \frac{5}{8} \times \frac{3}{7} + \frac{3}{8} \times \frac{5}{7} = \frac{30}{56} = \frac{15}{28}$` },
            ],
          },
          {
            type: "practice",
            id: "tree-practice",
            problems: [
              { q: m`Same bag (5 green, 3 yellow), but WITH replacement. Calculate $P(\text{both yellow})$.`, answer: "9/64", solution: m`$$\frac{3}{8} \times \frac{3}{8} = \frac{9}{64}$$` },
              { q: m`Without replacement: calculate $P(\text{at least one yellow})$.`, answer: "9/14", hint: "1 − P(both green).", solution: m`$$1 - \frac{5}{14} = \frac{9}{14}$$` },
              { q: m`The probability that it rains on a day is $0{,}3$, independent of other days. Calculate the probability that it rains on neither of two days.`, answer: "0.49", solution: m`$$0{,}7 \times 0{,}7 = 0{,}49$$` },
            ],
          },
        ],
      },
      {
        id: "independent",
        title: "Independent or not?",
        minutes: 9,
        blocks: [
          {
            type: "table",
            headers: ["", "Wears glasses", "No glasses", "Total"],
            rows: [["Boys", "30", "90", "120"], ["Girls", "20", "60", "80"], ["Total", "50", "150", "200"]],
            caption: "200 learners at a school.",
          },
          {
            type: "worked",
            title: "Testing independence",
            problem: m`Are "being a boy" and "wearing glasses" independent events?`,
            steps: [
              { md: m`$P(\text{boy}) = \frac{120}{200} = 0{,}6$ and $P(\text{glasses}) = \frac{50}{200} = 0{,}25$` },
              { md: m`$P(\text{boy}) \times P(\text{glasses}) = 0{,}15$` },
              { md: m`$P(\text{boy and glasses}) = \frac{30}{200} = 0{,}15$` },
              { md: m`Equal, so the events are independent.`, why: "Wearing glasses is just as common among boys (30 of 120) as among girls (20 of 80)." },
            ],
          },
          {
            type: "practice",
            id: "independence-practice",
            problems: [
              { q: m`From the table: calculate $P(\text{girl and no glasses})$.`, answer: "3/10", solution: m`$$\frac{60}{200} = \frac{3}{10}$$` },
              { q: m`From the table: calculate $P(\text{girl or wears glasses})$.`, answer: "11/20", solution: m`$$\frac{80 + 50 - 20}{200} = \frac{110}{200} = \frac{11}{20}$$` },
              { q: m`$P(A) = 0{,}4$ and $P(B) = 0{,}5$. If $A$ and $B$ are independent, calculate $P(A \text{ or } B)$.`, answer: "0.7", solution: m`$$P(A \text{ and } B) = 0{,}2;\quad P(A \text{ or } B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7$$` },
            ],
          },
          {
            type: "match",
            id: "prob-match",
            title: "Match the situation to the rule",
            pairs: [
              { left: "Two events that can't happen together", right: "P(A and B) = 0" },
              { left: "Two independent events", right: "P(A and B) = P(A) × P(B)" },
              { left: "Any two events", right: "P(A or B) = P(A) + P(B) − P(A and B)" },
              { left: "The opposite of an event", right: "P(not A) = 1 − P(A)" },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 7,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["tree-diagram", "contingency", "prob-rules"], title: "Probability drill" } },
          { type: "exam", question: { id: "tree-exam", q: m`Thabo has a 0,8 chance of passing his learner's licence test on any attempt. If he fails, he tries again (attempts are independent). Calculate the probability that he passes on his second attempt, and the probability that he needs more than two attempts.`, marks: 4, level: "complex", memo: [m`fails then passes: $0{,}2 \times 0{,}8$`, m`$= 0{,}16$`, m`fails twice: $0{,}2 \times 0{,}2$`, m`$= 0{,}04$`] } },
          { type: "keypoints", points: ["Multiply along branches, add branches.", "Without replacement: the second-stage denominators drop by 1.", "Independent ⇔ P(A and B) = P(A) × P(B).", "Two-way tables: read a cell, divide by the grand total."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "independent-quiz",
            questions: [
              { q: "Drawing two cards from a pack without replacement gives…", options: ["independent events", "dependent events", "mutually exclusive events", "impossible events"], answer: 1, explain: "The first card changes what's left." },
              { q: m`$P(A) = 0{,}3$, $P(B) = 0{,}5$, $P(A \text{ and } B) = 0{,}15$. A and B are…`, options: ["independent", "mutually exclusive", "dependent", "complementary"], answer: 0, explain: m`$0{,}3 \times 0{,}5 = 0{,}15$.` },
              { q: "On a tree diagram, to find P(first red AND second red) you…", options: ["add the branches", "multiply along the branches", "subtract from 1", "divide"], answer: 1, explain: "AND along a path means multiply." },
              { q: "A bag has 2 red and 2 blue. Without replacement, P(both red) = ", options: ["1/4", "1/6", "1/3", "1/2"], answer: 1, explain: "2/4 × 1/3 = 1/6." },
            ],
          },
        ],
      },
    ],
  },
];
