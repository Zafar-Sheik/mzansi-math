# Colours, type & design system

## One colour, one meaning

| Token | Light | Meaning |
|---|---|---|
| `--brand` | violet `#5b21b6` | Actions, links, "you can click this" |
| `--t-algebra` | violet `#6d28d9` | Algebra strand (Paper 1) |
| `--t-geometry` | orange `#c2410c` | Geometry strand |
| `--t-trig` | teal `#0e7490` | Trigonometry strand |
| `--danger` | red | ONLY errors and common mistakes |
| `--memory` | pink | Memory hooks, flashcards |
| `--exam` | amber | Exam tips, Exam Room |
| `--mzansi` | blue | "Mzansi moment" real-world callouts |
| `--success` | green | Correct answers, solutions on graphs |
| `--curve-1/2/3` | violet / teal / orange | Graph curves |

Every token has a dark-mode and a high-contrast value (see `src/app/globals.css`).

## Type

- **Space Grotesk** for headings, **Inter** for reading (switchable to Atkinson Hyperlegible or OpenDyslexic), **JetBrains Mono** for typed answers.
- Maths is rendered with **KaTeX**: `$…$` inline and `$$…$$` on its own line, in every lesson, quiz, flashcard and memo.

## Components

Aceternity-style aurora, spotlight, 3D cards, bento grid, moving borders and glow cards on the marketing pages; calm, flat cards inside lessons. Graphs are hand-built SVG (`src/components/math/plot.tsx`) using the theme's CSS variables, so they follow light/dark/contrast themes.
