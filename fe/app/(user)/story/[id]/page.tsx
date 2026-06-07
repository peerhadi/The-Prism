"use client";
import ForensicHero from "@/app/components/article/ForensicHero";
import MetricsGrid from "@/app/components/article/MetricsGrid";
import SignalMatrix from "@/app/components/article/SignalMatrix";
import ArticleBody from "@/app/components/article/ArticleBody";
import LiveFeed from "@/app/components/article/LiveFeed";
import ConfidenceCard from "@/app/components/article/ConfidenceCard";
import { useParams } from "next/navigation";
import { Article } from "@/lib/api/articles/types";
import React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";
import ArticleNotFound from "@/app/components/article/ArticleNotFound";
import { HeadlineCard } from "../../components/HeadlineCard";

export default function ForensicSpecimenPage() {
  const { id } = useParams();
  const [article, setArticle] = React.useState<Article>();
  const [articles, setArticles] = React.useState<Article[]>();
  React.useEffect(() => {
    fetch(`http://localhost:8080/api/articles/${id}`)
      .then((res) => res.json())
      .then(setArticle);

    fetch(`http://localhost:8080/api/articles`)
      .then((res) => res.json())
      .then(setArticles);
  }, []);
  if (!article || !articles) {
    return <ArticleNotFound />;
  }
  return (
    <div className="min-h-screen overflow-hidden bg-[#02040A] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.10),transparent_35%)]" />

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-10">
        <ForensicHero title={article.title} imageUrl={article.imageUrl || ""} />

        <section className="mt-10 grid gap-10 xl:grid-cols-[280px_1fr_320px]">
          <aside className="space-y-6">
            <HeadlineCard
              title={"Live Headlines"}
              data={articles.slice(0, 8)}
            />
          </aside>

          <ArticleBody article={article} />

          <aside className="space-y-6">
            <LiveFeed feed={articles.slice(8, 16).map((x) => x.title)} />
          </aside>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
    </div>
  );
}
