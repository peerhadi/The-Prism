import { Zap } from "lucide-react";

export default function SignalMatrix() {
  const signals = [
    ["Narrative Drift", "97.4%"],
    ["Consensus Sync", "82.1%"],
    ["Emotional Load", "66.8%"],
    ["Visibility Suppression", "41%"],
  ];

  return (
    <div
      className="
        rounded-[32px]
        border-[var(--border)]
        bg-[var(--surface)]
        p-6
        backdrop-blur-xl
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h3
          className="
            text-[11px]
            font-black
            uppercase
            tracking-[0.3em]
            text-[var(--primary)]
          "
        >
          Signal Matrix
        </h3>

        <Zap className="h-4 w-4" style={{ color: "var(--primary)" }} />
      </div>

      <div className="space-y-5">
        {signals.map(([label, val], i) => (
          <div key={i}>
            <div
              className="
                mb-2
                flex
                justify-between
                text-[10px]
                font-bold
                uppercase
                tracking-widest
              "
              style={{ color: "var(--text-faint)" }}
            >
              <span>{label}</span>

              <span style={{ color: "var(--primary)" }}>{val}</span>
            </div>

            <div
              className="
                h-1
                w-full
                overflow-hidden
                rounded-full
                bg-[var(--border-subtle)]
              "
            >
              <div
                className="h-full bg-[var(--primary)]"
                style={{
                  width: val,
                  boxShadow: `0 0 12px var(--primary-glow)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
