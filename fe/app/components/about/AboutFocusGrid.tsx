"use client";

import { Globe, Scale, Users } from "lucide-react";
import AboutFocusCard from "./AboutFocusCard";

export default function AboutFocusGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          What The Prism focuses on
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AboutFocusCard
          icon={<Scale size={20} />}
          title="Narrative Comparison"
          description="Compare how different outlets frame the same event through headlines, tone, language, and emphasis."
        />

        <AboutFocusCard
          icon={<Globe size={20} />}
          title="Global Perspectives"
          description="Explore how the same story changes across countries, political environments, and cultural contexts."
        />

        <AboutFocusCard
          icon={<Users size={20} />}
          title="Reader Awareness"
          description="The goal is not to tell users what to think, but to help them recognize framing patterns and form their own conclusions."
        />
      </div>
    </section>
  );
}
