"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
          <Activity className="h-3 w-3 animate-pulse" />
          User Dossier
        </div>

        <h1 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">
          <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-800 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-white/50">
          Analyze your narrative fingerprint, source diversity, media
          consumption patterns, and intelligence profile.
        </p>
      </div>
    </section>
  );
}
