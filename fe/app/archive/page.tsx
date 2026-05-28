"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Binary,
  Brain,
  Calendar,
  ChevronRight,
  Clock3,
  Database,
  Eye,
  FileStack,
  Fingerprint,
  Globe,
  Lock,
  Orbit,
  Radar,
  Search,
  Shield,
  Sparkles,
  Waves,
} from "lucide-react";

import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import StickyInsight from "../components/TickerCard";
import { HeadlineCard } from "../components/HeadlineCard";
import GenericObsidianStoryCard from "../components/HeroCard";

const timeline = [
  "Energy Collapse",
  "Neural Consensus",
  "Biometric Surveillance",
  "Synthetic Media",
  "Quantum Drift",
  "Memory Corruption",
];

const headlineData = [
  {
    tag: "ARCHIVE",
    time: "1997",
    title: "Recovered media fragments reveal early sentiment-engine testing.",
    variant: "cyan" as const,
  },
  {
    tag: "RESTRICTED",
    time: "2008",
    title:
      "Behavioral influence systems quietly integrated into recommendation engines.",
    variant: "purple" as const,
  },
  {
    tag: "SEALED",
    time: "2026",
    title: "Cross-border narrative synchronization reaches critical scale.",
    variant: "red" as const,
  },
];

const archiveStories = [
  {
    badge: "Recovered",
    id: "ARC-01",
    headline: "The First Emotional Recommendation Engine",
    description:
      "Internal documents suggest algorithmic emotional steering existed years before public deployment.",
    imageUrl:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200",
  },
  {
    badge: "Classified",
    id: "ARC-02",
    headline: "Neural Advertising Networks Mapped Public Anxiety Cycles",
    description:
      "Archived media datasets reveal synchronized fear amplification patterns during economic events.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  },
];

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03060d] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* GLOWS */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[160px]" />

        {/* NOISE */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      </div>

      {/* TOP BAR */}

      <main className="relative z-10 mx-auto max-w-[1900px] px-6 py-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 md:p-16">
          {/* GLOW */}
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 grid grid-cols-1 gap-14 xl:grid-cols-12">
            {/* LEFT */}
            <div className="xl:col-span-8">
              <div className="mb-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  <Radar className="h-3 w-3 animate-pulse" />
                  DEEP STORAGE
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-white/40 uppercase">
                  <Lock className="h-3 w-3" />
                  RESTRICTED ACCESS
                </div>
              </div>

              <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase md:text-[10rem]">
                ARCHIVE
                <br />
                <span className="bg-gradient-to-b from-cyan-300 to-cyan-900 bg-clip-text text-transparent">
                  VAULT
                </span>
              </h1>

              <p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/50">
                A classified repository of recovered media fragments, suppressed
                intelligence reports, narrative drift analysis, and synthetic
                influence documentation collected across fragmented timelines.
              </p>

              {/* TIMELINE */}
              <div className="mt-14 flex flex-wrap gap-3">
                {timeline.map((item, idx) => (
                  <button
                    key={idx}
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-3 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase transition-all hover:scale-105 hover:border-cyan-500/30 hover:text-cyan-400"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />

                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-4">
              <div className="space-y-6 rounded-[40px] border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                      SYSTEM STATUS
                    </p>

                    <h3 className="mt-3 text-3xl font-black uppercase">
                      ARCHIVE ONLINE
                    </h3>
                  </div>

                  <Orbit className="h-8 w-8 animate-spin text-cyan-400" />
                </div>

                {[
                  {
                    icon: Eye,
                    label: "Recovered Files",
                    value: "12,884",
                  },
                  {
                    icon: Brain,
                    label: "AI Reconstructions",
                    value: "341",
                  },
                  {
                    icon: Fingerprint,
                    label: "Identity Traces",
                    value: "88%",
                  },
                  {
                    icon: Waves,
                    label: "Signal Integrity",
                    value: "74%",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-cyan-400" />

                      <span className="text-sm text-white/50">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-sm font-black">{item.value}</span>
                  </div>
                ))}

                <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 py-4 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase transition-all hover:scale-[1.02] hover:bg-cyan-500/20">
                  Access Core Records
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT SIDEBAR */}
          <aside className="col-span-12 space-y-8 xl:col-span-3">
            {/* LOGS */}
            <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  ARCHIVE LOGS
                </h3>

                <Activity className="h-5 w-5 animate-pulse text-cyan-400" />
              </div>

              <div className="space-y-6">
                {[
                  "Recovered analog footage from pre-network era.",
                  "Memory corruption detected in political archives.",
                  "Synthetic reconstruction pipeline initialized.",
                  "Timeline drift detected in media cluster.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 border-b border-white/5 pb-5"
                  >
                    <Clock3 className="mt-1 h-4 w-4 text-cyan-400" />

                    <p className="text-sm leading-relaxed text-white/50">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* STICKY INSIGHTS */}
            <StickyInsight
              variant="cyan"
              title="Recovered Fragment"
              content="AI restoration enhanced degraded narrative footage from archive cluster 09."
            />

            <StickyInsight
              variant="purple"
              title="Timeline Drift"
              content="Contradictory versions of historical broadcasts detected across mirrored nodes."
            />
          </aside>

          {/* CENTER */}
          <section className="col-span-12 space-y-10 xl:col-span-6">
            {/* HERO CARD */}
            <GenericObsidianStoryCard
              genre="Recovered Intelligence"
              date="May 18, 2026"
              headline="THE MEMORY WAR: HOW MEDIA SYSTEMS REWROTE PUBLIC REALITY"
              description="A classified reconstruction of coordinated emotional influence systems operating beneath modern recommendation architectures."
              sourceCount={28}
              status="Restricted"
              imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
            />

            {/* SHORT STORIES */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {archiveStories.map((story) => (
                <GenericShortStoryCard
                  key={story.id}
                  badge={story.badge}
                  id={story.id}
                  headline={story.headline}
                  description={story.description}
                  imageUrl={story.imageUrl}
                />
              ))}
            </div>

            {/* LIST STORIES */}
            <div className="space-y-8">
              <GenericCompactListCard
                category="Historical Reconstruction"
                sourceCount={14}
                headline="Leaked Research Shows Emotional AI Training Began Decades Earlier Than Publicly Claimed"
                description="Recovered datasets suggest behavioral reinforcement systems were integrated into commercial platforms long before regulation."
                imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600"
              />

              <GenericCompactListCard
                category="Neural Archives"
                sourceCount={22}
                headline="Cross-Platform Memory Synchronization Triggered Identical Public Reactions"
                description="Archived recommendation maps reveal synchronized emotional amplification cycles."
                imageUrl="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600"
              />
            </div>

            {/* MASSIVE TERMINAL */}
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
            </div>
          </section>

          {/* RIGHT */}
          <aside className="col-span-12 space-y-8 xl:col-span-3">
            {/* HEADLINES */}
            <HeadlineCard
              title="Recovered Headlines"
              data={headlineData}
              onActionClick={() => console.log("archive")}
            />

            {/* FILE STACK */}
            <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center gap-4">
                <FileStack className="h-6 w-6 text-cyan-400" />

                <div>
                  <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                    FILE STACK
                  </p>

                  <h4 className="mt-2 text-3xl font-black uppercase">
                    Active Vaults
                  </h4>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  "Synthetic Consensus Files",
                  "Emotional Mapping Reports",
                  "Quantum Drift Archives",
                  "Suppressed Broadcast Fragments",
                  "AI Influence Research",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <span className="text-sm text-white/50 transition-colors group-hover:text-white">
                      {item}
                    </span>

                    <ChevronRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* SECURITY */}
            <div className="rounded-[40px] border border-cyan-500/20 bg-cyan-500/5 p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                    SECURITY LAYER
                  </p>

                  <h3 className="mt-3 text-3xl font-black uppercase">
                    Identity Shield
                  </h3>
                </div>

                <Shield className="h-7 w-7 text-cyan-400" />
              </div>

              <p className="text-sm leading-relaxed text-white/50">
                Accessing restricted archive zones triggers autonomous masking
                protocols and identity fragmentation systems.
              </p>

              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-500/30 bg-black/30 py-4 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase transition-all hover:bg-cyan-500/10">
                Initialize Masking
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </section>
      </main>

      {/* BOTTOM LINE */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </div>
  );
}
