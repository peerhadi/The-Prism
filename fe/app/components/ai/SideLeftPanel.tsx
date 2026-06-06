import { BrainCircuit, Activity, Zap, Radio, Cpu } from "lucide-react";

export default function SidePanelLeft() {
  return (
    <aside className="flex flex-col gap-6 max-w-[400px]">
      {/* CORE STATUS */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-2xl">
        {/* glow field */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl opacity-40" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-cyan-400 uppercase">
              Neural Core
            </p>

            <h2 className="mt-2 text-2xl font-black flex items-center gap-2">
              ACTIVE
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            </h2>

            <p className="mt-2 text-xs text-white/40">
              Cognitive engine online • inference pipeline stable
            </p>
          </div>

          <BrainCircuit className="text-cyan-400" />
        </div>

        {/* mini system stats */}
        <div className="mt-5 grid grid-cols-1 gap-3 text-xs">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Cpu size={14} />
              Load
            </div>
            <div className="mt-1 text-cyan-300 font-bold">68%</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Activity size={14} />
              Stability
            </div>
            <div className="mt-1 text-cyan-300 font-bold">OPTIMAL</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Zap size={14} />
              Latency
            </div>
            <div className="mt-1 text-cyan-300 font-bold">42ms</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Radio size={14} />
              Signal
            </div>
            <div className="mt-1 text-cyan-300 font-bold">LOCKED</div>
          </div>
        </div>
      </div>

      {/* SIGNAL FIELD */}
      <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
            Signal Field
          </p>

          <span className="text-[10px] text-cyan-400/70 uppercase tracking-[0.3em]">
            LIVE FEED
          </span>
        </div>

        <h3 className="mt-3 text-sm font-bold text-cyan-300">
          SCANNING INFORMATION SPACE
        </h3>

        <p className="mt-2 text-xs text-white/40 leading-relaxed">
          Monitoring narrative drift across sources. Bias variance currently
          within acceptable threshold.
        </p>

        {/* fake waveform */}
        <div className="mt-4 flex items-end gap-1 h-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] bg-cyan-400/40 rounded-full animate-pulse"
              style={{
                height: `${10 + Math.abs(Math.sin(i * 0.6)) * 30}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
