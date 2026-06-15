import { BrainCircuit, Activity, Zap, Radio, Cpu } from "lucide-react";

export default function SidePanelLeft() {
  return (
    <aside className="flex flex-col gap-6 max-w-[400px]">
      {/* CORE STATUS */}
      <div
        className="relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-2xl"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* GLOW FIELD */}
        <div
          className="absolute inset-0 blur-3xl opacity-40"
          style={{ background: "var(--primary-glow)" }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "var(--primary)" }}
            >
              Neural Core
            </p>

            <h2
              className="mt-2 text-2xl font-black flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              ACTIVE
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "var(--primary)" }}
              />
            </h2>

            <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
              Cognitive engine online • inference pipeline stable
            </p>
          </div>

          <BrainCircuit style={{ color: "var(--primary)" }} />
        </div>

        {/* MINI STATS */}
        <div className="mt-5 grid grid-cols-1 gap-3 text-xs">
          {[
            { icon: Cpu, label: "Load", value: "68%" },
            { icon: Activity, label: "Stability", value: "OPTIMAL" },
            { icon: Zap, label: "Latency", value: "42ms" },
            { icon: Radio, label: "Signal", value: "LOCKED" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-lg border p-3"
              style={{
                background: "var(--surface-secondary)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon size={14} />
                {label}
              </div>

              <div
                className="mt-1 font-bold"
                style={{ color: "var(--primary)" }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNAL FIELD */}
      <div
        className="relative rounded-[28px] border p-6 backdrop-blur-xl"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between">
          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Signal Field
          </p>

          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--primary)" }}
          >
            LIVE FEED
          </span>
        </div>

        <h3
          className="mt-3 text-sm font-bold"
          style={{ color: "var(--primary)" }}
        >
          SCANNING INFORMATION SPACE
        </h3>

        <p
          className="mt-2 text-xs leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Monitoring narrative drift across sources. Bias variance currently
          within acceptable threshold.
        </p>

        {/* WAVEFORM */}
        <div className="mt-4 flex items-end gap-1 h-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                background: "var(--primary-soft)",
                height: `${10 + Math.abs(Math.sin(i * 0.6)) * 30}%`,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
