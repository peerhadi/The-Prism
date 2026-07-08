"use client";

import * as React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";

import SplitHero from "@/app/components/crud/split/SplitHero";
import SplitSection from "@/app/components/crud/split/SplitSection";
import ConflictCTA from "@/app/components/crud/split/ConflictCTA";
import { fetcher } from "@/lib/api/fetcher";
import { toast } from "@/lib/toast/toast";

/* ================= PAGE ================= */
export default function NarrativeSplitPage() {
  const [events, setEvents] = React.useState<{ id: string; neutral: { title: string; description: string }; extreme: { title: string; description: string }; imageUrl: string }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const [layoutRes, perspectivesRes] = await Promise.all([
          fetcher<{ components: any[] }>(`${process.env.NEXT_PUBLIC_API_URL}/api/layout/split`),
          fetcher<any[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`),
        ]);

        const errors = [layoutRes, perspectivesRes].map(r => r.error).filter(Boolean);
        if (errors.length) { toast.error(errors.join(", "), "Load Error"); throw new Error("load failed"); }

        const layout = layoutRes.data?.components ?? [];

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
        const clean = (perspectivesRes.data ?? [])
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
        const { data: raw, error: fallbackErr } = await fetcher<any[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`,
        );
        if (fallbackErr) { toast.error(fallbackErr, "Fallback Load Failed"); setLoading(false); return; }
        const perspectives = raw ?? [];

        const clean = perspectives
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
