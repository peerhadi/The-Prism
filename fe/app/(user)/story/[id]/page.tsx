import ForensicHero from "@/app/components/article/ForensicHero";
import MetricsGrid from "@/app/components/article/MetricsGrid";
import SignalMatrix from "@/app/components/article/SignalMatrix";
import AlertsPanel from "@/app/components/article/AlertsPanel";
import ArticleBody from "@/app/components/article/ArticleBody";
import LiveFeed from "@/app/components/article/LiveFeed";
import ConfidenceCard from "@/app/components/article/ConfidenceCard";

export default function ForensicSpecimenPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#02040A] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.10),transparent_35%)]" />

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-10">
        <ForensicHero />

        <section className="mt-10 grid gap-10 xl:grid-cols-[280px_1fr_320px]">
          <aside className="space-y-6">
            <AlertsPanel />
          </aside>

          <ArticleBody />

          <aside className="space-y-6">
            <LiveFeed />
            <ConfidenceCard />
          </aside>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
    </div>
  );
}
