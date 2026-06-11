"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import NarrativeOverlay from "./features/NarrativeButton";
import SourcesPopup from "./features/SourcesPopup";

export interface ListCardProps {
  title: string;
  description: string;
  imageUrl: string;
  actionLabel?: string;
  onActionClick?: () => void;
  sources: any;
  id: string;
}

export default function ListCard<T extends ListCardProps>({
  id,
  title,
  description,
  imageUrl,
  sources,
}: T) {
  const [open, setOpen] = React.useState(false);

  const [sourceOpen, setSourceOpen] = React.useState(false);
  return (
    <div className="w-full py-3">
      <Card className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)] transition-all duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_0_60px_var(--primary-glow)]">
        <div className="flex flex-col-reverse gap-5 p-6 md:flex-row md:items-center">
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="flex-1 min-w-0 space-y-2">
            <h2 className="truncate text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)] md:text-xl drop-shadow-[0_0_8px_var(--primary-glow)]">
              {title}
            </h2>

            <p className="line-clamp-2 text-[13px] font-light text-[var(--text-secondary)] italic drop-shadow-sm">
              {description}
            </p>

            <div className="flex justify-between gap-3 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="group flex items-center gap-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border)] px-3 py-2 hover:bg-[var(--surface-hover)] transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />

                <span className="text-[11px] tracking-wide text-[var(--text-secondary)]">
                  See narratives
                </span>

                <ArrowRight className="h-4 w-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSourceOpen(true);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-soft)] backdrop-blur-xl border border-[var(--primary-border)] text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary-soft)] hover:scale-110 active:scale-95"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE */}
          <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-[16px] border border-[var(--border)] md:h-[160px] md:w-[220px]">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-2"
            />
            {/* Neon Gradient Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top_right,var(--primary-soft),transparent,var(--secondary-soft))] opacity-80 animate-gradient-xy pointer-events-none" />
            {/* Blur Glow */}
            <div className="absolute -inset-2 rounded-[16px] bg-[var(--primary-soft)] blur-[30px] opacity-50 animate-pulse pointer-events-none" />
          </div>
        </div>

        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--primary)] transition-all duration-700 group-hover:w-full" />

        {/* Floating Neon Corners */}
        <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-[var(--primary-soft)] blur-[60px] animate-pulse pointer-events-none" />
        <div className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full bg-[var(--secondary-soft)] blur-[80px] animate-pulse pointer-events-none" />

        <NarrativeOverlay
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          description={description}
        />

        <SourcesPopup
          id={id}
          open={sourceOpen}
          setOpen={setSourceOpen}
          sources={sources}
        />
      </Card>
    </div>
  );
}
