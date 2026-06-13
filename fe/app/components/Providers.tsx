"use client";

import { createContext, useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window) {
      let savedTheme = localStorage.getItem("theme");
      if (savedTheme === "system") {
        localStorage.setItem("theme", "light");
        savedTheme = "light";
      }
      if (savedTheme) {
        setTheme(savedTheme);
        document
          .getElementsByTagName("body")[0]
          .classList.toggle("dark", savedTheme === "dark");
      }
    }
  }, []);

  return children;
}
