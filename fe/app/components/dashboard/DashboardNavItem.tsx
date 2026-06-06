"use client";

import Link from "next/link";

export default function DashboardNavItem({ item }: any) {
  const Icon = item.icon;

  return (
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
  );
}
