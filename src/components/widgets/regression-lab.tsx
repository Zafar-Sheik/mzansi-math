"use client";
import { useEffect, useRef, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot, Segment } from "@/components/math/plot";
import { describeR, regression, sum } from "@/lib/math/stats";
import { addXp, bumpStat } from "@/lib/progress";
import { Slider, Toggle, WidgetFrame } from "./widget-frame";

type Pt = [number, number];
const START: Pt[] = [[1, 42], [2, 48], [3, 51], [4, 60], [5, 58], [6, 69], [7, 72], [8, 79]];
const nt = (v: number) => (Math.round(v * 100) / 100).toString().replace(".", "{,}");

/**
 * Scatter plot with draggable points. Fit your own line with the sliders and
 * compare its sum of squared residuals with the least squares line – the one
 * line that makes that sum as small as possible. r updates as you drag.
 */
export function RegressionLab() {
  const [pts, setPts] = useState<Pt[]>(START);
  const [a, setA] = useState(30);
  const [b, setB] = useState(6);
  const [showBest, setShowBest] = useState(false);
  const [showRes, setShowRes] = useState(true);
  const [won, setWon] = useState(false);
  const drag = useRef<number | null>(null);
  const used = useRef(false);
  const touch = () => {
    if (!used.current) { used.current = true; bumpStat("toolsUsed"); }
  };

  const onDrag = (p: { x: number; y: number }, phase: "down" | "move" | "up") => {
    if (phase === "down") {
      const near = pts.map(([x, y], i) => ({ i, d: Math.hypot((x - p.x) * 10, y - p.y) })).sort((u, v) => u.d - v.d)[0];
      drag.current = near.d < 8 ? near.i : null;
      if (drag.current !== null) touch();
    }
    if (phase === "up") { drag.current = null; return; }
    if (drag.current !== null) {
      const i = drag.current;
      const y = Math.max(0, Math.min(100, Math.round(p.y)));
      setPts((s) => (s[i][1] === y ? s : s.map((q, k) => (k === i ? [q[0], y] : q))));
    }
  };

  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const best = regression(xs, ys);
  const ssr = (A: number, B: number) => sum(pts.map(([x, y]) => (y - (A + B * x)) ** 2));
  const mine = ssr(a, b), min = ssr(best.a, best.b);
  const close = mine <= min * 1.05 + 0.5;
  useEffect(() => {
    if (close && !won && used.current) {
      setWon(true);
      addXp(15, "Line of best fit");
    }
  }, [close, won]);

  return (
    <WidgetFrame title="Regression & correlation" colour="var(--t-stats)" instruction="Drag the points up and down. Use the sliders to fit your own line – can you get your squared residuals as low as the least squares line?">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <Plot view={{ xMin: 0, xMax: 9, yMin: 0, yMax: 100 }} width={520} height={320} xStep={1} yStep={10} xLabel="hours studied" yLabel="mark" label="Scatter plot with lines" className="w-full" onDrag={onDrag}>
            {showRes && pts.map(([x, y], i) => <Segment key={i} x1={x} y1={y} x2={x} y2={a + b * x} colour="var(--danger)" width={1.5} dashed />)}
            <Curve f={(x) => a + b * x} colour="var(--curve-3)" width={2.5} />
            {showBest && <Curve f={(x) => best.a + best.b * x} colour="var(--success)" width={3} />}
            {pts.map(([x, y], i) => <Dot key={i} x={x} y={y} r={6} colour="var(--t-stats)" />)}
          </Plot>
          <p className="text-center text-xs text-muted"><span style={{ color: "var(--curve-3)" }}>— your line</span>{showBest && <span style={{ color: "var(--success)" }}> · — least squares line</span>}{showRes && <span style={{ color: "var(--danger)" }}> · - - residuals</span>}</p>
        </div>
        <div className="space-y-3">
          <Slider label={<>your <Tex tex="a" /> (y-intercept)</>} value={a} min={0} max={80} onChange={(v) => { touch(); setA(v); }} colour="var(--curve-3)" />
          <Slider label={<>your <Tex tex="b" /> (gradient)</>} value={b} min={-10} max={15} step={0.5} onChange={(v) => { touch(); setB(v); }} colour="var(--curve-3)" />
          <Toggle on={showRes} onChange={setShowRes}>Residuals</Toggle> <Toggle on={showBest} onChange={setShowBest}>Least squares line</Toggle>
          <div className="space-y-1 rounded-xl bg-surface-2 p-3 text-sm">
            <div>Your <Tex tex="\sum (y - \hat{y})^2 = " /> <strong>{Math.round(mine)}</strong></div>
            <div>Best possible: <strong>{Math.round(min)}</strong></div>
            <p className="font-semibold" style={{ color: close ? "var(--success)" : "var(--text-muted)" }}>{close ? "✓ That's the line of best fit!" : "Make the red residuals smaller…"}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        {showBest ? <Tex display tex={`\\hat{y} = ${nt(best.a)} ${best.b < 0 ? "-" : "+"} ${nt(Math.abs(best.b))}x \\qquad r = ${nt(best.r)}`} /> : <Tex display tex={`r = ${nt(best.r)}`} />}
        <p className="text-center">That is a <strong>{describeR(best.r)}</strong> correlation{best.r > 0.1 ? " – more hours, higher marks." : best.r < -0.1 ? " – more hours, lower marks?!" : "."}</p>
        <p className="text-center text-muted">Exams: enter the data in your calculator (STAT → A+BX) and read A, B and r. Use the line to predict only inside the range of the data (interpolation).</p>
      </div>
    </WidgetFrame>
  );
}
