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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040816] px-4">
      {/* NEON FIELD (UNCHANGED) */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] bg-cyan-400/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] bg-fuchsia-500/10 blur-[160px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <Card className="relative w-full max-w-[500px] rounded-[22px] border border-cyan-300/20 bg-white/5 backdrop-blur-3xl shadow-[0_0_90px_rgba(34,211,238,0.25)]">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#22d3ee]" />

        <CardHeader className="pt-10 pb-6">
          <CardTitle className="text-center text-[36px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-400 uppercase">
            {title}
          </CardTitle>

          <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-cyan-300/60 uppercase">
            {subtitle}
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-12 space-y-6">{children}</CardContent>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      </Card>
    </div>
  );
}
