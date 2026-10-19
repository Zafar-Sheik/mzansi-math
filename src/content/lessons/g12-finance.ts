import type { Lesson } from "../types";

const m = String.raw;

export const G12_FINANCE: Lesson[] = [
  {
    slug: "future-value",
    topic: "g12-finance",
    order: 1,
    title: "Future value annuities & sinking funds",
    tagline: "Save a fixed amount every month – what will it grow to?",
    emoji: "🐷",
    caps: "CAPS Gr 12 · Finance: the future value annuity formula F = x[(1 + i)ⁿ − 1]/i (derived as a geometric series); sinking funds.",
    objectives: [
      "Understand an annuity as a geometric series",
      "Use the future value formula",
      "Calculate the monthly payment needed for a sinking fund",
    ],
    styles: ["visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Annuity", def: "A series of equal payments made at equal time intervals." },
      { term: "Future value (F)", def: m`What a series of payments is worth at the END: $F = \dfrac{x\left[(1 + i)^n - 1\right]}{i}$.` },
      { term: "x (payment)", def: "The regular payment, e.g. the monthly deposit." },
      { term: "Sinking fund", def: "Money saved regularly to pay for a future expense (e.g. replacing equipment)." },
      { term: "Payments at the end of each period", def: "The standard annuity: the first payment is one period after the start, and the last payment earns no interest." },
    ],
    chunks: [
      {
        id: "hook",
        title: "R1 000 a month",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Start saving R1 000 a month at 21 with a retirement annuity earning 7% p.a. compounded monthly. By 61 (40 years) you'd have about **R2,6 million**. Start at 31 instead (30 years) and you'd have about **R1,2 million**. Ten years of waiting halves your money.` },
          { type: "widget", widget: "annuity-lab", props: { mode: "savings" } },
        ],
      },
      {
        id: "formula",
        title: "The formula (it's a geometric series)",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Deposit $x$ at the end of each month for $n$ months at rate $i$ per month. Moving every deposit to the end:

$$F = x + x(1 + i) + x(1 + i)^2 + \dots + x(1 + i)^{n-1}$$

That's a geometric series with $a = x$, $r = 1 + i$, so

$$F = \frac{x\left[(1 + i)^n - 1\right]}{i}$$` },
          {
            type: "worked",
            title: "Savings",
            problem: m`Sipho saves R1 500 at the end of every month for 10 years at 9% p.a. compounded monthly. How much will he have?`,
            steps: [
              { md: m`$x = 1500$, $i = \frac{0{,}09}{12}$, $n = 120$` },
              { md: m`$F = \dfrac{1500\left[\left(1 + \frac{0{,}09}{12}\right)^{120} - 1\right]}{\frac{0{,}09}{12}} = \text{R}290\,271{,}42$` },
            ],
          },
          {
            type: "worked",
            title: "Sinking fund",
            problem: m`A taxi owner needs R500 000 in 5 years to replace a taxi. How much must be saved each month at 8% p.a. compounded monthly?`,
            steps: [
              { md: m`$500\,000 = \dfrac{x\left[\left(1 + \frac{0{,}08}{12}\right)^{60} - 1\right]}{\frac{0{,}08}{12}}$` },
              { md: m`$x = \text{R}6\,804{,}86$` },
            ],
          },
          {
            type: "practice",
            id: "fv-practice",
            problems: [
              { q: m`R800 is saved at the end of every month for 4 years at 6% p.a. compounded monthly. Find the future value.`, answer: "43278.27", tol: 0.011, solution: m`$$F = \frac{800\left[(1{,}005)^{48} - 1\right]}{0{,}005} = \text{R}43\,278{,}27$$` },
              { q: m`R1 000 per month for 40 years at 7% p.a. compounded monthly. Find the future value.`, answer: "2624813.40", tol: 0.011, solution: m`$$F = \frac{1000\left[\left(1 + \frac{0{,}07}{12}\right)^{480} - 1\right]}{\frac{0{,}07}{12}} = \text{R}2\,624\,813{,}40$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["fv-annuity"], title: "Future value drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: [m`$F = \frac{x[(1 + i)^n - 1]}{i}$ for payments at the END of each period.`, "n = number of payments; i = rate per period.", "Sinking fund: given F, solve for x.", "Starting early matters more than saving more."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "fv-quiz",
            questions: [
              { q: "The future value formula comes from summing a…", options: ["arithmetic series", "geometric series", "quadratic pattern", "linear function"], answer: 1, explain: "Each deposit is multiplied by (1 + i) one more time than the next." },
              { q: "Monthly payments for 15 years: n = ", options: ["15", "180", "12", "1 800"], answer: 1, explain: "15 × 12 = 180." },
              { q: "A sinking fund is used to…", options: ["repay a loan", "save for a future expense", "calculate depreciation", "find the effective rate"], answer: 1, explain: "e.g. saving to replace machinery." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "present-value-loans",
    topic: "g12-finance",
    order: 2,
    title: "Present value: loans & outstanding balances",
    tagline: "Car loans, bonds and store accounts – what you really pay.",
    emoji: "🚗",
    caps: "CAPS Gr 12 · Finance: the present value annuity formula P = x[1 − (1 + i)⁻ⁿ]/i; loan repayments, outstanding balances and total interest.",
    objectives: [
      "Use the present value formula to find a loan's monthly payment",
      "Calculate the outstanding balance on a loan",
      "Work out the total interest paid",
    ],
    styles: ["visual", "read-write"],
    xp: 80,
    terms: [
      { term: "Present value (P)", def: m`What a series of future payments is worth NOW: $P = \dfrac{x\left[1 - (1 + i)^{-n}\right]}{i}$.` },
      { term: "Loan / bond", def: "Money borrowed now (the present value) and repaid with equal instalments." },
      { term: "Outstanding balance", def: "The amount still owed = the present value of the remaining payments." },
      { term: "Total interest", def: "Total of all payments minus the amount borrowed." },
      { term: "Amortisation", def: "Paying off a loan with regular instalments – early payments are mostly interest." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Your first car",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A car costs R250 000. The bank lends you the money at 12% p.a. compounded monthly over 5 years. Your instalment is **R5 561,11 a month** – and over 5 years you pay back R333 666,60. That's **R83 666,60 in interest**. Knowing this formula is how you avoid a bad deal.` },
          { type: "widget", widget: "annuity-lab", props: { mode: "loan" } },
        ],
      },
      {
        id: "payments",
        title: "Calculating the instalment",
        minutes: 8,
        blocks: [
          { type: "text", md: m`The loan amount $P$ equals the present value of all the payments:

$$P = \frac{x\left[1 - (1 + i)^{-n}\right]}{i}$$

Substitute $P$, $i$ and $n$, then solve for $x$.` },
          {
            type: "worked",
            title: "The car loan",
            problem: m`Find the monthly payment on a R250 000 loan at 12% p.a. compounded monthly over 5 years (first payment one month after the loan).`,
            steps: [
              { md: m`$250\,000 = \dfrac{x\left[1 - (1{,}01)^{-60}\right]}{0{,}01}$` },
              { md: m`$x = \dfrac{250\,000 \times 0{,}01}{1 - (1{,}01)^{-60}} = \text{R}5\,561{,}11$` },
              { md: m`Total interest $= 60 \times 5\,561{,}11 - 250\,000 = \text{R}83\,666{,}72$` },
            ],
          },
          {
            type: "practice",
            id: "pv-practice",
            problems: [
              { q: m`A home loan of R1 200 000 is repaid over 20 years at 10,5% p.a. compounded monthly. Find the monthly instalment.`, answer: "11980.56", tol: 0.011, solution: m`$$x = \frac{1\,200\,000 \times \frac{0{,}105}{12}}{1 - \left(1 + \frac{0{,}105}{12}\right)^{-240}} = \text{R}11\,980{,}56$$` },
              { q: m`A store account of R20 000 is repaid over 3 years at 13% p.a. compounded monthly. Find the monthly payment.`, answer: "673.88", tol: 0.011, solution: m`$$x = \frac{20\,000 \times \frac{0{,}13}{12}}{1 - \left(1 + \frac{0{,}13}{12}\right)^{-36}} = \text{R}673{,}88$$` },
              { q: m`What is the present value of 48 monthly payments of R3 000 at 11% p.a. compounded monthly?`, answer: "116074.26", tol: 0.011, solution: m`$$P = \frac{3000\left[1 - \left(1 + \frac{0{,}11}{12}\right)^{-48}\right]}{\frac{0{,}11}{12}} = \text{R}116\,074{,}26$$` },
            ],
          },
        ],
      },
      {
        id: "balance",
        title: "Outstanding balance",
        minutes: 7,
        blocks: [
          { type: "text", md: m`The balance still owed = **present value of the payments still to come**.` },
          {
            type: "worked",
            title: "Two years into the car loan",
            problem: m`After 24 payments on the car loan above (R5 561,11 for 60 months at 1% per month), what is still owed?`,
            steps: [
              { md: m`Remaining payments: $60 - 24 = 36$` },
              { md: m`Balance $= \dfrac{5561{,}11\left[1 - (1{,}01)^{-36}\right]}{0{,}01} = \text{R}167\,431{,}15$` },
            ],
          },
          { type: "callout", variant: "tip", md: m`After 40% of the payments you still owe 67% of the loan – early payments are mostly interest. Drag the "payment number k" slider in the annuity lab to see the split.` },
          { type: "widget", widget: "drill", props: { generators: ["loan-payment"], title: "Loan drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: [m`$P = \frac{x[1 - (1 + i)^{-n}]}{i}$: loans and present value.`, "Outstanding balance = PV of the remaining payments.", "Total interest = n × x − P.", "Early payments are mostly interest."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "pv-quiz",
            questions: [
              { q: "Which formula do you use for a car loan?", options: ["Future value", "Present value", "Simple interest", "Depreciation"], answer: 1, explain: "The loan is the value NOW of the future payments." },
              { q: "The outstanding balance after k payments is the present value of…", options: ["all n payments", "the k payments made", "the n − k payments still to come", "the loan amount"], answer: 2, explain: "Only the payments still to be made." },
              { q: "Making the loan term longer (same rate) makes the monthly payment…", options: ["bigger", "smaller – but the total interest bigger", "smaller and the total interest smaller", "unchanged"], answer: 1, explain: "Lower instalments, but you pay interest for longer." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "annuity-n",
    topic: "g12-finance",
    order: 3,
    title: "How long? Finding n with logs",
    tagline: "How many payments – and what's the final, smaller one?",
    emoji: "⏳",
    caps: "CAPS Gr 12 · Finance: use logarithms to calculate n in compound growth and annuity problems; final payments; analysing investment and loan options.",
    objectives: [
      "Use logs to find n in compound growth problems",
      "Use logs to find the number of payments on a loan",
      "Calculate the final (smaller) payment",
    ],
    styles: ["read-write", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Finding n", def: m`Isolate the power $(1 + i)^n$ (or $(1 + i)^{-n}$), then $n = \dfrac{\log(\dots)}{\log(1 + i)}$.` },
      { term: "Final payment", def: "When n isn't a whole number: n rounded down full payments, then one smaller payment to settle the balance." },
      { term: "Outstanding balance", def: m`What you still owe after some payments: the present value of the payments that remain.` },
      { term: "Doubling time", def: m`Time for money to double: $(1 + i)^n = 2 \Rightarrow n = \dfrac{\log 2}{\log(1 + i)}$.` },
    ],
    chunks: [
      {
        id: "growth",
        title: "n in compound growth",
        minutes: 6,
        blocks: [
          {
            type: "worked",
            title: "How long to double?",
            problem: m`How long will R10 000 take to double at 9% p.a. compounded annually?`,
            steps: [
              { md: m`$20\,000 = 10\,000(1{,}09)^n \Rightarrow 1{,}09^n = 2$` },
              { md: m`$n = \dfrac{\log 2}{\log 1{,}09} = 8{,}04$ years` },
            ],
          },
          { type: "callout", variant: "memory", md: m`**Rule of 72:** money doubles in about $72 \div \text{rate}$ years. At 9%: $72 \div 9 = 8$ years. Close!` },
        ],
      },
      {
        id: "loans",
        title: "n for a loan & the final payment",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "How many payments?",
            problem: m`A R80 000 loan at 15% p.a. compounded monthly is repaid at R2 000 per month. How many payments are needed, and what is the final payment?`,
            steps: [
              { md: m`$80\,000 = \dfrac{2000\left[1 - (1{,}0125)^{-n}\right]}{0{,}0125}$` },
              { md: m`$1 - (1{,}0125)^{-n} = 0{,}5 \Rightarrow (1{,}0125)^{-n} = 0{,}5$` },
              { md: m`$-n = \dfrac{\log 0{,}5}{\log 1{,}0125} \Rightarrow n = 55{,}80$` },
              { md: m`55 full payments and a 56th smaller payment` },
              { md: m`Balance after 55 payments, grown one month: final payment $= \text{R}1\,597{,}26$`, why: m`$\left[80\,000(1{,}0125)^{55} - \frac{2000[(1{,}0125)^{55} - 1]}{0{,}0125}\right] \times 1{,}0125$` },
            ],
          },
          {
            type: "practice",
            id: "annuity-n-practice",
            problems: [
              { q: m`How many years (two decimals) for an investment to double at 12% p.a. compounded annually?`, answer: "6.12", tol: 0.011, solution: m`$$n = \frac{\log 2}{\log 1{,}12} = 6{,}12 \text{ years}$$` },
              { q: m`A loan of R80 000 at 15% p.a. compounded monthly is repaid at R2 000 per month. Calculate $n$ (two decimals).`, answer: "55.80", tol: 0.011, solution: m`$$(1{,}0125)^{-n} = 0{,}5 \Rightarrow n = \frac{-\log 0{,}5}{\log 1{,}0125} = 55{,}80$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["loan-payment", "log-equation"], title: "Finding n drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Isolate the power, then use logs.", "Loans: (1 + i)⁻ⁿ = 1 − Pi/x.", "n not whole → full payments + a smaller final payment.", "Rule of 72 for a quick doubling estimate."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "annuity-n-quiz",
            questions: [
              { q: m`$1{,}08^n = 3$ gives $n = $`, options: [m`$\frac{3}{\log 1{,}08}$`, m`$\frac{\log 3}{\log 1{,}08}$`, m`$\log 3 - \log 1{,}08$`, m`$3 \div 1{,}08$`], answer: 1, explain: m`$n = \log_{1{,}08} 3$.` },
              { q: m`If $n = 47{,}3$ for a loan, the borrower makes…`, options: ["47 equal payments only", "48 equal payments", "47 full payments and a smaller 48th", "47,3 payments"], answer: 2, explain: "You can't make 0,3 of a payment – the last one is smaller." },
              { q: "By the Rule of 72, money at 6% doubles in about…", options: ["6 years", "12 years", "72 years", "8 years"], answer: 1, explain: "72 ÷ 6 = 12." },
            ],
          },
        ],
      },
    ],
  },
];
