"use client";

import React from "react";

export default function StoryHeroHeader({
  topics,
  stats,
}: {
  topics: any[];
  stats: any[];
}) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      {/* glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
        {/* LEFT */}
        <div className="max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              LIVE INTELLIGENCE
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] text-white/40 uppercase">
              Neural Archive
            </div>
          </div>

          <h1 className="text-6xl font-black tracking-tighter uppercase md:text-[9rem]">
            STORIES
          </h1>

          <p className="mt-8 text-white/50 max-w-3xl">
            Autonomous intelligence systems tracking narrative divergence,
            emotional manipulation, and geopolitical distortion.
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-black/30 p-5"
            >
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-[10px] text-white/40 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOPICS */}
      <div className="relative z-10 mt-12 flex flex-wrap gap-4">
        {topics.map((t, i) => (
          <button
            key={i}
            className={`rounded-full border px-5 py-3 text-[11px] font-black uppercase ${t.color}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
