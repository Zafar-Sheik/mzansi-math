"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { AreaBetween, Curve, Dot, Plot } from "@/components/math/plot";
import { lead, quadTex, signed } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Slider, Toggle, WidgetFrame } from "./widget-frame";

const f2 = (v: number) => String(Math.round(v * 100) / 100);

/**
 * Line meets parabola: solving simultaneous equations IS finding where two
 * graphs cross. The discriminant of f(x) − g(x) = 0 says how many times.
 */
export function IntersectionLab() {
  const [a, setA] = useState(1);
  const [q, setQ] = useState(-4);
  const [m, setM] = useState(1);
  const [c, setC] = useState(2);
  const [shade, setShade] = useState(false);
  const [used, setUsed] = useState(false);
  const f = (x: number) => a * x * x + q;
  const g = (x: number) => m * x + c;
  // a x² − m x + (q − c) = 0
  const A = a, B = -m, C = q - c;
  const D = B * B - 4 * A * C;
  const xs = D > 0 ? [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)] : D === 0 ? [-B / (2 * A)] : [];
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };
  const verdict = D > 0 ? "The line CUTS the parabola at two points." : D === 0 ? "The line TOUCHES the parabola – it's a tangent!" : "The line MISSES the parabola – no real solutions.";
  const [lo, hi] = xs.length === 2 ? [Math.min(...xs), Math.max(...xs)] : [0, 0];

  return (
    <WidgetFrame title="Where do they meet?" colour="var(--t-algebra)" instruction="Move the line and the parabola. Every crossing point is a solution of the simultaneous equations.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap justify-center gap-x-6 rounded-xl border border-line bg-surface-2 px-3 py-2 text-lg">
            <span style={{ color: "var(--curve-1)" }}><Tex tex={`f(x) = ${quadTex(a, 0, q)}`} /></span>
            <span style={{ color: "var(--curve-3)" }}><Tex tex={`g(x) = ${m === 0 ? c : `${lead(m, "x")}${signed(c)}`}`} /></span>
          </div>
          <Plot view={{ xMin: -8, xMax: 8, yMin: -10, yMax: 12 }} label="A parabola and a straight line" className="w-full">
            {shade && xs.length === 2 && (a > 0
              ? <><AreaBetween f={f} g={g} from={-8} to={lo} colour="var(--success)" opacity={0.18} /><AreaBetween f={f} g={g} from={hi} to={8} colour="var(--success)" opacity={0.18} /></>
              : <AreaBetween f={f} g={g} from={lo} to={hi} colour="var(--success)" opacity={0.2} />)}
            <Curve f={f} width={3} />
            <Curve f={g} colour="var(--curve-3)" width={3} />
            {xs.map((x, i) => <Dot key={i} x={x} y={g(x)} colour="var(--memory)" label={`(${f2(x)}; ${f2(g(x))})`} dy={i === 0 ? -10 : 20} />)}
          </Plot>
        </div>
        <div className="space-y-3">
          <div className="text-xs font-bold text-muted uppercase">Parabola</div>
          <Slider label={<Tex tex="a" />} value={a} min={-3} max={3} step={0.5} onChange={touch((v) => setA(v === 0 ? (a > 0 ? -0.5 : 0.5) : v))} colour="var(--curve-1)" />
          <Slider label={<Tex tex="q" />} value={q} min={-8} max={8} onChange={touch(setQ)} colour="var(--curve-1)" />
          <div className="text-xs font-bold text-muted uppercase">Line</div>
          <Slider label={<>gradient <Tex tex="m" /></>} value={m} min={-5} max={5} step={0.5} onChange={touch(setM)} colour="var(--curve-3)" />
          <Slider label={<>y-intercept <Tex tex="c" /></>} value={c} min={-8} max={8} onChange={touch(setC)} colour="var(--curve-3)" />
          <Toggle on={shade} onChange={setShade}>Shade where f(x) ≥ g(x)</Toggle>
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`f(x) = g(x) \\;\\Rightarrow\\; ${quadTex(A, B, C)} = 0`} />
        <Tex display tex={`\\Delta = (${B})^2 - 4(${A})(${C}) = ${f2(D)}`} />
        <p className="text-center font-semibold" style={{ color: D > 0 ? "var(--success)" : D === 0 ? "var(--warning)" : "var(--danger)" }}>{verdict}</p>
        {xs.length > 0 && <Tex display tex={`x = ${xs.map(f2).join(" \\text{ or } x = ")}`} />}
        {shade && xs.length === 2 && <p className="text-center text-muted"><Tex tex={a > 0 ? `f(x) \\geq g(x) \\text{ when } x \\leq ${f2(lo)} \\text{ or } x \\geq ${f2(hi)}` : `f(x) \\geq g(x) \\text{ when } ${f2(lo)} \\leq x \\leq ${f2(hi)}`} /></p>}
      </div>
    </WidgetFrame>
  );
}
