"use client";

import * as React from "react";
import { Activity, Clock3 } from "lucide-react";

export default function ArchiveLogs({ articles }: { articles: any[] }) {
  return (
    <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
          ARCHIVE LOGS
        </h3>
        <Activity className="h-5 w-5 animate-pulse text-cyan-400" />
      </div>

      <div className="space-y-6">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article.id}
            className="flex gap-4 border-b border-white/5 pb-5"
          >
            <Clock3 className="mt-1 h-4 w-4 text-cyan-400" />
            <p className="text-sm leading-relaxed text-white/50">
              {article.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
