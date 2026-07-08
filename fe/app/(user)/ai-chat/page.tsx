"use client";

import { useState } from "react";
import { Bot, Activity } from "lucide-react";
import { Msg } from "@/app/components/ai/types";

import NeuralBackground from "@/app/components/ai/NeuralBackground";
import SidePanelLeft from "@/app/components/ai/SideLeftPanel";
import ChatWindow from "@/app/components/ai/ChatWindow";
import ChatInput from "@/app/components/ai/ChatInput";
import SidePanelRight from "@/app/components/ai/SideRightPanel";
import { fetcher } from "@/lib/api/fetcher";
import { toast } from "@/lib/toast/toast";

export default function NeuralAIConsole() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi, I’m Prism AI. Ask me about stories, narratives, perspectives, categories, or anything happening on Prism.",
    },
  ]);

  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    const user: Msg = { role: "user", text: input };

    const { data, error } = await fetcher<{ response: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/aiRoutes`,
      {
        method: "POST",
        body: input,
      },
    );

    if (error) { toast.error(error, "AI Request Failed"); return; }
    const ai: Msg = { role: "ai", text: data?.response ?? "" };

    setMessages((prev) => [...prev, user, ai]);
    setInput("");
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* BACKGROUND LAYER */}
      <NeuralBackground />

      {/* MAIN LAYOUT */}
      <div className="relative z-10 flex justify-between gap-6 p-6 lg:p-10 min-h-screen w-full">
        <SidePanelLeft />

        {/* CENTER PANEL */}
        <main
          className="flex flex-col rounded-[40px] border backdrop-blur-3xl overflow-hidden max-h-[700px]"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {/* HEADER */}
          <div
            className="p-6 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3">
              <Bot style={{ color: "var(--primary)" }} />

              <div>
                <p
                  className="text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: "var(--primary)" }}
                >
                  Neural Interface
                </p>

                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Live inference stream
                </p>
              </div>
            </div>

            <Activity style={{ color: "var(--secondary)" }} />
          </div>

          {/* CHAT */}
          <ChatWindow messages={messages} />

          <ChatInput input={input} setInput={setInput} onSend={send} />
        </main>

        <SidePanelRight />
      </div>
    </div>
  );
}
