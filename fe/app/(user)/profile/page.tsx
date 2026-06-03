"use client";

import {
  Activity,
  BarChart3,
  BrainCircuit,
  Edit3,
  Fingerprint,
  Globe,
  Mail,
  Radar,
  Shield,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 transition-all duration-300 hover:border-cyan-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
          {title}
        </p>

        <h3 className="mt-3 text-4xl font-black">{value}</h3>

        <p className="mt-2 text-sm text-white/40">{subtitle}</p>
      </div>
    </div>
  );
}

function FingerprintBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-white/80">{label}</span>

        <span className="text-cyan-400">{value}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        {/* HEADER */}

        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[100px]" />

            <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              <Activity className="h-3 w-3 animate-pulse" />
              User Dossier
            </div>

            <h1 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">
              <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-800 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-white/50">
              Analyze your narrative fingerprint, source diversity, media
              consumption patterns, and intelligence profile.
            </p>
          </div>
        </section>

        {/* IDENTITY */}

        <section className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
              <User className="h-5 w-5 text-cyan-400" />
            </div>

            <div>
              <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                Identity System
              </p>

              <h2 className="mt-1 text-2xl font-black">User Identity</h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* AVATAR */}

            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="flex h-52 w-52 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  <User className="h-24 w-24 text-cyan-400" />
                </div>

                <button className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 bg-black/80">
                  <Edit3 className="h-4 w-4 text-cyan-400" />
                </button>
              </div>

              <p className="mt-6 text-sm text-white/40">Upload profile image</p>
            </div>

            {/* DETAILS */}

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                  Username
                </label>

                <Input
                  defaultValue="prism_user"
                  className="h-12 rounded-xl border-white/10 bg-black/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                  Email
                </label>

                <Input
                  defaultValue="user@prism.app"
                  className="h-12 rounded-xl border-white/10 bg-black/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                  Bio
                </label>

                <Textarea
                  defaultValue="Researching narratives, analyzing information ecosystems, and exploring how media framing shapes public perception."
                  className="min-h-[120px] rounded-xl border-white/10 bg-black/30"
                />
              </div>

              <Button className="rounded-xl bg-cyan-500 text-black hover:bg-cyan-400">
                Save Profile
              </Button>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="mt-10">
          <div className="mb-6 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-cyan-400" />

            <h2 className="text-2xl font-black">Narrative Statistics</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Bias Score"
              value="42%"
              subtitle="Slightly balanced"
            />

            <StatCard
              title="Sources"
              value="31"
              subtitle="Active intelligence feeds"
            />

            <StatCard
              title="Diversity"
              value="86%"
              subtitle="High viewpoint spread"
            />

            <StatCard
              title="Extremity"
              value="22%"
              subtitle="Low ideological skew"
            />
          </div>
        </section>

        {/* FINGERPRINT */}

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center gap-4">
              <Fingerprint className="h-6 w-6 text-cyan-400" />

              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  Analysis Engine
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Narrative Fingerprint
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              <FingerprintBar label="Source Diversity" value={86} />

              <FingerprintBar label="Narrative Balance" value={71} />

              <FingerprintBar label="Source Distribution" value={78} />

              <FingerprintBar label="Cross-Perspective Reading" value={83} />

              <FingerprintBar label="Ideological Extremity" value={22} />
            </div>
          </div>

          {/* QUICK ANALYSIS */}

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center gap-4">
              <BrainCircuit className="h-6 w-6 text-purple-400" />

              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">
                  Intelligence Summary
                </p>

                <h2 className="mt-1 text-2xl font-black">Profile Analysis</h2>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-cyan-400" />

                  <span className="font-medium">Balanced Reader</span>
                </div>

                <p className="mt-2 text-sm text-white/50">
                  Consumes perspectives from multiple ideological positions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-cyan-400" />

                  <span className="font-medium">High Diversity</span>
                </div>

                <p className="mt-2 text-sm text-white/50">
                  Sources span multiple countries and editorial traditions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Radar className="h-4 w-4 text-cyan-400" />

                  <span className="font-medium">Low Extremity Risk</span>
                </div>

                <p className="mt-2 text-sm text-white/50">
                  Reading behavior shows strong exposure to competing
                  viewpoints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITY */}

        <section className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-cyan-400" />

            <div>
              <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                Consumption Analytics
              </p>

              <h2 className="mt-1 text-2xl font-black">Activity Overview</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Articles Read"
              value="2.4K"
              subtitle="Across all sources"
            />

            <StatCard
              title="Comparisons"
              value="481"
              subtitle="Narratives analyzed"
            />

            <StatCard
              title="Days Active"
              value="287"
              subtitle="Consistent engagement"
            />

            <StatCard
              title="Top Topic"
              value="AI"
              subtitle="Most consumed category"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
