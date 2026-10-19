import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PrefsApplier, themeBootScript } from "@/components/layout/prefs-applier";
import { ReadingRuler } from "@/components/layout/reading-ruler";
import { RewardLayer } from "@/components/layout/reward-layer";
import { ProgressBootstrap } from "@/components/layout/progress-bootstrap";
import { TOPIC_INDEX } from "@/content";

export const metadata: Metadata = {
  title: { default: "MathsMzansi – Grade 11 & 12 Mathematics (CAPS)", template: "%s · MathsMzansi" },
  description:
    "Interactive CAPS Grade 11 & 12 Mathematics: algebra, functions, finance, geometry and trigonometry – with live graphs, endless practice, quizzes, flashcards, exam questions and games. ADHD-friendly and accessible.",
  applicationName: "MathsMzansi",
  keywords: ["Mathematics", "Maths", "CAPS", "Grade 11", "Grade 12", "NSC", "matric", "algebra", "functions", "trigonometry", "geometry", "South Africa"],
  openGraph: { title: "MathsMzansi", description: "Grade 11 & 12 Maths, the interactive way.", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0a16" }, { media: "(prefers-color-scheme: light)", color: "#f7f7fb" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen">
        <PrefsApplier />
        <ProgressBootstrap topicIndex={TOPIC_INDEX} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ReadingRuler />
        <RewardLayer />
      </body>
    </html>
  );
}
