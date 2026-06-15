"use client";

import * as React from "react";
import { Activity, Clock3 } from "lucide-react";

export default function ArchiveLogs({ articles }: { articles: { id: string; title?: string; summary?: string }[] }) {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[180px] w-[180px] rounded-full bg-[var(--primary-soft)] blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-[10px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
              Archive Logs
            </h3>

            <p className="mt-2 text-[11px] text-[var(--text-muted)]">
              Historical intelligence snapshots
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--primary-border)] bg-[var(--primary-soft)]">
            <Activity className="h-5 w-5 animate-pulse text-[var(--primary)]" />
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-4">
          {articles.slice(0, 4).map((article) => (
            <div
              key={article.id}
              className="
                group relative overflow-hidden
                rounded-2xl border border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-5
                transition-all duration-300
                hover:border-[var(--primary-border)]
                hover:bg-[var(--surface-hover)]
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--primary-border)] bg-[var(--primary-soft)]">
                  <Clock3 className="h-4 w-4 text-[var(--primary)]" />
                </div>

                <div className="flex-1">
                  <p className="line-clamp-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {article.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
