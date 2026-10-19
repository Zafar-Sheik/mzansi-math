import type { Lesson } from "../types";

const m = String.raw;

export const FINANCE: Lesson[] = [
  {
    slug: "simple-vs-compound",
    topic: "g11-finance",
    order: 1,
    title: "Simple vs compound: the battle for your money",
    tagline: "Interest that earns interest – and why starting early wins.",
    emoji: "💰",
    caps: "CAPS Gr 11 · Finance, growth & decay: use simple and compound growth formulae A = P(1 + in) and A = P(1 + i)ⁿ, including finding P and i.",
    objectives: [
      "Use A = P(1 + in) and A = P(1 + i)ⁿ correctly",
      "Adjust i and n for monthly, quarterly and half-yearly compounding",
      "Find the principal P needed for a target amount",
      "Find the interest rate i",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Principal (P)", def: "The amount you start with – invested or borrowed." },
      { term: "Accumulated amount (A)", def: "What the investment is worth at the end (principal + interest)." },
      { term: "Simple interest", def: m`Interest on the ORIGINAL amount only: $A = P(1 + in)$.` },
      { term: "Compound interest", def: m`Interest on the principal AND on interest already earned: $A = P(1 + i)^n$.` },
      { term: "Interest rate (i)", def: m`The rate per compounding period, as a decimal: 9% p.a. compounded monthly → $i = \frac{0{,}09}{12}$.` },
      { term: "Number of periods (n)", def: m`How many times interest is added: 5 years compounded monthly → $n = 5 \times 12 = 60$.` },
      { term: "Per annum (p.a.)", def: "Per year." },
    ],
    chunks: [
      {
        id: "hook",
        title: "R8 000 and a decision",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`You get R8 000 for your 18th birthday. Bank A offers 7,5% p.a. **simple** interest. Bank B offers 7,5% p.a. **compound** interest. Same rate – does it matter? After 4 years: Bank A pays you **R10 400**, Bank B **R10 683,75**. After 30 years the gap is over R40 000. Compound interest earns interest *on its interest*.` },
          { type: "widget", widget: "finance-lab", props: { mode: "growth" } },
        ],
      },
      {
        id: "formulas",
        title: "The two formulas",
        minutes: 8,
        blocks: [
          { type: "text", md: m`$$\text{Simple: } A = P(1 + in) \qquad\qquad \text{Compound: } A = P(1 + i)^n$$

- $A$ = final amount, $P$ = principal, $n$ = number of periods, $i$ = rate **per period** as a decimal.
- If interest is compounded more than once a year, **divide the rate** and **multiply the years**: 7,5% p.a. compounded monthly for 4 years → $i = \frac{0{,}075}{12}$, $n = 48$.` },
          {
            type: "worked",
            title: "Same money, three ways",
            problem: m`R8 000 is invested for 4 years at 7,5% p.a. Find the final amount if interest is (a) simple (b) compounded annually (c) compounded monthly.`,
            steps: [
              { md: m`(a) $A = 8000(1 + 0{,}075 \times 4) = \text{R}10\,400$` },
              { md: m`(b) $A = 8000(1 + 0{,}075)^4 = \text{R}10\,683{,}75$` },
              { md: m`(c) $A = 8000\left(1 + \frac{0{,}075}{12}\right)^{48} = \text{R}10\,788{,}79$`, why: "More frequent compounding → slightly more money." },
            ],
          },
          { type: "callout", variant: "mistake", md: m`- Using 7,5 instead of 0,075 – always convert the percentage to a decimal.
- Compounded monthly but using $n = 4$ (years) – $n$ counts **periods**, so $n = 48$.
- Rounding $\left(1 + \frac{0{,}075}{12}\right)$ in the middle. Type the whole thing into your calculator in one go and round only the final answer to 2 decimals.` },
          {
            type: "practice",
            id: "growth-practice",
            problems: [
              { q: m`R12 000 is invested at 8% p.a. compounded quarterly. What is it worth after 3 years? (to the nearest cent)`, answer: "15218.90", tol: 0.011, hint: "i = 0,08 ÷ 4 and n = 3 × 4.", solution: m`$$A = 12\,000\left(1 + \frac{0{,}08}{4}\right)^{12} = \text{R}15\,218{,}90$$` },
              { q: m`R5 000 is invested at 9% p.a. simple interest. What is it worth after 6 years?`, answer: "7700", tol: 0.011, solution: m`$$A = 5000(1 + 0{,}09 \times 6) = 5000 \times 1{,}54 = \text{R}7\,700$$` },
            ],
          },
        ],
      },
      {
        id: "find-p-i",
        title: "Working backwards: P and i",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "How much do I need now?",
            problem: m`How much must you invest now at 9% p.a. compounded monthly to have R50 000 in 5 years?`,
            steps: [
              { md: m`$50\,000 = P\left(1 + \frac{0{,}09}{12}\right)^{60}$` },
              { md: m`$P = \dfrac{50\,000}{\left(1 + \frac{0{,}09}{12}\right)^{60}} = \text{R}31\,934{,}98$`, why: "Divide by the growth factor." },
            ],
          },
          {
            type: "worked",
            title: "What rate did I get?",
            problem: m`R5 000 grew to R7 000 in 4 years. Find the annual interest rate if interest was (a) simple (b) compounded annually.`,
            steps: [
              { md: m`(a) $7000 = 5000(1 + 4i) \Rightarrow 1{,}4 = 1 + 4i \Rightarrow i = 0{,}1 = 10\%$` },
              { md: m`(b) $7000 = 5000(1 + i)^4 \Rightarrow (1 + i)^4 = 1{,}4$` },
              { md: m`$1 + i = \sqrt[4]{1{,}4} = 1{,}4^{\frac{1}{4}} \Rightarrow i = 0{,}0878 = 8{,}78\%$`, why: "Undo the power 4 with the power ¼ – that's the exponent laws coming back." },
            ],
          },
          {
            type: "practice",
            id: "find-p-i-practice",
            problems: [
              { q: m`An investment doubles in 8 years with interest compounded annually. Find the annual interest rate, as a percentage correct to two decimals.`, answer: "9.05", tol: 0.006, hint: "Use P = 1 and A = 2: (1 + i)⁸ = 2.", solution: m`$$(1 + i)^8 = 2 \Rightarrow i = 2^{\frac{1}{8}} - 1 = 0{,}0905 \Rightarrow 9{,}05\%$$` },
              { q: m`What principal grows to R18 201,11 in 3 years at 6,5% p.a. compounded quarterly? (nearest rand)`, answer: "15000", tol: 1, solution: m`$$P = \frac{18\,201{,}11}{\left(1 + \frac{0{,}065}{4}\right)^{12}} = \text{R}15\,000$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["growth"], title: "Growth drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: [m`Simple $A = P(1 + in)$; compound $A = P(1 + i)^n$.`, "i is per period (divide the annual rate); n counts periods (multiply the years).", "Find P: divide A by the growth factor.", m`Find i (compound): $(1 + i) = \left(\frac{A}{P}\right)^{\frac{1}{n}}$.`] },
          { type: "terms" },
          {
            type: "quiz",
            id: "growth-quiz",
            questions: [
              { q: m`10% p.a. compounded monthly for 3 years: $i$ and $n$ are…`, options: [m`$i = 0{,}1$, $n = 3$`, m`$i = \frac{0{,}1}{12}$, $n = 36$`, m`$i = \frac{10}{12}$, $n = 36$`, m`$i = 0{,}1 \times 12$, $n = 3$`], answer: 1, explain: "Divide the annual rate by 12 and multiply the years by 12." },
              { q: "Which grows faster in the long run (same rate)?", options: ["Simple interest", "Compound interest", "They are always equal", "It depends on P"], answer: 1, explain: "Compound interest is exponential; simple interest is linear." },
              { q: m`R1 000 at 10% p.a. compounded annually for 2 years gives…`, options: ["R1 200", "R1 210", "R1 100", "R1 020"], answer: 1, explain: m`$1000(1{,}1)^2 = 1210$. (Simple would be R1 200.)` },
              { q: m`The graph of simple interest against time is…`, options: ["a straight line", "a parabola", "an exponential curve", "a hyperbola"], answer: 0, explain: m`$A = P + Pi \cdot n$ is linear in $n$.` },
              { q: m`To find $i$ from $(1 + i)^5 = 1{,}6$ you…`, options: [m`divide 1,6 by 5`, m`raise 1,6 to the power $\frac{1}{5}$ and subtract 1`, m`multiply by 5`, m`square root 1,6`], answer: 1, explain: m`$1 + i = 1{,}6^{\frac{1}{5}}$, so $i = 1{,}6^{\frac{1}{5}} - 1 \approx 0{,}0986$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "depreciation",
    topic: "g11-finance",
    order: 2,
    title: "Depreciation, inflation & population growth",
    tagline: "Why your new phone loses value the moment you open the box.",
    emoji: "📉",
    caps: "CAPS Gr 11 · Finance, growth & decay: straight-line depreciation A = P(1 − in) and reducing-balance depreciation A = P(1 − i)ⁿ; growth applications such as inflation and population growth.",
    objectives: [
      "Use straight-line and reducing-balance depreciation formulas",
      "Find the depreciation rate",
      "Apply compound growth to inflation and population growth",
    ],
    styles: ["visual", "read-write"],
    xp: 60,
    terms: [
      { term: "Depreciation", def: "The loss in value of an item (cars, phones, machines) over time." },
      { term: "Straight-line depreciation", def: m`Loses the same AMOUNT each year: $A = P(1 - in)$. Also called simple decay.` },
      { term: "Reducing-balance depreciation", def: m`Loses the same PERCENTAGE of the current value each year: $A = P(1 - i)^n$. Also called compound decay.` },
      { term: "Book value", def: "The value of an item after depreciation at a given time." },
      { term: "Inflation", def: m`The general rise in prices over time – compound growth: $A = P(1 + i)^n$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Things that lose value",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A taxi owner buys a new minibus for R480 000. Every year it loses value through wear, kilometres and newer models. Businesses must calculate this **depreciation** for tax – and anyone buying a second-hand car should too.` },
          { type: "widget", widget: "finance-lab", props: { mode: "depreciation" } },
        ],
      },
      {
        id: "formulas",
        title: "Straight-line vs reducing-balance",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["", "Straight-line (simple decay)", "Reducing-balance (compound decay)"],
            rows: [
              ["Formula", m`$A = P(1 - in)$`, m`$A = P(1 - i)^n$`],
              ["Each year it loses…", "the same amount", "the same percentage of what's left"],
              ["Graph", "straight line (reaches 0)", "curve (never reaches 0)"],
            ],
          },
          {
            type: "worked",
            title: "The taxi",
            problem: m`A minibus taxi costs R480 000 and depreciates at 15% p.a. Find its value after 5 years using (a) straight-line (b) reducing-balance depreciation.`,
            steps: [
              { md: m`(a) $A = 480\,000(1 - 0{,}15 \times 5) = 480\,000 \times 0{,}25 = \text{R}120\,000$` },
              { md: m`(b) $A = 480\,000(1 - 0{,}15)^5 = \text{R}212\,978{,}55$`, why: "The minus sign is the only difference from compound growth." },
            ],
          },
          {
            type: "worked",
            title: "Finding the rate",
            problem: m`A laptop bought for R15 000 is worth R6 144 after 4 years (reducing balance). Find the rate of depreciation.`,
            steps: [
              { md: m`$6144 = 15\,000(1 - i)^4 \Rightarrow (1 - i)^4 = 0{,}4096$` },
              { md: m`$1 - i = 0{,}4096^{\frac{1}{4}} = 0{,}8 \Rightarrow i = 0{,}2 = 20\%$` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Straight-line depreciation can't go below R0. If $1 - in < 0$, the item was already worth nothing – the formula only works until then.` },
          {
            type: "practice",
            id: "depreciation-practice",
            problems: [
              { q: m`A phone costs R14 000 and depreciates at 20% p.a. on the reducing-balance method. What is it worth after 3 years?`, answer: "7168", tol: 0.011, solution: m`$$A = 14\,000(1 - 0{,}2)^3 = 14\,000 \times 0{,}512 = \text{R}7\,168$$` },
              { q: m`The same phone on the straight-line method at 20% p.a.: value after 3 years?`, answer: "5600", tol: 0.011, solution: m`$$A = 14\,000(1 - 0{,}2 \times 3) = 14\,000 \times 0{,}4 = \text{R}5\,600$$` },
              { q: m`A machine costing R15 000 is worth R6 000 after 4 years (straight-line). Find the depreciation rate as a percentage.`, answer: "15", tol: 0.01, solution: m`$$6000 = 15\,000(1 - 4i) \Rightarrow 1 - 4i = 0{,}4 \Rightarrow i = 0{,}15 = 15\%$$` },
            ],
          },
        ],
      },
      {
        id: "growth-in-life",
        title: "Inflation & population growth",
        minutes: 6,
        blocks: [
          { type: "text", md: m`Inflation and population growth are just compound growth with a different story: $A = P(1 + i)^n$.` },
          {
            type: "worked",
            title: "The price of bread",
            problem: m`A loaf of bread costs R18 today. If inflation averages 6% p.a., what will it cost in 10 years?`,
            steps: [{ md: m`$A = 18(1{,}06)^{10} = \text{R}32{,}24$`, why: "Prices compound: each year's increase is on the previous year's price." }],
          },
          {
            type: "practice",
            id: "inflation-practice",
            problems: [
              { q: m`A town has 25 000 people and grows at 2,5% p.a. How many people (to the nearest whole person) after 8 years?`, answer: "30460", tol: 0.5, solution: m`$$A = 25\,000(1{,}025)^8 = 30\,460{,}07 \approx 30\,460 \text{ people}$$` },
              { q: m`A car worth R250 000 depreciates at 12% p.a. (reducing balance). Find its value after 4 years.`, answer: "149923.84", tol: 0.011, solution: m`$$A = 250\,000(0{,}88)^4 = \text{R}149\,923{,}84$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["depreciation", "growth"], title: "Growth & decay drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`Straight-line: $A = P(1 - in)$ – same amount lost each year.`, m`Reducing-balance: $A = P(1 - i)^n$ – same percentage lost each year.`, m`Inflation & population: $A = P(1 + i)^n$.`, "Reducing balance never reaches zero."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "depreciation-quiz",
            questions: [
              { q: "Which method loses the same rand amount every year?", options: ["Reducing-balance", "Straight-line", "Compound growth", "Inflation"], answer: 1, explain: m`$A = P - Pi \cdot n$: the loss $Pi$ is the same each year.` },
              { q: m`R10 000 depreciates at 10% p.a. reducing balance for 2 years:`, options: ["R8 000", "R8 100", "R8 190", "R9 000"], answer: 1, explain: m`$10\,000(0{,}9)^2 = 8100$.` },
              { q: "A reducing-balance value graph is…", options: ["a straight line down to zero", "a curve that approaches zero but never reaches it", "a parabola", "a horizontal line"], answer: 1, explain: "It's exponential decay with an asymptote at A = 0." },
              { q: m`A R60 000 item depreciates straight-line at 25% p.a. After 4 years it is worth…`, options: ["R0", "R15 000", "R18 984", "R45 000"], answer: 0, explain: m`$60\,000(1 - 0{,}25 \times 4) = 0$.` },
              { q: "Prices rising 5% p.a. for 3 years is modelled by…", options: [m`$A = P(1 - 0{,}05)^3$`, m`$A = P(1 + 0{,}05 \times 3)$`, m`$A = P(1 + 0{,}05)^3$`, m`$A = P(0{,}05)^3$`], answer: 2, explain: "Inflation compounds, so it's compound growth." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "nominal-effective",
    topic: "g11-finance",
    order: 3,
    title: "Nominal vs effective rates & timelines",
    tagline: "Read the fine print – and handle changing rates, deposits and withdrawals.",
    emoji: "🧾",
    caps: "CAPS Gr 11 · Finance, growth & decay: nominal and effective interest rates; the effect of different compounding periods; timelines with changing rates, deposits and withdrawals.",
    objectives: [
      "Convert between nominal and effective annual rates",
      "Compare offers with different compounding periods",
      "Draw a timeline and solve problems with changing rates, deposits and withdrawals",
    ],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Nominal rate", def: m`The advertised annual rate, compounded $m$ times a year, e.g. 12% p.a. compounded monthly.` },
      { term: "Effective rate", def: m`The rate you REALLY earn/pay per year: $1 + i_{\text{eff}} = \left(1 + \frac{i_{\text{nom}}}{m}\right)^m$.` },
      { term: "Compounding period", def: "How often interest is added: annually (1), half-yearly (2), quarterly (4), monthly (12), daily (365)." },
      { term: "Timeline", def: "A diagram showing when money goes in or out and when rates change – move every amount to the end separately." },
      { term: "Changing interest rate", def: m`Multiply the growth factors for each period: $P(1 + i_1)^{n_1}(1 + i_2)^{n_2}$.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Two loan adverts",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Store A: "Buy now, pay later at **18% p.a. compounded monthly**". Store B: "**18,5% p.a.** compounded annually". Store A looks cheaper… but monthly compounding means you really pay $\left(1 + \frac{0{,}18}{12}\right)^{12} - 1 = 19{,}56\%$ per year. **Store B is cheaper.** The advertised number is the *nominal* rate; the one that counts is the *effective* rate.` },
          { type: "widget", widget: "finance-lab", props: { mode: "effective" } },
        ],
      },
      {
        id: "convert",
        title: "Converting rates",
        minutes: 7,
        blocks: [
          { type: "text", md: m`$$1 + i_{\text{eff}} = \left(1 + \frac{i_{\text{nom}}}{m}\right)^m$$

where $m$ is the number of compounding periods per year.` },
          {
            type: "worked",
            title: "Both directions",
            problem: m`(a) Convert 12% p.a. compounded monthly to an effective rate. (b) Convert an effective rate of 10% p.a. to a nominal rate compounded quarterly.`,
            steps: [
              { md: m`(a) $1 + i_{\text{eff}} = \left(1 + \frac{0{,}12}{12}\right)^{12} = 1{,}126825 \Rightarrow i_{\text{eff}} = 12{,}68\%$` },
              { md: m`(b) $1{,}1 = \left(1 + \frac{i_{\text{nom}}}{4}\right)^4 \Rightarrow 1 + \frac{i_{\text{nom}}}{4} = 1{,}1^{\frac{1}{4}}$` },
              { md: m`$i_{\text{nom}} = 4\left(1{,}1^{\frac{1}{4}} - 1\right) = 0{,}0965 = 9{,}65\%$ p.a. compounded quarterly` },
            ],
          },
          {
            type: "practice",
            id: "effective-practice",
            problems: [
              { q: m`Convert 18% p.a. compounded monthly to an effective annual rate (%, two decimals).`, answer: "19.56", tol: 0.006, solution: m`$$\left(1 + \frac{0{,}18}{12}\right)^{12} - 1 = 0{,}1956 \Rightarrow 19{,}56\%$$` },
              { q: m`Which is better for a SAVER: 10,5% p.a. compounded monthly, or 10,8% p.a. compounded annually? Give the effective rate of the monthly option (%, two decimals).`, answer: "11.02", tol: 0.006, hint: "Convert the monthly rate to effective, then compare with 10,8%.", solution: m`$$\left(1 + \frac{0{,}105}{12}\right)^{12} - 1 = 11{,}02\%$$

11,02% > 10,8%, so the **monthly** option is better for a saver.` },
              { q: m`Find the nominal rate compounded monthly that is equivalent to an effective rate of 15% p.a. (%, two decimals).`, answer: "14.06", tol: 0.006, solution: m`$$i_{\text{nom}} = 12\left(1{,}15^{\frac{1}{12}} - 1\right) = 14{,}06\%$$` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["effective-rate"], title: "Rate conversion drill" } },
        ],
      },
      {
        id: "timelines",
        title: "Timelines: deposits, withdrawals & changing rates",
        minutes: 9,
        blocks: [
          { type: "text", md: m`When money goes in or out at different times, or the rate changes: **draw a timeline** and move each amount to the end **separately**. Each amount only grows from the moment it enters the account.` },
          { type: "widget", widget: "timeline" },
          {
            type: "worked",
            title: "Move everything to the end",
            problem: m`R20 000 is invested. After 2 years R5 000 is added; after 4 years R8 000 is withdrawn. Interest is 9% p.a. compounded monthly for the first 3 years, then 12% p.a. compounded monthly. Find the value after 6 years.`,
            steps: [
              { md: m`R20 000 grows 3 years at 9% then 3 years at 12%: $20\,000\left(1 + \tfrac{0{,}09}{12}\right)^{36}\left(1 + \tfrac{0{,}12}{12}\right)^{36}$`, why: "Multiply the growth factors for each rate." },
              { md: m`R5 000 grows 1 year at 9% then 3 years at 12%: $5000\left(1 + \tfrac{0{,}09}{12}\right)^{12}\left(1 + \tfrac{0{,}12}{12}\right)^{36}$`, why: "It only enters at T2, and the rate changes at T3." },
              { md: m`R8 000 would have grown 2 years at 12%: subtract $8000\left(1 + \tfrac{0{,}12}{12}\right)^{24}$`, why: "A withdrawal is subtracted – including the interest it would have earned." },
              { md: m`$A = 37\,447{,}38 + 7\,824{,}92 - 10\,157{,}88 = \text{R}35\,114{,}43$`, why: "Keep full values in your calculator; round once at the end." },
            ],
          },
          { type: "callout", variant: "exam", md: m`Timeline questions are worth lots of marks, mostly for **setting up** each term correctly. Write one line per amount: "amount × growth factor(s)". A clear timeline sketch earns method marks even if the arithmetic slips.` },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: [m`$1 + i_{\text{eff}} = \left(1 + \frac{i_{\text{nom}}}{m}\right)^m$.`, "More compounding periods → higher effective rate.", "Compare offers using effective rates.", "Timelines: move every amount to the end separately; multiply factors when the rate changes."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "effective-quiz",
            questions: [
              { q: "12% p.a. compounded monthly has an effective rate that is…", options: ["less than 12%", "exactly 12%", "more than 12%", "exactly 1%"], answer: 2, explain: "Interest on interest during the year pushes it to 12,68%." },
              { q: m`The value of $m$ for "compounded quarterly" is…`, options: ["3", "4", "12", "1"], answer: 1, explain: "Four quarters in a year." },
              { q: "For a BORROWER, which is the best offer?", options: ["15% p.a. compounded monthly", "15% p.a. compounded daily", "15% p.a. compounded annually", "They're all the same"], answer: 2, explain: "Fewest compounding periods → lowest effective rate → least interest paid." },
              { q: "On a timeline, a withdrawal made at year 4 of a 6-year investment is…", options: ["ignored", "subtracted after growing it for 2 years", "subtracted after growing it for 6 years", "added"], answer: 1, explain: "It would have earned interest for the remaining 2 years, so subtract its grown value." },
              { q: m`R1 000 for 2 years at 6% then 1 year at 8% (both compounded annually) is…`, options: [m`$1000(1{,}06)^2(1{,}08)$`, m`$1000(1{,}14)^3$`, m`$1000(1{,}07)^3$`, m`$1000(1{,}06)^3 + 1000(1{,}08)$`], answer: 0, explain: "Multiply the growth factor for each period." },
            ],
          },
          { type: "exam", question: { id: "effective-exam", q: m`Thabo invests R30 000 at 8,4% p.a. compounded monthly. Calculate the effective annual interest rate, and then the value of his investment after 3 years.`, marks: 5, level: "routine", memo: [m`$1 + i_{\text{eff}} = \left(1 + \frac{0{,}084}{12}\right)^{12}$`, m`$i_{\text{eff}} = 8{,}73\%$`, m`$A = 30\,000\left(1 + \frac{0{,}084}{12}\right)^{36}$`, m`correct substitution of $n = 36$`, m`$A = \text{R}38\,564{,}01$ (accept R38 562,88 from the rounded $1{,}0873^3$)`] } },
        ],
      },
    ],
  },
];
