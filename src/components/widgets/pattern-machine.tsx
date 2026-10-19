"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { differences, patternType, quadraticFromTerms, termOf } from "@/lib/math/patterns";
import { quadTex } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

const PRESETS: { id: string; label: string; terms: number[]; story: string }[] = [
  { id: "squares", label: "Tiles", terms: [3, 8, 15, 24], story: "A tiled floor pattern: each new picture adds a bigger border." },
  { id: "stadium", label: "Stadium", terms: [20, 24, 30, 38], story: "Seats per row at a Loftus-style stand – each row adds 2 more extra seats than the last." },
  { id: "handshakes", label: "Handshakes", terms: [0, 1, 3, 6], story: "n people at a braai all shake hands once: T(n) handshakes." },
  { id: "custom", label: "Your own", terms: [4, 11, 22, 37], story: "Type any first four terms." },
];

const fmt = (v: number) => String(Math.round(v * 1000) / 1000);

/**
 * Quadratic pattern machine: difference table, the CAPS a/b/c method step by
 * step, and the pattern plotted as points on a parabola.
 */
export function PatternMachine() {
  const [preset, setPreset] = useState("squares");
  const [terms, setTerms] = useState<number[]>(PRESETS[0].terms);
  const [k, setK] = useState(10);
  const [used, setUsed] = useState(false);
  const d1 = differences(terms);
  const d2 = differences(d1);
  const type = patternType(terms);
  const { a, b, c } = quadraticFromTerms(terms[0], terms[1], terms[2]);
  const fits = termOf(a, b, c, 4) === terms[3];
  const story = PRESETS.find((p) => p.id === preset)!.story;

  const setTerm = (i: number, v: string) => {
    const x = Number(v);
    if (!Number.isFinite(x)) return;
    setTerms((t) => t.map((y, j) => (j === i ? x : y)));
    setPreset("custom");
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };

  const yMax = Math.max(...[1, 2, 3, 4, 5, 6].map((n) => Math.abs(termOf(a, b, c, n))), 10) * 1.15;

  return (
    <WidgetFrame title="Pattern machine" colour="var(--t-algebra)" instruction="Pick a pattern or type your own first four terms. The machine finds the general term the CAPS way.">
      <Segmented colour="var(--t-algebra)" value={preset} onChange={(id) => { setPreset(id); setTerms(PRESETS.find((p) => p.id === id)!.terms); }} options={PRESETS.map((p) => ({ id: p.id, label: p.label }))} />
      <p className="mt-2 text-sm text-muted">{story}</p>

      <div className="mt-3 overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-x-1 text-center font-mono text-sm">
          <tbody>
            <tr>
              <th className="pr-2 text-left font-sans text-xs text-muted">Terms</th>
              {terms.map((t, i) => (
                <td key={i} colSpan={2}>
                  <input value={t} onChange={(e) => setTerm(i, e.target.value)} inputMode="numeric" aria-label={`Term ${i + 1}`}
                    className="w-16 rounded-lg border-2 border-line bg-bg px-1 py-1 text-center font-bold outline-none focus:border-brand" />
                </td>
              ))}
            </tr>
            <tr>
              <th className="pr-2 text-left font-sans text-xs text-muted">1st diff</th>
              <td />
              {d1.map((d, i) => <td key={i} colSpan={2} className="py-1 font-bold text-trig">{fmt(d)}</td>)}
            </tr>
            <tr>
              <th className="pr-2 text-left font-sans text-xs text-muted">2nd diff</th>
              <td colSpan={2} />
              {d2.map((d, i) => <td key={i} colSpan={2} className="py-1 font-bold text-geometry">{fmt(d)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        <div className="space-y-1 rounded-xl bg-surface-2 p-3 text-sm">
          {type === "linear" && <p className="font-semibold text-info">The first differences are constant → this is a LINEAR pattern: <Tex tex={`T_n = ${fmt(d1[0])}n ${terms[0] - d1[0] >= 0 ? "+" : "-"} ${fmt(Math.abs(terms[0] - d1[0]))}`} /></p>}
          {type === "other" && <p className="font-semibold text-danger">The second differences are not constant – this is not a quadratic pattern.</p>}
          {type === "quadratic" && (
            <>
              <p className="font-semibold text-success">Constant second difference → quadratic: <Tex tex="T_n = an^2 + bn + c" /></p>
              <Tex display tex={`2a = ${fmt(d2[0])} \\Rightarrow a = ${fmt(a)}`} />
              <Tex display tex={`3a + b = T_2 - T_1 = ${fmt(d1[0])} \\Rightarrow b = ${fmt(b)}`} />
              <Tex display tex={`a + b + c = T_1 = ${fmt(terms[0])} \\Rightarrow c = ${fmt(c)}`} />
              <div className="rounded-lg border-2 border-success/50 bg-surface p-2 text-center text-lg"><Tex tex={`T_n = ${quadTex(a, b, c, "n")}`} /></div>
              {!fits && <p className="text-xs text-danger">Careful: term 4 doesn&apos;t fit – check your numbers.</p>}
              <div className="pt-2">
                <Slider label={<>Find term <Tex tex="n" /></>} value={k} min={1} max={100} onChange={setK} colour="var(--t-algebra)" />
                <Tex display tex={`T_{${k}} = ${fmt(a)}(${k})^2 ${b >= 0 ? "+" : "-"} ${fmt(Math.abs(b))}(${k}) ${c >= 0 ? "+" : "-"} ${fmt(Math.abs(c))} = ${fmt(termOf(a, b, c, k))}`} />
              </div>
            </>
          )}
        </div>
        <div className="min-w-0">
          <Plot view={{ xMin: -0.5, xMax: 7, yMin: Math.min(-yMax * 0.15, ...[1, 2, 3, 4, 5, 6].map((n) => termOf(a, b, c, n) * 1.15)), yMax }} width={420} height={300} label="The pattern plotted as points" className="w-full">
            {type === "quadratic" && <Curve f={(x) => termOf(a, b, c, x)} colour="var(--curve-ghost)" dashed width={2} from={0.5} />}
            {[1, 2, 3, 4, 5, 6].map((n) => <Dot key={n} x={n} y={type === "quadratic" ? termOf(a, b, c, n) : terms[n - 1] ?? NaN} label={n <= 4 ? `T${n}` : undefined} r={5} />)}
          </Plot>
          <p className="mt-1 text-xs text-muted">Quadratic patterns lie on a parabola – but only whole-number n count (the dots).</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
