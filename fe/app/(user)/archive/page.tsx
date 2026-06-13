"use client";

import { useEffect, useState } from "react";

import ArchiveLayout from "@/app/components/crud/archive/ArchiveLayout";
import { PrismLoader } from "@/app/components/loadingScreen";

import HeroCard from "../components/HeroCard";
import ShortCard from "../components/SmallCard";
import ListCard from "../components/ListCard";
import { HeadlineCard } from "../components/HeadlineCard";

import ArchiveHero from "@/app/components/crud/archive/ArchiveHero";
import ArchiveCategoryIndex from "@/app/components/crud/archive/ArchiveCategoryIndex";
import ArchiveLogs from "@/app/components/crud/archive/ArchiveLogs";
import ArchiveStickyGrid from "@/app/components/crud/archive/ArchiveStickyGrid";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ArchivePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [heroStory, setHeroStory] = useState<any>(null);
  const [featured, setFeatured] = useState<any[]>([]);
  const [stream, setStream] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [catRes, artRes, layoutRes] = await Promise.all([
        fetch(`${API}/api/categories`).then((r) => r.json()),
        fetch(`${API}/api/articles`).then((r) => r.json()),
        fetch(`${API}/api/layout/archive`).then((r) => r.json()),
      ]);

      setCategories(catRes);

      // ---------------------------
      // CLEAN + SORT (LATEST FIRST)
      // ---------------------------
      const clean = artRes
        .filter((x: any) => x.title && x.description && x.imageUrl)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setArticles(clean);

      const components = layoutRes?.components ?? [];

      // ---------------------------
      // CURSOR ENGINE (ONLY LOGIC)
      // ---------------------------
      let cursor = 0;
      const next = (n: number) => clean.slice(cursor, (cursor += n));

      const heroCount = components.filter((c: any) => c.type === "HERO").length;
      const smallCount = components.filter(
        (c: any) => c.type === "SMALL",
      ).length;
      const listCount = components.filter((c: any) => c.type === "LIST").length;
      const insightCount = components.filter(
        (c: any) => c.type === "INSIGHT",
      ).length;
      const headlineCount = components.filter(
        (c: any) => c.type === "HEADLINE",
      ).length;

      // HERO
      setHeroStory(heroCount ? next(1)[0] : null);

      // FEATURED (SMALL CARDS)
      setFeatured(next(smallCount));

      // STREAM (LIST CARDS)
      setStream(next(listCount));
      setInsights(next(insightCount));

      // HEADLINES
      setHeadlines(next(headlineCount));
    };

    load();
  }, []);

  if (!heroStory || !articles.length) return <PrismLoader />;

  // ---------------------------
  // LEFT (UNCHANGED UI, ONLY FEED)
  // ---------------------------
  const left = (
    <div className="space-y-8">
      <ArchiveLogs articles={articles} />
      <StoryLiveSignal articles={insights} />
    </div>
  );

  // ---------------------------
  // CENTER (ONLY USE ALLOCATED DATA)
  // ---------------------------
  const center = (
    <div className="space-y-10">
      {heroStory && <HeroCard {...heroStory} status="ARCHIVED" />}

      <div className="grid grid-cols-2 gap-8">
        {featured.map((s) => (
          <ShortCard key={s.id} {...s} />
        ))}
      </div>

      <div className="space-y-8">
        {stream[0] && <ListCard {...stream[0]} />}
        {stream[1] && <ListCard {...stream[1]} />}
      </div>
    </div>
  );

  // ---------------------------
  // RIGHT (ONLY ORDERED FEED)
  // ---------------------------
  const right = (
    <div className="space-y-8">
      <HeadlineCard
        title="Recovered Headlines"
        data={headlines.map((a) => ({
          sources: a.sources,
          tag: "ARCHIVE",
          time: new Date(a.createdAt).getFullYear().toString(),
          title: a.title,
          variant: "cyan",
        }))}
      />

      <ArchiveCategoryIndex categories={categories} articles={articles} />
    </div>
  );

  return (
    <ArchiveLayout
      hero={<ArchiveHero categories={categories} fileCount={articles.length} />}
      left={left}
      center={center}
      right={right}
    />
  );
}
