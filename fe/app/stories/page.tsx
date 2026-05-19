"use client";

import React from "react";
import {
  Activity,
  ArrowRight,
  Binary,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Fingerprint,
  Globe,
  Radar,
  Shield,
  Sparkles,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react";

import StickyInsight from "../components/TickerCard";
import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import GenericObsidianStoryCard from "../components/HeroCard";
import { HeadlineCard } from "../components/HeadlineCard";
import { NarrativeSplitCard } from "../components/NarrativeSplitCard";
import { AnomalyCard } from "../components/AnomalyCard";

export default function StoryIntelligencePage() {
  const topics = [
    { label: "All Streams", color: "border-white/20 text-white bg-white/10" },
    { label: "Cyber Warfare", color: "border-cyan-500/50 text-cyan-400" },
    { label: "AI Divergence", color: "border-purple-500/50 text-purple-400" },
    { label: "Market Chaos", color: "border-red-500/50 text-red-400" },
    {
      label: "Deepfake Systems",
      color: "border-emerald-500/50 text-emerald-400",
    },
    {
      label: "Quantum Intel",
      color: "border-pink-500/50 text-pink-400",
    },
  ];

  const primaryHeadlines = [
    {
      tag: "FLASH",
      time: "02m ago",
      title:
        "Autonomous sentiment clusters detected manipulating geopolitical narratives.",
      variant: "cyan" as const,
    },
    {
      tag: "CRITICAL",
      time: "14m ago",
      title:
        "Neural recommendation engines begin synchronized emotional steering.",
      variant: "purple" as const,
    },
    {
      tag: "ALERT",
      time: "31m ago",
      title:
        "Synthetic market amplification spreads through decentralized AI nodes.",
      variant: "red" as const,
    },
    {
      tag: "LIVE",
      time: "48m ago",
      title:
        "Dark web intelligence streams reveal coordinated deepfake deployment.",
      variant: "emerald" as const,
    },
  ];

  const heroStory = {
    genre: "Neural Intelligence",
    date: "May 19, 2026",
    headline:
      "GLOBAL AI NARRATIVE COLLISION: INSIDE THE SYNTHETIC INFORMATION WAR",
    description:
      "Autonomous systems are reshaping public perception in real-time. Intelligence clusters reveal emotional manipulation, narrative injection, and algorithmic polarization spreading across geopolitical ecosystems.",
    sourceCount: 48,
    status: "High Threat Signal",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
  };

  const timeline = [
    {
      time: "00:14",
      title: "Neural sentiment drift detected",
      desc: "AI systems identify coordinated emotional spikes in media streams.",
    },
    {
      time: "02:48",
      title: "Synthetic engagement acceleration",
      desc: "Bot amplification clusters trigger visibility escalation.",
    },
    {
      time: "04:10",
      title: "Narrative fracture confirmed",
      desc: "Competing information ecosystems diverge beyond threshold.",
    },
    {
      time: "06:23",
      title: "Autonomous correction initiated",
      desc: "AI moderation systems begin counter-narrative deployment.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* FLOATING GLOW */}
      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            {/* LEFT */}
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  <Activity className="h-3 w-3 animate-pulse" />
                  LIVE INTELLIGENCE
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <Cpu className="h-3 w-3" />
                  Neural Archive
                </div>
              </div>

              <h1 className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
                <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                  STORIES
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50">
                Autonomous intelligence systems tracking narrative divergence,
                emotional manipulation, synthetic influence operations, and
                geopolitical signal distortion across global information
                ecosystems.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  icon: Globe,
                  label: "Global Feeds",
                  value: "12.4K",
                },
                {
                  icon: Radar,
                  label: "Threat Nodes",
                  value: "847",
                },
                {
                  icon: Fingerprint,
                  label: "AI Signatures",
                  value: "31K",
                },
                {
                  icon: Waves,
                  label: "Signal Drift",
                  value: "74%",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-5 transition-all duration-500 hover:scale-105 hover:border-cyan-500/40"
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

          {/* TOPIC CHIPS */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-4">
            {topics.map((topic, idx) => (
              <button
                key={idx}
                className={`group flex items-center gap-3 rounded-full border px-5 py-3 ${topic.color} text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]`}
              >
                <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                {topic.label}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT PANEL */}
          <aside className="col-span-12 space-y-8 xl:col-span-3">
            {/* LIVE SIGNAL */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl flex justify-center flex-col items-center">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[20px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  SIGNAL INTEL
                </h3>
                <BrainCircuit className="h-5 w-5 animate-pulse text-cyan-400" />
              </div>

              <div className="space-y-6 grid xl:grid-cols-1! justify-center xl:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-3!">
                <StickyInsight
                  variant="cyan"
                  title="AI Drift Detected"
                  content="Language models exhibit synchronized framing shifts across European media channels."
                />

                <StickyInsight
                  variant="purple"
                  title="Neural Echo Pattern"
                  content="Recommendation systems amplify emotional volatility within political clusters."
                />

                <StickyInsight
                  variant="red"
                  title="Threat Escalation"
                  content="Synthetic propaganda density exceeds baseline anomaly thresholds."
                />
              </div>
            </div>

            {/* TIMELINE */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center gap-3">
                <Zap className="h-5 w-5 text-purple-400" />
                <h3 className="text-[11px] font-black tracking-[0.3em] text-white uppercase">
                  Event Timeline
                </h3>
              </div>

              <div className="space-y-8">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute top-1 left-0 h-full w-px bg-white/10" />
                    <div className="absolute top-1 left-[-4px] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_cyan]" />

                    <div className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">
                      {item.time}
                    </div>

                    <h4 className="mt-2 text-sm font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-white/40">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="col-span-12 space-y-12 xl:col-span-6">
            {/* HERO STORY */}
            <GenericObsidianStoryCard
              {...heroStory}
              onActionClick={() => console.log("Open")}
            />

            {/* SPLIT CARD */}
            <NarrativeSplitCard
              seedId="NODE-X44"
              topic="Narrative Divergence"
              versionA={{
                label: "Verified Narrative",
                title: "Controlled Stability",
                description:
                  "Institutional media frames the event as coordinated stabilization efforts.",
              }}
              versionB={{
                label: "Shadow Narrative",
                title: "Synthetic Influence",
                description:
                  "Independent intelligence clusters detect hidden algorithmic manipulation and emotional steering.",
              }}
            />

            {/* LIVE STREAM */}
            <div className="space-y-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-[11px] font-black tracking-[0.35em] text-white/40 uppercase">
                  LIVE STORY STREAM
                </h2>

                <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
                  Explore Archive
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* STORY GRID */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <GenericShortStoryCard
                  badge="Signal"
                  id="NODE-09"
                  headline="Quantum Encryption Systems Trigger Global Security Debate"
                  description="Autonomous intelligence networks detect conflict between military encryption protocols and decentralized AI frameworks."
                  imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80"
                />

                <GenericShortStoryCard
                  badge="Threat"
                  id="ANM-44"
                  headline="Synthetic Deepfake Clusters Begin Cross-Platform Propagation"
                  description="AI moderation systems struggle to contain rapidly evolving identity manipulation networks."
                  imageUrl="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80"
                />
              </div>

              {/* LIST CARDS */}
              <GenericCompactListCard
                category="Geopolitics"
                sourceCount={18}
                headline="AI Intelligence Models Reveal Coordinated Market Sentiment Manipulation"
                description="Large-scale narrative synchronization emerges across economic reporting ecosystems and automated recommendation layers."
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80"
              />

              <GenericCompactListCard
                category="Cyber Intelligence"
                sourceCount={12}
                headline="Neural Data Centers Experience Resource Fragmentation Across Continents"
                description="High-density compute systems struggle under escalating autonomous training demands and decentralized processing conflicts."
                imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80"
              />
            </div>
          </section>

          {/* RIGHT */}
          <aside className="col-span-12 space-y-10 xl:col-span-3">
            {/* HEADLINES */}
            <HeadlineCard
              title="LIVE HEADLINES"
              data={primaryHeadlines}
              onActionClick={() => console.log("Open headlines")}
            />

            {/* ANOMALY */}
            <AnomalyCard
              id="ANOM-77"
              title="Neural Breach"
              desc="Autonomous AI systems display coordinated behavioral drift across geopolitical clusters."
              tag="Critical"
              intensity="98%"
              color="border-cyan-500"
              img="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80"
            />

            {/* RISK PANEL */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.25em] text-red-400 uppercase">
                    Threat Matrix
                  </p>

                  <h3 className="mt-2 text-3xl font-black">HIGH VOLATILITY</h3>
                </div>

                <Shield className="h-8 w-8 text-red-400" />
              </div>

              <div className="space-y-6">
                {[
                  "Synthetic narrative escalation detected",
                  "Cross-platform emotional drift accelerating",
                  "Deepfake propagation exceeds threshold",
                  "AI sentiment clusters diverging globally",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 border-b border-white/5 pb-4"
                  >
                    <TrendingUp className="mt-1 h-4 w-4 text-red-400" />

                    <p className="text-sm leading-relaxed text-white/50">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 py-4 text-[11px] font-black tracking-[0.3em] text-red-400 uppercase transition-all hover:scale-[1.02] hover:bg-red-500/20">
                Initialize Deep Scan
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
