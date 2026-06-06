"use client";

import React from "react";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* RADIAL GLOWS */}
      <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full bg-purple-500/10 blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[160px]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      </div>
    </div>
  );
}
