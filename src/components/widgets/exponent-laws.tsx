"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { cn } from "@/lib/utils";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Law = "product" | "quotient" | "power" | "rational";

function Tiles({ count, tone = "brand", struck = 0, label }: { count: number; tone?: "brand" | "trig" | "geometry"; struck?: number; label?: string }) {
  const bg = tone === "brand" ? "var(--t-algebra)" : tone === "trig" ? "var(--t-trig)" : "var(--t-geometry)";
  return (
    <div className="flex flex-wrap items-center gap-1" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cn("grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-bold text-white italic shadow-sm transition", i < struck && "opacity-30 line-through")} style={{ background: bg }}>a</span>
      ))}
      {count === 0 && <span className="font-display text-lg font-bold">1</span>}
    </div>
  );
}

/**
 * See WHY the exponent laws work: a^m is just m a's multiplied together.
 * Merge, cancel and group the tiles – the zero and negative exponent rules
 * fall out of the quotient law on their own.
 */
export function ExponentLaws({ law: initial = "product" }: { law?: Law }) {
  const [law, setLaw] = useState<Law>(initial);
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  const [root, setRoot] = useState(3);
  const [base, setBase] = useState(8);

  const bases = root === 2 ? [4, 9, 16, 25, 36, 49] : [8, 27, 64, 125];
  const b = bases.includes(base) ? base : bases[0];
  const r = Math.round(b ** (1 / root));

  return (
    <WidgetFrame title="Exponent laws, visualised" colour="var(--t-algebra)" instruction="An exponent counts how many times a number is multiplied by itself. Change m and n and watch the tiles.">
      <Segmented colour="var(--t-algebra)" value={law} onChange={setLaw} options={[{ id: "product", label: "Multiply" }, { id: "quotient", label: "Divide" }, { id: "power", label: "Power of a power" }, { id: "rational", label: "Fraction exponents" }]} />
      {law !== "rational" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-3">
            <Slider label={<Tex tex="m" />} value={m} min={law === "quotient" ? 0 : 1} max={6} onChange={setM} colour="var(--t-algebra)" />
            <Slider label={<Tex tex="n" />} value={n} min={law === "quotient" ? 0 : 1} max={law === "power" ? 4 : 6} onChange={setN} colour="var(--t-trig)" />
          </div>
          <div className="min-w-0 space-y-3 rounded-xl bg-surface-2 p-4">
            {law === "product" && (
              <>
                <div className="flex flex-wrap items-center gap-2"><Tiles count={m} label={`a to the ${m}`} /><span className="text-xl font-bold">×</span><Tiles count={n} tone="trig" label={`a to the ${n}`} /></div>
                <div className="text-sm text-muted">Count all the a&apos;s: {m} + {n} = {m + n}</div>
                <Tiles count={m + n} />
                <Tex display tex={`a^{${m}} \\times a^{${n}} = a^{${m} + ${n}} = a^{${m + n}}`} />
                <p className="text-center text-sm font-semibold text-brand">Same base, multiplying → ADD the exponents.</p>
              </>
            )}
            {law === "quotient" && (
              <>
                <div className="inline-flex flex-col items-start gap-2">
                  <Tiles count={m} struck={Math.min(m, n)} label="numerator" />
                  <div className="h-0.5 w-full min-w-24 bg-fg" />
                  <Tiles count={n} tone="trig" struck={Math.min(m, n)} label="denominator" />
                </div>
                <div className="text-sm text-muted">Cancel pairs: {Math.min(m, n)} a&apos;s cancel top and bottom.</div>
                {m > n && <Tex display tex={`\\frac{a^{${m}}}{a^{${n}}} = a^{${m} - ${n}} = a^{${m - n}}`} />}
                {m === n && <Tex display tex={`\\frac{a^{${m}}}{a^{${n}}} = a^{${m} - ${n}} = a^{0} = 1`} />}
                {m < n && <Tex display tex={`\\frac{a^{${m}}}{a^{${n}}} = \\frac{1}{a^{${n - m}}} \\quad\\text{but also}\\quad a^{${m} - ${n}} = a^{${m - n}}`} />}
                <p className="text-center text-sm font-semibold text-brand">
                  {m === n ? "Everything cancels – that's why a⁰ = 1." : m < n ? `So a^${m - n} = 1/a^${n - m}: a negative exponent means "one over".` : "Same base, dividing → SUBTRACT the exponents."}
                </p>
              </>
            )}
            {law === "power" && (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl font-light">(</span>
                  <Tiles count={m} />
                  <span className="text-2xl font-light">)</span><sup className="text-lg font-bold text-trig">{n}</sup>
                </div>
                <div className="text-sm text-muted">{n} groups of {m} a&apos;s:</div>
                <div className="flex flex-wrap gap-3">{Array.from({ length: n }, (_, i) => <div key={i} className="rounded-xl border-2 border-dashed border-trig/50 p-1"><Tiles count={m} /></div>)}</div>
                <Tex display tex={`\\left(a^{${m}}\\right)^{${n}} = a^{${m} \\times ${n}} = a^{${m * n}}`} />
                <p className="text-center text-sm font-semibold text-brand">Power of a power → MULTIPLY the exponents.</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-sm font-semibold">Root (denominator)</div>
              <Segmented colour="var(--t-algebra)" value={String(root)} onChange={(v) => setRoot(Number(v))} options={[{ id: "2", label: "square root (2)" }, { id: "3", label: "cube root (3)" }]} />
            </div>
            <div>
              <div className="mb-1 text-sm font-semibold">Base</div>
              <Segmented colour="var(--t-trig)" value={String(b)} onChange={(v) => setBase(Number(v))} options={bases.map((x) => ({ id: String(x), label: String(x) }))} />
            </div>
            <Slider label={<>power <Tex tex="m" /> (numerator)</>} value={m} min={1} max={3} onChange={setM} colour="var(--t-algebra)" />
          </div>
          <div className="min-w-0 rounded-xl bg-surface-2 p-4">
            <Tex display tex={`${b}^{\\frac{${m}}{${root}}} = \\left(\\sqrt${root === 3 ? "[3]" : ""}{${b}}\\right)^{${m}} = ${r}^{${m}} = ${r ** m}`} />
            <p className="mt-2 text-center text-sm font-semibold text-brand">The bottom of the fraction is the root, the top is the power. Root first – the numbers stay small.</p>
            <p className="mt-1 text-center text-sm text-muted">Memory hook: <strong>“flower power”</strong> – the root (bottom) is under the ground, the power (top) is the flower.</p>
          </div>
        </div>
      )}
    </WidgetFrame>
  );
}
