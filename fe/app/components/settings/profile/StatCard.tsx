"use client";

import React from "react";

export function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 transition-all duration-300 hover:border-cyan-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
          {title}
        </p>

        <h3 className="mt-3 text-4xl font-black">{value}</h3>

        <p className="mt-2 text-sm text-white/40">{subtitle}</p>
      </div>
    </div>
  );
}
