import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="font-mono text-sm text-danger">f(404) is undefined – this page is outside the domain.</div>
      <h1 className="mt-3 font-display text-5xl font-bold">404</h1>
      <p className="mt-3 text-lg text-muted">You&apos;ve shot off to an asymptote. You&apos;ll get infinitely close to this page, but you&apos;ll never actually reach it.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-brand px-5 py-2.5 font-semibold text-white">Back to the origin (0; 0)</Link>
    </div>
  );
}
