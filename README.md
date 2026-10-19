# MathsMzansi

**An interactive Grade 11 & 12 Mathematics companion for South African learners (CAPS, NSC Paper 1 & Paper 2).**
The sister app of *CodeMzansi* (IT) and *GeoMzansi* (Geography): same learning design, same accessibility features. Built with Next.js, KaTeX, GSAP and Aceternity UI patterns.

Covers the **Algebra, Geometry and Trigonometry** strands, built in phases (see [`docs/12-roadmap.md`](docs/12-roadmap.md)).

## Phase 1 (this release): platform + Grade 11 Algebra & Functions

- 📚 **16 lessons** in short steps: Exponents & Surds, Equations & Inequalities, Number Patterns, Functions & Graphs, Finance, Growth & Decay
- ✍️ **Typed answers that are actually checked** – `2√5`, `x = 2 or x = -3`, `-1 ± √3`, `(2; -3)`, `2n^2 + n - 1`, `R12 345,67` – with live preview, a symbol keypad, specific feedback, hints and full worked solutions
- ♾️ **Endless practice**: 18 question generators, each with worked solutions and streaks
- 📈 **Interactive tools**: function grapher (line, parabola, hyperbola, exponential) with a *Graph Match* challenge, quadratic lab, inequality lab, line-meets-parabola lab, pattern machine, exponent-law tiles, surd simplifier, money lab, investment timeline
- 🪜 **Worked examples revealed one step at a time**, with a "Why?" for every step
- 🃏 **Flashcards** with spaced repetition for every term and formula, plus a glossary
- ⚔️ **Quiz Arena** – mixed-topic rounds, relaxed or timed
- 📝 **Exam Room** – NSC-style questions with marking memos (method marks included)
- 🎮 **Games**: Speed Solve, Graph Match, Formula Pairs, True/False Blitz, Odd One Out, Maths Hangman
- 🧠 **ADHD & accessibility**: step mode, focus mode, focus sprints, calm mode, reading ruler, dyslexia-friendly fonts, read-aloud that reads maths, high contrast
- 🔒 **No accounts, no tracking**: everything is stored on the learner's device

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint (zero warnings) |
| `npm test` | Maths-engine and content-integrity tests (Vitest) |
| `npm run test:e2e` | Browser tests on desktop + mobile (Playwright; needs a production build) |
| `npm run check` | typecheck + lint + test + build |

## Documentation

Teacher and developer docs live in [`docs/`](docs) and are rendered in the site at **`/teachers`**: overview, teacher quick-start, CAPS curriculum map, learning design, ADHD & accessibility, design system, architecture, content authoring, testing & deployment, privacy, FAQ and the build roadmap.

> An independent study aid. Always confirm exam details with your teacher and the latest DBE examination guidelines.
