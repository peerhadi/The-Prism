"use client"

import Image from "next/image"
import { Globe, Scale, Users, ArrowRight, Quote } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-medium tracking-[0.25em] text-cyan-400 uppercase">
              About The Prism
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Understanding how narratives are shaped.
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/60">
              The Prism is a platform designed to help people explore how the
              same story can be framed differently across media sources. Instead
              of focusing only on what happened, we focus on how language,
              emphasis, and presentation influence perception.
            </p>
          </div>

          <div className="max-w-md border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Our Goal
            </p>

            <p className="text-sm leading-relaxed text-white/65">
              To encourage critical thinking by making bias, framing, and
              narrative differences easier to recognize and compare.
            </p>
          </div>
        </div>
      </section>

      {/* THREE CORE BOXES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            What The Prism focuses on
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* BOX 1 */}
          <div className="group border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
              <Scale size={20} className="text-cyan-400" />
            </div>

            <h3 className="mb-4 text-2xl font-semibold">
              Narrative Comparison
            </h3>

            <p className="leading-relaxed text-white/60">
              Compare how different outlets frame the same event through
              headlines, tone, language, and emphasis.
            </p>
          </div>

          {/* BOX 2 */}
          <div className="group border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
              <Globe size={20} className="text-cyan-400" />
            </div>

            <h3 className="mb-4 text-2xl font-semibold">Global Perspectives</h3>

            <p className="leading-relaxed text-white/60">
              Explore how the same story changes across countries, political
              environments, and cultural contexts.
            </p>
          </div>

          {/* BOX 3 */}
          <div className="group border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
              <Users size={20} className="text-cyan-400" />
            </div>

            <h3 className="mb-4 text-2xl font-semibold">Reader Awareness</h3>

            <p className="leading-relaxed text-white/60">
              The goal is not to tell users what to think, but to help them
              recognize framing patterns and form their own conclusions.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT THE DEVELOPER */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[320px_1fr] lg:items-center">
          {/* AVATAR */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/avatar.png"
                alt="Developer"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 text-center lg:text-left">
              <h3 className="text-2xl font-semibold">Your Name</h3>
              <p className="mt-1 text-sm text-cyan-400">Founder & Developer</p>
            </div>
          </div>

          {/* TEXT */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Quote size={28} className="mt-1 shrink-0 text-cyan-400/70" />

              <p className="max-w-3xl text-xl leading-relaxed text-white/75">
                I created The Prism because I became increasingly interested in
                how differently the same events were presented across media
                platforms. Over time, it became clear that understanding the
                framing of a story is often just as important as understanding
                the story itself.
              </p>
            </div>

            <p className="max-w-3xl leading-relaxed text-white/55">
              This project started as an experiment in comparing narratives, but
              gradually evolved into a platform focused on perspective,
              transparency, and critical reading. The Prism is still evolving,
              and the long-term goal is to create a space where users can
              explore information with more context and less manipulation.
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

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 The Prism</p>

        <div className="flex items-center gap-6">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  )
}
