"use client";

import { motion } from "framer-motion";

export default function DashboardBackground() {
  return (
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
  );
}
