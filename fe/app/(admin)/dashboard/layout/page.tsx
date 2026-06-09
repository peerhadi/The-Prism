"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layout, BookOpen, Split, Archive } from "lucide-react";

const layouts = [
  {
    id: "stories",
    label: "Stories",
    href: "/dashboard/layout/stories",
    icon: BookOpen,
    desc: "Hero-driven narrative flow",
  },
  {
    id: "explore",
    label: "Explore",
    href: "/dashboard/layout/explore",
    icon: Layout,
    desc: "Dense discovery grid system",
  },
  {
    id: "split",
    label: "Narrative Split",
    href: "/dashboard/layout/split",
    icon: Split,
    desc: "Dual perspective storytelling",
  },
  {
    id: "archive",
    label: "Archive",
    href: "/dashboard/layout/archive",
    icon: Archive,
    desc: "Chronological content log",
  },
];

export default function LayoutDashboardPage() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050a] text-white flex">
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#02050a]" />

        <div className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[600px] w-[600px] rounded-full bg-cyan-400/5 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* ================= MAIN ================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-20">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <p className="text-cyan-400 text-xs tracking-[0.5em] font-black uppercase mb-6">
            PRISM LAYOUT ENGINE
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-none">
            SELECT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-600">
              MODE
            </span>
          </h1>

          <div className="mt-10 text-cyan-100/60 text-lg">
            {greeting}, operator. Choose layout configuration.
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {layouts.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group relative block overflow-hidden border border-cyan-500/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-400">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-black uppercase group-hover:text-cyan-300">
                        {item.label}
                      </h2>
                      <p className="text-cyan-100/50 mt-2">{item.desc}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
