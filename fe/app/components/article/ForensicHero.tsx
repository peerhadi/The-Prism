import { Activity, Fingerprint } from "lucide-react";

export default function ForensicHero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      <img
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        alt=""
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02040A]" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            <Activity className="h-3 w-3 animate-pulse" />
            Deep Scan Active
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
            <Fingerprint className="h-3 w-3" />
            Prism-992-Alpha
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none w-full">
          Architects of{" "}
          <span className="inline-block leading-none pb-1 bg-gradient-to-b from-cyan-200 to-cyan-700 bg-clip-text text-transparent">
            Consent
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg text-white/50 leading-relaxed">
          Autonomous systems shape perception through predictive narratives and
          algorithmic reinforcement.
        </p>
      </div>
    </section>
  );
}
