"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Tags,
  Eye,
  Users,

  Layout,
} from "lucide-react";

const navItems = [
  {
    id: "articles",
    label: "Articles",
    href: "/dashboard/articles",
    icon: FileText,
    desc: "Manage and publish stories",
  },
  {
    id: "categories",
    label: "Categories",
    href: "/dashboard/categories",
    icon: Tags,
    desc: "Organize content structure",
  },
  {
    id: "perspectives",
    label: "Perspectives",
    href: "/dashboard/perspectives",
    icon: Eye,
    desc: "Control framing & bias layers",
  },
  {
    id: "users",
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
    desc: "User management & permissions",
  },
  {
    id: "layout",
    label: "Layout",
    href: "/dashboard/layout",
    icon: Layout,
    desc: "Layout management & editing",
  },
];

export default function AdminDashboard() {
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
      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "var(--background)",
          }}
        />

        <div
          className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{
            background: "var(--primary-glow)",
          }}
        />

        <div
          className="absolute top-[40%] right-[-10%] h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{
            background: "var(--secondary-glow)",
          }}
        />

        <div
          className="absolute bottom-[-20%] left-[30%] h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{
            background: "var(--accent-glow)",
          }}
        />

        <div
          className="absolute inset-0 bg-[size:50px_50px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
            `,
          }}
        />

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full blur-3xl"
          style={{
            border: "1px solid var(--primary-border)",
            background: "var(--primary-soft)",
          }}
        />

        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
          className="absolute bottom-[10%] right-[10%] h-96 w-96 rounded-full blur-3xl"
          style={{
            border: "1px solid var(--secondary-border)",
            background: "var(--secondary-soft)",
          }}
        />
      </div>

      {/* ================= SIDEBAR ================= */}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <p
            className="text-xs tracking-[0.5em] font-black uppercase mb-6"
            style={{
              color: "var(--primary)",
            }}
          >
            PRISM CONTROL SYSTEM
          </p>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            ADMIN
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, var(--text-primary), var(--primary), var(--secondary))",
              }}
            >
              SPECTRUM
            </span>
          </h1>

          <div
            className="mt-10 text-lg"
            style={{
              color: "var(--text-muted)",
            }}
          >
            {greeting}, operator. System integrity nominal.
          </div>
        </motion.div>

        {/* CARDS */}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {navItems.map((item, i) => {
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
                  className="group relative block overflow-hidden p-8 backdrop-blur-xl transition-all"
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
                      <h2 className="text-2xl font-black uppercase tracking-tight">
                        {item.label}
                      </h2>

                      <p
                        className="mt-2"
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                    style={{
                      background: "var(--primary)",
                    }}
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
