"use client";

import React from "react";

type Category = {
  id?: string;
  name?: string;
  label?: string;
  color?: string;
};

type Props = {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
};

export default function CategoryChips({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="relative z-10 mt-12 flex flex-wrap gap-4">
      {/* ALL */}
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full border px-5 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105
          ${
            selected === null
              ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
              : "border-white/10 bg-white/5 text-white/50 hover:border-cyan-500/30"
          }`}
      >
        All Stories
      </button>

      {/* CATEGORIES */}
      {categories.map((cat, idx) => {
        const isActive = selected === cat.id;
        console.log(cat);
        return (
          <button
            key={cat.id ?? idx}
            onClick={() => onSelect(cat.id ?? null)}
            className={`
              group flex items-center gap-3 rounded-full border px-5 py-3
              text-[11px] font-black tracking-[0.2em] uppercase
              transition-all duration-300 hover:scale-105
              ${cat.color || "border-white/10 bg-white/5 text-white/60"}
              ${
                isActive
                  ? "ring-2 ring-cyan-400/40 bg-cyan-500/20 text-cyan-300"
                  : "hover:bg-white/10"
              }
            `}
          >
            <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
            {cat.name || cat.label}
          </button>
        );
      })}
    </div>
  );
}
