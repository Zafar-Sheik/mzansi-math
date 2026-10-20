"use client";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Tex } from "@/components/learn/tex";
import { Dot, Plot, Segment, useGraphScale } from "@/components/math/plot";
import { fiveNumber, mean, outliers, sd, sum } from "@/lib/math/stats";
import { bumpStat } from "@/lib/progress";
import { Segmented, Toggle, WidgetFrame } from "./widget-frame";

type Mode = "box" | "spread";
const START = [12, 18, 21, 25, 27, 30, 33, 36, 41, 62];
const n2 = (v: number) => (Math.round(v * 100) / 100).toString().replace(".", ",");
/** Same, for LaTeX (a bare comma would add a space). */
const nt = (v: number) => (Math.round(v * 100) / 100).toString().replace(".", "{,}");

function BoxPlot({ f, y, xs }: { f: ReturnType<typeof fiveNumber> & { lo: number; hi: number }; y: number; xs: number[] }) {
  const { sx, sy } = useGraphScale();
  const h = Math.abs(sy(y + 0.5) - sy(y - 0.5));
  // Whiskers reach the most extreme values that are NOT outliers.
  const inside = xs.filter((x) => x >= f.lo && x <= f.hi);
  const wl = Math.min(...inside), wh = Math.max(...inside);
  return (
    <g stroke="var(--t-stats)" strokeWidth={2.5} fill="none">
      <line x1={sx(wl)} x2={sx(f.q1)} y1={sy(y)} y2={sy(y)} />
      <line x1={sx(f.q3)} x2={sx(wh)} y1={sy(y)} y2={sy(y)} />
      <line x1={sx(wl)} x2={sx(wl)} y1={sy(y) - h / 3} y2={sy(y) + h / 3} />
      <line x1={sx(wh)} x2={sx(wh)} y1={sy(y) - h / 3} y2={sy(y) + h / 3} />
      <rect x={sx(f.q1)} y={sy(y) - h / 2} width={Math.max(1, sx(f.q3) - sx(f.q1))} height={h} fill="var(--t-stats)" fillOpacity={0.15} />
      <line x1={sx(f.q2)} x2={sx(f.q2)} y1={sy(y) - h / 2} y2={sy(y) + h / 2} strokeWidth={3.5} />
    </g>
  );
}

/**
 * Drag the data points along the number line: the five-number summary, box
 * plot, mean vs median (skewness) and outliers update live. "Spread" shows
 * every deviation from the mean and builds the standard deviation.
 */
export function DataLab({ mode: initial = "box" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [xs, setXs] = useState<number[]>(START);
  const [showMean, setShowMean] = useState(true);
  const drag = useRef<number | null>(null);
  const used = useRef(false);
  const touch = () => {
    if (!used.current) { used.current = true; bumpStat("toolsUsed"); }
  };

  const onDrag = (p: { x: number; y: number }, phase: "down" | "move" | "up") => {
    if (phase === "down") {
      const near = xs.map((x, i) => ({ i, d: Math.abs(x - p.x) + (p.y > 2.6 ? 0 : 99) })).sort((a, b) => a.d - b.d)[0];
      drag.current = near && near.d < 4 ? near.i : null;
      if (drag.current !== null) touch();
    }
    if (phase === "up") { drag.current = null; return; }
    if (drag.current !== null) {
      const i = drag.current;
      const v = Math.max(0, Math.min(100, Math.round(p.x)));
      setXs((s) => (s[i] === v ? s : s.map((x, k) => (k === i ? v : x))));
    }
  };

  const f = fiveNumber(xs);
  const o = outliers(xs);
  const m = mean(xs), s = sd(xs);
  const lowerGap = f.q2 - f.q1, upperGap = f.q3 - f.q2;
  const skew = Math.abs(m - f.q2) < 1 && Math.abs(upperGap - lowerGap) < 2 ? "roughly symmetric" : m > f.q2 ? "skewed to the right (positively skewed)" : "skewed to the left (negatively skewed)";
  // Stack equal values so every dot stays visible.
  const seen = new Map<number, number>();
  const dots = xs.map((x, i) => {
    const k = seen.get(x) ?? 0;
    seen.set(x, k + 1);
    return { x, i, y: 3 + k * 0.45 };
  });
  const devs = xs.map((x) => (x - m) ** 2);

  return (
    <WidgetFrame title="Data lab" colour="var(--t-stats)" instruction="Drag the dots along the line (or add and remove values). Watch the box plot, the mean and the spread respond.">
      <Segmented colour="var(--t-stats)" value={mode} onChange={setMode} options={[{ id: "box", label: "Box plot & skewness" }, { id: "spread", label: "Spread & standard deviation" }]} />
      <div className="mt-3">
        <Plot view={{ xMin: -2, xMax: 102, yMin: mode === "box" ? -0.2 : -0.8, yMax: 4.8 + Math.max(0, ...[...seen.values()].map((c) => (c - 1) * 0.45)) }} width={620} height={250} yStep={100} xStep={10} xLabel="" yLabel="" label="Data on a number line" className="w-full" onDrag={onDrag}>
          {mode === "box" && <BoxPlot f={{ ...f, lo: o.lo, hi: o.hi }} y={1.2} xs={xs} />}
          {mode === "spread" && dots.map((d) => <Segment key={d.i} x1={m} y1={d.y} x2={d.x} y2={d.y} colour={d.x >= m ? "var(--success)" : "var(--danger)"} width={2} />)}
          {(showMean || mode === "spread") && <Segment x1={m} y1={-0.6} x2={m} y2={4.6} colour="var(--memory)" dashed width={2} />}
          {dots.map((d) => <Dot key={d.i} x={d.x} y={d.y} r={7} colour={o.values.includes(d.x) ? "var(--danger)" : "var(--t-stats)"} />)}
        </Plot>
        <p className="text-center text-xs text-muted"><span style={{ color: "var(--memory)" }}>- - mean</span>{mode === "box" ? " · thick line in the box = median · red dots = outliers" : " · green/red bars = deviations above/below the mean"}</p>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-sm" onClick={() => { touch(); setXs((s) => (s.length < 20 ? [...s, Math.round(f.q2)] : s)); }}><Plus className="h-4 w-4" /> Add a value</button>
        <button className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-sm" onClick={() => { touch(); setXs((s) => (s.length > 5 ? s.slice(0, -1) : s)); }}><Minus className="h-4 w-4" /> Remove</button>
        <button className="rounded-lg border border-line px-2.5 py-1 text-sm" onClick={() => setXs(START)}>Reset</button>
        {mode === "box" && <Toggle on={showMean} onChange={setShowMean}>Show the mean</Toggle>}
        <span className="ml-auto text-xs text-muted">n = {xs.length}</span>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <div className="font-mono text-xs text-muted">Sorted: {[...xs].sort((a, b) => a - b).join("; ")}</div>
        {mode === "box" ? (
          <>
            <Tex display tex={`\\text{min} = ${f.min};\\ Q_1 = ${nt(f.q1)};\\ \\text{median} = ${nt(f.q2)};\\ Q_3 = ${nt(f.q3)};\\ \\text{max} = ${f.max}`} />
            <Tex display tex={`\\text{IQR} = ${nt(f.q3 - f.q1)} \\qquad \\bar{x} = ${nt(m)}`} />
            <p className="text-center">The data is <strong>{skew}</strong>{skew.startsWith("roughly") ? "" : ` – the mean is pulled ${m > f.q2 ? "above" : "below"} the median by the ${m > f.q2 ? "high" : "low"} values.`}</p>
            <p className="text-center text-muted">Outliers lie below <Tex tex={`Q_1 - 1{,}5 \\times \\text{IQR} = ${nt(o.lo)}`} /> or above <Tex tex={`Q_3 + 1{,}5 \\times \\text{IQR} = ${nt(o.hi)}`} />{o.values.length ? `: ${o.values.join(", ")}` : " – none here."}</p>
          </>
        ) : (
          <>
            <Tex display tex={`\\bar{x} = \\frac{${sum(xs)}}{${xs.length}} = ${nt(m)} \\qquad \\sum (x - \\bar{x})^2 = ${nt(sum(devs))}`} />
            <Tex display tex={`\\sigma^2 = \\frac{${nt(sum(devs))}}{${xs.length}} = ${nt(sum(devs) / xs.length)} \\qquad \\sigma = ${nt(s)}`} />
            <p className="text-center text-muted">About two-thirds of normally distributed data lies within one standard deviation of the mean: between {n2(m - s)} and {n2(m + s)} here ({xs.filter((x) => Math.abs(x - m) <= s).length} of {xs.length} values).</p>
          </>
        )}
      </div>
    </WidgetFrame>
  );
}
