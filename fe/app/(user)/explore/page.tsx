"use client";

import React from "react";
import {
  Activity,
  Cpu,
  Globe,
  Radar,
  Sparkles,
  Zap,
  Search,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function ExplorePage() {
  const categories = [
    { label: "All Signals", color: "border-white/20 text-white bg-white/10" },
    { label: "Breaking Nodes", color: "border-cyan-500/50 text-cyan-400" },
    { label: "AI Patterns", color: "border-purple-500/50 text-purple-400" },
    { label: "Market Flux", color: "border-red-500/50 text-red-400" },
    { label: "Global Feeds", color: "border-emerald-500/50 text-emerald-400" },
    { label: "Anomalies", color: "border-pink-500/50 text-pink-400" },
  ];
  const topics = [
    "AI Signals",
    "Cyber Events",
    "Market Flow",
    "Global Drift",
    "Deepfake Clusters",
    "Narrative Systems",
  ];
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* 🌌 BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_35%)]" />

      {/* GRID OVERLAY */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      {/* FLOATING GLOWS */}
      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      {/* MAIN */}
      <main className="relative z-10 mx-auto max-w-[1700px] px-6 py-12 md:px-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* animated glow */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 h-[250px] w-[250px] bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 h-[250px] w-[250px] bg-purple-500/20 blur-[120px] animate-pulse" />
          </div>

          <div className="relative z-10">
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-6">
              <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] font-black text-cyan-400 uppercase">
                EXPLORE INTELLIGENCE NETWORK
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              <span className="bg-gradient-to-b from-white via-cyan-200 to-purple-900 bg-clip-text text-transparent">
                EXPLORE
              </span>
            </h1>

            <p className="mt-6 text-white/50 max-w-2xl">
              Navigate real-time intelligence streams, emerging anomalies, and
              narrative clusters forming across global systems.
            </p>

            {/* TOPICS */}
            <div className="mt-10 flex flex-wrap gap-3">
              {topics.map((t, i) => (
                <button
                  key={i}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs tracking-[0.2em] uppercase hover:border-cyan-500/40 hover:text-cyan-400 transition"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>
        {/* MAIN EXPLORE GRID */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT — LIVE SIGNAL FEED */}
          <aside className="col-span-12 xl:col-span-4 space-y-8">
            {/* LIVE FEED HEADER */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  LIVE SIGNALS
                </h3>

                <Zap className="h-5 w-5 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "Narrative spike detected",
                    desc: "Coordinated engagement surge across political clusters.",
                    tone: "cyan",
                  },
                  {
                    title: "AI sentiment drift",
                    desc: "Model alignment shift observed in global news embeddings.",
                    tone: "purple",
                  },
                  {
                    title: "Market instability node",
                    desc: "Abnormal correlation between social sentiment and equities.",
                    tone: "red",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:border-cyan-500/30 transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.tone === "cyan"
                            ? "bg-cyan-400"
                            : item.tone === "purple"
                              ? "bg-purple-400"
                              : "bg-red-400"
                        } animate-pulse`}
                      />

                      <p className="font-bold text-sm">{item.title}</p>
                    </div>

                    <p className="text-xs text-white/40 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MINI ANALYTICS */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <h3 className="text-[11px] font-black tracking-[0.35em] text-purple-400 uppercase mb-6">
                SIGNAL HEALTH
              </h3>

              <div className="space-y-5">
                {[
                  { label: "Clarity", value: 82 },
                  { label: "Noise Level", value: 37 },
                  { label: "Divergence", value: 64 },
                  { label: "Volatility", value: 71 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-xs">
                      <span className="text-white/60">{s.label}</span>
                      <span className="text-cyan-400">{s.value}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER — TRENDING GRID */}
          <section className="col-span-12 xl:col-span-5 space-y-8">
            {/* SECTION HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-[11px] font-black tracking-[0.35em] text-white/40 uppercase">
                TRENDING INTELLIGENCE
              </h2>

              <button className="text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
                Refresh
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* TREND CARDS */}
            <div className="grid gap-6">
              {[
                {
                  tag: "BREAKING",
                  title:
                    "Global AI coordination patterns detected across news networks",
                  desc: "Multi-region narrative synchronization emerging in real time.",
                  color: "cyan",
                },
                {
                  tag: "ANOMALY",
                  title:
                    "Synthetic engagement loops amplifying political content",
                  desc: "Feedback loops detected in recommendation systems.",
                  color: "purple",
                },
                {
                  tag: "MARKET",
                  title:
                    "Algorithmic trading reacting to social sentiment spikes",
                  desc: "Correlation strength exceeds historical baseline.",
                  color: "red",
                },
                {
                  tag: "CYBER",
                  title:
                    "Cross-platform deepfake propagation clusters identified",
                  desc: "Identity replication events increasing across channels.",
                  color: "emerald",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl hover:border-cyan-500/30 transition"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] font-black tracking-[0.3em] uppercase ${
                          card.color === "cyan"
                            ? "text-cyan-400"
                            : card.color === "purple"
                              ? "text-purple-400"
                              : card.color === "red"
                                ? "text-red-400"
                                : "text-emerald-400"
                        }`}
                      >
                        {card.tag}
                      </span>

                      <div className="h-1 w-1 rounded-full bg-white/30" />
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                        LIVE
                      </span>
                    </div>

                    <h3 className="text-lg font-black leading-snug">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/40 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT — EXPLORE METRICS */}
          <aside className="col-span-12 xl:col-span-3 space-y-8">
            {/* GLOBAL HEATMAP */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  GLOBAL ACTIVITY
                </h3>

                <Globe className="h-5 w-5 text-cyan-400" />
              </div>

              <div className="space-y-4">
                {[
                  { region: "North America", value: 78 },
                  { region: "Europe", value: 64 },
                  { region: "Asia", value: 91 },
                  { region: "Middle East", value: 55 },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-xs">
                      <span className="text-white/60">{r.region}</span>
                      <span className="text-cyan-400">{r.value}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{ width: `${r.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK INSIGHT PANEL */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-[11px] font-black tracking-[0.35em] text-purple-400 uppercase mb-6">
                SYSTEM INSIGHT
              </h3>

              <div className="space-y-4 text-sm text-white/50 leading-relaxed">
                <p>
                  Exploration patterns indicate increased user focus on
                  anomaly-driven content clusters.
                </p>

                <p>
                  Narrative divergence is accelerating across geopolitical and
                  financial streams.
                </p>

                <p>
                  Recommendation systems show rising entropy in ranking
                  stability.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* DISCOVERY ENGINE */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* AI RECOMMENDER */}
          <div className="col-span-12 xl:col-span-8 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl relative overflow-hidden">
            {/* glow */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  DISCOVERY ENGINE
                </h3>

                <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
              </div>

              <h2 className="text-3xl font-black mb-4">
                What you should explore next
              </h2>

              <p className="text-white/40 text-sm mb-8 max-w-2xl">
                Based on your interaction patterns, narrative exposure, and
                signal preference model.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Emerging AI alignment conflicts",
                    desc: "New divergence patterns detected in multi-model outputs.",
                    tag: "AI",
                  },
                  {
                    title: "Synthetic media propagation map",
                    desc: "Track how deepfake clusters evolve across platforms.",
                    tag: "CYBER",
                  },
                  {
                    title: "Global sentiment shockwaves",
                    desc: "Real-time emotional shifts across geopolitical zones.",
                    tag: "SOCIAL",
                  },
                  {
                    title: "Algorithmic market feedback loops",
                    desc: "Self-reinforcing trading behaviors detected.",
                    tag: "MARKET",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-[28px] border border-white/10 bg-black/30 p-6 hover:border-cyan-500/30 transition relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 transition" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                          {item.tag}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                          RECOMMENDED
                        </span>
                      </div>

                      <h3 className="font-black text-lg">{item.title}</h3>

                      <p className="mt-2 text-sm text-white/40">{item.desc}</p>

                      <button className="mt-5 text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
                        Explore Node
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-12 xl:col-span-4 space-y-8">
            {/* SYSTEM STATUS */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <h3 className="text-[11px] font-black tracking-[0.35em] text-red-400 uppercase mb-6">
                SYSTEM LOAD
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Inference Engine", value: 72 },
                  { label: "Signal Parser", value: 55 },
                  { label: "Network Sync", value: 88 },
                  { label: "Anomaly Detector", value: 64 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/60">{s.label}</span>
                      <span className="text-cyan-400">{s.value}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE PULSE CARD */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[80px] animate-pulse" />
              </div>

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-black">
                    LIVE SIGNAL
                  </span>
                </div>

                <h3 className="text-2xl font-black">847 ACTIVE STREAMS</h3>

                <p className="mt-3 text-sm text-white/40">
                  Neural network activity is currently elevated
                </p>

                <button className="mt-6 w-full rounded-2xl bg-cyan-500 py-3 text-black font-black hover:bg-cyan-400 transition">
                  Enter Live Feed
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER STRIP */}
        <section className="mt-16 border-t border-white/10 pt-10 pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white/30 text-xs tracking-[0.2em] uppercase">
              Prism Neural Exploration System • v2.0
            </div>

            <div className="flex items-center gap-6 text-xs text-white/40">
              <span className="hover:text-cyan-400 cursor-pointer">About</span>
              <span className="hover:text-cyan-400 cursor-pointer">API</span>
              <span className="hover:text-cyan-400 cursor-pointer">
                Signals
              </span>
              <span className="hover:text-cyan-400 cursor-pointer">
                Settings
              </span>
            </div>
          </div>
        </section>
        <div className="mt-20 text-center text-xs text-white/30 tracking-[0.2em] uppercase">
          Neural Explore System • Live Simulation Layer Active
        </div>
      </main>
    </div>
  );
}
