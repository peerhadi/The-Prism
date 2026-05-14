"use client"
import StickyInsight from "../components/TickerCard"
import GenericShortStoryCard from "../components/SmallCard"
import GenericCompactListCard from "../components/ListCard"
import { HeadlineCard } from "../components/HeadlineCard"
import GenericObsidianStoryCard from "../components/HeroCard"
import { Globe, Activity, Target, Shield, Cpu } from "lucide-react"

export default function StoryIntelligencePage() {
  const topics = [
    { label: "All Streams", color: "border-white/20 text-white bg-white/10" },
    { label: "Energy Crisis", color: "border-cyan-500/50 text-cyan-400" },
    { label: "Neural Networks", color: "border-purple-500/50 text-purple-400" },
    { label: "Market Volatility", color: "border-red-500/50 text-red-400" },
    {
      label: "Deepfake Detection",
      color: "border-emerald-500/50 text-emerald-400",
    },
  ]

  const primaryHeadlines = [
    {
      tag: "Flash",
      time: "2m ago",
      title: "Divergence detected in EU energy reporting clusters.",
      variant: "cyan" as const,
    },
    {
      tag: "Deep",
      time: "14m ago",
      title: "Neural sync patterns indicate automated sentiment shift.",
      variant: "purple" as const,
    },
    {
      tag: "Urgent",
      time: "28m ago",
      title: "Volatility index hits 3-year high in tech sector nodes.",
      variant: "red" as const,
    },
  ]

  // Data for the integrated Hero Card
  const heroStory = {
    genre: "Tech & Divergence",
    date: "May 15, 2026",
    headline: "GLOBAL NARRATIVE SHIFT: THE IMPACT OF AUTOMATED AI ANALYTICS",
    description:
      "An exploration into how AI-driven analysis is reframing media narratives across global markets, uncovering hidden biases and emerging trends.",
    sourceCount: 25,
    status: "Urgent Analysis",
    imageUrl:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop",
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#040816] font-sans text-white selection:bg-cyan-500/30">
      <main className="mx-auto max-w-[1700px] px-8 py-16">
        {/* 1. NEON HEADER & CHIPS */}
        <header className="mb-20 flex w-full flex-col items-center">
          <h1 className="relative text-8xl leading-none font-black tracking-tighter uppercase italic md:text-[12rem]">
            <span className="bg-gradient-to-b from-white via-white to-cyan-900 bg-clip-text text-white">
              Stories
            </span>
          </h1>

          <div className="mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
            {topics.map((topic, idx) => (
              <button
                key={idx}
                className={`rounded-full border px-5 py-2.5 ${topic.color} flex items-center gap-2 bg-black/40 text-[11px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:bg-white/10 active:scale-95`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full bg-current ${idx === 0 ? "animate-pulse" : ""}`}
                />
                {topic.label}
              </button>
            ))}
          </div>
        </header>

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-12 gap-12">
          {/* LEFT: SIGNAL LOGS */}
          <aside className="col-span-12 xl:col-span-3">
            <div className="sticky top-12 space-y-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-[11px] font-black tracking-[0.4em] text-cyan-500 uppercase">
                  Signal Intel
                </h3>
                <Activity className="h-4 w-4 animate-pulse" />
              </div>
              <div className="space-y-6">
                <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-purple-400">
                    <Cpu className="h-3 w-3" /> NODE-09 ARCHIVE
                  </div>
                  <p className="text-xs leading-relaxed text-white/60">
                    Synthetic narrative detected in North American energy
                    sectors.
                  </p>
                </div>
                <StickyInsight
                  variant="cyan"
                  title="Logistics Node"
                  content="Regional shipping data points show a 12% divergence."
                />
                <StickyInsight
                  variant="amber"
                  title="Logistics Node"
                  content="Regional shipping data points show a 12% divergence."
                />
                <StickyInsight
                  variant="red"
                  title="Logistics Node"
                  content="Regional shipping data points show a 12% divergence."
                />
              </div>
            </div>
          </aside>

          {/* CENTER: HERO & FEED */}
          <section className="col-span-12 space-y-12 xl:col-span-6">
            {/* Integrated Hero Component */}
            <GenericObsidianStoryCard
              {...heroStory}
              onActionClick={() => console.log("Hero Action")}
            />

            <div className="space-y-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-[12px] font-black tracking-[0.4em] text-white/40 uppercase italic">
                  Live Stream
                </h2>
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <GenericShortStoryCard
                    badge="Signal"
                    id="DRFT-09"
                    headline="Quantum Encryption Standards Face Policy Deadlock"
                    description="National security agencies and tech giants diverge on mandatory migration timelines."
                    imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80"
                  />
                  <GenericShortStoryCard
                    badge="Market"
                    id="VOL-44"
                    headline="Crude Oil Metadata Spikes in Secondary Markets"
                    description="Unusual algorithmic trading patterns detected across global energy clusters."
                    imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80"
                  />
                </div>
                <GenericCompactListCard
                  category="Economics"
                  sourceCount={8}
                  headline="Decentralized Compute Scarcity Affecting Training Cycles"
                  description="Regional data centers report supply chain bottlenecks in high-density GPU sectors..."
                  imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80"
                />
                <GenericCompactListCard
                  category="Geopolitics"
                  sourceCount={14}
                  headline="Global Narrative Disparity Index Reaches Record High"
                  description="AI systems detect unprecedented levels of emotional divergence in trade reporting..."
                  imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80"
                />
              </div>
            </div>
          </section>

          {/* RIGHT: HEADLINES & ANALYTICS */}
          <aside className="col-span-12 space-y-10 xl:col-span-3">
            <HeadlineCard
              title="Top Headlines"
              data={primaryHeadlines}
              onActionClick={() => console.log("Loading archives...")}
            />
            <div className="space-y-8 rounded-[40px] border border-white/5 bg-black/20 p-8">
              <div className="flex justify-between text-[10px] font-black tracking-widest text-white/20 uppercase">
                <span>Volatility Index</span>
                <span className="text-purple-400">High Risk</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden bg-white/5">
                <div className="h-full w-[74%] animate-pulse bg-purple-500" />
              </div>
            </div>

            <StickyInsight
              variant="cyan"
              title="Logistics Node"
              content="Regional shipping data points show a 12% divergence."
            />
            <StickyInsight
              variant="red"
              title="Logistics Node"
              content="Regional shipping data points show a 12% divergence."
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
