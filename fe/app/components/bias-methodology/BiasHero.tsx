import { Radar } from "lucide-react";

export default function BiasHero() {
  return (
    <section className="relative overflow-hidden rounded-[50px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">
          <Radar className="h-3 w-3" />
          BIAS INTELLIGENCE SYSTEM
        </div>

        <h1 className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]">
          <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-900 bg-clip-text text-transparent">
            BIAS
          </span>
          <br />
          <span className="text-white">METHODOLOGY</span>
        </h1>

        <p className="mt-8 max-w-4xl text-lg leading-relaxed text-white/50">
          Every article inside Prism receives a Bias Score between{" "}
          <span className="text-cyan-400">0</span> and{" "}
          <span className="text-purple-400">100</span>. It measures framing,
          language, sourcing, and narrative structure—not truth itself.
        </p>
      </div>
    </section>
  );
}
