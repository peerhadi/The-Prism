"use client";

import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { redirect } from "next/navigation";

export default function AboutDeveloper() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--glass-bg)]">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[320px_1fr] lg:items-center">
        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src="/logo.png"
              alt="Developer"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          <div className="mt-6 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
              Peer Hadi Taha
            </h3>
            <p className="mt-1 text-sm text-[var(--accent)]">
              Founder & Developer
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Quote size={28} className="mt-1 shrink-0 text-[var(--accent)]" />

            <p className="max-w-3xl text-xl leading-relaxed text-[var(--text-secondary)]">
              I created The Prism because I became increasingly interested in
              how differently the same events were presented across media
              platforms. Over time, it became clear that understanding the
              framing of a story is often just as important as understanding the
              story itself.
            </p>
          </div>

          <p className="max-w-3xl leading-relaxed text-[var(--text-muted)]">
            This project started as an experiment in comparing narratives, but
            gradually evolved into a platform focused on perspective,
            transparency, and critical reading. The Prism is still evolving, and
            the long-term goal is to create a space where users can explore
            information with more context and less manipulation.
          </p>

          <button
            className="group flex items-center gap-3 border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--surface-hover)]"
            onClick={() => redirect("/bias")}
          >
            Read Project Vision
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
