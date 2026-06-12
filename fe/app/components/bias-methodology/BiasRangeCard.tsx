import { Shield } from "lucide-react";

type Props = {
  range: {
    title: string;
    subtitle: string;
    description: string;
    points: string[];
  };
};

export default function BiasRangeCard({ range }: Props) {
  return (
    <div
      className="group rounded-[36px] border p-8 backdrop-blur-xl transition-all duration-500"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div
            className="text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {range.title}
          </div>

          <div
            className="mt-2 text-[11px] font-black tracking-[0.3em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            {range.subtitle}
          </div>
        </div>

        <Shield style={{ color: "var(--primary)" }} className="h-8 w-8" />
      </div>

      {/* DESCRIPTION */}
      <p
        className="mb-8 leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {range.description}
      </p>

      {/* POINTS */}
      <div className="space-y-3">
        {range.points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border p-4"
            style={{
              background: "var(--surface-secondary)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            {point}
          </div>
        ))}
      </div>

      {/* HOVER EFFECT (clean system glow instead of cyan spam) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[36px]"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-soft), transparent)",
        }}
      />
    </div>
  );
}
