"use client";

import { Compass } from "lucide-react";

export default function DiscoveryNodes({
  categories,
  articles,
  setSelectedCategory,
}: any) {
  console.log(categories, articles);
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="flex justify-between mb-8">
        <h3 className="text-[11px] uppercase tracking-[0.35em] text-cyan-400">
          Discovery Nodes
        </h3>
        <Compass className="h-5 w-5 text-cyan-400" />
      </div>

      <div className="space-y-4">
        {categories.map((c: any) => {
          const count = articles.filter(
            (a: any) => a.categoryId === c.id,
          ).length;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className="w-full p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 bg-black/30"
            >
              <div className="flex justify-between">
                <span className="font-bold">{c.name}</span>
                <span className="text-cyan-400">{count}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
