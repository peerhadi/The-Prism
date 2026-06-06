"use client";

import React from "react";
import CyberCard from "./CyberCard";

export default function ThemeCard({ theme, setTheme }: any) {
  return (
    <CyberCard title="Theme" icon={require("lucide-react").Palette}>
      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setTheme("dark")}
          className={`rounded-2xl border p-6 text-left transition-all ${
            theme === "dark"
              ? "border-cyan-500/40 bg-cyan-500/10"
              : "border-white/10 bg-black/30"
          }`}
        >
          <div className="mb-4 h-24 rounded-xl border border-white/10 bg-[#05070d]" />
          <p className="font-semibold">Dark Theme</p>
          <p className="mt-1 text-sm text-white/40">
            Prism default experience.
          </p>
        </button>

        <button
          onClick={() => setTheme("light")}
          className={`rounded-2xl border p-6 text-left transition-all ${
            theme === "light"
              ? "border-cyan-500/40 bg-cyan-500/10"
              : "border-white/10 bg-black/30"
          }`}
        >
          <div className="mb-4 h-24 rounded-xl border border-black/10 bg-white" />
          <p className="font-semibold">Light Theme</p>
          <p className="mt-1 text-sm text-white/40">
            Bright reading experience.
          </p>
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="font-semibold">Active Theme</p>
        <p className="mt-1 text-sm text-white/40">
          Current theme:{" "}
          <span className="text-cyan-400 capitalize">{theme}</span>
        </p>
      </div>
    </CyberCard>
  );
}
