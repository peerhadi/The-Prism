"use client";

import React from "react";
import CyberCard from "./CyberCard";
import { Palette } from "lucide-react";

export default function ThemeCard({ theme, setTheme }: any) {
  return (
    <CyberCard title="Theme" icon={Palette}>
      <div className="grid gap-4 md:grid-cols-2">
        {/* DARK */}
        <button
          onClick={() => setTheme("dark")}
          className="rounded-2xl border p-6 text-left transition-all"
          style={{
            borderColor:
              theme === "dark" ? "var(--primary-border)" : "var(--border)",
            background:
              theme === "dark" ? "var(--primary-soft)" : "var(--surface)",
          }}
        >
          <div
            className="mb-4 h-24 rounded-xl border"
            style={{
              background: "#05070d",
              borderColor: "var(--border)",
            }}
          />

          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Dark Theme
          </p>

          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Prism default experience.
          </p>
        </button>

        {/* LIGHT */}
        <button
          onClick={() => setTheme("light")}
          className="rounded-2xl border p-6 text-left transition-all"
          style={{
            borderColor:
              theme === "light" ? "var(--primary-border)" : "var(--border)",
            background:
              theme === "light" ? "var(--primary-soft)" : "var(--surface)",
          }}
        >
          <div
            className="mb-4 h-24 rounded-xl border"
            style={{
              background: "#ffffff",
              borderColor: "var(--border)",
            }}
          />

          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Light Theme
          </p>

          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            Bright reading experience.
          </p>
        </button>
      </div>

      {/* ACTIVE THEME */}
      <div
        className="mt-6 rounded-2xl border p-5"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          Active Theme
        </p>

        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Current theme:{" "}
          <span
            style={{
              color: "var(--primary)",
              textTransform: "capitalize",
            }}
          >
            {theme}
          </span>
        </p>
      </div>
    </CyberCard>
  );
}
