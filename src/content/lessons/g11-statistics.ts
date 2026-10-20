import type { Lesson } from "../types";

const m = String.raw;

export const G11_STATISTICS: Lesson[] = [
  {
    slug: "box-plots",
    topic: "g11-statistics",
    order: 1,
    title: "Five-number summary, box plots & skewness",
    tagline: "Five numbers tell the whole story of a data set.",
    emoji: "📦",
    caps: "CAPS Gr 11 · Statistics: revise measures of central tendency and the five-number summary; box and whisker diagrams; symmetric and skewed data; identification of outliers.",
    objectives: [
      "Find the five-number summary (min, Q1, median, Q3, max)",
      "Draw and read a box and whisker diagram",
      "Decide whether data is symmetric, positively or negatively skewed",
      "Identify outliers with the 1,5 × IQR rule",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Five-number summary", def: m`Minimum, lower quartile $Q_1$, median $Q_2$, upper quartile $Q_3$ and maximum.` },
      { term: "Quartiles", def: m`$Q_1$ and $Q_3$ are the medians of the lower and upper halves of the sorted data (leave the median out when $n$ is odd).` },
      { term: "Interquartile range (IQR)", def: m`$Q_3 - Q_1$: the spread of the middle 50% of the data.` },
      { term: "Skewness", def: m`Positively skewed (tail to the right): mean > median. Negatively skewed (tail to the left): mean < median. Symmetric: mean ≈ median.` },
      { term: "Outlier", def: m`A value below $Q_1 - 1{,}5 \times \text{IQR}$ or above $Q_3 + 1{,}5 \times \text{IQR}$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Who's really average?",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Eleven people in a Soweto street earn between R4 000 and R12 000 a month – then a famous footballer moves in, earning R2 million. The **mean** income jumps to about R190 000; the **median** barely moves. One extreme value can wreck the mean. Statistics is about choosing the number that tells the truth.` },
          { type: "widget", widget: "data-lab", props: { mode: "box" } },
          { type: "callout", variant: "exam", md: m`Statistics is about 20 marks of Paper 2 in both Grade 11 and Grade 12. These are some of the most accessible marks in the whole exam – mostly calculator work and interpretation.` },
        ],
      },
      {
        id: "five",
        title: "The five-number summary",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Test marks",
            problem: m`The marks of 12 learners were: $34;\ 45;\ 50;\ 52;\ 55;\ 58;\ 60;\ 61;\ 64;\ 68;\ 70;\ 95$. Determine the five-number summary.`,
            steps: [
              { md: m`The data is already sorted; $n = 12$.`, why: "Always sort first – the most common slip in exams." },
              { md: m`Median: between the 6th and 7th values: $\frac{58 + 60}{2} = 59$` },
              { md: m`$Q_1$: median of the lower six values ($34$ to $58$): $\frac{50 + 52}{2} = 51$` },
              { md: m`$Q_3$: median of the upper six values ($60$ to $95$): $\frac{64 + 68}{2} = 66$` },
              { md: m`Five-number summary: $(34;\ 51;\ 59;\ 66;\ 95)$` },
            ],
          },
          {
            type: "practice",
            id: "five-number-practice",
            problems: [
              { q: m`Determine the median of $8;\ 3;\ 15;\ 10;\ 21;\ 8;\ 12$.`, answer: "10", solution: m`Sorted: $3;\ 8;\ 8;\ 10;\ 12;\ 15;\ 21$. The middle (4th) value is $10$.` },
              { q: m`For the same data ($3;\ 8;\ 8;\ 10;\ 12;\ 15;\ 21$), determine the interquartile range.`, answer: "7", hint: "n is odd: leave the median out, then find the medians of 3; 8; 8 and of 12; 15; 21.", solution: m`$Q_1 = 8$ and $Q_3 = 15$, so $\text{IQR} = 15 - 8 = 7$.` },
              { q: m`Determine $Q_3$ of $20;\ 25;\ 31;\ 33;\ 40;\ 42;\ 47;\ 55$.`, answer: "44.5", solution: m`Upper half: $40;\ 42;\ 47;\ 55$, so $Q_3 = \frac{42 + 47}{2} = 44{,}5$.` },
            ],
          },
        ],
      },
      {
        id: "box",
        title: "Box plots, skewness & outliers",
        minutes: 9,
        blocks: [
          { type: "text", md: m`A **box and whisker diagram** draws the five-number summary to scale: the box runs from $Q_1$ to $Q_3$ with a line at the median, and the whiskers reach the minimum and maximum. The shape shows the **skewness**:` },
          {
            type: "table",
            headers: ["Shape", "Box plot", "Mean vs median"],
            rows: [["Symmetric", "median in the middle of the box, whiskers equal", "mean ≈ median"], ["Positively skewed (skewed right)", "median closer to Q₁, long right whisker", "mean > median"], ["Negatively skewed (skewed left)", "median closer to Q₃, long left whisker", "mean < median"]],
          },
          {
            type: "worked",
            title: "Is 95 an outlier?",
            problem: m`For the test marks above, $Q_1 = 51$ and $Q_3 = 66$. Show that $95$ is an outlier and describe the effect it has on the mean.`,
            steps: [
              { md: m`$\text{IQR} = 66 - 51 = 15$` },
              { md: m`Upper fence: $Q_3 + 1{,}5 \times 15 = 66 + 22{,}5 = 88{,}5$` },
              { md: m`$95 > 88{,}5$, so $95$ is an outlier.` },
              { md: m`Mean with 95: $59{,}33$; without it: $56{,}09$. The outlier pulls the mean up, but the median hardly changes.`, why: "That's why the median is the better 'average' for skewed data or data with outliers." },
            ],
          },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "skew-sort", title: "Symmetric, skewed right or skewed left?", buckets: ["Symmetric", "Positively skewed", "Negatively skewed"], colour: "var(--t-stats)",
              items: [
                { text: "mean = 50, median = 50", bucket: "Symmetric" }, { text: "mean = 72, median = 61", bucket: "Positively skewed" },
                { text: "mean = 40, median = 47", bucket: "Negatively skewed" }, { text: "Household incomes in South Africa", bucket: "Positively skewed" },
                { text: "Q₂ − Q₁ = Q₃ − Q₂ and equal whiskers", bucket: "Symmetric" }, { text: "Long whisker on the left", bucket: "Negatively skewed" },
              ],
            },
          },
          {
            type: "practice",
            id: "outlier-practice",
            problems: [
              { q: m`For a data set, $Q_1 = 20$ and $Q_3 = 32$. Calculate the lower fence $Q_1 - 1{,}5 \times \text{IQR}$.`, answer: "2", solution: m`$$\text{IQR} = 12;\quad 20 - 1{,}5(12) = 20 - 18 = 2$$ Any value below 2 is an outlier.` },
              { q: m`A data set has mean $64$ and median $58$. Type 1 if it is positively skewed, or -1 if it is negatively skewed.`, answer: "1", solution: "The mean is greater than the median, so the data is positively skewed (skewed to the right)." },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 6,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["five-number"], title: "Five-number summary drill" } },
          { type: "keypoints", points: ["Sort first, then find the median, Q₁ and Q₃.", "IQR = Q₃ − Q₁ – the middle 50%.", "Mean > median: skewed right; mean < median: skewed left.", "Outliers: beyond 1,5 × IQR from the box."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "box-plots-quiz",
            questions: [
              { q: "Which measure is least affected by an outlier?", options: ["the mean", "the median", "the range", "the standard deviation"], answer: 1, explain: "The median only depends on the middle position." },
              { q: "In a box plot the median is close to Q₁ and the right whisker is long. The data is…", options: ["symmetric", "positively skewed", "negatively skewed", "bimodal"], answer: 1, explain: "The tail is on the right (high values)." },
              { q: m`$Q_1 = 15$, $Q_3 = 25$. A value is an outlier if it is above…`, options: [m`$30$`, m`$35$`, m`$40$`, m`$37{,}5$`], answer: 2, explain: m`$25 + 1{,}5 \times 10 = 40$.` },
              { q: "The interquartile range measures…", options: ["the spread of all the data", "the spread of the middle 50%", "the average", "the most common value"], answer: 1, explain: "From Q₁ to Q₃." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "histograms-ogives",
    topic: "g11-statistics",
    order: 2,
    title: "Histograms, frequency polygons & ogives",
    tagline: "Grouped data, three pictures – and the median from a graph.",
    emoji: "📊",
    caps: "CAPS Gr 11 · Statistics: histograms, frequency polygons and ogives (cumulative frequency curves) for grouped data; estimating the mean, the modal class, the median and the quartiles.",
    objectives: [
      "Draw and read histograms and frequency polygons",
      "Complete a cumulative frequency table and draw an ogive",
      "Estimate the mean of grouped data with midpoints",
      "Read the median and quartiles from an ogive",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 65,
    terms: [
      { term: "Histogram", def: "Bars for grouped (continuous) data. The bars touch; the height is the frequency." },
      { term: "Frequency polygon", def: "Join the midpoints of the tops of the histogram bars, closed off on the x-axis." },
      { term: "Cumulative frequency", def: "A running total of the frequencies: how many values are less than the upper limit of each class." },
      { term: "Ogive", def: m`A graph of cumulative frequency, plotted at the **upper** limit of each class, starting at $(\text{lowest limit};\ 0)$.` },
      { term: "Estimated mean", def: m`$\bar{x} \approx \frac{\sum f \cdot \text{midpoint}}{\sum f}$ – an estimate, because the exact values are lost when data is grouped.` },
    ],
    chunks: [
      {
        id: "pictures",
        title: "Three pictures of grouped data",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A taxi association records how long 40 commuters wait at a rank. The raw times are a mess of numbers; grouped into 10-minute classes and drawn, the pattern is obvious at a glance – and the ogive tells you the waiting time that half the commuters beat.` },
          { type: "widget", widget: "ogive-lab", props: { view: "histogram" } },
          {
            type: "table",
            headers: ["Waiting time (min)", "Frequency", "Cumulative frequency"],
            rows: [[m`$0 \leq t < 10$`, "4", "4"], [m`$10 \leq t < 20$`, "9", "13"], [m`$20 \leq t < 30$`, "15", "28"], [m`$30 \leq t < 40$`, "8", "36"], [m`$40 \leq t < 50$`, "4", "40"]],
            caption: "Waiting times of 40 commuters.",
          },
          {
            type: "worked",
            title: "Estimating the mean",
            problem: m`Estimate the mean waiting time and write down the modal class.`,
            steps: [
              { md: m`Midpoints: $5;\ 15;\ 25;\ 35;\ 45$` },
              { md: m`$\bar{x} \approx \frac{4(5) + 9(15) + 15(25) + 8(35) + 4(45)}{40} = \frac{990}{40} = 24{,}75$ minutes` },
              { md: m`Modal class: $20 \leq t < 30$ (the highest frequency, 15)` },
            ],
          },
        ],
      },
      {
        id: "ogive",
        title: "The ogive",
        minutes: 9,
        blocks: [
          { type: "text", md: m`Plot the cumulative frequency against the **upper limit** of each class: $(0;\ 0),\ (10;\ 4),\ (20;\ 13),\ (30;\ 28),\ (40;\ 36),\ (50;\ 40)$, and join the points with a smooth curve.` },
          { type: "widget", widget: "ogive-lab", props: { view: "ogive" } },
          {
            type: "worked",
            title: "Reading the median",
            problem: m`Use the ogive of the waiting times to estimate the median.`,
            steps: [
              { md: m`The median is the $\frac{40}{2} = 20$th value.` },
              { md: m`Read across from 20 on the cumulative frequency axis to the ogive, then down.` },
              { md: m`It lies between $(20;\ 13)$ and $(30;\ 28)$: $20 + \frac{20 - 13}{15} \times 10 \approx 24{,}7$ minutes`, why: "In an exam you read it off your graph – the memo accepts a small range of answers." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`The most common ogive mistake: plotting at the **midpoint** of the class. Cumulative frequency means "less than the upper limit", so plot at the upper limit – and start at zero at the lowest limit.` },
          {
            type: "practice",
            id: "ogive-practice",
            problems: [
              { q: m`Using the waiting-time table, how many commuters waited less than 30 minutes?`, answer: "28", solution: m`$4 + 9 + 15 = 28$ – the point $(30;\ 28)$ on the ogive.` },
              { q: m`How many commuters waited 30 minutes or more?`, answer: "12", solution: m`$40 - 28 = 12$` },
              { q: m`At what cumulative frequency do you read off the upper quartile for $n = 40$?`, answer: "30", solution: m`$Q_3$ is at $\frac{3}{4} \times 40 = 30$.` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Drill & quiz",
        minutes: 6,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["grouped-data"], title: "Grouped data drill" } },
          { type: "keypoints", points: ["Histogram bars touch (continuous data).", "Frequency polygon: join the midpoints of the bar tops.", "Ogive: cumulative frequency at the UPPER limit, starting at 0.", "Median at n/2, Q₁ at n/4, Q₃ at 3n/4 on the ogive."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "ogive-quiz",
            questions: [
              { q: "On an ogive, the cumulative frequency of a class is plotted at…", options: ["the midpoint", "the lower limit", "the upper limit", "the frequency"], answer: 2, explain: "It counts the values LESS than the upper limit." },
              { q: "The mean of grouped data is only an estimate because…", options: ["calculators round", "we use midpoints instead of the actual values", "the median is used", "the classes are too wide"], answer: 1, explain: "Each value is replaced by its class midpoint." },
              { q: "For 60 learners, the median on an ogive is read at a cumulative frequency of…", options: ["15", "30", "45", "60"], answer: 1, explain: "The median is at n/2 = 60/2 = 30." },
              { q: "Which graph's bars must touch?", options: ["a bar graph of favourite colours", "a histogram", "a pie chart", "a frequency polygon"], answer: 1, explain: "Histograms show continuous data." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "standard-deviation",
    topic: "g11-statistics",
    order: 3,
    title: "Variance & standard deviation",
    tagline: "How far, on average, is each value from the mean?",
    emoji: "📏",
    caps: "CAPS Gr 11 · Statistics: variance and standard deviation of ungrouped data; using a calculator; interpreting standard deviation (data within one standard deviation of the mean).",
    objectives: [
      "Calculate the variance and standard deviation by hand and by calculator",
      "Interpret a small or large standard deviation",
      "Count the data within one standard deviation of the mean",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Deviation", def: m`How far a value is from the mean: $x - \bar{x}$.` },
      { term: "Variance", def: m`$\sigma^2 = \frac{\sum (x - \bar{x})^2}{n}$ – the mean of the squared deviations.` },
      { term: "Standard deviation", def: m`$\sigma = \sqrt{\frac{\sum (x - \bar{x})^2}{n}}$ – in the same units as the data. On a calculator: $\sigma x$.` },
      { term: "Within one standard deviation", def: m`The values between $\bar{x} - \sigma$ and $\bar{x} + \sigma$.` },
    ],
    chunks: [
      {
        id: "why",
        title: "Same mean, different story",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Two learners both average 60% for the year. Sipho scored 58, 61, 60, 59, 62. Lerato scored 30, 90, 45, 85, 50. Same mean – but you'd trust Sipho's 60 to predict the next test far more. The **standard deviation** puts a number on that difference: about 1,4 for Sipho and 23,5 for Lerato.` },
          { type: "widget", widget: "data-lab", props: { mode: "spread" } },
        ],
      },
      {
        id: "calc",
        title: "Calculating σ",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "By hand",
            problem: m`Calculate the standard deviation of $4;\ 7;\ 8;\ 10;\ 11$.`,
            steps: [
              { md: m`$\bar{x} = \frac{40}{5} = 8$` },
              { md: m`Deviations: $-4;\ -1;\ 0;\ 2;\ 3$` },
              { md: m`Squared: $16;\ 1;\ 0;\ 4;\ 9$, sum $= 30$`, why: "Squaring stops the positive and negative deviations from cancelling out." },
              { md: m`$\sigma^2 = \frac{30}{5} = 6$, so $\sigma = \sqrt{6} = 2{,}45$` },
            ],
          },
          { type: "callout", variant: "tip", title: "Calculator (Casio fx-82)", md: m`MODE → STAT → 1-VAR, type the values, AC, then SHIFT → STAT → Var → $\sigma x$. Use $\sigma x$ (population), **not** $sx$. CAPS uses the population standard deviation.` },
          {
            type: "practice",
            id: "sd-practice",
            problems: [
              { q: m`Calculate the standard deviation of $2;\ 4;\ 4;\ 4;\ 5;\ 5;\ 7;\ 9$.`, answer: "2", solution: m`$$\bar{x} = 5;\quad \sum(x - \bar{x})^2 = 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32;\quad \sigma = \sqrt{\tfrac{32}{8}} = 2$$` },
              { q: m`Calculate the standard deviation of $12;\ 15;\ 18;\ 20;\ 25$ (two decimals).`, answer: "4.43", tol: 0.011, solution: m`$$\bar{x} = 18;\quad \sum(x - \bar{x})^2 = 36 + 9 + 0 + 4 + 49 = 98;\quad \sigma = \sqrt{\tfrac{98}{5}} = 4{,}43$$` },
              { q: m`The mean of a data set is $50$ and $\sigma = 8$. Every value is increased by $5$. What is the new standard deviation?`, answer: "8", hint: "Adding the same number to every value moves the data but doesn't spread it out.", solution: m`The mean becomes 55, but every deviation stays the same, so $\sigma = 8$.` },
            ],
          },
        ],
      },
      {
        id: "wrap",
        title: "Interpret, drill & quiz",
        minutes: 7,
        blocks: [
          { type: "text", md: m`**Small** $\sigma$: the data is clustered close to the mean (consistent). **Large** $\sigma$: the data is spread out. In exams you are often asked how many values lie **within one standard deviation** of the mean: count the values between $\bar{x} - \sigma$ and $\bar{x} + \sigma$.` },
          { type: "widget", widget: "drill", props: { generators: ["mean-sd"], title: "Mean & standard deviation drill" } },
          { type: "exam", question: { id: "sd-exam", q: m`The number of SMSes sent by 8 learners in a day: $12;\ 18;\ 20;\ 25;\ 25;\ 28;\ 30;\ 42$. Calculate the mean and the standard deviation, and determine how many learners are within one standard deviation of the mean.`, marks: 5, level: "routine", memo: [m`$\bar{x} = \frac{200}{8} = 25$`, m`$\sigma = 8{,}41$ (calculator)`, m`$\bar{x} - \sigma = 16{,}59$`, m`$\bar{x} + \sigma = 33{,}41$`, m`$6$ learners (18 to 30)`] } },
          { type: "keypoints", points: ["σ = √[Σ(x − x̄)² / n].", "Use σx on the calculator.", "Small σ = consistent; large σ = spread out.", "Within one σ: between x̄ − σ and x̄ + σ."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "sd-quiz",
            questions: [
              { q: "Which set has the larger standard deviation?", options: ["10; 11; 12; 13; 14", "2; 7; 12; 17; 22", "they are equal", "impossible to tell"], answer: 1, explain: "Same mean (12), but the second set is far more spread out." },
              { q: "The variance is 16. The standard deviation is…", options: ["256", "8", "4", "16"], answer: 2, explain: "σ = √16 = 4." },
              { q: "Why do we square the deviations?", options: ["to make the numbers bigger", "so positive and negative deviations don't cancel", "because the formula says so", "to find the median"], answer: 1, explain: "The plain deviations always add up to 0." },
              { q: "Every value in a data set is doubled. The standard deviation…", options: ["stays the same", "doubles", "halves", "is squared"], answer: 1, explain: "Every deviation doubles, so σ doubles." },
            ],
          },
        ],
      },
    ],
  },
];
