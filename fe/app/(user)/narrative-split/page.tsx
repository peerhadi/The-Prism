"use client";

import * as React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";

import SplitHero from "@/app/components/crud/split/SplitHero";
import SplitSection from "@/app/components/crud/split/SplitSection";
import ConflictCTA from "@/app/components/crud/split/ConflictCTA";

/* ================= PAGE ================= */
export default function NarrativeSplitPage() {
  const [events, setEvents] = React.useState<{ id: string; neutral: { title: string; description: string }; extreme: { title: string; description: string }; imageUrl: string }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const [layoutRes, perspectivesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/layout/split`).then(
            (r) => r.json(),
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`).then(
            (r) => r.json(),
          ),
        ]);

        const layout = layoutRes?.components ?? [];

        // -------------------------------
        // NO CONFIG: ONLY TYPE COUNTS
        // -------------------------------
        let cursor = 0;

        const next = (n: number, source: { id: string; neutral: { title: string; description: string }; extreme: { title: string; description: string }; imageUrl: string }[]) => {
          const slice = source.slice(cursor, cursor + n);
          cursor += n;
          return slice;
        };

        // fallback dataset (always real API data)
        const clean = perspectivesRes
          .filter(
            (x: { neutral?: { title?: string }; extreme?: { title?: string }; imageUrl?: string }) =>
              x?.neutral?.title && x?.extreme?.title && x?.imageUrl?.length,
          )
          .slice(0, 10);

        // determine counts from layout ONLY
        const count = layout.filter(
          (c: { type: string }) => c.type === "SPLIT_SECTION",
        ).length;

        const final = next(count || 4, clean);

        setEvents(final);
      } catch {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`,
        );
        const raw = await res.json();

        const clean = raw
          .filter(
            (x: { neutral?: { title?: string }; extreme?: { title?: string }; imageUrl?: string }) =>
              x?.neutral?.title && x?.extreme?.title && x?.imageUrl?.length,
          )
          .slice(0, 4);

        setEvents(clean);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading || !events.length) return <PrismLoader />;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* HERO */}
      <SplitHero />

      {/* EVENTS */}
      {events.map((event) => (
        <SplitSection key={event.id} event={event} />
      ))}

      {/* CTA */}
      <ConflictCTA />
    </div>
  );
}
