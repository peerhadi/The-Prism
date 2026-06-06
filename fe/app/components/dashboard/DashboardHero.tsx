"use client";

import { motion } from "framer-motion";

export default function DashboardHero({ greeting }: any) {
  return (
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
  );
}
