import { Activity } from "lucide-react";

export default function BiasScale() {
  const scale = [
    {
      range: "0–25",
      label: "Minimal Bias",
      color: "var(--info)",
    },
    {
      range: "25–50",
      label: "Mild Bias",
      color: "var(--success)",
    },
    {
      range: "50–75",
      label: "Noticeable Bias",
      color: "var(--warning)",
    },
    {
      range: "75–100",
      label: "Strong Bias",
      color: "var(--danger)",
    },
  ];

  return (
    <section
      className="mt-12 rounded-[40px] border p-10 backdrop-blur-xl"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <Activity style={{ color: "var(--primary)" }} className="h-5 w-5" />

        <h2
          className="text-[11px] font-black tracking-[0.35em] uppercase"
          style={{ color: "var(--primary)" }}
        >
          SCORE SCALE
        </h2>
      </div>

      {/* BAR */}
      <div
        className="overflow-hidden rounded-full border"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="h-6 bg-gradient-to-r from-cyan-500 via-emerald-500 via-yellow-500 to-red-500" />
      </div>

      {/* SCALE LABELS */}
      <div className="mt-6 grid grid-cols-4 text-center">
        {scale.map((s) => (
          <div key={s.range}>
            <div className="text-3xl font-black" style={{ color: s.color }}>
              {s.range}
            </div>

            <div
              className="mt-2 text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
