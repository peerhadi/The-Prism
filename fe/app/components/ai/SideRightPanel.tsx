import { Sparkles, Orbit, Activity, Gauge, Radar, Layers } from "lucide-react";

export default function SidePanelRight() {
  return (
    <aside className="flex flex-col gap-6 max-w-[400px]">
      {/* COGNITIVE CORE */}
      <div
        className="relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* GLOW */}
        <div
          className="absolute inset-0 blur-3xl opacity-40"
          style={{ background: "var(--secondary-glow)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <Sparkles style={{ color: "var(--secondary)" }} />

            <h3
              className="text-lg font-black"
              style={{ color: "var(--text-primary)" }}
            >
              Cognitive Sync
            </h3>
          </div>

          <p
            className="mt-2 text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Real-time alignment of narrative interpretation vectors across
            active models.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ background: "var(--secondary)" }}
            />
            <span style={{ color: "var(--secondary)" }}>SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div
        className="rounded-[28px] border p-6"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Cognitive Metrics
          </p>

          <Radar style={{ color: "var(--secondary)" }} size={16} />
        </div>

        <div className="space-y-4 text-xs">
          {[
            { icon: Gauge, label: "Signal Density", value: "87%" },
            { icon: Activity, label: "AI Load", value: "HIGH" },
            { icon: Layers, label: "Entropy", value: "RISING" },
            { icon: Radar, label: "Consensus Drift", value: "42%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span
                className="flex items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon size={12} />
                {label}
              </span>

              <span className="font-bold" style={{ color: "var(--primary)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div
          className="mt-5 h-1 w-full rounded-full overflow-hidden"
          style={{ background: "var(--surface-secondary)" }}
        >
          <div
            className="h-full w-[62%]"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--secondary))",
            }}
          />
        </div>
      </div>

      {/* ORBIT CORE */}
      <div
        className="relative rounded-[28px] border p-8 flex items-center justify-center overflow-hidden"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* GLOW */}
        <div
          className="absolute inset-0 blur-2xl opacity-30"
          style={{ background: "var(--primary-glow)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <Orbit style={{ color: "var(--primary)" }} />

          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Neural Orbit
          </p>

          <p className="text-xs font-bold" style={{ color: "var(--primary)" }}>
            STABLE ROTATION
          </p>
        </div>
      </div>
    </aside>
  );
}
