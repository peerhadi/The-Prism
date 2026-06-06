"use client";

import {
  AboutHero,
  AboutFocusGrid,
  AboutDeveloper,
} from "@/app/components/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AboutHero />
      <AboutFocusGrid />
      <AboutDeveloper />
    </div>
  );
}
