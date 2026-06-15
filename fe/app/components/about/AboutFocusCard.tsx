"use client";

import { ReactNode } from "react";

export default function AboutFocusCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="group border p-8 transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* ICON WRAPPER */}
      <div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border"
        style={{
          borderColor: "var(--primary-border)",
          background: "var(--primary-soft)",
          color: "var(--primary)",
        }}
      >
        {icon}
      </div>

      {/* TITLE */}
      <h3
        className="mb-4 text-2xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>

      {/* HOVER LAYER (system glow instead of cyan shift) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-soft), transparent)",
        }}
      />
    </div>
  );
}
