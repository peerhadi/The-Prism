"use client";
import ForensicHero from "@/app/components/article/ForensicHero";
import ArticleBody from "@/app/components/article/ArticleBody";
import LiveFeed from "@/app/components/article/LiveFeed";
import ArticleNotFound from "@/app/components/article/ArticleNotFound";
import { HeadlineCard } from "../../components/HeadlineCard";
import { useParams } from "next/navigation";
import { Article } from "@/lib/api/articles/types";
import React from "react";

export default function ForensicSpecimenPage() {
  const { id } = useParams();

  const [article, setArticle] = React.useState<Article>();
  const [articles, setArticles] = React.useState<Article[]>();

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`)
      .then((res) => res.json())
      .then(setArticle);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`)
      .then((res) => res.json())
      .then(setArticles);
  }, [id]);

  if (!article || !articles) {
    return <ArticleNotFound />;
  }

  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        text-[var(--text-primary)]
        bg-[var(--background)]
      "
    >
      {/* Background Glow */}
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at top, var(--primary-glow), transparent 35%)",
        }}
      />

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-10">
        <ForensicHero title={article.title} imageUrl={article.imageUrl || ""} />

        <section className="mt-10 grid gap-10 xl:grid-cols-[280px_1fr_320px]">
          <aside className="space-y-6">
            <HeadlineCard title="LIVE HEADLINES" data={articles.slice(0, 8)} />
          </aside>

          <ArticleBody article={article} />

          <aside className="space-y-6">
            <LiveFeed feed={articles.slice(8, 16)} />
          </aside>
        </section>
      </main>

      {/* Bottom Scan Line */}
      <div
        className="fixed bottom-0 left-0 z-50 h-[2px] w-full"
        style={{
          background: "var(--primary)",
          boxShadow: "0 0 15px var(--primary-glow)",
        }}
      />
    </div>
  );
}
