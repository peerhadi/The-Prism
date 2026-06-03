"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowRight,
  Compass,
  Globe,
  Radar,
  Search,
  Sparkles,
} from "lucide-react";

import GenericObsidianStoryCard from "../components/HeroCard";
import GenericShortStoryCard from "../components/SmallCard";

import { getBiasColor } from "@/app/utils/getbiascolor";
import { PrismLoader } from "@/app/components/loadingScreen";

export default function ExplorePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [heroStory, setHeroStory] = React.useState({});
  const [list, setList] = React.useState([]);
  const [small, setSmalls] = React.useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/categories").then((r) => r.json()),
      fetch("http://localhost:8080/api/articles").then((r) => r.json()),
    ]).then(([cats, arts]) => {
      setCategories(
        cats.map((category: any) => ({
          ...category,
          color: getBiasColor(category.averageBias),
        })),
      );
      let fetched = arts.filter((x) => {
        return (
          !!x.title &&
          !!x.description &&
          !!x.imageUrl &&
          !!x.id &&
          !!x.sources.length &&
          !!x.type
        );
      });
      fetched = fetched
        .reverse()
        .slice(Math.max(0, fetched.length - 28), fetched.length);

      const heros = fetched.filter((x) => x.type === "HERO");
      const smalls = fetched.filter((x) => x.type === "SMALL");
      const lists = fetched.filter((x) => x.type === "LIST");
      setHeroStory(heros[1]);
      setSmalls(smalls.slice(1, 3));
      setList(lists.slice(0, 5));

      setArticles(fetched);
    });
  }, []);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedCategory) {
      result = result.filter(
        (article) => article.categoryId === selectedCategory,
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (article) =>
          article.title?.toLowerCase().includes(q) ||
          article.description?.toLowerCase().includes(q) ||
          article.summary?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [articles, selectedCategory, search]);

  if (!articles.length) {
    return <PrismLoader />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* GLOWS */}
      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          {/* Animated glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
            {/* LEFT */}
            <div className="max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  <Compass className="h-3 w-3 animate-pulse" />
                  EXPLORE NETWORK
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <Sparkles className="h-3 w-3" />
                  Discovery Engine
                </div>
              </div>

              <h1 className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
                <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                  EXPLORE
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50">
                Discover emerging narratives, investigate global events, and
                navigate the intelligence graph powering Prism.
              </p>

              {/* SEARCH */}
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  icon: Activity,
                  label: "Articles",
                  value: articles.length,
                },
                {
                  icon: Globe,
                  label: "Categories",
                  value: categories.length,
                },
                {
                  icon: Radar,
                  label: "Filtered",
                  value: filteredArticles.length,
                },
                {
                  icon: Sparkles,
                  label: "Discoveries",
                  value: small.length,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-black/30
            p-5
            transition-all
            duration-500
            hover:scale-105
            hover:border-cyan-500/40
          "
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

          {/* CATEGORY CHIPS */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`
        rounded-full
        border
        px-5
        py-3
        text-[11px]
        font-black
        tracking-[0.2em]
        uppercase
        transition-all
        duration-500
        ${
          selectedCategory === null
            ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
            : "border-white/10 bg-white/5 text-white/50"
        }
      `}
            >
              All Stories
            </button>

            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
          group
          flex
          items-center
          gap-3
          rounded-full
          border
          px-5
          py-3
          text-[11px]
          font-black
          tracking-[0.2em]
          uppercase
          transition-all
          duration-500
          hover:scale-105
          ${category.color}
        `}
              >
                <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
                {category.name}
              </button>
            ))}
          </div>
        </section>
        {/* MAIN GRID */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT */}
          <aside className="col-span-12 xl:col-span-3 space-y-8">
            {/* DISCOVERY NODES */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  DISCOVERY NODES
                </h3>

                <Compass className="h-5 w-5 text-cyan-400" />
              </div>

              <div className="space-y-4">
                {categories.map((category: any) => {
                  const count = articles.filter(
                    (a) => a.categoryId === category.id,
                  ).length;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-4
                text-left
                transition-all
                hover:border-cyan-500/40
                hover:bg-black/50
              "
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{category.name}</span>

                        <span className="text-cyan-400 text-sm">{count}</span>
                      </div>

                      <div className="mt-2 text-xs text-white/40 uppercase tracking-[0.2em]">
                        Active Stories
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUICK ACCESS */}
            <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
              <h3 className="mb-6 text-[11px] font-black tracking-[0.35em] text-purple-400 uppercase">
                QUICK ACCESS
              </h3>

              <div className="space-y-4">
                {list.map((article: any) => (
                  <div
                    key={article.id}
                    className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.02]
              p-4
            "
                  >
                    <h4 className="line-clamp-2 text-sm font-bold">
                      {article.title}
                    </h4>

                    <p className="mt-2 line-clamp-2 text-xs text-white/40">
                      {article.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="col-span-12 xl:col-span-6 space-y-10">
            {/* FEATURED STORY */}
            <GenericObsidianStoryCard {...heroStory} onActionClick={() => {}} />

            {/* DISCOVERY SPOTLIGHT */}
            <div>
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-[11px] font-black tracking-[0.35em] text-white/40 uppercase">
                  DISCOVERY SPOTLIGHT
                </h2>

                <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
                  Explore More
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {small.map((article: any) => {
                  console.log(small);
                  return (
                    <GenericShortStoryCard
                      key={article.id}
                      id={article.id}
                      badge="Explore"
                      headline={article.title}
                      description={article.description}
                      imageUrl={article.imageUrl}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="col-span-12 xl:col-span-3 space-y-8">
            {/* TRENDING NOW */}
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[11px] font-black tracking-[0.35em] text-cyan-400 uppercase">
                  TRENDING NOW
                </h3>

                <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-4">
                {articles.slice(0, 8).map((article: any, index) => (
                  <div
                    key={article.id}
                    className="
              rounded-2xl
              border
              border-white/10
              bg-black/30
              p-4
            "
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-cyan-400 font-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="h-1 w-1 rounded-full bg-white/30" />
                    </div>

                    <h4 className="line-clamp-2 font-bold">{article.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY OVERVIEW */}
          </aside>
        </section>
      </main>
    </div>
  );
}
