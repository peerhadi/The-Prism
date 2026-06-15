"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section
      className="relative overflow-hidden rounded-[40px] border p-10 backdrop-blur-2xl"
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full blur-[100px]"
          style={{ background: "var(--primary-glow)" }}
        />

        <div
          className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full blur-[100px]"
          style={{ background: "var(--secondary-glow)" }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* BADGE */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          <Activity className="h-3 w-3 animate-pulse" />
          User Dossier
        </div>

        {/* TITLE */}
        <h1
          className="text-5xl font-black tracking-tighter uppercase md:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          Profile
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 max-w-3xl" style={{ color: "var(--text-muted)" }}>
          Analyze your narrative fingerprint, source diversity, media
          consumption patterns, and intelligence profile.
        </p>
      </div>
    </section>
  );
}
