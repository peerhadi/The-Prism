"use client";

import * as React from "react";
import { Radar, Lock } from "lucide-react";

export default function ArchiveHero({ categories }: { categories: any[] }) {
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

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-white/40 uppercase">
              <Lock className="h-3 w-3" />
              RESTRICTED ACCESS
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
            {categories.map((item: any) => (
              <button
                key={item.id}
                className={`group flex items-center gap-3 rounded-full ${item.color} bg-black/30 px-5 py-3 text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:scale-105`}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                {item.name}
              </button>
            ))}
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
            { label: "Recovered Files", value: "12,884" },
            { label: "AI Reconstructions", value: "341" },
            { label: "Identity Traces", value: "88%" },
            { label: "Signal Integrity", value: "74%" },
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
