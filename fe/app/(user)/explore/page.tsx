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

      fetched = fetched.reverse().slice(Math.max(0, fetched.length - 10));

      const heros = fetched.filter((x: any) => x.type === "HERO");
      const smalls = fetched.filter((x: any) => x.type === "SMALL");
      const lists = fetched.filter((x: any) => x.type === "SMALL");

      setHeroStory(heros[0]);
      setSmall(smalls.slice(0, 4));
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

  if (!articles.length || !list.length || !heroStory) {
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
            heroStory={heroStory}
          />
        </div>
      }
      right={
        <div className="space-y-8">
          <TrendingPanel articles={articles} />
        </div>
      }
    />
  );
}
