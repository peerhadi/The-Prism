"use client";

import {
  Radar,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

export default function SplitHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-white/5">
      {/* GLOWS */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-cyan-500/100" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-red-500/100" />

      {/* DIVIDER */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />

      <div className="relative z-20 grid w-full max-w-[1800px] grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col justify-center px-10 py-16 lg:px-20">
          <div className="mb-6 flex items-center gap-3">
            <Radar className="h-5 w-5 text-cyan-400" />
            <span className="text-[11px] font-black tracking-[0.5em] text-cyan-400 uppercase">
              OFFICIAL REALITY
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black uppercase">
            CONTROL
          </h1>

          <p className="mt-8 text-white/50 max-w-xl">
            Institutional systems maintain narrative stability through
            synchronized information flows.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-10 py-16 text-right lg:px-20">
          <div className="mb-6 flex items-center justify-end gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            <span className="text-[11px] font-black tracking-[0.5em] text-red-400 uppercase">
              SHADOW REALITY
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black uppercase">
            CHAOS
          </h1>

          <p className="mt-8 text-white/50 max-w-xl ml-auto">
            Independent signal leaks reveal fragmented narratives beneath
            institutional consensus.
          </p>
        </div>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">
          SCROLL TO COMPARE
        </span>
        <ChevronDown className="h-5 w-5 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
