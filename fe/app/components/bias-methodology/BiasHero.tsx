import { Radar } from "lucide-react";

export default function BiasHero() {
  return (
    <section
      className="relative overflow-hidden rounded-[50px] border p-10 backdrop-blur-2xl"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* GLOW BACKGROUNDS */}
      <div
        className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full blur-[120px]"
        style={{ background: "var(--primary-glow)" }}
      />

      <div
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full blur-[120px]"
        style={{ background: "var(--secondary-glow)" }}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* BADGE */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          <Radar className="h-3 w-3" />
          BIAS INTELLIGENCE SYSTEM
        </div>

        {/* TITLE */}
        <h1
          className="max-w-6xl text-6xl leading-[0.9] font-black tracking-tighter uppercase md:text-[9rem]"
          style={{ color: "var(--text-primary)" }}
        >
          <span style={{ color: "var(--primary)" }}>BIAS</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>METHODOLOGY</span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="mt-8 max-w-4xl text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Every article inside Prism receives a Bias Score between{" "}
          <span style={{ color: "var(--primary)" }}>0</span> and{" "}
          <span style={{ color: "var(--secondary)" }}>100</span>. It measures
          framing, language, sourcing, and narrative structure—not truth itself.
        </p>
      </div>
    </section>
  );
}
