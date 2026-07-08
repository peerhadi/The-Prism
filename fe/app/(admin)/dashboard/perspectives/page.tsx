"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Snackbar from "@/app/components/Snackbar";
import { motion } from "framer-motion";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { Eye } from "lucide-react";
import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

type Perspective = {
  id: string;
  title: string;
  neutral: { title: string; summary: string; description: string };
  extreme: { title: string; summary: string; description: string };
};

const BREADCRUMBS = [{ label: "Perspectives" }];

const PAGE = {
  title: "PERSPECTIVES GRID",
  toast: "Perspective field synced",
  createHref: "/dashboard/perspectives/add",
  createLabel: "Generate Perspectives",
  subtitle: "neutral • extreme data layers",
};

export default function PerspectivesPage() {
  const [items, setItems] = useState<Perspective[]>([]);
  const [showToast, setShowToast] = useState(false);

  const [token] = useState(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("token") || ""
      : "",
  );
  useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`).then(
      ({ data, error }) => {
        if (error) return;
        if (data) setItems(data as Perspective[]);
        setShowToast(true);
      },
    );
  }, []);
  const generateFeed = async () => {
    try {
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perspectives/rss/sync`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (error) {
        throw new Error(error);
      }

      toast.success("Successfully generated perspectives", "Success");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate perspectives",
        "Generation Failed",
      );
    }
  };
  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs items={BREADCRUMBS} />

      <Snackbar
        open={showToast}
        message={PAGE.toast}
        onClose={() => setShowToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black" style={{ color: "var(--primary)" }}>
          {PAGE.title}
        </h1>

        <div
          onClick={generateFeed}
          className="px-5 py-2 font-bold transition rounded-lg flex gap-2"
          style={{
            border: "1px solid var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          <Eye />
          {PAGE.createLabel}
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-6 transition rounded-xl"
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.title}
                </h2>

                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {PAGE.subtitle}
                </p>
              </div>

              <Link
                href={`/dashboard/perspectives/${p.id}`}
                style={{ color: "var(--primary)" }}
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
