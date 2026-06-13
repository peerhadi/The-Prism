"use client";

import { Brain, AudioWaveform, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConflictCTA() {
  const router = useRouter();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[var(--primary-soft)] blur-[140px]" />

        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[var(--secondary-soft)] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        {/* Icons */}
        <div className="mb-8 flex justify-center gap-4">
          <div className="rounded-2xl border border-[var(--primary-border)] bg-[var(--primary-soft)] p-4">
            <Brain className="h-8 w-8 text-[var(--primary)]" />
          </div>

          <div className="rounded-2xl border border-[var(--secondary-border)] bg-[var(--secondary-soft)] p-4">
            <AudioWaveform className="h-8 w-8 text-[var(--secondary)]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[42px] font-black leading-[0.9] tracking-tight uppercase text-[var(--text-primary)] sm:text-6xl md:text-8xl lg:text-[110px]">
          WHICH REALITY
          <br />
          SURVIVES?
        </h1>

        {/* Description */}
        <p className="mx-auto mt-10 max-w-2xl text-lg text-[var(--text-secondary)]">
          Two competing narratives cannot coexist indefinitely in the same
          system.
        </p>

        {/* CTA */}
        <button
          className="
            mx-auto mt-14 flex items-center gap-4
            rounded-full
            border border-[var(--primary-border)]
            bg-[var(--primary-soft)]
            px-10 py-5
            text-[10px] font-black
            tracking-[0.4em]
            text-[var(--primary)]
            uppercase
            transition-all duration-300
            hover:scale-105
            hover:bg-[var(--surface-hover)]
          "
          onClick={() => router.push("/bias")}
        >
          ENTER DEEP COMPARISON
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
