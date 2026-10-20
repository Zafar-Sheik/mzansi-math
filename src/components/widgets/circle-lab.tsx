"use client";
import { useRef, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { Curve, Dot, Plot, Segment, useGraphScale } from "@/components/math/plot";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Mode = "equation" | "tangent";
const r2 = (v: number) => String(Math.round(v * 100) / 100);
/** (x − a)² for display: x², (x − 3)², (x + 2)². */
const sq = (v: string, a: number) => (a === 0 ? `${v}^2` : `(${v} ${a > 0 ? "-" : "+"} ${Math.abs(a)})^2`);
const term = (k: number, v = "") => (k === 0 ? "" : `${k > 0 ? " + " : " - "}${Math.abs(k) === 1 && v ? "" : Math.abs(k)}${v}`);

function CircleShape({ a, b, r }: { a: number; b: number; r: number }) {
  const { sx, sy } = useGraphScale();
  return <ellipse cx={sx(a)} cy={sy(b)} rx={Math.abs(sx(a + r) - sx(a))} ry={Math.abs(sy(b + r) - sy(b))} fill="var(--curve-1)" fillOpacity={0.06} stroke="var(--curve-1)" strokeWidth={3} />;
}

/**
 * Equation of a circle with any centre, the general form (completing the
 * square in reverse) and the tangent at a point P you drag round the circle.
 */
export function CircleLab({ mode: initial = "equation" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [a, setA] = useState(2);
  const [b, setB] = useState(-1);
  const [r, setR] = useState(5);
  const [t, setT] = useState(53.13);
  const [general, setGeneral] = useState(true);
  const drag = useRef(false);
  const used = useRef(false);
  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    if (!used.current) { used.current = true; bumpStat("toolsUsed"); }
  };

  const P: [number, number] = [a + r * Math.cos((t * Math.PI) / 180), b + r * Math.sin((t * Math.PI) / 180)];
  const onDrag = (p: { x: number; y: number }, phase: "down" | "move" | "up") => {
    if (phase === "down") drag.current = Math.hypot(p.x - P[0], p.y - P[1]) < 1.5 || Math.abs(Math.hypot(p.x - a, p.y - b) - r) < 1;
    if (phase === "up") { drag.current = false; return; }
    if (drag.current) touch(setT)(Math.round(((Math.atan2(p.y - b, p.x - a) * 180) / Math.PI + 360) % 360));
  };

  const D = -2 * a, E = -2 * b, F = a * a + b * b - r * r;
  const dx = P[0] - a, dy = P[1] - b;
  const vertTangent = Math.abs(dy) < 1e-6;
  const horizTangent = Math.abs(dx) < 1e-6;
  const mRad = dy / dx;
  const mTan = -dx / dy;
  const c = P[1] - mTan * P[0];

  return (
    <WidgetFrame title="Circle & tangent lab" colour="var(--t-geometry)" instruction={mode === "equation" ? "Move the centre and change the radius. Watch both forms of the equation." : "Drag P round the circle. The tangent stays perpendicular to the radius MP."}>
      <Segmented colour="var(--t-geometry)" value={mode} onChange={setMode} options={[{ id: "equation", label: "Equation of a circle" }, { id: "tangent", label: "Tangent at a point" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Plot view={{ xMin: -11, xMax: 11, yMin: -11, yMax: 11 }} width={440} height={440} label="Circle on the Cartesian plane" className="mx-auto w-full max-w-[520px]" onDrag={mode === "tangent" ? onDrag : undefined}>
            <CircleShape a={a} b={b} r={r} />
            <Dot x={a} y={b} label={`M(${a}; ${b})`} colour="var(--curve-2)" />
            {mode === "equation" && <Segment x1={a} y1={b} x2={a + r} y2={b} colour="var(--curve-2)" dashed />}
            {mode === "tangent" && (
              <>
                <Segment x1={a} y1={b} x2={P[0]} y2={P[1]} colour="var(--curve-2)" />
                {vertTangent ? <Segment x1={P[0]} y1={-11} x2={P[0]} y2={11} colour="var(--success)" width={2.5} /> : <Curve f={(x) => mTan * x + c} colour="var(--success)" width={2.5} />}
                <Dot x={P[0]} y={P[1]} r={7} label={`P(${r2(P[0])}; ${r2(P[1])})`} colour="var(--curve-3)" />
              </>
            )}
          </Plot>
        </div>
        <div className="space-y-3">
          <Slider label={<>centre <Tex tex="a" /> (x)</>} value={a} min={-5} max={5} onChange={touch(setA)} colour="var(--curve-2)" />
          <Slider label={<>centre <Tex tex="b" /> (y)</>} value={b} min={-5} max={5} onChange={touch(setB)} colour="var(--curve-2)" />
          <Slider label={<>radius <Tex tex="r" /></>} value={r} min={1} max={6} onChange={touch(setR)} colour="var(--curve-1)" />
          {mode === "tangent" && <Slider label={<>P at angle</>} value={Math.round(t)} min={0} max={359} onChange={touch(setT)} colour="var(--curve-3)" format={(v) => `${v}°`} />}
          {mode === "equation" && <Toggle on={general} onChange={setGeneral}>Show the general form</Toggle>}
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <Tex display tex={`${sq("x", a)} + ${sq("y", b)} = ${r * r}`} />
        {mode === "equation" && general && (
          <>
            <Tex display tex={`x^2${term(D, "x")} + ${a * a} + y^2${term(E, "y")}${b ? ` + ${b * b}` : ""} = ${r * r}`} />
            <Tex display tex={`x^2 + y^2${term(D, "x")}${term(E, "y")}${term(F)} = 0`} />
            <p className="text-center text-muted">Going backwards (general form → centre and radius) is completing the square: add <Tex tex="\left(\tfrac{\text{coefficient}}{2}\right)^2" /> for x and for y.</p>
          </>
        )}
        {mode === "tangent" && (
          <>
            {horizTangent || vertTangent ? (
              <p className="text-center">The radius is {horizTangent ? "vertical" : "horizontal"}, so the tangent is {horizTangent ? <Tex tex={`y = ${r2(P[1])}`} /> : <Tex tex={`x = ${r2(P[0])}`} />}.</p>
            ) : (
              <>
                <Tex display tex={`m_{MP} = \\frac{${r2(P[1])} - (${b})}{${r2(P[0])} - (${a})} = ${r2(mRad)} \\quad\\Rightarrow\\quad m_{\\text{tan}} = -\\frac{1}{${r2(mRad)}} = ${r2(mTan)}`} />
                <Tex display tex={`y = ${r2(mTan)}x ${c < 0 ? "-" : "+"} ${r2(Math.abs(c))}`} />
              </>
            )}
            <p className="text-center text-muted">Reason: tangent ⟂ radius. <Tex tex="m_{\text{tan}} \times m_{MP} = -1" /></p>
          </>
        )}
      </div>
    </WidgetFrame>
  );
}
