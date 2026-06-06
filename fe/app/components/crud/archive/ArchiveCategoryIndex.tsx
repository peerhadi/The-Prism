"use client";

export default function ArchiveCategoryIndex({
  categories,
  articles,
}: {
  categories: any[];
  articles: any[];
}) {
  return (
    <div className="rounded-[40px] border border-white/10 bg-black/30 p-8">
      <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
        CATEGORY INDEX
      </h3>

      <h4 className="mt-2 text-3xl font-black uppercase">Archive Nodes</h4>

      <div className="mt-6 space-y-5">
        {categories.map((category) => {
          const count = articles.filter(
            (a) => a.category?.id === category.id,
          ).length;

          return (
            <div
              key={category.id}
              className="group border-b border-white/5 pb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 group-hover:text-white">
                  {category.name}
                </span>
                <span className="text-cyan-400 text-sm font-black">
                  {count}
                </span>
              </div>

              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                  style={{
                    width: `${Math.max(
                      10,
                      (count / Math.max(1, articles.length)) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
