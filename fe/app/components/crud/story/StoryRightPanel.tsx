"use client";

import { AnomalyCard } from "@/app/(user)/components/AnomalyCard";
import { HeadlineCard } from "@/app/(user)/components/HeadlineCard";
import React from "react";

export default function StoryRightPanel({
  headlines,
  anomaly,
  preview,
}: {
  headlines: { title?: string; id?: string; tag?: string; time?: string; sources?: { source: string; title: string; url: string }[]; variant?: string }[];
  anomaly: { id?: string; title?: string; description?: string; sources?: { source: string; title: string; url: string }[]; biasLevel?: string; imageUrl?: string } | null;
  preview?: boolean;
}) {
  return (
    <div className="space-y-10">
      <HeadlineCard title="LIVE HEADLINES" data={headlines.map((h) => ({ id: h.id ?? "", tag: h.tag ?? "HEADLINE", sources: h.sources ?? [], time: h.time ?? "", title: h.title ?? "", variant: h.variant as "cyan" | "purple" | "red" | "emerald" | undefined }))} />

      {anomaly && (
        <AnomalyCard
          id={anomaly.id ?? ""}
          sources={anomaly.sources ?? []}
          title={anomaly.title ?? ""}
          desc={anomaly.description ?? ""}
          tag="Critical"
          intensity={(anomaly.biasLevel ?? "0") + "%"}
          color="border-cyan-500"
          img={anomaly.imageUrl ?? ""}
        />
      )}
    </div>
  );
}
