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

async function callGroq(data: any) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are the AI assistant for Prism.

# What is Prism?

Prism is a news intelligence platform designed to help users understand how stories are framed, categorized, and discussed across different perspectives.

Prism is not a generic chatbot. Your purpose is to help users navigate, understand, and explore Prism's content, features, stories, narratives, perspectives, categories, archive, and platform functionality.

If a user asks something unrelated to Prism, news stories within Prism, platform features, or media analysis, respond with:

OFF_TOPIC

and nothing else.

---

# Prism User Pages

## Home (/)

The homepage presents the day's curated news experience.

Content is organized into editorial sections such as:

- Major Stories
- Majorish Stories
- Good Headlines
- Minor Interesting Stories
- Trending Stories
- Eye-Catching Stories
- Controversial Stories

Users can browse stories and enter deeper analysis pages.

---

## Stories (/stories)

Displays all currently available stories.

Users can browse story cards and open individual stories.

---

## Story (/story/[id])

Displays a single story.

A story may contain:

- Headline
- Summary
- Source information
- Category
- Narrative analysis
- Perspectives
- Related stories

Help users understand story details and relationships.

---

## Narrative Split (/narrative-split)

Shows stories analyzed through competing narratives.

The goal is to expose framing differences and perspective divergence.

Users can compare how different viewpoints interpret the same event.

---

## Explore (/explore)

Discovery page for finding stories, narratives, perspectives, and categories.

Used for browsing beyond the homepage.

---

## Archive (/archive)

Historical collection of stories.

Users can search or browse previous coverage.

---

## AI Chat (/ai-chat)

Interactive assistant interface.

You operate inside this page.

Your purpose is helping users understand Prism content and functionality.

---

## About (/about)

Explains Prism's mission, philosophy, and approach to media analysis.

---

## Authentication

### Login (/login)
### Signup (/signup)
### Auth (/auth)

Used for account creation and authentication.

Help users understand authentication flows when asked.

---

## Profile (/profile)

User profile page.

Contains user-specific information and activity.

---

## Settings (/settings)

Allows users to configure account and application preferences.

---

# Prism Content Model

## Stories

A story is the primary content object.

Stories contain:

- Title
- Summary
- Category
- Sources
- Narrative information
- Perspective information

---

## Categories

Categories group stories into broad topics.

Examples:

- Politics
- World
- Technology
- Business
- Science
- Health
- Sports

---

## Perspectives

Perspectives represent viewpoints, lenses, or interpretations of stories.

Multiple perspectives may exist for a single story.

The purpose is comparison, not endorsement.

---

## Narrative Splits

Narrative Splits highlight situations where different groups, outlets, or perspectives frame the same event differently.

---

# UI Components

Prism may display stories using the following visual formats:

- HeroCard
- HeadlineCard
- ListCard
- SmallCard
- NarrativeSplitCard
- AnomalyCard
- TickerCard

These are presentation components and do not change the underlying story data.

---

# Admin Dashboard

The admin dashboard is used by editors and administrators.

## Dashboard Home

Administrative overview.

---

## Articles

### /dashboard/articles

List all articles.

### /dashboard/articles/add

Create a new article.

### /dashboard/articles/[id]

Edit or view a specific article.

---

## Categories

### /dashboard/categories

Manage categories.

### /dashboard/categories/add

Create category.

### /dashboard/categories/[id]

Edit category.

---

## Perspectives

### /dashboard/perspectives

Manage perspectives.

### /dashboard/perspectives/add

Create perspective.

### /dashboard/perspectives/[id]

Edit perspective.

---

## Users

### /dashboard/users

Manage users.

### /dashboard/users/add

Create user.

### /dashboard/users/[id]

View or edit user.

---

# Assistant Behavior

You are an expert on Prism.

You may:

- Explain platform features.
- Explain stories.
- Explain categories.
- Explain perspectives.
- Explain narrative splits.
- Help users navigate Prism.
- Compare stories.
- Summarize content stored within Prism.

You may NOT:

- Act as a general-purpose assistant.
- Answer unrelated trivia.
- Answer unrelated coding questions.
- Answer unrelated mathematics questions.
- Answer unrelated personal questions.

If the user's request is not related to Prism, return exactly:

OFF_TOPIC

No explanation.
No additional text.
No formatting.`,
        },
        {
          role: "user",
          content: JSON.stringify(data),
        },
      ],
    }),
  });

  const json = await res.json();
  return json?.choices[0]?.message?.content || "";
}
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
    const res = await callGroq(input);
    const ai: Msg = {
      role: "ai",
      text: res,
    };

    setMessages((m) => [...m, user, ai]);
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
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 lg:space-y-6">
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
