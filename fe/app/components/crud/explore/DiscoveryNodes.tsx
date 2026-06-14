"use client";

import { Compass } from "lucide-react";

export default function DiscoveryNodes({
  categories,
  articles,
  setSelectedCategory,
}: {
  categories: { id: string; name: string }[];
  articles: { categoryId?: string | null }[];
  setSelectedCategory: (id: string) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[180px] w-[180px] rounded-full bg-[var(--primary-soft)] blur-[90px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-[11px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
              Discovery Nodes
            </h3>

            <p className="mt-2 text-[11px] text-[var(--text-muted)]">
              Explore intelligence clusters
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--primary-border)] bg-[var(--primary-soft)]">
            <Compass className="h-5 w-5 text-[var(--primary)]" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((c: { id: string; name: string }) => {
            const count = articles.filter(
              (a: { categoryId?: string | null }) => a.categoryId === c.id,
            ).length;

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className="
                  group relative w-full overflow-hidden
                  rounded-2xl border border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  p-4 text-left
                  transition-all duration-300
                  hover:border-[var(--primary-border)]
                  hover:bg-[var(--surface-hover)]
                  hover:scale-[1.02]
                "
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />

                    <span className="font-bold text-[var(--text-primary)]">
                      {c.name}
                    </span>
                  </div>

                  <div className="rounded-full border border-[var(--primary-border)] bg-[var(--primary-soft)] px-3 py-1 text-xs font-black text-[var(--primary)]">
                    {count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
