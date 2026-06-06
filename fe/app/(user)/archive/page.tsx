"use client";

import { useEffect, useState } from "react";

import ArchiveLayout from "@/app/components/crud/archive/ArchiveLayout";
import { PrismLoader } from "@/app/components/loadingScreen";

import GenericObsidianStoryCard from "../components/HeroCard";
import GenericShortStoryCard from "../components/SmallCard";
import GenericCompactListCard from "../components/ListCard";
import { HeadlineCard } from "../components/HeadlineCard";

import ArchiveHero from "@/app/components/crud/archive/ArchiveHero";
import ArchiveCategoryIndex from "@/app/components/crud/archive/ArchiveCategoryIndex";
import ArchiveLogs from "@/app/components/crud/archive/ArchiveLogs";
import ArchiveStickyGrid from "@/app/components/crud/archive/ArchiveStickyGrid";

export default function ArchivePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [heroStory, setHeroStory] = useState<any>(null);
  const [featured, setFeatured] = useState<any[]>([]);
  const [stream, setStream] = useState<any[]>([]);
  const [headlines, setHeadlines] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((r) => r.json())
      .then(setCategories);

    fetch("http://localhost:8080/api/articles")
      .then((r) => r.json())
      .then((fetched) => {
        fetched = fetched.slice(
          Math.max(fetched.length - 56),
          Math.max(28, fetched.length - 28),
        );

        setHeroStory(fetched[0] || null);
        setFeatured(fetched.slice(1, 3));
        setStream(fetched.slice(3, 5));
        setHeadlines(fetched.slice(5, 8));
        setArticles(fetched);
      });
  }, []);

  if (!heroStory || !articles.length) return <PrismLoader />;

  const left = (
    <div className="space-y-8">
      <ArchiveLogs articles={articles} />
      <ArchiveStickyGrid articles={articles} />
    </div>
  );

  const center = (
    <div className="space-y-10">
      {heroStory && (
        <GenericObsidianStoryCard {...heroStory} status="ARCHIVED" />
      )}

      <div className="grid grid-cols-2 gap-8">
        {featured.map((s) => (
          <GenericShortStoryCard key={s.id} {...s} />
        ))}
      </div>

      <div className="space-y-8">
        <GenericCompactListCard {...stream[0]} />
        <GenericCompactListCard {...stream[1]} />
      </div>
    </div>
  );

  const right = (
    <div className="space-y-8">
      <HeadlineCard
        title="Recovered Headlines"
        data={headlines.map((a) => ({
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
      hero={<ArchiveHero categories={categories} />}
      left={left}
      center={center}
      right={right}
    />
  );
}
