import { Globe, Cpu, TrendingUp, ShieldAlert } from "lucide-react";

export default function MetricsGrid() {
  const items = [
    { icon: Globe, label: "Global Nodes", value: "142" },
    { icon: Cpu, label: "AI Clusters", value: "31K" },
    { icon: TrendingUp, label: "Signal Drift", value: "94%" },
    { icon: ShieldAlert, label: "Threat Level", value: "HIGH" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="
            rounded-3xl
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            p-5
          "
        >
          <item.icon
            className="mb-4 h-5 w-5"
            style={{ color: "var(--primary)" }}
          />

          <div
            className="text-3xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {item.value}
          </div>

          <div
            className="
              mt-1
              text-[10px]
              uppercase
              tracking-[0.25em]
            "
            style={{ color: "var(--text-faint)" }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
