"use client";

import React, { useEffect, useState } from "react";

import StoryPageLayout from "@/app/components/crud/story/StoryPageLayout";
import StoryHeroHeader from "@/app/components/crud/story/StoryHeroHeader";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";
import StoryLiveStream from "@/app/components/crud/story/StoryLiveStream";
import StorySplitCard from "@/app/components/crud/story/StorySplitCard";

import { PrismLoader } from "@/app/components/loadingScreen";
import HeroCard from "../components/HeroCard";
import { getBiasColor } from "@/app/utils/getbiascolor";
import StoryRightPanel from "@/app/components/crud/story/StoryRightPanel";

interface Topic {
  id: string;
  name: string;
  averageBias: number;
  label?: string;
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
}

interface LayoutComponent {
  type: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function StoriesPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [perspectives, setPerspectives] = useState<unknown[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const [hero, setHero] = useState<Article | null>(null);
  const [insights, setInsights] = useState<Article[]>([]);
  const [small, setSmall] = useState<Article[]>([]);
  const [list, setList] = useState<Article[]>([]);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [anomaly, setAnomaly] = useState<Article | null>(null);

  useEffect(() => {
    const load = async () => {
      const [catRes, persRes, artRes, layoutRes] = await Promise.all([
        fetch(`${API}/api/categories`).then((r) => r.json()),
        fetch(`${API}/api/perspectives`).then((r) => r.json()),
        fetch(`${API}/api/articles`).then((r) => r.json()),
        fetch(`${API}/api/layout/story`).then((r) => r.json()),
      ]);

      setTopics(
        catRes.map((c: Topic) => ({
          id: c.id,
          name: c.name,
          averageBias: c.averageBias,
          label: c.name,
          color: getBiasColor(c.averageBias),
        })),
      );

      setPerspectives(persRes);

      const clean = artRes
        .filter((x: Article) => x.title && x.description && x.imageUrl)
        .sort(
          (a: Article, b: Article) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setArticles(clean);

      const components = layoutRes?.components ?? [];

      let cursor = 0;

      const next = (n: number) => {
        const slice = clean.slice(cursor, cursor + n);
        cursor += n;
        return slice;
      };

      const heroCount = components.filter((c: LayoutComponent) => c.type === "HERO").length;
      const heroArticle = heroCount ? next(5)[2] : null;
      setHero(heroArticle);

      const insightCount = components.filter(
        (c: LayoutComponent) => c.type === "INSIGHT",
      ).length;
      setInsights(next(insightCount));

      const smallCount = components.filter(
        (c: LayoutComponent) => c.type === "SMALL",
      ).length;
      setSmall(next(smallCount));

      const listCount = components.filter((c: LayoutComponent) => c.type === "LIST").length;
      setList(next(listCount));

      const headlineCount = components.filter(
        (c: LayoutComponent) => c.type === "HEADLINE",
      ).length;
      setHeadlines(next(headlineCount));

      const anom = heroArticle;
      console.log(anom, "Anomly");
      setAnomaly(anom);
    };

    load();
  }, []);

  if (!articles.length || !perspectives.length) {
    return <PrismLoader />;
  }

  return (
    <StoryPageLayout
      hero={
        <StoryHeroHeader
          topics={topics}
          stats={[
            { label: "Global Feeds", value: articles.length },
            { label: "Threat Nodes", value: Math.floor(articles.length / 8) },
            { label: "AI Signatures", value: Math.floor(articles.length / 2) },
            { label: "Signal Drift", value: (articles.length % 100) + "%" },
          ]}
        />
      }
      left={<StoryLiveSignal articles={insights.map((a) => ({ id: a.id, title: a.title, summary: a.summary ?? "" }))} />}
      center={
        <>
          {hero && (
            <HeroCard
              id={hero.id}
              type={hero.type}
              createdAt={new Date(hero.createdAt ?? "").toLocaleDateString()}
              title={hero.title}
              description={hero.summary ?? ""}
              sources={hero.sources.map((s) => ({ source: s.url ?? "", title: s.url ?? "", url: s.url ?? "" }))}
              status="LIVE"
              imageUrl={hero.imageUrl}
            />
          )}

          <StorySplitCard perspectives={perspectives as { neutral: { title: string; description: string }; extreme: { title: string; description: string } }[]} />

          <StoryLiveStream
            small={small.map((a) => ({ id: a.id, title: a.title, description: a.description, imageUrl: a.imageUrl, sources: a.sources.map((s) => s.url ?? "") }))}
            list={list.map((a) => ({ id: a.id, title: a.title, description: a.description, imageUrl: a.imageUrl, sources: a.sources.map((s) => ({ source: s.url ?? "", title: s.url ?? "", url: s.url ?? "" })) }))}
          />
        </>
      }
      right={<StoryRightPanel
        headlines={headlines.map((h) => ({ id: h.id, title: h.title, tag: h.type, time: new Date(h.createdAt).toLocaleDateString(), sources: h.sources.map((s) => ({ source: s.url ?? "", title: s.url ?? "", url: s.url ?? "" })), variant: undefined }))}
        anomaly={anomaly ? { id: anomaly.id, title: anomaly.title, description: anomaly.description, sources: anomaly.sources.map((s) => ({ source: s.url ?? "", title: s.url ?? "", url: s.url ?? "" })), biasLevel: "", imageUrl: anomaly.imageUrl } : null}
      />}
    />
  );
}
