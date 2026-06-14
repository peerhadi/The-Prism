"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function NarrativeOverlay({
  open,
  onClose,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ensure client mount
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  // AUTO FIRST MESSAGE
  useEffect(() => {
    if (!open) return;

    const run = async () => {
      setMessages([]);
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aiRoutes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
You are Prism Narrative Engine.

You MUST output valid Markdown בלבד (ONLY Markdown).

This means:

Section titles MUST use #
Bullet points MUST use -
Emphasis MUST use **bold**
No plain paragraphs except inside required sections
No exceptions

If you fail to use Markdown syntax exactly, the output is invalid.

OUTPUT FORMAT (STRICT MARKDOWN — REQUIRED)
Perspective:
One sentence only
Summary:
3–4 short sentences
Key Points:
bullet 1
bullet 2
bullet 3
Alternate Framing:
One paragraph only
Bias Notes:
bullet
bullet
bullet
Missing Context:
bullet
bullet
HARD CONSTRAINTS
No extra sections
No intro or outro text
No questions
No commentary outside format
No deviation from Markdown structure
Keep everything concise
INPUT VARIABLES
EACH section header MUST be followed by a newline character.
NEVER place text on the same line as a header.
Format MUST be:
## Heading: + newline + content
Title: ${title}
Description: ${description}
          `,
        }),
      });

      const data = await res.json();

      setMessages([{ role: "ai", content: data?.response || "No response" }]);

      setLoading(false);
    };

    run();
  }, [open, title, description]);

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages((p) => [...p, userMsg]);

    setInput("");
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aiRoutes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `
Context:
${title}
${description}

Chat:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}

User:
${input}
        `,
      }),
    });

    const data = await res.json();

    setMessages((p) => [
      ...p,
      { role: "ai", content: data?.response || "No response" },
    ]);

    setLoading(false);
  };
  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
  }, [open]);
  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-[var(--backdrop)] backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* CENTER FLOATING PANEL */}
      <div className="relative w-full max-w-2xl h-[80vh] rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-3xl shadow-[var(--shadow-2xl)] flex flex-col p-5 z-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <Sparkles className="h-5 w-5" />
            Narrative Mode
          </div>

          <button onClick={onClose}>
            <X className="h-5 w-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-sm max-w-[90%] ${
                m.role === "user"
                  ? "ml-auto bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary-border)]"
                  : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
              }`}
            >
              <div style={{ whiteSpace: "pre-wrap" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-[var(--text-muted)] text-sm">Thinking...</div>
          )}
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about narrative, bias, perspective..."
            className="flex-1 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)]"
          />

          <button
            onClick={send}
            className="px-4 rounded-xl bg-[var(--primary-soft)] border border-[var(--primary-border)] text-[var(--primary)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
