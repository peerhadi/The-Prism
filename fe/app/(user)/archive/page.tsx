"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Binary,
  Brain,
  Calendar,
  ChevronRight,
  Clock3,
  Database,
  Eye,
  FileStack,
  Fingerprint,
  Globe,
  Lock,
  Orbit,
  Radar,
  Search,
  Shield,
  Sparkles,
  Waves,
} from "lucide-react";

import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import StickyInsight from "../components/TickerCard";
import { HeadlineCard } from "../components/HeadlineCard";
import GenericObsidianStoryCard from "../components/HeroCard";
import { getBiasColor } from "@/app/utils/getbiascolor";
import { PrismLoader } from "@/app/components/loadingScreen";

export default function ArchivePage() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [heroStory, setHeroStory] = React.useState<any>(null);
  const [featured, setFeatured] = React.useState<any[]>([]);
  const [stream, setStream] = React.useState<any[]>([]);
  const [headlines, setHeadlines] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then(setCategories);
    fetch("http://localhost:8080/api/articles")
      .then((res) => res.json())

      .then((fetched) => {
        setHeroStory(fetched[0]);

        setFeatured(fetched.slice(1, 3));

        setStream(fetched.slice(3, 5));

        setHeadlines(fetched.slice(5, 8));

        setArticles(fetched);
      });
  }, []);
  if (!heroStory || featured.length < 2 || stream.length < 2) {
    return <PrismLoader />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03060d] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* GLOWS */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[160px]" />

        {/* NOISE */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      </div>

      {/* TOP BAR */}

      <main className="relative z-10 mx-auto max-w-[1900px] px-6 py-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 md:p-16">
          {/* GLOW */}
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 grid grid-cols-1 gap-14 xl:grid-cols-12">
            {/* LEFT */}
            <div className="xl:col-span-8">
              <div className="mb-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  <Radar className="h-3 w-3 animate-pulse" />
                  DEEP STORAGE
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black tracking-[0.35em] text-white/40 uppercase">
                  <Lock className="h-3 w-3" />
                  RESTRICTED ACCESS
                </div>
              </div>

              <h1 className="text-6xl leading-[0.85] font-black tracking-tighter uppercase md:text-[10rem]">
                ARCHIVE
                <br />
                <span className="bg-gradient-to-b from-cyan-300 to-cyan-900 bg-clip-text text-transparent">
                  VAULT
                </span>
              </h1>

              <p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/50">
                A classified repository of recovered media fragments, suppressed
                intelligence reports, narrative drift analysis, and synthetic
                influence documentation collected across fragmented timelines.
              </p>

              {/* TIMELINE */}
              <div className="mt-14 flex flex-wrap gap-3">
                {categories.map((item, idx) => (
                  <button
                    key={idx}
                    className={`group flex items-center gap-3 rounded-full ${getBiasColor(item.averageBias)} bg-black/30 px-5 py-3 text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:scale-105 `}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />

                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-4">
              <div className="space-y-6 rounded-[40px] border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                      SYSTEM STATUS
                    </p>

                    <h3 className="mt-3 text-3xl font-black uppercase">
                      ARCHIVE ONLINE
                    </h3>
                  </div>

                  <Orbit className="h-8 w-8 animate-spin text-cyan-400" />
                </div>

                {[
                  {
                    icon: Eye,
                    label: "Recovered Files",
                    value: "12,884",
                  },
                  {
                    icon: Brain,
                    label: "AI Reconstructions",
                    value: "341",
                  },
                  {
                    icon: Fingerprint,
                    label: "Identity Traces",
                    value: "88%",
                  },
                  {
                    icon: Waves,
                    label: "Signal Integrity",
                    value: "74%",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-white/5 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-cyan-400" />

                      <span className="text-sm text-white/50">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-sm font-black">{item.value}</span>
                  </div>
                ))}

                <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 py-4 text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase transition-all hover:scale-[1.02] hover:bg-cyan-500/20">
                  Access Core Records
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-16 hidden xl:grid grid-cols-12 gap-10">
          {/* LEFT */}
          <aside className="col-span-3 space-y-8">
            <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  ARCHIVE LOGS
                </h3>

                <Activity className="h-5 w-5 animate-pulse text-cyan-400" />
              </div>

              <div className="space-y-6">
                {articles.slice(0, 4).map((article) => (
                  <div
                    key={article.id}
                    className="flex gap-4 border-b border-white/5 pb-5"
                  >
                    <Clock3 className="mt-1 h-4 w-4 text-cyan-400" />

                    <p className="text-sm leading-relaxed text-white/50">
                      {article.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <StickyInsight
              variant="cyan"
              title={articles[0]?.title}
              content={articles[0]?.summary}
            />

            <StickyInsight
              variant="purple"
              title={articles[1]?.title}
              content={articles[1]?.summary}
            />
            <StickyInsight
              variant="purple"
              title={articles[2]?.title}
              content={articles[2]?.summary}
            />
          </aside>

          {/* CENTER */}
          <section className="col-span-6 space-y-10">
            <GenericObsidianStoryCard
              type={heroStory.type}
              createdAt={new Date(heroStory.createdAt).toLocaleDateString()}
              title={heroStory.title}
              description={heroStory.summary}
              sources={heroStory.sources}
              status="Restricted"
              imageUrl={heroStory.imageUrl}
            />

            <div className="grid grid-cols-2 gap-8">
              {featured.map((story) => (
                <GenericShortStoryCard
                  key={story.id}
                  badge={story.type}
                  id={story.id}
                  headline={story.title}
                  description={story.description}
                  imageUrl={story.imageUrl}
                />
              ))}
            </div>

            <div className="space-y-8">
              <GenericCompactListCard
                category={stream[0]?.type}
                sourceCount={stream[0]?.sources?.length ?? 0}
                headline={stream[0]?.title}
                description={stream[0]?.description}
                imageUrl={stream[0]?.imageUrl}
              />

              <GenericCompactListCard
                category={stream[1]?.type}
                sourceCount={stream[1]?.sources?.length ?? 0}
                headline={stream[1]?.title}
                description={stream[1]?.description}
                imageUrl={stream[1]?.imageUrl}
              />
            </div>
          </section>

          {/* RIGHT */}
          <aside className="col-span-3 space-y-8">
            <HeadlineCard
              title="Recovered Headlines"
              data={headlines.map((article) => ({
                tag: "ARCHIVE",
                time: new Date(article.createdAt).getFullYear().toString(),
                title: article.title,
                variant: "cyan",
              }))}
              onActionClick={() => console.log("archive")}
            />

            <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
              <div className="mb-8 flex items-center gap-4">
                <Database className="h-6 w-6 text-cyan-400" />

                <div>
                  <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                    CATEGORY INDEX
                  </p>

                  <h4 className="mt-2 text-3xl font-black uppercase">
                    Archive Nodes
                  </h4>
                </div>
              </div>

              <div className="space-y-5">
                {categories.map((category) => {
                  const count = articles.filter(
                    (article) => article.category?.id === category.id,
                  ).length;

                  return (
                    <div
                      key={category.id}
                      className="group border-b border-white/5 pb-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-white/70 transition-colors group-hover:text-white">
                          {category.name}
                        </span>

                        <span className="text-sm font-black text-cyan-400">
                          {count}
                        </span>
                      </div>

                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                          style={{
                            width: `${Math.max(
                              10,
                              (count / articles.length) * 100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>

        {/* MOBILE / TABLET */}
        <section className="mt-16 space-y-8 xl:hidden">
          {/* HERO */}

          <div className="w-full flex flex-col justify-center items-center mt-5 gap-10">
            <GenericObsidianStoryCard
              type={heroStory.type}
              createdAt={new Date(heroStory.createdAt).toLocaleDateString()}
              title={heroStory.title}
              description={heroStory.summary}
              sources={heroStory.sources}
              status="Restricted"
              imageUrl={heroStory.imageUrl}
            />

            <div className="w-[80%] flex justify-center items-center flex-col">
              {/* LIST CARDS */}
              <GenericCompactListCard
                category={stream[0]?.type}
                sourceCount={stream[0]?.sources?.length ?? 0}
                headline={stream[0]?.title}
                description={stream[0]?.description}
                imageUrl={stream[0]?.imageUrl}
              />

              <GenericCompactListCard
                category={stream[1]?.type}
                sourceCount={stream[1]?.sources?.length ?? 0}
                headline={stream[1]?.title}
                description={stream[1]?.description}
                imageUrl={stream[1]?.imageUrl}
              />
            </div>
            <div className="w-[80%] flex justify-center items-center flex-col gap-10">
              {/* SMALL CARDS */}
              {featured.map((story) => (
                <GenericShortStoryCard
                  key={story.id}
                  badge={story.type}
                  id={story.id}
                  headline={story.title}
                  description={story.description}
                  imageUrl={story.imageUrl}
                />
              ))}
            </div>
            <div className="w-[80%] flex justify-center items-center flex-col">
              {/* HEADLINES */}
              <HeadlineCard
                title="Recovered Headlines"
                data={headlines.map((article) => ({
                  tag: "ARCHIVE",
                  time: new Date(article.createdAt).getFullYear().toString(),
                  title: article.title,
                  variant: "cyan",
                }))}
                onActionClick={() => console.log("archive")}
              />
            </div>
            <div className="w-[80%] flex justify-center items-center flex-col">
              {/* CATEGORY INDEX */}
              <div className="rounded-[40px] border border-white/10 bg-black/30 p-8 w-full">
                <div className="mb-8 flex items-center gap-4">
                  <Database className="h-6 w-6 text-cyan-400" />

                  <div>
                    <p className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                      CATEGORY INDEX
                    </p>

                    <h4 className="mt-2 text-3xl font-black uppercase">
                      Archive Nodes
                    </h4>
                  </div>
                </div>

                <div className="space-y-5">
                  {categories.map((category) => {
                    const count = articles.filter(
                      (article) => article.category?.id === category.id,
                    ).length;

                    return (
                      <div
                        key={category.id}
                        className="group border-b border-white/5 pb-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium text-white/70 transition-colors group-hover:text-white">
                            {category.name}
                          </span>

                          <span className="text-sm font-black text-cyan-400">
                            {count}
                          </span>
                        </div>

                        <div className="h-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                            style={{
                              width: `${Math.max(
                                10,
                                (count / articles.length) * 100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-[80%] flex justify-center items-center flex-col mt-5">
              {/* STICKY INSIGHTS */}
              <div className="space-y-6 grid grid-cols-3 gap-5 w-full">
                <StickyInsight
                  variant="cyan"
                  title={articles[0]?.title}
                  content={articles[0]?.summary}
                />

                <StickyInsight
                  variant="purple"
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
          </div>
        </section>
      </main>

      {/* BOTTOM LINE */}
      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
    </div>
  );
}
