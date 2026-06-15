"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Snackbar from "@/app/components/Snackbar";
import { motion } from "framer-motion";
import Breadcrumbs from "@/app/components/Breadcrumb";

type Category = {
  id: string;
  name: string;
  averageBias: number;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
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
      <Breadcrumbs items={[{ label: "Categories" }]} />

      <Snackbar
        open={toast}
        message="Category spectrum loaded"
        onClose={() => setToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1
          className="text-4xl font-black"
          style={{
            color: "var(--primary)",
          }}
        >
          CATEGORIES GRID
        </h1>

        <Link
          href="/dashboard/categories/add"
          className="px-5 py-2 border transition font-bold"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          + NEW CATEGORY
        </Link>
      </div>

      <div className="grid gap-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-6 border transition"
            style={{
              background: "var(--card)",
              borderColor: "var(--card-border)",
            }}
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{c.name}</h2>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  avg bias: {c.averageBias}
                </p>
              </div>

              <Link
                href={`/dashboard/categories/${c.id}`}
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
