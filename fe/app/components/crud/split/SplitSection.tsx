"use client";

import { ArrowRight, Split } from "lucide-react";

export default function SplitSection({ event }: { event: any }) {
  return (
    <section className="relative min-h-screen overflow-hidden border-y border-white/5">
      {/* LABEL */}
      <div className="absolute top-10 left-1/2 hidden -translate-x-1/2 lg:flex">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">
          <Split className="h-4 w-4 text-cyan-400" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase">
            NARRATIVE FRACTURE
          </span>
        </div>
      </div>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="group relative flex items-end bg-[#020812] overflow-hidden">
          <img
            src={event.imageUrl}
            className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-[#020812]/70 to-[#020812]" />

          <div className="relative z-10 p-10 md:p-20">
            <div className="mb-6 flex items-center gap-2 text-cyan-400 text-[10px] uppercase tracking-[0.4em]">
              VERIFIED NARRATIVE
            </div>

            <h2 className="text-3xl md:text-6xl font-black uppercase">
              {event.neutral.title}
            </h2>

            <p className="mt-6 text-white/50">{event.neutral.description}</p>

            <button className="mt-10 flex items-center gap-3 text-cyan-400 uppercase text-[10px] tracking-[0.3em]">
              VIEW OFFICIAL FEED <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="group relative flex items-end bg-[#090202] overflow-hidden">
          <img
            src={event.imageUrl}
            className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all"
          />

          <div className="absolute inset-0 bg-gradient-to-bl from-red-500/20 via-[#090202]/70 to-[#090202]" />

          <div className="relative z-10 p-10 md:p-20">
            <div className="mb-6 text-red-400 text-[10px] uppercase tracking-[0.4em]">
              EXTREME NARRATIVE
            </div>

            <h2 className="text-3xl md:text-6xl font-black uppercase">
              {event.extreme.title}
            </h2>

            <p className="mt-6 text-white/50">{event.extreme.description}</p>

            <button className="mt-10 flex items-center gap-3 text-red-400 uppercase text-[10px] tracking-[0.3em]">
              VIEW LEAKED FEED <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
