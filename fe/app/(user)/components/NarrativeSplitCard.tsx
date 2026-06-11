"use client";

import * as React from "react";
import { Split, Binary, GitBranch, Activity } from "lucide-react";

// Dynamic Image Helper
const getRandomImage = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/500`;

interface Narrative {
  label: string;
  title: string;
  description: string;
}

interface NarrativeSplitProps {
  seedId: string;
  versionA: Narrative;
  versionB: Narrative;
}

export const NarrativeSplitCard = ({
  seedId,
  versionA,
  versionB,
}: NarrativeSplitProps) => {
  return (
    <div className="group relative w-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] transition-colors hover:border-[var(--border)]">
      {/* SEED HEADER */}

      {/* DUAL CONTENT GRID */}
      <div className="grid grid-cols-1 gap-px bg-[var(--border-subtle)] lg:grid-cols-2">
        {/* SIDE A: PRIMARY */}
        <div className="group/sideA relative flex flex-col bg-[var(--surface)]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={getRandomImage(`${seedId}-alpha`)}
              className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover/sideA:opacity-80 group-hover/sideA:grayscale-0"
              alt="Alpha Perspective"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 border border-[var(--primary-border)] bg-[var(--primary-soft)] px-3 py-1 text-[8px] font-black tracking-[0.2em] text-[var(--primary)] uppercase backdrop-blur-sm">
              Primary Context
            </div>
          </div>
          <div className="flex-grow space-y-4 border-r border-[var(--border-subtle)] p-8">
            <div className="flex items-center gap-2 text-cyan-400">
              <Activity size={14} />
              <h4 className="text-[10px] font-black tracking-widest uppercase">
                {versionA.label}
              </h4>
            </div>
            <p className="text-2xl leading-none font-black tracking-tighter text-[var(--text-primary)] uppercase">
              {versionA.title}
            </p>
            <p className="text-sm leading-relaxed font-medium text-[var(--text-secondary)]">
              {versionA.description}
            </p>
          </div>
        </div>

        {/* SIDE B: SHADOW */}
        <div className="group/sideB relative flex flex-col bg-[var(--surface)]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={getRandomImage(`${seedId}-omega`)}
              className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover/sideB:opacity-80 group-hover/sideB:grayscale-0"
              alt="Omega Perspective"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
            <div className="absolute top-4 right-4 border border-[var(--danger-border)] bg-[var(--danger-soft)] px-3 py-1 text-[8px] font-black tracking-[0.2em] text-[var(--danger)] uppercase backdrop-blur-sm">
              Shadow Context
            </div>
          </div>
          <div className="flex-grow space-y-4 p-8">
            <div className="flex items-center gap-2 text-[var(--danger)]">
              <GitBranch size={14} />
              <h4 className="text-[10px] font-black tracking-widest uppercase">
                {versionB.label}
              </h4>
            </div>
            <p className="text-2xl leading-none font-black tracking-tighter text-[var(--text-primary)] uppercase">
              {versionB.title}
            </p>
            <p className="text-sm leading-relaxed font-medium text-[var(--text-secondary)]">
              {versionB.description}
            </p>
          </div>
        </div>

        {/* CENTER ICON */}
        <div className="absolute top-1/2 left-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 group-hover:scale-110 lg:flex">
          <Split
            size={18}
            className="text-[var(--text-muted)] transition-all duration-700 group-hover:rotate-180 group-hover:text-[var(--primary)]"
          />
        </div>
      </div>
    </div>
  );
};
