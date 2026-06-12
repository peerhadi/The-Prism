"use client";

import * as React from "react";
import { Dna, ArrowUpRight } from "lucide-react";
import SourcesPopup from "./features/SourcesPopup";

interface AnomalyProps {
  id: string;
  title: string;
  desc: string;
  tag: string;
  intensity: string;
  color: string;
  img: string;
  sources: any;
}

export const AnomalyCard = ({
  id,
  title,
  sources,
  desc,
  tag,
  intensity,
  color,
  img,
}: AnomalyProps) => {
  const [sourceOpen, setSourceOpen] = React.useState(false);
  return (
    <div
      className="group relative h-[600px] cursor-pointer overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]"
      onClick={() => setSourceOpen(true)}
    >
      {/* IMAGE LAYER */}
      <div className="absolute inset-0">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[rgba(0,0,0,0.2)] to-transparent" />
      </div>

      {/* OVERLAY DATA */}
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
              {id}
            </p>
            <div
              className="h-[1px] w-8"
              style={{
                background: color.includes("cyan")
                  ? "var(--primary)"
                  : color.includes("red")
                    ? "var(--danger)"
                    : color.includes("purple")
                      ? "var(--secondary)"
                      : "var(--accent)",
              }}
            />
          </div>
          <div className="flex items-center gap-1 border border-[var(--border)] bg-[var(--glass-bg)] px-2 py-1 backdrop-blur-md">
            <Dna size={10} className="text-[var(--primary)]" />
            <span className="text-[9px] font-bold text-[var(--text-secondary)]">
              {intensity}
            </span>
          </div>
        </div>

        <div className="translate-y-8 space-y-4 transition-all duration-500 group-hover:translate-y-0">
          <span className="inline-block border border-[var(--border)] px-2 py-1 text-[9px] font-black tracking-widest text-[var(--text-muted)] uppercase">
            {tag}
          </span>
          <h3 className="text-3xl leading-none font-black tracking-tighter text-[var(--text-primary)] uppercase">
            {title}
          </h3>
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)] opacity-0 transition-all duration-500 group-hover:opacity-100">
            {desc}
          </p>
          <div className="flex items-center gap-2 pt-4 text-[10px] font-black tracking-widest text-[var(--primary)] uppercase opacity-0 transition-all delay-100 duration-500 group-hover:opacity-100">
            Initialize Deep Scan <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* PROGRESS BAR DECOR */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-[var(--surface-hover)]">
        <div
          className="h-full w-0 transition-all duration-1000 group-hover:w-full"
          style={{
            background: color.includes("cyan")
              ? "var(--primary)"
              : color.includes("red")
                ? "var(--danger)"
                : color.includes("purple")
                  ? "var(--secondary)"
                  : "var(--accent)",
          }}
        />
      </div>

      <SourcesPopup
        id={id}
        open={sourceOpen}
        setOpen={setSourceOpen}
        sources={sources}
      />
    </div>
  );
};
