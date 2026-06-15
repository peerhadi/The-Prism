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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  React.useEffect(() => {
    const t = window.localStorage.getItem("token");
    if (t) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.role === "USER") {
            redirect("/stories");
          }
        })
        .catch(() => {
          redirect("/stories");
        });
    }
  }, []);
  return children;
}
