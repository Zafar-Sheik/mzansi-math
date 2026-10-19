"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { bumpStat } from "@/lib/progress";
import { Figure } from "./figure";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Mode = "sine-side" | "sine-angle" | "cos-side" | "cos-angle" | "area";
const RAD = Math.PI / 180;
const f2 = (v: number) => v.toFixed(2);
const f1 = (v: number) => v.toFixed(1);

/** Coordinates of triangle ABC from its three sides (B at the origin, C on the x-axis). */
function place(a: number, b: number, c: number) {
  const Bang = Math.acos(Math.max(-1, Math.min(1, (a * a + c * c - b * b) / (2 * a * c))));
  return { A: [c * Math.cos(Bang), c * Math.sin(Bang)] as [number, number], B: [0, 0] as [number, number], C: [a, 0] as [number, number] };
}

/**
 * Sine, cosine and area rules: choose what you know, see the triangle and the
 * full working. The diagram is drawn to scale.
 */
export function TriangleSolver({ mode: initial = "sine-side" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [x1, setX1] = useState(50); // an angle
  const [x2, setX2] = useState(70); // an angle
  const [s1, setS1] = useState(10); // a side
  const [s2, setS2] = useState(8); // a side
  const [s3, setS3] = useState(7); // a side
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };

  let a = 0, b = 0, c = 0;
  let working: string[] = [];
  let note = "";
  let angles: { at: string; from: string; to: string; label: string }[] = [];
  let sides: { from: string; to: string; label: string }[] = [];
  let valid = true;

  if (mode === "sine-side") {
    // Given B, C and b → find c
    const B = x1, C = Math.min(x2, 175 - B), A = 180 - B - C;
    b = s1;
    a = (b * Math.sin(A * RAD)) / Math.sin(B * RAD);
    c = (b * Math.sin(C * RAD)) / Math.sin(B * RAD);
    working = [`\\frac{c}{\\sin C} = \\frac{b}{\\sin B}`, `c = \\frac{${b}\\sin ${C}^\\circ}{\\sin ${B}^\\circ} = ${f2(c)}`];
    angles = [{ at: "B", from: "A", to: "C", label: `${B}°` }, { at: "C", from: "A", to: "B", label: `${C}°` }];
    sides = [{ from: "A", to: "C", label: `b = ${b}` }, { from: "A", to: "B", label: `c = ${f2(c)}` }];
    note = "Use the sine rule when you know a side and the angle OPPOSITE it, plus one more angle or side.";
  } else if (mode === "sine-angle") {
    // Given A, a, b → find B
    const A = x1;
    a = s1; b = s2;
    const sinB = (b * Math.sin(A * RAD)) / a;
    if (sinB > 1) {
      valid = false;
      working = [`\\sin B = \\frac{${b}\\sin ${A}^\\circ}{${a}} = ${f2(sinB)} > 1`];
      note = "No triangle exists – side a is too short to reach the base.";
    } else {
      const B1 = Math.asin(sinB) / RAD;
      const B2 = 180 - B1;
      const C = 180 - A - B1;
      c = (a * Math.sin(C * RAD)) / Math.sin(A * RAD);
      working = [`\\frac{\\sin B}{b} = \\frac{\\sin A}{a}`, `\\sin B = \\frac{${b}\\sin ${A}^\\circ}{${a}} = ${(sinB).toFixed(4)}`, `B = ${f1(B1)}^\\circ`];
      if (A + B2 < 180 && b > a) {
        working.push(`\\text{or } B = 180^\\circ - ${f1(B1)}^\\circ = ${f1(B2)}^\\circ \\text{ (ambiguous case – two triangles!)}`);
      }
      angles = [{ at: "A", from: "B", to: "C", label: `${A}°` }, { at: "B", from: "A", to: "C", label: `${f1(B1)}°` }];
      sides = [{ from: "B", to: "C", label: `a = ${a}` }, { from: "A", to: "C", label: `b = ${b}` }];
      note = b > a ? "b > a: B could be acute OR obtuse – check both." : "a ≥ b, so B is smaller than A – only the acute answer works.";
    }
  } else if (mode === "cos-side") {
    // Given b, c, A → find a
    const A = x1;
    b = s1; c = s2;
    a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * RAD));
    working = [`a^2 = b^2 + c^2 - 2bc\\cos A`, `a^2 = ${b}^2 + ${c}^2 - 2(${b})(${c})\\cos ${A}^\\circ = ${f2(a * a)}`, `a = ${f2(a)}`];
    angles = [{ at: "A", from: "B", to: "C", label: `${A}°` }];
    sides = [{ from: "A", to: "C", label: `b = ${b}` }, { from: "A", to: "B", label: `c = ${c}` }, { from: "B", to: "C", label: `a = ${f2(a)}` }];
    note = "Two sides and the angle BETWEEN them (included angle) → cosine rule for the third side.";
  } else if (mode === "cos-angle") {
    a = s1; b = s2; c = s3;
    if (a + b <= c || a + c <= b || b + c <= a) {
      valid = false;
      working = [`${a} + ${b} \\text{ … these three sides can't make a triangle}`];
      note = "Triangle inequality: any two sides must add up to more than the third.";
    } else {
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      const A = Math.acos(cosA) / RAD;
      working = [`\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{${b}^2 + ${c}^2 - ${a}^2}{2(${b})(${c})} = ${cosA.toFixed(4)}`, `A = ${f1(A)}^\\circ`];
      angles = [{ at: "A", from: "B", to: "C", label: `${f1(A)}°` }];
      sides = [{ from: "B", to: "C", label: `a = ${a}` }, { from: "A", to: "C", label: `b = ${b}` }, { from: "A", to: "B", label: `c = ${c}` }];
      note = cosA < 0 ? "cos A is negative, so A is obtuse – the cosine rule handles that automatically." : "Three sides known → cosine rule for any angle.";
    }
  } else {
    // Given a, b, C → area
    const C = x1;
    a = s1; b = s2;
    c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * RAD));
    const area = 0.5 * a * b * Math.sin(C * RAD);
    working = [`\\text{Area} = \\tfrac{1}{2}ab\\sin C = \\tfrac{1}{2}(${a})(${b})\\sin ${C}^\\circ = ${f2(area)}`];
    angles = [{ at: "C", from: "A", to: "B", label: `${C}°` }];
    sides = [{ from: "B", to: "C", label: `a = ${a}` }, { from: "A", to: "C", label: `b = ${b}` }];
    note = "Area rule: two sides and the included angle – no perpendicular height needed.";
  }

  const pts = valid ? place(a, b, c) : null;

  return (
    <WidgetFrame title="Triangle solver" colour="var(--t-trig)" instruction="Pick what you're given. Change the values and watch the triangle and the working update.">
      <Segmented colour="var(--t-trig)" value={mode} onChange={setMode} options={[{ id: "sine-side", label: "Sine rule: side" }, { id: "sine-angle", label: "Sine rule: angle" }, { id: "cos-side", label: "Cosine rule: side" }, { id: "cos-angle", label: "Cosine rule: angle" }, { id: "area", label: "Area rule" }]} />
      <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          {pts ? <Figure points={pts} segments={[["A", "B"], ["B", "C"], ["C", "A"]]} angles={angles} sideLabels={sides} /> : <div className="grid h-60 place-items-center rounded-2xl border border-dashed border-danger/50 text-danger">No triangle possible</div>}
        </div>
        <div className="space-y-3">
          {mode === "sine-side" && (<><Slider label="angle B" value={x1} min={10} max={120} onChange={touch(setX1)} format={(v) => `${v}°`} colour="var(--curve-1)" /><Slider label="angle C" value={x2} min={10} max={120} onChange={touch(setX2)} format={(v) => `${v}°`} colour="var(--curve-2)" /><Slider label="side b" value={s1} min={2} max={20} onChange={touch(setS1)} colour="var(--t-geometry)" /></>)}
          {mode === "sine-angle" && (<><Slider label="angle A" value={x1} min={10} max={120} onChange={touch(setX1)} format={(v) => `${v}°`} colour="var(--curve-1)" /><Slider label="side a" value={s1} min={2} max={20} onChange={touch(setS1)} colour="var(--t-geometry)" /><Slider label="side b" value={s2} min={2} max={20} onChange={touch(setS2)} colour="var(--t-geometry)" /></>)}
          {(mode === "cos-side" || mode === "area") && (<><Slider label={mode === "area" ? "angle C" : "angle A"} value={x1} min={10} max={170} onChange={touch(setX1)} format={(v) => `${v}°`} colour="var(--curve-1)" /><Slider label={mode === "area" ? "side a" : "side b"} value={s1} min={2} max={20} onChange={touch(setS1)} colour="var(--t-geometry)" /><Slider label={mode === "area" ? "side b" : "side c"} value={s2} min={2} max={20} onChange={touch(setS2)} colour="var(--t-geometry)" /></>)}
          {mode === "cos-angle" && (<><Slider label="side a" value={s1} min={2} max={20} onChange={touch(setS1)} colour="var(--t-geometry)" /><Slider label="side b" value={s2} min={2} max={20} onChange={touch(setS2)} colour="var(--t-geometry)" /><Slider label="side c" value={s3} min={2} max={20} onChange={touch(setS3)} colour="var(--t-geometry)" /></>)}
        </div>
      </div>
      <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
        {working.map((w, i) => <Tex key={i} display tex={w} />)}
        <p className="text-center text-muted">{note}</p>
      </div>
    </WidgetFrame>
  );
}
