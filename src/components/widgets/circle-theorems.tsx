"use client";
import { useRef, useState } from "react";
import { Tex } from "@/components/learn/tex";
import { bumpStat } from "@/lib/progress";
import { Segmented, WidgetFrame } from "./widget-frame";

type Mode = "centre" | "semicircle" | "segment" | "cyclic" | "tangent" | "chord";
const SIZE = 340;
const R = 125;
const CX = SIZE / 2, CY = SIZE / 2;
const pos = (deg: number): [number, number] => [CX + R * Math.cos((deg * Math.PI) / 180), CY - R * Math.sin((deg * Math.PI) / 180)];

/** Angle at V between rays to P and Q, in degrees (0–180). */
function angleAt(V: [number, number], P: [number, number], Q: [number, number]) {
  const a = Math.atan2(P[1] - V[1], P[0] - V[0]);
  const b = Math.atan2(Q[1] - V[1], Q[0] - V[0]);
  let d = Math.abs(a - b) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
}

function Arc({ V, P, Q, colour, label, r = 24, reflex = false }: { V: [number, number]; P: [number, number]; Q: [number, number]; colour: string; label?: string; r?: number; reflex?: boolean }) {
  let t1 = Math.atan2(P[1] - V[1], P[0] - V[0]);
  let d = Math.atan2(Q[1] - V[1], Q[0] - V[0]) - t1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  if (d < 0) { t1 += d; d = -d; }
  if (reflex) { t1 += d; d = 2 * Math.PI - d; }
  const large = d > Math.PI ? 1 : 0;
  const lt = t1 + d / 2;
  return (
    <g>
      <path d={`M${V[0] + Math.cos(t1) * r},${V[1] + Math.sin(t1) * r} A${r},${r} 0 ${large} 1 ${V[0] + Math.cos(t1 + d) * r},${V[1] + Math.sin(t1 + d) * r}`} fill={colour} fillOpacity={0.15} stroke={colour} strokeWidth={2.5} />
      {label && <text x={V[0] + Math.cos(lt) * (r + 16)} y={V[1] + Math.sin(lt) * (r + 16) + 4} textAnchor="middle" fontSize="13" fontWeight="800" fill={colour} stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">{label}</text>}
    </g>
  );
}

const START: Record<Mode, Record<string, number>> = {
  centre: { A: 215, B: 325, C: 100 },
  semicircle: { A: 180, B: 0, C: 60 },
  segment: { A: 210, B: 330, C: 120, D: 60 },
  cyclic: { A: 130, B: 210, C: 300, D: 40 },
  tangent: { A: 270, B: 20, C: 140 },
  chord: { A: 200, B: 340 },
};
const FIXED: Partial<Record<Mode, string[]>> = { semicircle: ["A", "B"], tangent: ["A"] };

const THEOREMS: Record<Mode, { name: string; reason: string }> = {
  centre: { name: "Angle at the centre", reason: "∠ at centre = 2 × ∠ at circumference" },
  semicircle: { name: "Angle in a semicircle", reason: "∠ in semi-circle = 90°" },
  segment: { name: "Angles in the same segment", reason: "∠s in the same seg" },
  cyclic: { name: "Cyclic quadrilateral", reason: "opp ∠s of cyclic quad (sum = 180°)" },
  tangent: { name: "Tangent–chord theorem", reason: "tan chord theorem" },
  chord: { name: "Line from centre ⟂ chord", reason: "line from centre ⟂ to chord bisects the chord" },
};

/**
 * Drag points around the circle: the measured angles keep obeying the
 * theorem, whatever you do. Seeing it hold for every position IS the
 * intuition behind the proof.
 */
export function CircleTheorems({ mode: initial = "centre" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [ang, setAng] = useState<Record<string, number>>(START[initial]);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<string | null>(null);
  const used = useRef(false);
  const P = (n: string) => pos(ang[n]);
  const O: [number, number] = [CX, CY];

  const toLocal = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE] as [number, number];
  };
  const down = (e: React.PointerEvent) => {
    const [x, y] = toLocal(e);
    const movable = Object.keys(ang).filter((n) => !FIXED[mode]?.includes(n));
    const near = movable.map((n) => ({ n, d: Math.hypot(P(n)[0] - x, P(n)[1] - y) })).sort((a, b) => a.d - b.d)[0];
    if (near && near.d < 40) {
      drag.current = near.n;
      svg.current!.setPointerCapture(e.pointerId);
      if (!used.current) {
        used.current = true;
        bumpStat("toolsUsed");
      }
    }
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const [x, y] = toLocal(e);
    let a = (Math.atan2(CY - y, x - CX) * 180) / Math.PI;
    if (a < 0) a += 360;
    const n = drag.current;
    // Keep the points away from fixed points / out of impossible positions.
    if (mode === "semicircle" && (a < 5 || a > 175)) a = Math.min(175, Math.max(5, a > 270 ? 5 : a));
    if (mode === "tangent" && Math.abs(a - 270) < 6) return;
    setAng((s) => ({ ...s, [n]: Math.round(a) }));
  };
  const up = () => { drag.current = null; };
  const switchMode = (m: Mode) => { setMode(m); setAng(START[m]); };

  const r0 = (v: number) => Math.round(v);
  let figure: React.ReactNode = null;
  let readout: React.ReactNode = null;

  if (mode === "centre") {
    const [A, B, C] = [P("A"), P("B"), P("C")];
    const inscribed = angleAt(C, A, B);
    const central = 2 * inscribed;
    const reflex = central > 180;
    figure = (
      <>
        <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke="var(--text)" strokeWidth={2} />
        <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke="var(--text)" strokeWidth={2} />
        <polyline points={`${A} ${C} ${B}`} fill="none" stroke="var(--text)" strokeWidth={2} />
        <Arc V={C} P={A} Q={B} colour="var(--curve-1)" label={`${r0(inscribed)}°`} />
        <Arc V={O} P={A} Q={B} colour="var(--curve-3)" label={`${r0(central)}°`} r={30} reflex={reflex} />
      </>
    );
    readout = <><Tex tex={`A\\hat{C}B = ${r0(inscribed)}^\\circ`} /> and <Tex tex={`A\\hat{O}B = ${r0(central)}^\\circ = 2 \\times ${r0(inscribed)}^\\circ`} />{reflex && <span className="text-muted"> (reflex angle – C is on the minor arc)</span>}</>;
  } else if (mode === "semicircle") {
    const [A, B, C] = [P("A"), P("B"), P("C")];
    const c = angleAt(C, A, B), a = angleAt(A, C, B), b = angleAt(B, C, A);
    figure = (
      <>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="var(--text)" strokeWidth={2} />
        <polyline points={`${A} ${C} ${B}`} fill="none" stroke="var(--text)" strokeWidth={2} />
        <Arc V={C} P={A} Q={B} colour="var(--success)" label={`${r0(c)}°`} />
        <Arc V={A} P={C} Q={B} colour="var(--curve-1)" label={`${r0(a)}°`} r={30} />
        <Arc V={B} P={C} Q={A} colour="var(--curve-2)" label={`${r0(b)}°`} r={30} />
      </>
    );
    readout = <><Tex tex={`A\\hat{C}B = ${r0(c)}^\\circ`} /> – always 90°, wherever C is. And <Tex tex={`\\hat{A} + \\hat{B} = ${r0(a)}^\\circ + ${r0(b)}^\\circ = 90^\\circ`} />.</>;
  } else if (mode === "segment") {
    const [A, B, C, D] = [P("A"), P("B"), P("C"), P("D")];
    const c = angleAt(C, A, B), d = angleAt(D, A, B);
    figure = (
      <>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="var(--text-muted)" strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={`${A} ${C} ${B}`} fill="none" stroke="var(--text)" strokeWidth={2} />
        <polyline points={`${A} ${D} ${B}`} fill="none" stroke="var(--text)" strokeWidth={2} />
        <Arc V={C} P={A} Q={B} colour="var(--curve-1)" label={`${r0(c)}°`} />
        <Arc V={D} P={A} Q={B} colour="var(--curve-2)" label={`${r0(d)}°`} />
      </>
    );
    readout = Math.abs(c - d) < 1.5
      ? <><Tex tex={`A\\hat{C}B = A\\hat{D}B = ${r0(c)}^\\circ`} /> – angles subtended by the same chord, in the same segment, are equal.</>
      : <><Tex tex={`A\\hat{C}B = ${r0(c)}^\\circ,\\ A\\hat{D}B = ${r0(d)}^\\circ`} /> – C and D are now in DIFFERENT segments, so the angles add up to 180° instead.</>;
  } else if (mode === "cyclic") {
    const [A, B, C, D] = [P("A"), P("B"), P("C"), P("D")];
    const a = angleAt(A, D, B), b = angleAt(B, A, C), c = angleAt(C, B, D), d = angleAt(D, C, A);
    figure = (
      <>
        <polygon points={`${A} ${B} ${C} ${D}`} fill="var(--t-geometry)" fillOpacity={0.06} stroke="var(--text)" strokeWidth={2} />
        <Arc V={A} P={D} Q={B} colour="var(--curve-1)" label={`${r0(a)}°`} />
        <Arc V={C} P={B} Q={D} colour="var(--curve-1)" label={`${r0(c)}°`} />
        <Arc V={B} P={A} Q={C} colour="var(--curve-2)" label={`${r0(b)}°`} />
        <Arc V={D} P={C} Q={A} colour="var(--curve-2)" label={`${r0(d)}°`} />
      </>
    );
    readout = <><Tex tex={`\\hat{A} + \\hat{C} = ${r0(a)}^\\circ + ${r0(c)}^\\circ = ${r0(a + c)}^\\circ`} /> and <Tex tex={`\\hat{B} + \\hat{D} = ${r0(b + d)}^\\circ`} />. <span className="text-muted">(Keep A, B, C, D in order around the circle.)</span></>;
  } else if (mode === "tangent") {
    const [A, B, C] = [P("A"), P("B"), P("C")];
    const T: [number, number] = [A[0] + 150, A[1]], S: [number, number] = [A[0] - 150, A[1]];
    const bRight = B[0] >= A[0];
    const tanAngle = angleAt(A, bRight ? T : S, B);
    const inscribed = angleAt(C, A, B);
    figure = (
      <>
        <line x1={S[0]} y1={S[1]} x2={T[0]} y2={T[1]} stroke="var(--t-geometry)" strokeWidth={2.5} />
        <text x={T[0] - 8} y={T[1] - 8} fontSize="14" fontWeight="700" fontStyle="italic" fill="var(--t-geometry)">{bRight ? "T" : ""}</text>
        <text x={S[0] + 4} y={S[1] - 8} fontSize="14" fontWeight="700" fontStyle="italic" fill="var(--t-geometry)">{bRight ? "" : "T"}</text>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="var(--text)" strokeWidth={2} />
        <polyline points={`${A} ${C} ${B}`} fill="none" stroke="var(--text)" strokeWidth={2} />
        <Arc V={A} P={bRight ? T : S} Q={B} colour="var(--curve-3)" label={`${r0(tanAngle)}°`} r={34} />
        <Arc V={C} P={A} Q={B} colour="var(--curve-1)" label={`${r0(inscribed)}°`} />
      </>
    );
    readout = Math.abs(tanAngle - inscribed) < 1.5
      ? <><Tex tex={`T\\hat{A}B = A\\hat{C}B = ${r0(inscribed)}^\\circ`} /> – the angle between the tangent and the chord equals the angle in the alternate segment.</>
      : <span className="text-muted">Move C to the other side of chord AB (the alternate segment) to see the theorem.</span>;
  } else {
    const [A, B] = [P("A"), P("B")];
    const M: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const am = Math.hypot(M[0] - A[0], M[1] - A[1]) / R;
    figure = (
      <>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="var(--text)" strokeWidth={2} />
        <line x1={O[0]} y1={O[1]} x2={M[0]} y2={M[1]} stroke="var(--curve-3)" strokeWidth={2} />
        <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} stroke="var(--text-muted)" strokeWidth={1.5} strokeDasharray="5 4" />
        <circle cx={M[0]} cy={M[1]} r={4} fill="var(--curve-3)" />
        <text x={M[0] + 8} y={M[1] + 16} fontSize="14" fontWeight="700" fontStyle="italic" fill="var(--curve-3)">M</text>
      </>
    );
    readout = <><Tex tex={`OM \\perp AB`} /> and <Tex tex={`AM = MB = ${am.toFixed(2)}r`} />. By Pythagoras in <Tex tex="\\triangle OMA" />: <Tex tex={`OM^2 = r^2 - AM^2`} />.</>;
  }

  return (
    <WidgetFrame title="Circle theorem explorer" colour="var(--t-geometry)" instruction="Drag the dots around the circle. The theorem holds for EVERY position – that's what a proof guarantees.">
      <Segmented colour="var(--t-geometry)" value={mode} onChange={switchMode} options={(Object.keys(THEOREMS) as Mode[]).map((m) => ({ id: m, label: THEOREMS[m].name }))} />
      <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,360px)_1fr]">
        <svg ref={svg} viewBox={`0 0 ${SIZE} ${SIZE}`} className="diagram w-full cursor-pointer touch-none select-none rounded-xl border border-line bg-surface" role="img" aria-label={`${THEOREMS[mode].name} diagram`}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--text)" strokeWidth={2} />
          <circle cx={CX} cy={CY} r={3.5} fill="var(--text)" />
          <text x={CX + 6} y={CY + 16} fontSize="14" fontWeight="700" fontStyle="italic" fill="var(--text)">O</text>
          {figure}
          {Object.keys(ang).map((n) => {
            const [x, y] = P(n);
            const fixed = FIXED[mode]?.includes(n);
            const lx = CX + (R + 18) * Math.cos((ang[n] * Math.PI) / 180), ly = CY - (R + 18) * Math.sin((ang[n] * Math.PI) / 180) + 5;
            return (
              <g key={n}>
                <circle cx={x} cy={y} r={fixed ? 4.5 : 9} fill={fixed ? "var(--text)" : "var(--brand)"} stroke="var(--surface)" strokeWidth={2} />
                <text x={lx} y={ly} textAnchor="middle" fontSize="15" fontWeight="800" fontStyle="italic" fill="var(--text)">{n}</text>
              </g>
            );
          })}
        </svg>
        <div className="space-y-3 text-sm">
          <div className="rounded-xl border-2 border-geometry/40 bg-geometry/5 p-3">
            <div className="text-xs font-bold tracking-wider text-geometry uppercase">{THEOREMS[mode].name}</div>
            <div className="mt-1">{readout}</div>
          </div>
          <div className="rounded-xl bg-surface-2 p-3">
            <div className="text-xs font-bold text-muted uppercase">Reason to write in a proof</div>
            <div className="mt-1 font-mono">({THEOREMS[mode].reason})</div>
          </div>
          <p className="text-xs text-muted">Purple dots can be dragged; small black dots are fixed. Angles are measured live (rounded to the nearest degree).</p>
        </div>
      </div>
    </WidgetFrame>
  );
}
