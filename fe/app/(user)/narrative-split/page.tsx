"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioWaveform,
  Binary,
  Brain,
  ChevronDown,
  Eye,
  Flame,
  Globe,
  Radar,
  ShieldAlert,
  Split,
  Waves,
} from "lucide-react";
import { PrismLoader } from "@/app/components/loadingScreen";
const IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600",

  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600",

  "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600",

  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600",
];
function SplitSection({ event }: { event: any }) {
  return (
    <section className="relative min-h-screen overflow-hidden border-y border-white/5">
      {/* CENTER DIVIDER */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-30 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent lg:block">
        <div className="absolute top-1/2 left-1/2 h-40 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400 shadow-[0_0_30px_#22d3ee]" />
      </div>

      {/* SPLIT LABEL */}
      <div className="absolute top-10 left-1/2 z-40 hidden -translate-x-1/2 lg:flex">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">
          <Split className="h-4 w-4 text-cyan-400" />
          <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase">
            NARRATIVE FRACTURE
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="group relative flex min-h-screen items-end overflow-hidden bg-[#020812]">
          {/* IMAGE */}
          <img
            src={event.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
          />

          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-[#020812]/70 to-[#020812]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />

          {/* CONTENT */}
          <div className="relative z-20 w-full p-10 md:p-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">
                VERIFIED NARRATIVE
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[0.95] font-black tracking-tighter uppercase">
              {event.neutral.title}
            </h2>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/50 break-words">
              {event.neutral.description}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button className="group/button flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-7 py-4 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase transition-all hover:scale-105 hover:bg-cyan-500/20">
                VIEW OFFICIAL FEED
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </button>

              <div className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
                TRUST INDEX 84%
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="group relative flex min-h-screen items-end overflow-hidden bg-[#090202]">
          {/* IMAGE */}
          <img
            src={event.imageUrl}
            alt={event.extreme.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-70 group-hover:grayscale-0"
          />

          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-bl from-red-500/20 via-[#090202]/70 to-[#090202]" />

          {/* NOISE */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-screen">
            <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
          </div>

          {/* CONTENT */}
          <div className="relative z-20 w-full p-10 md:p-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="text-[10px] font-black tracking-[0.4em] text-red-400 uppercase">
                EXTREME NARRATIVE
              </span>
            </div>

            <h2 className="max-w-2xl text-5xl leading-[0.95] font-black tracking-tighter uppercase md:text-7xl">
              {event.extreme.title}{" "}
            </h2>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/50 break-words">
              {event.extreme.description}
            </p>

            <div className="mt-12 flex items-center gap-5">
              <button className="group/button flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-7 py-4 text-[10px] font-black tracking-[0.35em] text-red-400 uppercase transition-all hover:scale-105 hover:bg-red-500/20">
                VIEW LEAKED FEED
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </button>

              <div className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
                CONFLICT INDEX 91%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NarrativeSplitPage() {
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/perspectives")
      .then((res) => res.json())

      .then((data) =>
        setEvents(
          data
            .map((event: any, index: number) => ({
              ...event,
            }))
            .filter((x) => !!x.neutral.title && !!x.extreme.title)
            .reverse()
            .slice(0, 4),
        ),
      );
  }, []);
  if (!events.length) return <PrismLoader />;
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* GLOBAL BG */}
      <div className="pointer-events-none fixed inset-0">
        {/* CYAN */}
        <div className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />

        {/* RED */}
        <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-red-500/10 blur-[180px]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:90px_90px]" />
        </div>
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-white/5">
        {/* LEFT GLOW */}
        <div className="absolute left-0 top-0 h-full w-1/2 bg-cyan-500/5" />

        {/* RIGHT GLOW */}
        <div className="absolute right-0 top-0 h-full w-1/2 bg-red-500/5" />

        {/* CENTER DIVIDER */}
        <div className="absolute left-1/2 top-0 z-20 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block">
          <div className="absolute top-1/2 left-1/2 h-40 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400 shadow-[0_0_40px_#22d3ee]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-20 mx-auto grid w-full max-w-[1800px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {/* LEFT */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-16 lg:px-20">
            <div className="mb-6 flex items-center gap-3">
              <Radar className="h-5 w-5 text-cyan-400" />

              <span className="text-[11px] font-black tracking-[0.5em] text-cyan-400 uppercase">
                OFFICIAL REALITY
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] leading-[0.9] font-black tracking-tight uppercase break-words">
              CONTROL
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
              Institutional systems maintain order through synchronized media,
              strategic framing, and algorithmic narrative stabilization.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start justify-center px-6 py-16 sm:px-10 md:px-16 lg:px-20 text-left lg:items-end lg:text-right">
            <div className="mb-6 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-red-400" />

              <span className="text-[11px] font-black tracking-[0.5em] text-red-400 uppercase">
                SHADOW REALITY
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[9rem] leading-[0.9] font-black tracking-tight uppercase break-words">
              CHAOS
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
              Independent leaks expose fragmented truths hidden beneath
              synchronized institutional consensus systems.
            </p>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
            SCROLL TO COMPARE
          </span>

          <ChevronDown className="h-5 w-5 animate-bounce text-cyan-400" />
        </div>
      </section>

      {/* SPLIT EVENTS */}
      {events.map((event) => (
        <SplitSection key={event.id} event={event} />
      ))}

      {/* FINAL COLLISION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-t border-white/5">
        {/* BG */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-cyan-500/10 blur-[120px]" />

          <div className="absolute right-0 top-0 h-full w-1/2 bg-red-500/10 blur-[120px]" />
        </div>

        {/* CENTER */}
        <div className="relative z-20 max-w-5xl px-8 text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <Brain className="h-8 w-8 text-cyan-400" />
            <AudioWaveform className="h-8 w-8 text-red-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
            WHICH
            <br />
            REALITY
            <br />
            SURVIVES?
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-white/40">
            Every system produces a narrative. Every narrative produces a
            population. The fracture begins when two incompatible realities
            attempt to occupy the same world.
          </p>

          <button className="mt-14 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-[10px] font-black tracking-[0.4em] text-white uppercase transition-all hover:scale-105 hover:border-cyan-500/30 hover:bg-cyan-500/10">
            ENTER DEEP COMPARISON
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* BOTTOM BEAM */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-1/2 bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

      <div className="fixed bottom-0 right-0 z-50 h-[2px] w-1/2 bg-red-500 shadow-[0_0_20px_#ef4444]" />
    </div>
  );
}
