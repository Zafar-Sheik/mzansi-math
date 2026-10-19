"use client";
import { useState } from "react";
import { Tex } from "@/components/learn/tex";
import { fmt } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Solid = "prism" | "cylinder" | "pyramid" | "cone" | "sphere" | "hemisphere";
const NAMES: Record<Solid, string> = { prism: "Rectangular prism", cylinder: "Cylinder", pyramid: "Square pyramid", cone: "Cone", sphere: "Sphere", hemisphere: "Hemisphere" };

/** Volume, surface area and the LaTeX working for each solid. */
export function measure(solid: Solid, a: number, b: number, h: number) {
  const π = Math.PI;
  switch (solid) {
    case "prism":
      return { V: a * b * h, SA: 2 * (a * b + a * h + b * h), vTex: `V = l \\times b \\times h = ${a} \\times ${b} \\times ${h}`, saTex: `SA = 2(lb + lh + bh) = 2(${a * b} + ${a * h} + ${b * h})` };
    case "cylinder":
      return { V: π * a * a * h, SA: 2 * π * a * a + 2 * π * a * h, vTex: `V = \\pi r^2 h = \\pi(${a})^2(${h})`, saTex: `SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(${a})^2 + 2\\pi(${a})(${h})` };
    case "pyramid": {
      const hs = Math.sqrt(h * h + (a / 2) ** 2);
      return { V: (a * a * h) / 3, SA: a * a + 2 * a * hs, vTex: `V = \\tfrac{1}{3}(\\text{area of base}) \\times h = \\tfrac{1}{3}(${a})^2(${h})`, saTex: `SA = b^2 + 4\\left(\\tfrac{1}{2} b\\, h_s\\right),\\ h_s = \\sqrt{${h}^2 + ${fmt(a / 2, a % 2 ? 1 : 0)}^2} = ${hs.toFixed(2)}` };
    }
    case "cone": {
      const s = Math.sqrt(a * a + h * h);
      return { V: (π * a * a * h) / 3, SA: π * a * a + π * a * s, vTex: `V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi(${a})^2(${h})`, saTex: `SA = \\pi r^2 + \\pi r s,\\ s = \\sqrt{${a}^2 + ${h}^2} = ${s.toFixed(2)}` };
    }
    case "sphere":
      return { V: (4 / 3) * π * a ** 3, SA: 4 * π * a * a, vTex: `V = \\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3}\\pi(${a})^3`, saTex: `SA = 4\\pi r^2 = 4\\pi(${a})^2` };
    case "hemisphere":
      return { V: (2 / 3) * π * a ** 3, SA: 3 * π * a * a, vTex: `V = \\tfrac{1}{2} \\times \\tfrac{4}{3}\\pi r^3 = \\tfrac{2}{3}\\pi(${a})^3`, saTex: `SA = 2\\pi r^2 + \\pi r^2 = 3\\pi(${a})^2` };
  }
}

/** A 3D-looking drawing of the solid (oblique / ellipse projection). */
function Drawing({ solid, a, b, h }: { solid: Solid; a: number; b: number; h: number }) {
  const W = 320, H = 280;
  const big = Math.max(a * 2, h, solid === "prism" ? Math.max(a, b) : 0, 1);
  const s = 190 / big;
  const cx = W / 2;
  const base = H - 40;
  const ink = "var(--text)";
  const fill = "var(--t-geometry)";
  const dash = "5 4";
  const label = (x: number, y: number, t: string, anchor: "start" | "middle" | "end" = "middle") => <text x={x} y={y} textAnchor={anchor} fontSize="13" fontWeight="700" fill="var(--t-geometry)" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">{t}</text>;
  if (solid === "cylinder" || solid === "cone") {
    const rx = a * s, ry = rx * 0.3, top = base - h * s;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="diagram mx-auto max-w-sm" role="img" aria-label={`${solid} drawing`}>
        <path d={`M${cx - rx},${base} A${rx},${ry} 0 0 1 ${cx + rx},${base}`} fill="none" stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
        {solid === "cylinder" ? (
          <>
            <path d={`M${cx - rx},${top} L${cx - rx},${base} A${rx},${ry} 0 0 0 ${cx + rx},${base} L${cx + rx},${top}`} fill={fill} fillOpacity={0.12} stroke={ink} strokeWidth={2} />
            <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={fill} fillOpacity={0.2} stroke={ink} strokeWidth={2} />
            <line x1={cx} y1={top} x2={cx + rx} y2={top} stroke={fill} strokeWidth={2} />
            {label(cx + rx / 2, top - 6, `r = ${a}`)}
            {label(cx + rx + 8, (top + base) / 2, `h = ${h}`, "start")}
          </>
        ) : (
          <>
            <path d={`M${cx - rx},${base} L${cx},${top} L${cx + rx},${base} A${rx},${ry} 0 0 1 ${cx - rx},${base}`} fill={fill} fillOpacity={0.12} stroke={ink} strokeWidth={2} />
            <line x1={cx} y1={top} x2={cx} y2={base} stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
            <line x1={cx} y1={base} x2={cx + rx} y2={base} stroke={fill} strokeWidth={2} />
            {label(cx + rx / 2, base + 18, `r = ${a}`)}
            {label(cx - 6, (top + base) / 2, `h = ${h}`, "end")}
            {label(cx + rx / 2 + 12, (top + base) / 2, "s", "start")}
          </>
        )}
      </svg>
    );
  }
  if (solid === "sphere" || solid === "hemisphere") {
    const r = a * s * 0.95, cy = solid === "sphere" ? H / 2 : base - 10;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="diagram mx-auto max-w-sm" role="img" aria-label={`${solid} drawing`}>
        {solid === "sphere" ? <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity={0.12} stroke={ink} strokeWidth={2} /> : <path d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`} fill={fill} fillOpacity={0.12} stroke={ink} strokeWidth={2} />}
        <path d={`M${cx - r},${cy} A${r},${r * 0.3} 0 0 0 ${cx + r},${cy}`} fill="none" stroke={ink} strokeWidth={2} />
        <path d={`M${cx - r},${cy} A${r},${r * 0.3} 0 0 1 ${cx + r},${cy}`} fill="none" stroke={ink} strokeWidth={1.5} strokeDasharray={solid === "sphere" ? dash : undefined} />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={fill} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={3} fill={ink} />
        {label(cx + r / 2, cy - 8, `r = ${a}`)}
      </svg>
    );
  }
  // prism and pyramid: oblique projection, depth at 30°
  const dx = 0.45 * Math.cos(Math.PI / 6), dy = 0.45 * Math.sin(Math.PI / 6);
  const L = a * s, D = (solid === "prism" ? b : a) * s, Hh = h * s;
  const x0 = cx - (L + D * dx) / 2, y0 = base;
  const p = (x: number, y: number, z: number): [number, number] => [x0 + x + z * dx, y0 - y - z * dy];
  const pt = (q: [number, number]) => `${q[0]},${q[1]}`;
  if (solid === "prism") {
    const c = [p(0, 0, 0), p(L, 0, 0), p(L, 0, D), p(0, 0, D), p(0, Hh, 0), p(L, Hh, 0), p(L, Hh, D), p(0, Hh, D)];
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="diagram mx-auto max-w-sm" role="img" aria-label="prism drawing">
        <polyline points={[c[0], c[3], c[2]].map(pt).join(" ")} fill="none" stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
        <line x1={c[3][0]} y1={c[3][1]} x2={c[7][0]} y2={c[7][1]} stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
        <polygon points={[c[0], c[1], c[5], c[4]].map(pt).join(" ")} fill={fill} fillOpacity={0.15} stroke={ink} strokeWidth={2} />
        <polygon points={[c[1], c[2], c[6], c[5]].map(pt).join(" ")} fill={fill} fillOpacity={0.08} stroke={ink} strokeWidth={2} />
        <polygon points={[c[4], c[5], c[6], c[7]].map(pt).join(" ")} fill={fill} fillOpacity={0.22} stroke={ink} strokeWidth={2} />
        {label((c[0][0] + c[1][0]) / 2, c[0][1] + 18, `l = ${a}`)}
        {label(c[1][0] + 8, (c[1][1] + c[5][1]) / 2, `h = ${h}`, "start")}
        {label((c[1][0] + c[2][0]) / 2 + 10, (c[1][1] + c[2][1]) / 2 + 14, `b = ${b}`, "start")}
      </svg>
    );
  }
  const c = [p(0, 0, 0), p(L, 0, 0), p(L, 0, D), p(0, 0, D)];
  const apex = p(L / 2, Hh, D / 2), foot = p(L / 2, 0, D / 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="diagram mx-auto max-w-sm" role="img" aria-label="pyramid drawing">
      <polyline points={[c[0], c[3], c[2]].map(pt).join(" ")} fill="none" stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
      <line x1={c[3][0]} y1={c[3][1]} x2={apex[0]} y2={apex[1]} stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
      <line x1={apex[0]} y1={apex[1]} x2={foot[0]} y2={foot[1]} stroke={ink} strokeDasharray={dash} strokeWidth={1.5} />
      <polygon points={[c[0], c[1], apex].map(pt).join(" ")} fill={fill} fillOpacity={0.15} stroke={ink} strokeWidth={2} />
      <polygon points={[c[1], c[2], apex].map(pt).join(" ")} fill={fill} fillOpacity={0.08} stroke={ink} strokeWidth={2} />
      {label((c[0][0] + c[1][0]) / 2, c[0][1] + 18, `b = ${a}`)}
      {label(foot[0] + 6, (foot[1] + apex[1]) / 2, `h = ${h}`, "start")}
    </svg>
  );
}

/**
 * Pick a solid, change its dimensions and see the working for volume and
 * surface area – then scale it by k to discover the k² / k³ rule.
 */
export function SolidViewer({ solid: initial = "cone" }: { solid?: Solid }) {
  const [solid, setSolid] = useState<Solid>(initial);
  const [a, setA] = useState(4);
  const [b, setB] = useState(3);
  const [h, setH] = useState(6);
  const [k, setK] = useState(1);
  const [used, setUsed] = useState(false);
  const touch = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    if (!used) {
      setUsed(true);
      bumpStat("toolsUsed");
    }
  };
  const m = measure(solid, a, b, h);
  const scaled = measure(solid, a * k, b * k, h * k);
  const round = solid !== "sphere" && solid !== "hemisphere";
  const aLabel = solid === "prism" ? "length l" : solid === "pyramid" ? "base side b" : "radius r";

  return (
    <WidgetFrame title="Solid viewer" colour="var(--t-geometry)" instruction="Choose a solid and change its size. The working updates live – then try the scale factor k.">
      <Segmented colour="var(--t-geometry)" value={solid} onChange={setSolid} options={(Object.keys(NAMES) as Solid[]).map((x) => ({ id: x, label: NAMES[x] }))} />
      <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 rounded-xl border border-line bg-surface p-2"><Drawing solid={solid} a={a} b={b} h={h} /></div>
        <div className="space-y-3">
          <Slider label={aLabel} value={a} min={1} max={12} onChange={touch(setA)} colour="var(--t-geometry)" format={(v) => `${v} cm`} />
          {solid === "prism" && <Slider label="breadth b" value={b} min={1} max={12} onChange={touch(setB)} colour="var(--t-geometry)" format={(v) => `${v} cm`} />}
          {round && <Slider label="height h" value={h} min={1} max={15} onChange={touch(setH)} colour="var(--t-geometry)" format={(v) => `${v} cm`} />}
          <Slider label="scale factor k" value={k} min={1} max={4} step={0.5} onChange={touch(setK)} colour="var(--memory)" format={(v) => `×${v}`} />
        </div>
      </div>
      <div className="mt-3 grid gap-3 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm md:grid-cols-2">
        <div><div className="text-xs font-bold text-muted uppercase">Volume</div><Tex tex={m.vTex} /><div className="mt-1 font-semibold"><Tex tex={`= ${fmt(m.V)} \\text{ cm}^3`} /></div></div>
        <div><div className="text-xs font-bold text-muted uppercase">Total surface area</div><Tex tex={m.saTex} /><div className="mt-1 font-semibold"><Tex tex={`= ${fmt(m.SA)} \\text{ cm}^2`} /></div></div>
      </div>
      {k !== 1 && (
        <div className="mt-3 rounded-xl border-2 border-memory/40 bg-memory/5 p-3 text-sm">
          Every length × {k}: surface area becomes <Tex tex={`${fmt(scaled.SA)} = ${k}^2 \\times ${fmt(m.SA)}`} /> and volume becomes <Tex tex={`${fmt(scaled.V)} = ${k}^3 \\times ${fmt(m.V)}`} />.
          <div className="mt-1 font-semibold text-memory">Lengths × k → area × k² → volume × k³</div>
        </div>
      )}
    </WidgetFrame>
  );
}
