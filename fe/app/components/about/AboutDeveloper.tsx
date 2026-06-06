"use client";

import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";

export default function AboutDeveloper() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex justify-center items-center">
            <Image
              src="/logo.png"
              alt="Developer"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>

          <div className="mt-6 text-center lg:text-left">
            <h3 className="text-2xl font-semibold">Peer Hadi Taha</h3>
            <p className="mt-1 text-sm text-cyan-400">Founder & Developer</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Quote size={28} className="mt-1 shrink-0 text-cyan-400/70" />

            <p className="max-w-3xl text-xl leading-relaxed text-white/75">
              I created The Prism because I became increasingly interested in
              how differently the same events were presented across media
              platforms. Over time, it became clear that understanding the
              framing of a story is often just as important as understanding the
              story itself.
            </p>
          </div>

          <p className="max-w-3xl leading-relaxed text-white/55">
            This project started as an experiment in comparing narratives, but
            gradually evolved into a platform focused on perspective,
            transparency, and critical reading. The Prism is still evolving, and
            the long-term goal is to create a space where users can explore
            information with more context and less manipulation.
          </p>

          <button className="group flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10">
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
