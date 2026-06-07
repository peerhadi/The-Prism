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
  return (
    <div className="space-y-10">
      <div className="border-b border-white/10 pb-4 flex justify-between">
        <h2 className="text-[11px] uppercase text-white/40 tracking-widest">
          LIVE STORY STREAM
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
