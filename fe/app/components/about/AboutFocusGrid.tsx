"use client";

import { Globe, Scale, Users } from "lucide-react";
import AboutFocusCard from "./AboutFocusCard";

export default function AboutFocusGrid() {
  const items = [
    {
      icon: Scale,
      title: "Narrative Comparison",
      description:
        "Compare how different outlets frame the same event through headlines, tone, language, and emphasis.",
    },
    {
      icon: Globe,
      title: "Global Perspectives",
      description:
        "Explore how the same story changes across countries, political environments, and cultural contexts.",
    },
    {
      icon: Users,
      title: "Reader Awareness",
      description:
        "The goal is not to tell users what to think, but to help them recognize framing patterns and form their own conclusions.",
    },
  ];

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-24"
      style={{ color: "var(--text-primary)" }}
    >
      {/* HEADER */}
      <div className="mb-14 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          What The Prism focuses on
        </h2>

        <div
          className="mt-3 h-[1px] w-24"
          style={{ background: "var(--border)" }}
        />
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <AboutFocusCard
            key={item.title}
            icon={<item.icon size={20} style={{ color: "var(--primary)" }} />}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
