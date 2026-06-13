"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Radio } from "lucide-react";

import StoryPageLayout from "@/app/components/crud/story/StoryPageLayout";
import { getBiasColor } from "@/app/utils/getbiascolor";

/* =========================================================
   TYPES
========================================================= */

type Article = {
  id: string;
  title: string;
  description: string;
  summary?: string;
  tag?: string;
  imageUrl?: string;
  sources: any[];
  createdAt?: string;
};

/* =========================================================
   STICKY INSIGHT CARD (LEFT / RIGHT)
   (VARIETY READY - uses article fields)
========================================================= */

function StickyCard({ article, i }: { article: Article; i: number }) {
  const colors = ["cyan", "amber", "purple", "red"] as const;
  const variant = colors[i % colors.length];

  const glowMap: any = {
    cyan: "bg-cyan-400/10",
    amber: "bg-amber-400/10",
    purple: "bg-purple-400/10",
    red: "bg-red-400/10",
  };

  const textMap: any = {
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    purple: "text-purple-300",
    red: "text-red-300",
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--glass-bg)] p-5 transition-all duration-500 hover:scale-[1.02]">
      <div
        className={`absolute inset-0 ${glowMap[variant]} blur-[50px] opacity-60`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <h3 className={`text-sm font-bold ${textMap[variant]}`}>
            {article.title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-3">
            {article.summary || article.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] uppercase text-[var(--text-muted)]">
            Insight Node
          </span>
          <div
            className={`h-2 w-2 rounded-full ${textMap[variant]} animate-pulse`}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CENTER CHAIN FEED CARD (WITH IMAGE)
========================================================= */

import NarrativePopup from "../components/features/NarrativeButton";
import SourcesPopup from "../components/features/SourcesPopup";
import { redirect } from "next/navigation";
import Link from "next/link";

export function FeedCard({ article }: { article: Article }) {
  const [openNarrative, setOpenNarrative] = React.useState(false);
  const [openSources, setOpenSources] = React.useState(false);

  if (!article.imageUrl) return null;

  return (
    <div className="relative">
      {/* connector line */}
      <div className="absolute left-4 top-8 w-6 h-px bg-[var(--border)] opacity-60" />

      <div className="pl-12 pr-2 py-4">
        <div className="relative overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:translate-x-1">
          {/* IMAGE */}
          {article.imageUrl && (
            <div className="relative mb-4 h-[190px] w-full overflow-hidden rounded-[18px] border border-[var(--border)]">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-soft)] to-transparent opacity-40" />
            </div>
          )}

          {/* CONTENT */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {article.title}
              </h2>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {article.summary || article.description}
              </p>
            </div>

            {article.tag && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] whitespace-nowrap">
                {article.tag}
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => setOpenNarrative(true)}
              className="flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] hover:bg-[var(--surface-hover)] transition"
            >
              <Sparkles className="h-3 w-3" />
              Narratives
            </button>

            <button
              onClick={() => setOpenSources(true)}
              className="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] hover:scale-105 transition"
            >
              Explore
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* subtle glow */}
          <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-0 hover:opacity-10 transition pointer-events-none" />
        </div>
      </div>

      {/* REQUIRED POPUPS (NOT OPTIONAL) */}
      <NarrativePopup
        open={openNarrative}
        onClose={() => setOpenNarrative(false)}
        title={article.title}
        description={article.summary || article.description || ""}
      />

      <SourcesPopup
        id={article.id}
        open={openSources}
        setOpen={setOpenSources}
        sources={article.sources}
      />
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function FeedPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [articles, setArticles] = useState<Article[]>([]);
  const [left, setLeft] = useState<Article[]>([]);
  const [right, setRight] = useState<Article[]>([]);
  const [token, setToken] = useState<string>();
  const [sources, setSources] = useState<any[]>([]);
  useEffect(() => {
    if (window) {
      const t = window.localStorage.getItem("token");
      if (!t) redirect("/login");
      setToken(t);

      fetch(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setSources(r.sources);
        });
    }
  }, []);
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/articles`);
      const data = await res.json();

      const clean = data
        .filter((a: any) => a.title && a.description)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      const uniqueByTitle = Array.from(
        new Map(clean.map((a) => [a.title, a])).values(),
      ).filter(
        (x) =>
          !!sources.find((y) => {
            console.log(x.sources[0].url, y, x.sources[0].url.startsWith(y));
            return x.sources[0].url.startsWith(y);
          }),
      );
      setArticles(uniqueByTitle);
      console.log(sources);
      // SPLIT (real uneven feel)
      setLeft(clean.slice(0, 3));
      setRight(clean.slice(5, 8));
    };
    if (sources) load();
  }, [sources]);

  if (!articles.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 bg-[var(--background)]">
        <div className="max-w-xl text-center">
          <div
            className="
        mx-auto mb-8 flex h-24 w-24 items-center justify-center
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface-secondary)]
      "
          >
            <Radio className="h-12 w-12 animate-pulse text-[var(--primary)]" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)]">
            No Sources Connected
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Your personal feed is waiting for its first signal. Add a few RSS
            feeds or news sources and we'll start building a stream tailored to
            you.
          </p>

          <Link
            href="/settings"
            className="
        mt-8 inline-flex items-center gap-2
        rounded-xl
        border border-[var(--border)]
        bg-[var(--surface)]
        px-5 py-3
        font-semibold
        text-[var(--text-primary)]
        transition-all
        hover:bg-[var(--surface-hover)]
      "
          >
            Go to Settings
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
            Feed generation requires at least one active source
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex justify-center text-[var(--text-primary)]">
      <div className="w-full max-w-[1100px] px-6 py-10">
        {/* ================= HEADER ================= */}
        <div className="relative mb-10 overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--glass-bg)] p-12 backdrop-blur-2xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-80px] left-[20%] h-[220px] w-[220px] rounded-full bg-[var(--primary-soft)] blur-[120px]" />
            <div className="absolute bottom-[-60px] right-[15%] h-[260px] w-[260px] rounded-full bg-[var(--secondary-soft)] blur-[140px]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[6px] w-[6px] rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)]">
                LIVE INFORMATION STREAM
              </span>
              <div className="h-px flex-1 bg-[var(--border)] opacity-40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--primary)]">
                ACTIVE FEED
              </span>
            </div>

            <h1 className="text-6xl font-black leading-[0.85]">
              Information <span className="text-[var(--primary)]">Feed</span>
            </h1>

            <p className="mt-5 text-[var(--text-secondary)] max-w-2xl">
              Live structured narrative ingestion system with semantic
              clustering and adaptive ranking.
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="h-[2px] w-full bg-[var(--border)] opacity-40 mb-8" />

        {/* ================= LAYOUT ================= */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT (5 cards) */}
          <div className="col-span-3 space-y-4">
            {left.map((a, i) => (
              <StickyCard key={a.id} article={a} i={i} />
            ))}
          </div>

          {/* CENTER CHAIN */}
          <div className="col-span-6 relative">
            <div className="max-h-[85vh] overflow-y-auto pr-2 relative">
              {/* vertical spine */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)] opacity-60" />

              <div className="flex flex-col">
                {articles.map((a) => (
                  <FeedCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT (4 cards) */}
          <div className="col-span-3 space-y-4">
            {right.map((a, i) => (
              <StickyCard key={a.id} article={a} i={right.length - i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
