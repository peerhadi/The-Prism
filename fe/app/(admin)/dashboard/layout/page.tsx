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
    <div
      className="relative min-h-screen overflow-hidden flex"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--background)" }}
        />

        <div
          className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{ background: "var(--primary-glow)" }}
        />

        <div
          className="absolute top-[40%] right-[-10%] h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{ background: "var(--secondary-glow)" }}
        />

        <div
          className="absolute bottom-[-20%] left-[30%] h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{ background: "var(--accent-glow)" }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <p
            className="text-xs tracking-[0.5em] font-black uppercase mb-6"
            style={{ color: "var(--primary)" }}
          >
            PRISM LAYOUT ENGINE
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-none">
            SELECT
            <br />
            <span
              style={{
                background: `linear-gradient(
                  to bottom,
                  var(--accent),
                  var(--primary),
                  var(--secondary)
                )`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              MODE
            </span>
          </h1>

          <div className="mt-10 text-lg" style={{ color: "var(--text-muted)" }}>
            {greeting}, operator. Choose layout configuration.
          </div>
        </motion.div>

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
                  className="group relative block overflow-hidden p-8 transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        border: "1px solid var(--primary-border)",
                        background: "var(--primary-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2
                        className="text-2xl font-black uppercase"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.label}
                      </h2>

                      <p
                        className="mt-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                    style={{ background: "var(--primary)" }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
