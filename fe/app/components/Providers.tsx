"use client";

import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light",
  );

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return children;
}
