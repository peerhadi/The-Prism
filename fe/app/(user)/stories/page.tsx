"use client";

import React, { useEffect } from "react";
import {
  Activity,
  ArrowRight,
  Binary,
  BrainCircuit,
  ChevronRight,
  Cpu,
  Fingerprint,
  Globe,
  Radar,
  Shield,
  Sparkles,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react";

import StickyInsight from "../components/TickerCard";
import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import GenericObsidianStoryCard from "../components/HeroCard";
import { HeadlineCard } from "../components/HeadlineCard";
import { NarrativeSplitCard } from "../components/NarrativeSplitCard";
import { AnomalyCard } from "../components/AnomalyCard";

import { getBiasColor } from "@/app/utils/getbiascolor";
import { PrismLoader } from "@/app/components/loadingScreen";
export default function StoryIntelligencePage() {
  const [topics, setCategories] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [perspectives, setPerspectives] = React.useState([]);
  const [heroStory, setHeroStory] = React.useState({});
  const [list, setList] = React.useState([]);
  const [small, setSmalls] = React.useState([]);
  const [anomaly, setAnomaly] = React.useState({});
  const [primaryHeadlines, setPrimaryHeadlines] = React.useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((res) =>
        setCategories(
          res.map((category: any) => {
            return {
              label: category.name,
              color: getBiasColor(category.averageBias),
            };
          }),
        ),
      );

    fetch("http://localhost:8080/api/perspectives")
      .then((res) => res.json())
      .then((fetched) => setPerspectives(fetched));
    fetch("http://localhost:8080/api/articles")
      .then((res) => res.json())
      .then((fetched) => {
        fetched = fetched
          .reverse()
          .slice(Math.max(0, fetched.length - 28), fetched.length);
        const heros = fetched.filter((x) => x.type === "HERO");
        const smalls = fetched.filter((x) => x.type === "SMALL");
        const lists = fetched.filter((x) => x.type === "SMALL");
        console.log(heros[1], fetched.length);
        setHeroStory(heros[0]);
        setSmalls(smalls.slice(0, 2));
        setList(lists.slice(0, 2));

        setPrimaryHeadlines(fetched.slice(1, 6));
        setAnomaly(smalls[2]);
        setArticles(fetched);
      });
  }, []);
  console.log(topics, articles);
  if (!articles.length || !perspectives.length) return <PrismLoader />;
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* FLOATING GLOW */}
      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            {/* LEFT */}
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  <Activity className="h-3 w-3 animate-pulse" />
                  LIVE INTELLIGENCE
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <Cpu className="h-3 w-3" />
                  Neural Archive
                </div>
              </div>

              <h1 className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
                <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                  STORIES
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50">
                Autonomous intelligence systems tracking narrative divergence,
                emotional manipulation, synthetic influence operations, and
                geopolitical signal distortion across global information
                ecosystems.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  icon: Globe,
                  label: "Global Feeds",
                  value: "12.4K",
                },
                {
                  icon: Radar,
                  label: "Threat Nodes",
                  value: "847",
                },
                {
                  icon: Fingerprint,
                  label: "AI Signatures",
                  value: "31K",
                },
                {
                  icon: Waves,
                  label: "Signal Drift",
                  value: "74%",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-5 transition-all duration-500 hover:scale-105 hover:border-cyan-500/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <item.icon className="mb-4 h-6 w-6 text-cyan-400" />
                    <div className="text-3xl font-black">{item.value}</div>
                    <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOPIC CHIPS */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-4">
            {topics.map((topic, idx) => (
              <button
                key={idx}
                className={`group flex items-center gap-3 rounded-full border px-5 py-3 ${topic.color} text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)]`}
              >
                <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                {topic.label}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="hidden xl:grid ">
          <section className="mt-16 grid grid-cols-12 gap-10">
            {/* LEFT PANEL */}
            <aside className="col-span-12 space-y-8 xl:col-span-3">
              {/* LIVE SIGNAL */}
              <div className="rounded-[36px] p-8 backdrop-blur-xl flex justify-center flex-col items-center">
                <div className="space-y-6 grid xl:grid-cols-1! justify-center xl:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-3!">
                  <StickyInsight
                    variant="cyan"
                    title={articles[0]?.title}
                    content={articles[0]?.summary}
                  />

                  <StickyInsight
                    variant="cyan"
                    title={articles[2]?.title}
                    content={articles[2]?.summary}
                  />

                  <StickyInsight
                    variant="purple"
                    title={articles[1]?.title}
                    content={articles[1]?.summary}
                  />
                </div>
              </div>

              {/* TIMELINE */}
            </aside>

            {/* CENTER */}
            <section className="col-span-12 space-y-12 xl:col-span-6">
              {/* HERO STORY */}
              <GenericObsidianStoryCard
                {...heroStory}
                onActionClick={() => console.log("Open")}
              />

              {/* SPLIT CARD */}
              <NarrativeSplitCard
                seedId="NODE-X44"
                topic="Narrative Divergence"
                versionA={{
                  label: "Verified Narrative",
                  title: perspectives[perspectives.length - 2].neutral.title,
                  description:
                    perspectives[perspectives.length - 2].neutral.description,
                }}
                versionB={{
                  label: "Shadow Narrative",
                  title: perspectives[perspectives.length - 2].extreme.title,
                  description:
                    perspectives[perspectives.length - 2].extreme.description,
                }}
              />

              {/* LIVE STREAM */}
              <div className="space-y-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-[11px] font-black tracking-[0.35em] text-white/40 uppercase">
                    LIVE STORY STREAM
                  </h2>

                  <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
                    Explore Archive
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* STORY GRID */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <GenericShortStoryCard
                    badge="Signal"
                    id={small[0].id}
                    headline={small[0].title}
                    description={small[0].description}
                    imageUrl={small[0].imageUrl}
                  />

                  <GenericShortStoryCard
                    badge="Threat"
                    id={small[1].id}
                    headline={small[1].title}
                    description={small[1].description}
                    imageUrl={small[1].imageUrl}
                  />
                </div>

                {/* LIST CARDS */}
                <GenericCompactListCard
                  category="Geopolitics"
                  sourceCount={list[0].sources.length}
                  headline={list[0].headline}
                  description={list[0].description}
                  imageUrl={list[0].imageUrl}
                />

                <GenericCompactListCard
                  category="Geopolitics"
                  sourceCount={list[1].sources.length}
                  headline={list[1].headline}
                  description={list[1].description}
                  imageUrl={list[1].imageUrl}
                />
              </div>
            </section>

            {/* RIGHT */}
            <aside className="col-span-12 space-y-10 xl:col-span-3">
              {/* HEADLINES */}
              <HeadlineCard
                title="LIVE HEADLINES"
                data={primaryHeadlines}
                onActionClick={() => console.log("Open headlines")}
              />

              {/* ANOMALY */}
              <AnomalyCard
                id={anomaly.id}
                title={anomaly.title}
                desc={anomaly.description}
                tag="Critical"
                intensity={anomaly.biasLevel + "%"}
                color="border-cyan-500"
                img={anomaly.imageUrl}
              />
            </aside>
          </section>
        </div>

        <div className="xl:hidden space-y-10">
          {/* HERO */}

          <div className="w-full flex flex-col justify-center items-center mt-5 gap-10">
            <GenericObsidianStoryCard
              {...heroStory}
              onActionClick={() => console.log("Open")}
            />

            <div className="w-[90%] flex justify-center items-center flex-col">
              {/* LIST CARDS */}
              <GenericCompactListCard
                category="Geopolitics"
                sourceCount={list[0].sources.length}
                headline={list[0].headline}
                description={list[0].description}
                imageUrl={list[0].imageUrl}
              />

              <GenericCompactListCard
                category="Geopolitics"
                sourceCount={list[1].sources.length}
                headline={list[1].headline}
                description={list[1].description}
                imageUrl={list[1].imageUrl}
              />
            </div>

            <div className="w-[90%] flex justify-center items-center flex-col">
              {/* SPLIT */}
              <NarrativeSplitCard
                seedId="NODE-X44"
                topic="Narrative Divergence"
                versionA={{
                  label: "Verified Narrative",
                  title: perspectives[perspectives.length - 2].neutral.title,
                  description:
                    perspectives[perspectives.length - 2].neutral.description,
                }}
                versionB={{
                  label: "Shadow Narrative",
                  title: perspectives[perspectives.length - 2].extreme.title,
                  description:
                    perspectives[perspectives.length - 2].extreme.description,
                }}
              />
            </div>

            <div className="w-[90%] flex justify-center items-center flex-col">
              {/* SMALL CARDS */}
              <div className="grid gap-6">
                <GenericShortStoryCard
                  badge="Signal"
                  id={small[0].id}
                  headline={small[0].title}
                  description={small[0].description}
                  imageUrl={small[0].imageUrl}
                />

                <GenericShortStoryCard
                  badge="Threat"
                  id={small[1].id}
                  headline={small[1].title}
                  description={small[1].description}
                  imageUrl={small[1].imageUrl}
                />
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="w-[90%] flex justify-center items-center flex-col">
              <div className="space-y-6 grid grid-cols-2 gap-10">
                <StickyInsight
                  variant="cyan"
                  title={articles[0]?.title}
                  content={articles[0]?.summary}
                />

                <StickyInsight
                  variant="cyan"
                  title={articles[2]?.title}
                  content={articles[2]?.summary}
                />

                <StickyInsight
                  variant="purple"
                  title={articles[1]?.title}
                  content={articles[1]?.summary}
                />
              </div>
            </div>

            <div className="w-[90%] flex justify-center items-center flex-col">
              {/* HEADLINES */}
              <HeadlineCard
                title="LIVE HEADLINES"
                data={primaryHeadlines}
                onActionClick={() => console.log("Open headlines")}
              />
            </div>

            <div className="w-[90%] flex justify-center items-center flex-col">
              {/* ANOMALY */}
              <AnomalyCard
                id={anomaly.id}
                title={anomaly.title}
                desc={anomaly.description}
                tag="Critical"
                intensity={anomaly.biasLevel + "%"}
                color="border-cyan-500"
                img={anomaly.imageUrl}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
