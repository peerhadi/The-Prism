"use client";

import * as React from "react";
import {
  Activity,
  Atom,
  Binary,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Eye,
  Fingerprint,
  Globe,
  Mic2,
  Orbit,
  Radar,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";

import { AnomalyCard } from "../components/AnomalyCard";
import StickyInsight from "../components/TickerCard";
import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import { HeadlineCard } from "../components/HeadlineCard";
import { NarrativeSplitCard } from "../components/NarrativeSplitCard";

const TOPICS = [
  {
    id: "ANOMALY-01",
    title: "Linguistic Camouflage",
    desc: "Detecting how corporate entities hide policy shifts within high-density aesthetic jargon.",
    tag: "Semantic Research",
    intensity: "88%",
    color: "border-cyan-500",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ANOMALY-02",
    title: "Ghost Consensus",
    desc: "The rise of bot-driven narrative loops in Sector-7 and their impact on local memory.",
    tag: "Network Drift",
    intensity: "94%",
    color: "border-purple-500",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ANOMALY-03",
    title: "Bio-Digital Drift",
    desc: "Analyzing the psychological payload of automated headlines on decentralized groups.",
    tag: "Forensic Psychology",
    intensity: "72%",
    color: "border-red-500",
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ANOMALY-04",
    title: "Encryption Shards",
    desc: "Localized data pockets resisting central ingestion through quantum-noise masking.",
    tag: "Crypto-Security",
    intensity: "45%",
    color: "border-green-500",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
  },
];

const HEADLINES = [
  {
    tag: "LIVE",
    time: "03m ago",
    title: "Dark-network clusters begin synchronized propaganda injection.",
    variant: "cyan" as const,
  },
  {
    tag: "ALERT",
    time: "09m ago",
    title: "Emotional volatility spikes detected across media ecosystems.",
    variant: "purple" as const,
  },
  {
    tag: "CRITICAL",
    time: "14m ago",
    title: "AI-generated public consensus loops overwhelm moderation layers.",
    variant: "red" as const,
  },
];

export default function ExploreForensics() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050a] font-sans text-white selection:bg-cyan-500/30">
      {/* GLOBAL CYBER BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:90px_90px]" />
        </div>

        {/* GLOWS */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-purple-500/20 blur-[180px]" />

        {/* SCANLINES */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.03)_100%)] bg-[size:100%_6px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1920px] px-6 py-10">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* Animated Glow */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
          </div>

          {/* HEADER */}
          <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  <Activity className="h-3 w-3 animate-pulse" />
                  LIVE EXPLORATION
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.25em] text-white/40 uppercase">
                  <Binary className="h-3 w-3" />
                  SIGNAL ARCHIVE
                </div>
              </div>

              <h1 className="text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
                <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                  EXPLORE
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50">
                Navigate hidden intelligence streams, synthetic narratives,
                emotional drift clusters, and autonomous information anomalies
                emerging across decentralized networks.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  icon: Radar,
                  value: "1.2K",
                  label: "Anomalies",
                },
                {
                  icon: Cpu,
                  value: "48",
                  label: "AI Nodes",
                },
                {
                  icon: Eye,
                  value: "7.9M",
                  label: "Signals",
                },
                {
                  icon: Waves,
                  value: "89%",
                  label: "Instability",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-5 transition-all duration-500 hover:scale-105 hover:border-cyan-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <item.icon className="mb-4 h-6 w-6 text-cyan-400" />

                    <div className="text-3xl font-black">{item.value}</div>

                    <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOPICS */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-4">
            {[
              "Semantic Drift",
              "Ghost Networks",
              "Synthetic AI",
              "Narrative Collapse",
              "Psycho Metrics",
              "Quantum Noise",
            ].map((item, idx) => (
              <button
                key={idx}
                className="group rounded-full border border-white/10 bg-black/30 px-5 py-3 text-[11px] font-black tracking-[0.25em] text-white/50 uppercase transition-all duration-500 hover:scale-105 hover:border-cyan-500/40 hover:text-cyan-400"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT SIDEBAR */}
          <aside className="col-span-12 space-y-8 xl:col-span-3">
            {/* LIVE FEED */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  SIGNAL FEED
                </h3>

                <BrainCircuit className="h-5 w-5 animate-pulse text-cyan-400" />
              </div>

              <div className="space-y-6">
                <StickyInsight
                  variant="cyan"
                  title="Neural Drift"
                  content="Coordinated AI framing shifts detected across economic media clusters."
                />

                <StickyInsight
                  variant="purple"
                  title="Ghost Echo"
                  content="Autonomous engagement loops intensify emotional amplification."
                />

                <StickyInsight
                  variant="red"
                  title="Threat Escalation"
                  content="Synthetic sentiment density exceeds moderation thresholds."
                />
              </div>
            </div>

            {/* STATIC CLUSTERS */}
            <div className="rounded-[36px] border border-white/10 bg-black/20 p-8">
              <div className="mb-8 flex items-center gap-4">
                <Atom size={22} className="text-cyan-400" />
                <h4 className="text-xl font-black tracking-tighter uppercase">
                  Static Clusters
                </h4>
              </div>

              <div className="space-y-5">
                {[
                  "Atmospheric Harvesting",
                  "P2P Silo Effects",
                  "Post-Viral Fatigue",
                  "Synthetic Emotional Drift",
                  "Algorithmic Isolation",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex cursor-pointer items-center justify-between border-b border-white/5 pb-4"
                  >
                    <span className="text-[13px] font-bold tracking-tight text-white/40 uppercase transition-all group-hover:text-white">
                      {item}
                    </span>

                    <Globe
                      size={14}
                      className="text-white/10 transition-all group-hover:text-cyan-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="col-span-12 space-y-12 xl:col-span-6">
            {/* FEATURED SPLIT */}
            <NarrativeSplitCard
              seedId="NODE-X19"
              topic="Narrative Divergence"
              versionA={{
                label: "Public Feed",
                title: "Institutional Stability",
                description:
                  "Mainstream systems present synchronized narratives reinforcing social calm.",
              }}
              versionB={{
                label: "Shadow Feed",
                title: "Synthetic Steering",
                description:
                  "Independent intelligence clusters detect hidden algorithmic emotional manipulation.",
              }}
            />

            {/* ANOMALY GRID */}
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                    Curated Anomalies
                  </p>

                  <h2 className="mt-2 text-5xl font-black tracking-tighter uppercase">
                    Interest Nodes
                  </h2>
                </div>

                <Orbit className="h-10 w-10 animate-spin text-cyan-400" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {TOPICS.map((topic) => (
                  <AnomalyCard key={topic.id} {...topic} />
                ))}
              </div>
            </div>

            {/* STORY CARDS */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <GenericShortStoryCard
                badge="Deep Scan"
                id="XR-77"
                headline="Decentralized AI Systems Begin Self-Amplifying Consensus Loops"
                description="Neural recommendation engines recursively reinforce emotional polarization."
                imageUrl="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80"
              />

              <GenericShortStoryCard
                badge="Signal"
                id="NODE-08"
                headline="Quantum Noise Clusters Prevent Centralized Data Assimilation"
                description="Localized intelligence pockets resist autonomous ingestion frameworks."
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80"
              />
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-12 space-y-10 xl:col-span-3">
            {/* HEADLINES */}
            <HeadlineCard
              title="Live Headlines"
              data={HEADLINES}
              onActionClick={() => console.log("open")}
            />

            {/* SUBMIT PANEL */}
            <div className="space-y-6 overflow-hidden rounded-[36px] border border-cyan-500/20 bg-cyan-500/5 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />

              <div className="relative z-10">
                <Sparkles size={32} className="text-cyan-400" />

                <h4 className="mt-6 text-3xl font-black tracking-tighter uppercase italic">
                  Submit Anomaly
                </h4>

                <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                  Upload intelligence fragments, narrative threads, or emotional
                  anomalies for autonomous ingestion and analysis.
                </p>

                <button className="mt-8 w-full rounded-2xl bg-cyan-400 py-4 text-[10px] font-black tracking-[0.35em] text-black uppercase transition-all hover:scale-[1.02] hover:bg-white">
                  Open Uplink
                </button>
              </div>
            </div>

            {/* AUDIO INGESTION */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0a1018] p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />

              <div className="relative z-10">
                <Mic2 size={32} className="text-white/20" />

                <h4 className="mt-6 text-3xl font-black tracking-tighter uppercase">
                  Audio Ingestion
                </h4>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex gap-1">
                    {[2, 4, 6, 3, 8, 4, 2, 5, 7].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 animate-pulse bg-cyan-400"
                        style={{ height: `${h * 3}px` }}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                    Live Monitoring
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Voiceprint anomaly detected",
                    "Signal contamination increasing",
                    "Speech synthesis identified",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-white/5 pb-3"
                    >
                      <span className="text-xs text-white/50">{item}</span>

                      <Zap className="h-3 w-3 text-cyan-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* BOTTOM NEON BAR */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </div>
  );
}
