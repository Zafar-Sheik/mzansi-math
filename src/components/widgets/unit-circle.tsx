"use client";
import { useRef, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { bumpStat } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Slider, Toggle, WidgetFrame } from "./widget-frame";

const SIZE = 340, CX = 170, CY = 170, R = 120;
const EXACT: Record<number, { sin: string; cos: string; tan: string }> = {
  0: { sin: "0", cos: "1", tan: "0" },
  30: { sin: "\\tfrac{1}{2}", cos: "\\tfrac{\\sqrt{3}}{2}", tan: "\\tfrac{\\sqrt{3}}{3}" },
  45: { sin: "\\tfrac{\\sqrt{2}}{2}", cos: "\\tfrac{\\sqrt{2}}{2}", tan: "1" },
  60: { sin: "\\tfrac{\\sqrt{3}}{2}", cos: "\\tfrac{1}{2}", tan: "\\sqrt{3}" },
  90: { sin: "1", cos: "0", tan: "\\text{undefined}" },
};

/** Reference angle, quadrant and the reduction formula for an angle in [0°; 360°). */
export function reduction(theta: number) {
  const t = ((theta % 360) + 360) % 360;
  if (t === 0 || t === 90 || t === 180 || t === 270) return { quadrant: 0, ref: t % 180 === 0 ? 0 : 90, form: "" };
  if (t < 90) return { quadrant: 1, ref: t, form: `${t}^\\circ` };
  if (t < 180) return { quadrant: 2, ref: 180 - t, form: `180^\\circ - ${180 - t}^\\circ` };
  if (t < 270) return { quadrant: 3, ref: t - 180, form: `180^\\circ + ${t - 180}^\\circ` };
  return { quadrant: 4, ref: 360 - t, form: `360^\\circ - ${360 - t}^\\circ` };
}

/**
 * The trig ratios on the Cartesian plane: drag P around the circle. Watch x,
 * y and r, the signs in each quadrant (CAST) and the reduction to an acute angle.
 */
export function UnitCircle({ start = 150 }: { start?: number }) {
  const [theta, setTheta] = useState(start);
  const [r, setR] = useState(2);
  const [snap, setSnap] = useState(true);
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const used = useRef(false);

  const setFromPointer = (e: React.PointerEvent) => {
    const b = svg.current!.getBoundingClientRect();
    const x = ((e.clientX - b.left) / b.width) * SIZE - CX;
    const y = CY - ((e.clientY - b.top) / b.height) * SIZE;
    let a = (Math.atan2(y, x) * 180) / Math.PI;
    if (a < 0) a += 360;
    a = snap ? Math.round(a / 15) * 15 % 360 : Math.round(a);
    setTheta(a);
    if (!used.current) {
      used.current = true;
      bumpStat("toolsUsed");
    }
  };

  const rad = (theta * Math.PI) / 180;
  const px = CX + R * Math.cos(rad), py = CY - R * Math.sin(rad);
  const x = r * Math.cos(rad), y = r * Math.sin(rad);
  const fmt = (v: number) => (Math.abs(v) < 1e-9 ? "0" : v.toFixed(3).replace(/\.?0+$/, ""));
  const red = reduction(theta);
  const exact = EXACT[red.ref];
  const sign = (f: "sin" | "cos" | "tan") => {
    const v = f === "sin" ? Math.sin(rad) : f === "cos" ? Math.cos(rad) : Math.tan(rad);
    return Math.abs(v) < 1e-9 ? 0 : v > 0 ? 1 : -1;
  };
  const tanUndefined = Math.abs(Math.cos(rad)) < 1e-9;
  const big = (theta * Math.PI) / 180 > Math.PI ? 1 : 0;

  return (
    <WidgetFrame title="CAST & the trig ratios" colour="var(--t-trig)" instruction="Drag P around the circle. sin θ = y/r, cos θ = x/r, tan θ = y/x – the signs of x and y decide the sign of each ratio.">
      <div className="grid gap-4 md:grid-cols-[minmax(0,360px)_1fr]">
        <svg ref={svg} viewBox={`0 0 ${SIZE} ${SIZE}`} className="diagram w-full cursor-pointer touch-none select-none rounded-xl border border-line bg-surface" role="img" aria-label={`Angle of ${theta} degrees on the Cartesian plane`}
          onPointerDown={(e) => { dragging.current = true; svg.current!.setPointerCapture(e.pointerId); setFromPointer(e); }}
          onPointerMove={(e) => dragging.current && setFromPointer(e)}
          onPointerUp={() => { dragging.current = false; }}>
          {[["S", 1, -1], ["A", 1, 1], ["T", -1, -1], ["C", -1, 1]].map(([l, sy, sx]) => {
            const q = l === "A" ? 1 : l === "S" ? 2 : l === "T" ? 3 : 4;
            return <text key={l as string} x={CX + (sx as number) * 130} y={CY - (sy as number) * 130 + 8} textAnchor="middle" fontSize="26" fontWeight="800" fill="var(--t-trig)" opacity={red.quadrant === q ? 1 : 0.25}>{l}</text>;
          })}
          <line x1={10} x2={SIZE - 10} y1={CY} y2={CY} className="axis" />
          <line y1={10} y2={SIZE - 10} x1={CX} x2={CX} className="axis" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--graph-axis)" strokeDasharray="4 4" strokeWidth={1.2} />
          <path d={`M${CX + 28},${CY} A28,28 0 ${big} 0 ${CX + 28 * Math.cos(rad)},${CY - 28 * Math.sin(rad)}`} fill="var(--memory)" fillOpacity={0.15} stroke="var(--memory)" strokeWidth={2.5} />
          <text x={CX + 44 * Math.cos(rad / 2)} y={CY - 44 * Math.sin(rad / 2) + 4} fontSize="13" fontWeight="800" fill="var(--memory)" textAnchor="middle">θ</text>
          <line x1={px} y1={py} x2={px} y2={CY} stroke="var(--curve-2)" strokeWidth={2.5} strokeDasharray="5 3" />
          <line x1={CX} y1={CY} x2={px} y2={CY} stroke="var(--curve-3)" strokeWidth={3} />
          <line x1={CX} y1={CY} x2={px} y2={py} stroke="var(--curve-1)" strokeWidth={3} />
          <text x={(CX + px) / 2} y={CY + (py < CY ? 16 : -8)} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--curve-3)">x</text>
          <text x={px + (px > CX ? 8 : -8)} y={(py + CY) / 2 + 4} textAnchor={px > CX ? "start" : "end"} fontSize="13" fontWeight="700" fill="var(--curve-2)">y</text>
          <text x={(CX + px) / 2 - 8} y={(CY + py) / 2 - 6} fontSize="13" fontWeight="700" fill="var(--curve-1)">r</text>
          <circle cx={px} cy={py} r={9} fill="var(--brand)" stroke="var(--surface)" strokeWidth={2} />
          <text x={Math.min(SIZE - 70, Math.max(70, px))} y={py + (py < CY ? -16 : 26)} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--text)" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">P({fmt(x)}; {fmt(y)})</text>
        </svg>
        <div className="space-y-3 text-sm">
          <Slider label={<Tex tex="\theta" />} value={theta} min={0} max={359} onChange={(v) => setTheta(v)} colour="var(--memory)" format={(v) => `${v}°`} />
          <Slider label={<>radius <Tex tex="r" /></>} value={r} min={1} max={13} onChange={setR} colour="var(--curve-1)" />
          <Toggle on={snap} onChange={setSnap}>Snap to 15°</Toggle>
          <div className="grid grid-cols-3 gap-2">
            {(["sin", "cos", "tan"] as const).map((f) => {
              const s = sign(f);
              const value = f === "sin" ? y / r : f === "cos" ? x / r : tanUndefined ? NaN : y / x;
              return (
                <div key={f} className={cn("rounded-xl border-2 p-2 text-center", s > 0 ? "border-success/50 bg-success/5" : s < 0 ? "border-danger/50 bg-danger/5" : "border-line")}>
                  <div className="font-semibold"><Tex tex={`\\${f}\\theta = \\tfrac{${f === "cos" ? "x" : "y"}}{${f === "tan" ? "x" : "r"}}`} /></div>
                  <div className="mt-1 font-mono text-base font-bold">{Number.isFinite(value) ? fmt(value) : "undef."}</div>
                  <div className="text-xs text-muted">{s > 0 ? "positive" : s < 0 ? "negative" : "zero / undef."}</div>
                </div>
              );
            })}
          </div>
          <div className="rounded-xl border border-line bg-surface-2 p-3">
            {red.quadrant ? (
              <>
                <div>Quadrant <strong>{red.quadrant}</strong> – <strong className="text-trig">{["", "All", "Sin", "Tan", "Cos"][red.quadrant]}</strong> {red.quadrant === 1 ? "are" : "is"} positive here.</div>
                <div className="mt-1">Reference angle: <Tex tex={`${red.ref}^\\circ`} />, so <Tex tex={`\\theta = ${red.form}`} /></div>
                <div className="mt-1 space-y-0.5">
                  {(["sin", "cos", "tan"] as const).map((f) => (
                    <div key={f}><Tex tex={`\\${f} ${theta}^\\circ = ${sign(f) < 0 ? "-" : ""}\\${f} ${red.ref}^\\circ${exact ? ` = ${sign(f) < 0 ? "-" : ""}${exact[f]}` : ""}`} /></div>
                  ))}
                </div>
              </>
            ) : (
              <div>θ = {theta}° lies on an axis: <Tex tex={`\\sin ${theta}^\\circ = ${fmt(Math.sin(rad))},\\ \\cos ${theta}^\\circ = ${fmt(Math.cos(rad))}`} />{tanUndefined ? <>, <Tex tex={`\\tan ${theta}^\\circ`} /> is undefined (x = 0).</> : "."}</div>
            )}
          </div>
          <p className="text-xs text-muted">Notice: changing r doesn&apos;t change the ratios – they depend only on the angle.</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
