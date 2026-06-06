"use client";

import React, { useEffect, useState } from "react";

import StoryPageLayout from "@/app/components/crud/story/StoryPageLayout";
import StoryHeroHeader from "@/app/components/crud/story/StoryHeroHeader";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";
import StoryLiveStream from "@/app/components/crud/story/StoryLiveStream";
import StorySplitCard from "@/app/components/crud/story/StorySplitCard";
import StoryRightPanel from "@/app/components/crud/story/StoryRightPanel";

import { PrismLoader } from "@/app/components/loadingScreen";
import { getBiasColor } from "@/app/utils/getbiascolor";
import GenericObsidianStoryCard from "../components/HeroCard";

export default function StoriesPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [perspectives, setPerspectives] = useState<any[]>([]);

  const [hero, setHero] = useState<any>(null);
  const [small, setSmall] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [anomaly, setAnomaly] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((r) => r.json())
      .then((res) =>
        setTopics(
          res.map((c: any) => ({
            label: c.name,
            color: getBiasColor(c.averageBias),
          })),
        ),
      );

    fetch("http://localhost:8080/api/perspectives")
      .then((r) => r.json())
      .then(setPerspectives);

    fetch("http://localhost:8080/api/articles")
      .then((r) => r.json())
      .then((fetched) => {
        const clean = fetched.filter(
          (x: any) => x.title && x.description && x.imageUrl,
        );

        const sliced = clean.slice(-28).reverse();

        const heros = sliced.filter((x: any) => x.type === "HERO");
        const smalls = sliced.filter((x: any) => x.type === "SMALL");

        setHero(heros[0] || null);
        setSmall(smalls.slice(0, 2));
        setList(smalls.slice(0, 2));
        setHeadlines(sliced.slice(0, 5));
        setAnomaly(smalls[2] || null);

        setArticles(sliced);
      });
  }, []);

  if (!articles.length || !perspectives.length) return <PrismLoader />;

  return (
    <StoryPageLayout
      hero={
        <StoryHeroHeader
          topics={topics}
          stats={[
            { label: "Global Feeds", value: "12.4K" },
            { label: "Threat Nodes", value: "847" },
            { label: "AI Signatures", value: "31K" },
            { label: "Signal Drift", value: "74%" },
          ]}
        />
      }
      left={<StoryLiveSignal articles={articles} />}
      center={
        <>
          {hero && (
            <GenericObsidianStoryCard
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
