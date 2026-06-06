"use client";

import React from "react";
import { Search, Sparkles } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mt-10 relative z-10">
      <div className="relative mx-auto max-w-3xl">
        {/* glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-50" />

        <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <Search className="h-5 w-5 text-cyan-400" />

          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search intelligence graph..."
            className="w-full bg-transparent text-white placeholder:text-white/30 outline-none"
          />

          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
            <Sparkles className="h-4 w-4 text-purple-400" />
            AI SEARCH
          </div>
        </div>
      </div>
    </div>
  );
}
