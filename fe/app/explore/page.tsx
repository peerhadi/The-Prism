"use client"

import * as React from "react"
import { Atom, Sparkles, Mic2, ShieldCheck, Globe } from "lucide-react"
import { AnomalyCard } from "../components/AnomalyCard"

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
]

export default function ExploreForensics() {
  return (
    <div className="relative min-h-screen bg-[#02050a] font-sans text-white selection:bg-cyan-500/30">
      <main className="mx-auto max-w-[1920px] px-6 py-12">
        {/* --- SECTION LABEL --- */}
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">
              Curated Anomalies
            </p>
            <h2 className="text-5xl font-black tracking-tighter uppercase">
              Interest <span className="text-white/20">Nodes</span>
            </h2>
          </div>
          <p className="max-w-md text-right text-[12px] leading-relaxed font-medium text-white/40 italic">
            These topics represent linguistic and narrative outliers that fall
            outside the standard viral distribution curve.
          </p>
        </div>

        {/* --- GRID OF STORIES --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic) => (
            <AnomalyCard key={topic.id} {...topic} />
          ))}
        </div>

        {/* --- SECONDARY EXPLORE LIST --- */}
        <section className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-1">
            <div className="flex items-center gap-4">
              <Atom size={24} className="text-cyan-400" />
              <h4 className="text-xl font-black tracking-tighter uppercase">
                Static Clusters
              </h4>
            </div>
            <div className="space-y-4">
              {[
                "Atmospheric Harvesting",
                "P2P Silo Effects",
                "Post-Viral Fatigue Syndrome",
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex cursor-pointer items-center justify-between border-b border-white/5 pb-4"
                >
                  <span className="text-[13px] font-bold tracking-tight text-white/40 uppercase group-hover:text-white">
                    {item}
                  </span>
                  <Globe
                    size={14}
                    className="text-white/10 group-hover:text-cyan-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-6 border border-cyan-500/20 bg-cyan-500/5 p-8">
              <Sparkles size={32} className="text-cyan-400" />
              <h4 className="text-2xl font-black tracking-tighter uppercase italic">
                Submit Anomaly
              </h4>
              <p className="text-[14px] leading-relaxed text-white/60">
                Found a narrative thread? Submit findings for ingestion.
              </p>
              <button className="w-full bg-cyan-400 py-4 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-all hover:bg-white">
                Open Uplink
              </button>
            </div>

            <div className="relative space-y-6 overflow-hidden border border-white/5 bg-[#0a1018] p-8">
              <Mic2 size={32} className="text-white/20" />
              <h4 className="text-2xl font-black tracking-tighter uppercase">
                Audio Ingestion
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[2, 4, 6, 3, 8, 4, 2].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-cyan-400"
                      style={{ height: `${h * 2}px` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                  Live Monitoring...
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between opacity-30">
          <div className="flex items-center gap-4 text-[9px] font-black tracking-[0.5em] uppercase">
            <ShieldCheck size={14} /> Identity Shield Active
          </div>
          <p className="text-[9px] font-black tracking-[0.5em] uppercase">
            The Prism // Exploration Mode
          </p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
    </div>
  )
}
