import SourcesPopup from "@/app/(user)/components/features/SourcesPopup";
import { Article } from "@/lib/api/articles/types";
import { Activity } from "lucide-react";
import React from "react";

export default function LiveFeed({ feed }: { feed: Article[] }) {
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Article>();

  return (
    <div
      className="rounded-[32px] border p-6 backdrop-blur-xl"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3
          className="text-[11px] font-black tracking-[0.3em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          Explore More
        </h3>

        <Activity
          className="h-4 w-4 animate-pulse"
          style={{ color: "var(--primary)" }}
        />
      </div>

      <div className="space-y-5">
        {feed.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setSourceOpen(true);
              setSelected(item);
            }}
            className="cursor-pointer border-b pb-5 transition"
            style={{
              borderColor: "var(--border-subtle)",
            }}
          >
            <p
              className="text-sm transition-colors"
              style={{
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <SourcesPopup
          id={selected.id}
          sources={selected.sources.map((s) => ({ source: s, title: s, url: s }))}
          open={sourceOpen}
          setOpen={setSourceOpen}
        />
      )}
    </div>
  );
}
