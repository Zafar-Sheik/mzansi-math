"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Tex } from "@/components/learn/tex";
import { Dot, Plot, Segment, useGraphScale } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Toggle, WidgetFrame } from "./widget-frame";

type View = "histogram" | "polygon" | "ogive";
const nt = (v: number) => (Math.round(v * 100) / 100).toString().replace(".", "{,}");

function Bars({ fs, START, W }: { fs: number[]; START: number; W: number }) {
  const { sx, sy } = useGraphScale();
  return (
    <g>
      {fs.map((f, i) => (
        <rect key={i} x={sx(START + i * W)} y={sy(f)} width={sx(START + (i + 1) * W) - sx(START + i * W)} height={Math.max(0, sy(0) - sy(f))} fill="var(--t-stats)" fillOpacity={0.25} stroke="var(--t-stats)" strokeWidth={1.5} />
      ))}
    </g>
  );
}

/** Where the ogive reaches a cumulative frequency c (linear between plotted points). */
function readOgive(pts: [number, number][], c: number) {
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    if (c <= y1 && y1 > y0) return x0 + ((c - y0) / (y1 - y0)) * (x1 - x0);
  }
  return pts[pts.length - 1][0];
}

/**
 * Grouped data three ways: change the class frequencies and switch between
 * the histogram, frequency polygon and ogive. On the ogive, read off the
 * median and quartiles at n/2, n/4 and 3n/4.
 */
export function OgiveLab({ view: initial = "histogram", start = 20, width = 10, freqs = [3, 7, 12, 9, 5, 2], label = "mark" }: { view?: View; start?: number; width?: number; freqs?: number[]; label?: string }) {
  const START = start, W = width;
  const [view, setView] = useState<View>(initial);
  const [fs, setFs] = useState(freqs);
  const [read, setRead] = useState(true);
  const [used, setUsed] = useState(false);
  const bump = (i: number, d: number) => {
    setFs((s) => s.map((f, k) => (k === i ? Math.max(0, Math.min(20, f + d)) : f)));
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };
  const n = fs.reduce((a, b) => a + b, 0);
  const mids = fs.map((_, i) => START + i * W + W / 2);
  const est = n ? fs.reduce((a, f, i) => a + f * mids[i], 0) / n : 0;
  const cum: [number, number][] = [[START, 0], ...fs.map((_, i) => [START + (i + 1) * W, fs.slice(0, i + 1).reduce((a, b) => a + b, 0)] as [number, number])];
  const modal = fs.indexOf(Math.max(...fs));
  const yMax = view === "ogive" ? Math.max(5, n) * 1.1 : Math.max(5, ...fs) * 1.25;
  const qs = [{ c: n / 4, label: "Q₁" }, { c: n / 2, label: "median" }, { c: (3 * n) / 4, label: "Q₃" }].map((q) => ({ ...q, x: readOgive(cum, q.c) }));

  return (
    <WidgetFrame title="Histogram, polygon & ogive" colour="var(--t-stats)" instruction="Change the frequencies with + and −, then switch views. The ogive plots running totals at the UPPER limit of each class.">
      <Segmented colour="var(--t-stats)" value={view} onChange={setView} options={[{ id: "histogram", label: "Histogram" }, { id: "polygon", label: "Frequency polygon" }, { id: "ogive", label: "Ogive (cumulative)" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <Plot view={{ xMin: START - W - 2, xMax: START + (fs.length + 1) * W + 2, yMin: -yMax * 0.06, yMax }} width={520} height={300} xStep={W} label={`${view} of the data`} className="w-full" xLabel={label} yLabel={view === "ogive" ? "cum. f" : "f"}>
            {view !== "ogive" && <Bars fs={fs} START={START} W={W} />}
            {view === "polygon" && [[START - W / 2, 0] as [number, number], ...mids.map((x, i) => [x, fs[i]] as [number, number]), [START + fs.length * W + W / 2, 0] as [number, number]].map((p, i, a) => (i ? <Segment key={i} x1={a[i - 1][0]} y1={a[i - 1][1]} x2={p[0]} y2={p[1]} colour="var(--curve-1)" width={2.5} /> : null))}
            {view === "polygon" && mids.map((x, i) => <Dot key={i} x={x} y={fs[i]} r={4} />)}
            {view === "ogive" && cum.map((p, i) => (i ? <Segment key={i} x1={cum[i - 1][0]} y1={cum[i - 1][1]} x2={p[0]} y2={p[1]} colour="var(--curve-1)" width={2.5} /> : null))}
            {view === "ogive" && cum.map((p, i) => <Dot key={i} x={p[0]} y={p[1]} r={4} />)}
            {view === "ogive" && read && n > 0 && qs.map((q) => (
              <g key={q.label}>
                <Segment x1={START - W} y1={q.c} x2={q.x} y2={q.c} colour="var(--memory)" dashed width={1.5} />
                <Segment x1={q.x} y1={q.c} x2={q.x} y2={0} colour="var(--memory)" dashed width={1.5} />
              </g>
            ))}
          </Plot>
        </div>
        <div className="space-y-1.5">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2 text-sm font-bold text-muted"><span className="capitalize">{label}</span><span>f</span><span className="text-right">cum. f</span></div>
          {fs.map((f, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2 text-sm">
              <span className="font-mono text-xs">{START + i * W} ≤ x &lt; {START + (i + 1) * W}</span>
              <span className="flex items-center gap-1">
                <button aria-label={`Fewer in class ${i + 1}`} className="rounded border border-line p-0.5" onClick={() => bump(i, -1)}><Minus className="h-3 w-3" /></button>
                <span className="w-5 text-center font-mono font-bold">{f}</span>
                <button aria-label={`More in class ${i + 1}`} className="rounded border border-line p-0.5" onClick={() => bump(i, 1)}><Plus className="h-3 w-3" /></button>
              </span>
              <span className="w-10 text-right font-mono text-muted">{cum[i + 1][1]}</span>
            </div>
          ))}
          {view === "ogive" && <Toggle on={read} onChange={setRead}>Read off Q₁, median, Q₃</Toggle>}
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        {view === "ogive" ? (
          <Tex display tex={`n = ${n}: \\quad Q_1 \\approx ${nt(qs[0].x)} \\ (\\text{at } ${nt(n / 4)}), \\quad \\text{median} \\approx ${nt(qs[1].x)} \\ (\\text{at } ${nt(n / 2)}), \\quad Q_3 \\approx ${nt(qs[2].x)}`} />
        ) : (
          <Tex display tex={`\\bar{x} \\approx \\frac{\\sum f \\cdot \\text{midpoint}}{\\sum f} = \\frac{${fs.reduce((a, f, i) => a + f * mids[i], 0)}}{${n}} = ${nt(est)}`} />
        )}
        <p className="text-center text-muted">{view === "ogive" ? "Grouped data only gives estimates – that's why the memo accepts a small range of readings." : `Modal class: ${START + modal * W} ≤ x < ${START + (modal + 1) * W}. ${view === "polygon" ? "The polygon joins the midpoints of the bar tops and is closed off on the x-axis at both ends." : "The bars touch because the data is continuous."}`}</p>
      </div>
    </WidgetFrame>
  );
}
