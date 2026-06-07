"use client";

import { Eye, Layers, AlertTriangle, Globe, Activity } from "lucide-react";

interface Article {
  title: string;
  description: string;
  summary?: string;
  imageUrl?: string;
  sources: { url: string; source: string }[];
  createdAt: string;
}

function buildContext(article: Article) {
  const text = `${article.title} ${article.description}`.toLowerCase();

  // VERY lightweight heuristic tagging (no backend AI)
  const isPolitical =
    text.includes("trump") ||
    text.includes("president") ||
    text.includes("government");

  const isConflict =
    text.includes("war") || text.includes("iran") || text.includes("nuclear");

  const isFinance =
    text.includes("market") ||
    text.includes("stock") ||
    text.includes("economy");

  return {
    domain: isPolitical
      ? "Geopolitical Signal"
      : isConflict
        ? "Strategic Tension Event"
        : isFinance
          ? "Economic Movement"
          : "Information Event",

    interpretation: isPolitical
      ? "This event reflects institutional messaging and political narrative alignment across multiple actors."
      : isConflict
        ? "This event sits within ongoing strategic communication between global powers and advisory bodies."
        : "This event represents a structured information release within mainstream reporting channels.",

    implication: isConflict
      ? "Potential escalation or rhetorical reinforcement may occur depending on follow-up statements."
      : "Low immediate volatility, but narrative propagation likely across media systems.",

    confidence: isConflict ? 0.78 : 0.62,
    volatility: isConflict ? "HIGH" : "MEDIUM",
  };
}

export default function ArticleBody({ article }: { article: Article }) {
  const ctx = buildContext(article);

  return (
    <article className="rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
      {/* HEADER */}
      <div className="mb-10 flex items-center gap-4">
        <Eye className="h-7 w-7 text-cyan-400/70" />
        <div>
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            Forensic Briefing
          </p>
          <p className="mt-1 text-xs text-white/30 uppercase">
            NODE_SCAN //{" "}
            {new Date(article.createdAt).toISOString().slice(0, 10)}
          </p>
        </div>
      </div>

      <div className="space-y-10 text-[17px] leading-[2] text-white/65">
        {/* CONTEXT INTRO */}
        <p>
          {ctx.domain} detected across incoming intelligence stream. Source
          material has been decomposed into structural narrative components for
          interpretive reconstruction.
        </p>

        {/* MAIN DESCRIPTION (ENHANCED) */}
        <p className="text-white/70">{article.description}</p>

        {/* SUMMARY CORE BLOCK */}
        <div className="relative overflow-hidden rounded-[30px] border border-cyan-500/20 bg-cyan-500/[0.04] p-10">
          <Layers className="absolute right-0 bottom-0 h-28 w-28 text-cyan-400/5" />
          <p className="relative z-10 text-xl font-bold uppercase text-cyan-50">
            {article.summary || article.title}
          </p>
        </div>

        {/* INTERPRETATION LAYER */}
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="mb-3 flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-[0.25em]">
            <Globe className="h-4 w-4" />
            Narrative Interpretation
          </div>
          <p className="text-white/60 leading-relaxed">{ctx.interpretation}</p>
        </div>

        {/* IMPACT LAYER */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="mb-3 flex items-center gap-2 text-yellow-300 text-xs uppercase tracking-[0.25em]">
            <AlertTriangle className="h-4 w-4" />
            Impact Projection
          </div>
          <p className="text-white/60">{ctx.implication}</p>
        </div>

        {/* METRICS GRID */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
            <div className="text-3xl font-black text-cyan-400">
              {Math.round(ctx.confidence * 100)}%
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.25em]">
              Confidence
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
            <div className="text-3xl font-black text-purple-400">
              {ctx.volatility}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.25em]">
              Volatility
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
            <div className="text-3xl font-black text-blue-400">
              {article.sources.length}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.25em]">
              Sources
            </div>
          </div>
        </div>

        {/* FINAL STATEMENT */}
        <blockquote className="border-l-4 border-purple-500 bg-purple-500/[0.05] px-8 py-6 text-lg font-semibold text-white">
          Interpretation is not derived from volume of text, but from structure
          of signal.
        </blockquote>
      </div>
    </article>
  );
}
