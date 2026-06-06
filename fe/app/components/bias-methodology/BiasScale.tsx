import { Activity } from "lucide-react";

export default function BiasScale() {
  return (
    <section className="mt-12 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3">
        <Activity className="h-5 w-5 text-cyan-400" />
        <h2 className="text-[11px] font-black tracking-[0.35em] uppercase text-cyan-400">
          SCORE SCALE
        </h2>
      </div>

      <div className="overflow-hidden rounded-full border border-white/10">
        <div className="h-6 bg-gradient-to-r from-cyan-500 via-emerald-500 via-yellow-500 to-red-500" />
      </div>

      <div className="mt-6 grid grid-cols-4 text-center">
        {[
          ["0–25", "Minimal Bias", "cyan"],
          ["25–50", "Mild Bias", "emerald"],
          ["50–75", "Noticeable Bias", "yellow"],
          ["75–100", "Strong Bias", "red"],
        ].map(([range, label, color]) => (
          <div key={range}>
            <div className={`text-3xl font-black text-${color}-400`}>
              {range}
            </div>
            <div className="mt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
