"use client";

import Link from "next/link";
import {
  Activity,
  Fingerprint,
  Globe,
  Shield,
  ChevronRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#02040A]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.04]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-14">
        {/* TOP */}
        <div className="grid gap-12 border-white/10 md:grid-cols-2 xl:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="The Prism"
                className="h-14 w-14 object-contain"
              />

              <div>
                <h2 className="text-2xl font-black uppercase">The Prism</h2>

                <p className="text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
                  Narrative Intelligence
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
              Autonomous intelligence systems tracking narrative divergence,
              emotional steering, synthetic amplification, and global
              information drift.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              Navigation
            </h3>

            <div className="space-y-4">
              {[
                ["Stories", "/stories"],
                ["Explore", "/explore"],
                ["Narrative Split", "/narrative-split"],
                ["Archive", "/archive"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="group flex items-center justify-between border-b border-white/5 pb-3 text-sm text-white/50 transition-all hover:text-cyan-400"
                >
                  {name}

                  <ChevronRight className="h-4 w-4 opacity-20 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div>
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              System Status
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: Activity,
                  label: "Deep Scan",
                  value: "ACTIVE",
                  color: "text-cyan-400",
                },
                {
                  icon: Globe,
                  label: "Global Nodes",
                  value: "142",
                  color: "text-white",
                },
                {
                  icon: Shield,
                  label: "Threat Level",
                  value: "HIGH",
                  color: "text-red-400",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-cyan-400" />

                    <span className="text-sm text-white/50">{item.label}</span>
                  </div>

                  <span
                    className={`text-xs font-black tracking-[0.2em] uppercase ${item.color}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              Network
            </h3>

            <div className="space-y-4">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Contact", "/contact"],
                ["AI Disclosure", "/ai-disclosure"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="block border-b border-white/5 pb-3 text-sm text-white/50 transition-colors hover:text-cyan-400"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-cyan-400/70 shadow-[0_0_20px_#22d3ee]" />
    </footer>
  );
}
