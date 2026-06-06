import { Zap } from "lucide-react";

export default function SignalMatrix() {
  const signals = [
    ["Narrative Drift", "97.4%"],
    ["Consensus Sync", "82.1%"],
    ["Emotional Load", "66.8%"],
    ["Visibility Suppression", "41%"],
  ];

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
          Signal Matrix
        </h3>
        <Zap className="h-4 w-4 text-cyan-400" />
      </div>

      <div className="space-y-5">
        {signals.map(([label, val], i) => (
          <div key={i}>
            <div className="mb-2 flex justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase">
              <span>{label}</span>
              <span className="text-cyan-400">{val}</span>
            </div>

            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                style={{ width: val }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
