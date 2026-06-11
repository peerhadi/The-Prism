"use client";

import * as React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";

import SplitHero from "@/app/components/crud/split/SplitHero";
import SplitSection from "@/app/components/crud/split/SplitSection";
import ConflictCTA from "@/app/components/crud/split/ConflictCTA";

export default function NarrativeSplitPage() {
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/perspectives")
      .then((res) => res.json())
      .then((data) => {
        const clean = data
          .filter((x: any) => x?.neutral?.title && x?.extreme?.title)
          .reverse()
          .slice(0, 4);

        setEvents(clean);
      });
  }, []);

  if (!events.length) return <PrismLoader />;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        {/* glowing orbs */}
        <div
          className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: "var(--primary-glow)" }}
        />

        <div
          className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: "var(--danger-glow)" }}
        />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
        </div>
      </div>

      {/* HERO */}
      <SplitHero />

      {/* EVENTS */}
      {events.map((event, i) => (
        <SplitSection key={i} event={event} />
      ))}

      {/* FINAL CTA */}
      <ConflictCTA />
    </div>
  );
}
