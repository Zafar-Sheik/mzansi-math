"use client";
import dynamic from "next/dynamic";
import type { WidgetName } from "@/content/types";

const loading = () => <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface-2" />;

/** Widgets are code-split so each lesson only downloads what it uses. */
const REGISTRY: Record<WidgetName, React.ComponentType<Record<string, unknown>>> = {
  sorter: dynamic(() => import("./sorter").then((m) => m.Sorter as never), { loading }),
  drill: dynamic(() => import("./drill").then((m) => m.Drill as never), { loading }),
  "function-grapher": dynamic(() => import("./function-grapher").then((m) => m.FunctionGrapher as never), { loading }),
  "quadratic-lab": dynamic(() => import("./quadratic-lab").then((m) => m.QuadraticLab as never), { loading }),
  "exponent-laws": dynamic(() => import("./exponent-laws").then((m) => m.ExponentLaws as never), { loading }),
  "surd-simplifier": dynamic(() => import("./surd-simplifier").then((m) => m.SurdSimplifier as never), { loading }),
  "pattern-machine": dynamic(() => import("./pattern-machine").then((m) => m.PatternMachine as never), { loading }),
  "inequality-lab": dynamic(() => import("./inequality-lab").then((m) => m.InequalityLab as never), { loading }),
  "intersection-lab": dynamic(() => import("./intersection-lab").then((m) => m.IntersectionLab as never), { loading }),
  "finance-lab": dynamic(() => import("./finance-lab").then((m) => m.FinanceLab as never), { loading }),
  timeline: dynamic(() => import("./timeline").then((m) => m.Timeline as never), { loading }),
  sketch: dynamic(() => import("./sketch").then((m) => m.Sketch as never), { loading }),
  figure: dynamic(() => import("./figure").then((m) => m.Figure as never), { loading }),
  "coordinate-lab": dynamic(() => import("./coordinate-lab").then((m) => m.CoordinateLab as never), { loading }),
  "circle-theorems": dynamic(() => import("./circle-theorems").then((m) => m.CircleTheorems as never), { loading }),
  "solid-viewer": dynamic(() => import("./solid-viewer").then((m) => m.SolidViewer as never), { loading }),
  "unit-circle": dynamic(() => import("./unit-circle").then((m) => m.UnitCircle as never), { loading }),
  "trig-graph-lab": dynamic(() => import("./trig-graph-lab").then((m) => m.TrigGraphLab as never), { loading }),
  "triangle-solver": dynamic(() => import("./triangle-solver").then((m) => m.TriangleSolver as never), { loading }),
  "series-lab": dynamic(() => import("./series-lab").then((m) => m.SeriesLab as never), { loading }),
  "inverse-lab": dynamic(() => import("./inverse-lab").then((m) => m.InverseLab as never), { loading }),
  "annuity-lab": dynamic(() => import("./annuity-lab").then((m) => m.AnnuityLab as never), { loading }),
  "polynomial-lab": dynamic(() => import("./polynomial-lab").then((m) => m.PolynomialLab as never), { loading }),
  "derivative-lab": dynamic(() => import("./derivative-lab").then((m) => m.DerivativeLab as never), { loading }),
  "cubic-lab": dynamic(() => import("./cubic-lab").then((m) => m.CubicLab as never), { loading }),
  "optimisation-lab": dynamic(() => import("./optimisation-lab").then((m) => m.OptimisationLab as never), { loading }),
  "circle-lab": dynamic(() => import("./circle-lab").then((m) => m.CircleLab as never), { loading }),
  "proportion-lab": dynamic(() => import("./proportion-lab").then((m) => m.ProportionLab as never), { loading }),
  "compound-lab": dynamic(() => import("./compound-lab").then((m) => m.CompoundLab as never), { loading }),
  "heights-lab": dynamic(() => import("./heights-lab").then((m) => m.HeightsLab as never), { loading }),
};

export function Widget({ name, props }: { name: WidgetName; props?: Record<string, unknown> }) {
  const C = REGISTRY[name];
  if (!C) return <p className="text-danger">Unknown widget: {name}</p>;
  return <C {...(props ?? {})} />;
}
