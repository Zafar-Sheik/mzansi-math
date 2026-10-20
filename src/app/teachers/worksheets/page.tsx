import type { Metadata } from "next";
import { Suspense } from "react";
import { WorksheetBuilder } from "@/components/pages/worksheet-builder";

export const metadata: Metadata = { title: "Worksheet generator", description: "Printable Grade 11 & 12 Mathematics worksheets with memos, generated from MathsMzansi's question generators." };

export default function WorksheetsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-10 text-muted">Loading…</div>}>
      <WorksheetBuilder />
    </Suspense>
  );
}
