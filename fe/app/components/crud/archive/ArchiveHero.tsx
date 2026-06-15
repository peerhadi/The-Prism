"use client";

import * as React from "react";
import { Radar } from "lucide-react";
import { getBiasColor } from "@/app/utils/getbiascolor";

interface ArchiveCategory {
  id: string;
  name?: string;
  label?: string;
  averageBias: number;
}

export default function ArchiveHero({
  categories,
  fileCount,
}: {
  categories: ArchiveCategory[];
  fileCount: number;
}) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-[var(--border)] bg-[var(--glass-bg)] p-10 backdrop-blur-2xl md:p-16">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--primary-soft)] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[var(--secondary-soft)] blur-[120px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-14 xl:grid-cols-12">
        {/* LEFT */}
        <div className="xl:col-span-8">
          {/* Pills */}
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[var(--primary-border)] bg-[var(--primary-soft)] px-5 py-2 text-[10px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
              <Radar className="h-3 w-3 animate-pulse" />
              Deep Storage
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase md:text-[10rem]">
            <span className="text-[var(--text-primary)]">Archive</span>
            <br />
            <span className="bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Vault
            </span>
          </h1>

          {/* Description */}
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">
            A classified repository of recovered media fragments, suppressed
            intelligence reports, narrative drift analysis, and synthetic
            influence documentation.
          </p>

          {/* Categories */}
          <div className="mt-14 flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <button
                key={cat.id ?? idx}
                className={`
                  group flex items-center gap-3 rounded-full
                  border px-5 py-3
                  text-[11px] font-black tracking-[0.2em]
                  uppercase
                  transition-all duration-300
                  hover:scale-105
                  ${
                    getBiasColor(cat.averageBias) ||
                    "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                  }
                `}
              >
                <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                {cat.name || cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--surface-secondary)] p-8 backdrop-blur-xl xl:col-span-4 max-h-[380px]">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-30" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
                  System Status
                </p>

                <h3 className="mt-3 text-3xl font-black uppercase text-[var(--text-primary)]">
                  Archive Online
                </h3>
              </div>

              <div className="h-3 w-3 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_20px_var(--primary)]" />
            </div>

            {/* Stats */}
            <div className="space-y-5">
              {[
                { label: "Recovered Files", value: fileCount },
                {
                  label: "AI Reconstructions",
                  value: Math.floor(fileCount / 4),
                },
                { label: "Identity Traces", value: "0%" },
                { label: "Signal Integrity", value: "100%" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-[var(--border)] pb-4"
                >
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.label}
                  </span>

                  <span className="text-sm font-black text-[var(--text-primary)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
