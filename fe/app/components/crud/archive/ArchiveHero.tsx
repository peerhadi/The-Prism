"use client";

import * as React from "react";
import { Radar, Lock } from "lucide-react";
import { getBiasColor } from "@/app/utils/getbiascolor";

export default function ArchiveHero({
  categories,
  fileCount,
}: {
  categories: any[];
  fileCount: number;
}) {
  console.log(categories);
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 md:p-16">
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 grid grid-cols-1 gap-14 xl:grid-cols-12">
        {/* LEFT */}
        <div className="xl:col-span-8">
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
              <Radar className="h-3 w-3 animate-pulse" />
              DEEP STORAGE
            </div>
          </div>

          <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase md:text-[10rem]">
            ARCHIVE
            <br />
            <span className="bg-gradient-to-b from-cyan-300 to-cyan-900 bg-clip-text text-transparent">
              VAULT
            </span>
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/50">
            A classified repository of recovered media fragments, suppressed
            intelligence reports, narrative drift analysis, and synthetic
            influence documentation.
          </p>

          <div className="mt-14 flex flex-wrap gap-3">
            {categories.map((cat, idx) => {
              return (
                <button
                  key={cat.id ?? idx}
                  className={`
              group flex items-center gap-3 rounded-full border px-5 py-3
              text-[11px] font-black tracking-[0.2em] uppercase
              transition-all duration-300 hover:scale-105
              ${getBiasColor(cat.averageBias) || "border-white/10 bg-white/5 text-white/60"}
                  hover:bg-white/10`}
                >
                  <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                  {cat.name || cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4 space-y-6 rounded-[40px] border border-white/10 bg-black/30 p-8 backdrop-blur-xl max-h-[400px]">
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                SYSTEM STATUS
              </p>

              <h3 className="mt-3 text-3xl font-black uppercase">
                ARCHIVE ONLINE
              </h3>
            </div>

            <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_20px_#22d3ee]" />
          </div>
          {[
            { label: "Recovered Files", value: fileCount },
            { label: "AI Reconstructions", value: fileCount / 4 },
            { label: "Identity Traces", value: "0%" },
            { label: "Signal Integrity", value: "100%" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-white/5 pb-4"
            >
              <span className="text-sm text-white/50">{item.label}</span>
              <span className="text-sm font-black">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
