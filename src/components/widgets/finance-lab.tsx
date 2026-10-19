"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { COMPOUNDING, compoundGrowth, effectiveRate, reducingBalance, simpleGrowth, straightLine } from "@/lib/math/finance";
import { money } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Mode = "growth" | "depreciation" | "effective";

/** Graphs in R'000 so the axis labels stay readable. */
const K = 1000;

export function FinanceLab({ mode: initial = "growth" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [P, setP] = useState(10000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [comp, setComp] = useState("annually");
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };
  const m = COMPOUNDING.find((c) => c.id === comp)!.m;
  const i = rate / 100;

  const simple = (t: number) => simpleGrowth(P, i, t) / K;
  const compound = (t: number) => compoundGrowth(P, i / m, t * m) / K;
  const sl = (t: number) => Math.max(0, straightLine(P, i, t)) / K;
  const rb = (t: number) => reducingBalance(P, i, t) / K;

  const top = mode === "growth" ? compound(years) : P / K;

  return (
    <WidgetFrame title="Money lab" colour="var(--t-algebra)" instruction="Change the amount, the rate and the time. Watch simple and compound grow (or shrink) apart.">
      <Segmented colour="var(--t-algebra)" value={mode} onChange={setMode} options={[{ id: "growth", label: "Simple vs compound" }, { id: "depreciation", label: "Depreciation" }, { id: "effective", label: "Nominal vs effective" }]} />
      {mode !== "effective" ? (
        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <Plot view={{ xMin: -0.5, xMax: years + 0.5, yMin: -top * 0.06, yMax: top * 1.12 }} width={480} height={320} label="Value over time" className="w-full">
              {mode === "growth" ? (
                <>
                  <Curve f={simple} colour="var(--curve-2)" from={0} to={years} />
                  <Curve f={compound} colour="var(--curve-1)" from={0} to={years} />
                  <Dot x={years} y={simple(years)} colour="var(--curve-2)" label="simple" dy={16} dx={-50} />
                  <Dot x={years} y={compound(years)} colour="var(--curve-1)" label="compound" dx={-74} />
                </>
              ) : (
                <>
                  <Curve f={sl} colour="var(--curve-3)" from={0} to={years} />
                  <Curve f={rb} colour="var(--curve-1)" from={0} to={years} />
                  <Dot x={years} y={sl(years)} colour="var(--curve-3)" label="straight-line" dx={-90} dy={-10} />
                  <Dot x={years} y={rb(years)} colour="var(--curve-1)" label="reducing" dx={-66} dy={18} />
                </>
              )}
            </Plot>
            <p className="mt-1 text-xs text-muted">Horizontal axis: years. Vertical axis: value in thousands of rand (R&apos;000).</p>
          </div>
          <div className="space-y-3">
            <Slider label={mode === "growth" ? "Amount invested P" : "Cost price P"} value={P} min={1000} max={mode === "growth" ? 100000 : 500000} step={1000} onChange={touch(setP)} format={money} />
            <Slider label={mode === "growth" ? "Interest rate (% p.a.)" : "Depreciation rate (% p.a.)"} value={rate} min={1} max={mode === "growth" ? 20 : 35} step={0.5} onChange={touch(setRate)} format={(v) => `${v}%`} />
            <Slider label="Years n" value={years} min={1} max={30} onChange={touch(setYears)} />
            {mode === "growth" && (
              <div>
                <div className="mb-1 text-sm font-semibold">Compound interest is compounded…</div>
                <Segmented colour="var(--t-algebra)" value={comp} onChange={setComp} options={COMPOUNDING.filter((c) => c.id !== "daily").map((c) => ({ id: c.id, label: c.label }))} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Effective rate={rate} setRate={touch(setRate)} />
      )}
      {mode === "growth" && (
        <div className="mt-3 grid gap-2 rounded-xl bg-surface-2 p-3 text-sm sm:grid-cols-2">
          <div><span className="font-semibold" style={{ color: "var(--curve-2)" }}>Simple:</span> <Tex tex={`A = P(1 + in) = ${P}(1 + ${i} \\times ${years})`} /> = <strong>{money(simple(years) * K)}</strong></div>
          <div><span className="font-semibold" style={{ color: "var(--curve-1)" }}>Compound:</span> <Tex tex={`A = P(1 + i)^n = ${P}\\left(1 + ${m === 1 ? i : `\\frac{${i}}{${m}}`}\\right)^{${years * m}}`} /> = <strong>{money(compound(years) * K)}</strong></div>
          <p className="sm:col-span-2 text-muted">Compound earns <strong className="text-fg">{money((compound(years) - simple(years)) * K)}</strong> more – interest earning interest. That&apos;s why starting early wins.</p>
        </div>
      )}
      {mode === "depreciation" && (
        <div className="mt-3 grid gap-2 rounded-xl bg-surface-2 p-3 text-sm sm:grid-cols-2">
          <div><span className="font-semibold" style={{ color: "var(--curve-3)" }}>Straight-line:</span> <Tex tex={`A = P(1 - in) = ${P}(1 - ${i} \\times ${years})`} /> = <strong>{money(straightLine(P, i, years))}</strong>{straightLine(P, i, years) < 0 && <span className="text-danger"> (negative – the item was worth R0 after {Math.ceil(1 / i * 10) / 10} years)</span>}</div>
          <div><span className="font-semibold" style={{ color: "var(--curve-1)" }}>Reducing balance:</span> <Tex tex={`A = P(1 - i)^n = ${P}(1 - ${i})^{${years}}`} /> = <strong>{money(rb(years) * K)}</strong></div>
          <p className="sm:col-span-2 text-muted">Straight-line loses the <strong className="text-fg">same amount</strong> every year (a straight line); reducing-balance loses the <strong className="text-fg">same percentage</strong> of what&apos;s left (a curve that never reaches zero).</p>
        </div>
      )}
    </WidgetFrame>
  );
}

function Effective({ rate, setRate }: { rate: number; setRate: (v: number) => void }) {
  const rows = COMPOUNDING.map((c) => ({ ...c, eff: effectiveRate(rate / 100, c.m) * 100 }));
  const max = rows[rows.length - 1].eff;
  return (
    <div className="mt-3 space-y-3">
      <Slider label="Nominal rate (% p.a.)" value={rate} min={1} max={30} step={0.5} onChange={setRate} format={(v) => `${v}%`} />
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.id} className="grid grid-cols-[110px_minmax(0,1fr)_70px] items-center gap-2 text-sm">
            <span className="font-semibold">{r.label}</span>
            <span className="h-5 rounded-full bg-surface-2"><span className="block h-5 rounded-full bg-algebra transition-[width]" style={{ width: `${(r.eff / max) * 100}%`, opacity: 0.45 + r.m / 700 + 0.1 * Math.log10(r.m + 1) }} /></span>
            <span className="text-right font-mono font-bold tabular-nums">{r.eff.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
      <div className="overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`1 + i_{\\text{eff}} = \\left(1 + \\frac{i_{\\text{nom}}}{m}\\right)^{m} \\quad\\Rightarrow\\quad 1 + i_{\\text{eff}} = \\left(1 + \\frac{${rate / 100}}{12}\\right)^{12} \\Rightarrow i_{\\text{eff}} = ${rows[3].eff.toFixed(2)}\\%`} />
        <p className="text-center text-muted">Same nominal rate, but compounding more often means you really earn (or pay!) more. Banks advertise loans with the <strong className="text-fg">nominal</strong> rate – the effective rate is the truth.</p>
      </div>
    </div>
  );
}
