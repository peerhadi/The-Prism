"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";

export default function StatsSection() {
  return (
    <section className="mt-10">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 className="h-5 w-5" style={{ color: "var(--primary)" }} />

        <h2
          className="text-2xl font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Narrative Statistics
        </h2>
      </div>

      {/* GRID */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Bias Score" value="0%" subtitle="Slightly balanced" />

        <StatCard
          title="Sources"
          value="0"
          subtitle="Active intelligence feeds"
        />

        <StatCard
          title="Diversity"
          value="0%"
          subtitle="High viewpoint spread"
        />

        <StatCard
          title="Extremity"
          value="0%"
          subtitle="Low ideological skew"
        />
      </div>
    </section>
  );
}
