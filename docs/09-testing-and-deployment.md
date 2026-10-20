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
- **Exam season:** full mocks contain every question of their grade and paper; quick mocks are reproducible from their seed; NSC levels follow the rating codes; mastery and recommendations respond to quizzes, exams, mocks and drills; worksheets are reproducible from their link.
- **End-to-end:** pages load on desktop and mobile without console errors or sideways scrolling; a learner can answer a typed question, play with a graph, write and self-mark a mock paper, and a teacher can generate a worksheet.

## Deploying

It's a static Next.js app: deploy to Vercel, Netlify or any Node host (`npm run build && npm start`). Node 18.18+ is required. There are no environment variables and no backend.

Before deploying, run `npm run check` (typecheck, lint, unit tests and the production build) and `npm run test:e2e`. Every page is prerendered at build time, including the four mock papers (`/exam/mock/g11-p1` … `/exam/mock/g12-p2`); the only server route is `/api/curriculum`, which is also static.

**Vercel:** import the repository – the defaults (framework *Next.js*, `npm run build`) work as they are.
**Any Node host:** `npm ci && npm run build && npm start` (serves on port 3000; set `PORT` to change it).
