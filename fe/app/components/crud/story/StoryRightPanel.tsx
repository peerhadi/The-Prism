"use client";

import { AnomalyCard } from "@/app/(user)/components/AnomalyCard";
import { HeadlineCard } from "@/app/(user)/components/HeadlineCard";
import React from "react";

export default function StoryRightPanel({
  headlines,
  anomaly,
  preview,
}: {
  headlines: any[];
  anomaly: any;
  preview?: boolean;
}) {
  return (
    <div className="space-y-10">
      <HeadlineCard title="LIVE HEADLINES" data={headlines} preview={preview} />

      <AnomalyCard
        id={anomaly?.id}
        sources={anomaly?.sources}
        title={anomaly?.title}
        desc={anomaly?.description}
        tag="Critical"
        intensity={anomaly?.biasLevel + "%"}
        color="border-cyan-500"
        img={anomaly?.imageUrl}
      />
    </div>
  );
}
