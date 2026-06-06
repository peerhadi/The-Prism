export default function TrendingPanel({ articles }: any) {
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8">
      <h3 className="text-[11px] uppercase tracking-[0.35em] text-cyan-400 mb-8">
        Trending Now
      </h3>

      <div className="space-y-4">
        {articles.slice(0, 8).map((a: any, i: number) => (
          <div
            key={a.id}
            className="p-4 rounded-2xl border border-white/10 bg-black/30"
          >
            <div className="text-cyan-400 font-black">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="font-bold">{a.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
