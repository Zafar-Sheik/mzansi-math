"use client";
import { useMemo } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot, type View } from "@/components/math/plot";
import { evaluate, parse } from "@/lib/math/expr";

export interface SketchProps {
  title?: string;
  view?: View;
  /** Functions of x in checker syntax, e.g. "-(x-1)^2 + 4" or "3/(x+1) - 2". `label` is LaTeX. */
  curves: { expr: string; label?: string; colour?: string; from?: number; to?: number; dashed?: boolean }[];
  points?: { x: number; y: number; label?: string }[];
  guides?: { x?: number; y?: number; label?: string }[];
  caption?: string;
}

const COLOURS = ["var(--curve-1)", "var(--curve-2)", "var(--curve-3)"];

/** A static, labelled sketch (exam figures and lesson diagrams) drawn from formulas. */
export function Sketch({ title, view = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }, curves, points = [], guides = [], caption }: SketchProps) {
  const fns = useMemo(() => curves.map((c) => {
    const tree = parse(c.expr, ["x"]);
    return (x: number) => evaluate(tree, { x });
  }), [curves]);
  return (
    <figure className="rounded-2xl border border-line bg-surface p-3">
      {title && <figcaption className="mb-2 font-display font-bold">{title}</figcaption>}
      <div className="mx-auto max-w-xl">
        <Plot view={view} label={title ?? "Sketch"} className="w-full">
          {guides.map((g, i) => <Guide key={i} x={g.x} y={g.y} label={g.label} />)}
          {fns.map((f, i) => <Curve key={i} f={f} colour={curves[i].colour ?? COLOURS[i % 3]} from={curves[i].from} to={curves[i].to} dashed={curves[i].dashed} />)}
          {points.map((p, i) => <Dot key={i} x={p.x} y={p.y} label={p.label} colour="var(--text)" r={4} />)}
        </Plot>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
        {curves.filter((c) => c.label).map((c, i) => <span key={i} className="flex items-center gap-1.5"><span className="h-1 w-5 rounded-full" style={{ background: c.colour ?? COLOURS[i % 3] }} /><Tex tex={c.label!} /></span>)}
      </div>
      {caption && <p className="mt-1 text-center text-xs text-muted">{caption}</p>}
    </figure>
  );
}
