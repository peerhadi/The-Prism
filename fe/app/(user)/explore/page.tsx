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

interface Category {
  id: string;
  name: string;
  averageBias: number;
  color?: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  summary?: string;
  imageUrl: string;
  sources: { url?: string }[];
  type: string;
  createdAt: string;
  categoryId?: string;
}

interface LayoutComponent {
  type: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ExplorePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [, setLayout] = useState<LayoutComponent[]>([]);

  const [search] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [heroStory, setHeroStory] = useState<Article | null>(null);
  const [small, setSmall] = useState<Article[]>([]);
  const [list, setList] = useState<Article[]>([]);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [insights, setInsights] = useState<Article[]>([]);
  const [trending, setTrending] = useState<Article[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/categories`).then((r) => r.json()),
      fetch(`${API}/api/articles`).then((r) => r.json()),
      fetch(`${API}/api/layout/explore`).then((r) => r.json()),
    ]).then(([cats, arts, layoutRes]) => {
      setCategories(
        cats.map((c: Category) => ({
          ...c,
          color: getBiasColor(c.averageBias),
        })),
      );

      let clean = arts.filter((x: Article) => {
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
        (a: Article, b: Article) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setArticles(clean);

      const components = layoutRes?.components ?? [];
      setLayout(components);

      const count = (type: string) =>
        components.filter((c: LayoutComponent) => c.type === type).length;
      let cursor = 0;
      const next = (n: number) => {
        const slice = clean.slice(cursor, cursor + n);
        cursor += n;
        return slice;
      };

      const heroCount = count("HERO");
      setHeroStory(heroCount ? next(9)[7] : null);

      const insightCount = count("INSIGHT");
      setInsights(next(insightCount));

      const smallCount = count("SMALL");
      setSmall(next(smallCount));

      const listCount = count("LIST");
      setList(next(listCount));

      setHeadlines(next(4));

      const trendingCount = count("HEADLINE");
      setTrending(next(trendingCount));
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

          <QuickAccessPanel list={headlines} />
        </div>
      }
      center={
        <div className="space-y-10">
          <ResultsGrid
            small={small.map((a) => ({ id: a.id, title: a.title, description: a.description, imageUrl: a.imageUrl, sources: a.sources.map((s) => s.url ?? "") }))}
            list={list.map((a) => ({ id: a.id, title: a.title, description: a.description, imageUrl: a.imageUrl, sources: a.sources.map((s) => s.url ?? "") }))}
            heroStory={heroStory ? { id: heroStory.id, title: heroStory.title, description: heroStory.description, summary: heroStory.summary, imageUrl: heroStory.imageUrl, sources: heroStory.sources.map((s) => s.url ?? ""), type: heroStory.type, createdAt: heroStory.createdAt } : { id: "", title: "", description: "", imageUrl: "", sources: [], type: "", createdAt: "" }}
          />
        </div>
      }
      right={
        <div className="space-y-8">
          <TrendingPanel articles={trending} />
          <StoryLiveSignal articles={insights.map((a) => ({ id: a.id, title: a.title, summary: a.summary ?? "" }))} />
        </div>
      }
    />
  );
}
