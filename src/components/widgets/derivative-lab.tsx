"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

const FUNCS = [
  { id: "sq", tex: "x^2", f: (x: number) => x * x, d: (x: number) => 2 * x, dTex: "2x" },
  { id: "cubic", tex: "x^3 - 3x", f: (x: number) => x ** 3 - 3 * x, d: (x: number) => 3 * x * x - 3, dTex: "3x^2 - 3" },
  { id: "neg", tex: "-x^2 + 4x", f: (x: number) => -x * x + 4 * x, d: (x: number) => -2 * x + 4, dTex: "-2x + 4" },
  { id: "third", tex: "\\tfrac{1}{3}x^3 - x^2", f: (x: number) => x ** 3 / 3 - x * x, d: (x: number) => x * x - 2 * x, dTex: "x^2 - 2x" },
] as const;
const n3 = (v: number) => String(Math.round(v * 1000) / 1000);

/**
 * The derivative, visualised: the secant through P and Q becomes the tangent
 * as h → 0, and its gradient becomes f'(x).
 */
export function DerivativeLab() {
  const [fid, setFid] = useState<(typeof FUNCS)[number]["id"]>("sq");
  const [x0, setX0] = useState(1);
  const [h, setH] = useState(2);
  const [showD, setShowD] = useState(true);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };
  const F = FUNCS.find((x) => x.id === fid)!;
  const y0 = F.f(x0), y1 = F.f(x0 + h);
  const secant = (y1 - y0) / h;
  const m = F.d(x0);

  return (
    <WidgetFrame title="From secant to tangent" colour="var(--t-algebra)" instruction="Slide h towards 0. The secant PQ turns into the tangent at P – its gradient becomes the derivative f'(x).">
      <Segmented colour="var(--t-algebra)" value={fid} onChange={setFid} options={FUNCS.map((x) => ({ id: x.id, label: <Tex tex={`f(x) = ${x.tex}`} /> }))} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-2">
          <Plot view={{ xMin: -4, xMax: 5, yMin: -5, yMax: 8 }} width={480} height={320} label="Function with a secant and a tangent" className="w-full">
            <Curve f={F.f} width={3} />
            <Curve f={(x) => m * (x - x0) + y0} colour="var(--success)" width={2} />
            <Curve f={(x) => secant * (x - x0) + y0} colour="var(--curve-3)" width={2} dashed />
            <Dot x={x0} y={y0} label="P" />
            <Dot x={x0 + h} y={y1} colour="var(--curve-3)" label="Q" />
          </Plot>
          {showD && (
            <Plot view={{ xMin: -4, xMax: 5, yMin: -6, yMax: 8 }} width={480} height={200} label="Graph of the derivative" className="w-full" yLabel="f'">
              <Curve f={F.d} colour="var(--curve-2)" width={3} />
              <Dot x={x0} y={m} colour="var(--success)" label={`f'(${n3(x0)}) = ${n3(m)}`} />
            </Plot>
          )}
        </div>
        <div className="space-y-3">
          <Slider label={<>point P at <Tex tex="x" /></>} value={x0} min={-3} max={4} step={0.25} onChange={touch(setX0)} />
          <Slider label={<><Tex tex="h" /> (gap to Q)</>} value={h} min={0.01} max={3} step={0.01} onChange={touch(setH)} colour="var(--curve-3)" />
          <Toggle on={showD} onChange={setShowD}>Show graph of f′(x)</Toggle>
          <div className="space-y-1 rounded-xl bg-surface-2 p-3 text-sm">
            <div><span className="text-muted">Secant gradient </span><Tex tex={`\\frac{f(${n3(x0)} + h) - f(${n3(x0)})}{h} = ${n3(secant)}`} /></div>
            <div><span className="text-muted">Tangent gradient </span><Tex tex={`f'(${n3(x0)}) = ${n3(m)}`} /></div>
            <div className="text-xs text-muted">Difference: {n3(Math.abs(secant - m))} – it shrinks to 0 as h → 0.</div>
          </div>
          <div className="rounded-xl border-2 border-success/40 p-3 text-sm"><Tex tex={`f'(x) = \\lim_{h \\to 0}\\frac{f(x + h) - f(x)}{h} = ${F.dTex}`} /></div>
        </div>
      </div>
    </WidgetFrame>
  );
}
