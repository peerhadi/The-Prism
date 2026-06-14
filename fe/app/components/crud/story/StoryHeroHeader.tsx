"use client";

import { getBiasColor } from "@/app/utils/getbiascolor";
import React from "react";

export default function StoryHeroHeader({
  topics,
  stats,
}: {
  topics: any[];
  stats: any[];
}) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-[var(--border)] bg-[var(--glass-bg)] p-10 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[var(--primary-soft)] blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[var(--secondary-soft)] blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
        {/* LEFT */}
        <div className="max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-[var(--primary-border)] bg-[var(--primary-soft)] px-4 py-2 text-[10px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
              LIVE INTELLIGENCE
            </div>
          </div>

          <h1 className="text-6xl font-black tracking-tighter uppercase text-[var(--text-primary)] md:text-[9rem]">
            STORIES
          </h1>

          <p className="mt-8 max-w-3xl text-[var(--text-secondary)]">
            Autonomous intelligence systems tracking narrative divergence,
            emotional manipulation, and geopolitical distortion.
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5 backdrop-blur-xl"
            >
              <div className="text-3xl font-black text-[var(--text-primary)]">
                {s.value}
              </div>

              <div className="text-[10px] uppercase text-[var(--text-muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOPICS */}
      <div className="relative z-10 mt-12 flex flex-wrap gap-4">
        {/* ALL */}
        <button
          className="
            rounded-full border border-[var(--primary-border)]
            bg-[var(--primary-soft)]
            px-5 py-3
            text-[11px] font-black tracking-[0.2em]
            text-[var(--primary)]
            uppercase
            transition-all duration-300
            hover:scale-105
          "
        >
          All Stories
        </button>

        {/* CATEGORIES */}
        {topics.map((cat, idx) => {
          return (
            <button
              key={cat.id ?? idx}
              className={`
                group flex items-center gap-3 rounded-full
                border 
                ${cat.color}
                px-5 py-3
                text-[11px] font-black tracking-[0.2em]
                text-[var(--text-secondary)]
                uppercase
                ${cat.color}
                transition-all duration-300
                hover:scale-105
                hover:bg-[var(--surface-hover)]
                hover:text-[var(--text-primary)]
              `}
            >
              <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
              {cat.name || cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
