"use client";

import { Split } from "lucide-react";

export default function SplitSection({ event }: { event: { imageUrl: string; neutral: { title: string; description: string }; extreme: { title: string; description: string } } }) {
  return (
    <section className="relative overflow-hidden border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-2xl">
      {/* LABEL */}
      <div className="absolute left-1/2 top-10 z-30 hidden -translate-x-1/2 lg:flex">
        <div
          className="
            flex items-center gap-3
            rounded-full
            border border-[var(--border)]
            bg-[var(--surface-secondary)]
            px-5 py-3
            backdrop-blur-xl
          "
        >
          <Split className="h-4 w-4 text-[var(--primary)]" />

          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-primary)]">
            NARRATIVE FRACTURE
          </span>
        </div>
      </div>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="group relative flex items-end overflow-hidden">
          <img
            src={event.imageUrl}
            alt=""
            className="
              absolute inset-0 h-full w-full object-cover
              opacity-60
              transition-all duration-700
              group-hover:scale-105
              group-hover:opacity-90
            "
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-soft)] via-[var(--background)]/70 to-[var(--background)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--primary-soft),transparent_60%)]" />

          <div className="relative z-10 p-10 md:p-20">
            <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[var(--primary)]">
              VERIFIED NARRATIVE
            </div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)] md:text-6xl">
              {event.neutral.title}
            </h2>

            <p className="mt-6 max-w-2xl text-[var(--text-secondary)]">
              {event.neutral.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="group relative flex items-end overflow-hidden border-t border-[var(--border)] lg:border-l lg:border-t-0">
          <img
            src={event.imageUrl}
            alt=""
            className="
              absolute inset-0 h-full w-full object-cover
              opacity-30 grayscale
              transition-all duration-700
              group-hover:scale-105
              group-hover:opacity-70
              group-hover:grayscale-0
            "
          />

          <div className="absolute inset-0 bg-gradient-to-bl from-[var(--secondary-soft)] via-[var(--background)]/70 to-[var(--background)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--secondary-soft),transparent_60%)]" />

          <div className="relative z-10 p-10 text-left md:p-20 lg:text-right">
            <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[var(--secondary)]">
              EXTREME NARRATIVE
            </div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)] md:text-6xl">
              {event.extreme.title}
            </h2>

            <p className="mt-6 ml-auto max-w-2xl text-[var(--text-secondary)]">
              {event.extreme.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
