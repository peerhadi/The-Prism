"use client";

import * as React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";

import SplitHero from "./SplitHero";
import SplitSection from "./SplitSection";
import ConflictCTA from "./ConflictCTA";

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
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full bg-red-500/10 blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.04]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:90px_90px]" />
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
