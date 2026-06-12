import { Brain, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const items = [
    "Language Analysis",
    "Narrative Framing",
    "Source Diversity",
    "Context Balance",
  ];

  return (
    <section
      className="mt-16 rounded-[40px] border p-10 backdrop-blur-xl"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <Brain style={{ color: "var(--secondary)" }} className="h-5 w-5" />

        <h2
          className="text-[11px] font-black tracking-[0.35em] uppercase"
          style={{ color: "var(--secondary)" }}
        >
          HOW PRISM CALCULATES BIAS
        </h2>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-3xl border p-6"
            style={{
              background: "var(--surface-secondary)",
              borderColor: "var(--border)",
            }}
          >
            <Sparkles
              className="mb-4 h-6 w-6"
              style={{ color: "var(--primary)" }}
            />

            <h3 style={{ color: "var(--text-primary)" }} className="font-black">
              {item}
            </h3>

            <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
              Evaluated by Prism's editorial intelligence system.
            </p>
          </div>
        ))}
      </div>

      {/* INFO BOX */}
      <div
        className="mt-10 rounded-3xl border p-6"
        style={{
          background: "var(--primary-subtle)",
          borderColor: "var(--primary-border)",
        }}
      >
        <p style={{ color: "var(--text-muted)" }} className="leading-relaxed">
          Bias scores are transparency signals. They reflect framing, not truth.
        </p>
      </div>
    </section>
  );
}
