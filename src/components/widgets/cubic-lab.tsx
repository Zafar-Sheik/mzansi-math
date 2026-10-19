"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Slider, Toggle, WidgetFrame } from "./widget-frame";

const n2 = (v: number) => String(Math.round(v * 100) / 100);
function poly(c: number[]) {
  const names = ["x^3", "x^2", "x", ""];
  let s = "";
  c.forEach((k, i) => {
    const v = Math.round(k * 100) / 100;
    if (v === 0) return;
    const mag = Math.abs(v) === 1 && names[i] ? "" : String(Math.abs(v));
    s += s ? ` ${v < 0 ? "-" : "+"} ${mag}${names[i]}` : `${v < 0 ? "-" : ""}${mag}${names[i]}`;
  });
  return s || "0";
}

/**
 * Cubic sketcher: f(x) = a(x − p)(x − q)(x − r). Stationary points from
 * f'(x) = 0, the point of inflection from f''(x) = 0, and where f increases.
 */
export function CubicLab() {
  const [a, setA] = useState(1);
  const [p, setP] = useState(-2);
  const [q, setQ] = useState(1);
  const [r, setR] = useState(3);
  const [showD, setShowD] = useState(false);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };
  // expanded: a[x³ − (p+q+r)x² + (pq+pr+qr)x − pqr]
  const c3 = a, c2 = -a * (p + q + r), c1 = a * (p * q + p * r + q * r), c0 = -a * p * q * r;
  const f = (x: number) => c3 * x ** 3 + c2 * x * x + c1 * x + c0;
  const d = (x: number) => 3 * c3 * x * x + 2 * c2 * x + c1;
  const D = 4 * c2 * c2 - 12 * c3 * c1;
  const st = D > 0 ? [(-2 * c2 - Math.sqrt(D)) / (6 * c3), (-2 * c2 + Math.sqrt(D)) / (6 * c3)].sort((x, y) => x - y) : D === 0 ? [-c2 / (3 * c3)] : [];
  const xi = -c2 / (3 * c3);
  const ys = [f(-5), f(5), ...st.map(f), 0];
  const span = Math.min(60, Math.max(8, ...ys.map(Math.abs)) * 1.15);

  return (
    <WidgetFrame title="Cubic sketcher" colour="var(--t-algebra)" instruction="Choose the x-intercepts and a. The calculus finds the turning points and the point of inflection.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-2">
          <div className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-center"><Tex tex={`f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${p > 0 ? "-" : "+"} ${Math.abs(p)})(x ${q > 0 ? "-" : "+"} ${Math.abs(q)})(x ${r > 0 ? "-" : "+"} ${Math.abs(r)}) = ${poly([c3, c2, c1, c0])}`} /></div>
          <Plot view={{ xMin: -6, xMax: 6, yMin: -span, yMax: span }} width={480} height={340} label="Graph of the cubic" className="w-full">
            <Guide x={xi} colour="var(--memory)" />
            {showD && <Curve f={d} colour="var(--curve-2)" dashed width={2} />}
            <Curve f={f} width={3} />
            {[p, q, r].map((x, i) => <Dot key={i} x={x} y={0} r={4} colour="var(--curve-1)" />)}
            {st.map((x, i) => <Dot key={`s${i}`} x={x} y={f(x)} colour="var(--curve-3)" label={`(${n2(x)}; ${n2(f(x))})`} />)}
            <Dot x={xi} y={f(xi)} r={4} hollow colour="var(--memory)" />
          </Plot>
        </div>
        <div className="space-y-3">
          <Slider label={<Tex tex="a" />} value={a} min={-2} max={2} step={0.5} onChange={touch((v) => setA(v === 0 ? 0.5 : v))} />
          <Slider label={<>root <Tex tex="p" /></>} value={p} min={-5} max={5} onChange={touch(setP)} />
          <Slider label={<>root <Tex tex="q" /></>} value={q} min={-5} max={5} onChange={touch(setQ)} />
          <Slider label={<>root <Tex tex="r" /></>} value={r} min={-5} max={5} onChange={touch(setR)} />
          <Toggle on={showD} onChange={setShowD}>Show f′(x) (dashed)</Toggle>
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`f'(x) = ${poly([0, 3 * c3, 2 * c2, c1])} = 0`} />
        <p className="text-center">{st.length === 2 ? <>Stationary points at <Tex tex={`x = ${n2(st[0])}`} /> and <Tex tex={`x = ${n2(st[1])}`} />. {a > 0 ? "Local max first, then local min." : "Local min first, then local max."}</> : st.length === 1 ? "One stationary point – a horizontal point of inflection." : "No stationary points: f is always increasing or always decreasing."}</p>
        <p className="text-center"><Tex tex={`f''(x) = ${poly([0, 0, 6 * c3, 2 * c2])} = 0 \\Rightarrow x = ${n2(xi)}`} /> – the point of inflection (pink), where the concavity changes.</p>
        {st.length === 2 && <p className="text-center text-muted">f is increasing where f′(x) &gt; 0: {a > 0 ? <>x &lt; {n2(st[0])} or x &gt; {n2(st[1])}</> : <>{n2(st[0])} &lt; x &lt; {n2(st[1])}</>}.</p>}
      </div>
    </WidgetFrame>
  );
}
