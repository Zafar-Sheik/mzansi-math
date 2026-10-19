"use client";
import { useMemo, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot, Segment } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Fam = "linear" | "quadratic" | "exponential";
const n2 = (v: number) => String(Math.round(v * 100) / 100);

/**
 * A function and its inverse are reflections in y = x. Move a point on f and
 * watch its mirror image (y; x) land on f⁻¹.
 */
export function InverseLab({ family: initial = "exponential" }: { family?: Fam }) {
  const [fam, setFam] = useState<Fam>(initial);
  const [m, setM] = useState(2);
  const [c, setC] = useState(-1);
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [x0, setX0] = useState(1);
  const [restrict, setRestrict] = useState(true);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };

  const { f, inv, fTex, invTex, note } = useMemo(() => {
    if (fam === "linear") return {
      f: (x: number) => m * x + c, inv: (x: number) => (x - c) / m,
      fTex: `f(x) = ${m}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`, invTex: `f^{-1}(x) = \\frac{x ${c >= 0 ? "-" : "+"} ${Math.abs(c)}}{${m}}`,
      note: "Swap x and y, make y the subject.",
    };
    if (fam === "quadratic") return {
      f: (x: number) => (restrict && x < 0 ? NaN : a * x * x), inv: (x: number) => (x / a < 0 ? NaN : Math.sqrt(x / a)),
      fTex: `f(x) = ${a === 1 ? "" : a}x^2${restrict ? ",\\ x \\geq 0" : ""}`, invTex: `f^{-1}(x) = \\sqrt{\\frac{x}{${a}}}`,
      note: restrict ? "With x ≥ 0, the inverse is a function (only the positive root)." : "Without a restriction the inverse y = ±√(x/a) is NOT a function – one x gives two y-values.",
    };
    return {
      f: (x: number) => b ** x, inv: (x: number) => (x <= 0 ? NaN : Math.log(x) / Math.log(b)),
      fTex: `f(x) = ${b}^x`, invTex: `f^{-1}(x) = \\log_{${b}} x`,
      note: "The exponential's asymptote y = 0 becomes the log's asymptote x = 0; (0; 1) becomes (1; 0).",
    };
  }, [fam, m, c, a, b, restrict]);
  const y0 = f(x0);

  return (
    <WidgetFrame title="Inverse functions" colour="var(--t-algebra)" instruction="f⁻¹ is the reflection of f in the line y = x. Move the point on f and see its mirror image.">
      <Segmented colour="var(--t-algebra)" value={fam} onChange={setFam} options={[{ id: "linear", label: "Straight line" }, { id: "quadratic", label: "Parabola" }, { id: "exponential", label: "Exponential ↔ log" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap justify-center gap-x-6 rounded-xl border border-line bg-surface-2 px-3 py-2 text-lg">
            <span style={{ color: "var(--curve-1)" }}><Tex tex={fTex} /></span>
            <span style={{ color: "var(--curve-2)" }}><Tex tex={invTex} /></span>
          </div>
          <Plot view={{ xMin: -6, xMax: 6, yMin: -6, yMax: 6 }} label="A function, its inverse and the line y = x" className="w-full">
            <Curve f={(x) => x} colour="var(--curve-ghost)" dashed width={1.5} />
            <Curve f={f} width={3} />
            <Curve f={inv} colour="var(--curve-2)" width={3} />
            {fam === "quadratic" && !restrict && <Curve f={(x) => (x / a < 0 ? NaN : -Math.sqrt(x / a))} colour="var(--curve-2)" width={2} dashed />}
            {Number.isFinite(y0) && <>
              <Segment x1={x0} y1={y0} x2={y0} y2={x0} colour="var(--memory)" dashed width={1.5} />
              <Dot x={x0} y={y0} label={`(${n2(x0)}; ${n2(y0)})`} />
              <Dot x={y0} y={x0} colour="var(--curve-2)" label={`(${n2(y0)}; ${n2(x0)})`} dy={18} />
            </>}
          </Plot>
        </div>
        <div className="space-y-3">
          {fam === "linear" && <><Slider label={<Tex tex="m" />} value={m} min={-4} max={4} step={0.5} onChange={touch((v) => setM(v === 0 ? 0.5 : v))} /><Slider label={<Tex tex="c" />} value={c} min={-5} max={5} onChange={touch(setC)} /></>}
          {fam === "quadratic" && <><Slider label={<Tex tex="a" />} value={a} min={0.5} max={3} step={0.5} onChange={touch(setA)} /><Toggle on={restrict} onChange={setRestrict}>Restrict to x ≥ 0</Toggle></>}
          {fam === "exponential" && <Segmented colour="var(--t-algebra)" value={String(b)} onChange={(v) => touch(setB)(Number(v))} options={[{ id: "2", label: "base 2" }, { id: "3", label: "base 3" }, { id: "0.5", label: "base ½" }]} />}
          <Slider label={<>point at <Tex tex="x" /></>} value={x0} min={-3} max={3} step={0.25} onChange={touch(setX0)} colour="var(--memory)" />
          <p className="rounded-xl bg-surface-2 p-3 text-sm">{note}</p>
          <p className="text-xs text-muted">Domain of f = range of f⁻¹, and range of f = domain of f⁻¹.</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
