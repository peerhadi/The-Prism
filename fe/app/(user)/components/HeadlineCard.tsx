"use client";

import React from "react";
import { Radio, ChevronRight } from "lucide-react";

type HeadlineVariant = "cyan" | "purple" | "red" | "emerald";

interface HeadlineItem {
  tag: string;
  time: string;
  title: string;
  variant?: HeadlineVariant;
}

interface HeadlineCardProps {
  title: string;
  data: HeadlineItem[];
  onActionClick?: () => void;
  actionLabel?: string;
}

const variantStyles: Record<HeadlineVariant, { bg: string; text: string }> = {
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
  red: { bg: "bg-red-500/10", text: "text-red-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
};

export const HeadlineCard: React.FC<HeadlineCardProps> = ({
  title,
  data,
  onActionClick,
  actionLabel = "Access Archives",
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 backdrop-blur-2xl shadow-lg">
      {/* Neon Pulse Header */}
      <h3 className="mb-8 flex items-center gap-3 text-[12px] font-black tracking-[0.4em] text-white uppercase">
        <Radio className="h-5 w-5 animate-pulse text-cyan-400" /> {title}
      </h3>

      {/* Headline Items */}
      <div className="space-y-6">
        {data.map((item, idx) => {
          const variant = item.variant ?? "cyan";
          const styles = variantStyles[variant];
          return (
            <div
              key={idx}
              className="group relative cursor-pointer overflow-hidden rounded-xl border-b border-white/10 pb-5 last:border-0 transition-all hover:scale-[1.02]"
            >
              {/* Glow Background on Hover */}
              <div
                className={`absolute inset-0 ${styles.bg} opacity-20 blur-[40px] transition-all group-hover:opacity-40`}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`rounded px-2 py-0.5 text-[9px] font-black tracking-tighter uppercase ${styles.bg} ${styles.text}`}
                >
                  {item.tag}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-white/20">
                  {item.time}
                </span>
              </div>

              <h4 className="mt-1 text-[14px] font-bold leading-snug text-white/70 transition-colors group-hover:text-cyan-300 drop-shadow-[0_0_6px_cyan]">
                {item.title}
              </h4>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/20 py-3 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase transition-all hover:bg-cyan-500/10 hover:text-cyan-400 hover:scale-[1.02]"
        >
          {actionLabel} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
