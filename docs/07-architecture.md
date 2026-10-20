# Architecture

MathsMzansi is a **static Next.js site** – there is no database and no server-side learner data.

## Stack

Next.js 15 (App Router, static generation) · React 19 · TypeScript (strict) · Tailwind CSS 4 · KaTeX (remark-math + rehype-katex) · GSAP 3 · Motion (Aceternity UI components) · Vitest · Playwright

## Folders

```
src/
  app/                 routes (learn, flashcards, quiz, exam, toolkit, games, progress, teachers, api/curriculum)
  components/
    learn/             lesson player, quiz, practice, worked examples, flashcards, sequence, match, exam-part, markdown (+KaTeX), tex
    math/              plot (SVG Cartesian plane), math-input (typed answers + preview + keypad), problem-card
    widgets/           interactive tools (code-split with next/dynamic)
    pages/             client components for each page
    home/, layout/, ui/, aceternity/
  content/
    lessons/*.ts       lessons as typed data (one file per topic, e.g. g11-functions.ts)
    exam.ts            Exam Room questions and memos
    index.ts           LESSONS, LIVE_TOPICS, GLOSSARY, QUESTION_BANK, TOPIC_INDEX
  lib/
    math/expr.ts       safe expression parser → evaluate / LaTeX (no eval)
    math/check.ts      answer checker: numbers, sets, points, expressions, surd forms
    math/generators.ts problem generators (seeded, each with worked solutions)
    math/finance.ts, patterns.ts, numbers.ts, speech.ts
    topics.ts          grades, strands, topics, phases, colours and paper structure
    progress.ts        XP, badges, streaks (localStorage)
    cards.ts           Leitner flashcard state (localStorage)
    prefs.ts           accessibility preferences (localStorage)
docs/                  this documentation (rendered at /teachers)
tests/                 Vitest unit + content tests, Playwright e2e
```

## The maths engine

- **`expr.ts`** tokenises and parses what learners type – implicit multiplication (`2x`, `3sqrt(2)`, `(x+1)(x-2)`), powers, roots (`sqrt`, `√`, `cbrt`), `π`, unicode from phone keyboards, and degree-based trig – into a small AST. It never uses `eval`.
- **`check.ts`** compares answers numerically (with tolerances for rounded money and percentages), as unordered sets (`x = 2 or x = -3`, `-1 ± √3`), as coordinates, or as algebraic expressions by substituting random values. It also checks *form* (simplest surd, rationalised denominator) and produces targeted feedback.
- **`generators.ts`** creates fresh problems from a seed. The test-suite generates 150 problems per generator and checks that every memo answer passes its own checker and every formula renders in KaTeX.

## Data flow

Lessons are plain TypeScript objects. Server components read them at build time and pass small, serialisable summaries to client components. The **glossary** and **quiz bank** are derived automatically from the lessons.

Learner state lives in three `localStorage` keys: `mathsmzansi:progress`, `mathsmzansi:cards` and `mathsmzansi:prefs`, each managed by a tiny `useSyncExternalStore` store.

## Topics and phases

`src/lib/topics.ts` lists **every** CAPS topic in the five strands for both grades, each with its grade, strand, paper and build phase. Pages show only topics with lessons in filters, and show the rest as "coming soon" cards on the Learn page – so adding a lesson file for a topic is all it takes to "switch it on".
