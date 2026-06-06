"use client";

import { motion } from "framer-motion";
import DashboardNavItem from "./DashboardNavItem";

export default function DashboardNavGrid({ items }: any) {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
      {items.map((item: any, i: number) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <DashboardNavItem item={item} />
        </motion.div>
      ))}
    </div>
  );
}
