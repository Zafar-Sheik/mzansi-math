"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { AxisBand, Curve, Dot, Plot } from "@/components/math/plot";
import { quadTex } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Sign = "<" | "<=" | ">" | ">=";
const SIGN_TEX: Record<Sign, string> = { "<": "<", "<=": "\\leq", ">": ">", ">=": "\\geq" };
const f2 = (v: number) => String(Math.round(v * 100) / 100);

/** Solution of a(x − r₁)(x − r₂) ⋚ 0 in words, set-builder and interval notation. */
export function solveQuadIneq(a: number, r1: number, r2: number, sign: Sign) {
  const [lo, hi] = [Math.min(r1, r2), Math.max(r1, r2)];
  const strict = sign === "<" || sign === ">";
  const wantPositive = sign === ">" || sign === ">=";
  const outside = wantPositive === a > 0; // the parabola is positive outside its roots when a > 0
  const le = strict ? "<" : "\\leq";
  const ge = strict ? ">" : "\\geq";
  if (lo === hi) {
    if (outside) return { tex: strict ? `x \\neq ${f2(lo)}` : "x \\in \\mathbb{R}", interval: strict ? `(-\\infty;\\ ${f2(lo)}) \\cup (${f2(lo)};\\ \\infty)` : "(-\\infty;\\ \\infty)", outside, lo, hi, strict };
    return { tex: strict ? "\\text{no solution}" : `x = ${f2(lo)}`, interval: strict ? "\\varnothing" : `\\{${f2(lo)}\\}`, outside, lo, hi, strict };
  }
  if (outside) {
    return {
      tex: `x ${le} ${f2(lo)} \\ \\text{ or } \\ x ${ge} ${f2(hi)}`,
      interval: `(-\\infty;\\ ${f2(lo)}${strict ? ")" : "]"} \\cup ${strict ? "(" : "["}${f2(hi)};\\ \\infty)`,
      outside, lo, hi, strict,
    };
  }
  return { tex: `${f2(lo)} ${le} x ${le} ${f2(hi)}`, interval: `${strict ? "(" : "["}${f2(lo)};\\ ${f2(hi)}${strict ? ")" : "]"}`, outside, lo, hi, strict };
}

/**
 * Quadratic inequalities, graphically: the solution is the part of the x-axis
 * where the parabola is above (or below) the axis.
 */
export function InequalityLab() {
  const [r1, setR1] = useState(-2);
  const [r2, setR2] = useState(3);
  const [neg, setNeg] = useState(false);
  const [sign, setSign] = useState<Sign>("<");
  const [numberLine, setNumberLine] = useState(true);
  const [used, setUsed] = useState(false);
  const a = neg ? -1 : 1;
  const f = (x: number) => a * (x - r1) * (x - r2);
  const sol = solveQuadIneq(a, r1, r2, sign);
  const b = -a * (r1 + r2);
  const c = a * r1 * r2;
  const poly = quadTex(a, b, c);
  const fac = (r: number) => (r === 0 ? "x" : `(x ${r > 0 ? "-" : "+"} ${Math.abs(r)})`);
  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };

  const bands = sol.lo === sol.hi
    ? (sol.outside ? [[-99, 99]] : [])
    : sol.outside ? [[-99, sol.lo], [sol.hi, 99]] : [[sol.lo, sol.hi]];

  const pct = (x: number) => `${((x + 8) / 16) * 100}%`;

  return (
    <WidgetFrame title="Inequality lab" colour="var(--t-algebra)" instruction="Choose the roots and the sign. The green part of the x-axis is the solution.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-2">
          <div className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-center text-lg">
            <Tex tex={`${poly} ${SIGN_TEX[sign]} 0 \\;\\Leftrightarrow\\; ${a < 0 ? "-" : ""}${fac(r1)}${fac(r2)} ${SIGN_TEX[sign]} 0`} />
          </div>
          <Plot view={{ xMin: -8, xMax: 8, yMin: -12, yMax: 12 }} label="Parabola with the solution region shaded" className="w-full">
            {bands.map(([x1, x2], i) => <AxisBand key={i} from={x1} to={x2} />)}
            <Curve f={f} width={3} />
            {[r1, r2].map((r, i) => <Dot key={i} x={r} y={0} r={5} hollow={sol.strict} colour="var(--success)" label={`${r}`} dy={18} dx={-4} />)}
          </Plot>
          {numberLine && (
            <div className="rounded-xl border border-line bg-surface p-3" aria-label="Number line">
              <div className="relative h-8">
                <div className="absolute top-4 right-0 left-0 h-0.5 bg-muted" />
                {bands.map(([x1, x2], i) => (
                  <div key={i} className="absolute top-3.5 h-1.5 rounded-full bg-success" style={{ left: pct(Math.max(-8, x1)), width: `calc(${pct(Math.min(8, x2))} - ${pct(Math.max(-8, x1))})` }} />
                ))}
                {[...new Set([r1, r2])].map((r) => (
                  <div key={r} className="absolute top-2 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-success" style={{ left: pct(r), background: sol.strict ? "var(--surface)" : "var(--success)" }} />
                ))}
              </div>
              <div className="relative mt-1 h-4 text-xs text-muted">
                {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((t) => <span key={t} className="absolute -translate-x-1/2" style={{ left: pct(t) }}>{t}</span>)}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Slider label={<>root <Tex tex="r_1" /></>} value={r1} min={-7} max={7} onChange={touch(setR1)} colour="var(--curve-1)" />
          <Slider label={<>root <Tex tex="r_2" /></>} value={r2} min={-7} max={7} onChange={touch(setR2)} colour="var(--curve-2)" />
          <div className="flex flex-wrap gap-2">
            <Segmented colour="var(--t-algebra)" value={sign} onChange={touch(setSign)} options={(["<", "<=", ">", ">="] as Sign[]).map((s) => ({ id: s, label: <Tex tex={SIGN_TEX[s]} /> }))} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Toggle on={neg} onChange={touch(setNeg)}>Negative x² (a &lt; 0)</Toggle>
            <Toggle on={numberLine} onChange={setNumberLine}>Number line</Toggle>
          </div>
          <div className="rounded-xl border-2 border-success/50 bg-success/5 p-3 text-sm">
            <div className="text-xs font-bold text-success uppercase">Solution</div>
            <div className="mt-1 text-base"><Tex tex={sol.tex} /></div>
            <div className="mt-1 text-muted">Interval notation: <Tex tex={sol.interval} /></div>
          </div>
          <p className="text-xs text-muted">{sign.startsWith("<") ? "“< 0” means BELOW the x-axis." : "“> 0” means ABOVE the x-axis."} {sol.strict ? "Strict sign → the roots are NOT included (open dots)." : "“or equal to” → the roots ARE included (closed dots)."}</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
