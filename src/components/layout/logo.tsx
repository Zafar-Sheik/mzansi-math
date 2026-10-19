export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b21b6" />
            <stop offset="0.55" stopColor="#0e7490" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
        {/* axes and a parabola through its turning point */}
        <path d="M6 22 H27 M10 27 V5" stroke="white" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 7 Q16 37 25 7" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16" cy="22" r="2.4" fill="#fbbf24" />
      </svg>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          Maths<span className="bg-gradient-to-r from-brand to-trig bg-clip-text text-transparent">Mzansi</span>
        </span>
      )}
    </span>
  );
}
