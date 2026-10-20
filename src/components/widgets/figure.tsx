"use client";
import { useId } from "react";

export type Pt = [number, number];

export interface FigureProps {
  title?: string;
  caption?: string;
  /** Named points in maths coordinates (y up). */
  points: Record<string, Pt>;
  circles?: { centre: string | Pt; r: number }[];
  /** Segments between named points: ["A", "B"]. */
  segments?: ([string, string] | { from: string; to: string; dashed?: boolean; colour?: string })[];
  /** Lines through two named points, extended past both ends (tangents, extended sides). */
  lines?: { through: [string, string]; extend?: number; colour?: string }[];
  /** Angle marks at a vertex between two rays (the smaller angle). */
  angles?: { at: string; from: string; to: string; label?: string; colour?: string; right?: boolean }[];
  /** Labels written next to sides, e.g. lengths. */
  sideLabels?: { from: string; to: string; label: string }[];
  /** Equal-length ticks on segments. */
  ticks?: { from: string; to: string; count?: number }[];
  /** Points to draw without a dot or a name (helpers for lines). */
  hidden?: string[];
  /** Hidden points that still count towards the figure's size (e.g. the corners of a ground plane). */
  fit?: string[];
  width?: number;
}

const ANGLE_COLOURS = ["var(--curve-1)", "var(--curve-2)", "var(--curve-3)", "var(--memory)"];

/**
 * Static geometry figure: circles, chords, tangents, labelled angles and
 * equal-length ticks – like the diagrams in a Paper 2 Euclidean question.
 */
export function Figure({ title, caption, points, circles = [], segments = [], lines = [], angles = [], sideLabels = [], ticks = [], hidden = [], fit = [], width = 420 }: FigureProps) {
  const id = useId().replace(/:/g, "");
  const centreOf = (c: string | Pt): Pt => (typeof c === "string" ? points[c] : c);
  // Bounding box of everything, with padding for labels.
  const xs: number[] = [];
  const ys: number[] = [];
  Object.entries(points).forEach(([n, [x, y]]) => {
    if (hidden.includes(n) && !fit.includes(n)) return;
    xs.push(x);
    ys.push(y);
  });
  circles.forEach((c) => {
    const [cx, cy] = centreOf(c.centre);
    xs.push(cx - c.r, cx + c.r);
    ys.push(cy - c.r, cy + c.r);
  });
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const pad = 34;
  const s = (width - 2 * pad) / span;
  const height = Math.round((maxY - minY) * s + 2 * pad);
  const W = Math.round((maxX - minX) * s + 2 * pad);
  const X = (x: number) => pad + (x - minX) * s;
  const Y = (y: number) => height - pad - (y - minY) * s;
  const P = (n: string) => {
    const p = points[n];
    if (!p) throw new Error(`Figure: unknown point ${n}`);
    return [X(p[0]), Y(p[1])] as Pt;
  };
  // Labels are pushed away from the "middle" of the figure.
  const mid: Pt = circles.length ? (() => { const c = centreOf(circles[0].centre); return [X(c[0]), Y(c[1])] as Pt; })() : [W / 2, height / 2];

  const angleMark = (a: NonNullable<FigureProps["angles"]>[number], i: number) => {
    const [vx, vy] = P(a.at);
    const [ax, ay] = P(a.from);
    const [bx, by] = P(a.to);
    let t1 = Math.atan2(ay - vy, ax - vx);
    let t2 = Math.atan2(by - vy, bx - vx);
    let d = t2 - t1;
    while (d <= -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    if (d < 0) { [t1, t2] = [t2, t1]; d = -d; }
    const colour = a.colour ?? ANGLE_COLOURS[i % ANGLE_COLOURS.length];
    if (a.right) {
      const r = 11;
      const u1: Pt = [Math.cos(t1) * r, Math.sin(t1) * r];
      const u2: Pt = [Math.cos(t1 + d) * r, Math.sin(t1 + d) * r];
      return <path key={i} d={`M${vx + u1[0]},${vy + u1[1]} L${vx + u1[0] + u2[0]},${vy + u1[1] + u2[1]} L${vx + u2[0]},${vy + u2[1]}`} fill="none" stroke={colour} strokeWidth={1.8} />;
    }
    const r = 20;
    const large = d > Math.PI ? 1 : 0;
    const arc = `M${vx + Math.cos(t1) * r},${vy + Math.sin(t1) * r} A${r},${r} 0 ${large} 1 ${vx + Math.cos(t1 + d) * r},${vy + Math.sin(t1 + d) * r}`;
    const lr = 34;
    const lt = t1 + d / 2;
    return (
      <g key={i}>
        <path d={arc} fill="none" stroke={colour} strokeWidth={2} />
        {a.label && <text x={vx + Math.cos(lt) * lr} y={vy + Math.sin(lt) * lr + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={colour} stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">{a.label}</text>}
      </g>
    );
  };

  return (
    <figure className="rounded-2xl border border-line bg-surface p-3">
      {title && <figcaption className="mb-2 font-display font-bold">{title}</figcaption>}
      <svg viewBox={`0 0 ${W} ${height}`} className="diagram mx-auto max-h-[340px] w-full max-w-md" role="img" aria-label={title ?? "Geometry figure"}>
        <defs><clipPath id={`${id}-c`}><rect width={W} height={height} /></clipPath></defs>
        <g clipPath={`url(#${id}-c)`}>
          {circles.map((c, i) => { const [cx, cy] = centreOf(c.centre); return <circle key={i} cx={X(cx)} cy={Y(cy)} r={c.r * s} fill="none" stroke="var(--text)" strokeWidth={1.8} />; })}
          {lines.map((l, i) => {
            const [a, b] = l.through.map(P);
            const k = l.extend ?? 0.4;
            const dx = b[0] - a[0], dy = b[1] - a[1];
            return <line key={i} x1={a[0] - dx * k} y1={a[1] - dy * k} x2={b[0] + dx * k} y2={b[1] + dy * k} stroke={l.colour ?? "var(--t-geometry)"} strokeWidth={2} />;
          })}
          {segments.map((sg, i) => {
            const o = Array.isArray(sg) ? { from: sg[0], to: sg[1] } : sg;
            const [a, b] = [P(o.from), P(o.to)];
            return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={"colour" in o && o.colour ? o.colour : "var(--text)"} strokeWidth={1.8} strokeDasharray={"dashed" in o && o.dashed ? "5 4" : undefined} />;
          })}
          {ticks.map((t, i) => {
            const [a, b] = [P(t.from), P(t.to)];
            const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
            const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
            const nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
            const ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
            return Array.from({ length: t.count ?? 1 }, (_, k) => {
              const off = (k - ((t.count ?? 1) - 1) / 2) * 5;
              return <line key={`${i}-${k}`} x1={mx + ux * off - nx * 6} y1={my + uy * off - ny * 6} x2={mx + ux * off + nx * 6} y2={my + uy * off + ny * 6} stroke="var(--text)" strokeWidth={1.6} />;
            });
          })}
          {angles.map(angleMark)}
          {sideLabels.map((l, i) => {
            const [a, b] = [P(l.from), P(l.to)];
            const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
            let dx = mx - mid[0], dy = my - mid[1];
            const len = Math.hypot(dx, dy) || 1;
            dx /= len; dy /= len;
            return <text key={`s${i}`} x={mx + dx * 14} y={my + dy * 14 + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--t-geometry)" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">{l.label}</text>;
          })}
          {Object.keys(points).filter((n) => !hidden.includes(n)).map((n) => {
            const [x, y] = P(n);
            let dx = x - mid[0], dy = y - mid[1];
            const len = Math.hypot(dx, dy);
            if (len < 1) { dx = -1; dy = 1; } else { dx /= len; dy /= len; }
            return (
              <g key={n}>
                <circle cx={x} cy={y} r={3.2} fill="var(--text)" />
                <text x={x + dx * 15} y={y + dy * 15 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontStyle="italic" fill="var(--text)">{n}</text>
              </g>
            );
          })}
        </g>
      </svg>
      {caption && <p className="mt-1 text-center text-xs text-muted">{caption}</p>}
    </figure>
  );
}

/** A point on a circle (centre c, radius r) at an angle in degrees. */
export const onCircle = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] + r * Math.sin((deg * Math.PI) / 180)];
