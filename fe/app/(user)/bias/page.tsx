"use client";

import {
  Radar,
  Shield,
  Brain,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function BiasMethodologyPage() {
  const ranges = [
    {
      title: "0 — 25",
      subtitle: "MINIMAL BIAS",
      color: "cyan",
      description:
        "Articles in this range present information using highly neutral language and balanced sourcing patterns.",
      points: [
        "Fact-focused reporting",
        "Limited emotional framing",
        "Multiple viewpoints represented",
        "Clear separation of fact and opinion",
      ],
    },
    {
      title: "25 — 50",
      subtitle: "MILD BIAS",
      color: "emerald",
      description:
        "Subtle framing choices begin influencing interpretation while remaining primarily informational.",
      points: [
        "Selective emphasis",
        "Minor narrative preference",
        "Moderate persuasive wording",
        "Slight sourcing asymmetry",
      ],
    },
    {
      title: "50 — 75",
      subtitle: "NOTICEABLE BIAS",
      color: "yellow",
      description:
        "Framing significantly influences reader perception and interpretation.",
      points: [
        "Strong narrative structure",
        "Emotional language appears regularly",
        "One-sided sourcing patterns",
        "Opinion-driven presentation",
      ],
    },
    {
      title: "75 — 100",
      subtitle: "STRONG BIAS",
      color: "red",
      description:
        "Highly persuasive or ideological framing dominates the article.",
      points: [
        "Loaded language",
        "Heavy emotional framing",
        "Single-perspective reporting",
        "Narrative-first presentation",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">
              <Radar className="h-3 w-3" />
              BIAS INTELLIGENCE SYSTEM
            </div>

            <h1 className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
              <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                BIAS
              </span>
              <br />
              <span className="text-white">METHODOLOGY</span>
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-white/50">
              Every article inside Prism receives a Bias Score between
              <span className="text-cyan-400"> 0 </span>
              and
              <span className="text-purple-400"> 100</span>. The score does not
              determine truthfulness. It measures how strongly language,
              framing, source selection, and narrative construction suggest
              ideological positioning.
            </p>
          </div>
        </section>

        {/* SCALE */}
        <section className="mt-12 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <Activity className="h-5 w-5 text-cyan-400" />
            <h2 className="text-[11px] font-black tracking-[0.35em] uppercase text-cyan-400">
              SCORE SCALE
            </h2>
          </div>

          <div className="overflow-hidden rounded-full border border-white/10">
            <div className="h-6 bg-gradient-to-r from-cyan-500 via-emerald-500 via-yellow-500 to-red-500" />
          </div>

          <div className="mt-6 grid grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-black text-cyan-400">0–25</div>
              <div className="mt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
                Minimal Bias
              </div>
            </div>

            <div>
              <div className="text-3xl font-black text-emerald-400">25–50</div>
              <div className="mt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
                Mild Bias
              </div>
            </div>

            <div>
              <div className="text-3xl font-black text-yellow-400">50–75</div>
              <div className="mt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
                Noticeable Bias
              </div>
            </div>

            <div>
              <div className="text-3xl font-black text-red-400">75–100</div>
              <div className="mt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
                Strong Bias
              </div>
            </div>
          </div>
        </section>

        {/* RANGES */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {ranges.map((range) => (
            <div
              key={range.title}
              className="
                group
                rounded-[36px]
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-cyan-500/30
              "
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-5xl font-black">{range.title}</div>

                  <div className="mt-2 text-[11px] font-black tracking-[0.3em] uppercase text-cyan-400">
                    {range.subtitle}
                  </div>
                </div>

                <Shield className="h-8 w-8 text-cyan-400" />
              </div>

              <p className="mb-8 text-white/60 leading-relaxed">
                {range.description}
              </p>

              <div className="space-y-3">
                {range.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <Brain className="h-5 w-5 text-purple-400" />

            <h2 className="text-[11px] font-black tracking-[0.35em] uppercase text-purple-400">
              HOW PRISM CALCULATES BIAS
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Language Analysis",
              "Narrative Framing",
              "Source Diversity",
              "Context Balance",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-black/20 p-6"
              >
                <Sparkles className="mb-4 h-6 w-6 text-cyan-400" />

                <h3 className="font-black">{item}</h3>

                <p className="mt-3 text-sm text-white/50">
                  Evaluated by Prism's editorial intelligence system.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <p className="text-white/70 leading-relaxed">
              Bias scores are intended as transparency signals. A high score
              does not mean an article is false, and a low score does not
              guarantee perfect neutrality. The score reflects how information
              is framed and presented to readers.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
