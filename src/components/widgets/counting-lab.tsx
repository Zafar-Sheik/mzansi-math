"use client";
import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { Tex } from "@/components/learn/tex";
import { fracTex } from "@/lib/math/numbers";
import { arrangements, distinctPerms, factorial } from "@/lib/math/stats";
import { bumpStat } from "@/lib/progress";
import { Segmented, Slider, Toggle, WidgetFrame } from "./widget-frame";

type Mode = "slots" | "words";
type Rule = "none" | "vowel" | "together" | "consonant-ends";
const WORDS = ["MATHS", "DURBAN", "MZANSI", "SOWETO", "KAROO", "SANDTON", "LIMPOPO", "CAPE"];
const VOWELS = new Set("AEIOU");
const big = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const plain = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * The counting principle you can see: fill the slots of a code and multiply
 * the choices, or arrange the letters of a word – with restrictions – and
 * compare the count with the formula. Shuffle to meet a random arrangement.
 */
export function CountingLab({ mode: initial = "slots" }: { mode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [k, setK] = useState(4);
  const [pool, setPool] = useState<"digits" | "letters">("digits");
  const [repeat, setRepeat] = useState(true);
  const [noZero, setNoZero] = useState(false);
  const [word, setWord] = useState("MATHS");
  const [rule, setRule] = useState<Rule>("none");
  const [shown, setShown] = useState<string | null>(null);
  const [used, setUsed] = useState(false);
  const touch = () => {
    if (!used) { setUsed(true); bumpStat("toolsUsed"); }
  };

  // ------------------------------------------------ slots
  const size = pool === "digits" ? 10 : 26;
  const lead = pool === "digits" && noZero;
  // Without repetition and no leading zero: 9 for the first slot, then 9, 8, 7 … (0 is allowed again after the first).
  const slotChoices = Array.from({ length: k }, (_, i) => (repeat ? (lead && i === 0 ? 9 : size) : lead ? (i === 0 ? 9 : 10 - i) : size - i));
  const total = slotChoices.reduce((a, b) => a * b, 1);

  // ------------------------------------------------ words
  const singles = [...new Set(word)].filter((ch) => word.split(ch).length === 2);
  const pair = singles.length >= 2 ? [singles[0], singles[singles.length - 1]] : null;
  const tests: Record<Rule, (s: string) => boolean> = {
    none: () => true,
    vowel: (s) => VOWELS.has(s[0]),
    "consonant-ends": (s) => !VOWELS.has(s[0]) && !VOWELS.has(s[s.length - 1]),
    together: (s) => (pair ? Math.abs(s.indexOf(pair[0]) - s.indexOf(pair[1])) === 1 : true),
  };
  const all = useMemo(() => distinctPerms(word), [word]);
  const ok = useMemo(() => all.filter(tests[rule]), [all, rule]); // eslint-disable-line react-hooks/exhaustive-deps
  const reps = [...new Set(word)].filter((ch) => word.split(ch).length > 2);
  const formula = reps.length ? `\\frac{${word.length}!}{${reps.map((ch) => `${word.split(ch).length - 1}!`).join(" \\times ")}}` : `${word.length}!`;
  const shuffle = () => {
    touch();
    setShown(ok[Math.floor(Math.random() * ok.length)] ?? null);
  };
  const tiles = (shown && ok.includes(shown) ? shown : ok[0] ?? word).split("");

  return (
    <WidgetFrame title="Counting lab" colour="var(--t-prob)" instruction={mode === "slots" ? "Each slot shows how many choices it has. Multiply them – that's the fundamental counting principle." : "Pick a word and a restriction. The lab counts every arrangement – compare with the formula."}>
      <Segmented colour="var(--t-prob)" value={mode} onChange={setMode} options={[{ id: "slots", label: "Codes & slots" }, { id: "words", label: "Arranging letters" }]} />
      {mode === "slots" ? (
        <>
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="flex flex-wrap items-center justify-center gap-2 py-4">
              {slotChoices.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="grid h-20 w-16 place-items-center rounded-2xl border-2 border-[var(--t-prob)] bg-surface">
                    <div className="font-display text-3xl font-bold" style={{ color: "var(--t-prob)" }}>{c}</div>
                    <div className="-mt-3 text-[10px] text-muted">choices</div>
                  </div>
                  {i < slotChoices.length - 1 && <span className="text-2xl font-bold text-muted">×</span>}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Slider label="length of the code" value={k} min={2} max={6} onChange={(v) => { touch(); setK(v); }} colour="var(--t-prob)" />
              <Segmented colour="var(--t-prob)" value={pool} onChange={(v) => { touch(); setPool(v); }} options={[{ id: "digits", label: "Digits 0–9" }, { id: "letters", label: "Letters A–Z" }]} />
              <div className="flex flex-wrap gap-2">
                <Toggle on={repeat} onChange={(v) => { touch(); setRepeat(v); }}>Repetition allowed</Toggle>
                {pool === "digits" && <Toggle on={noZero} onChange={(v) => { touch(); setNoZero(v); }}>Can&apos;t start with 0</Toggle>}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
            <Tex display tex={`${slotChoices.join(" \\times ")} = ${big(total)}`} />
            <p className="text-center text-muted">{repeat ? `With repetition every slot has all ${size} choices${noZero && pool === "digits" ? " (except the first)" : ""}.` : "Without repetition each slot has one choice fewer than the one before."} A random guess succeeds with probability 1 in {plain(total)}.</p>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {WORDS.map((w) => <button key={w} onClick={() => { touch(); setWord(w); setShown(null); }} aria-pressed={word === w} className={`rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${word === w ? "bg-[var(--t-prob)] text-white" : "bg-surface-2 text-muted"}`}>{w}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {([["none", "No restriction"], ["vowel", "Starts with a vowel"], ["consonant-ends", "Consonant at both ends"], ...(pair ? [["together", `${pair[0]} and ${pair[1]} together`]] : [])] as [Rule, string][]).map(([id, label]) => (
              <button key={id} onClick={() => { touch(); setRule(id); setShown(null); }} aria-pressed={rule === id} className={`rounded-full border px-3 py-1 text-sm ${rule === id ? "border-[var(--t-prob)] font-semibold" : "border-line text-muted"}`}>{label}</button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {tiles.map((ch, i) => (
              <span key={`${i}-${ch}`} className="grid h-14 w-12 place-items-center rounded-xl border-2 font-display text-2xl font-bold" style={{ borderColor: VOWELS.has(ch) ? "var(--memory)" : "var(--t-prob)", color: VOWELS.has(ch) ? "var(--memory)" : "var(--t-prob)" }}>{ch}</span>
            ))}
            <button onClick={shuffle} className="ml-2 inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white"><Shuffle className="h-4 w-4" /> Shuffle</button>
          </div>
          <div className="mt-3 space-y-1 overflow-x-auto rounded-xl bg-surface-2 p-3 text-sm">
            <Tex display tex={`\\text{All arrangements: } ${formula} = ${big(arrangements(word))}`} />
            {rule !== "none" && <Tex display tex={`\\text{With the restriction: } ${big(ok.length)} \\qquad P = ${fracTex(ok.length, all.length)}`} />}
            <p className="text-center text-muted">
              {rule === "none" && (reps.length ? `Repeated letters (${reps.join(", ")}) are divided out: swapping identical letters gives the same word.` : `${word.length} different letters: ${word.length}! = ${plain(factorial(word.length))} orders.`)}
              {rule === "vowel" && "Fill the first box with a vowel first (the restricted position), then arrange the rest."}
              {rule === "consonant-ends" && "Fill the two end boxes with consonants first, then arrange the letters in between."}
              {rule === "together" && pair && `Glue ${pair[0]}${pair[1]} into one block: arrange the blocks, then × 2 because the block can be ${pair[0]}${pair[1]} or ${pair[1]}${pair[0]}.`}
            </p>
          </div>
        </>
      )}
    </WidgetFrame>
  );
}
