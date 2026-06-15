export default function ExploreStats({
  articles,
  categories,
  filtered,
  small,
}: {
  articles: { length: number };
  categories: { length: number };
  filtered: { length: number };
  small: { length: number };
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-5 border rounded-3xl">
        <div className="text-3xl font-black">{articles.length}</div>
        <div className="text-[10px] uppercase text-white/40">Articles</div>
      </div>

      <div className="p-5 border rounded-3xl">
        <div className="text-3xl font-black">{categories.length}</div>
        <div className="text-[10px] uppercase text-white/40">Categories</div>
      </div>

      <div className="p-5 border rounded-3xl">
        <div className="text-3xl font-black">{filtered.length}</div>
        <div className="text-[10px] uppercase text-white/40">Filtered</div>
      </div>

      <div className="p-5 border rounded-3xl">
        <div className="text-3xl font-black">{small.length}</div>
        <div className="text-[10px] uppercase text-white/40">Discoveries</div>
      </div>
    </div>
  );
}
