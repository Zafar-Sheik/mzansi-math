import type { Metadata } from "next";
import { QUESTION_BANK } from "@/content";
import { QuizArena } from "@/components/pages/quiz-arena";

export const metadata: Metadata = { title: "Quiz Arena", description: "Mixed-topic Grade 11 & 12 Maths quiz rounds – relaxed or against the clock." };

export default function QuizPage() {
  return <QuizArena bank={QUESTION_BANK} />;
}
