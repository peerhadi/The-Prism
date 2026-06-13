"use client";

import ListCard from "@/app/(user)/components/ListCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import React from "react";

export default function StoryLiveStream({
  small,
  list,
}: {
  small: any[];
  list: any[];
}) {
  console.log(small, list);
  return (
    <div className="space-y-10">
      <div className="flex justify-between border-b border-[var(--border)] pb-4">
        <h2 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
          LIVE STORY STREAM
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {small.map((s) => (
          <ShortCard key={s.id} {...s} />
        ))}
      </div>

      <div className="space-y-6">
        {list.map((l, i) => (
          <ListCard key={i} {...l} />
        ))}
      </div>
    </div>
  );
}
