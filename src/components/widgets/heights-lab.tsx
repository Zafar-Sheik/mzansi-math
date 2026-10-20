"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { bumpStat } from "@/lib/progress";
import { Figure, type Pt } from "./figure";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Mode = "2d" | "3d";
type P3 = [number, number, number];
const R = Math.PI / 180;
const f2 = (v: number) => v.toFixed(2);
const TILT = 24 * R;

/** Oblique view of 3D points: turn about the vertical axis by `turn`, then tilt. */
function project(p: P3, turn: number): Pt {
  const [x, y, z] = p;
  const sx = x * Math.cos(turn) - y * Math.sin(turn);
  const depth = x * Math.sin(turn) + y * Math.cos(turn);
  return [sx, depth * Math.sin(TILT) + z * Math.cos(TILT)];
}

/**
 * Heights and distances. 2D: two angles of elevation from two points in line
 * with a tower. 3D: a vertical tower TB with A, B and C on horizontal ground –
 * solve the flat triangle first, then the upright one. Turn the 3D view to see
 * which triangles are horizontal and which are vertical.
 */
export function HeightsLab({ mode: initial = "3d" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [d, setD] = useState(60);
  const [x, setX] = useState(55);
  const [y, setY] = useState(65);
  const [th, setTh] = useState(30);
  const [a, setA] = useState(25);
  const [b, setB] = useState(50);
  const [turn, setTurn] = useState(20);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };

  if (mode === "2d") {
    const bb = Math.max(b, a + 5);
    const BT = (d * Math.sin(a * R)) / Math.sin((bb - a) * R);
    const h = BT * Math.sin(bb * R);
    const BF = h / Math.tan(bb * R);
    const k = 10 / (d + BF);
    const F: Pt = [0, 0], T: Pt = [0, h * k], B: Pt = [-BF * k, 0], A: Pt = [-(BF + d) * k, 0];
    return (
      <WidgetFrame title="Heights & distances" colour="var(--t-trig)" instruction="Two learners measure the angle of elevation to the top of a tower. Find the height without ever climbing it.">
        <Segmented colour="var(--t-trig)" value={mode} onChange={setMode} options={[{ id: "2d", label: "2D: two angles of elevation" }, { id: "3d", label: "3D: tower on a flat plane" }]} />
        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Figure
            points={{ A, B, F, T }}
            segments={[["A", "F"], { from: "F", to: "T", colour: "var(--curve-2)" }, { from: "A", to: "T", dashed: true }, { from: "B", to: "T", dashed: true }]}
            angles={[{ at: "A", from: "F", to: "T", label: `${a}°` }, { at: "B", from: "F", to: "T", label: `${bb}°` }, { at: "F", from: "B", to: "T", right: true }]}
            sideLabels={[{ from: "A", to: "B", label: `${d} m` }]}
            width={520}
          />
          <div className="space-y-3">
            <Slider label="distance AB (m)" value={d} min={10} max={100} step={5} onChange={touch(setD)} colour="var(--curve-1)" />
            <Slider label="elevation from A" value={a} min={10} max={60} onChange={touch(setA)} colour="var(--curve-3)" format={(v) => `${v}°`} />
            <Slider label="elevation from B" value={bb} min={a + 5} max={80} onChange={touch(setB)} colour="var(--curve-2)" format={(v) => `${v}°`} />
          </div>
        </div>
        <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
          <Tex display tex={`A\\hat{T}B = ${bb}^\\circ - ${a}^\\circ = ${bb - a}^\\circ \\quad\\text{(ext } \\angle \\text{ of } \\triangle)`} />
          <Tex display tex={`\\frac{BT}{\\sin ${a}^\\circ} = \\frac{${d}}{\\sin ${bb - a}^\\circ} \\Rightarrow BT = ${f2(BT)} \\text{ m}`} />
          <Tex display tex={`TF = BT\\sin ${bb}^\\circ = ${f2(h)} \\text{ m}`} />
        </div>
      </WidgetFrame>
    );
  }

  const yy = Math.min(y, 170 - x);
  const Bang = 180 - x - yy;
  const AB = (d * Math.sin(yy * R)) / Math.sin(Bang * R);
  const TB = AB * Math.tan(th * R);
  const k = 10 / Math.max(d, AB);
  const A3: P3 = [0, 0, 0], C3: P3 = [d * k, 0, 0], B3: P3 = [AB * Math.cos(x * R) * k, AB * Math.sin(x * R) * k, 0], T3: P3 = [B3[0], B3[1], TB * k];
  const xs = [A3[0], C3[0], B3[0]], ys = [A3[1], C3[1], B3[1]];
  const m = 1.5;
  const g: P3[] = [[Math.min(...xs) - m, Math.min(...ys) - m, 0], [Math.max(...xs) + m, Math.min(...ys) - m, 0], [Math.max(...xs) + m, Math.max(...ys) + m, 0], [Math.min(...xs) - m, Math.max(...ys) + m, 0]];
  const t = turn * R;
  const pts: Record<string, Pt> = { A: project(A3, t), B: project(B3, t), C: project(C3, t), T: project(T3, t), G1: project(g[0], t), G2: project(g[1], t), G3: project(g[2], t), G4: project(g[3], t) };

  return (
    <WidgetFrame title="Heights & distances" colour="var(--t-trig)" instruction="TB is a vertical tower; A, B and C are on flat ground. Turn the view: the dashed outline is the horizontal ground, the tower is upright.">
      <Segmented colour="var(--t-trig)" value={mode} onChange={setMode} options={[{ id: "2d", label: "2D: two angles of elevation" }, { id: "3d", label: "3D: tower on a flat plane" }]} />
      <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Figure
          points={pts}
          hidden={["G1", "G2", "G3", "G4"]}
          fit={["G1", "G2", "G3", "G4"]}
          segments={[
            { from: "G1", to: "G2", dashed: true, colour: "var(--text-muted)" }, { from: "G2", to: "G3", dashed: true, colour: "var(--text-muted)" }, { from: "G3", to: "G4", dashed: true, colour: "var(--text-muted)" }, { from: "G4", to: "G1", dashed: true, colour: "var(--text-muted)" },
            ["A", "C"], ["A", "B"], ["B", "C"], { from: "B", to: "T", colour: "var(--curve-2)" }, { from: "A", to: "T", dashed: true },
          ]}
          angles={[{ at: "A", from: "C", to: "B", label: `${x}°` }, { at: "C", from: "A", to: "B", label: `${yy}°` }, { at: "A", from: "B", to: "T", label: `${th}°` }, { at: "B", from: "A", to: "T", right: true }]}
          sideLabels={[{ from: "A", to: "C", label: `${d} m` }]}
          width={520}
        />
        <div className="space-y-3">
          <Slider label="turn the view" value={turn} min={-60} max={60} step={5} onChange={touch(setTurn)} colour="var(--memory)" format={(v) => `${v}°`} />
          <Slider label="AC (m)" value={d} min={20} max={120} step={10} onChange={touch(setD)} colour="var(--curve-1)" />
          <Slider label="∠BAC" value={x} min={20} max={100} step={5} onChange={touch(setX)} colour="var(--curve-1)" format={(v) => `${v}°`} />
          <Slider label="∠BCA" value={yy} min={20} max={Math.min(100, 170 - x)} step={5} onChange={touch(setY)} colour="var(--curve-1)" format={(v) => `${v}°`} />
          <Slider label="elevation of T from A" value={th} min={10} max={60} onChange={touch(setTh)} colour="var(--curve-3)" format={(v) => `${v}°`} />
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        <p className="text-center text-muted">Step 1 – the horizontal triangle ABC:</p>
        <Tex display tex={`A\\hat{B}C = 180^\\circ - ${x}^\\circ - ${yy}^\\circ = ${Bang}^\\circ \\qquad \\frac{AB}{\\sin ${yy}^\\circ} = \\frac{${d}}{\\sin ${Bang}^\\circ} \\Rightarrow AB = ${f2(AB)} \\text{ m}`} />
        <p className="text-center text-muted">Step 2 – the vertical right triangle TBA (<Tex tex="T\hat{B}A = 90^\circ" />):</p>
        <Tex display tex={`\\tan ${th}^\\circ = \\frac{TB}{AB} \\Rightarrow TB = ${f2(AB)}\\tan ${th}^\\circ = ${f2(TB)} \\text{ m}`} />
      </div>
    </WidgetFrame>
  );
}
