"use client"

import * as React from "react"
import { Split, Binary, GitBranch, Activity } from "lucide-react"

// Dynamic Image Helper
const getRandomImage = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/500`

interface Narrative {
  label: string
  title: string
  description: string
}

interface NarrativeSplitProps {
  seedId: string
  topic: string
  versionA: Narrative
  versionB: Narrative
}

export const NarrativeSplitCard = ({
  seedId,
  topic,
  versionA,
  versionB,
}: NarrativeSplitProps) => {
  return (
    <div className="group relative w-full overflow-hidden border border-white/5 bg-[#03070e] transition-colors hover:border-white/10">
      {/* SEED HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/60 px-6 py-3">
        <div className="flex items-center gap-3">
          <Binary size={14} className="text-cyan-400" />
          <span className="font-mono text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
            Seed ID: {seedId}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">
            {topic}
          </span>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-1/2 animate-pulse bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>
      </div>

      {/* DUAL CONTENT GRID */}
      <div className="grid grid-cols-1 gap-px bg-white/5 lg:grid-cols-2">
        {/* SIDE A: PRIMARY */}
        <div className="group/sideA relative flex flex-col bg-[#03070e]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={getRandomImage(`${seedId}-alpha`)}
              className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover/sideA:opacity-80 group-hover/sideA:grayscale-0"
              alt="Alpha Perspective"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070e] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[8px] font-black tracking-[0.2em] text-cyan-400 uppercase backdrop-blur-sm">
              Primary Context
            </div>
          </div>
          <div className="flex-grow space-y-4 border-r border-white/5 p-8">
            <div className="flex items-center gap-2 text-cyan-400">
              <Activity size={14} />
              <h4 className="text-[10px] font-black tracking-widest uppercase">
                {versionA.label}
              </h4>
            </div>
            <p className="text-2xl leading-none font-black tracking-tighter text-white uppercase">
              {versionA.title}
            </p>
            <p className="text-sm leading-relaxed font-medium text-white/40">
              {versionA.description}
            </p>
          </div>
        </div>

        {/* SIDE B: SHADOW */}
        <div className="group/sideB relative flex flex-col bg-[#03070e]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={getRandomImage(`${seedId}-omega`)}
              className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover/sideB:opacity-80 group-hover/sideB:grayscale-0"
              alt="Omega Perspective"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070e] via-transparent to-transparent" />
            <div className="absolute top-4 right-4 border border-red-500/30 bg-red-500/10 px-3 py-1 text-[8px] font-black tracking-[0.2em] text-red-500 uppercase backdrop-blur-sm">
              Shadow Context
            </div>
          </div>
          <div className="flex-grow space-y-4 p-8">
            <div className="flex items-center gap-2 text-red-500">
              <GitBranch size={14} />
              <h4 className="text-[10px] font-black tracking-widest uppercase">
                {versionB.label}
              </h4>
            </div>
            <p className="text-2xl leading-none font-black tracking-tighter text-white uppercase">
              {versionB.title}
            </p>
            <p className="text-sm leading-relaxed font-medium text-white/40">
              {versionB.description}
            </p>
          </div>
        </div>

        {/* CENTER ICON */}
        <div className="absolute top-1/2 left-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/10 bg-black transition-all duration-500 group-hover:scale-110 lg:flex">
          <Split
            size={18}
            className="text-white/20 transition-all duration-700 group-hover:rotate-180 group-hover:text-cyan-400"
          />
        </div>
      </div>
    </div>
  )
}
