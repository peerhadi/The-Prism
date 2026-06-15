"use client";

import React from "react";

export default function CyberCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[32px] border p-8 backdrop-blur-xl"
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4">
        {/* ICON WRAP */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
        </div>

        {/* TEXT */}
        <div>
          <p
            className="text-[10px] font-black tracking-[0.3em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            Configuration Module
          </p>

          <h2
            className="mt-1 text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
        </div>
      </div>

      {children}
    </div>
  );
}
