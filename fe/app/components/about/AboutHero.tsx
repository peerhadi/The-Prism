"use client";

export default function AboutHero() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-28 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium tracking-[0.25em] text-cyan-400 uppercase">
            About The Prism
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Understanding how narratives are shaped.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-white/60">
            The Prism is a platform designed to help people explore how the same
            story can be framed differently across media sources. Instead of
            focusing only on what happened, we focus on how language, emphasis,
            and presentation influence perception.
          </p>
        </div>

        <div className="max-w-md border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
            Our Goal
          </p>

          <p className="text-sm leading-relaxed text-white/65">
            To encourage critical thinking by making bias, framing, and
            narrative differences easier to recognize and compare.
          </p>
        </div>
      </div>
    </section>
  );
}
