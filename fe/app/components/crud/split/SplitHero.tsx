"use client";

import { Radar, ShieldAlert, ChevronDown } from "lucide-react";

export default function SplitHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-[var(--border)]">
      {/* SIDE GLOWS */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-[var(--primary-soft)]" />

      <div className="absolute right-0 top-0 h-full w-1/2 bg-[var(--secondary-soft)]" />

      {/* CENTER DIVIDER */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--border)] lg:block" />

      {/* EXTRA GLOWS */}
      <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--primary-soft)] blur-[160px]" />

      <div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--secondary-soft)] blur-[160px]" />

      <div className="relative z-20 grid w-full max-w-[1800px] grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col justify-center px-10 py-16 lg:px-20">
          <div className="mb-6 flex items-center gap-3">
            <Radar className="h-5 w-5 text-[var(--primary)]" />

            <span className="text-[11px] font-black tracking-[0.5em] text-[var(--primary)] uppercase">
              OFFICIAL REALITY
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] md:text-7xl lg:text-[9rem]">
            CONTROL
          </h1>

          <p className="mt-8 max-w-xl text-[var(--text-secondary)]">
            Institutional systems maintain narrative stability through
            synchronized information flows.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-10 py-16 text-right lg:px-20">
          <div className="mb-6 flex items-center justify-end gap-3">
            <ShieldAlert className="h-5 w-5 text-[var(--secondary)]" />

            <span className="text-[11px] font-black tracking-[0.5em] text-[var(--secondary)] uppercase">
              SHADOW REALITY
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] md:text-7xl lg:text-[9rem]">
            CHAOS
          </h1>

          <p className="mt-8 ml-auto max-w-xl text-[var(--text-secondary)]">
            Independent signal leaks reveal fragmented narratives beneath
            institutional consensus.
          </p>
        </div>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)]">
          SCROLL TO COMPARE
        </span>

        <ChevronDown className="h-5 w-5 animate-bounce text-[var(--primary)]" />
      </div>
    </section>
  );
}
