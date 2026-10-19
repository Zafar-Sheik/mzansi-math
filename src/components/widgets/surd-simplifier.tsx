"use client";
import { useState } from "react";
import { Shuffle } from "lucide-react";
import { Tex } from "@/components/learn/tex";
import { Button } from "@/components/ui/button";
import { simplifySurd, surdTex } from "@/lib/math/numbers";
import { cn } from "@/lib/utils";
import { Slider, WidgetFrame } from "./widget-frame";

const SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196];

/**
 * √n → k√m: test each perfect square as a factor, keep the biggest one.
 * Also places √n on a number line between two integers (estimation).
 */
export function SurdSimplifier({ start = 72 }: { start?: number }) {
  const [n, setN] = useState(start);
  const { k, m } = simplifySurd(n);
  const factors = SQUARES.filter((s) => s <= n && n % s === 0);
  const best = k * k;
  const lo = Math.floor(Math.sqrt(n));
  const exact = lo * lo === n;
  const pos = Math.sqrt(n) - lo;

  return (
    <WidgetFrame title="Surd simplifier" colour="var(--t-algebra)" instruction="Pick a number. Find the biggest perfect square that divides it – that's what comes out of the root.">
      <div className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="space-y-3">
          <Slider label={<Tex tex="n" />} value={n} min={2} max={300} onChange={setN} colour="var(--t-algebra)" />
          <Button size="sm" variant="secondary" onClick={() => setN(SQUARES[Math.floor(Math.random() * 6)] * [2, 3, 5, 6, 7][Math.floor(Math.random() * 5)])}><Shuffle className="h-4 w-4" /> Random surd</Button>
          <div className="rounded-xl bg-surface-2 p-3 text-sm">
            <div className="font-semibold">Perfect squares that divide {n}:</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SQUARES.filter((s) => s <= Math.max(n, 4)).map((s) => (
                <span key={s} className={cn("rounded-lg px-2 py-0.5 font-mono text-xs font-bold", s === best ? "bg-success text-white" : factors.includes(s) ? "bg-success/20 text-success" : "bg-surface text-muted line-through opacity-60")}>{s}</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">Green = divides {n}. The dark one is the biggest – use it and you&apos;re done in one step.</p>
          </div>
        </div>
        <div className="min-w-0 space-y-3">
          <div className="rounded-xl bg-surface-2 p-4">
            {exact ? (
              <Tex display tex={`\\sqrt{${n}} = ${lo} \\quad \\text{(a perfect square – rational!)}`} />
            ) : k === 1 ? (
              <Tex display tex={`\\sqrt{${n}} \\text{ is already in simplest form}`} />
            ) : (
              <>
                <Tex display tex={`\\sqrt{${n}} = \\sqrt{${best} \\times ${m}} = \\sqrt{${best}} \\times \\sqrt{${m}} = ${surdTex(k, m)}`} />
              </>
            )}
          </div>
          <div className="rounded-xl border border-line p-4">
            <div className="mb-2 text-sm font-semibold">Where is <Tex tex={`\\sqrt{${n}}`} /> on the number line?</div>
            <div className="relative mx-2 h-10">
              <div className="absolute top-5 right-0 left-0 h-0.5 bg-line" />
              {[0, 1].map((i) => (
                <div key={i} className="absolute top-3 -translate-x-1/2 text-center" style={{ left: `${i * 100}%` }}>
                  <div className="mx-auto h-4 w-0.5 bg-muted" />
                  <div className="text-xs font-bold">{lo + i}</div>
                </div>
              ))}
              <div className="absolute top-1 -translate-x-1/2" style={{ left: `${pos * 100}%` }}>
                <div className="h-4 w-4 rounded-full bg-memory shadow" />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">
              {exact ? `${n} is a perfect square, so √${n} is the integer ${lo}.` : <>Because {lo}² = {lo * lo} and {lo + 1}² = {(lo + 1) ** 2}, <Tex tex={`${lo} < \\sqrt{${n}} < ${lo + 1}`} />. (≈ {Math.sqrt(n).toFixed(3)} – irrational: the decimals never end or repeat.)</>}
            </p>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}
