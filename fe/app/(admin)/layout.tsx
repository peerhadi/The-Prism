"use client";
if (typeof window !== "undefined") {
  const origError = console.error;

  console.error = (...args) => {
    const text = args.map(String).join(" ");

    if (
      text.includes("A tree hydrated but some attributes") ||
      text.includes("Hydration failed") ||
      text.includes("hydrated") ||
      text.includes("didn't match the client properties")
    ) {
      return;
    }

    origError.apply(console, args);
  };
}
import React from "react";
import { redirect } from "next/navigation";
import { fetcher } from "@/lib/api/fetcher";
import { toast } from "@/lib/toast/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  React.useEffect(() => {
    const t = window.localStorage.getItem("token");
    if (t) {
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${t}` },
      }).then(({ data, error }) => {
        if (error) { toast.error(error, "Auth Check Failed"); return; }
        if (data && (data as { role: string }).role === "USER") {
          redirect("/stories");
        }
      });
    }
  }, []);
  return children;
}
