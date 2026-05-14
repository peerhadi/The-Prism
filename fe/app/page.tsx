"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Zap,
  BarChart3,
  Activity,
  Terminal,
  ShieldCheck,
  Search,
  Cpu,
  Layers,
  Maximize,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02050a] font-sans text-white selection:bg-cyan-500/30">
      {/* --- CLEAN BACKGROUND ARCHITECTURE --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#0e2a35_0%,_transparent_50%)] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <main className="relative z-10 flex flex-col">
        {/* --- HERO SECTION --- */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="relative">
            <h1 className="text-7xl leading-[0.82] font-black tracking-tighter sm:text-9xl md:text-[140px] lg:text-[170px]">
              MAP THE
              <br />
              <span className="bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-600 bg-clip-text text-transparent italic">
                NARRATIVE
              </span>
            </h1>
          </div>

          <p className="mt-12 max-w-3xl text-xl font-light tracking-wide text-cyan-100/60 md:text-2xl">
            Neutralizing media bias through computational linguistics. We
            deconstruct propaganda to reveal the raw signal within global
            information streams.
          </p>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <Link href="/signup">
              <Button className="h-[75px] rounded-none border-2 border-cyan-400 bg-cyan-400 px-16 text-[16px] font-black tracking-[0.4em] text-black uppercase shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all hover:border-white hover:bg-white">
                Initialize
              </Button>
            </Link>
            <Link href="/stories">
              <Button
                variant="outline"
                className="h-[75px] rounded-none border-2 border-white/10 bg-transparent px-16 text-[14px] font-black tracking-[0.4em] uppercase hover:border-cyan-400 hover:text-cyan-400"
              >
                Live Stories
              </Button>
            </Link>
          </div>
        </section>

        {/* --- CORE METRICS BAND --- */}
        <section className="grid w-full grid-cols-1 border-y border-cyan-500/10 bg-black/60 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "ACCURACY", value: "99.8%", icon: <Search size={20} /> },
            { label: "SOURCES", value: "14,209", icon: <Layers size={20} /> },
            {
              label: "ANALYSIS",
              value: "REAL-TIME",
              icon: <Terminal size={20} />,
            },
            {
              label: "THREATS",
              value: "MITIGATED",
              icon: <ShieldCheck size={20} />,
            },
            { label: "UPTIME", value: "99.99%", icon: <Activity size={20} /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex items-center gap-6 border-x border-cyan-500/5 p-12 transition-all hover:bg-cyan-500/5"
            >
              <div className="text-cyan-400 opacity-40 transition-all group-hover:opacity-100">
                {stat.icon}
              </div>
              <div>
                <div className="mb-1 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
                  {stat.label}
                </div>
                <div className="text-4xl font-black tracking-tight text-white">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --- FEATURE DEEP-DIVE --- */}
        <section className="relative border-b border-cyan-500/10 bg-[#03070e] px-6 py-40">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mx-auto mb-24 max-w-3xl text-center">
              <h2 className="mb-6 text-5xl leading-tight font-black tracking-tight uppercase md:text-6xl">
                DECONSTRUCTING <span className="text-cyan-400">INFLUENCE</span>
              </h2>
              <div className="mx-auto h-1 w-24 bg-cyan-400 shadow-[0_0:10px_#22d3ee]" />
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Cpu />,
                  title: "Forensic NLP",
                  desc: "Deconstruct sentence structures to expose emotional manipulation and persuasive triggers.",
                },
                {
                  icon: <BarChart3 />,
                  title: "Bias Heatmaps",
                  desc: "Visualize the political and corporate lean of global news cycles with analytical precision.",
                },
                {
                  icon: <Zap />,
                  title: "Echo Chamber Detection",
                  desc: "Identify closed-loop information cycles before they propagate into widespread misinformation.",
                },
                {
                  icon: <Maximize />,
                  title: "Geopolitical Cross-Ref",
                  desc: "Compare reporting disparities across different languages and geographic regions instantly.",
                },
                {
                  icon: <Globe />,
                  title: "Source Pedigree",
                  desc: "Trace claim origins back to primary sources to identify ghostwritten or state-sponsored content.",
                },
                {
                  icon: <ShieldCheck />,
                  title: "Data Purity Protocol",
                  desc: "A logic-driven interface designed to neutralize predictive algorithms and engagement loops.",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[20px] border border-cyan-500/10 bg-white/[0.01] p-10 transition-all hover:border-cyan-400 hover:bg-white/[0.03]"
                >
                  <div className="mb-8 inline-block rounded-lg border border-cyan-500/20 p-4 text-cyan-400 transition-all group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                    {feat.icon}
                  </div>
                  <h3 className="mb-5 text-2xl font-black tracking-wider text-white uppercase group-hover:text-cyan-200">
                    {feat.title}
                  </h3>
                  <p className="text-base leading-relaxed text-cyan-100/60 group-hover:text-white">
                    {feat.desc}
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MANIFESTO SECTION --- */}
        <section className="relative flex flex-col items-center justify-center border-b border-cyan-500/10 bg-cyan-950/10 px-10 py-40 text-center">
          <p className="max-w-6xl text-3xl leading-tight font-black tracking-tight text-white md:text-5xl lg:text-7xl">
            IN A WORLD OF <br />
            <span className="text-white/20">MANIPULATED NARRATIVES,</span>
            <br />
            <span className="font-extrabold text-cyan-400">
              TRANSPARENCY
            </span>{" "}
            IS
            <br />
            THE ONLY REBELLION.
          </p>
          <p className="mt-12 max-w-2xl text-xl leading-relaxed font-light text-cyan-100/60">
            The Prism is a computational filter. We remove the triggers and
            reveal the mathematical structures of influence.
          </p>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="relative overflow-hidden px-6 py-60 text-center">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 opacity-70 blur-[150px]" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <h2 className="mb-12 text-6xl leading-none font-black uppercase md:text-8xl lg:text-[110px]">
              DECODE YOUR <br /> <span className="text-cyan-400">REALITY.</span>
            </h2>
            <Link href="/signup">
              <Button className="group relative h-[100px] w-full max-w-lg overflow-hidden rounded-none border-2 border-cyan-400 bg-transparent text-[20px] font-black tracking-[0.6em] text-cyan-400 uppercase transition-all duration-300 hover:text-black">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 z-0 translate-y-full bg-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* --- FOOTER ACCENT --- */}
      <div className="fixed bottom-0 left-0 z-50 h-[4px] w-full bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.9)]" />
    </div>
  )
}
