"use client";

import React, { useEffect, useState } from "react";

import NarrativeSplitPage from "@/app/components/crud/split/NarrativeSplitPage";
import SplitHero from "@/app/components/crud/split/SplitHero";
import SplitSection from "@/app/components/crud/split/SplitSection";
import ConflictCTA from "@/app/components/crud/split/ConflictCTA";

import { PrismLoader } from "@/app/components/loadingScreen";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/perspectives")
      .then((res) => res.json())
      .then((data) => {
        const clean = data
          .filter((x: any) => x?.neutral?.title && x?.extreme?.title)
          .reverse()
          .slice(0, 4);

        setEvents(clean);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !events.length) return <PrismLoader />;

  return (
    <NarrativeSplitPage>
      {/* HERO */}
      <SplitHero />

      {/* SECTIONS */}
      {events.map((event, i) => (
        <SplitSection key={i} event={event} />
      ))}

      {/* FINAL CTA */}
      <ConflictCTA />
    </NarrativeSplitPage>
  );
}
