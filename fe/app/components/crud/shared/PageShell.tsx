"use client";

import React from "react";
import BackgroundFX from "./BackgroundFX";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className }: Props) {
  return (
    <div
      className={`relative min-h-screen text-white bg-[#02040A] ${className}`}
    >
      <BackgroundFX />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        {children}
      </main>
    </div>
  );
}
