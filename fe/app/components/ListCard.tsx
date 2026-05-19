"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, ArrowRight } from "lucide-react";

export interface CompactListCardProps {
  category: string;
  sourceCount: number;
  headline: string;
  description: string;
  imageUrl: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function GenericCompactListCard<T extends CompactListCardProps>({
  category,
  sourceCount,
  headline,
  description,
  imageUrl,
  actionLabel = "Analyze Framing",
  onActionClick,
}: T) {
  return (
    <div className="w-full py-3">
      <Card
        onClick={onActionClick}
        className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-[#000000] shadow-[0_0_50px_rgba(0,255,255,0.05)] transition-all duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_0_60px_rgba(0,255,255,0.2)]"
      >
        <div className="flex flex-col-reverse gap-5 p-6 md:flex-row md:items-center">
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase drop-shadow-md">
                {category}
              </span>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1 text-[9px] font-bold tracking-tight text-white/30 uppercase">
                <BarChart3 className="h-3 w-3" />
                <span>{sourceCount} Sources</span>
              </div>
            </div>

            <h2 className="truncate text-lg font-bold text-white transition-colors group-hover:text-cyan-300 md:text-xl drop-shadow-[0_0_8px_cyan]">
              {headline}
            </h2>

            <p className="line-clamp-2 text-[13px] font-light text-white/50 italic drop-shadow-sm">
              {description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white/50 uppercase transition-all hover:text-cyan-400">
                {actionLabel}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE */}
          <div className="relative h-[120px] w-full shrink-0 overflow-hidden rounded-[16px] border border-white/10 md:h-[160px] md:w-[220px]">
            <img
              src={imageUrl}
              alt={headline}
              className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-2"
            />
            {/* Neon Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 opacity-80 animate-gradient-xy pointer-events-none" />
            {/* Blur Glow */}
            <div className="absolute -inset-2 rounded-[16px] bg-cyan-500/20 blur-[30px] opacity-50 animate-pulse pointer-events-none" />
          </div>
        </div>

        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500/50 transition-all duration-700 group-hover:w-full" />

        {/* Floating Neon Corners */}
        <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-cyan-400/20 blur-[60px] animate-pulse pointer-events-none" />
        <div className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full bg-blue-500/10 blur-[80px] animate-pulse pointer-events-none" />
      </Card>
    </div>
  );
}
