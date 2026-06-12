"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Snackbar from "@/app/components/Snackbar";
import { motion } from "framer-motion";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { PrismLoader } from "@/app/components/loadingScreen";

type Article = {
  id: string;
  title: string;
  categoryId?: string;
  biasLevel: number;
  type: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/articles")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setArticles(data);
        setToast(true);
      });
  }, []);

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs items={[{ label: "Articles" }]} />

      <Snackbar
        open={toast}
        message="Signal stream loaded"
        onClose={() => setToast(false)}
      />

      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-black tracking-tight">
          <span style={{ color: "var(--primary)" }}>ARTICLES</span> GRID
        </h1>

        <Link
          href="/dashboard/articles/add"
          className="px-5 py-2 font-bold tracking-widest transition"
          style={{
            border: "1px solid var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          + NEW ENTRY
        </Link>
      </div>

      <div className="grid gap-4">
        {articles.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-6 transition"
            style={{
              background: "var(--card)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{a.title}</h2>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  type: {a.type} • bias: {a.biasLevel}
                </p>
              </div>

              <Link
                href={`/dashboard/articles/${a.id}`}
                style={{
                  color: "var(--primary)",
                }}
              >
                edit →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
