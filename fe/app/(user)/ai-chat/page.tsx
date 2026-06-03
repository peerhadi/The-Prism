"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Activity,
  Orbit,
  Sparkles,
  BrainCircuit,
  Send,
} from "lucide-react";
type Msg = { role: "user" | "ai"; text: string };
import { useRef } from "react";
export default function NeuralAIConsole() {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi, I’m Prism AI. Ask me about stories, narratives, perspectives, categories, or anything happening on Prism.",
    },
  ]);
  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  useEffect(() => {
    console.log(process.env);
  }, []);

  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    const user: Msg = { role: "user", text: input };
    await fetch("http://localhost:8080/api/aiRoutes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        const ai: Msg = {
          role: "ai",
          text: res.response,
        };

        setMessages((m) => [...m, user, ai]);
      });
    setInput("");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02030a] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] bg-cyan-500/10 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] bg-purple-500/10 blur-[200px]" />

        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:70px_70px]" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.03)_100%)] bg-[size:100%_6px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      </div>

      {/* GRID — FIXED RESPONSIVE */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-4 sm:p-6 lg:p-10 min-h-screen">
        {/* LEFT */}
        <aside className="lg:col-span-3 flex flex-col gap-4 lg:gap-6">
          <div className="rounded-[28px] border border-cyan-500/20 bg-white/5 p-5 lg:p-6 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10 blur-2xl opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-cyan-400 uppercase">
                  Neural Core
                </p>
                <h2 className="text-xl lg:text-2xl font-black mt-2">ACTIVE</h2>
              </div>
              <BrainCircuit className="text-cyan-400" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 lg:p-6">
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
              Signal Field
            </p>
            <h3 className="mt-2 text-sm font-bold text-cyan-300">SCANNING</h3>
          </div>
        </aside>

        {/* CENTER CHAT — FIXED */}
        <main className="lg:col-span-6 flex flex-col rounded-[30px] lg:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden min-h-[60vh] lg:max-h-[80vh]">
          {/* HEADER */}
          <div className="p-4 lg:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="text-cyan-400" />
              <div>
                <p className="text-[10px] tracking-[0.4em] text-cyan-300 uppercase">
                  Neural Interface
                </p>
                <p className="text-xs text-white/30">Live inference stream</p>
              </div>
            </div>

            <Activity className="text-purple-400" />
          </div>

          {/* CHAT */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 lg:space-y-6"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 lg:px-5 py-3 lg:py-4 text-sm border ${
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

          {/* INPUT */}
          <div className="p-3 lg:p-5 border-t border-white/10 flex gap-3 lg:gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit neural query..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 lg:px-5 lg:py-4 text-sm outline-none focus:border-cyan-400/40"
              onKeyDown={(e) => e.key === "Enter" && send()}
            />

            <button
              onClick={send}
              className="p-3 lg:p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30"
            >
              <Send className="text-cyan-300 w-4 h-4" />
            </button>
          </div>
        </main>

        {/* RIGHT */}
        <aside className="lg:col-span-3 flex flex-col gap-4 lg:gap-6">
          <div className="rounded-[28px] border border-purple-500/20 bg-white/5 p-5 lg:p-6">
            <Sparkles className="text-purple-400" />
            <h3 className="mt-3 lg:mt-4 text-base lg:text-lg font-black">
              Cognitive Sync
            </h3>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 lg:p-6 space-y-3 lg:space-y-4">
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

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 flex items-center justify-center">
            <Orbit className="text-cyan-400" />
          </div>
        </aside>
      </div>
    </div>
  );
}
