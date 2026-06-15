"use client";

import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, var(--primary-soft), transparent 45%)",
        }}
      />

      {/* Floating Blobs */}
      <div
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "var(--primary-glow)" }}
      />

      <div
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-[100px]"
        style={{ background: "var(--info-glow)" }}
      />

      <div className="relative z-10 w-full max-w-xl px-6">
        <div
          className="rounded-[32px] border p-10 backdrop-blur-2xl"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border"
              style={{
                background: "var(--primary-soft)",
                borderColor: "var(--primary-border)",
              }}
            >
              <SearchX
                className="h-10 w-10"
                style={{ color: "var(--primary)" }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-3 text-center">
            <span
              className="text-[10px] uppercase tracking-[0.35em]"
              style={{ color: "var(--primary)" }}
            >
              Forensic Scan Failed
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-4 text-center text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Article Not Found
          </h1>

          {/* Description */}
          <p
            className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The requested specimen could not be retrieved from the Prism
            archive. It may have been removed, relocated, or never existed.
          </p>

          {/* Terminal */}
          <div
            className="mb-8 rounded-2xl border p-4 font-mono text-xs"
            style={{
              background: "var(--surface-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div style={{ color: "var(--danger)" }}>
              ERROR: SPECIMEN_LOOKUP_FAILED
            </div>

            <div className="mt-2" style={{ color: "var(--text-muted)" }}>
              article_id → unavailable
            </div>

            <div style={{ color: "var(--text-muted)" }}>
              forensic_status → not found
            </div>

            <div style={{ color: "var(--text-muted)" }}>confidence → 0%</div>
          </div>

          {/* Action */}
          <Link
            href="/stories"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all"
            style={{
              background: "var(--primary-soft)",
              borderColor: "var(--primary-border)",
              color: "var(--primary)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Archive
          </Link>
        </div>
      </div>

      {/* Scan Line */}
      <div
        className="fixed bottom-0 left-0 h-[2px] w-full"
        style={{
          background: "var(--primary)",
        }}
      />
    </div>
  );
}
