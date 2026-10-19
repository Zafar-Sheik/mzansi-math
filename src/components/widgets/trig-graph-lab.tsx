"use client";
import { useMemo, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type F = "sin" | "cos" | "tan";
const RAD = Math.PI / 180;
const n2 = (v: number) => String(Math.round(v * 100) / 100);

/** y = a·f(k(x + p)) + q in degrees. */
export function trigFn(f: F, a: number, k: number, p: number, q: number) {
  return (x: number) => {
    const t = k * (x + p) * RAD;
    if (f === "tan") {
      const c = Math.cos(t);
      return Math.abs(c) < 1e-6 ? NaN : (a * Math.sin(t)) / c + q;
    }
    return a * (f === "sin" ? Math.sin(t) : Math.cos(t)) + q;
  };
}

/**
 * Trig graphs lab: sin, cos and tan with a (amplitude), k (period), p
 * (horizontal shift) and q (vertical shift), over −360° ≤ x ≤ 360°.
 */
export function TrigGraphLab({ fn: initial = "sin" }: { fn?: F }) {
  const [f, setF] = useState<F>(initial);
  const [a, setA] = useState(1);
  const [k, setK] = useState(1);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const [ghost, setGhost] = useState(true);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };
  const g = useMemo(() => trigFn(f, a, k, p, q), [f, a, k, p, q]);
  const parent = useMemo(() => trigFn(f, 1, 1, 0, 0), [f]);
  const period = (f === "tan" ? 180 : 360) / k;
  const inner = `${k === 1 ? "" : n2(k)}${k !== 1 && p !== 0 ? "(" : ""}x${p === 0 ? "" : p > 0 ? ` + ${p}^\\circ` : ` - ${-p}^\\circ`}${k !== 1 && p !== 0 ? ")" : ""}`;
  const eq = `y = ${a === 1 ? "" : a === -1 ? "-" : n2(a)}\\${f}${k === 1 && p === 0 ? " " : "\\,"}${k === 1 && p === 0 ? "x" : `\\left(${inner}\\right)`}${q === 0 ? "" : q > 0 ? ` + ${n2(q)}` : ` - ${n2(-q)}`}`;
  // Asymptotes of tan: k(x + p) = 90 + 180n
  const asym: number[] = [];
  if (f === "tan") for (let n = -8; n <= 8; n++) { const x = (90 + 180 * n) / k - p; if (x >= -360 && x <= 360) asym.push(x); }
  const maxX = f === "sin" ? 90 / k - p : f === "cos" ? -p : 0;

  return (
    <WidgetFrame title="Trig graph lab" colour="var(--t-trig)" instruction="Change a, k, p and q. The grey dashed curve is the basic graph, for comparison.">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented colour="var(--t-trig)" value={f} onChange={(v) => { setF(v); }} options={[{ id: "sin", label: "y = sin x" }, { id: "cos", label: "y = cos x" }, { id: "tan", label: "y = tan x" }]} />
        <span className="ml-auto"><Toggle on={ghost} onChange={setGhost}>Basic graph</Toggle></span>
      </div>
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="mb-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-center text-lg"><Tex tex={eq} /></div>
          <Plot view={{ xMin: -370, xMax: 370, yMin: -4.5, yMax: 4.5 }} width={520} height={320} xStep={90} yStep={1} label={`Graph of ${eq}`} className="w-full">
            {asym.map((x) => <Guide key={x} x={x} />)}
            {ghost && <Curve f={parent} colour="var(--curve-ghost)" dashed width={2} />}
            <Curve f={g} colour="var(--curve-2)" width={3} />
            {f !== "tan" && [-720, -360, 0, 360, 720].map((s) => maxX + s / k).filter((x) => x >= -360 && x <= 360).map((x) => <Dot key={x} x={x} y={g(x)} r={4} colour="var(--curve-3)" />)}
          </Plot>
        </div>
        <div className="space-y-3">
          <Slider label={<><Tex tex="a" /> {f === "tan" ? "(stretch)" : "(amplitude)"}</>} value={a} min={-3} max={3} step={0.5} onChange={touch((v) => setA(v === 0 ? 0.5 : v))} colour="var(--curve-1)" />
          <Slider label={<><Tex tex="k" /> (period)</>} value={k} min={0.5} max={4} step={0.5} onChange={touch(setK)} colour="var(--curve-2)" />
          <Slider label={<><Tex tex="p" /> (shift left/right)</>} value={p} min={-180} max={180} step={15} onChange={touch(setP)} colour="var(--curve-3)" format={(v) => `${v}°`} />
          {f !== "tan" && <Slider label={<><Tex tex="q" /> (shift up/down)</>} value={q} min={-3} max={3} step={0.5} onChange={touch(setQ)} colour="var(--memory)" />}
          <dl className="space-y-1 rounded-xl border border-line bg-surface-2 p-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Period</dt><dd><Tex tex={`\\frac{${f === "tan" ? 180 : 360}^\\circ}{${n2(k)}} = ${n2(period)}^\\circ`} /></dd></div>
            {f !== "tan" ? (
              <>
                <div className="flex justify-between"><dt className="text-muted">Amplitude</dt><dd><Tex tex={`|a| = ${n2(Math.abs(a))}`} /></dd></div>
                <div className="flex justify-between"><dt className="text-muted">Range</dt><dd><Tex tex={`${n2(q - Math.abs(a))} \\leq y \\leq ${n2(q + Math.abs(a))}`} /></dd></div>
              </>
            ) : (
              <div className="flex justify-between"><dt className="text-muted">Asymptotes</dt><dd><Tex tex={`x = ${n2(90 / k - p)}^\\circ + ${n2(180 / k)}^\\circ n`} /></dd></div>
            )}
            <div className="flex justify-between"><dt className="text-muted">Shift</dt><dd>{p === 0 ? "none" : `${Math.abs(p)}° ${p > 0 ? "left" : "right"}`}</dd></div>
          </dl>
          <p className="text-xs text-muted">Watch out: in <Tex tex="\sin(x + 30^\circ)" /> the graph moves 30° to the LEFT.</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
