"use client";
import { useRef, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Guide, Plot, Segment, useGraphScale } from "@/components/math/plot";
import { fracTex, simplifySurd, surdTex } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Toggle, WidgetFrame } from "./widget-frame";

type Name = "A" | "B" | "C";
type Pts = Record<Name, [number, number]>;
const r1 = (v: number) => String(Math.round(v * 10) / 10);

/** Arc showing the inclination θ where the line crosses the x-axis. */
function InclinationArc({ x0, theta }: { x0: number; theta: number }) {
  const { sx, sy } = useGraphScale();
  const R = 30;
  const cx = sx(x0), cy = sy(0);
  const t = (theta * Math.PI) / 180;
  const large = theta > 180 ? 1 : 0;
  return (
    <g>
      <path d={`M${cx + R},${cy} A${R},${R} 0 ${large} 0 ${cx + R * Math.cos(t)},${cy - R * Math.sin(t)}`} fill="none" stroke="var(--memory)" strokeWidth={2.5} />
      <text x={cx + (R + 14) * Math.cos(t / 2)} y={cy - (R + 14) * Math.sin(t / 2) + 4} fontSize="12" fontWeight="700" fill="var(--memory)" textAnchor="middle" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">θ</text>
    </g>
  );
}

/**
 * Drag A, B and C around the grid: distance, midpoint, gradient, inclination
 * and the equation of AB update live, plus the parallel / perpendicular line through C.
 */
export function CoordinateLab() {
  const [pts, setPts] = useState<Pts>({ A: [-3, -2], B: [3, 2], C: [2, -4] });
  const [through, setThrough] = useState<"none" | "parallel" | "perpendicular">("perpendicular");
  const [showMid, setShowMid] = useState(true);
  const drag = useRef<Name | null>(null);
  const used = useRef(false);

  const onDrag = (p: { x: number; y: number }, phase: "down" | "move" | "up") => {
    if (phase === "down") {
      const near = (Object.keys(pts) as Name[]).map((n) => ({ n, d: Math.hypot(pts[n][0] - p.x, pts[n][1] - p.y) })).sort((a, b) => a.d - b.d)[0];
      drag.current = near.d < 1.2 ? near.n : null;
      if (drag.current && !used.current) {
        used.current = true;
        bumpStat("toolsUsed");
      }
    }
    if (phase === "up") drag.current = null;
    else if (drag.current) {
      const n = drag.current;
      const x = Math.max(-8, Math.min(8, Math.round(p.x)));
      const y = Math.max(-8, Math.min(8, Math.round(p.y)));
      setPts((s) => (s[n][0] === x && s[n][1] === y ? s : { ...s, [n]: [x, y] }));
    }
  };

  const [A, B, C] = [pts.A, pts.B, pts.C];
  const dx = B[0] - A[0], dy = B[1] - A[1];
  const vertical = dx === 0;
  const m = vertical ? NaN : dy / dx;
  const c = A[1] - m * A[0];
  const d2 = dx * dx + dy * dy;
  const { k, m: rad } = simplifySurd(d2);
  const mid: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  let theta = vertical ? 90 : (Math.atan(m) * 180) / Math.PI;
  if (theta < 0) theta += 180;
  const mTex = vertical ? "\\text{undefined}" : fracTex(dy, dx);
  const cTex = (num: number, den: number) => (num === 0 ? "" : num * den > 0 ? ` + ${fracTex(Math.abs(num), Math.abs(den))}` : ` - ${fracTex(Math.abs(num), Math.abs(den))}`);
  const eqTex = (n: number, d: number, px: number, py: number) => {
    // y = (n/d)x + (py·d − n·px)/d
    if (d === 0) return `x = ${px}`;
    const slope = n === 0 ? "" : n / d === 1 ? "x" : n / d === -1 ? "-x" : `${fracTex(n, d)}x`;
    const cn = py * d - n * px;
    return slope ? `y = ${slope}${cTex(cn, d)}` : `y = ${fracTex(cn, d)}`;
  };
  // Second line through C
  const [pn, pd] = through === "parallel" ? [dy, dx] : [-dx, dy];
  const f2 = (x: number) => (pd === 0 ? NaN : (pn / pd) * (x - C[0]) + C[1]);
  const collinear = (B[0] - A[0]) * (C[1] - A[1]) === (B[1] - A[1]) * (C[0] - A[0]);

  return (
    <WidgetFrame title="Coordinate lab" colour="var(--t-geometry)" instruction="Drag A, B and C (they snap to the grid). Everything is recalculated as you move them.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <Plot view={{ xMin: -8.5, xMax: 8.5, yMin: -8.5, yMax: 8.5 }} width={440} height={440} label="Cartesian plane with points A, B and C" onDrag={onDrag} className="w-full cursor-pointer">
            {vertical ? <Guide x={A[0]} colour="var(--curve-1)" /> : <Curve f={(x) => m * x + c} colour="var(--curve-1)" width={2.5} />}
            {!vertical && m !== 0 && <InclinationArc x0={-c / m} theta={theta} />}
            {through !== "none" && (pd === 0 ? <Guide x={C[0]} colour="var(--curve-2)" /> : <Curve f={f2} colour="var(--curve-2)" width={2.5} dashed />)}
            <Segment x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} colour="var(--curve-1)" width={4} />
            {showMid && <Dot x={mid[0]} y={mid[1]} colour="var(--curve-3)" r={4} label="M" />}
            {(Object.keys(pts) as Name[]).map((n) => <Dot key={n} x={pts[n][0]} y={pts[n][1]} r={7} colour={n === "C" ? "var(--curve-2)" : "var(--curve-1)"} label={`${n}(${pts[n][0]}; ${pts[n][1]})`} />)}
          </Plot>
          <p className="mt-1 text-xs text-muted">Tip: tap near a point and drag. Points snap to whole numbers.</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="space-y-1.5 rounded-xl border border-line bg-surface-2 p-3">
            <div><span className="text-muted">Distance </span><Tex tex={`AB = \\sqrt{(${dx})^2 + (${dy})^2} = ${rad === d2 ? `\\sqrt{${d2}}` : surdTex(k, rad)}${rad === 1 ? "" : ` \\approx ${Math.sqrt(d2).toFixed(2)}`}`} /></div>
            <div><span className="text-muted">Midpoint </span><Tex tex={`M\\left(${fracTex(A[0] + B[0], 2)};\\ ${fracTex(A[1] + B[1], 2)}\\right)`} /></div>
            <div><span className="text-muted">Gradient </span><Tex tex={`m_{AB} = \\dfrac{${dy}}{${dx}} = ${mTex}`} /></div>
            <div><span className="text-muted">Inclination </span><Tex tex={vertical ? "\\theta = 90^\\circ" : `\\tan\\theta = ${mTex} \\Rightarrow \\theta = ${r1(theta)}^\\circ`} /></div>
            <div><span className="text-muted">Line AB </span><Tex tex={eqTex(dy, dx, A[0], A[1])} /></div>
            <Toggle on={showMid} onChange={setShowMid}>Show midpoint</Toggle>
          </div>
          <div className="space-y-2 rounded-xl border border-line p-3">
            <div className="font-semibold">Line through C</div>
            <Segmented colour="var(--t-geometry)" value={through} onChange={setThrough} options={[{ id: "none", label: "None" }, { id: "parallel", label: "Parallel to AB" }, { id: "perpendicular", label: "Perpendicular to AB" }]} />
            {through !== "none" && (
              <div className="space-y-1">
                <Tex tex={eqTex(pn, pd, C[0], C[1])} />
                {through === "perpendicular" && !vertical && dy !== 0 && <div className="text-muted"><Tex tex={`m_{AB} \\times m_{\\perp} = ${mTex} \\times ${fracTex(pn, pd)} = -1`} /></div>}
                {through === "parallel" && <div className="text-muted">Parallel lines have equal gradients.</div>}
              </div>
            )}
            <div className={collinear ? "font-semibold text-success" : "text-muted"}>{collinear ? "A, B and C are collinear (on one straight line)!" : "A, B and C are not collinear."}</div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}
