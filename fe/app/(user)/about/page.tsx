"use client";

import {
  AboutHero,
  AboutFocusGrid,
  AboutDeveloper,
} from "@/app/components/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <AboutHero />

      <div className="mx-auto max-w-7xl px-6">
        <AboutFocusGrid />
        <AboutDeveloper />
      </div>
    </div>
  );
}
