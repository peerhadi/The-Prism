"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Tags, Eye, Users, LayoutDashboard } from "lucide-react";
import Breadcrumbs from "@/app/components/Breadcrumb";

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
];

export default function AdminDashboard() {
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

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full border border-cyan-400/10 bg-cyan-400/5 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
          className="absolute bottom-[10%] right-[10%] h-96 w-96 rounded-full border border-blue-400/10 bg-blue-500/5 blur-3xl"
        />
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside className="relative z-10 w-72 border-r border-cyan-500/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <LayoutDashboard className="text-cyan-400" />
            <h1 className="text-lg font-black tracking-[0.3em] uppercase text-cyan-300">
              Prism Admin
            </h1>
          </div>

          <div className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-cyan-400/20 hover:bg-cyan-400/5 transition"
                >
                  <Icon size={18} className="text-cyan-400" />
                  <span className="text-white/80">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-cyan-400/40 tracking-[0.4em] uppercase">
          SYSTEM ONLINE
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <p className="text-cyan-400 text-xs tracking-[0.5em] font-black uppercase mb-6">
            PRISM CONTROL SYSTEM
          </p>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            ADMIN
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-600">
              SPECTRUM
            </span>
          </h1>

          <div className="mt-10 text-cyan-100/60 text-lg">
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
                  className="group relative block overflow-hidden border border-cyan-500/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-400">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight group-hover:text-cyan-300">
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
