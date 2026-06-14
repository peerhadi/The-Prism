"use client";

import React from "react";
import { Radio } from "lucide-react";
import SourcesPopup from "./features/SourcesPopup";

type HeadlineVariant = "cyan" | "purple" | "red" | "emerald";

type Source = {
  source: string;
  title: string;
  url: string;
};

interface HeadlineItem {
  tag: string;
  sources: Source[];
  time: string;
  title: string;
  id: string;
  variant?: HeadlineVariant;
}

interface HeadlineCardProps {
  title: string;
  data: HeadlineItem[];
  onActionClick?: () => void;
}


export const HeadlineCard: React.FC<HeadlineCardProps> = ({ title, data }) => {
  console.log(data);
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<HeadlineItem>();
  return (
    <div
      className="relative w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl shadow-[var(--shadow-lg)]"
      data-testid="headline-card"
    >
      {/* Neon Pulse Header */}
      <h3 className="mb-8 flex items-center gap-3 text-[12px] font-black tracking-[0.4em] text-[var(--text-primary)] uppercase">
        <Radio className="h-5 w-5 animate-pulse text-[var(--primary)]" />
        {title}
      </h3>

      {/* Headline Items */}
      <div className="space-y-6">
        {data.map((item, idx) => {
          const variant = item.variant ?? "cyan";
          return (
            <div
              key={idx}
              className="group relative cursor-pointer overflow-hidden rounded-xl border-b border-[var(--border)] pb-5 last:border-0 transition-all hover:scale-[1.02]"
            >
              {/* Glow Background on Hover */}
              <div
                className="absolute inset-0 opacity-20 blur-[40px] transition-all group-hover:opacity-40"
                style={{
                  background:
                    variant === "cyan"
                      ? "var(--primary-soft)"
                      : variant === "purple"
                        ? "var(--secondary-soft)"
                        : variant === "red"
                          ? "var(--danger-soft)"
                          : "var(--success-soft)",
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span
                  className="rounded px-2 py-0.5 text-[9px] tracking-tighter uppercase "
                  style={{
                    background:
                      variant === "cyan"
                        ? "var(--primary-soft)"
                        : variant === "purple"
                          ? "var(--secondary-soft)"
                          : variant === "red"
                            ? "var(--danger-soft)"
                            : "var(--success-soft)",
                    color:
                      variant === "cyan"
                        ? "var(--primary)"
                        : variant === "purple"
                          ? "var(--secondary)"
                          : variant === "red"
                            ? "var(--danger)"
                            : "var(--success)",
                  }}
                >
                  {item.tag}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[var(--text-faint)]">
                  {item.time}
                </span>
              </div>

              <h4
                className="mt-1 text-[14px] font-bold leading-snug text-[var(--text-primary)]! transition-colors group-hover:text-[var(--primary)] drop-shadow-[0_0_6px_var(--primary-glow)]"
                onClick={() => {
                  setSelected(item);
                  setSourceOpen(true);
                }}
              >
                {item.title}
              </h4>
            </div>
          );
        })}

        {selected && (
          <SourcesPopup
            id={selected.id}
            open={sourceOpen}
            setOpen={setSourceOpen}
            sources={selected.sources}
          />
        )}
      </div>
    </div>
  );
};
