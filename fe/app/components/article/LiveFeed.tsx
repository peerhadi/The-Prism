import { Activity } from "lucide-react";

export default function LiveFeed({ feed }) {
  console.log(feed);
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[11px] font-black tracking-[0.3em] text-cyan-400 uppercase">
          Live Feed
        </h3>
        <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
      </div>

      <div className="space-y-5">
        {feed.map((item, i) => (
          <div key={i} className="border-b border-white/5 pb-5">
            <p className="text-sm text-white/60 hover:text-cyan-400 transition">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
