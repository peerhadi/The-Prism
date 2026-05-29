"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Item = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <div
      className="
        absolute top-25 left-4 z-50
        flex items-center gap-2
        text-sm text-cyan-200/60
        bg-black/20 backdrop-blur-md
        px-4 py-2 rounded-lg
        border border-cyan-500/10
      "
    >
      {/* Home */}
      <Link
        href="/dashboard"
        className="flex items-center gap-1 hover:text-cyan-300 transition"
      >
        <Home size={14} />
        <span className="tracking-widest uppercase text-xs">Dashboard</span>
      </Link>

      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-cyan-500/40" />

          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-cyan-300 transition tracking-wide uppercase text-xs"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-cyan-400 tracking-wide uppercase text-xs">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
