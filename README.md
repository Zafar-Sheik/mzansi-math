# MathsMzansi

**An interactive Grade 11 & 12 Mathematics companion for South African learners (CAPS, NSC Paper 1 & Paper 2).**
The sister app of *CodeMzansi* (IT) and *GeoMzansi* (Geography): same learning design, same accessibility features. Built with Next.js, KaTeX, GSAP and Aceternity UI patterns.

Covers the **Algebra, Geometry and Trigonometry** strands, built in phases (see [`docs/12-roadmap.md`](docs/12-roadmap.md)).

## Live now: the whole Grade 11 & 12 syllabus (Phases 1–4)

- 📚 **55 lessons** in short steps
  - *Grade 11 Algebra:* Exponents & Surds, Equations & Inequalities, Number Patterns, Functions & Graphs, Finance, Growth & Decay
  - *Grade 11 Geometry:* Analytical Geometry, Euclidean (circle) Geometry with the examinable proofs, Measurement
  - *Grade 11 Trigonometry:* ratios & CAST, reduction formulae, identities, equations & general solutions, graphs, sine/cosine/area rules
  - *Grade 12 Algebra & Calculus:* Sequences & Series, Functions & Inverses (logs), Finance & Annuities, Polynomials, Differential Calculus
  - *Grade 12 Geometry & Trigonometry:* circles & tangents, proportionality & similarity (with the proofs), compound & double angles, equations, 2D & 3D problems
- ✍️ **Typed answers that are actually checked** – `2√5`, `x = 2 or x = -3`, `-1 ± √3`, `(2; -3)`, `2n^2 + n - 1`, `R12 345,67` – with live preview, a symbol keypad, specific feedback, hints and full worked solutions
- ♾️ **Endless practice**: 56 question generators (circle-angle questions come with generated diagrams), each with worked solutions and streaks
- 📈 **29 interactive tools**: function grapher with a *Graph Match* challenge, quadratic / inequality / intersection labs, pattern machine, exponent-law tiles, surd simplifier, money lab, investment timeline, coordinate lab (draggable points), circle-theorem explorer, solid viewer (k² / k³), CAST explorer, trig graph lab, triangle solver, series lab, inverse lab, annuity lab, polynomial lab, derivative lab, cubic lab, optimisation lab, circle & tangent lab, proportion & similarity lab, compound-angle lab, heights & distances (3D)
- 🪜 **Worked examples revealed one step at a time**, with a "Why?" for every step
- 🃏 **Flashcards** with spaced repetition for every term and formula, plus a glossary
- ⚔️ **Quiz Arena** – mixed-topic rounds, relaxed or timed
- 📝 **Exam Room** – 37 NSC-style questions (142 parts) with marking memos, including geometry riders, theorem proofs, annuities, calculus and 3D trig
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
