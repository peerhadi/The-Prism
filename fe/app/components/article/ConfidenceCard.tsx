export default function ConfidenceCard() {
  return (
    <div
      className="rounded-[32px] border p-8 text-center"
      style={{
        borderColor: "var(--primary-border)",
        background: "var(--primary-soft)",
      }}
    >
      <p
        className="text-[10px] font-black tracking-[0.3em] uppercase"
        style={{ color: "var(--primary)" }}
      >
        Confidence Index
      </p>

      <div
        className="mt-4 text-7xl font-black"
        style={{ color: "var(--text-primary)" }}
      >
        98
        <span style={{ color: "var(--primary)" }}>%</span>
      </div>

      <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
        High-probability narrative manipulation confirmed.
      </p>
    </div>
  );
}
