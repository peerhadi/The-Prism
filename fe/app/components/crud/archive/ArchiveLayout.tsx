"use client";

import React from "react";

export default function ArchiveLayout({
  hero,
  left,
  center,
  right,
}: {
  hero: React.ReactNode;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03060d] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[160px]" />

        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-[1900px] px-6 py-10">
        {/* HERO */}
        <section className="mb-16">{hero}</section>

        {/* GRID (same structure as StoryPageLayout style) */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* LEFT */}
          <aside className="xl:col-span-3 space-y-8">{left}</aside>

          {/* CENTER */}
          <section className="xl:col-span-6 space-y-10">{center}</section>

          {/* RIGHT */}
          <aside className="xl:col-span-3 space-y-8">{right}</aside>
        </section>
      </main>

      {/* BOTTOM LINE */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </div>
  );
}
