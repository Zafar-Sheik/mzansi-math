# Writing lessons & exam questions

Lessons are TypeScript data in `src/content/lessons/<grade>-<topic>.ts`. The type system and the test-suite catch most mistakes.

## Maths in content

Use `String.raw` (aliased `m`) so LaTeX backslashes stay readable:

```ts
const m = String.raw;
{ type: "text", md: m`The roots are $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.` }
```

`$…$` is inline, `$$…$$` is a display equation. Use real line breaks (not `\n`) inside `m` strings – a test fails if a stray `\n` sneaks in. Use `{,}` for decimal commas in LaTeX: `$0{,}075$`.

## Blocks

| Block | Use it for |
|---|---|
| `text`, `callout`, `keypoints`, `table` | Teaching. Callout variants: key, tip, mistake, memory, exam, break, real-world ("Mzansi moment") |
| `worked` | A worked example: `problem` plus `steps` (each with an optional `why`) |
| `practice` | Typed-answer problems: `q`, `answer`, optional `kind`, `tol`, `vars`, `form`, `hint`, and a full `solution` |
| `quiz` | Multiple choice with an explanation |
| `sequence`, `match` | Put-in-order and matching puzzles (maths allowed in items) |
| `widget` | Any interactive tool, e.g. `{ widget: "function-grapher", props: { family: "parabola", challenge: true } }` or a `drill` with `generators` |
| `exam` | An exam-style question with a memo line per mark |
| `terms` | Shows the lesson's key terms as flashcards |

## Writing answers the checker can read

| Kind | Memo answer | Learner may type |
|---|---|---|
| `number` (default) | `6sqrt(2)`, `3/4`, `15218.90` | `6√2`, `0,75`, `R15 218,90` |
| `set` | `2; -3` | `x = -3 or x = 2`, `-1 ± √3` |
| `point` | `(2; -3)` | `(2;-3)`, `(2, -3)` |
| `expr` (+ `vars`) | `2n^2 + n - 1` | `n(2n + 1) - 1` |

Set `tol: 0.011` for answers rounded to the cent, `tol: 0.006` for percentages to two decimals. Set `form: "simplified-surd"` or `"rationalised"` when the form matters.

## Exam questions

`src/content/exam.ts`. One memo line = one mark (write method marks as separate lines). Use `figure: { widget: "sketch", props: { curves: [{ expr: "-x^2 + 2x + 3", label: "f" }] } }` for a graph.

## Adding a new topic (later phases)

1. Create `src/content/lessons/g11-trig.ts` exporting a `Lesson[]` with `topic: "g11-trig"`.
2. Import it in `src/content/index.ts` and add it to `LESSONS`.
3. Add question generators and widgets as needed; register widgets in `src/components/widgets/index.tsx` and the Toolkit catalogue.
4. Run `npm run check`.
