"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { money, round } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Mode = "savings" | "loan";

/** Monthly instalment for a loan P at nominal annual rate (decimal) over n months. */
export const instalment = (P: number, rate: number, n: number) => (P * (rate / 12)) / (1 - (1 + rate / 12) ** -n);
/** Balance outstanding after k payments. */
export const outstanding = (P: number, rate: number, x: number, k: number) => {
  const i = rate / 12;
  return P * (1 + i) ** k - (x * ((1 + i) ** k - 1)) / i;
};

/**
 * Annuities: a savings plan (future value) or a loan (present value),
 * month by month – where the money actually goes.
 */
export function AnnuityLab({ mode: initial = "loan" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [x, setX] = useState(1500);
  const [P, setP] = useState(250000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);
  const [k, setK] = useState(12);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };
  const i = rate / 1200, n = years * 12;

  if (mode === "savings") {
    const F = (x * ((1 + i) ** n - 1)) / i;
    const value = (t: number) => (x * ((1 + i) ** (t * 12) - 1)) / i / 1000;
    return (
      <WidgetFrame title="Annuity lab" colour="var(--t-algebra)" instruction="A fixed amount every month, compounding as it goes.">
        <Segmented colour="var(--t-algebra)" value={mode} onChange={setMode} options={[{ id: "savings", label: "Savings (future value)" }, { id: "loan", label: "Loan (present value)" }]} />
        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Plot view={{ xMin: -0.3, xMax: years + 0.3, yMin: -F / 1000 * 0.06, yMax: (F / 1000) * 1.12 }} width={480} height={300} label="Savings over time" className="w-full" xLabel="years" yLabel="R'000">
            <Curve f={(t) => (t * 12 * x) / 1000} from={0} to={years} colour="var(--curve-ghost)" dashed />
            <Curve f={value} from={0} to={years} />
            <Dot x={years} y={F / 1000} label="F" />
          </Plot>
          <div className="space-y-3">
            <Slider label="Monthly deposit x" value={x} min={100} max={5000} step={100} onChange={touch(setX)} format={money} />
            <Slider label="Interest (% p.a., monthly)" value={rate} min={1} max={18} step={0.5} onChange={touch(setRate)} format={(v) => `${v}%`} />
            <Slider label="Years" value={years} min={1} max={40} onChange={touch(setYears)} />
          </div>
        </div>
        <div className="mt-3 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
          <Tex display tex={`F = \\frac{x\\left[(1 + i)^n - 1\\right]}{i} = \\frac{${x}\\left[\\left(1 + \\frac{${rate / 100}}{12}\\right)^{${n}} - 1\\right]}{\\frac{${rate / 100}}{12}}`} />
          <p className="text-center">Value: <strong>{money(F)}</strong> · you paid in <strong>{money(x * n)}</strong> · interest earned <strong className="text-success">{money(F - x * n)}</strong></p>
          <p className="text-center text-xs text-muted">Dashed line: what you&apos;d have under a mattress. Start early – the last years earn the most.</p>
        </div>
      </WidgetFrame>
    );
  }

  const inst = instalment(P, rate / 100, n);
  const bal = outstanding(P, rate / 100, inst, Math.min(k, n));
  const interestK = outstanding(P, rate / 100, inst, Math.min(k, n) - 1) * i;
  return (
    <WidgetFrame title="Annuity lab" colour="var(--t-algebra)" instruction="Each payment covers that month's interest first – the rest pays off the loan.">
      <Segmented colour="var(--t-algebra)" value={mode} onChange={setMode} options={[{ id: "savings", label: "Savings (future value)" }, { id: "loan", label: "Loan (present value)" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Plot view={{ xMin: -1, xMax: n + 1, yMin: -P / 1000 * 0.06, yMax: (P / 1000) * 1.12 }} width={480} height={300} label="Outstanding balance" className="w-full" xLabel="months" yLabel="R'000">
          <Curve f={(t) => outstanding(P, rate / 100, inst, t) / 1000} from={0} to={n} />
          <Dot x={Math.min(k, n)} y={bal / 1000} colour="var(--memory)" label={`after ${Math.min(k, n)} payments`} />
        </Plot>
        <div className="space-y-3">
          <Slider label="Loan amount P" value={P} min={10000} max={1500000} step={10000} onChange={touch(setP)} format={money} />
          <Slider label="Interest (% p.a., monthly)" value={rate} min={5} max={24} step={0.5} onChange={touch(setRate)} format={(v) => `${v}%`} />
          <Slider label="Term (years)" value={years} min={1} max={30} onChange={touch(setYears)} />
          <Slider label="Look at payment number k" value={Math.min(k, n)} min={1} max={n} onChange={touch(setK)} colour="var(--memory)" />
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`P = \\frac{x\\left[1 - (1 + i)^{-n}\\right]}{i} \\Rightarrow x = \\frac{${P} \\times \\frac{${rate / 100}}{12}}{1 - \\left(1 + \\frac{${rate / 100}}{12}\\right)^{-${n}}} = ${money(inst).replace("R", "\\text{R}").replace(/ /g, "\\,")}`} />
        <p className="text-center">Monthly payment <strong>{money(inst)}</strong> · total repaid <strong>{money(round(inst) * n)}</strong> · total interest <strong className="text-danger">{money(round(inst) * n - P)}</strong></p>
        <p className="text-center">Payment {Math.min(k, n)}: <strong>{money(interestK)}</strong> interest + <strong>{money(inst - interestK)}</strong> off the loan · balance left <strong>{money(Math.max(0, bal))}</strong></p>
      </div>
    </WidgetFrame>
  );
}
