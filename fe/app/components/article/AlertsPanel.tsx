import { ShieldAlert } from "lucide-react";

export default function AlertsPanel() {
  const alerts = [
    "Cross-platform sentiment steering accelerating",
    "Synthetic amplification clusters detected",
    "Independent narratives losing visibility",
  ];

  return (
    <div className="rounded-[32px] border border-red-500/20 bg-red-500/[0.03] p-6">
      <div className="mb-5 flex items-center gap-3">
        <ShieldAlert className="h-5 w-5 text-red-400" />
        <h3 className="text-[11px] font-black tracking-[0.3em] text-red-400 uppercase">
          Active Alerts
        </h3>
      </div>

      <div className="space-y-4">
        {alerts.map((a, i) => (
          <div
            key={i}
            className="border-b border-white/5 pb-4 text-sm text-white/50"
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
