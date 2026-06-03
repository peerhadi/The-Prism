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
    <div className="min-h-screen bg-[#02050a] text-white p-10">
      <Breadcrumbs items={[{ label: "Articles" }]} />
      <Snackbar
        open={toast}
        message="Signal stream loaded"
        onClose={() => setToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="text-cyan-400">ARTICLES</span> GRID
        </h1>

        <Link
          href="/dashboard/articles/add"
          className="px-5 py-2 border border-cyan-400/40 bg-cyan-400/10
          hover:bg-cyan-400 hover:text-black transition font-bold tracking-widest"
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
            className="p-6 border border-cyan-500/10 bg-white/[0.02]
            hover:bg-cyan-400/5 hover:border-cyan-400/30 transition"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{a.title}</h2>
                <p className="text-cyan-100/40 text-sm mt-1">
                  type: {a.type} • bias: {a.biasLevel}
                </p>
              </div>

              <Link
                href={`/dashboard/articles/${a.id}`}
                className="text-cyan-400 hover:text-cyan-200"
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
