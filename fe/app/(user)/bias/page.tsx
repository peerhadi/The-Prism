import BiasHero from "@/app/components/bias-methodology/BiasHero";
import BiasScale from "@/app/components/bias-methodology/BiasScale";
import BiasRanges from "@/app/components/bias-methodology/BiasRanges";
import HowItWorks from "@/app/components/bias-methodology/HowItWorks";

export default function BiasMethodologyPage() {
  const ranges = [
    {
      title: "0 — 25",
      subtitle: "MINIMAL BIAS",
      description: "Neutral language and balanced sourcing patterns dominate.",
      points: [
        "Fact-focused reporting",
        "Limited emotional framing",
        "Multiple viewpoints",
        "Clear fact/opinion separation",
      ],
    },
    {
      title: "25 — 50",
      subtitle: "MILD BIAS",
      description: "Subtle framing begins influencing interpretation.",
      points: [
        "Selective emphasis",
        "Minor narrative preference",
        "Moderate persuasion",
        "Slight sourcing asymmetry",
      ],
    },
    {
      title: "50 — 75",
      subtitle: "NOTICEABLE BIAS",
      description: "Framing strongly influences perception.",
      points: [
        "Strong narrative structure",
        "Emotional language",
        "One-sided sourcing",
        "Opinion-driven tone",
      ],
    },
    {
      title: "75 — 100",
      subtitle: "STRONG BIAS",
      description: "Highly ideological or persuasive framing.",
      points: [
        "Loaded language",
        "Heavy emotional framing",
        "Single perspective",
        "Narrative-first reporting",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-10">
        <BiasHero />
        <BiasScale />
        <BiasRanges ranges={ranges} />
        <HowItWorks />
      </main>
    </div>
  );
}
