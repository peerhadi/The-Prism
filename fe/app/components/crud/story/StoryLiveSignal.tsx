"use client";

import StickyInsight from "@/app/(user)/components/TickerCard";
import React from "react";

export default function StoryLiveSignal({ articles }: { articles: any[] }) {
  return (
    <div className="rounded-[36px] p-8 backdrop-blur-xl">
      <div className="space-y-6 grid grid-cols-1 gap-6">
        <StickyInsight
          variant="cyan"
          title={articles?.[0]?.title}
          content={articles?.[0]?.summary}
        />
        <StickyInsight
          variant="cyan"
          title={articles?.[2]?.title}
          content={articles?.[2]?.summary}
        />
        <StickyInsight
          variant="purple"
          title={articles?.[1]?.title}
          content={articles?.[1]?.summary}
        />
      </div>
    </div>
  );
}
