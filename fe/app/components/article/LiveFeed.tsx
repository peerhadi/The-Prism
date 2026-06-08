import SourcesPopup from "@/app/(user)/components/features/SourcesPopup";
import { Article } from "@/lib/api/articles/types";
import { Activity } from "lucide-react";
import React from "react";

export default function LiveFeed({ feed }) {
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Article>();
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
          Explore More
        </h3>
        <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
      </div>

      <div className="space-y-5">
        {feed.map((item, i) => (
          <div
            key={i}
            className="border-b border-white/5 pb-5 cursor-pointer"
            onClick={() => {
              setSourceOpen(true);
              setSelected(item);
            }}
          >
            <p className="text-sm text-white/60 hover:text-cyan-400 transition">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {selected && (
        <SourcesPopup
          id={selected.id}
          sources={selected.sources}
          open={sourceOpen}
          setOpen={setSourceOpen}
        />
      )}
    </div>
  );
}
