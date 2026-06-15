"use client";

import React from "react";

export function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* HOVER GLOW */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-soft), var(--secondary-soft))",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <p
          className="text-[10px] font-black tracking-[0.25em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          {title}
        </p>

        <h3
          className="mt-3 text-4xl font-black"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </h3>

        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
