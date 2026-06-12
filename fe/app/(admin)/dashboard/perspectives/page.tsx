"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Snackbar from "@/app/components/Snackbar";
import { motion } from "framer-motion";
import Breadcrumbs from "@/app/components/Breadcrumb";

type Perspective = {
  id: string;
  title: string;
  neutral: any;
  extreme: any;
};

const BREADCRUMBS = [{ label: "Perspectives" }];

const PAGE = {
  title: "PERSPECTIVES GRID",
  toast: "Perspective field synced",
  createHref: "/dashboard/perspectives/add",
  createLabel: "+ NEW PERSPECTIVE",
  subtitle: "neutral • extreme data layers",
};

export default function PerspectivesPage() {
  const [items, setItems] = useState<Perspective[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/perspectives")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
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
      <Breadcrumbs items={BREADCRUMBS} />

      <Snackbar
        open={toast}
        message={PAGE.toast}
        onClose={() => setToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black" style={{ color: "var(--primary)" }}>
          {PAGE.title}
        </h1>

        <Link
          href={PAGE.createHref}
          className="px-5 py-2 font-bold transition rounded-lg"
          style={{
            border: "1px solid var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          {PAGE.createLabel}
        </Link>
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
