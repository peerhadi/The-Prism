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
          Math.max(0, fetched.length - 56),
          Math.max(28, fetched.length - 28),
        );
        console.log(fetched);
        setHeroStory(fetched[0] || null);
        setFeatured(fetched.slice(1, 3));
        setStream(fetched.slice(3, 5));
        setHeadlines(fetched.slice(5, 8));
        setArticles(fetched);
      });
    console.log(heroStory, articles);
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
      {heroStory && <HeroCard {...heroStory} status="ARCHIVED" />}

      <div className="grid grid-cols-2 gap-8">
        {featured.map((s) => (
          <ShortCard key={s.id} {...s} />
        ))}
      </div>

      <div className="space-y-8">
        <ListCard {...stream[0]} />
        <ListCard {...stream[1]} />
      </div>
    </div>
  );

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
