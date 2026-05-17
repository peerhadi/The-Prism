"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Zap,
  BarChart3,
  ShieldCheck,
  Cpu,
  Layers,
  Maximize,
  ChevronRight,
  Radar,
  Orbit,
  ScanLine,
  Waves,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050a] font-sans text-white selection:bg-cyan-500/30">
      {/* ================================================= */}
      {/* GLOBAL BACKGROUND SYSTEM */}
      {/* ================================================= */}

      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[#02050a]" />

        {/* Atmosphere */}
        <div className="absolute -top-[25%] left-[10%] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[180px]" />
        <div className="absolute top-[45%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-500/10 blur-[200px]" />
        <div className="absolute bottom-[-20%] left-[35%] h-[700px] w-[700px] rounded-full bg-cyan-400/5 blur-[170px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

        {/* Vertical beams */}
        <div className="absolute top-0 left-[20%] h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute top-0 right-[18%] h-full w-px bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute top-[20%] left-[12%] h-72 w-72 rounded-full border border-cyan-400/10 bg-cyan-400/5 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
          className="absolute right-[10%] bottom-[10%] h-96 w-96 rounded-full border border-cyan-400/10 bg-blue-500/5 blur-3xl"
        />

        {/* Scanning line */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/[0.03] to-transparent"
        />
      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <main className="relative z-10 flex flex-col">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 text-center">
          {/* Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[900px] w-[900px] rounded-full border border-cyan-400/5" />
            <div className="absolute h-[650px] w-[650px] rounded-full border border-cyan-400/10" />
            <div className="absolute h-[400px] w-[400px] rounded-full border border-cyan-400/10" />
          </div>

          {/* Side labels */}
          <div className="absolute left-10 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] text-xs font-black tracking-[0.6em] text-cyan-400/40 lg:block">
            INFORMATION REFRACTION SYSTEM
          </div>

          <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 rotate-90 text-xs font-black tracking-[0.6em] text-cyan-400/40 lg:block">
            REAL-TIME SPECTRUM ANALYSIS
          </div>

          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <span className="text-[11px] font-black tracking-[0.45em] text-cyan-200 uppercase">
              Optical Intelligence Interface
            </span>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <h1 className="text-7xl leading-[0.78] font-black tracking-[-0.08em] sm:text-9xl md:text-[150px] lg:text-[210px]">
              REFRACT
              <br />
              <span className="bg-gradient-to-b from-cyan-100 via-cyan-400 to-cyan-700 bg-clip-text text-transparent italic">
                THE SIGNAL
              </span>
            </h1>

            {/* Horizontal flare */}
            <div className="absolute top-1/2 left-1/2 h-px w-[1200px] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 max-w-4xl text-lg leading-relaxed font-light tracking-wide text-cyan-100/60 md:text-2xl"
          >
            Information enters distorted. The Prism isolates the hidden spectrum
            beneath global information systems, exposing framing, emotional
            manipulation, and coordinated signal interference.
          </motion.p>

          {/* CTA */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <Link href="/signup">
              <Button className="group relative h-[80px] overflow-hidden rounded-none border border-cyan-400 bg-cyan-400 px-16 text-[15px] font-black tracking-[0.5em] text-black uppercase shadow-[0_0_60px_rgba(34,211,238,0.45)] transition-all hover:scale-[1.03] hover:bg-white">
                <span className="relative z-10">ENTER THE PRISM</span>
              </Button>
            </Link>

            <Link href="/stories">
              <Button
                variant="outline"
                className="group h-[80px] rounded-none border border-white/10 bg-white/[0.02] px-16 text-[14px] font-black tracking-[0.45em] uppercase backdrop-blur-xl transition-all hover:border-cyan-400 hover:bg-cyan-400/5 hover:text-cyan-300"
              >
                <span>Active Signals</span>
                <ChevronRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="mt-24 grid w-full max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              {
                label: "Signal Distortions",
                value: "18.4M",
                icon: <Radar size={18} />,
              },
              {
                label: "Spectrum Clusters",
                value: "2,091",
                icon: <Orbit size={18} />,
              },
              {
                label: "Signal Sources",
                value: "14,209",
                icon: <Layers size={18} />,
              },
              {
                label: "Live Refraction",
                value: "Realtime",
                icon: <ScanLine size={18} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-cyan-500/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
              >
                <div className="mb-4 flex items-center gap-3 text-cyan-400">
                  {item.icon}
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-100/40">
                    {item.label}
                  </span>
                </div>

                <div className="text-4xl font-black tracking-tight">
                  {item.value}
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ================================================= */}
        {/* MODULES */}
        {/* ================================================= */}

        <section className="relative border-y border-cyan-500/10 bg-black/40 px-6 py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-24 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-sm font-black tracking-[0.5em] text-cyan-400 uppercase">
                  PRISM MODULES
                </p>

                <h2 className="max-w-4xl text-5xl leading-none font-black tracking-tight uppercase md:text-7xl">
                  SPECTRUM
                  <br />
                  <span className="text-cyan-400">ANALYSIS SYSTEMS</span>
                </h2>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-cyan-100/50">
                Computational optics for modern information ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  icon: <Cpu />,
                  title: "Signal Decomposition",
                  desc: "Break language structures into measurable emotional and persuasive frequencies.",
                },
                {
                  icon: <BarChart3 />,
                  title: "Spectrum Mapping",
                  desc: "Visualize ideological spread and systemic polarization patterns in real time.",
                },
                {
                  icon: <Zap />,
                  title: "Resonance Detection",
                  desc: "Identify recursive amplification loops inside closed information ecosystems.",
                },
                {
                  icon: <Maximize />,
                  title: "Refraction Comparison",
                  desc: "Compare how identical events bend differently across regional information systems.",
                },
                {
                  icon: <Globe />,
                  title: "Signal Origin",
                  desc: "Trace information pathways back to their earliest identifiable propagation points.",
                },
                {
                  icon: <ShieldCheck />,
                  title: "Optical Filtering",
                  desc: "Suppress engagement distortion layers to isolate the raw informational spectrum.",
                },
              ].map((feat, i) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={i}
                  className="group relative overflow-hidden border border-cyan-500/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 backdrop-blur-xl transition-all hover:border-cyan-400/30"
                >
                  {/* Glow */}
                  <div className="absolute -top-20 right-[-30px] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="mb-10 inline-flex rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-cyan-400">
                    {feat.icon}
                  </div>

                  <h3 className="mb-5 text-3xl font-black uppercase">
                    {feat.title}
                  </h3>

                  <p className="leading-relaxed text-cyan-100/60">
                    {feat.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* MANIFESTO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden border-b border-cyan-500/10 px-6 py-52 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="text-4xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-[110px]">
              EVERY SIGNAL
              <br />
              <span className="text-white/15">CARRIES DISTORTION.</span>
              <br />
              <span className="text-cyan-400">THE PRISM REVEALS</span>
              <br />
              THE SPECTRUM.
            </p>

            <p className="mx-auto mt-14 max-w-3xl text-xl leading-relaxed text-cyan-100/55">
              The Prism transforms information consumption into signal analysis,
              exposing the hidden structures beneath modern media systems.
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* FINAL CTA */}
        {/* ================================================= */}

        <section className="relative overflow-hidden px-6 py-60 text-center">
          <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <h2 className="text-6xl leading-none font-black tracking-tight uppercase md:text-8xl lg:text-[120px]">
              SEE THROUGH
              <br />
              <span className="text-cyan-400">DISTORTION.</span>
            </h2>

            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-cyan-100/55">
              Enter the optical layer beneath modern information systems.
            </p>

            <div className="mt-16 flex justify-center">
              <Link href="/signup">
                <Button className="group relative h-[100px] overflow-hidden rounded-none border border-cyan-400 bg-transparent px-20 text-[18px] font-black tracking-[0.55em] text-cyan-400 uppercase transition-all hover:text-black">
                  <span className="relative z-10">BEGIN REFRACTION</span>

                  <div className="absolute inset-0 translate-y-full bg-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom light */}
      <div className="fixed bottom-0 left-0 z-50 h-[3px] w-full bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.9)]" />
    </div>
  );
}
