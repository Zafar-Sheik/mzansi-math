"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { bumpStat } from "@/lib/progress";
import { Figure, type Pt } from "./figure";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Mode = "parallel" | "similar";
const f2 = (v: number) => (Math.round(v * 100) / 100).toFixed(2);
const lerp = (P: Pt, Q: Pt, t: number): Pt => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
const len = (P: Pt, Q: Pt) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angleAt = (V: Pt, P: Pt, Q: Pt) => {
  const a = Math.atan2(P[1] - V[1], P[0] - V[0]), b = Math.atan2(Q[1] - V[1], Q[0] - V[0]);
  let d = Math.abs(a - b) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
};

// Triangle ABC with AB = 9, AC = 12 and BC = 12 units.
const A: Pt = [3.375, 8.343], B: Pt = [0, 0], C: Pt = [12, 0];

/**
 * Proportionality: slide D along AB and E along AC – the ratios match exactly
 * when DE ∥ BC. Similarity: scale a triangle and watch angles stay put while
 * every side is multiplied by k (and the area by k²).
 */
export function ProportionLab({ mode: initial = "parallel" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [d, setD] = useState(40);
  const [e, setE] = useState(40);
  const [lock, setLock] = useState(true);
  const [k, setK] = useState(1.5);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };

  if (mode === "similar") {
    const P: Pt = [15, 0], Q: Pt = [15 + 5 * k, 0], R: Pt = [15 + 1.5 * k, 4 * k];
    const a0: Pt = [0, 0], b0: Pt = [5, 0], c0: Pt = [1.5, 4];
    const sides = [["AB", len(a0, b0), "PQ", len(P, Q)], ["BC", len(b0, c0), "QR", len(Q, R)], ["AC", len(a0, c0), "PR", len(P, R)]] as const;
    return (
      <WidgetFrame title="Proportion & similarity lab" colour="var(--t-geometry)" instruction="Change the scale factor k. The angles never change – every side is multiplied by k.">
        <Segmented colour="var(--t-geometry)" value={mode} onChange={setMode} options={[{ id: "parallel", label: "Line ∥ one side" }, { id: "similar", label: "Similar triangles" }]} />
        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Figure
            points={{ A: a0, B: b0, C: c0, P, Q, R }}
            segments={[["A", "B"], ["B", "C"], ["C", "A"], { from: "P", to: "Q", colour: "var(--curve-2)" }, { from: "Q", to: "R", colour: "var(--curve-2)" }, { from: "R", to: "P", colour: "var(--curve-2)" }]}
            angles={[{ at: "A", from: "B", to: "C", label: `${Math.round(angleAt(a0, b0, c0))}°` }, { at: "B", from: "A", to: "C", label: `${Math.round(angleAt(b0, a0, c0))}°` }, { at: "P", from: "Q", to: "R", label: `${Math.round(angleAt(P, Q, R))}°` }, { at: "Q", from: "P", to: "R", label: `${Math.round(angleAt(Q, P, R))}°` }]}
            width={520}
            caption="△ABC ||| △PQR (equiangular), in that order of letters."
          />
          <div className="space-y-3">
            <Slider label={<>scale factor <Tex tex="k" /></>} value={k} min={0.5} max={2.5} step={0.1} onChange={touch(setK)} colour="var(--curve-2)" format={(v) => v.toFixed(1)} />
            <div className="space-y-2 rounded-xl bg-surface-2 p-3 text-sm">
              {sides.map(([s1, l1, s2, l2]) => (
                <div key={s1}><Tex tex={`\\dfrac{${s2}}{${s1}} = \\dfrac{${f2(l2)}}{${f2(l1)}} = ${f2(l2 / l1)}`} /></div>
              ))}
              <p className="mt-2 text-muted">Area ratio <Tex tex={`= k^2 = ${f2(k * k)}`} /></p>
            </div>
          </div>
        </div>
        <p className="mt-3 rounded-xl bg-surface-2 p-3 text-center text-sm">Equiangular triangles have sides in proportion (and the converse). Reason: <strong>(|||△s)</strong> or <strong>(sides of △ in prop)</strong>.</p>
      </WidgetFrame>
    );
  }

  const td = d / 100, te = lock ? td : e / 100;
  const D = lerp(A, B, td), E = lerp(A, C, te);
  const AD = 9 * td, DB = 9 - AD, AE = 12 * te, EC = 12 - AE;
  const parallel = Math.abs(td - te) < 0.005;
  const mid = parallel && Math.abs(td - 0.5) < 0.005;

  return (
    <WidgetFrame title="Proportion & similarity lab" colour="var(--t-geometry)" instruction="Slide D along AB and E along AC. When DE ∥ BC, the two ratios are equal – and only then.">
      <Segmented colour="var(--t-geometry)" value={mode} onChange={setMode} options={[{ id: "parallel", label: "Line ∥ one side" }, { id: "similar", label: "Similar triangles" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Figure
          points={{ A, B, C, D, E }}
          segments={[["A", "B"], ["B", "C"], ["C", "A"], { from: "D", to: "E", colour: parallel ? "var(--success)" : "var(--danger)" }]}
          sideLabels={[{ from: "A", to: "D", label: f2(AD) }, { from: "D", to: "B", label: f2(DB) }, { from: "A", to: "E", label: f2(AE) }, { from: "E", to: "C", label: f2(EC) }]}
          ticks={mid ? [{ from: "A", to: "D" }, { from: "D", to: "B" }, { from: "A", to: "E", count: 2 }, { from: "E", to: "C", count: 2 }] : []}
          width={520}
        />
        <div className="space-y-3">
          <Slider label={<>D along AB</>} value={d} min={5} max={95} onChange={touch(setD)} colour="var(--curve-1)" format={(v) => `${v}%`} />
          {!lock && <Slider label={<>E along AC</>} value={e} min={5} max={95} onChange={touch(setE)} colour="var(--curve-3)" format={(v) => `${v}%`} />}
          <Toggle on={lock} onChange={(v) => { setLock(v); if (!v) setE(d); }}>Keep DE ∥ BC</Toggle>
          <button type="button" className="ml-2 rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted hover:text-fg" onClick={() => { setLock(true); setD(50); }}>Midpoints</button>
          <div className="space-y-2 rounded-xl bg-surface-2 p-3 text-sm">
            <div><Tex tex={`\\dfrac{AD}{DB} = \\dfrac{${f2(AD)}}{${f2(DB)}} = ${f2(AD / DB)}`} /></div>
            <div><Tex tex={`\\dfrac{AE}{EC} = \\dfrac{${f2(AE)}}{${f2(EC)}} = ${f2(AE / EC)}`} /></div>
            <p className="mt-1 font-semibold" style={{ color: parallel ? "var(--success)" : "var(--danger)" }}>{parallel ? "Equal ratios ⇔ DE ∥ BC" : "Ratios differ – DE is not parallel to BC"}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 rounded-xl bg-surface-2 p-3 text-center text-sm">
        {mid
          ? <>Midpoint theorem: D and E are midpoints, so DE ∥ BC and <Tex tex={`DE = \\tfrac{1}{2}BC = ${f2(len(D, E))}`} />.</>
          : <>A line parallel to one side of a triangle divides the other two sides in proportion. Reason: <strong>(line ∥ one side of △)</strong>; converse: <strong>(line divides two sides of △ in prop)</strong>.</>}
      </p>
    </WidgetFrame>
  );
}
