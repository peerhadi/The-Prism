"use client";

import ListCard from "@/app/(user)/components/ListCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import React from "react";

export default function StoryLiveStream({
  small,
  list,
}: {
  small: { id: string; title: string; description: string; imageUrl: string; sources: string[] }[];
  list: { id: string; title: string; description: string; imageUrl: string; sources: { source: string; title: string; url: string }[] }[];
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
          <ShortCard key={s.id} id={s.id} badge="STREAM" title={s.title} description={s.description} imageUrl={s.imageUrl} sources={s.sources} />
        ))}
      </div>

      <div className="space-y-6">
        {list.map((l, i) => (
          <ListCard key={i} id={l.id} title={l.title} description={l.description} imageUrl={l.imageUrl} sources={l.sources} />
        ))}
      </div>
    </div>
  );
}
