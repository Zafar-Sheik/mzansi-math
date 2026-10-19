"use client";
import { useMemo, useState } from "react";
import { Crosshair, RefreshCw, Target } from "lucide-react";
import { addXp, bumpStat } from "@/lib/progress";
import { cn, seededRandom } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot, type View } from "@/components/math/plot";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

export type Family = "line" | "parabola" | "hyperbola" | "exponential";
export interface Params { a: number; p: number; q: number; b: number }

const VIEW: View = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const BASES = [{ v: 1 / 3, tex: "\\left(\\tfrac{1}{3}\\right)" }, { v: 0.5, tex: "\\left(\\tfrac{1}{2}\\right)" }, { v: 2, tex: "2" }, { v: 3, tex: "3" }];

const n = (v: number) => String(Math.round(v * 100) / 100);
const coef = (a: number) => (a === 1 ? "" : a === -1 ? "-" : n(a));
const plus = (v: number) => (v === 0 ? "" : v > 0 ? ` + ${n(v)}` : ` - ${n(-v)}`);
const inner = (p: number) => (p === 0 ? "x" : `x${plus(p)}`);
const baseTex = (b: number) => BASES.find((x) => x.v === b)?.tex ?? n(b);

export function evaluator(family: Family, { a, p, q, b }: Params) {
  switch (family) {
    case "line": return (x: number) => a * x + q;
    case "parabola": return (x: number) => a * (x + p) ** 2 + q;
    case "hyperbola": return (x: number) => (Math.abs(x + p) < 1e-9 ? NaN : a / (x + p) + q);
    case "exponential": return (x: number) => a * b ** (x + p) + q;
  }
}

export function equationTex(family: Family, { a, p, q, b }: Params) {
  switch (family) {
    case "line": return `y = ${a === 0 ? (q === 0 ? "0" : n(q)) : `${coef(a)}x${plus(q)}`}`;
    case "parabola": return `y = ${coef(a)}${p === 0 ? "x^2" : `(${inner(p)})^2`}${plus(q)}`;
    case "hyperbola": return `y = \\dfrac{${n(a)}}{${inner(p)}}${plus(q)}`;
    case "exponential": return `y = ${a === 1 ? "" : a === -1 ? "-" : `${n(a)} \\cdot `}${baseTex(b)}^{${inner(p)}}${plus(q)}`;
  }
}

/** Domain, range, intercepts, turning points, asymptotes – exactly what a "sketch" question asks for. */
export function features(family: Family, prm: Params) {
  const { a, p, q, b } = prm;
  const f = evaluator(family, prm);
  const rows: [string, string][] = [];
  const dots: { x: number; y: number; label: string }[] = [];
  const guides: { x?: number; y?: number; label: string }[] = [];
  const yInt = f(0);
  if (Number.isFinite(yInt)) {
    rows.push(["y-intercept", `(0;\\ ${n(yInt)})`]);
    dots.push({ x: 0, y: yInt, label: `(0; ${n(yInt)})` });
  }
  if (family === "line") {
    rows.unshift(["Gradient", `m = ${n(a)}`]);
    if (a !== 0) {
      rows.push(["x-intercept", `(${n(-q / a)};\\ 0)`]);
      dots.push({ x: -q / a, y: 0, label: `(${n(-q / a)}; 0)` });
    }
    rows.push(["Domain", "x \\in \\mathbb{R}"], ["Range", a === 0 ? `y = ${n(q)}` : "y \\in \\mathbb{R}"]);
  }
  if (family === "parabola") {
    rows.unshift(["Turning point", `(${n(-p)};\\ ${n(q)})`], ["Axis of symmetry", `x = ${n(-p)}`]);
    dots.push({ x: -p, y: q, label: `TP (${n(-p)}; ${n(q)})` });
    guides.push({ x: -p, label: `x = ${n(-p)}` });
    const k = -q / a;
    if (k > 0) {
      const r = Math.sqrt(k);
      rows.push(["x-intercepts", `(${n(-p - r)};\\ 0),\\ (${n(-p + r)};\\ 0)`]);
      dots.push({ x: -p - r, y: 0, label: "" }, { x: -p + r, y: 0, label: "" });
    } else if (k === 0) rows.push(["x-intercept", `(${n(-p)};\\ 0) \\text{ (touches)}`]);
    else rows.push(["x-intercepts", "\\text{none}"]);
    rows.push(["Domain", "x \\in \\mathbb{R}"], ["Range", a > 0 ? `y \\geq ${n(q)}` : `y \\leq ${n(q)}`]);
  }
  if (family === "hyperbola") {
    rows.unshift(["Asymptotes", `x = ${n(-p)};\\ y = ${n(q)}`], ["Axes of symmetry", `y = x${plus(p + q)};\\ y = -x${plus(q - p)}`]);
    guides.push({ x: -p, label: `x = ${n(-p)}` }, { y: q, label: `y = ${n(q)}` });
    if (q !== 0) {
      const xi = -p - a / q;
      rows.push(["x-intercept", `(${n(xi)};\\ 0)`]);
      dots.push({ x: xi, y: 0, label: `(${n(xi)}; 0)` });
    } else rows.push(["x-intercept", "\\text{none}"]);
    rows.push(["Domain", `x \\neq ${n(-p)}`], ["Range", `y \\neq ${n(q)}`]);
  }
  if (family === "exponential") {
    rows.unshift(["Asymptote", `y = ${n(q)}`]);
    guides.push({ y: q, label: `y = ${n(q)}` });
    const k = -q / a;
    if (k > 0) {
      const xi = Math.log(k) / Math.log(b) - p;
      rows.push(["x-intercept", `(${n(xi)};\\ 0)`]);
      dots.push({ x: xi, y: 0, label: "" });
    } else rows.push(["x-intercept", "\\text{none}"]);
    const increasing = (a > 0) === (b > 1);
    rows.push(["Domain", "x \\in \\mathbb{R}"], ["Range", a > 0 ? `y > ${n(q)}` : `y < ${n(q)}`], ["Shape", `\\text{${increasing ? "increasing" : "decreasing"}}`]);
  }
  return { rows, dots, guides };
}

const PARENT: Record<Family, Params> = {
  line: { a: 1, p: 0, q: 0, b: 2 },
  parabola: { a: 1, p: 0, q: 0, b: 2 },
  hyperbola: { a: 1, p: 0, q: 0, b: 2 },
  exponential: { a: 1, p: 0, q: 0, b: 2 },
};

/** A random "nice" target graph for the matching challenge. */
export function randomTarget(family: Family, seed: number): Params {
  const r = seededRandom(seed);
  const pick = <T,>(xs: T[]) => xs[Math.floor(r() * xs.length)];
  const int = (lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));
  switch (family) {
    case "line": return { a: pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]), p: 0, q: int(-6, 6), b: 2 };
    case "parabola": return { a: pick([-2, -1, -0.5, 0.5, 1, 2]), p: int(-5, 5), q: int(-6, 6), b: 2 };
    case "hyperbola": return { a: pick([-4, -2, -1, 1, 2, 4]), p: int(-4, 4), q: int(-5, 5), b: 2 };
    case "exponential": return { a: pick([-2, -1, 1, 2]), p: int(-3, 3), q: int(-5, 5), b: pick([0.5, 2, 3]) };
  }
}

const same = (x: Params, y: Params, family: Family) =>
  Math.abs(x.a - y.a) < 1e-9 && Math.abs(x.q - y.q) < 1e-9 && (family === "line" || Math.abs(x.p - y.p) < 1e-9) && (family !== "exponential" || x.b === y.b);

export function FunctionGrapher({ family: initialFamily = "parabola", families = ["line", "parabola", "hyperbola", "exponential"], challenge: startChallenge = false, title }: {
  family?: Family; families?: Family[]; challenge?: boolean; title?: string;
}) {
  const [family, setFamily] = useState<Family>(initialFamily);
  const [prm, setPrm] = useState<Params>({ a: 1, p: 0, q: 0, b: 2 });
  const [ghost, setGhost] = useState(true);
  const [showFeatures, setShowFeatures] = useState(true);
  const [trace, setTrace] = useState<{ x: number; y: number } | null>(null);
  const [challenge, setChallenge] = useState(startChallenge);
  const [seed, setSeed] = useState(1);
  const [matched, setMatched] = useState(0);
  const [won, setWon] = useState(false);

  const f = useMemo(() => evaluator(family, prm), [family, prm]);
  const parent = useMemo(() => evaluator(family, PARENT[family]), [family]);
  const target = useMemo(() => randomTarget(family, seed), [family, seed]);
  const targetF = useMemo(() => evaluator(family, target), [family, target]);
  const feats = features(family, prm);
  const colour = "var(--curve-1)";

  const set = (k: keyof Params, v: number) => {
    const next = { ...prm, [k]: v };
    if ((k === "a") && v === 0 && family !== "line") next.a = prm.a > 0 ? -0.5 : 0.5;
    setPrm(next);
    if (challenge && !won && same(next, target, family)) {
      setWon(true);
      setMatched((m) => m + 1);
      bumpStat("toolsUsed");
      addXp(10, "Graph matched");
    }
  };
  const switchFamily = (fam: Family) => {
    setFamily(fam);
    setPrm({ a: 1, p: 0, q: 0, b: 2 });
    setWon(false);
  };
  const nextTarget = () => {
    setSeed((s) => s + 1);
    setPrm({ a: 1, p: 0, q: 0, b: 2 });
    setWon(false);
  };

  const traceY = trace ? f(trace.x) : NaN;

  return (
    <WidgetFrame title={title ?? (challenge ? "Graph match challenge" : "Function grapher")} colour="var(--t-algebra)"
      instruction={challenge ? "Move the sliders until your graph sits exactly on the dashed target graph." : "Drag the sliders and watch what each parameter does. Tap the graph to trace a point."}>
      <div className="flex flex-wrap items-center gap-2">
        {families.length > 1 && <Segmented colour="var(--t-algebra)" value={family} onChange={switchFamily} options={families.map((x) => ({ id: x, label: x === "line" ? "Straight line" : x[0].toUpperCase() + x.slice(1) }))} />}
        <div className="ml-auto flex flex-wrap gap-1.5">
          <Toggle on={challenge} onChange={(v) => { setChallenge(v); setWon(false); setPrm({ a: 1, p: 0, q: 0, b: 2 }); }}><Target className="mr-1 inline h-3.5 w-3.5" />Challenge</Toggle>
          {!challenge && <Toggle on={ghost} onChange={setGhost}>Parent graph</Toggle>}
          {!challenge && <Toggle on={showFeatures} onChange={setShowFeatures}>Features</Toggle>}
        </div>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className={cn("mb-2 rounded-xl border px-3 py-2 text-center text-lg transition", won ? "border-success bg-success/10" : "border-line bg-surface-2")}>
            <Tex tex={equationTex(family, prm)} />
          </div>
          <Plot view={VIEW} label={`Graph of ${equationTex(family, prm)}`} onPoint={challenge ? undefined : setTrace} className="w-full">
            {ghost && !challenge && <Curve f={parent} colour="var(--curve-ghost)" dashed width={2} />}
            {challenge && <Curve f={targetF} colour="var(--curve-3)" dashed width={3} />}
            {!challenge && showFeatures && feats.guides.map((g, i) => <Guide key={i} x={g.x} y={g.y} label={g.label} />)}
            <Curve f={f} colour={colour} width={3} />
            {!challenge && showFeatures && feats.dots.map((d, i) => <Dot key={i} x={d.x} y={d.y} label={d.label || undefined} colour="var(--curve-2)" r={4} />)}
            {trace && Number.isFinite(traceY) && <Dot x={trace.x} y={traceY} colour="var(--memory)" label={`(${n(trace.x)}; ${n(traceY)})`} />}
          </Plot>
          {!challenge && <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Crosshair className="h-3.5 w-3.5" /> Tap or drag on the graph to trace it.</p>}
        </div>

        <div className="space-y-3">
          {family === "line" ? (
            <>
              <Slider label={<>gradient <Tex tex="m" /></>} value={prm.a} min={-5} max={5} step={0.5} onChange={(v) => set("a", v)} colour={colour} />
              <Slider label={<>y-intercept <Tex tex="c" /></>} value={prm.q} min={-8} max={8} step={0.5} onChange={(v) => set("q", v)} colour="var(--curve-2)" />
            </>
          ) : (
            <>
              <Slider label={<><Tex tex="a" /> {family === "parabola" ? "(stretch & flip)" : family === "hyperbola" ? "(quadrants & stretch)" : "(stretch & reflect)"}</>} value={prm.a} min={family === "parabola" ? -3 : family === "hyperbola" ? -6 : -3} max={family === "parabola" ? 3 : family === "hyperbola" ? 6 : 3} step={family === "parabola" ? 0.25 : 0.5} onChange={(v) => set("a", v)} colour={colour} />
              <Slider label={<><Tex tex="p" /> (shift left/right)</>} value={prm.p} min={-6} max={6} step={0.5} onChange={(v) => set("p", v)} colour="var(--curve-3)" />
              <Slider label={<><Tex tex="q" /> (shift up/down)</>} value={prm.q} min={-8} max={8} step={0.5} onChange={(v) => set("q", v)} colour="var(--curve-2)" />
              {family === "exponential" && (
                <div>
                  <div className="mb-1 text-sm font-semibold">base <Tex tex="b" /></div>
                  <Segmented colour="var(--t-algebra)" value={String(prm.b)} onChange={(v) => set("b", Number(v))} options={BASES.map((x) => ({ id: String(x.v), label: <Tex tex={x.tex.replace(/\\left\(|\\right\)/g, "")} /> }))} />
                </div>
              )}
            </>
          )}

          {challenge ? (
            <div className="rounded-xl border border-line bg-surface-2 p-3 text-sm" role="status">
              {won ? (
                <>
                  <div className="font-display text-lg font-bold text-success">🎯 Matched! +10 XP</div>
                  <p className="text-muted">The target was <Tex tex={equationTex(family, target)} />.</p>
                  <Button size="sm" className="mt-2" onClick={nextTarget}><RefreshCw className="h-4 w-4" /> Next target</Button>
                </>
              ) : (
                <>
                  <div className="font-semibold">Hit the dashed orange graph.</div>
                  <p className="text-muted">Tip: find a feature you can read off (turning point, asymptote, intercept) and set that first.</p>
                  <button className="mt-2 text-xs text-brand hover:underline" onClick={nextTarget}>Skip this one</button>
                </>
              )}
              <div className="mt-2 text-xs text-muted">Matched this session: <strong className="text-fg">{matched}</strong></div>
            </div>
          ) : (
            showFeatures && (
              <dl className="space-y-1 rounded-xl border border-line bg-surface-2 p-3 text-sm">
                {feats.rows.map(([k, v]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-x-2"><dt className="text-muted">{k}</dt><dd><Tex tex={v} /></dd></div>
                ))}
              </dl>
            )
          )}
        </div>
      </div>
    </WidgetFrame>
  );
}
