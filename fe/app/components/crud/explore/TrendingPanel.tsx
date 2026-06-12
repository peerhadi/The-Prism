"use client";

import { TrendingUp } from "lucide-react";

export default function TrendingPanel({ articles }: any) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-[180px] w-[180px] rounded-full bg-[var(--primary-soft)] blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-[11px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
              Trending Now
            </h3>

            <p className="mt-2 text-[11px] text-[var(--text-muted)]">
              Highest activity narratives
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--primary-border)] bg-[var(--primary-soft)]">
            <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
          </div>
        </div>

        {/* Stories */}
        <div className="space-y-4">
          {articles.slice(0, 8).map((a: any, i: number) => (
            <div
              key={a.id}
              className="
                group relative overflow-hidden
                rounded-2xl border border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-4
                transition-all duration-300
                hover:border-[var(--primary-border)]
                hover:bg-[var(--surface-hover)]
                hover:scale-[1.02]
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex gap-4">
                {/* Rank */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--primary-border)] bg-[var(--primary-soft)]">
                  <span className="text-sm font-black text-[var(--primary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)]">
                    {a.title}
                  </h4>

                  {a.category?.name && (
                    <p className="mt-2 text-[10px] font-black tracking-[0.2em] text-[var(--text-muted)] uppercase">
                      {a.category.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
