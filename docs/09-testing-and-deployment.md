# Testing & deployment

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint, zero warnings allowed |
| `npm test` | Vitest: maths engine + content integrity |
| `npm run build` | Production build (all pages are statically generated) |
| `npm run test:e2e` | Playwright on desktop and mobile (needs a production build) |
| `npm run check` | typecheck + lint + test + build |

## What the tests guarantee

- **Maths engine:** the parser handles what learners type; the checker accepts equivalent answers and rejects wrong ones with the right feedback.
- **Every generator** produces 150 problems whose memo answers pass their own checker and whose formulas render.
- **Every formula** in every lesson, term, quiz and memo renders in KaTeX.
- **Every practice answer** passes its own checker; quizzes point at real options; puzzles, sketches and drills are well-formed; exam memos have a line per mark.
- **End-to-end:** pages load on desktop and mobile without console errors or sideways scrolling; a learner can answer a typed question and play with a graph.

## Deploying

It's a static Next.js app: deploy to Vercel, Netlify or any Node host (`npm run build && npm start`). Node 18.18+ is required. There are no environment variables and no backend.
