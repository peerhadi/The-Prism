"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import NarrativeOverlay from "./features/NarrativeButton";
import SourcesPopup from "./features/SourcesPopup";

export interface ShortStoryCardProps {
  badge: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionLabel?: string;
  onActionClick?: () => void;
  sources: any;
}

export default function ShortCard<T extends ShortStoryCardProps>({
  title,
  id,
  description,
  imageUrl,
  sources,
}: T) {
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full">
      <Card className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[24px] bg-[var(--surface)] transition-all duration-500 hover:rotate-1 hover:scale-[1.03] py-0">
        {/* BACKGROUND IMAGE */}
        <img
          src={imageUrl}
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/800/600?random=100";
          }}
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          alt="A descriptive anchor text for accessibility"
        />
        {/* CYBER BLUISH GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface),transparent)] animate-gradient-xy pointer-events-none" />

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {/* META DATA */}

          {/* HEADLINE */}
          <h3 className="text-[20px] leading-tight font-bold text-[var(--text-primary)] transition-colors">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed font-light text-[var(--text-secondary)]">
            {description}
          </p>

          {/* FOOTER ACTION */}
          <div className="mt-5 flex w-full justify-between gap-2 pt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="group flex items-center gap-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl px-3 py-2 hover:bg-[var(--surface-hover)] transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />

              <span className="text-[11px] tracking-wide text-[var(--text-secondary)]">
                See narratives
              </span>
            </button>

            <button
              onClick={() => setSourceOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--background)] transition-transform hover:rotate-45 active:scale-90"
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* NEON ROTATING BORDER */}
        <div className="pointer-events-none absolute inset-0 rounded-[24px] animate-spin-slow blur-md opacity-50" />
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
