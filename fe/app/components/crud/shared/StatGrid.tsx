"use client";

import React from "react";

type Stat = {
  icon: React.ElementType;
  label: string;
  value: string | number;
};

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-3xl border border-white/10 bg-black/30 p-5"
        >
          <s.icon className="mb-4 h-6 w-6 text-cyan-400" />
          <div className="text-3xl font-black">{s.value}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
