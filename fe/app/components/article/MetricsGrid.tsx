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
          className="rounded-3xl border border-white/10 bg-black/30 p-5"
        >
          <item.icon className="mb-4 h-5 w-5 text-cyan-400" />
          <div className="text-3xl font-black">{item.value}</div>
          <div className="mt-1 text-[10px] tracking-[0.25em] text-white/30 uppercase">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
