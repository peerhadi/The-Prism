import { Brain, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="mt-16 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3">
        <Brain className="h-5 w-5 text-purple-400" />
        <h2 className="text-[11px] font-black tracking-[0.35em] uppercase text-purple-400">
          HOW PRISM CALCULATES BIAS
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          "Language Analysis",
          "Narrative Framing",
          "Source Diversity",
          "Context Balance",
        ].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-black/20 p-6"
          >
            <Sparkles className="mb-4 h-6 w-6 text-cyan-400" />
            <h3 className="font-black">{item}</h3>
            <p className="mt-3 text-sm text-white/50">
              Evaluated by Prism's editorial intelligence system.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-white/70 leading-relaxed">
          Bias scores are transparency signals. They reflect framing, not truth.
        </p>
      </div>
    </section>
  );
}
