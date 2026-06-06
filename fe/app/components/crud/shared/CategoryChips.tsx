"use client";

import React from "react";

type Category = {
  id?: string;
  label: string;
  color?: string;
};

type Props = {
  items: Category[];
  active?: string | null;
  onChange: (id: string | null) => void;
};

export default function CategoryChips({ items, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mt-10">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full border px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] ${
          active === null
            ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
            : "border-white/10 text-white/50"
        }`}
      >
        All
      </button>

      {items.map((c, i) => (
        <button
          key={i}
          onClick={() => onChange(c.id || c.label)}
          className={`rounded-full border px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] ${c.color} ${
            active === (c.id || c.label)
              ? "scale-105"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
