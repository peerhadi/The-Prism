"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authenticated, setAuthenticated] = useState<Boolean | null>(null);
  useEffect(() => {
    if (typeof window != "undefined") {
      setAuthenticated(!!window.localStorage.getItem("token"));
    }
    if (authenticated) {
      redirect("/login");
    }
  }, []);
  return children;
}
