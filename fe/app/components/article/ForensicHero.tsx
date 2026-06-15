import { Activity } from "lucide-react";

export default function ForensicHero({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-[40px] border p-10 backdrop-blur-2xl"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <img
        src={imageUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        alt=""
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap gap-3">
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase"
            style={{
              borderColor: "var(--primary-border)",
              background: "var(--primary-soft)",
              color: "var(--primary)",
            }}
          >
            <Activity className="h-3 w-3 animate-pulse" />
            Deep Scan Active
          </div>
        </div>

        <h1
          className="w-full text-6xl font-black leading-none tracking-tight uppercase md:text-8xl"
          style={{ color: "var(--text-primary)" }}
        >
          {title
            .split(" ")
            .slice(0, title.split(" ").length - 1)
            .join(" ")}{" "}
          <span
            className="inline-block pb-1 leading-none bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, var(--accent), var(--primary-active))",
            }}
          >
            {title.split(" ")[title.split(" ").length - 1]}
          </span>
        </h1>

        <p
          className="mt-8 max-w-3xl text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Autonomous systems shape perception through predictive narratives and
          algorithmic reinforcement.
        </p>
      </div>
    </section>
  );
}
