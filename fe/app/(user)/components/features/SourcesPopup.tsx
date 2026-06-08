"use client";

import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Globe } from "lucide-react";

type Source = {
  source: string;
  title: string;
  url: string;
};

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  sources: Source[];
  id: string;
}

function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

export default function SourcesPopup({ open, setOpen, sources, id }: Props) {
  const mounted = typeof window !== "undefined";

  const grouped = useMemo(() => {
    const map: Record<string, Source> = {};

    // keep ONLY one entry per source (latest wins)
    for (const s of sources) {
      map[s.source] = s;
    }

    return Object.values(map);
  }, [sources]);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[9999] bg-black/80"
        onClick={() => setOpen(false)}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="w-[600px] max-w-full max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_0_80px_rgba(0,255,255,0.15)] flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-cyan-300">
              <Globe className="h-4 w-4" />
              <span className="text-xs tracking-widest uppercase">Sources</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="p-2 rounded hover:bg-white/10 transition"
            >
              <X className="h-4 w-4 text-white/70" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {grouped.length === 0 && (
              <div className="text-white/40 text-sm">No sources available</div>
            )}

            {grouped.map((item, idx) => {
              const favicon = getFavicon(item.url);

              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition group"
                >
                  {/* ICON */}
                  {favicon ? (
                    <img src={favicon} className="h-6 w-6 rounded" />
                  ) : (
                    <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center">
                      <Globe className="h-3 w-3 text-cyan-300" />
                    </div>
                  )}

                  {/* TITLE ONLY */}
                  <div className="text-sm text-white/80 group-hover:text-cyan-300 transition">
                    {item.source}
                  </div>
                </a>
              );
            })}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400/10" />

              <span className="text-[9px] tracking-[0.35em] text-cyan-300/80 uppercase">
                OR
              </span>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-400/50 to-cyan-400/10" />
            </div>
            <a
              href={`/story/${id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition group"
            >
              {/* ICON */}
              <img src={"/logo.png"} className="h-6 w-6 rounded" />

              {/* TITLE ONLY */}
              <div className="text-sm text-white/80 group-hover:text-cyan-300 transition">
                The Prism
              </div>
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
