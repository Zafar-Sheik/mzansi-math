import type { Lesson } from "../types";

/** String.raw keeps LaTeX backslashes readable: m`$\frac{1}{2}$`. */
const m = String.raw;

export const EXPONENTS: Lesson[] = [
  {
    slug: "exponent-laws",
    topic: "g11-exponents",
    order: 1,
    title: "Exponent laws: the remix",
    tagline: "Why the laws work, rational exponents, and simplifying like a boss.",
    emoji: "⚡",
    caps: "CAPS Gr 11 · Algebra: apply the laws of exponents to expressions involving rational exponents; simplify using prime bases and common factors.",
    objectives: [
      "Explain where each exponent law comes from",
      "Work confidently with zero, negative and rational exponents",
      "Simplify by writing every base as a power of a prime",
      "Simplify expressions by taking out a common factor",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Base", def: m`The number that is multiplied repeatedly. In $a^n$ the base is $a$.` },
      { term: "Exponent", def: m`Tells you how many times the base is multiplied by itself. In $a^n$ the exponent is $n$.` },
      { term: "Product law", def: m`$a^m \times a^n = a^{m+n}$ – same base, multiplying: ADD the exponents.` },
      { term: "Quotient law", def: m`$\dfrac{a^m}{a^n} = a^{m-n}$ – same base, dividing: SUBTRACT the exponents.` },
      { term: "Power of a power", def: m`$\left(a^m\right)^n = a^{mn}$ – MULTIPLY the exponents.` },
      { term: "Zero exponent", def: m`$a^0 = 1$ for any $a \neq 0$.` },
      { term: "Negative exponent", def: m`$a^{-n} = \dfrac{1}{a^n}$ – it means "one over". It does NOT make the number negative.` },
      { term: "Rational exponent", def: m`$a^{\frac{m}{n}} = \sqrt[n]{a^m} = \left(\sqrt[n]{a}\right)^m$ – the bottom is the root, the top is the power.` },
      { term: "Prime base", def: m`Writing a base as a power of a prime, e.g. $8 = 2^3$, $9 = 3^2$, $12 = 2^2 \cdot 3$, so the laws can be used.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Why exponents run the internet",
        minutes: 3,
        blocks: [
          { type: "callout", variant: "real-world", md: m`You post a meme. 3 friends share it. Each of them gets 3 more to share it, and so on. After 10 rounds of sharing: $3^{10} = 59\,049$ people have seen it. **Exponents are the maths of things that multiply** – viral posts, compound interest, bacteria, even how fast your phone's chip got faster.` },
          { type: "text", md: m`In $a^n$, $a$ is the **base** and $n$ is the **exponent**. The exponent counts how many times the base is multiplied by itself:

$$2^5 = \underbrace{2 \times 2 \times 2 \times 2 \times 2}_{5 \text{ twos}} = 32$$

Every exponent law is just a shortcut for counting those factors. Play with the tiles below – you'll *see* each law.` },
          { type: "widget", widget: "exponent-laws", props: { law: "product" } },
        ],
      },
      {
        id: "laws",
        title: "The laws – and why they work",
        minutes: 6,
        blocks: [
          {
            type: "table",
            headers: ["Law", "In symbols", "Example"],
            rows: [
              ["Multiply, same base", m`$a^m \times a^n = a^{m+n}$`, m`$x^3 \times x^4 = x^7$`],
              ["Divide, same base", m`$\dfrac{a^m}{a^n} = a^{m-n}$`, m`$\dfrac{y^9}{y^2} = y^7$`],
              ["Power of a power", m`$(a^m)^n = a^{mn}$`, m`$(2^3)^2 = 2^6 = 64$`],
              ["Power of a product", m`$(ab)^n = a^n b^n$`, m`$(3x)^2 = 9x^2$`],
              ["Power of a quotient", m`$\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n}$`, m`$\left(\dfrac{2}{5}\right)^3 = \dfrac{8}{125}$`],
              ["Zero exponent", m`$a^0 = 1$`, m`$(-7)^0 = 1$`],
              ["Negative exponent", m`$a^{-n} = \dfrac{1}{a^n}$`, m`$4^{-2} = \dfrac{1}{16}$`],
            ],
          },
          { type: "text", md: m`Switch the widget to **Divide** and set $m = n$. Everything cancels and you're left with 1 – that's *why* $a^0 = 1$. Now make $n$ bigger than $m$: the leftovers end up underneath, which is *why* $a^{-n} = \frac{1}{a^n}$.` },
          { type: "widget", widget: "exponent-laws", props: { law: "quotient" } },
          { type: "callout", variant: "mistake", title: "Three classic traps", md: m`- $2^3 \times 2^4 = 2^7$, **not** $4^7$ – the base stays the same.
- $-3^2 = -9$ but $(-3)^2 = 9$. Without brackets the exponent only grabs the 3.
- $5^{-2} = \frac{1}{25}$, not $-25$. A negative exponent means *one over*, never "make it negative".` },
          { type: "callout", variant: "memory", md: m`**Multiply → add, divide → subtract, bracket power → times.** The operation on the exponents is always "one level down" from the operation on the powers.` },
        ],
      },
      {
        id: "rational",
        title: "Fraction (rational) exponents",
        minutes: 6,
        blocks: [
          { type: "text", md: m`What could $9^{\frac{1}{2}}$ mean? Use the power law: $\left(9^{\frac{1}{2}}\right)^2 = 9^1 = 9$. So $9^{\frac{1}{2}}$ is the number that squares to 9 – it's $\sqrt{9} = 3$. In general:

$$a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m = \sqrt[n]{a^m}$$

**Root first, then power** – the numbers stay small and you don't need a calculator.` },
          { type: "widget", widget: "exponent-laws", props: { law: "rational" } },
          {
            type: "worked",
            title: "Negative AND fractional",
            problem: m`Simplify without a calculator: $\left(\dfrac{27}{8}\right)^{-\frac{2}{3}}$`,
            steps: [
              { md: m`$= \left(\dfrac{8}{27}\right)^{\frac{2}{3}}$`, why: "A negative exponent flips the fraction – do this first, it's the easiest step." },
              { md: m`$= \left(\dfrac{\sqrt[3]{8}}{\sqrt[3]{27}}\right)^{2} = \left(\dfrac{2}{3}\right)^2$`, why: "The 3 in the denominator of the exponent is a cube root. Root first." },
              { md: m`$= \dfrac{4}{9}$`, why: "Then square top and bottom." },
            ],
          },
          { type: "callout", variant: "exam", md: m`"Simplify without a calculator" means **show the working**: write the base as a power, use a law, then the answer. A bare answer scores at most 1 mark.` },
        ],
      },
      {
        id: "prime-bases",
        title: "Prime bases & common factors",
        minutes: 8,
        blocks: [
          { type: "text", md: m`The laws only work when the **bases are the same**. So the pro move is to break every base into primes: $4 = 2^2$, $8 = 2^3$, $9 = 3^2$, $6 = 2 \cdot 3$, $12 = 2^2 \cdot 3$, $27 = 3^3$.` },
          {
            type: "worked",
            title: "Break everything into primes",
            problem: m`Simplify: $\dfrac{6^{x} \cdot 9^{x+1}}{2^{x} \cdot 27^{x}}$`,
            steps: [
              { md: m`$= \dfrac{2^x \cdot 3^x \cdot 3^{2x+2}}{2^x \cdot 3^{3x}}$`, why: m`$6^x = (2 \cdot 3)^x = 2^x 3^x$, $9^{x+1} = (3^2)^{x+1} = 3^{2x+2}$ and $27^x = 3^{3x}$.` },
              { md: m`$= 2^{x-x} \cdot 3^{x + 2x + 2 - 3x}$`, why: "Same bases together: add exponents on top, subtract the bottom ones." },
              { md: m`$= 2^0 \cdot 3^2 = 9$`, why: "All the x's cancel – a sign you're on the right track." },
            ],
          },
          {
            type: "worked",
            title: "Plus or minus? Take out a common factor",
            problem: m`Simplify: $\dfrac{2^{x+2} - 2^{x}}{2^{x+1}}$`,
            steps: [
              { md: m`$= \dfrac{2^{x}\cdot 2^{2} - 2^{x}}{2^{x}\cdot 2^{1}}$`, why: m`$2^{x+2} = 2^x \cdot 2^2$ (product law backwards).` },
              { md: m`$= \dfrac{2^{x}\left(4 - 1\right)}{2^{x} \cdot 2}$`, why: m`Take out the common factor $2^x$. You can NOT just subtract exponents when there's a minus sign between terms.` },
              { md: m`$= \dfrac{3}{2}$`, why: m`$2^x$ cancels.` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`$2^{x+2} - 2^{x} \neq 2^{2}$. The laws are for **multiplying and dividing** powers. When terms are added or subtracted, **factorise first**.` },
          {
            type: "practice",
            id: "exp-laws-practice",
            problems: [
              { q: m`Simplify without a calculator: $16^{\frac{3}{4}}$`, answer: "8", hint: m`$\sqrt[4]{16} = 2$`, solution: m`$$16^{\frac{3}{4}} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$$` },
              { q: m`Simplify: $\left(\dfrac{1}{9}\right)^{-\frac{3}{2}}$`, answer: "27", hint: "Flip first, then square root, then cube.", solution: m`$$\left(\tfrac{1}{9}\right)^{-\frac{3}{2}} = 9^{\frac{3}{2}} = \left(\sqrt{9}\right)^3 = 3^3 = 27$$` },
              { q: m`Simplify: $\dfrac{12^{x} \cdot 3^{2-x}}{4^{x} \cdot 9}$`, answer: "1", hint: m`$12^x = 2^{2x} \cdot 3^x$ and $4^x = 2^{2x}$.`, solution: m`$$= \dfrac{2^{2x} \cdot 3^{x} \cdot 3^{2-x}}{2^{2x} \cdot 3^{2}} = 2^{0} \cdot 3^{x + 2 - x - 2} = 3^0 = 1$$` },
              { q: m`Simplify: $\dfrac{3^{x+2} - 3^{x}}{4 \cdot 3^{x}}$`, answer: "2", hint: m`Take out $3^x$ on top.`, solution: m`$$= \dfrac{3^{x}(9 - 1)}{4 \cdot 3^{x}} = \dfrac{8}{4} = 2$$` },
              { q: m`Simplify: $\left(2x^{3}\right)^{2} \cdot x^{-4}$`, answer: "4x^2", kind: "expr", hint: "Square everything inside the bracket – including the 2.", solution: m`$$\left(2x^3\right)^2 \cdot x^{-4} = 4x^{6} \cdot x^{-4} = 4x^{2}$$` },
            ],
          },
        ],
      },
      {
        id: "drill",
        title: "Endless practice & quick check",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Warm up with as many fresh questions as you like – every one comes with full working. Try for a streak of 5!` },
          { type: "widget", widget: "drill", props: { generators: ["exp-eval"], title: "Exponent drill" } },
          { type: "keypoints", points: [m`Same base: multiply → add, divide → subtract, bracket → multiply exponents.`, m`$a^0 = 1$ and $a^{-n} = \frac{1}{a^n}$ (one over, never negative).`, m`$a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m$ – root first.`, "Break bases into primes; with + or −, factorise first."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "exp-laws-quiz",
            questions: [
              { q: m`$2^3 \times 2^4 =$`, options: [m`$4^7$`, m`$2^7$`, m`$2^{12}$`, m`$4^{12}$`], answer: 1, explain: m`Same base, multiplying → add the exponents: $2^{3+4} = 2^7$. The base stays 2.` },
              { q: m`$5^0 + 5^{-1} =$`, options: [m`$0$`, m`$-5$`, m`$\frac{4}{5}$`, m`$\frac{6}{5}$`], answer: 3, explain: m`$5^0 = 1$ and $5^{-1} = \frac{1}{5}$, so the sum is $\frac{6}{5}$.` },
              { q: m`$27^{\frac{2}{3}} =$`, options: [m`$9$`, m`$18$`, m`$3$`, m`$81$`], answer: 0, explain: m`Cube root first: $\sqrt[3]{27} = 3$, then square: $3^2 = 9$.` },
              { q: m`Which one is NOT equal to $\frac{1}{8}$?`, options: [m`$2^{-3}$`, m`$8^{-1}$`, m`$(-2)^{3}$`, m`$4^{-\frac{3}{2}}$`], answer: 2, explain: m`$(-2)^3 = -8$. The others: $2^{-3} = \frac{1}{8}$, $8^{-1} = \frac{1}{8}$, $4^{-\frac{3}{2}} = \frac{1}{(\sqrt{4})^3} = \frac{1}{8}$.` },
              { q: m`Simplify $\dfrac{2^{x+3}}{2^{x}}$`, options: [m`$2^{x}$`, m`$2^{2x+3}$`, m`$8$`, m`$1$`], answer: 2, explain: m`$2^{x+3-x} = 2^3 = 8$.` },
              { q: m`What is $-3^2$?`, options: [m`$9$`, m`$-9$`, m`$-6$`, m`$\frac{1}{9}$`], answer: 1, explain: m`Without brackets, the exponent only applies to the 3: $-(3^2) = -9$. Compare $(-3)^2 = 9$.` },
              { q: m`To simplify $\dfrac{5^{x+1} + 5^{x}}{5^{x}}$ the FIRST step should be…`, options: ["Subtract the exponents", m`Take out the common factor $5^x$ in the numerator`, "Cancel the 5's", "Add the exponents on top"], answer: 1, explain: m`There's a + between the terms, so factorise: $\frac{5^x(5 + 1)}{5^x} = 6$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "surds",
    topic: "g11-exponents",
    order: 2,
    title: "Surds without the stress",
    tagline: "Simplify, add, multiply and rationalise roots – exact answers only.",
    emoji: "√",
    caps: "CAPS Gr 11 · Algebra: simplify expressions with surds (add, subtract, multiply, divide) and rationalise denominators.",
    objectives: [
      "Tell rational and irrational numbers apart",
      "Write surds in simplest form",
      "Add, subtract, multiply and expand surds",
      "Rationalise a denominator, including with a conjugate",
    ],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Surd", def: m`A root that can't be simplified to a rational number, e.g. $\sqrt{2}$, $\sqrt[3]{5}$. It's irrational.` },
      { term: "Rational number", def: m`A number that can be written as $\frac{a}{b}$ with $a, b$ integers and $b \neq 0$ – includes terminating and recurring decimals.` },
      { term: "Irrational number", def: m`A number that can't be written as a fraction of integers; its decimals never end or repeat, e.g. $\pi$, $\sqrt{3}$.` },
      { term: "Simplest surd form", def: m`$k\sqrt{m}$ where $m$ has no perfect-square factor, e.g. $\sqrt{72} = 6\sqrt{2}$.` },
      { term: "Like surds", def: m`Surds with the same root and the same number inside, e.g. $3\sqrt{5}$ and $-7\sqrt{5}$. Only like surds can be added or subtracted.` },
      { term: "Rationalising the denominator", def: m`Rewriting a fraction so there's no surd in the denominator, e.g. $\frac{6}{\sqrt{3}} = 2\sqrt{3}$.` },
      { term: "Conjugate", def: m`$\sqrt{a} - b$ is the conjugate of $\sqrt{a} + b$. Multiplying them gives $a - b^2$ – the surd disappears.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "Numbers that never end",
        minutes: 4,
        blocks: [
          { type: "callout", variant: "real-world", md: m`A square tile with 1 m sides has a diagonal of exactly $\sqrt{2}$ m. Your calculator says 1,414213562… but the decimals **never end and never repeat**. Tilers, architects and game designers work with surds every day – and in exams, "leave your answer in surd form" means keep the exact $\sqrt{2}$.` },
          { type: "text", md: m`**Rational** numbers can be written as a fraction of integers: $5$, $-\frac{3}{4}$, $0{,}25$, $0{,}\overline{3}$. **Irrational** numbers can't: $\pi$, $\sqrt{2}$, $\sqrt[3]{10}$. A **surd** is an irrational root.` },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "rational-irrational", title: "Rational or irrational?", buckets: ["Rational", "Irrational"], colour: "var(--t-algebra)",
              items: [
                { text: m`$\sqrt{49}$`, bucket: "Rational" }, { text: m`$\sqrt{50}$`, bucket: "Irrational" }, { text: m`$\pi$`, bucket: "Irrational" },
                { text: m`$0{,}\overline{3}$`, bucket: "Rational" }, { text: m`$\sqrt[3]{27}$`, bucket: "Rational" }, { text: m`$\sqrt{2} \times \sqrt{8}$`, bucket: "Rational" },
                { text: m`$\frac{22}{7}$`, bucket: "Rational" }, { text: m`$1 + \sqrt{3}$`, bucket: "Irrational" },
              ],
            },
          },
          { type: "callout", variant: "tip", md: m`$\frac{22}{7}$ is rational – it's a fraction! It's only an *approximation* of $\pi$, which is irrational.` },
        ],
      },
      {
        id: "simplify",
        title: "Simplest surd form",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Two rules do all the work (for $a, b \geq 0$):

$$\sqrt{ab} = \sqrt{a}\,\sqrt{b} \qquad\qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$$

To simplify $\sqrt{n}$, find the **biggest perfect square** that divides $n$ and pull its root out.` },
          { type: "widget", widget: "surd-simplifier", props: { start: 72 } },
          {
            type: "worked",
            title: "Add and subtract like surds",
            problem: m`Simplify: $\sqrt{50} + \sqrt{18} - \sqrt{8}$`,
            steps: [
              { md: m`$= \sqrt{25 \times 2} + \sqrt{9 \times 2} - \sqrt{4 \times 2}$`, why: "Look for the biggest square factor of each number." },
              { md: m`$= 5\sqrt{2} + 3\sqrt{2} - 2\sqrt{2}$`, why: "Now they are LIKE surds – all multiples of √2." },
              { md: m`$= 6\sqrt{2}$`, why: m`Collect them like $5x + 3x - 2x = 6x$.` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`$\sqrt{9 + 16} \neq \sqrt{9} + \sqrt{16}$. Check: $\sqrt{25} = 5$, but $3 + 4 = 7$. Roots split over **multiplication**, never over addition.` },
        ],
      },
      {
        id: "multiply",
        title: "Multiplying & expanding",
        minutes: 6,
        blocks: [
          { type: "text", md: m`Multiply surds like algebra – multiply the numbers outside together and the numbers inside together:

$$2\sqrt{3} \times 5\sqrt{6} = 10\sqrt{18} = 10 \times 3\sqrt{2} = 30\sqrt{2}$$

And remember $\sqrt{a} \times \sqrt{a} = a$.` },
          {
            type: "worked",
            title: "Expanding brackets",
            problem: m`Expand: (a) $(2 + \sqrt{3})^2$ (b) $(\sqrt{5} + 2)(\sqrt{5} - 2)$`,
            steps: [
              { md: m`(a) $(2 + \sqrt{3})^2 = 4 + 2(2)(\sqrt{3}) + 3$`, why: m`$(a + b)^2 = a^2 + 2ab + b^2$, and $(\sqrt{3})^2 = 3$.` },
              { md: m`$= 7 + 4\sqrt{3}$`, why: "Collect the rational parts. You can't combine 7 and 4√3 – they're not like terms." },
              { md: m`(b) $(\sqrt{5} + 2)(\sqrt{5} - 2) = 5 - 4 = 1$`, why: "Difference of two squares: the surd vanishes. Keep this trick – it's the key to rationalising." },
            ],
          },
          {
            type: "practice",
            id: "surds-multiply-practice",
            problems: [
              { q: m`Simplify: $\sqrt{3} \times \sqrt{12}$`, answer: "6", solution: m`$$\sqrt{3 \times 12} = \sqrt{36} = 6$$` },
              { q: m`Simplify: $\sqrt{98}$`, answer: "7sqrt(2)", form: "simplified-surd", hint: "98 = 49 × 2", solution: m`$$\sqrt{98} = \sqrt{49 \times 2} = 7\sqrt{2}$$` },
              { q: m`Simplify: $3\sqrt{12} - \sqrt{27}$`, answer: "3sqrt(3)", form: "simplified-surd", hint: "Both are multiples of √3.", solution: m`$$3\sqrt{12} - \sqrt{27} = 3(2\sqrt{3}) - 3\sqrt{3} = 6\sqrt{3} - 3\sqrt{3} = 3\sqrt{3}$$` },
              { q: m`Expand and simplify: $(\sqrt{7} - 1)(\sqrt{7} + 1)$`, answer: "6", solution: m`$$(\sqrt{7})^2 - 1^2 = 7 - 1 = 6$$` },
            ],
          },
        ],
      },
      {
        id: "rationalise",
        title: "Rationalising the denominator",
        minutes: 7,
        blocks: [
          { type: "text", md: m`Mathematicians agreed long ago: **no surds in the denominator**. To get rid of one, multiply top and bottom by something that makes the bottom rational (that's multiplying by 1, so the value doesn't change):

$$\frac{6}{\sqrt{3}} \times \frac{\sqrt{3}}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$$` },
          {
            type: "worked",
            title: "Using the conjugate",
            problem: m`Rationalise the denominator: $\dfrac{4}{\sqrt{5} - 1}$`,
            steps: [
              { md: m`$= \dfrac{4}{\sqrt{5} - 1} \times \dfrac{\sqrt{5} + 1}{\sqrt{5} + 1}$`, why: m`Multiply by the **conjugate** $\sqrt{5} + 1$ (same terms, opposite sign).` },
              { md: m`$= \dfrac{4(\sqrt{5} + 1)}{5 - 1}$`, why: m`The bottom is a difference of squares: $(\sqrt{5})^2 - 1^2 = 4$.` },
              { md: m`$= \sqrt{5} + 1$`, why: "The 4's cancel." },
            ],
          },
          {
            type: "practice",
            id: "surds-rationalise-practice",
            problems: [
              { q: m`Rationalise: $\dfrac{10}{\sqrt{5}}$`, answer: "2sqrt(5)", form: "rationalised", hint: "Multiply top and bottom by √5.", solution: m`$$\frac{10}{\sqrt{5}} \times \frac{\sqrt{5}}{\sqrt{5}} = \frac{10\sqrt{5}}{5} = 2\sqrt{5}$$` },
              { q: m`Rationalise: $\dfrac{3}{\sqrt{2}}$`, answer: "3sqrt(2)/2", form: "rationalised", solution: m`$$\frac{3}{\sqrt{2}} \times \frac{\sqrt{2}}{\sqrt{2}} = \frac{3\sqrt{2}}{2}$$` },
              { q: m`Rationalise: $\dfrac{2}{\sqrt{3} + 1}$`, answer: "sqrt(3) - 1", form: "rationalised", hint: "Multiply by the conjugate √3 − 1.", solution: m`$$\frac{2}{\sqrt{3}+1} \times \frac{\sqrt{3}-1}{\sqrt{3}-1} = \frac{2(\sqrt{3}-1)}{3 - 1} = \sqrt{3} - 1$$` },
            ],
          },
        ],
      },
      {
        id: "drill",
        title: "Endless practice & quick check",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "drill", props: { generators: ["surd-simplify", "surd-addsub", "surd-rationalise"], title: "Surd drill" } },
          { type: "keypoints", points: [m`$\sqrt{ab} = \sqrt{a}\sqrt{b}$ – but $\sqrt{a+b} \neq \sqrt{a} + \sqrt{b}$.`, "Simplest form: pull out the biggest perfect square.", "Only like surds can be added or subtracted.", "Rationalise: multiply by √m/√m, or by the conjugate."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "surds-quiz",
            questions: [
              { q: m`$\sqrt{72}$ in simplest surd form is…`, options: [m`$2\sqrt{18}$`, m`$3\sqrt{8}$`, m`$6\sqrt{2}$`, m`$36\sqrt{2}$`], answer: 2, explain: m`The biggest square factor of 72 is 36: $\sqrt{36 \times 2} = 6\sqrt{2}$. The others are equal in value but not simplest.` },
              { q: "Which number is irrational?", options: [m`$\sqrt{0{,}25}$`, m`$\sqrt{12}$`, m`$0{,}\overline{142857}$`, m`$\sqrt[3]{-8}$`], answer: 1, explain: m`$\sqrt{12} = 2\sqrt{3}$ – irrational. $\sqrt{0{,}25} = 0{,}5$, a recurring decimal is rational and $\sqrt[3]{-8} = -2$.` },
              { q: m`$\sqrt{9 + 16} =$`, options: [m`$7$`, m`$5$`, m`$\sqrt{3} + 4$`, m`$25$`], answer: 1, explain: m`Add first: $\sqrt{25} = 5$. Roots don't split over addition.` },
              { q: m`$2\sqrt{3} \times 4\sqrt{3} =$`, options: [m`$8\sqrt{3}$`, m`$8\sqrt{9}$`, m`$24$`, m`$6\sqrt{6}$`], answer: 2, explain: m`$2 \times 4 \times \sqrt{3} \times \sqrt{3} = 8 \times 3 = 24$.` },
              { q: m`To rationalise $\dfrac{1}{2 - \sqrt{3}}$, multiply top and bottom by…`, options: [m`$\sqrt{3}$`, m`$2 - \sqrt{3}$`, m`$2 + \sqrt{3}$`, m`$\sqrt{2}$`], answer: 2, explain: m`Use the conjugate $2 + \sqrt{3}$: the bottom becomes $4 - 3 = 1$, so the answer is $2 + \sqrt{3}$.` },
              { q: m`$\sqrt{8} + \sqrt{2} =$`, options: [m`$\sqrt{10}$`, m`$3\sqrt{2}$`, m`$4$`, m`$2\sqrt{4}$`], answer: 1, explain: m`$\sqrt{8} = 2\sqrt{2}$, so $2\sqrt{2} + \sqrt{2} = 3\sqrt{2}$.` },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "exponential-equations",
    topic: "g11-exponents",
    order: 3,
    title: "Exponential & surd equations",
    tagline: "When x is in the exponent – or hiding under a root.",
    emoji: "🚀",
    caps: "CAPS Gr 11 · Algebra: solve exponential equations (same base, factorising, k-substitution), equations with rational exponents and simple surd equations.",
    objectives: [
      "Solve equations by making the bases equal",
      "Solve equations with rational exponents",
      "Factorise or use k-substitution to solve harder exponential equations",
      "Solve surd equations and reject invalid (extraneous) solutions",
    ],
    styles: ["read-write", "kinaesthetic", "visual"],
    xp: 70,
    terms: [
      { term: "Exponential equation", def: m`An equation with the variable in the exponent, e.g. $3^{x+1} = 81$.` },
      { term: "Equating exponents", def: m`If $a^x = a^y$ (with $a > 0$, $a \neq 1$) then $x = y$.` },
      { term: "k-substitution", def: m`Replacing a repeated power like $3^x$ with $k$ to turn the equation into a quadratic, e.g. $9^x - 4 \cdot 3^x + 3 = 0 \to k^2 - 4k + 3 = 0$.` },
      { term: "Surd equation", def: m`An equation with the variable under a root, e.g. $\sqrt{x+2} = x - 4$.` },
      { term: "Extraneous solution", def: "An answer produced by squaring both sides that does NOT satisfy the original equation – it must be rejected." },
      { term: "Exponential is always positive", def: m`$a^x > 0$ for every $x$ (if $a > 0$), so an equation like $2^x = -1$ has no solution.` },
    ],
    chunks: [
      {
        id: "hook",
        title: "When will it go viral?",
        minutes: 3,
        blocks: [
          { type: "callout", variant: "real-world", md: m`Your cousin's dance account has 100 followers and the number **doubles every week**. After $x$ weeks: $100 \cdot 2^x$. When will they have 102 400 followers?

$$100 \cdot 2^x = 102\,400 \;\Rightarrow\; 2^x = 1024 = 2^{10} \;\Rightarrow\; x = 10 \text{ weeks}$$

That's an **exponential equation** – the unknown is in the exponent.` },
          { type: "text", md: m`The golden rule: **if the bases are equal, the exponents are equal.** So the whole game is to write both sides as powers of the same base.` },
        ],
      },
      {
        id: "same-base",
        title: "Same base, equal exponents",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Three quick ones",
            problem: m`Solve for $x$: (a) $3^{x+1} = 81$ (b) $4^{x} = 32$ (c) $2^{x} = \dfrac{1}{16}$`,
            steps: [
              { md: m`(a) $3^{x+1} = 3^4 \Rightarrow x + 1 = 4 \Rightarrow x = 3$`, why: m`$81 = 3^4$.` },
              { md: m`(b) $2^{2x} = 2^5 \Rightarrow 2x = 5 \Rightarrow x = \frac{5}{2}$`, why: m`4 and 32 are both powers of 2: $4^x = (2^2)^x = 2^{2x}$.` },
              { md: m`(c) $2^{x} = 2^{-4} \Rightarrow x = -4$`, why: m`$\frac{1}{16} = \frac{1}{2^4} = 2^{-4}$.` },
            ],
          },
          { type: "text", md: m`**Rational exponents:** if the variable is the *base*, raise both sides to the reciprocal power. For $x^{\frac{3}{2}} = 27$:

$$\left(x^{\frac{3}{2}}\right)^{\frac{2}{3}} = 27^{\frac{2}{3}} \;\Rightarrow\; x = \left(\sqrt[3]{27}\right)^2 = 9$$` },
          {
            type: "practice",
            id: "exp-eq-practice-1",
            problems: [
              { q: m`Solve for $x$: $5^{x-2} = 125$`, answer: "5", solution: m`$$5^{x-2} = 5^3 \Rightarrow x - 2 = 3 \Rightarrow x = 5$$` },
              { q: m`Solve for $x$: $9^{x} = 27$`, answer: "3/2", hint: "Both are powers of 3.", solution: m`$$3^{2x} = 3^3 \Rightarrow 2x = 3 \Rightarrow x = \tfrac{3}{2}$$` },
              { q: m`Solve for $x$: $x^{\frac{1}{3}} = 4$`, answer: "64", hint: "Cube both sides.", solution: m`$$x = 4^3 = 64$$` },
              { q: m`Solve for $x$: $2x^{\frac{3}{4}} = 16$`, answer: "16", hint: m`Divide by 2 first, then raise to the power $\frac{4}{3}$.`, solution: m`$$x^{\frac{3}{4}} = 8 \Rightarrow x = 8^{\frac{4}{3}} = \left(\sqrt[3]{8}\right)^4 = 2^4 = 16$$` },
            ],
          },
        ],
      },
      {
        id: "factorise",
        title: "Factorising & k-substitution",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Take out a common factor",
            problem: m`Solve for $x$: $2^{x+1} + 2^{x} = 48$`,
            steps: [
              { md: m`$2^{x}(2 + 1) = 48$`, why: m`$2^{x+1} = 2^x \cdot 2$, so $2^x$ is a common factor.` },
              { md: m`$2^{x} = 16 = 2^4$`, why: "Divide both sides by 3." },
              { md: m`$x = 4$`, why: "Same base → equal exponents." },
            ],
          },
          {
            type: "worked",
            title: "k-substitution (a quadratic in disguise)",
            problem: m`Solve for $x$: $2^{2x} - 2^{x} - 2 = 0$`,
            steps: [
              { md: m`Let $k = 2^{x}$. Then $2^{2x} = (2^x)^2 = k^2$.`, why: "Spot the square: the exponent 2x is double the exponent x." },
              { md: m`$k^2 - k - 2 = 0 \Rightarrow (k - 2)(k + 1) = 0 \Rightarrow k = 2 \text{ or } k = -1$` },
              { md: m`$2^{x} = 2 \Rightarrow x = 1$, but $2^{x} = -1$ has **no solution**.`, why: "A positive base to any power is always positive." },
              { md: m`So $x = 1$.` },
            ],
          },
          { type: "callout", variant: "mistake", md: m`Writing "$2^x = -1$, so $x = -1$" loses a mark. Always write **no solution** (or "not possible") for that factor – examiners give a mark for rejecting it.` },
          { type: "widget", widget: "drill", props: { generators: ["exp-equation"], title: "Exponential equation drill" } },
        ],
      },
      {
        id: "surd-equations",
        title: "Surd equations (and the fake answers)",
        minutes: 8,
        blocks: [
          { type: "text", md: m`To solve a surd equation: **isolate the root, square both sides, solve, then CHECK every answer** in the original equation. Squaring can create fake (extraneous) solutions.` },
          {
            type: "worked",
            title: "Square, solve, check",
            problem: m`Solve for $x$: $\sqrt{x + 2} = x - 4$`,
            steps: [
              { md: m`$x + 2 = (x - 4)^2 = x^2 - 8x + 16$`, why: "The root is already alone, so square both sides." },
              { md: m`$x^2 - 9x + 14 = 0 \Rightarrow (x - 7)(x - 2) = 0 \Rightarrow x = 7 \text{ or } x = 2$` },
              { md: m`Check $x = 7$: $\sqrt{9} = 3$ and $7 - 4 = 3$ ✓. Check $x = 2$: $\sqrt{4} = 2$ but $2 - 4 = -2$ ✗`, why: m`$\sqrt{\ }$ means the POSITIVE root, so it can never equal $-2$.` },
              { md: m`So $x = 7$ only.` },
            ],
          },
          {
            type: "sequence",
            id: "surd-eq-steps",
            title: "Order the method for solving a surd equation",
            steps: ["Isolate the surd on one side", "Square both sides", "Rearrange to standard form = 0", "Factorise and solve", "Check every answer in the ORIGINAL equation and reject invalid ones"],
            explain: "Squaring is not reversible – that's exactly why the final check is compulsory.",
          },
          {
            type: "practice",
            id: "surd-eq-practice",
            problems: [
              { q: m`Solve for $x$: $\sqrt{2x + 3} = x$`, answer: "3", kind: "set", hint: "Square both sides, solve, then check both answers.", solution: m`$$2x + 3 = x^2 \Rightarrow x^2 - 2x - 3 = 0 \Rightarrow (x - 3)(x + 1) = 0$$

$x = 3$: $\sqrt{9} = 3$ ✓. $x = -1$: $\sqrt{1} = 1 \neq -1$ ✗. So $x = 3$.` },
              { q: m`Solve for $x$: $\sqrt{x - 1} + 3 = x$`, answer: "5", kind: "set", hint: "Isolate the root first: √(x − 1) = x − 3.", solution: m`$$\sqrt{x-1} = x - 3 \Rightarrow x - 1 = x^2 - 6x + 9 \Rightarrow x^2 - 7x + 10 = 0$$
$$(x - 5)(x - 2) = 0$$

$x = 5$: $\sqrt{4} + 3 = 5$ ✓. $x = 2$: $\sqrt{1} + 3 = 4 \neq 2$ ✗. So $x = 5$.` },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 6,
        blocks: [
          { type: "keypoints", points: ["Write both sides with the same base, then equate the exponents.", m`Variable in the base with a fraction exponent: raise both sides to the reciprocal power.`, m`With + or −: factorise, or substitute $k = a^x$.`, m`$a^x$ is never negative or zero → reject $a^x = -1$.`, "Surd equations: square, solve, CHECK, reject fakes."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "exp-eq-quiz",
            questions: [
              { q: m`Solve: $2^{x} = 32$`, options: ["16", "5", "6", "4"], answer: 1, explain: m`$32 = 2^5$, so $x = 5$.` },
              { q: m`Solve: $8^{x} = 4$`, options: [m`$\frac{1}{2}$`, m`$2$`, m`$\frac{2}{3}$`, m`$\frac{3}{2}$`], answer: 2, explain: m`$2^{3x} = 2^2 \Rightarrow 3x = 2 \Rightarrow x = \frac{2}{3}$.` },
              { q: m`Solve: $3^{x} = \frac{1}{9}$`, options: [m`$-2$`, m`$2$`, m`$-3$`, "no solution"], answer: 0, explain: m`$\frac{1}{9} = 3^{-2}$, so $x = -2$.` },
              { q: m`In $9^{x} - 10 \cdot 3^{x} + 9 = 0$, a good substitution is…`, options: [m`$k = 9^x$`, m`$k = 3^x$`, m`$k = x^2$`, m`$k = 10x$`], answer: 1, explain: m`$9^x = (3^x)^2 = k^2$, giving $k^2 - 10k + 9 = 0$, so $k = 1$ or $k = 9$ and $x = 0$ or $x = 2$.` },
              { q: m`Solving $5^{x} = -25$ gives…`, options: [m`$x = -2$`, m`$x = 2$`, "no real solution", m`$x = -\frac{1}{2}$`], answer: 2, explain: "A positive base raised to any power is positive – it can never equal −25." },
              { q: m`Why must you check answers to $\sqrt{x+6} = x$?`, options: ["Because calculators make mistakes", "Squaring both sides can create solutions that don't fit the original equation", "Because √ can be negative", "You don't need to check"], answer: 1, explain: m`Here $x = 3$ works but $x = -2$ doesn't: $\sqrt{4} = 2 \neq -2$.` },
            ],
          },
          { type: "exam", question: { id: "exp-eq-exam", q: m`Solve for $x$: $3^{x+2} - 3^{x} = 72$`, marks: 4, level: "routine", memo: [m`$3^{x}(3^2 - 1) = 72$ (common factor)`, m`$3^{x} \cdot 8 = 72 \Rightarrow 3^{x} = 9$`, m`$3^{x} = 3^{2}$ (same base)`, m`$x = 2$`] } },
        ],
      },
    ],
  },
];
