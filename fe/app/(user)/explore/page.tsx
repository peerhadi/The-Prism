"use client";

import React, { useEffect, useMemo, useState } from "react";

import { PrismLoader } from "@/app/components/loadingScreen";
import { getBiasColor } from "@/app/utils/getbiascolor";

import ExploreHero from "@/app/components/crud/explore/ExploreHero";
import ExploreStats from "@/app/components/crud/explore/ExploreStats";
import CategoryChips from "@/app/components/crud/explore/CategoryChips";
import DiscoveryNodes from "@/app/components/crud/explore/DiscoveryNodes";
import QuickAccessPanel from "@/app/components/crud/explore/QuickAccessPanel";
import TrendingPanel from "@/app/components/crud/explore/TrendingPanel";
import ResultsGrid from "@/app/components/crud/explore/ResultsGrid";
import SearchBar from "@/app/components/crud/explore/SearchBar";

export default function ExplorePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [small, setSmall] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [heroStory, setHeroStory] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/categories").then((r) => r.json()),
      fetch("http://localhost:8080/api/articles").then((r) => r.json()),
    ]).then(([cats, arts]) => {
      setCategories(
        cats.map((c: any) => ({
          ...c,
          color: getBiasColor(c.averageBias),
        })),
      );

      let fetched = arts.filter((x: any) => {
        return (
          !!x.title &&
          !!x.description &&
          !!x.imageUrl &&
          !!x.id &&
          !!x.sources?.length &&
          !!x.type
        );
      });
      console.log(fetched.length);
      fetched = fetched.reverse().slice(Math.max(0, fetched.length - 10));

      const heros = fetched.filter((x: any) => x.type === "HERO");
      const smalls = fetched.filter((x: any) => x.type === "SMALL");
      const lists = fetched.filter((x: any) => x.type === "SMALL");
      setHeroStory(heros[0]);
      setSmall(smalls.slice(0, 4));
      console.log(lists, smalls, heros);
      setList(lists.slice(0, 5));
      setArticles(fetched);
    });
  }, []);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedCategory) {
      result = result.filter((a) => a.categoryId === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.summary?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [articles, selectedCategory, search]);

  if (!articles.length || !list.length || !heroStory) return <PrismLoader />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {/* HERO — NOW PROPER PROPS */}
        <ExploreHero
          articles={articles}
          categories={categories}
          filteredCount={filteredArticles.length}
          smallCount={articles.length}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* GRID */}
        <section className="mt-16 grid grid-cols-12 gap-10">
          {/* LEFT */}
          <aside className="col-span-12 xl:col-span-3 space-y-8">
            <DiscoveryNodes
              categories={categories}
              articles={articles}
              setSelectedCategory={setSelectedCategory}
            />

            <QuickAccessPanel list={list} />
          </aside>

          {/* CENTER */}
          <section className="col-span-12 xl:col-span-6 space-y-10">
            {/* RESULTS */}
            <ResultsGrid
              articles={filteredArticles}
              small={small}
              heroStory={heroStory}
            />
          </section>

          {/* RIGHT */}
          <aside className="col-span-12 xl:col-span-3 space-y-8">
            <TrendingPanel articles={articles} />
          </aside>
        </section>
      </main>
    </div>
  );
}
