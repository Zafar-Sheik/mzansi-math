"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Plot } from "@/components/math/plot";
import { money } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Slider, WidgetFrame } from "./widget-frame";

/**
 * Timeline for multi-step investment problems: a deposit, an extra deposit, a
 * withdrawal and a change in interest rate. The CAPS method – move every amount
 * to the end of the timeline separately, then add – is written out live.
 * Interest is compounded monthly.
 */
export function Timeline({ deposit = 20000, years = 6, rate1 = 9, rate2 = 12, change = 3, extra = 5000, extraAt = 2, withdraw = 8000, withdrawAt = 4 }: {
  deposit?: number; years?: number; rate1?: number; rate2?: number; change?: number; extra?: number; extraAt?: number; withdraw?: number; withdrawAt?: number;
}) {
  const [P, setP] = useState(deposit);
  const [N, setN] = useState(years);
  const [r1, setR1] = useState(rate1);
  const [r2, setR2] = useState(rate2);
  const [tc, setTc] = useState(change);
  const [D, setD] = useState(extra);
  const [td, setTd] = useState(extraAt);
  const [W, setW] = useState(withdraw);
  const [tw, setTw] = useState(withdrawAt);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };
  const c = Math.min(tc, N);
  const d = Math.min(td, N - 1);
  const w = Math.min(tw, N - 1);

  /** Growth factor from year a to year b with the rate change at year c (monthly compounding). */
  const G = (a: number, b: number) => {
    const before = Math.max(0, Math.min(b, c) - a);
    const after = Math.max(0, b - Math.max(a, c));
    return (1 + r1 / 1200) ** (12 * before) * (1 + r2 / 1200) ** (12 * after);
  };
  const factorTex = (a: number) => {
    const before = Math.max(0, c - a);
    const after = N - Math.max(a, c);
    const parts = [];
    if (before > 0) parts.push(`\\left(1 + \\frac{${r1 / 100}}{12}\\right)^{${12 * before}}`);
    if (after > 0) parts.push(`\\left(1 + \\frac{${r2 / 100}}{12}\\right)^{${12 * after}}`);
    return parts.join("");
  };
  const final = P * G(0, N) + D * G(d, N) - W * G(w, N);
  const balance = (t: number) => (P * G(0, t) + (t >= d ? D * G(d, t) : 0) - (t >= w ? W * G(w, t) : 0)) / 1000;
  const peak = Math.max(...Array.from({ length: 41 }, (_, k) => balance((N * k) / 40)), 1);
  const pct = (t: number) => `${(t / N) * 100}%`;

  return (
    <WidgetFrame title="Investment timeline" colour="var(--t-algebra)" instruction="Build the scenario. Every amount is moved forward to the end of the timeline on its own, then you add (or subtract).">
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="relative mx-3 mt-10 mb-16 h-0.5 bg-fg">
          {Array.from({ length: N + 1 }, (_, t) => (
            <div key={t} className="absolute -translate-x-1/2" style={{ left: pct(t) }}>
              <div className="h-3 w-0.5 -translate-y-1/2 bg-fg" />
              <div className="mt-1 text-center text-xs font-bold">T{t}</div>
            </div>
          ))}
          <div className="absolute -top-9 -translate-x-1/2 rounded-md bg-success px-1.5 text-xs font-bold whitespace-nowrap text-white" style={{ left: pct(0) }}>+{money(P)}</div>
          {D > 0 && <div className="absolute -top-9 -translate-x-1/2 rounded-md bg-success/80 px-1.5 text-xs font-bold whitespace-nowrap text-white" style={{ left: pct(d) }}>+{money(D)}</div>}
          {W > 0 && <div className="absolute top-8 -translate-x-1/2 rounded-md bg-danger px-1.5 text-xs font-bold whitespace-nowrap text-white" style={{ left: pct(w) }}>−{money(W)}</div>}
          {c > 0 && c < N && <div className="absolute -top-5 h-10 border-l-2 border-dashed border-exam" style={{ left: pct(c) }}><span className="absolute top-[3.4rem] left-1 text-xs font-bold whitespace-nowrap text-exam">{r1}% → {r2}%</span></div>}
          <div className="absolute -top-9 -translate-x-full rounded-md bg-brand px-1.5 text-xs font-bold whitespace-nowrap text-white" style={{ left: pct(N) }}>{money(final)}</div>
        </div>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-3">
          <Slider label="Deposit at T0" value={P} min={1000} max={100000} step={1000} onChange={touch(setP)} format={money} />
          <Slider label="Total years" value={N} min={2} max={10} onChange={touch(setN)} />
          <Slider label="Rate at first (%)" value={r1} min={1} max={20} step={0.5} onChange={touch(setR1)} format={(v) => `${v}%`} />
          <Slider label="Rate changes at year" value={c} min={0} max={N} onChange={touch(setTc)} />
          <Slider label="New rate (%)" value={r2} min={1} max={20} step={0.5} onChange={touch(setR2)} format={(v) => `${v}%`} />
          <Slider label="Extra deposit" value={D} min={0} max={50000} step={1000} onChange={touch(setD)} format={money} />
          <Slider label="…at year" value={d} min={0} max={N - 1} onChange={touch(setTd)} />
          <Slider label="Withdrawal" value={W} min={0} max={50000} step={1000} onChange={touch(setW)} format={money} />
          <Slider label="…at year" value={w} min={0} max={N - 1} onChange={touch(setTw)} />
        </div>
        <div className="min-w-0">
          <Plot view={{ xMin: -0.3, xMax: N + 0.3, yMin: -peak * 0.08, yMax: peak * 1.15 }} width={420} height={260} label="Balance over time" className="w-full">
            <Curve f={(t) => (t < 0 ? NaN : balance(t))} from={0} to={N} />
          </Plot>
          <p className="mt-1 text-xs text-muted">Balance in R&apos;000 against years – the jumps are the deposit and withdrawal.</p>
        </div>
      </div>

      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <div className="text-xs font-bold text-muted uppercase">Working (interest compounded monthly)</div>
        <Tex display tex={`A = ${P}${factorTex(0)}${D > 0 ? ` + ${D}${factorTex(d)}` : ""}${W > 0 ? ` - ${W}${factorTex(w)}` : ""}`} />
        <Tex display tex={`A = ${money(final).replace("R", "\\text{R}").replace(/ /g, "\\,")}`} />
        <p className="text-muted">Each amount only earns interest from the moment it enters (or stops earning from the moment it leaves) the account.</p>
      </div>
    </WidgetFrame>
  );
}
