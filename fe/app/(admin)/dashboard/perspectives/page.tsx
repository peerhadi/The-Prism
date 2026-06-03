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
    <div className="min-h-screen bg-[#02050a] text-white p-10">
      <Breadcrumbs items={[{ label: "Perspectives" }]} />
      <Snackbar
        open={toast}
        message="Perspective field synced"
        onClose={() => setToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-cyan-400">PERSPECTIVES GRID</h1>

        <Link
          href="/dashboard/perspectives/add"
          className="px-5 py-2 border border-cyan-400/40 bg-cyan-400/10
          hover:bg-cyan-400 hover:text-black transition font-bold"
        >
          + NEW PERSPECTIVE
        </Link>
      </div>

      <div className="grid gap-4">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-6 border border-cyan-500/10 bg-white/[0.02]
            hover:border-cyan-400/30 hover:bg-cyan-400/5 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{p.title}</h2>
                <p className="text-cyan-100/40 text-sm">
                  neutral • extreme data layers
                </p>
              </div>

              <Link
                href={`/dashboard/perspectives/${p.id}`}
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
