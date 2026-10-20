import type { Lesson } from "../types";

const m = String.raw;

export const G12_STATISTICS: Lesson[] = [
  {
    slug: "scatter-plots",
    topic: "g12-statistics",
    order: 1,
    title: "Scatter plots & correlation",
    tagline: "Does one thing go up when the other does?",
    emoji: "📈",
    caps: "CAPS Gr 12 · Statistics: represent bivariate numerical data as a scatter plot; identify linear, quadratic and exponential trends; the correlation coefficient r and the strength and direction of a linear relationship.",
    objectives: [
      "Draw and read a scatter plot",
      "Describe the trend (linear, quadratic, exponential) and any outliers",
      "Interpret the correlation coefficient r",
      "Know that correlation is not causation",
    ],
    styles: ["visual", "kinaesthetic"],
    xp: 55,
    terms: [
      { term: "Bivariate data", def: "Pairs of values (x; y) measured on the same thing – e.g. hours studied and test mark." },
      { term: "Scatter plot", def: "A graph of the (x; y) pairs as dots, used to see a relationship." },
      { term: "Correlation coefficient r", def: m`A number from $-1$ to $1$: the sign gives the direction, the size gives the strength of a LINEAR relationship.` },
      { term: "Positive / negative correlation", def: m`Positive ($r > 0$): y tends to increase as x increases. Negative ($r < 0$): y tends to decrease.` },
      { term: "Correlation ≠ causation", def: "Two variables can move together without one causing the other (e.g. ice-cream sales and drownings both rise in summer)." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Spot the trend",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Does studying more actually raise your mark? Collect hours and marks from the class, plot each learner as a dot, and the cloud of dots answers the question. Drag the dots below and watch $r$ change.` },
          { type: "widget", widget: "regression-lab" },
          { type: "callout", variant: "exam", md: m`Grade 12 statistics (scatter plots, regression and correlation, plus the Grade 11 work) is about 20 marks of Paper 2. You need a calculator in STAT mode – practise it now, not in the exam.` },
        ],
      },
      {
        id: "r",
        title: "Reading r",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["Value of r", "Description"],
            rows: [[m`$r = 1$ or $r = -1$`, "perfect positive / negative"], [m`$0{,}9 \leq |r| < 1$`, "very strong"], [m`$0{,}7 \leq |r| < 0{,}9$`, "strong"], [m`$0{,}5 \leq |r| < 0{,}7$`, "moderate"], [m`$0{,}3 \leq |r| < 0{,}5$`, "weak"], [m`$|r| < 0{,}3$`, "very weak or no linear correlation"]],
            caption: "Exact cut-offs vary between textbooks – describe both strength AND direction.",
          },
          {
            type: "match",
            id: "r-match",
            title: "Match r to the description",
            pairs: [
              { left: m`$r = 0{,}96$`, right: "very strong positive" },
              { left: m`$r = -0{,}78$`, right: "strong negative" },
              { left: m`$r = 0{,}45$`, right: "weak positive" },
              { left: m`$r = -0{,}05$`, right: "no linear correlation" },
            ],
          },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "correlation-sort", title: "Positive, negative or none?", buckets: ["Positive", "Negative", "No correlation"], colour: "var(--t-stats)",
              items: [
                { text: "Temperature and cold drinks sold", bucket: "Positive" }, { text: "Age of a car and its value", bucket: "Negative" },
                { text: "Shoe size and maths mark", bucket: "No correlation" }, { text: "Hours of TV and hours of sleep", bucket: "Negative" },
                { text: "Height and arm span", bucket: "Positive" }, { text: "Birth month and height", bucket: "No correlation" },
              ],
            },
          },
          { type: "callout", variant: "mistake", md: m`$r$ only measures **linear** relationships. Data on a perfect parabola can have $r \approx 0$! Always look at the scatter plot as well – and describe the trend (linear, quadratic or exponential).` },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Scatter plot first: trend, direction, outliers.", "r between −1 and 1: sign = direction, size = strength.", "r only measures LINEAR correlation.", "Correlation doesn't prove causation."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "scatter-quiz",
            questions: [
              { q: "Which r shows the strongest correlation?", options: ["0,65", "−0,92", "0,88", "−0,4"], answer: 1, explain: "Strength is the size |r| – the sign is only direction." },
              { q: "r = −0,85 means…", options: ["weak positive", "strong negative", "no correlation", "perfect negative"], answer: 1, explain: "Large size, negative sign." },
              { q: "Ice-cream sales and sunburn cases are strongly correlated. This shows that…", options: ["ice-cream causes sunburn", "sunburn causes ice-cream sales", "both are linked to hot weather – correlation isn't causation", "the data is wrong"], answer: 2, explain: "A third factor (sunny weather) drives both." },
              { q: "Points lie exactly on a U-shaped curve. r is probably…", options: ["close to 1", "close to −1", "close to 0", "exactly 1"], answer: 2, explain: "r measures straight-line correlation only." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "regression-line",
    topic: "g12-statistics",
    order: 2,
    title: "The least squares regression line",
    tagline: "The best straight line through a cloud of dots – and what it predicts.",
    emoji: "📉",
    caps: "CAPS Gr 12 · Statistics: the least squares regression line ŷ = a + bx using a calculator; interpreting a and b; using the line to make predictions (interpolation and extrapolation); the correlation coefficient.",
    objectives: [
      "Find a, b and r with a calculator",
      "Write the equation of the least squares line",
      "Use the line to predict, and judge whether a prediction is reliable",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 65,
    terms: [
      { term: "Least squares regression line", def: m`$\hat{y} = a + bx$: the line that makes the sum of the squared vertical distances (residuals) as small as possible.` },
      { term: "Residual", def: m`The vertical gap between a data point and the line: $y - \hat{y}$.` },
      { term: "Gradient b", def: "The predicted change in y for every 1 unit increase in x." },
      { term: "Interpolation / extrapolation", def: "Predicting inside the range of the data (reliable) / outside it (risky)." },
    ],
    chunks: [
      {
        id: "line",
        title: "The best line",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Many lines pass "through" a scatter plot. The **least squares** line is the one that makes $\sum (y - \hat{y})^2$ as small as possible. In the lab above you can try to beat it – you can't! In exams you always find it with a calculator.` },
          { type: "callout", variant: "tip", title: "Calculator (Casio fx-82)", md: m`MODE → STAT → A+BX. Enter x-values in one column and y-values in the other. AC, then SHIFT → STAT → Reg: read off **A**, **B** and **r**. On the Sharp it's STAT → LINE.` },
          {
            type: "table",
            headers: ["Hours studied (x)", "1", "2", "3", "4", "5", "6", "7", "8"],
            rows: [["Test mark (y)", "42", "48", "51", "60", "58", "69", "72", "79"]],
          },
          {
            type: "worked",
            title: "Hours and marks",
            problem: m`Determine the equation of the least squares regression line, the correlation coefficient, and predict the mark of a learner who studies for 5,5 hours.`,
            steps: [
              { md: m`Calculator: $a = 36{,}79$, $b = 5{,}13$, $r = 0{,}99$` },
              { md: m`$\hat{y} = 36{,}79 + 5{,}13x$` },
              { md: m`$\hat{y} = 36{,}79 + 5{,}13(5{,}5) = 65{,}01$, so about $65\%$`, why: "Use the unrounded values in your calculator if you can – the memo allows small rounding differences." },
              { md: m`$r = 0{,}99$: a very strong positive correlation, so the prediction is reliable (and 5,5 lies inside the data – interpolation).` },
            ],
          },
          { type: "callout", variant: "key", md: m`$b = 5{,}13$ means: **each extra hour of study is associated with about 5 more marks.** Exams often ask you to interpret $b$ in words like this.` },
        ],
      },
      {
        id: "practice",
        title: "Your turn",
        minutes: 9,
        blocks: [
          {
            type: "table",
            headers: ["Temperature (°C)", "20", "22", "24", "26", "28", "30"],
            rows: [["Cold drinks sold", "32", "40", "41", "50", "55", "61"]],
          },
          {
            type: "practice",
            id: "regression-practice",
            problems: [
              { q: m`Use the temperature table. Determine $b$ for the least squares regression line (two decimals).`, answer: "2.84", tol: 0.011, solution: m`$$a = -24{,}57;\quad b = 2{,}84;\quad r = 0{,}99$$` },
              { q: m`Determine $a$ for the same data (two decimals).`, answer: "-24.57", tol: 0.011, solution: m`$$\hat{y} = -24{,}57 + 2{,}84x$$` },
              { q: m`Predict the number of cold drinks sold at $25^\circ$C (two decimals).`, answer: "46.5", tol: 0.06, solution: m`$$\hat{y} = -24{,}57 + 2{,}84(25) = 46{,}50$$` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Predicting cold drink sales at $45^\circ$C or $-5^\circ$C is **extrapolation** – far outside the data, so the trend may not hold. Say so in the exam if asked "Is this prediction reliable?"` },
          { type: "widget", widget: "drill", props: { generators: ["regression"], title: "Regression drill" } },
        ],
      },
      {
        id: "wrap",
        title: "Quiz",
        minutes: 6,
        blocks: [
          { type: "exam", question: { id: "regression-exam", q: m`The age (years) and value (R thousands) of 6 cars of the same model are: $(1;\ 220),\ (2;\ 198),\ (3;\ 183),\ (4;\ 168),\ (5;\ 150),\ (6;\ 139)$. Determine the least squares regression line, interpret the gradient, and predict the value of a 7-year-old car.`, marks: 5, level: "routine", memo: [m`$a = 232{,}73$`, m`$b = -16{,}11$`, m`$\hat{y} = 232{,}73 - 16{,}11x$`, "the value drops by about R16 110 per year", m`$\hat{y} = 232{,}73 - 16{,}11(7) \approx 119{,}93$, i.e. about R119 930`] } },
          { type: "keypoints", points: ["ŷ = a + bx: a and b from the calculator.", "b = change in y per unit of x – interpret it in words.", "Predict inside the data (interpolation) for reliability.", "Strong r ⇒ reliable linear predictions."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "regression-quiz",
            questions: [
              { q: "The least squares line minimises…", options: ["the sum of the residuals", "the sum of the squared residuals", "the number of outliers", "r"], answer: 1, explain: "That's where the name 'least squares' comes from." },
              { q: "ŷ = 12 + 3x. When x increases by 1, ŷ…", options: ["increases by 12", "increases by 3", "doubles", "increases by 15"], answer: 1, explain: "b = 3 is the gradient." },
              { q: "Data for x from 10 to 50. Predicting at x = 120 is…", options: ["interpolation", "extrapolation", "regression", "correlation"], answer: 1, explain: "Outside the range of the data." },
            ],
          },
        ],
      },
    ],
  },
];
