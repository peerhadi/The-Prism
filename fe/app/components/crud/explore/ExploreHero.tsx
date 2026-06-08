"use client";

import { Activity, Globe, Radar, Sparkles, Compass } from "lucide-react";
import CategoryChips from "./CategoryChips";

export default function ExploreHero({
  articles,
  categories,
  filteredCount,
  smallCount,
  selectedCategory,
  setSelectedCategory,
}: any) {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-10">
        {/* LEFT */}
        <div>
          <div className="flex gap-3 mb-6">
            <div className="px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 rounded-full">
              <Compass className="inline h-3 w-3 mr-2" />
              Explore Network
            </div>
          </div>

          <h1 className="text-6xl md:text-[9rem] font-black uppercase leading-[0.9]">
            EXPLORE
          </h1>

          <p className="text-white/50 mt-6 max-w-2xl">
            Discover narratives, investigate signals, and navigate intelligence
            graphs.
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Articles", value: articles.length },
            { icon: Globe, label: "Categories", value: categories.length },
            { icon: Radar, label: "Filtered", value: filteredCount },
            { icon: Sparkles, label: "Discoveries", value: smallCount },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl border border-white/10 bg-black/30"
            >
              <item.icon className="h-6 w-6 text-cyan-400 mb-4" />
              <div className="text-3xl font-black">{item.value}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </section>
  );
}
