"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Slider, WidgetFrame } from "./widget-frame";

/** Synthetic division of a polynomial (highest power first) by (x − k). */
export function synthetic(coeffs: number[], k: number) {
  const out: number[] = [];
  const products: number[] = [];
  coeffs.forEach((c, idx) => {
    const prod = idx === 0 ? 0 : out[idx - 1] * k;
    products.push(prod);
    out.push(c + prod);
  });
  return { quotient: out.slice(0, -1), remainder: out[out.length - 1], products };
}

function polyTex(coeffs: number[]) {
  const deg = coeffs.length - 1;
  let s = "";
  coeffs.forEach((c, idx) => {
    const p = deg - idx;
    if (c === 0) return;
    const body = p === 0 ? "" : p === 1 ? "x" : `x^${p}`;
    const mag = Math.abs(c) === 1 && p !== 0 ? "" : String(Math.abs(c));
    s += s ? ` ${c < 0 ? "-" : "+"} ${mag}${body}` : `${c < 0 ? "-" : ""}${mag}${body}`;
  });
  return s || "0";
}

/**
 * Remainder & factor theorems: divide f(x) by (x − k). The remainder is f(k);
 * when it's 0, (x − k) is a factor and the graph crosses the x-axis at k.
 */
export function PolynomialLab() {
  const [a3, setA3] = useState(1);
  const [a2, setA2] = useState(-2);
  const [a1, setA1] = useState(-5);
  const [a0, setA0] = useState(6);
  const [k, setK] = useState(2);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => { fn(v); if (!used) { setUsed(true); bumpStat("toolsUsed"); } };
  const coeffs = [a3, a2, a1, a0];
  const f = (x: number) => a3 * x ** 3 + a2 * x * x + a1 * x + a0;
  const { quotient, remainder, products } = synthetic(coeffs, k);
  const factor = remainder === 0;
  const candidates = Array.from(new Set([1, -1, ...Array.from({ length: Math.abs(a0) }, (_, i) => i + 1).filter((d) => a0 % d === 0).flatMap((d) => [d, -d])])).sort((x, y) => Math.abs(x) - Math.abs(y) || x - y).slice(0, 12);

  return (
    <WidgetFrame title="Polynomial lab" colour="var(--t-algebra)" instruction="Divide f(x) by (x − k) with synthetic division. Find a k that leaves remainder 0.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-3">
          <div className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-center text-lg"><Tex tex={`f(x) = ${polyTex(coeffs)}`} /></div>
          <Plot view={{ xMin: -6, xMax: 6, yMin: -20, yMax: 20 }} width={480} height={280} label="Graph of the cubic" className="w-full">
            <Curve f={f} width={3} />
            <Dot x={k} y={f(k)} colour={factor ? "var(--success)" : "var(--memory)"} label={`(${k}; ${f(k)})`} />
          </Plot>
          <div className="overflow-x-auto">
            <table className="mx-auto font-mono text-sm">
              <tbody>
                <tr>
                  <td className="border-r-2 border-fg px-3 py-1 font-bold text-memory">{k}</td>
                  {coeffs.map((c, i) => <td key={i} className="px-3 py-1 text-center font-bold">{c}</td>)}
                </tr>
                <tr>
                  <td className="border-r-2 border-fg" />
                  {products.map((p, i) => <td key={i} className="border-b-2 border-fg px-3 py-1 text-center text-muted">{i === 0 ? "" : p}</td>)}
                </tr>
                <tr>
                  <td className="border-r-2 border-fg" />
                  {[...quotient, remainder].map((v, i) => <td key={i} className={cn("px-3 py-1 text-center font-bold", i === quotient.length && (factor ? "rounded bg-success/20 text-success" : "rounded bg-danger/15 text-danger"))}>{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-3">
          <Slider label={<Tex tex="a" />} value={a3} min={-2} max={2} onChange={touch((v) => setA3(v === 0 ? 1 : v))} />
          <Slider label={<Tex tex="b" />} value={a2} min={-9} max={9} onChange={touch(setA2)} />
          <Slider label={<Tex tex="c" />} value={a1} min={-12} max={12} onChange={touch(setA1)} />
          <Slider label={<Tex tex="d" />} value={a0} min={-12} max={12} onChange={touch(setA0)} />
          <Slider label={<>divide by <Tex tex="x - k" />, k =</>} value={k} min={-6} max={6} onChange={touch(setK)} colour="var(--memory)" />
          <div className="text-xs text-muted">Try the factors of d: {candidates.join(", ")}</div>
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`f(x) = (x ${k >= 0 ? "-" : "+"} ${Math.abs(k)})(${polyTex(quotient)})${remainder === 0 ? "" : ` ${remainder < 0 ? "-" : "+"} ${Math.abs(remainder)}`}`} />
        <p className="text-center">Remainder theorem: <Tex tex={`f(${k}) = ${f(k)}`} /> – the same as the remainder.</p>
        <p className={cn("text-center font-semibold", factor ? "text-success" : "text-muted")}>{factor ? `f(${k}) = 0, so (x ${k >= 0 ? "−" : "+"} ${Math.abs(k)}) is a factor – and x = ${k} is a root!` : "Not a factor (remainder ≠ 0). Try another k."}</p>
      </div>
    </WidgetFrame>
  );
}
