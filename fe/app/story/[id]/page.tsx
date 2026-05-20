"use client";

import {
  Activity,
  Fingerprint,
  Layers,
  ShieldAlert,
  TrendingUp,
  Zap,
  Eye,
  Cpu,
  Globe,
} from "lucide-react";

export default function ForensicSpecimenPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.10),transparent_35%)]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02040A]" />

          <div className="relative z-10">
            {/* TAGS */}
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                <Activity className="h-3 w-3 animate-pulse" />
                Deep Scan Active
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                <Fingerprint className="h-3 w-3" />
                Prism-992-Alpha
              </div>
            </div>

            {/* TITLE */}
            <div className="grid gap-10 xl:grid-cols-[1.4fr_.6fr]">
              <div>
                <h1 className="max-w-5xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-8xl">
                  Architects of{" "}
                  <span className="bg-gradient-to-b from-cyan-200 to-cyan-700 bg-clip-text text-transparent italic">
                    Consent
                  </span>
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50">
                  Autonomous intelligence systems are reshaping public
                  perception through predictive narratives, emotional steering,
                  and algorithmic consensus reinforcement across global
                  information ecosystems.
                </p>
              </div>

              {/* METRICS */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Globe,
                    label: "Global Nodes",
                    value: "142",
                  },
                  {
                    icon: Cpu,
                    label: "AI Clusters",
                    value: "31K",
                  },
                  {
                    icon: TrendingUp,
                    label: "Signal Drift",
                    value: "94%",
                  },
                  {
                    icon: ShieldAlert,
                    label: "Threat Level",
                    value: "HIGH",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white/10 bg-black/30 p-5"
                  >
                    <item.icon className="mb-4 h-5 w-5 text-cyan-400" />

                    <div className="text-3xl font-black">{item.value}</div>

                    <div className="mt-1 text-[10px] tracking-[0.25em] text-white/30 uppercase">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-10 grid gap-10 xl:grid-cols-[280px_1fr_320px]">
          {/* LEFT */}
          <aside className="space-y-6">
            {/* SIGNALS */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  Signal Matrix
                </h3>

                <Zap className="h-4 w-4 text-cyan-400" />
              </div>

              <div className="space-y-5">
                {[
                  ["Narrative Drift", "97.4%"],
                  ["Consensus Sync", "82.1%"],
                  ["Emotional Load", "66.8%"],
                  ["Visibility Suppression", "41%"],
                ].map(([label, val], i) => (
                  <div key={i}>
                    <div className="mb-2 flex justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      <span>{label}</span>
                      <span className="text-cyan-400">{val}</span>
                    </div>

                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                        style={{ width: val }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ALERTS */}
            <div className="rounded-[32px] border border-red-500/20 bg-red-500/[0.03] p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-red-400" />

                <h3 className="text-[11px] font-black tracking-[0.3em] text-red-400 uppercase">
                  Active Alerts
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  "Cross-platform sentiment steering accelerating",
                  "Synthetic amplification clusters detected",
                  "Independent narratives losing visibility",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-white/5 pb-4 text-sm leading-relaxed text-white/50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ARTICLE */}
          <article className="rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
            <div className="mb-10 flex items-center gap-4">
              <Eye className="h-7 w-7 text-cyan-400/70" />

              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  Forensic Briefing
                </p>

                <p className="mt-1 text-xs text-white/30 uppercase">
                  NODE_992_AUTH // MAY 2026
                </p>
              </div>
            </div>

            <div className="space-y-10 text-[17px] leading-[2] text-white/65">
              <p>
                The current landscape of information dissemination has evolved
                beyond passive reporting into an architecture of active
                perception management. Intelligence systems reveal coordinated
                semantic alignment across institutional media channels,
                algorithmic recommendation engines, and automated moderation
                layers.
              </p>

              {/* QUOTE BLOCK */}
              <div className="relative overflow-hidden rounded-[30px] border border-cyan-500/20 bg-cyan-500/[0.04] p-10">
                <Layers className="absolute right-0 bottom-0 h-28 w-28 text-cyan-400/5" />

                <p className="relative z-10 text-2xl leading-relaxed font-bold tracking-tight text-cyan-50 uppercase">
                  “When the vocabulary of crisis becomes identical across
                  hundreds of systems within minutes, information stops behaving
                  like journalism and starts behaving like infrastructure.”
                </p>
              </div>

              <p>
                Investigative scans identified forced consensus loops capable of
                suppressing dissenting interpretations milliseconds after
                publication. These loops rely on emotional reinforcement,
                visibility modulation, semantic convergence, and predictive
                engagement systems designed to reduce interpretive variance.
              </p>

              {/* INLINE DATA */}
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  ["82.4%", "Echo Consistency"],
                  ["12m", "Narrative Sync Window"],
                  ["40%", "Suppressed Packets"],
                ].map(([val, label], i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center"
                  >
                    <div className="text-4xl font-black text-cyan-400">
                      {val}
                    </div>

                    <div className="mt-3 text-[10px] tracking-[0.25em] text-white/30 uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <p>
                Predictive consensus systems no longer respond to public
                sentiment — they shape the expectation of events before they
                occur. By the time information reaches the end-user, it has
                already been processed through narrative hardening layers,
                emotional optimization, and engagement-weighted filtering
                systems.
              </p>

              <blockquote className="border-l-4 border-purple-500 bg-purple-500/[0.05] px-8 py-6 text-xl leading-relaxed font-semibold text-white">
                Verification is no longer optional. Verification is the final
                survival layer for decentralized consciousness.
              </blockquote>
            </div>
          </article>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* FEED */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  Live Feed
                </h3>

                <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-5">
                {[
                  "Autonomous sentiment clusters manipulate geopolitical framing.",
                  "Neural recommendation engines display synchronized drift.",
                  "Synthetic amplification spreads across decentralized nodes.",
                  "Deepfake ecosystems exceed anomaly thresholds.",
                ].map((item, i) => (
                  <div key={i} className="group border-b border-white/5 pb-5">
                    <p className="text-sm leading-relaxed text-white/60 transition-all group-hover:text-cyan-400">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONFIDENCE */}
            <div className="rounded-[32px] border border-cyan-500/20 bg-cyan-500/[0.04] p-8 text-center">
              <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                Confidence Index
              </p>

              <div className="mt-4 text-7xl font-black tracking-tighter text-white">
                98<span className="text-cyan-400">%</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/40">
                High-probability narrative manipulation confirmed across
                monitored systems.
              </p>
            </div>
          </aside>
        </section>
      </main>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
    </div>
  );
}
