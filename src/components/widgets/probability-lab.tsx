"use client";
import { useState } from "react";
import { Dices } from "lucide-react";
import { Tex } from "@/components/learn/tex";
import { fracTex } from "@/lib/math/numbers";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Mode = "venn" | "tree";
const d2 = (pct: number) => (pct / 100).toString().replace(".", ",");
const dt = (pct: number) => (pct / 100).toString().replace(".", "{,}");
const frac = (n: number, d: number) => {
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  const k = g(n, d) || 1;
  return d / k === 1 ? String(n / k) : `${n / k}/${d / k}`;
};

function Venn({ a, b, ab }: { a: number; b: number; ab: number }) {
  // Overlap distance grows as P(A and B) shrinks.
  const gap = ab === 0 ? 150 : 140 - (ab / Math.min(a, b || 1)) * 80;
  const cx1 = 210 - gap / 2, cx2 = 210 + gap / 2;
  const t = (x: number, y: number, v: number, label: string) => (
    <g>
      <text x={x} y={y - 6} textAnchor="middle" fontSize="11" fill="var(--text-muted)">{label}</text>
      <text x={x} y={y + 12} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">{d2(v)}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-lg" role="img" aria-label="Venn diagram of events A and B">
      <rect x={4} y={4} width={412} height={232} rx={14} fill="var(--surface-2)" stroke="var(--border)" />
      <text x={16} y={26} fontSize="13" fontWeight="700" fill="var(--text-muted)">S</text>
      <circle cx={cx1} cy={120} r={80} fill="var(--t-prob)" fillOpacity={0.18} stroke="var(--t-prob)" strokeWidth={2.5} />
      <circle cx={cx2} cy={120} r={80} fill="var(--t-stats)" fillOpacity={0.18} stroke="var(--t-stats)" strokeWidth={2.5} />
      <text x={cx1 - 55} y={52} fontSize="15" fontWeight="700" fill="var(--t-prob)">A</text>
      <text x={cx2 + 45} y={52} fontSize="15" fontWeight="700" fill="var(--t-stats)">B</text>
      {t(cx1 - (ab ? 32 : 0), 120, a - ab, "only A")}
      {t(cx2 + (ab ? 32 : 0), 120, b - ab, "only B")}
      {ab > 0 && t(210, 120, ab, "both")}
      {t(380, 214, 100 - a - b + ab, "neither")}
    </svg>
  );
}

interface Venn3Props {
  names: [string, string, string];
  /** only A, only B, only C, A&B only, A&C only, B&C only, all three, none */
  counts: [number, number, number, number, number, number, number, number];
  title?: string;
}

/** A static three-event Venn diagram with a count in every region. */
function Venn3({ names, counts, title }: Venn3Props) {
  const [a, b, c, ab, ac, bc, abc, none] = counts;
  const total = counts.reduce((x, y) => x + y, 0);
  const cs = [{ x: 170, y: 105, col: "var(--t-prob)" }, { x: 250, y: 105, col: "var(--t-stats)" }, { x: 210, y: 170, col: "var(--t-geometry)" }];
  const num = (x: number, y: number, v: number) => <text x={x} y={y} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">{v}</text>;
  return (
    <WidgetFrame title={title ?? "Three-event Venn diagram"} colour="var(--t-prob)" instruction={`${total} in total. Fill a diagram like this from the centre outwards.`}>
      <svg viewBox="0 0 420 270" className="mx-auto w-full max-w-lg" role="img" aria-label={`Venn diagram of ${names.join(", ")}`}>
        <rect x={4} y={4} width={412} height={262} rx={14} fill="var(--surface-2)" stroke="var(--border)" />
        <text x={16} y={26} fontSize="13" fontWeight="700" fill="var(--text-muted)">S</text>
        {cs.map((k, i) => <circle key={i} cx={k.x} cy={k.y} r={72} fill={k.col} fillOpacity={0.14} stroke={k.col} strokeWidth={2.5} />)}
        <text x={22} y={62} fontSize="13" fontWeight="700" fill={cs[0].col}>{names[0]}</text>
        <text x={398} y={62} fontSize="13" fontWeight="700" fill={cs[1].col} textAnchor="end">{names[1]}</text>
        <text x={210} y={262} fontSize="14" fontWeight="700" fill={cs[2].col} textAnchor="middle">{names[2]}</text>
        {num(135, 95, a)}{num(285, 95, b)}{num(210, 210, c)}
        {num(210, 80, ab)}{num(172, 158, ac)}{num(248, 158, bc)}{num(210, 128, abc)}
        {num(385, 245, none)}
      </svg>
    </WidgetFrame>
  );
}

/**
 * Venn diagrams with live probabilities (addition rule, mutually exclusive,
 * independent), and tree diagrams for two draws from a bag – with or without
 * replacement – that you can test by simulating hundreds of draws.
 */
export function ProbabilityLab({ mode: initial = "venn", venn3 }: { mode?: Mode; venn3?: Venn3Props }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [a, setA] = useState(50);
  const [b, setB] = useState(40);
  const [ab, setAb] = useState(20);
  const [red, setRed] = useState(4);
  const [blue, setBlue] = useState(3);
  const [replace, setReplace] = useState(false);
  const [sim, setSim] = useState<Record<string, number>>({ RR: 0, RB: 0, BR: 0, BB: 0 });
  const [used, setUsed] = useState(false);
  const touch = () => {
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };
  if (venn3) return <Venn3 {...venn3} />;

  const setP = (which: "a" | "b" | "ab", v: number) => {
    touch();
    if (which === "ab") return setAb(Math.min(v, a, b, 100 - Math.max(0, a + b - 100)));
    const na = which === "a" ? v : a, nb = which === "b" ? v : b;
    const lo = Math.max(0, na + nb - 100);
    if (which === "a") setA(v); else setB(v);
    setAb((x) => Math.max(lo, Math.min(x, na, nb)));
  };

  const n = red + blue;
  const den = replace ? n * n : n * (n - 1);
  const outcomes = {
    RR: red * (replace ? red : red - 1),
    RB: red * blue,
    BR: blue * red,
    BB: blue * (replace ? blue : blue - 1),
  };
  const trials = Object.values(sim).reduce((x, y) => x + y, 0);
  const run = (k: number) => {
    touch();
    const next = { ...sim };
    for (let i = 0; i < k; i++) {
      const bag = [...Array(red).fill("R"), ...Array(blue).fill("B")] as string[];
      const i1 = Math.floor(Math.random() * bag.length);
      const first = bag[i1];
      if (!replace) bag.splice(i1, 1);
      const second = bag[Math.floor(Math.random() * bag.length)];
      next[first + second]++;
    }
    setSim(next);
  };
  const resetSim = () => setSim({ RR: 0, RB: 0, BR: 0, BB: 0 });

  return (
    <WidgetFrame title="Probability lab" colour="var(--t-prob)" instruction={mode === "venn" ? "Set P(A), P(B) and P(A and B). Watch the regions – and check: mutually exclusive? independent?" : "Change the bag, choose with or without replacement, then simulate draws and compare with the tree diagram."}>
      <Segmented colour="var(--t-prob)" value={mode} onChange={setMode} options={[{ id: "venn", label: "Venn diagram" }, { id: "tree", label: "Tree diagram & simulation" }]} />
      {mode === "venn" ? (
        <>
          <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="flex justify-center"><Venn a={a} b={b} ab={ab} /></div>
            <div className="space-y-3">
              <Slider label="P(A)" value={a} min={0} max={100} step={5} onChange={(v) => setP("a", v)} colour="var(--t-prob)" format={d2} />
              <Slider label="P(B)" value={b} min={0} max={100} step={5} onChange={(v) => setP("b", v)} colour="var(--t-stats)" format={d2} />
              <Slider label="P(A and B)" value={ab} min={Math.max(0, a + b - 100)} max={Math.min(a, b)} step={5} onChange={(v) => setP("ab", v)} colour="var(--memory)" format={d2} />
            </div>
          </div>
          <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
            <Tex display tex={`P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B) = ${dt(a)} + ${dt(b)} - ${dt(ab)} = ${dt(a + b - ab)}`} />
            <p className="text-center"><strong style={{ color: ab === 0 ? "var(--success)" : "var(--text-muted)" }}>{ab === 0 ? "✓ Mutually exclusive" : "Not mutually exclusive"}</strong> (A and B can{ab === 0 ? "not" : ""} happen together) · <strong style={{ color: a * b === ab * 100 ? "var(--success)" : "var(--text-muted)" }}>{a * b === ab * 100 ? "✓ Independent" : "Not independent"}</strong>: <Tex tex={`P(A) \\times P(B) = ${(a * b / 10000).toString().replace(".", "{,}")}`} /> {a * b === ab * 100 ? "=" : "≠"} <Tex tex={`P(A \\text{ and } B) = ${dt(ab)}`} /></p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <svg viewBox="0 0 440 250" className="w-full" role="img" aria-label="Tree diagram for two draws">
              {(["R", "B"] as const).map((f, i) => {
                const y1 = 65 + i * 120;
                const p1 = f === "R" ? red : blue;
                return (
                  <g key={f}>
                    <line x1={20} y1={125} x2={150} y2={y1} stroke="var(--text-muted)" strokeWidth={2} />
                    <text x={70} y={(125 + y1) / 2 - 6} fontSize="13" fill="var(--text)" fontWeight="600">{frac(p1, n)}</text>
                    <circle cx={160} cy={y1} r={13} fill={f === "R" ? "var(--danger)" : "var(--info)"} />
                    <text x={160} y={y1 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{f}</text>
                    {(["R", "B"] as const).map((s, j) => {
                      const y2 = y1 - 32 + j * 64;
                      const left = replace ? n : n - 1;
                      const p2 = (s === "R" ? red : blue) - (!replace && s === f ? 1 : 0);
                      const key = (f + s) as keyof typeof outcomes;
                      return (
                        <g key={s}>
                          <line x1={173} y1={y1} x2={290} y2={y2} stroke="var(--text-muted)" strokeWidth={2} />
                          <text x={215} y={(y1 + y2) / 2 - 6} fontSize="12" fill="var(--text)" fontWeight="600">{frac(p2, left)}</text>
                          <circle cx={300} cy={y2} r={11} fill={s === "R" ? "var(--danger)" : "var(--info)"} />
                          <text x={300} y={y2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{s}</text>
                          <text x={322} y={y2 + 5} fontSize="12" fill="var(--text)">{f}{s}: {frac(outcomes[key], den)}</text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
            <div className="space-y-3">
              <Slider label="red sweets" value={red} min={1} max={8} onChange={(v) => { touch(); setRed(v); resetSim(); }} colour="var(--danger)" />
              <Slider label="blue sweets" value={blue} min={1} max={8} onChange={(v) => { touch(); setBlue(v); resetSim(); }} colour="var(--info)" />
              <Toggle on={replace} onChange={(v) => { setReplace(v); resetSim(); }}>With replacement</Toggle>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white" onClick={() => run(100)}><Dices className="h-4 w-4" /> Draw ×100</button>
                <button className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold" onClick={() => run(1000)}>×1000</button>
              </div>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
            <table className="w-full text-center">
              <thead><tr className="text-muted"><th className="text-left">Outcome</th><th>Theory</th><th>Simulated ({trials} trials)</th></tr></thead>
              <tbody>
                {(Object.keys(outcomes) as (keyof typeof outcomes)[]).map((k) => (
                  <tr key={k}><td className="text-left font-bold">{k}</td><td><Tex tex={`${fracTex(outcomes[k], den)} \\approx ${(outcomes[k] / den).toFixed(3).replace(".", "{,}")}`} /></td><td className="font-mono">{trials ? (sim[k] / trials).toFixed(3).replace(".", ",") : "–"}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-center text-muted">The more trials, the closer the simulated relative frequencies get to the theory (the law of large numbers). {replace ? "With replacement, the second draw doesn't depend on the first – independent events." : "Without replacement, the second draw depends on the first – dependent events."}</p>
          </div>
        </>
      )}
    </WidgetFrame>
  );
}
