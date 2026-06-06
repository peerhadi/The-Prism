"use client";

import { NarrativeSplitCard } from "@/app/(user)/components/NarrativeSplitCard";
import React from "react";

export default function StorySplitCard({
  perspectives,
}: {
  perspectives: any[];
}) {
  const p = perspectives?.[perspectives.length - 2];

  if (!p) return null;

  return (
    <NarrativeSplitCard
      seedId="NODE-X44"
      topic="Narrative Divergence"
      versionA={{
        label: "Verified Narrative",
        title: p.neutral.title,
        description: p.neutral.description,
      }}
      versionB={{
        label: "Shadow Narrative",
        title: p.extreme.title,
        description: p.extreme.description,
      }}
    />
  );
}
