"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Guide, Plot } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Op = "sin+" | "sin-" | "cos+" | "cos-" | "sin2" | "cos2";
const R = Math.PI / 180;
const S = (d: number) => Math.sin(d * R), C = (d: number) => Math.cos(d * R);
const f3 = (v: number) => (Math.abs(v) < 5e-4 ? "0.000" : v.toFixed(3));

/** Each identity: its LaTeX, the correct expansion, and the tempting wrong one. */
const OPS: Record<Op, { label: string; lhs: (a: number, b: number) => string; rhs: (a: number, b: number) => string; trap: (a: number, b: number) => string; f: (a: number, b: number) => number; g: (a: number, b: number) => number; t: (a: number, b: number) => number; double?: boolean }> = {
  "sin+": { label: "sin(α + β)", lhs: (a, b) => `\\sin(${a}^\\circ + ${b}^\\circ)`, rhs: (a, b) => `\\sin ${a}^\\circ\\cos ${b}^\\circ + \\cos ${a}^\\circ\\sin ${b}^\\circ`, trap: (a, b) => `\\sin ${a}^\\circ + \\sin ${b}^\\circ`, f: (a, b) => S(a + b), g: (a, b) => S(a) * C(b) + C(a) * S(b), t: (a, b) => S(a) + S(b) },
  "sin-": { label: "sin(α − β)", lhs: (a, b) => `\\sin(${a}^\\circ - ${b}^\\circ)`, rhs: (a, b) => `\\sin ${a}^\\circ\\cos ${b}^\\circ - \\cos ${a}^\\circ\\sin ${b}^\\circ`, trap: (a, b) => `\\sin ${a}^\\circ - \\sin ${b}^\\circ`, f: (a, b) => S(a - b), g: (a, b) => S(a) * C(b) - C(a) * S(b), t: (a, b) => S(a) - S(b) },
  "cos+": { label: "cos(α + β)", lhs: (a, b) => `\\cos(${a}^\\circ + ${b}^\\circ)`, rhs: (a, b) => `\\cos ${a}^\\circ\\cos ${b}^\\circ - \\sin ${a}^\\circ\\sin ${b}^\\circ`, trap: (a, b) => `\\cos ${a}^\\circ + \\cos ${b}^\\circ`, f: (a, b) => C(a + b), g: (a, b) => C(a) * C(b) - S(a) * S(b), t: (a, b) => C(a) + C(b) },
  "cos-": { label: "cos(α − β)", lhs: (a, b) => `\\cos(${a}^\\circ - ${b}^\\circ)`, rhs: (a, b) => `\\cos ${a}^\\circ\\cos ${b}^\\circ + \\sin ${a}^\\circ\\sin ${b}^\\circ`, trap: (a, b) => `\\cos ${a}^\\circ - \\cos ${b}^\\circ`, f: (a, b) => C(a - b), g: (a, b) => C(a) * C(b) + S(a) * S(b), t: (a, b) => C(a) - C(b) },
  sin2: { label: "sin 2α", double: true, lhs: (a) => `\\sin 2(${a}^\\circ)`, rhs: (a) => `2\\sin ${a}^\\circ\\cos ${a}^\\circ`, trap: (a) => `2\\sin ${a}^\\circ`, f: (a) => S(2 * a), g: (a) => 2 * S(a) * C(a), t: (a) => 2 * S(a) },
  cos2: { label: "cos 2α", double: true, lhs: (a) => `\\cos 2(${a}^\\circ)`, rhs: (a) => `\\cos^2 ${a}^\\circ - \\sin^2 ${a}^\\circ`, trap: (a) => `2\\cos ${a}^\\circ`, f: (a) => C(2 * a), g: (a) => C(a) ** 2 - S(a) ** 2, t: (a) => 2 * C(a) },
};

/**
 * Compound and double angles, tested with numbers: the correct expansion
 * always matches, the "distribute the sin" trap almost never does. The graph
 * shows it for every α at once.
 */
export function CompoundLab({ op: initial = "sin+" }: { op?: Op }) {
  const [op, setOp] = useState<Op>(initial);
  const [a, setA] = useState(60);
  const [b, setB] = useState(30);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };
  const O = OPS[op];
  const lhs = O.f(a, b), rhs = O.g(a, b), trap = O.t(a, b);
  const trapOk = Math.abs(trap - lhs) < 5e-4;

  return (
    <WidgetFrame title="Compound & double angles" colour="var(--t-trig)" instruction="Pick an identity and change the angles. The real expansion always matches; the trap only works by luck.">
      <Segmented colour="var(--t-trig)" value={op} onChange={setOp} options={(Object.keys(OPS) as Op[]).map((k) => ({ id: k, label: OPS[k].label }))} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Plot view={{ xMin: 0, xMax: 360, yMin: -2.2, yMax: 2.2 }} xStep={90} yStep={1} width={520} height={260} label="The identity as graphs of α" className="w-full" xLabel="α">
            <Curve f={(x) => O.t(x, b)} colour="var(--danger)" width={2} dashed />
            <Curve f={(x) => O.f(x, b)} colour="var(--curve-1)" width={5} />
            <Curve f={(x) => O.g(x, b)} colour="var(--success)" width={2} />
            <Guide x={a} />
          </Plot>
          <p className="mt-1 text-center text-xs text-muted"><span style={{ color: "var(--curve-1)" }}>■ the left-hand side</span> · <span style={{ color: "var(--success)" }}>■ the expansion (right on top of it)</span> · <span style={{ color: "var(--danger)" }}>- - the trap</span></p>
        </div>
        <div className="space-y-3">
          <Slider label={<><Tex tex="\alpha" /></>} value={a} min={0} max={360} step={5} onChange={touch(setA)} colour="var(--curve-1)" format={(v) => `${v}°`} />
          {!O.double && <Slider label={<><Tex tex="\beta" /></>} value={b} min={0} max={180} step={5} onChange={touch(setB)} colour="var(--curve-2)" format={(v) => `${v}°`} />}
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`${O.lhs(a, b)} = ${f3(lhs)}`} />
        <p className="text-center font-semibold" style={{ color: "var(--success)" }}>✓ <Tex tex={`${O.rhs(a, b)} = ${f3(rhs)}`} /></p>
        <p className="text-center font-semibold" style={{ color: trapOk ? "var(--memory)" : "var(--danger)" }}>{trapOk ? "≈ lucky! " : "✗ "}<Tex tex={`${O.trap(a, b)} = ${f3(trap)}`} />{trapOk ? " – try other angles" : ""}</p>
      </div>
    </WidgetFrame>
  );
}
