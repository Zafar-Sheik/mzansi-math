import type { Metadata } from "next";
import { Toolkit } from "@/components/pages/toolkit";

export const metadata: Metadata = { title: "Interactive toolkit", description: "Function graphers, a quadratic lab, inequality and intersection labs, a pattern machine, money tools and endless drills." };

export default function ToolkitPage() {
  return <Toolkit />;
}
