"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function DashboardSidebar({ navItems }: any) {
  return (
    <aside className="relative z-10 w-72 border-r border-cyan-500/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <LayoutDashboard className="text-cyan-400" />
          <h1 className="text-lg font-black tracking-[0.3em] uppercase text-cyan-300">
            Prism Admin
          </h1>
        </div>

        <div className="space-y-3">
          {navItems.map((item: any) => {
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
  );
}
