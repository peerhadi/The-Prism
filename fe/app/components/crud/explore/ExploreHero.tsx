"use client";

import { Activity, Globe, Radar, Sparkles, Compass } from "lucide-react";

export default function ExploreHero({
  articles,
  categories,
  filteredCount,
  smallCount,
  selectedCategory,
  setSelectedCategory,
}: {
  articles: { length: number };
  categories: { id: string; name?: string; label?: string; color?: string }[];
  filteredCount: number;
  smallCount: number;
  selectedCategory?: string | null;
  setSelectedCategory?: (c: string | null) => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-[var(--border)] bg-[var(--glass-bg)] p-10 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[var(--primary-soft)] blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[var(--secondary-soft)] blur-[120px] animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div>
          <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            {/* LEFT */}
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[var(--primary-border)] bg-[var(--primary-soft)] px-4 py-2 text-[10px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
                  <Compass className="mr-2 inline h-3 w-3" />
                  EXPLORE NETWORK
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
            {categories.map((cat, idx) => {
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
        </div>
      </div>
    </section>
  );
}
