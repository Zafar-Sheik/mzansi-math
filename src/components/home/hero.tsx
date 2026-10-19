"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Infinity as InfinityIcon } from "lucide-react";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { Spotlight } from "@/components/aceternity/spotlight";
import { FlipWords } from "@/components/aceternity/flip-words";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorderLink } from "@/components/aceternity/moving-border";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

/** Hero: Aceternity aurora + spotlight, and a GSAP timeline that draws a graph – axes, a parabola, a hyperbola – and labels its features. */
export function Hero({ stats }: { stats: { lessons: number; tools: number; exam: number } }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>("[data-draw]");
    const fades = el.querySelectorAll("[data-fade]");
    const pops = el.querySelectorAll("[data-pop]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = motionAllowed() ? `${len}` : "0";
    });
    if (!motionAllowed()) {
      gsap.set(fades, { opacity: 1, y: 0 });
      gsap.set(pops, { opacity: 1, scale: 1 });
      return;
    }
    gsap.from(fades, { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 0.6 });
    tl.set(pops, { opacity: 0, scale: 0.6 })
      .fromTo(paths, { strokeDashoffset: (_i, t: SVGPathElement) => t.getTotalLength() }, { strokeDashoffset: 0, duration: 1.1, stagger: 0.25, ease: "power2.inOut" })
      .to(pops, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.15, ease: "back.out(2)" })
      .to({}, { duration: 3 });
  }, { scope: root });

  // Graph space: x ∈ [-5, 5], y ∈ [-5, 5] → 400 × 300 px
  const X = (x: number) => 200 + x * 36;
  const Y = (y: number) => 150 - y * 27;
  const parabola = Array.from({ length: 61 }, (_, k) => { const x = -1.2 + (k * 5.6) / 60; return `${k ? "L" : "M"}${X(x).toFixed(1)},${Y((x - 1.6) ** 2 - 3).toFixed(1)}`; }).join(" ");
  const branch = (from: number, to: number) => Array.from({ length: 41 }, (_, k) => { const x = from + ((to - from) * k) / 40; return `${k ? "L" : "M"}${X(x).toFixed(1)},${Y(2 / (x + 2) + 2).toFixed(1)}`; }).join(" ");

  return (
    <AuroraBackground className="border-b border-line">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#a78bfa" />
      <div ref={root} className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p data-fade className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm font-semibold text-muted backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-trig" /> CAPS Mathematics · Grade 11 &amp; 12
          </p>
          <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            <TextGenerateEffect words="Matric Maths, made interactive." highlight={["Maths", "interactive"]} />
          </h1>
          <p data-fade className="mt-5 max-w-xl text-lg text-muted">
            Bite-sized lessons on{" "}
            <FlipWords words={["surds", "parabolas", "hyperbolas", "the discriminant", "compound interest", "number patterns", "inequalities", "trig identities", "circle theorems"]} className="inline-block font-semibold text-brand" />
            {" "}— with graphs you can drag, questions that never run out, instant feedback and exam questions with memos. Built around the NSC Paper 1 and Paper 2.
          </p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <MovingBorderLink href="/learn">Start learning <ArrowRight className="h-4 w-4" /></MovingBorderLink>
            <Link href="/toolkit" className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface/70 px-6 py-3 font-semibold backdrop-blur transition hover:border-brand/50">
              <InfinityIcon className="h-4 w-4 text-memory" /> Play with the graphs
            </Link>
          </div>
          <dl data-fade className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
            {[[String(stats.lessons), "lessons"], [String(stats.tools), "interactive tools"], ["∞", "practice questions"], [String(stats.exam), "exam questions"]].map(([a, b]) => (
              <div key={b}>
                <dt className="sr-only">{b}</dt>
                <dd className="font-display text-3xl font-bold text-fg">{a}</dd>
                <dd className="text-sm text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-fade className="relative">
          <div className="decorative absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand/30 via-trig/20 to-geometry/30 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted">
              <span className="font-mono font-semibold">QUESTION 5 · FUNCTIONS</span>
              <span className="ml-auto rounded-md bg-algebra px-2 py-0.5 font-semibold text-white">Sketch f and g</span>
            </div>
            <svg viewBox="0 0 400 300" className="diagram" role="img" aria-label="Animated sketch of a parabola and a hyperbola with their features labelled">
              {Array.from({ length: 11 }, (_, i) => i - 5).map((v) => (
                <g key={v} stroke="var(--graph-grid)"><line x1={X(v)} x2={X(v)} y1={0} y2={300} /><line y1={Y(v)} y2={Y(v)} x1={0} x2={400} /></g>
              ))}
              <path data-draw d={`M0,${Y(0)} H400`} stroke="var(--graph-axis)" strokeWidth="1.5" />
              <path data-draw d={`M${X(0)},300 V0`} stroke="var(--graph-axis)" strokeWidth="1.5" />
              <path data-draw d={parabola} fill="none" stroke="var(--curve-1)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Asymptotes fade in (stroke-drawing would override their dashes). */}
              <g data-pop style={{ opacity: 0 }}>
                <path d={`M${X(-2)},0 V300`} stroke="var(--text-muted)" strokeDasharray="5 5" strokeWidth="1.5" />
                <path d={`M0,${Y(2)} H400`} stroke="var(--text-muted)" strokeDasharray="5 5" strokeWidth="1.5" />
              </g>
              <path data-draw d={branch(-1.85, 5.5)} fill="none" stroke="var(--curve-2)" strokeWidth="3.5" strokeLinecap="round" />
              <path data-draw d={branch(-5.5, -2.15)} fill="none" stroke="var(--curve-2)" strokeWidth="3.5" strokeLinecap="round" />
              <g data-pop style={{ opacity: 0, transformOrigin: `${X(1.6)}px ${Y(-3)}px` }}>
                <circle cx={X(1.6)} cy={Y(-3)} r="5.5" fill="var(--curve-1)" />
                <text x={X(1.6) + 9} y={Y(-3) + 5} fontSize="13" fontWeight="800" fill="var(--curve-1)" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">TP (1,6; −3)</text>
              </g>
              <g data-pop style={{ opacity: 0, transformOrigin: `${X(-2)}px 20px` }}><text x={X(-2) + 6} y={18} fontSize="12" fontWeight="700" fill="var(--text-muted)">x = −2</text></g>
              <g data-pop style={{ opacity: 0, transformOrigin: `350px ${Y(2)}px` }}><text x={392} y={Y(2) - 7} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--text-muted)">y = 2</text></g>
              <g data-pop style={{ opacity: 0, transformOrigin: `${X(0)}px ${Y(3)}px` }}><circle cx={X(0)} cy={Y(3)} r="5" fill="var(--curve-2)" /><text x={X(0) + 8} y={Y(3) - 6} fontSize="12" fontWeight="800" fill="var(--curve-2)" stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">(0; 3)</text></g>
            </svg>
            <div data-pop className="absolute right-4 bottom-4 w-60 rounded-xl border border-line bg-elevated p-3 shadow-2xl" style={{ opacity: 0 }}>
              <div className="text-[10px] font-bold tracking-wider text-algebra uppercase">Live from the grapher</div>
              <div className="mt-1 font-mono text-xs">f(x) = (x − 1,6)² − 3</div>
              <div className="font-mono text-xs">g(x) = 2/(x + 2) + 2</div>
              <div className="mt-1 text-xs text-muted">Drag a, p and q and watch it move.</div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
