import { Activity, Fingerprint } from "lucide-react";

export default function ForensicHero({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
      <img
        src={imageUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        alt=""
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02040A]" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            <Activity className="h-3 w-3 animate-pulse" />
            Deep Scan Active
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none w-full">
          {title
            .split(" ")
            .slice(0, title.split(" ").length - 1)
            .join(" ")}{" "}
          <span className="inline-block leading-none pb-1 bg-gradient-to-b from-cyan-200 to-cyan-700 bg-clip-text text-transparent">
            {title.split(" ")[title.split(" ").length - 1]}
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg text-white/50 leading-relaxed">
          Autonomous systems shape perception through predictive narratives and
          algorithmic reinforcement.
        </p>
      </div>
    </section>
  );
}
