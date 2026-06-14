"use client";

import StickyInsight from "@/app/(user)/components/TickerCard";

export default function ArchiveStickyGrid({ articles }: { articles: { id?: string; title?: string; summary?: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 w-full">
      <StickyInsight
        variant="cyan"
        title={articles[0]?.title ?? ""}
        content={articles[0]?.summary ?? ""}
      />
      <StickyInsight
        variant="purple"
        title={articles[1]?.title ?? ""}
        content={articles[1]?.summary ?? ""}
      />
      <StickyInsight
        variant="purple"
        title={articles[2]?.title ?? ""}
        content={articles[2]?.summary ?? ""}
      />
    </div>
  );
}
