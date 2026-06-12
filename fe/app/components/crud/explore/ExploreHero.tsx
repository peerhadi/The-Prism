"use client";

import { Activity, Globe, Radar, Sparkles, Compass } from "lucide-react";

export default function ExploreHero({
  articles,
  categories,
  filteredCount,
  smallCount,
}: any) {
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
              <Compass className="mr-2 inline h-3 w-3" />
              EXPLORE NETWORK
            </div>

            <div className="rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-2 text-[10px] font-black tracking-[0.2em] text-[var(--text-muted)] uppercase">
              DISCOVERY ENGINE
            </div>
          </div>

          <h1 className="text-6xl font-black tracking-tighter uppercase text-[var(--text-primary)] md:text-[9rem]">
            EXPLORE
          </h1>

          <p className="mt-8 max-w-3xl text-[var(--text-secondary)]">
            Discover narratives, investigate signals, track information
            movement, and navigate intelligence networks across the Prism
            ecosystem.
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: Activity,
              label: "Articles",
              value: articles.length,
            },
            {
              icon: Globe,
              label: "Categories",
              value: categories.length,
            },
            {
              icon: Radar,
              label: "Filtered",
              value: filteredCount,
            },
            {
              icon: Sparkles,
              label: "Discoveries",
              value: smallCount,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                rounded-3xl
                border border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-5
                backdrop-blur-xl
              "
            >
              <item.icon
                className="mb-4 h-6 w-6"
                style={{
                  color: "var(--primary)",
                }}
              />

              <div className="text-3xl font-black text-[var(--text-primary)]">
                {item.value}
              </div>

              <div className="text-[10px] uppercase text-[var(--text-muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
