"use client";

import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02040A] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_45%)]" />

      {/* Floating Blobs */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="rounded-[32px] border border-cyan-500/10 bg-black/40 p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,255,255,0.08)]">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10">
              <SearchX className="h-10 w-10 text-cyan-300" />
            </div>
          </div>

          {/* Status */}
          <div className="mb-3 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-cyan-400">
              Forensic Scan Failed
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-center text-3xl font-bold">
            Article Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-white/50">
            The requested specimen could not be retrieved from the Prism
            archive. It may have been removed, relocated, or never existed.
          </p>

          {/* Fake Terminal */}
          <div className="mb-8 rounded-2xl border border-white/5 bg-black/50 p-4 font-mono text-xs">
            <div className="text-red-400">ERROR: SPECIMEN_LOOKUP_FAILED</div>
            <div className="mt-2 text-white/40">article_id → unavailable</div>
            <div className="text-white/40">forensic_status → not found</div>
            <div className="text-white/40">confidence → 0%</div>
          </div>

          {/* Action */}
          <Link
            href="/stories"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300 transition-all hover:bg-cyan-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Archive
          </Link>
        </div>
      </div>

      {/* Bottom Scan Line */}
      <div className="fixed bottom-0 left-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </div>
  );
}
