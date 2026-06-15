"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* NEON FIELD */}
      <div className="absolute inset-0">
        <div
          className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] blur-[140px] animate-pulse"
          style={{ backgroundColor: "var(--primary-soft)" }}
        />

        <div
          className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] blur-[160px] animate-pulse"
          style={{ backgroundColor: "var(--secondary-soft)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <Card
        className="relative w-full max-w-[500px] rounded-[22px] backdrop-blur-3xl"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--primary-border)",
          boxShadow: "0 0 90px var(--primary-glow)",
        }}
      >
        {/* top line */}
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--primary), transparent)",
            boxShadow: "0 0 20px var(--primary)",
          }}
        />

        <CardHeader className="pt-10 pb-6">
          <CardTitle
            className="text-center text-[36px] font-black tracking-[0.25em] uppercase bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--primary), var(--accent), var(--secondary))",
            }}
          >
            {title}
          </CardTitle>

          <p
            className="mt-1 text-center text-[10px] tracking-[0.45em] uppercase"
            style={{ color: "var(--text-faint)" }}
          >
            {subtitle}
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-12 space-y-6">{children}</CardContent>

        {/* bottom line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--secondary), transparent)",
          }}
        />
      </Card>
    </div>
  );
}
