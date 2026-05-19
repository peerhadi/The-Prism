"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface ShortStoryCardProps {
  badge: string;
  id: string;
  headline: string;
  description: string;
  imageUrl: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function GenericShortStoryCard<T extends ShortStoryCardProps>({
  badge,
  id,
  headline,
  description,
  imageUrl,
  actionLabel = "Explore Framing",
  onActionClick,
}: T) {
  return (
    <div className="w-full">
      <Card
        onClick={onActionClick}
        className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[24px] border border-white/5 bg-[#08111F] shadow-[0_0_50px_rgba(0,255,255,0.1)] transition-all duration-500 hover:rotate-1 hover:scale-[1.03]"
      >
        {/* BACKGROUND IMAGE */}
        <img
          src={imageUrl}
          alt={headline}
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* CYBER BLUISH GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-blue-500/10 to-indigo-500/20 opacity-80 animate-gradient-xy pointer-events-none" />

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {/* META DATA */}
          <div className="mb-3 flex items-center justify-between">
            <Badge
              variant="outline"
              className="border-cyan-500/40 bg-cyan-500/10 px-2 py-0 text-[9px] font-black tracking-[0.2em] text-cyan-400 uppercase shadow-[0_0_10px_cyan] animate-pulse"
            >
              {badge}
            </Badge>
            <span className="font-mono text-[10px] tracking-tighter text-white/40">
              {id}
            </span>
          </div>

          {/* HEADLINE */}
          <h3 className="text-[20px] leading-tight font-bold text-white transition-colors group-hover:text-blue-300">
            {headline}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed font-light text-white/50">
            {description}
          </p>

          {/* FOOTER ACTION */}
          <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
              {actionLabel}
            </span>
            <ArrowRight className="h-3 w-3 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
          </div>
        </div>

        {/* NEON ROTATING BORDER */}
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border-2 border-cyan-400/30 animate-spin-slow blur-md opacity-50" />

        {/* INTERACTIVE HOVER LAYER */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-[150%] rotate-12 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 animate-rotate-slow" />
        </div>
      </Card>
    </div>
  );
}
