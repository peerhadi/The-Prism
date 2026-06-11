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
      className="absolute top-28 left-6 z-50 max-w-[calc(100%-3rem)] flex items-center gap-2 overflow-hidden rounded-2xl px-5 py-3 backdrop-blur-2xl text-sm"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary), transparent)",
        }}
      />

      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] transition-all duration-300"
        style={{
          color: "var(--text-muted)",
        }}
      >
        <Home size={14} />
        <span>Dashboard</span>
      </Link>

      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight
            size={14}
            style={{
              color: "var(--text-faint)",
            }}
          />

          {item.href ? (
            <Link
              href={item.href}
              className="text-xs uppercase tracking-[0.14em] transition-all duration-300"
              style={{
                color: "var(--text-muted)",
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                color: "var(--primary)",
              }}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}

      <div
        className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "var(--primary-glow)",
        }}
      />
    </div>
  );
}
