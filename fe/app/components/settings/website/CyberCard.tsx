"use client";

import React from "react";

export default function CyberCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            Configuration Module
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
        </div>
      </div>

      {children}
    </div>
  );
}
