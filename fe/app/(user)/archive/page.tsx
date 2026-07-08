"use client";

import { useEffect, useState } from "react";

import { Article } from "@/lib/api/articles/types";
import { Category } from "@/lib/api/categories/types";
import ArchiveLayout from "@/app/components/crud/archive/ArchiveLayout";
import { PrismLoader } from "@/app/components/loadingScreen";

import HeroCard from "../components/HeroCard";
import ShortCard from "../components/SmallCard";
import ListCard from "../components/ListCard";
import { HeadlineCard } from "../components/HeadlineCard";

import ArchiveHero from "@/app/components/crud/archive/ArchiveHero";
import ArchiveCategoryIndex from "@/app/components/crud/archive/ArchiveCategoryIndex";
import ArchiveLogs from "@/app/components/crud/archive/ArchiveLogs";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";
import { fetcher } from "@/lib/api/fetcher";
import { toast } from "@/lib/toast/toast";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ArchivePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [heroStory, setHeroStory] = useState<Article | null>(null);
  const [featured, setFeatured] = useState<Article[]>([]);
  const [stream, setStream] = useState<Article[]>([]);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [insights, setInsights] = useState<Article[]>([]);

  useEffect(() => {
    const load = async () => {
      const [catRes, artRes, layoutRes] = await Promise.all([
        fetcher<any[]>(`${API}/api/categories`),
        fetcher<any[]>(`${API}/api/articles`),
        fetcher<{ components: any[] }>(`${API}/api/layout/archive`),
      ]);

      const errors = [catRes, artRes, layoutRes].map(r => r.error).filter(Boolean);
      if (errors.length) { toast.error(errors.join(", "), "Load Error"); return; }

      const cats = catRes.data;
      const arts = artRes.data;
      const layout = layoutRes.data;

      if (cats) setCategories(cats);

      const raw = arts ?? [];
      const clean = raw
        .filter((x: Article) => x.title && x.description && x.imageUrl)
        .sort(
          (a: Article, b: Article) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setArticles(clean);

      const components = layout?.components ?? [];

      let cursor = 0;
      const next = (n: number) => clean.slice(cursor, (cursor += n));

      const heroCount = components.filter((c: { type: string }) => c.type === "HERO").length;
      const smallCount = components.filter(
        (c: { type: string }) => c.type === "SMALL",
      ).length;
      const listCount = components.filter((c: { type: string }) => c.type === "LIST").length;
      const insightCount = components.filter(
        (c: { type: string }) => c.type === "INSIGHT",
      ).length;
      const headlineCount = components.filter(
        (c: { type: string }) => c.type === "HEADLINE",
      ).length;

      setHeroStory(heroCount ? next(1)[0] : null);
      setFeatured(next(smallCount));
      setStream(next(listCount));
      setInsights(next(insightCount));
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
      {heroStory && (
        <HeroCard
          id={heroStory.id}
          type={heroStory.type}
          createdAt={heroStory.createdAt ?? ""}
          title={heroStory.title}
          description={heroStory.summary ?? heroStory.description}
          sources={heroStory.sources.map((s) => ({ source: s, title: s, url: s }))}
          status="ARCHIVED"
          imageUrl={heroStory.imageUrl ?? ""}
        />
      )}

      <div className="grid grid-cols-2 gap-8">
        {featured.map((s) => (
          <ShortCard
            key={s.id}
            id={s.id}
            badge="FEATURED"
            title={s.title}
            description={s.description}
            imageUrl={s.imageUrl ?? ""}
            sources={s.sources}
          />
        ))}
      </div>

      <div className="space-y-8">
        {stream[0] && (
          <ListCard
            id={stream[0].id}
            title={stream[0].title}
            description={stream[0].description}
            imageUrl={stream[0].imageUrl ?? ""}
            sources={stream[0].sources.map((s) => ({ source: s, title: s, url: s }))}
          />
        )}
        {stream[1] && (
          <ListCard
            id={stream[1].id}
            title={stream[1].title}
            description={stream[1].description}
            imageUrl={stream[1].imageUrl ?? ""}
            sources={stream[1].sources.map((s) => ({ source: s, title: s, url: s }))}
          />
        )}
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
          id: a.id,
          sources: a.sources.map((s) => ({ source: s, title: s, url: s })),
          tag: "ARCHIVE",
          time: new Date(a.createdAt).getFullYear().toString(),
          title: a.title,
          variant: "cyan" as const,
        }))}
      />

      <ArchiveCategoryIndex categories={categories} articles={articles} />
    </div>
  );
  if (!articles.length || !categories.length) return <PrismLoader />;
  return (
    <ArchiveLayout
      hero={<ArchiveHero categories={categories} fileCount={articles.length} />}
      left={left}
      center={center}
      right={right}
    />
  );
}
