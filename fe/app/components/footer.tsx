"use client";

import Link from "next/link";
import { Activity, Globe, Shield, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[var(--primary-soft)] blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.04]">
          <div className="h-full w-full bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-14">
        {/* TOP */}
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="The Prism"
                className="h-14 w-14 object-contain"
              />

              <div>
                <h2 className="text-2xl font-black uppercase text-[var(--text-primary)]">
                  The Prism
                </h2>

                <p className="text-[10px] tracking-[0.3em] text-[var(--primary)] uppercase">
                  Narrative Intelligence
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              Autonomous intelligence systems tracking narrative divergence,
              emotional steering, synthetic amplification, and global
              information drift.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
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
                  className="group flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-sm text-[var(--text-secondary)] transition-all hover:text-[var(--primary)]"
                >
                  {name}

                  <ChevronRight className="h-4 w-4 opacity-20 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div>
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
              System Status
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: Activity,
                  label: "Deep Scan",
                  value: "ACTIVE",
                  color: "text-[var(--success)]",
                },
                {
                  icon: Globe,
                  label: "Global Nodes",
                  value: "142",
                  color: "text-[var(--text-primary)]",
                },
                {
                  icon: Shield,
                  label: "Threat Level",
                  value: "HIGH",
                  color: "text-[var(--danger)]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-[var(--primary)]" />

                    <span className="text-sm text-[var(--text-secondary)]">
                      {item.label}
                    </span>
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
            <h3 className="mb-5 text-[11px] font-black tracking-[0.3em] text-[var(--primary)] uppercase">
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
                  className="block border-b border-[var(--border-subtle)] pb-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]" />
    </footer>
  );
}
