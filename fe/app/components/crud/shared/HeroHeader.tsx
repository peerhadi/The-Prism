"use client";

import React from "react";

type Stat = {
  icon: React.ElementType;
  label: string;
  value: string | number;
};

type Props = {
  badgeLeft: React.ReactNode;
  badgeRight?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  stats?: Stat[];
  children?: React.ReactNode; // right-side slot (optional extra UI)
};

export default function HeroHeader({
  badgeLeft,
  badgeRight,
  title,
  subtitle,
  description,
  stats = [],
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 md:p-16 backdrop-blur-2xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
        {/* LEFT */}
        <div className="max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {badgeLeft}
            {badgeRight}
          </div>

          <h1 className="text-6xl md:text-[9rem] font-black uppercase leading-[0.9] tracking-tighter">
            {title}
          </h1>

          {subtitle && <p className="mt-6 text-xl text-white/60">{subtitle}</p>}

          {description && (
            <p className="mt-8 max-w-3xl text-lg text-white/50">
              {description}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-black/30 p-5"
            >
              <s.icon className="mb-4 h-6 w-6 text-cyan-400" />
              <div className="text-2xl font-black">{s.value}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                {s.label}
              </div>
            </div>
          ))}

          {children}
        </div>
      </div>
    </section>
  );
}
