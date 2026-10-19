"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot } from "@/components/math/plot";
import { quadTex, simplifySurd, surdTex } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Mode = "formula" | "discriminant" | "square";
const r2 = (v: number) => String(Math.round(v * 100) / 100);

/** Nature of roots from Δ, in CAPS language. */
export function nature(D: number): { label: string; colour: string; roots: number } {
  if (D < 0) return { label: "non-real (no x-intercepts)", colour: "var(--danger)", roots: 0 };
  if (D === 0) return { label: "real, rational and equal (touches the x-axis)", colour: "var(--warning)", roots: 1 };
  const s = Math.sqrt(D);
  return Number.isInteger(s)
    ? { label: "real, rational and unequal", colour: "var(--success)", roots: 2 }
    : { label: "real, irrational and unequal", colour: "var(--info)", roots: 2 };
}

/**
 * ax² + bx + c = 0 three ways: the quadratic formula worked out live, the
 * discriminant and the nature of the roots, and completing the square.
 */
export function QuadraticLab({ mode: initial = "formula" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const [touched, setTouched] = useState(false);
  const D = b * b - 4 * a * c;
  const nat = nature(D);
  const f = (x: number) => a * x * x + b * x + c;
  const tpx = -b / (2 * a);
  const tpy = f(tpx);
  const roots = D >= 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y) : [];
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!touched) {
      setTouched(true);
      bumpStat("toolsUsed");
    }
  };

  const { k, m } = D > 0 ? simplifySurd(D) : { k: 0, m: 1 };
  const exact = D > 0 && m !== 1 ? `x = \\dfrac{${-b} \\pm ${surdTex(k, m)}}{${2 * a}}` : null;

  return (
    <WidgetFrame title="Quadratic lab" colour="var(--t-algebra)" instruction="Change a, b and c. Watch the roots, the discriminant and the graph move together.">
      <Segmented colour="var(--t-algebra)" value={mode} onChange={setMode} options={[{ id: "formula", label: "Quadratic formula" }, { id: "discriminant", label: "Discriminant" }, { id: "square", label: "Completing the square" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-3">
          <div className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-center text-lg"><Tex tex={`${quadTex(a, b, c)} = 0`} /></div>
          <Plot view={{ xMin: -8, xMax: 8, yMin: -10, yMax: 10 }} label="Graph of the quadratic" className="w-full">
            <Guide x={tpx} />
            <Curve f={f} width={3} />
            {roots.map((r, i) => <Dot key={i} x={r} y={0} colour={nat.colour} label={`x = ${r2(r)}`} dy={i === 0 ? 18 : -10} />)}
            <Dot x={tpx} y={tpy} colour="var(--curve-2)" r={4} hollow />
          </Plot>
        </div>
        <div className="space-y-3">
          <Slider label={<Tex tex="a" />} value={a} min={-4} max={4} step={1} onChange={touch((v) => setA(v === 0 ? (a > 0 ? -1 : 1) : v))} colour="var(--curve-1)" />
          <Slider label={<Tex tex="b" />} value={b} min={-10} max={10} onChange={touch(setB)} colour="var(--curve-3)" />
          <Slider label={<Tex tex="c" />} value={c} min={-10} max={10} onChange={touch(setC)} colour="var(--curve-2)" />
          <div className="rounded-xl border-2 p-3 text-sm" style={{ borderColor: nat.colour }}>
            <div><Tex tex={`\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${D}`} /></div>
            <div className="mt-1 font-semibold" style={{ color: nat.colour }}>Roots are {nat.label}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        {mode === "formula" && (
          <div className="space-y-1">
            <Tex display tex={`x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\dfrac{-(${b}) \\pm \\sqrt{${D}}}{2(${a})}`} />
            {D < 0 ? <p className="text-center font-semibold text-danger">√ of a negative number → no real solutions.</p> : (
              <>
                {exact && <Tex display tex={exact} />}
                <Tex display tex={D === 0 ? `x = ${r2(roots[0])}` : `x = ${r2(roots[0])} \\quad \\text{or} \\quad x = ${r2(roots[1])}`} />
              </>
            )}
          </div>
        )}
        {mode === "discriminant" && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              ["\\Delta < 0", "non-real roots", "var(--danger)", D < 0],
              ["\\Delta = 0", "real, rational, equal", "var(--warning)", D === 0],
              ["\\Delta > 0 \\text{ and a perfect square}", "real, rational, unequal", "var(--success)", D > 0 && Number.isInteger(Math.sqrt(D))],
              ["\\Delta > 0 \\text{ not a perfect square}", "real, irrational, unequal", "var(--info)", D > 0 && !Number.isInteger(Math.sqrt(D))],
            ].map(([cond, label, col, on]) => (
              <li key={String(cond)} className={cn("rounded-lg border-2 p-2 transition", on ? "" : "border-transparent opacity-50")} style={on ? { borderColor: String(col) } : undefined}>
                <Tex tex={String(cond)} /> <span className="font-semibold" style={{ color: String(col) }}>→ {String(label)}</span>
              </li>
            ))}
          </ul>
        )}
        {mode === "square" && (
          <div className="space-y-1">
            <Tex display tex={`${quadTex(a, b, c)} = 0`} />
            {a !== 1 && <Tex display tex={`x^2 ${b / a >= 0 ? "+" : "-"} ${r2(Math.abs(b / a))}x ${c / a >= 0 ? "+" : "-"} ${r2(Math.abs(c / a))} = 0 \\quad (\\div ${a})`} />}
            <Tex display tex={`\\left(x ${b / (2 * a) >= 0 ? "+" : "-"} ${r2(Math.abs(b / (2 * a)))}\\right)^2 = ${r2((b / (2 * a)) ** 2)} ${c / a >= 0 ? "-" : "+"} ${r2(Math.abs(c / a))} = ${r2(D / (4 * a * a))}`} />
            {D < 0 ? <p className="text-center font-semibold text-danger">A square can&apos;t be negative → no real solutions.</p> : <Tex display tex={`x = ${r2(-b / (2 * a))} \\pm \\sqrt{${r2(D / (4 * a * a))}} \\Rightarrow x = ${roots.map(r2).join(" \\text{ or } ")}`} />}
            <p className="text-center text-xs text-muted">Turning point form: <Tex tex={`y = ${a === 1 ? "" : a === -1 ? "-" : a}\\left(x ${tpx <= 0 ? "+" : "-"} ${r2(Math.abs(tpx))}\\right)^2 ${tpy >= 0 ? "+" : "-"} ${r2(Math.abs(tpy))}`} /></p>
          </div>
        )}
      </div>
    </WidgetFrame>
  );
}
