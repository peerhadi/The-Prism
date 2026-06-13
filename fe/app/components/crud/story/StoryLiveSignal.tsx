"use client";

import StickyInsight from "@/app/(user)/components/TickerCard";
import React from "react";

export default function StoryLiveSignal({ articles }: { articles: any[] }) {
  if (!articles?.length) return null;

  // deterministic slice (NO RANDOM INDEXING)
  const insights = [articles[0], articles[1], articles[2], articles[3]].filter(
    Boolean,
  );

  const variants = ["cyan", "amber", "purple", "red"] as const;

  return (
    <div className="rounded-[36px] p-8 backdrop-blur-xl">
      <div className="grid grid-cols-1 gap-6 space-y-0">
        {insights.map((item, i) => (
          <StickyInsight
            key={item.id || i}
            variant={variants[i % variants.length]}
            title={item.title}
            content={item.summary}
          />
        ))}
      </div>
    </div>
  );
}
