"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { addXp, bumpStat } from "@/lib/progress";
import { Slider, WidgetFrame } from "./widget-frame";

const n2 = (v: number) => String(Math.round(v * 100) / 100);

/**
 * The classic open box: cut squares of side x from the corners of an L × W
 * sheet and fold up the sides. Find the x that gives the biggest volume –
 * first by dragging, then with calculus.
 */
export function OptimisationLab() {
  const [L, setL] = useState(30);
  const [W, setW] = useState(20);
  const [x, setX] = useState(2);
  const [found, setFound] = useState(false);
  const [used, setUsed] = useState(false);
  const V = (t: number) => t * (L - 2 * t) * (W - 2 * t);
  const xmax = Math.min(L, W) / 2;
  // V'(x) = 12x² − 4(L + W)x + LW = 0
  const best = (4 * (L + W) - Math.sqrt(16 * (L + W) ** 2 - 48 * L * W)) / 24;
  const Vbest = V(best);
  const close = Math.abs(V(x) - Vbest) / Vbest < 0.005;
  const onX = (v: number) => {
    setX(v);
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
    if (!found && Math.abs(V(v) - Vbest) / Vbest < 0.005) { setFound(true); addXp(10, "Optimised the box"); }
  };
  const s = 200 / Math.max(L, W);

  return (
    <WidgetFrame title="Optimisation: the open box" colour="var(--t-algebra)" instruction="Cut squares of side x from each corner and fold up the sides. Which x gives the biggest box?">
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="space-y-3">
          <svg viewBox="0 0 240 180" className="diagram w-full" role="img" aria-label="Sheet with corners cut out">
            <g transform={`translate(${120 - (L * s) / 2},${90 - (W * s) / 2})`}>
              <rect width={L * s} height={W * s} fill="var(--t-geometry)" fillOpacity={0.12} stroke="var(--text)" strokeWidth={1.5} />
              {[[0, 0], [L - x, 0], [0, W - x], [L - x, W - x]].map(([cx, cy], i) => <rect key={i} x={cx * s} y={cy * s} width={x * s} height={x * s} fill="var(--surface)" stroke="var(--danger)" strokeDasharray="3 2" />)}
              <rect x={x * s} y={x * s} width={(L - 2 * x) * s} height={(W - 2 * x) * s} fill="none" stroke="var(--text)" strokeDasharray="4 3" />
              <text x={(L * s) / 2} y={-5} textAnchor="middle" fontSize="11" fill="var(--text)">{L} cm</text>
              <text x={-5} y={(W * s) / 2} textAnchor="end" fontSize="11" fill="var(--text)">{W}</text>
            </g>
          </svg>
          <Slider label="Sheet length L" value={L} min={10} max={40} onChange={(v) => { setL(v); setFound(false); }} format={(v) => `${v} cm`} />
          <Slider label="Sheet width W" value={W} min={10} max={40} onChange={(v) => { setW(v); setFound(false); }} format={(v) => `${v} cm`} />
          <Slider label={<>cut <Tex tex="x" /></>} value={Math.min(x, xmax - 0.1)} min={0.1} max={Math.max(0.2, xmax - 0.1)} step={0.1} onChange={onX} colour="var(--memory)" format={(v) => `${v.toFixed(1)} cm`} />
        </div>
        <div className="min-w-0 space-y-2">
          <Plot view={{ xMin: -xmax * 0.12, xMax: xmax + 0.3, yMin: -Vbest * 0.08, yMax: Vbest * 1.2 }} width={480} height={260} label="Volume against x" className="w-full" yLabel="V">
            <Curve f={(t) => (t < 0 || t > xmax ? NaN : V(t))} width={3} />
            <Dot x={x} y={V(x)} colour="var(--memory)" label={`V = ${n2(V(x))}`} />
            {found && <Dot x={best} y={Vbest} colour="var(--success)" r={4} />}
          </Plot>
          <div className={`rounded-xl p-3 text-sm ${close ? "bg-success/10" : "bg-surface-2"}`}>
            <Tex tex={`V(x) = x(${L} - 2x)(${W} - 2x) = 4x^3 - ${2 * (L + W)}x^2 + ${L * W}x`} />
            <div className="mt-1">At x = {x.toFixed(1)} cm: <strong>V = {n2(V(x))} cm³</strong>{close && " 🎯 That's the maximum!"}</div>
          </div>
        </div>
      </div>
      <details className="mt-3 rounded-xl border border-line bg-surface p-3 text-sm" open={found}>
        <summary className="cursor-pointer font-semibold">Show the calculus</summary>
        <div className="mt-2 space-y-1 overflow-x-auto">
          <Tex display tex={`V'(x) = 12x^2 - ${4 * (L + W)}x + ${L * W} = 0`} />
          <Tex display tex={`x = \\frac{${4 * (L + W)} \\pm \\sqrt{${(4 * (L + W)) ** 2} - 48(${L * W})}}{24} \\Rightarrow x = ${n2(best)} \\text{ cm}`} />
          <p className="text-center text-muted">(The other root is too big – you can&apos;t cut more than half the width.) Maximum volume <strong className="text-fg">{n2(Vbest)} cm³</strong>.</p>
        </div>
      </details>
    </WidgetFrame>
  );
}
