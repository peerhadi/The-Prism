export default function ConfidenceCard() {
  return (
    <div className="rounded-[32px] border border-cyan-500/20 bg-cyan-500/[0.04] p-8 text-center">
      <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
        Confidence Index
      </p>

      <div className="mt-4 text-7xl font-black">
        98<span className="text-cyan-400">%</span>
      </div>

      <p className="mt-4 text-sm text-white/40">
        High-probability narrative manipulation confirmed.
      </p>
    </div>
  );
}
