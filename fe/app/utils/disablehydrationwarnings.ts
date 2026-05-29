"use client";

import { useEffect } from "react";

export function DisableHydrationWarnings() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args) => {
      const text = args.map((arg) => String(arg)).join(" ");

      if (
        text.includes("A tree hydrated but some attributes") ||
        text.includes("Hydration failed") ||
        text.includes("hydrated") ||
        text.includes("didn't match the client properties") ||
        text.includes("server rendered HTML")
      ) {
        return;
      }

      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
