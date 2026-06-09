"use client";

import React from "react";

interface ExploreLayoutProps {
  hero?: React.ReactNode;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function ExploreLayout({
  hero,
  left,
  center,
  right,
}: ExploreLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {hero}

        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT */}
          <aside className="col-span-12 xl:col-span-3">{left}</aside>

          {/* CENTER */}
          <section className="col-span-12 xl:col-span-6">{center}</section>

          {/* RIGHT */}
          <aside className="col-span-12 xl:col-span-3">{right}</aside>
        </section>
      </main>
    </div>
  );
}
