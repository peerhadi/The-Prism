"use client";

import { Brain, AudioWaveform, ArrowDown } from "lucide-react";

export default function ConflictCTA() {
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="relative z-10 max-w-4xl text-center px-6">
        <div className="mb-8 flex justify-center gap-4">
          <Brain className="h-8 w-8 text-cyan-400" />
          <AudioWaveform className="h-8 w-8 text-red-400" />
        </div>

        <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight">
          WHICH REALITY SURVIVES?
        </h2>

        <p className="mt-10 text-white/40">
          Two competing narratives cannot coexist indefinitely in the same
          system.
        </p>

        <button className="mt-14 flex items-center gap-4 mx-auto border border-white/10 px-10 py-5 uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 transition">
          ENTER DEEP COMPARISON
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
