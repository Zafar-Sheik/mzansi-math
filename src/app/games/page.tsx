import type { Metadata } from "next";
import { GLOSSARY } from "@/content";
import { Games } from "@/components/pages/games";

export const metadata: Metadata = { title: "Games room", description: "Speed Solve, Graph Match, formula pairs, true/false blitz, odd one out and maths hangman." };

export default function GamesPage() {
  return <Games terms={GLOSSARY.map(({ term, def, topic }) => ({ term, def, topic }))} />;
}
