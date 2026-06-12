"use client";

export default function AboutHero() {
  return (
    <section className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-28 lg:flex-row lg:items-end lg:justify-between">
        {/* LEFT CONTENT */}
        <div className="max-w-3xl space-y-6">
          <p
            className="text-sm font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            About The Prism
          </p>

          <h1
            className="text-5xl font-bold tracking-tight sm:text-7xl"
            style={{ color: "var(--text-primary)" }}
          >
            Understanding how narratives are shaped.
          </h1>

          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The Prism is a platform designed to help people explore how the same
            story can be framed differently across media sources. Instead of
            focusing only on what happened, we focus on how language, emphasis,
            and presentation influence perception.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="max-w-md border p-6 backdrop-blur-sm"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="mb-4 text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Our Goal
          </p>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            To encourage critical thinking by making bias, framing, and
            narrative differences easier to recognize and compare.
          </p>
        </div>
      </div>
    </section>
  );
}
