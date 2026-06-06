import { Sparkles, Orbit, Activity, Gauge, Radar, Layers } from "lucide-react";

export default function SidePanelRight() {
  return (
    <aside className="flex flex-col gap-6 max-w-[400px]">
      {/* COGNITIVE CORE */}
      <div className="relative overflow-hidden rounded-[28px] border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-purple-500/10 blur-3xl opacity-40" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-400" />
            <h3 className="text-lg font-black">Cognitive Sync</h3>
          </div>

          <p className="mt-2 text-xs text-white/40 leading-relaxed">
            Real-time alignment of narrative interpretation vectors across
            active models.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300">SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
            Cognitive Metrics
          </p>

          <Radar className="text-purple-400" size={16} />
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white/40 flex items-center gap-2">
              <Gauge size={12} /> Signal Density
            </span>
            <span className="text-cyan-300 font-bold">87%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 flex items-center gap-2">
              <Activity size={12} /> AI Load
            </span>
            <span className="text-cyan-300 font-bold">HIGH</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 flex items-center gap-2">
              <Layers size={12} /> Entropy
            </span>
            <span className="text-cyan-300 font-bold">RISING</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/40 flex items-center gap-2">
              <Radar size={12} /> Consensus Drift
            </span>
            <span className="text-cyan-300 font-bold">42%</span>
          </div>
        </div>

        {/* mini progress visualization */}
        <div className="mt-5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[62%] bg-gradient-to-r from-purple-400 to-cyan-400" />
        </div>
      </div>

      {/* ORBIT CORE */}
      <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-2xl opacity-30" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <Orbit className="text-cyan-400" />

          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
            Neural Orbit
          </p>

          <p className="text-xs text-cyan-300 font-bold">STABLE ROTATION</p>
        </div>
      </div>
    </aside>
  );
}
