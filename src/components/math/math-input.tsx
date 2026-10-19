"use client";
import { useRef, useState } from "react";
import { Keyboard } from "lucide-react";
import type { AnswerKind } from "@/content/types";
import { normalise, parse, toTex } from "@/lib/math/expr";
import { cn } from "@/lib/utils";
import { Tex } from "@/components/learn/tex";

const KEYS: { label: string; insert: string; title: string }[] = [
  { label: "√", insert: "sqrt(", title: "square root" },
  { label: "xⁿ", insert: "^", title: "power" },
  { label: "x²", insert: "^2", title: "squared" },
  { label: "(", insert: "(", title: "open bracket" },
  { label: ")", insert: ")", title: "close bracket" },
  { label: "a/b", insert: "/", title: "fraction / divide" },
  { label: "−", insert: "-", title: "minus" },
  { label: "π", insert: "π", title: "pi" },
  { label: ";", insert: "; ", title: "separate answers" },
];

/** Live preview: show learners the maths they actually typed. */
function preview(input: string, kind: AnswerKind, vars: string[]): string | null {
  const clean = (s: string) => normalise(s).replace(/^.*=\s*/, "").replace(/^R\s*/i, "").replace(/%\s*$/, "").replace(/(\d),(\d)/g, "$1.$2").trim();
  try {
    if (kind === "point") {
      const parts = input.trim().replace(/^\(/, "").replace(/\)$/, "").split(input.includes(";") ? ";" : ",");
      return `\\left(${parts.map((p) => toTex(parse(clean(p), vars))).join(";\\ ")}\\right)`;
    }
    if (kind === "set") {
      const parts = input.split(/;|\bor\b|\band\b/i).flatMap((p) => (/±|\+-|\+\/-/.test(p) ? [p.replace(/±|\+-|\+\/-/, "+"), p.replace(/±|\+-|\+\/-/, "-")] : [p])).map((p) => p.trim()).filter(Boolean);
      return parts.map((p) => toTex(parse(clean(p), vars))).join("\\ \\text{ or }\\ ");
    }
    return toTex(parse(clean(input), vars));
  } catch {
    return null;
  }
}

export function MathInput({ value, onChange, onSubmit, kind = "number", vars = [], disabled, status, label = "Your answer" }: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  kind?: AnswerKind;
  vars?: string[];
  disabled?: boolean;
  status?: "ok" | "bad" | null;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [pad, setPad] = useState(false);
  const allowed = kind === "expr" ? (vars.length ? vars : ["x"]) : [];
  const tex = value.trim() ? preview(value, kind, allowed) : null;

  const insert = (s: string) => {
    const el = ref.current;
    if (!el) return onChange(value + s);
    const a = el.selectionStart ?? value.length;
    const b = el.selectionEnd ?? value.length;
    const next = value.slice(0, a) + s + value.slice(b);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + s.length, a + s.length);
    });
  };

  const placeholder = kind === "set" ? "e.g. x = 2 or x = -3" : kind === "point" ? "e.g. (2; -3)" : kind === "expr" ? `e.g. 2${allowed[0]}^2 + 3${allowed[0]} - 1` : "e.g. 3/4, 2sqrt(5), -1.5";

  return (
    <div>
      <label className="block">
        <span className="sr-only">{label}</span>
        <div className="flex gap-2">
          <input
            ref={ref}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
            inputMode="text"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={placeholder}
            aria-label={label}
            className={cn(
              "min-w-0 flex-1 rounded-xl border-2 bg-bg px-3 py-2 font-mono text-base outline-none transition focus:border-brand",
              status === "ok" ? "border-success" : status === "bad" ? "border-danger" : "border-line",
            )}
          />
          <button type="button" onClick={() => setPad((p) => !p)} aria-pressed={pad} aria-label="Show maths symbols"
            className={cn("rounded-xl border-2 px-3 transition", pad ? "border-brand bg-brand-soft text-brand" : "border-line text-muted hover:text-fg")}>
            <Keyboard className="h-5 w-5" />
          </button>
        </div>
      </label>
      {pad && !disabled && (
        <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Maths symbols">
          {KEYS.map((k) => (
            <button key={k.label} type="button" title={k.title} onClick={() => insert(k.insert)}
              className="h-9 min-w-10 rounded-lg border border-line bg-surface-2 px-2 font-mono text-sm font-bold hover:border-brand/60">
              {k.label}
            </button>
          ))}
          {kind === "set" && <button type="button" title="plus or minus" onClick={() => insert("±")} className="h-9 min-w-10 rounded-lg border border-line bg-surface-2 px-2 font-mono text-sm font-bold hover:border-brand/60">±</button>}
          {kind === "set" && <button type="button" onClick={() => insert(" or ")} className="h-9 rounded-lg border border-line bg-surface-2 px-2 text-sm font-bold hover:border-brand/60">or</button>}
          {kind === "expr" && allowed.map((v) => <button key={v} type="button" onClick={() => insert(v)} className="h-9 min-w-10 rounded-lg border border-line bg-surface-2 px-2 font-mono text-sm font-bold italic hover:border-brand/60">{v}</button>)}
        </div>
      )}
      <div className="mt-1 min-h-6 text-sm text-muted" aria-live="polite">
        {tex ? <span>You typed: <Tex tex={tex} /></span> : value.trim() ? <span className="text-xs">Keep going…</span> : null}
      </div>
    </div>
  );
}
