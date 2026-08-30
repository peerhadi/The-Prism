"use client";

import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Globe } from "lucide-react";
import getCleanSiteName from "@/app/utils/getcleansitename";
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
        className="fixed inset-0 z-[9999] bg-[var(--backdrop)]"
        onClick={() => setOpen(false)}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="w-[600px] max-w-full max-h-[80vh] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] shadow-[var(--shadow-2xl)] flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <Globe className="h-4 w-4" />
              <span className="text-xs tracking-widest uppercase">Sources</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="p-2 rounded hover:bg-[var(--surface-hover)] transition"
            >
              <X className="h-4 w-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {grouped.length === 0 && (
              <div className="text-[var(--text-muted)] text-sm">
                No sources available
              </div>
            )}

            {grouped.map((item, idx) => {
              const favicon = getFavicon(item.url);

              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 hover:bg-[var(--surface-hover)] transition group"
                >
                  {/* ICON */}
                  {favicon ? (
                    <img src={favicon} alt="" className="h-6 w-6 rounded" />
                  ) : (
                    <div className="h-6 w-6 rounded bg-[var(--surface-hover)] flex items-center justify-center">
                      <Globe className="h-3 w-3 text-[var(--primary)]" />
                    </div>
                  )}

                  {/* TITLE ONLY */}
                  <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition">
                    {getCleanSiteName(item.source)}
                  </div>
                </a>
              );
            })}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--primary-border),transparent)]" />

              <span className="text-[9px] tracking-[0.35em] text-[var(--primary)] uppercase">
                OR
              </span>

              <div className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--primary-border),transparent)]" />
            </div>
            <a
              href={`/story/${id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 hover:bg-[var(--surface-hover)] transition group"
            >
              {/* ICON */}
              <img src={"/logo.png"} alt="" className="h-6 w-6 rounded" />

              {/* TITLE ONLY */}
              <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition">
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
