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

const API = process.env.NEXT_PUBLIC_API_URL;

export default function StoriesPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [perspectives, setPerspectives] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  const [hero, setHero] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [small, setSmall] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [anomaly, setAnomaly] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const [catRes, persRes, artRes, layoutRes] = await Promise.all([
        fetch(`${API}/api/categories`).then((r) => r.json()),
        fetch(`${API}/api/perspectives`).then((r) => r.json()),
        fetch(`${API}/api/articles`).then((r) => r.json()),
        fetch(`${API}/api/layout/story`).then((r) => r.json()),
      ]);

      // -------------------------
      // TOPICS + PERSPECTIVES
      // -------------------------
      setTopics(
        catRes.map((c: any) => ({
          label: c.name,
          color: getBiasColor(c.averageBias),
        })),
      );

      setPerspectives(persRes);

      // -------------------------
      // CLEAN + SORT ARTICLES
      // -------------------------
      const clean = artRes
        .filter((x: any) => x.title && x.description && x.imageUrl)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setArticles(clean);

      const components = layoutRes?.components ?? [];

      // -------------------------
      // CURSOR ENGINE (ONLY PLACE THAT ALLOCATES)
      // -------------------------
      let cursor = 0;

      const next = (n: number) => {
        const slice = clean.slice(cursor, cursor + n);
        cursor += n;
        return slice;
      };

      // HERO (always 1)
      const heroCount = components.filter((c: any) => c.type === "HERO").length;
      const heroArticle = heroCount ? next(1)[0] : null;
      setHero(heroArticle);

      // INSIGHTS (LEFT PANEL)
      const insightCount = components.filter(
        (c: any) => c.type === "INSIGHT",
      ).length;
      setInsights(next(insightCount));

      // SMALL (CENTER)
      const smallCount = components.filter(
        (c: any) => c.type === "SMALL",
      ).length;
      setSmall(next(smallCount));

      // LIST (CENTER)
      const listCount = components.filter((c: any) => c.type === "LIST").length;
      setList(next(listCount));

      // HEADLINES (RIGHT)
      const headlineCount = components.filter(
        (c: any) => c.type === "HEADLINE",
      ).length;
      setHeadlines(next(headlineCount));

      // ANOMALY fallback
      setAnomaly(clean[cursor] || null);
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
      left={<StoryLiveSignal articles={insights} />}
      center={
        <>
          {hero && (
            <HeroCard
              id={hero.id}
              type={hero.type}
              createdAt={new Date(hero.createdAt).toLocaleDateString()}
              title={hero.title}
              description={hero.summary}
              sources={hero.sources}
              status="LIVE"
              imageUrl={hero.imageUrl}
            />
          )}

          <StorySplitCard perspectives={perspectives} />

          <StoryLiveStream small={small} list={list} />
        </>
      }
      right={<StoryRightPanel headlines={headlines} anomaly={anomaly} />}
    />
  );
}
