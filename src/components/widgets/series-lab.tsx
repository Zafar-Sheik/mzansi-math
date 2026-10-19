"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Dot, Guide, Plot, Segment } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Kind = "arithmetic" | "geometric";
const f2 = (v: number) => (Math.abs(v) >= 1e6 ? v.toExponential(2) : String(Math.round(v * 100) / 100));

/**
 * Sequences as bars, series as a running total: arithmetic grows steadily,
 * geometric explodes – or, when −1 < r < 1, settles down to the sum to infinity.
 */
export function SeriesLab({ kind: initial = "arithmetic" }: { kind?: Kind }) {
  const [kind, setKind] = useState<Kind>(initial);
  const [a, setA] = useState(initial === "geometric" ? 8 : 3);
  const [d, setD] = useState(2);
  const [r, setR] = useState(0.5);
  const [n, setN] = useState(10);
  const [sums, setSums] = useState(true);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };

  const T = (k: number) => (kind === "arithmetic" ? a + (k - 1) * d : a * r ** (k - 1));
  const terms = Array.from({ length: n }, (_, k) => T(k + 1));
  const partial = terms.reduce<number[]>((acc, t) => [...acc, (acc.at(-1) ?? 0) + t], []);
  const Sn = partial.at(-1) ?? 0;
  const converges = kind === "geometric" && Math.abs(r) < 1;
  const Sinf = converges ? a / (1 - r) : NaN;
  const all = [...terms, ...(sums ? partial : []), 0, ...(converges ? [Sinf] : [])];
  const lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo || 1) * 0.12;

  return (
    <WidgetFrame title="Sequence & series lab" colour="var(--t-algebra)" instruction="Bars are the terms Tₙ; the dots are the running total Sₙ. Change a, d (or r) and n.">
      <Segmented colour="var(--t-algebra)" value={kind} onChange={(k) => { setKind(k); setA(k === "geometric" ? 8 : 3); }} options={[{ id: "arithmetic", label: "Arithmetic (add d)" }, { id: "geometric", label: "Geometric (multiply by r)" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Plot view={{ xMin: 0, xMax: n + 0.8, yMin: lo - pad, yMax: hi + pad }} width={520} height={320} label="Terms and partial sums" className="w-full" xLabel="n" yLabel="">
            {terms.map((t, k) => <Segment key={k} x1={k + 1} y1={0} x2={k + 1} y2={t} colour="var(--curve-1)" width={Math.max(3, Math.min(24, 160 / n))} cap="butt" />)}
            {sums && partial.map((s, k) => <Dot key={k} x={k + 1} y={s} r={3.5} colour="var(--curve-3)" />)}
            {converges && sums && <Guide y={Sinf} colour="var(--success)" label={`S∞ = ${f2(Sinf)}`} />}
          </Plot>
        </div>
        <div className="space-y-3">
          <Slider label={<>first term <Tex tex="a" /></>} value={a} min={-10} max={20} onChange={touch(setA)} colour="var(--curve-1)" />
          {kind === "arithmetic"
            ? <Slider label={<>common difference <Tex tex="d" /></>} value={d} min={-5} max={5} onChange={touch(setD)} colour="var(--curve-2)" />
            : <Slider label={<>common ratio <Tex tex="r" /></>} value={r} min={-2} max={2} step={0.25} onChange={touch((v) => setR(v === 0 ? 0.25 : v))} colour="var(--curve-2)" />}
          <Slider label={<>number of terms <Tex tex="n" /></>} value={n} min={1} max={30} onChange={touch(setN)} colour="var(--memory)" />
          <Toggle on={sums} onChange={setSums}>Show running total Sₙ</Toggle>
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <div className="font-mono text-xs text-muted">{terms.slice(0, 8).map(f2).join("; ")}{n > 8 ? "; …" : ""}</div>
        {kind === "arithmetic" ? (
          <>
            <Tex display tex={`T_n = a + (n - 1)d \\Rightarrow T_{${n}} = ${a} + (${n} - 1)(${d}) = ${f2(T(n))}`} />
            <Tex display tex={`S_n = \\frac{n}{2}\\left[2a + (n - 1)d\\right] \\Rightarrow S_{${n}} = \\frac{${n}}{2}\\left[2(${a}) + (${n - 1})(${d})\\right] = ${f2(Sn)}`} />
          </>
        ) : (
          <>
            <Tex display tex={`T_n = ar^{n-1} \\Rightarrow T_{${n}} = ${a}(${r})^{${n - 1}} = ${f2(T(n))}`} />
            <Tex display tex={r === 1 ? `S_{${n}} = ${n} \\times ${a}` : `S_n = \\frac{a(r^n - 1)}{r - 1} \\Rightarrow S_{${n}} = ${f2(Sn)}`} />
            <p className="text-center font-semibold" style={{ color: converges ? "var(--success)" : "var(--danger)" }}>
              {converges ? <>−1 &lt; r &lt; 1: the series converges. <Tex tex={`S_\\infty = \\frac{a}{1 - r} = \\frac{${a}}{1 - (${r})} = ${f2(Sinf)}`} /></> : "|r| ≥ 1: the series diverges – no sum to infinity."}
            </p>
          </>
        )}
      </div>
    </WidgetFrame>
  );
}
