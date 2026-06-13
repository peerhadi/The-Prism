"use client";

import React, { useEffect, useMemo, useState } from "react";

import { PrismLoader } from "@/app/components/loadingScreen";
import { getBiasColor } from "@/app/utils/getbiascolor";

import ExploreHero from "@/app/components/crud/explore/ExploreHero";
import DiscoveryNodes from "@/app/components/crud/explore/DiscoveryNodes";
import QuickAccessPanel from "@/app/components/crud/explore/QuickAccessPanel";
import TrendingPanel from "@/app/components/crud/explore/TrendingPanel";
import ResultsGrid from "@/app/components/crud/explore/ResultsGrid";
import ExploreLayout from "@/app/components/crud/explore/ExploreLayout";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ExplorePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [layout, setLayout] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [heroStory, setHeroStory] = useState<any>(null);
  const [small, setSmall] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/categories`).then((r) => r.json()),
      fetch(`${API}/api/articles`).then((r) => r.json()),
      fetch(`${API}/api/layout/explore`).then((r) => r.json()),
    ]).then(([cats, arts, layoutRes]) => {
      setCategories(
        cats.map((c: any) => ({
          ...c,
          color: getBiasColor(c.averageBias),
        })),
      );

      // ---------------------------
      // CLEAN + SORT (LATEST FIRST)
      // ---------------------------
      let clean = arts.filter((x: any) => {
        return (
          !!x.title &&
          !!x.description &&
          !!x.imageUrl &&
          !!x.id &&
          !!x.sources?.length &&
          !!x.type
        );
      });

      clean = clean.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setArticles(clean);

      const components = layoutRes?.components ?? [];
      setLayout(components);

      // ===========================
      // CURSOR ENGINE (LAYOUT DRIVEN)
      // ===========================
      let cursor = 0;

      const count = (type: string) =>
        components.filter((c: any) => c.type === type).length;

      const next = (n: number) => {
        const slice = clean.slice(cursor, cursor + n);
        cursor += n;
        return slice;
      };

      // HERO (1)
      const heroCount = count("HERO");
      setHeroStory(heroCount ? next(1)[0] : null);

      // INSIGHTS (LEFT)
      const insightCount = count("INSIGHT");
      setInsights(next(insightCount));

      // SMALL
      const smallCount = count("SMALL");
      setSmall(next(smallCount));

      // SMALL
      const listCount = count("LIST");
      setList(next(listCount));

      setHeadlines(next(4));

      // TRENDING / HEADLINES
      const trendingCount = count("HEADLINE");
      setTrending(next(trendingCount));
    });
  }, []);

  // ---------------------------
  // FILTERING (UNCHANGED LOGIC)
  // ---------------------------
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

  if (!articles.length || !heroStory) {
    return <PrismLoader />;
  }

  return (
    <ExploreLayout
      hero={
        <ExploreHero
          articles={articles}
          categories={categories}
          filteredCount={filteredArticles.length}
          smallCount={articles.length}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      }
      left={
        <div className="space-y-8">
          <DiscoveryNodes
            categories={categories}
            articles={articles}
            setSelectedCategory={setSelectedCategory}
          />

          <QuickAccessPanel list={list} />
        </div>
      }
      center={
        <div className="space-y-10">
          <ResultsGrid
            articles={filteredArticles}
            small={small}
            list={list}
            heroStory={heroStory}
          />
        </div>
      }
      right={
        <div className="space-y-8">
          <TrendingPanel articles={trending} />
          <StoryLiveSignal articles={insights} />
        </div>
      }
    />
  );
}
