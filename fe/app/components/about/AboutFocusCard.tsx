"use client";

import { ReactNode } from "react";

export default function AboutFocusCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>

      <p className="leading-relaxed text-white/60">{description}</p>
    </div>
  );
}
