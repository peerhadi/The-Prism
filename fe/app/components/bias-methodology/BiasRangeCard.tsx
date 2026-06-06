import { Shield } from "lucide-react";

type Props = {
  range: {
    title: string;
    subtitle: string;
    description: string;
    points: string[];
  };
};

export default function BiasRangeCard({ range }: Props) {
  return (
    <div className="group rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-5xl font-black">{range.title}</div>
          <div className="mt-2 text-[11px] font-black tracking-[0.3em] uppercase text-cyan-400">
            {range.subtitle}
          </div>
        </div>

        <Shield className="h-8 w-8 text-cyan-400" />
      </div>

      <p className="mb-8 text-white/60 leading-relaxed">{range.description}</p>

      <div className="space-y-3">
        {range.points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}
