"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  BrainCircuit,
  Globe,
  Palette,
  Radar,
  Shield,
  Sparkles,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CyberCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            Configuration Module
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
        </div>
      </div>

      {children}
    </div>
  );
}

function SettingRow({
  title,
  description,
  defaultChecked = true,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-cyan-500/20">
      <div>
        <p className="font-semibold">{title}</p>

        <p className="mt-1 text-sm text-white/40">{description}</p>
      </div>

      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

export default function SettingsPage() {
  const [topics, setTopics] = useState(["Technology", "AI", "Cybersecurity"]);

  const availableTopics = [
    "Technology",
    "AI",
    "Cybersecurity",
    "Politics",
    "Business",
    "World",
    "Science",
    "Culture",
  ];

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

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

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* HEADER */}

        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[100px]" />

            <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              <Activity className="h-3 w-3 animate-pulse" />
              System Configuration
            </div>

            <h1 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">
              <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-800 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-white/50">
              Configure visual systems, narrative balancing, intelligence feeds,
              alerts, and experimental analysis engines.
            </p>
          </div>
        </section>

        {/* CONTENT */}

        <div className="mt-10 space-y-8">
          {/* VISUAL */}

          <CyberCard title="Visual Engine" icon={Palette}>
            <div className="space-y-4">
              <SettingRow
                title="Deep View"
                description="Enable immersive Prism interface."
              />

              <SettingRow
                title="Motion Effects"
                description="Allow transitions and animations."
              />

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold">Glow Intensity</p>

                  <span className="text-sm text-cyan-400">75%</span>
                </div>

                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </div>
          </CyberCard>

          {/* NARRATIVE */}

          <CyberCard title="Narrative Matrix" icon={Shield}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="mb-4 flex items-center justify-between text-xs font-black tracking-[0.2em] uppercase">
                  <span className="text-cyan-400">Balanced</span>

                  <span className="text-purple-400">Strong Contrasts</span>
                </div>

                <Slider defaultValue={[65]} max={100} step={1} />
              </div>

              <SettingRow
                title="Highlight Conflicts"
                description="Surface competing narratives and framing differences."
              />

              <SettingRow
                title="Detect Bias Patterns"
                description="Identify source-level bias trends."
              />

              <SettingRow
                title="Perspective Equalization"
                description="Avoid over-weighting dominant narratives."
              />
            </div>
          </CyberCard>

          {/* TOPICS */}

          <CyberCard title="Intelligence Interests" icon={Globe}>
            <div className="flex flex-wrap gap-3">
              {availableTopics.map((topic) => {
                const active = topics.includes(topic);

                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`rounded-full border px-5 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                      active
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.15)]"
                        : "border-white/10 bg-black/20 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </CyberCard>

          {/* SOURCES */}

          <CyberCard title="Intelligence Feeds" icon={BrainCircuit}>
            <div className="mb-6 flex gap-3">
              <Input
                placeholder="https://source-domain.com"
                className="h-12 rounded-xl border-white/10 bg-black/30"
              />

              <Button className="h-12 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400">
                Add
              </Button>
            </div>

            <div className="space-y-4">
              <SettingRow
                title="Reuters"
                description="Global intelligence reporting."
              />

              <SettingRow title="BBC" description="International coverage." />

              <SettingRow
                title="Associated Press"
                description="Wire reporting network."
              />

              <SettingRow
                title="Al Jazeera"
                description="Alternative geopolitical perspectives."
              />
            </div>
          </CyberCard>

          {/* ALERTS */}

          <CyberCard title="Alert Systems" icon={Bell}>
            <div className="space-y-4">
              <SettingRow
                title="Breaking Stories"
                description="Immediate notification for major events."
              />

              <SettingRow
                title="Daily Digest"
                description="Receive daily intelligence summaries."
              />

              <SettingRow
                title="Weekly Report"
                description="Comprehensive weekly narrative overview."
              />

              <SettingRow
                title="Narrative Divergence Alerts"
                description="Notify when sources strongly disagree."
              />
            </div>
          </CyberCard>

          {/* EXPERIMENTAL */}

          <CyberCard title="Experimental Systems" icon={Radar}>
            <div className="space-y-4">
              <SettingRow
                title="AI Summaries"
                description="Generate autonomous article summaries."
              />

              <SettingRow
                title="Narrative Clustering"
                description="Group stories by framing similarity."
              />

              <SettingRow
                title="Deep Analysis"
                description="Run advanced contextual comparisons."
              />

              <SettingRow
                title="Emerging Signal Detection"
                description="Detect unusual patterns before they trend."
              />
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-cyan-400" />

                <p className="font-semibold text-cyan-400">
                  Experimental Features Enabled
                </p>
              </div>

              <p className="mt-2 text-sm text-white/50">
                These systems may produce incomplete or evolving results as
                Prism continues learning.
              </p>
            </div>
          </CyberCard>
        </div>
      </main>
    </div>
  );
}
