"use client";

import React, { useState } from "react";
import {
  Bot,
  Cpu,
  Activity,
  Orbit,
  Sparkles,
  Zap,
  Radar,
  BrainCircuit,
  Send,
  Waves,
} from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

export default function NeuralAIConsole() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Neural mesh online. All cognitive layers synchronized. Ask anything across live signal space.",
    },
  ]);

  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const user: Msg = { role: "user", text: input };

    const ai: Msg = {
      role: "ai",
      text: "Processing distributed inference layers... correlation spikes detected across semantic nodes. Confidence recalibrated in real-time.",
    };

    setMessages((m) => [...m, user, ai]);
    setInput("");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[#02030a] text-white">
      {/* ================= BACKGROUND SYSTEM ================= */}
      <div className="absolute inset-0">
        {/* deep glow field */}
        <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] bg-cyan-500/10 blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] bg-purple-500/10 blur-[200px] animate-pulse" />

        {/* scan grid */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:70px_70px]" />
        </div>

        {/* moving scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.03)_100%)] bg-[size:100%_6px] animate-pulse" />

        {/* floating noise layer */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 grid h-full grid-cols-12 gap-6 p-10">
        {/* LEFT CONTROL CORE */}
        <aside className="col-span-3 flex flex-col gap-6">
          {/* SYSTEM STATUS CORE */}
          <div className="rounded-[28px] border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10 blur-2xl opacity-40 animate-pulse" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-cyan-400 uppercase">
                  Neural Core
                </p>
                <h2 className="text-2xl font-black mt-2">ACTIVE</h2>
              </div>
              <BrainCircuit className="text-cyan-400 animate-pulse" />
            </div>

            <div className="mt-6 space-y-2 text-xs text-white/40">
              <p>• Cognitive mesh synced</p>
              <p>• Signal ingestion: LIVE</p>
              <p>• Drift correction: AUTO</p>
            </div>
          </div>

          {/* SIGNAL RADAR */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-40 w-40 rounded-full border border-cyan-400/20 animate-spin" />
              <div className="absolute h-24 w-24 rounded-full border border-purple-400/20 animate-spin [animation-duration:6s]" />
              <div className="absolute h-12 w-12 rounded-full bg-cyan-400/10 animate-pulse" />
            </div>

            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
                Signal Field
              </p>
              <h3 className="mt-2 text-sm font-bold text-cyan-300">SCANNING</h3>
            </div>
          </div>

          {/* MICRO FEEDS */}
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-4">
            {[
              "Semantic drift detected",
              "AI nodes synchronizing",
              "Emotional variance rising",
              "Narrative fracture widening",
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs text-white/40 border-b border-white/5 pb-2"
              >
                {t}
                <Waves className="h-3 w-3 text-cyan-400 animate-pulse" />
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER CHAT CORE */}
        <main className="col-span-6 flex flex-col rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden relative max-h-[700px]">
          {/* glowing edge */}
          <div className="absolute inset-0 border border-cyan-500/10 shadow-[0_0_80px_rgba(34,211,238,0.15)] pointer-events-none" />

          {/* CHAT HEADER */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="text-cyan-400 animate-pulse" />
              <div>
                <p className="text-[10px] tracking-[0.4em] text-cyan-300 uppercase">
                  Neural Interface
                </p>
                <p className="text-xs text-white/30">
                  Live inference conversation stream
                </p>
              </div>
            </div>

            <Activity className="text-purple-400 animate-pulse" />
          </div>

          {/* CHAT STREAM */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-4 text-sm leading-relaxed backdrop-blur-xl border transition-all duration-300 ${
                    m.role === "user"
                      ? "bg-purple-500/10 border-purple-500/20"
                      : "bg-cyan-500/10 border-cyan-500/20"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT DOCK */}
          <div className="p-5 border-t border-white/10 flex gap-4 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit neural query..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-cyan-400/40"
              onKeyDown={(e) => e.key === "Enter" && send()}
            />

            <button
              onClick={send}
              className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 transition"
            >
              <Send className="text-cyan-300 w-4 h-4" />
            </button>
          </div>
        </main>

        {/* RIGHT INTELLIGENCE PANEL */}
        <aside className="col-span-3 flex flex-col gap-6">
          {/* AI THINKING CORE */}
          <div className="rounded-[28px] border border-purple-500/20 bg-white/5 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/10 blur-2xl animate-pulse" />

            <div className="relative z-10">
              <Sparkles className="text-purple-400 animate-pulse" />
              <h3 className="mt-4 text-lg font-black">Cognitive Layer Sync</h3>

              <p className="text-xs text-white/40 mt-3">
                Multi-node inference running distributed pattern analysis.
              </p>
            </div>
          </div>

          {/* LIVE METRICS */}
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-4">
            {[
              ["Signal Density", "87%"],
              ["AI Load", "High"],
              ["Entropy", "Rising"],
              ["Consensus Drift", "42%"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-white/40">{k}</span>
                <span className="text-cyan-300 font-bold">{v}</span>
              </div>
            ))}
          </div>

          {/* ORBIT VISUAL */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-10 overflow-hidden flex items-center justify-center h-50">
            <div className="absolute h-40 w-40 border border-cyan-400/20 rounded-full animate-spin" />
            <div className="absolute h-24 w-24 border border-purple-400/20 rounded-full animate-spin [animation-duration:6s]" />
            <Orbit className="text-cyan-400 animate-pulse" />
          </div>
        </aside>
      </div>
    </div>
  );
}
