"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Globe,
  Database,
  Cpu,
  Activity,
  ShieldAlert,
  Fingerprint,
  Zap,
  TrendingUp,
  Box,
  Layers,
  Search,
} from "lucide-react";

export default function ForensicSpecimenPage() {
  return (
    <div className="relative min-h-screen bg-[#02050a] font-sans text-white selection:bg-cyan-500/30">
      {/* --- CONSTRAINED HERO SECTION --- */}
      <section className="relative h-[45vh] w-full overflow-hidden border-b border-cyan-500/20 bg-black">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
          alt="Technical Infrastructure"
          className="h-full w-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-transparent to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-12 text-center">
          <div className="mb-4 flex items-center gap-3 border border-cyan-400/20 bg-black/40 px-3 py-1 backdrop-blur-sm">
            <Box size={12} className="text-cyan-400" />
            <span className="text-[9px] font-black tracking-[0.4em] text-cyan-400 uppercase">
              Object ID: PRISM-992-ALPHA
            </span>
          </div>
          <h1 className="max-w-5xl text-5xl leading-[0.9] font-black tracking-tighter uppercase sm:text-7xl md:text-8xl">
            Architects of <span className="text-cyan-400 italic">Consent</span>
          </h1>
          <div className="mt-6 h-[1px] w-24 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        </div>
      </section>

      {/* --- GAP ADDED HERE (mt-24) --- */}
      <main className="mx-auto mt-24 max-w-[1920px] px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* --- LEFT SIDE: THE FEED & ANALYTICS --- */}
          <aside className="space-y-8 lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              <div className="space-y-1">
                {[
                  {
                    label: "Narrative Drift",
                    val: "CRITICAL",
                    color: "text-red-500",
                  },
                  {
                    label: "Source Identity",
                    val: "MASKED",
                    color: "text-yellow-500",
                  },
                  {
                    label: "Signal Strength",
                    val: "94.2%",
                    color: "text-cyan-400",
                  },
                  {
                    label: "Global Reach",
                    val: "142 NODES",
                    color: "text-white",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between border border-white/5 bg-[#03070e] p-4 transition-all hover:bg-cyan-500/5"
                  >
                    <span className="text-[9px] font-black tracking-widest text-white/30 uppercase">
                      {m.label}
                    </span>
                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase ${m.color}`}
                    >
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* --- CENTER COLUMN: EXTENDED DENSE ARTICLE --- */}
          <article className="border-x border-white/5 px-10 lg:col-span-6">
            <div className="prose prose-invert max-w-none">
              <div className="mb-12 flex items-center gap-4">
                <Fingerprint size={32} className="text-cyan-400/40" />
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                    Forensic Briefing // Deep Scan
                  </p>
                  <p className="font-mono text-[12px] text-white/40 uppercase">
                    NODE_992_AUTH // 14.05.2026
                  </p>
                </div>
              </div>

              <div className="space-y-12 text-[17px] leading-[1.9] text-white/70">
                <p>
                  The current landscape of information dissemination has moved
                  beyond simple reporting into a phase of
                  <span
                    className="mx-1 cursor-help border-b border-red-500 bg-red-500/10 px-1 text-red-400"
                    title="High Bias Detected"
                  >
                    Active Narrative Steering
                  </span>
                  . Our deep-scan protocols have identified a systematic
                  integration of private corporate narratives into public data
                  streams. This isn't a mere coincidence of interest; it is a
                  calculated semantic alignment designed to
                  <span className="text-white italic">
                    pre-emptively neutralize
                  </span>{" "}
                  dissenting interpretations before they can propagate across
                  the network.
                </p>

                <div className="my-12 flex gap-6 border-y border-white/5 bg-white/[0.02] py-10">
                  <div className="w-1/3 border-r border-white/10 p-4 text-center">
                    <p className="text-4xl font-black text-cyan-400">82.4%</p>
                    <p className="mt-2 text-[9px] leading-tight font-bold tracking-widest text-white/30 uppercase">
                      Echo Protocol
                      <br />
                      Consistency
                    </p>
                  </div>
                  <div className="w-2/3 p-4 font-serif text-[16px] text-white/50 italic">
                    "When the vocabulary of a global crisis is standardized
                    across three hundred disparate nodes within twelve minutes,
                    we are no longer looking at news—we are looking at a
                    deployment."
                  </div>
                </div>

                <p>
                  As we peel back the layers of{" "}
                  <span className="font-bold tracking-widest text-cyan-400 uppercase">
                    Digital Governance
                  </span>
                  , we observe that the language of "transparency" is frequently
                  weaponized to mask the consolidation of power. In Sector-7,
                  our sensors recorded a
                  <span className="mx-1 border-b border-red-500/40 text-red-400">
                    forced consensus loop
                  </span>
                  that neutralized over 40% of dissenting data packets within
                  milliseconds of publication. This is achieved through the
                  tactical use of superlative adjectives and
                  <span
                    className="mx-1 cursor-help border-b border-red-500/50 text-red-400"
                    title="Institutional Bias"
                  >
                    Logical Closure Markers
                  </span>
                  that signal the end of "authorized" debate.
                </p>

                <p>
                  The shift toward{" "}
                  <span className="bg-cyan-400/10 px-1 text-cyan-400">
                    Predictive Consensus Building
                  </span>
                  represents a fundamental pivot in human-machine interaction.
                  Instead of responding to events, the architecture now steers
                  the{" "}
                  <span className="font-bold text-white">
                    Expectation of Events
                  </span>
                  . By the time a fact reaches the end-user, it has already been
                  filtered through layers of
                  <span className="mx-1 border-b border-red-500/50 text-red-400">
                    Sentiment Hardening
                  </span>
                  and Narrative De-risking.
                </p>

                <blockquote className="relative overflow-hidden border-l-4 border-cyan-400 bg-cyan-400/5 p-10 text-xl font-bold tracking-tight text-cyan-100 uppercase">
                  <Layers className="absolute -right-4 -bottom-4 h-24 w-24 rotate-12 text-cyan-400/5" />
                  The architecture of your memory is the next frontier.
                  Verification is no longer a luxury—it is the primary survival
                  requirement for decentralized consciousness.
                </blockquote>
              </div>
            </div>
          </article>

          {/* --- RIGHT SIDE: SYSTEM HEADLINES & DRIFT --- */}
          <aside className="space-y-10 lg:col-span-3">
            <div className="sticky top-28 space-y-10">
              <div className="border border-cyan-500/20 bg-cyan-950/5 p-6">
                <h4 className="mb-6 flex items-center gap-2 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                  <TrendingUp size={14} /> Narrative Heat-Map
                </h4>
                <div className="space-y-6">
                  {[
                    { label: "Political Drift", val: 88 },
                    { label: "Corporate Influence", val: 62 },
                    { label: "Emotional Load", val: 45 },
                  ].map((h, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-bold tracking-widest text-white/40 uppercase">
                        <span>{h.label}</span>
                        <span>{h.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5">
                        <div
                          className="h-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                          style={{ width: `${h.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <section className="space-y-6">
                <h4 className="border-b border-white/5 pb-2 text-[10px] font-black tracking-widest text-white/20 uppercase">
                  Active Alerts
                </h4>
                {[
                  "Hyper-inflation of attention tokens reaches 140%",
                  "Sector-7 implements mandatory firewall protocols",
                  "Quantum encryption nodes localized in eastern corridor",
                ].map((news, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex gap-3">
                      <Zap size={14} className="mt-1 shrink-0 text-cyan-400" />
                      <p className="text-[13px] leading-snug font-bold transition-all group-hover:text-cyan-400">
                        {news}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              <div className="border border-white/5 bg-[#0a1018] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-cyan-400" />
                  <span className="font-mono text-[10px] font-black tracking-widest uppercase">
                    Confidence Index
                  </span>
                </div>
                <div className="text-4xl font-black tracking-tighter text-white">
                  98.2<span className="text-cyan-400">%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
    </div>
  );
}
