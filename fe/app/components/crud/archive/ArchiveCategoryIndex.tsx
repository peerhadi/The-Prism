"use client";

interface ArchiveCategory {
  id: string;
  name: string;
}

interface ArchiveArticle {
  id: string;
  categoryId?: string | null;
  title?: string;
  summary?: string;
}

export default function ArchiveCategoryIndex({
  categories,
  articles,
}: {
  categories: ArchiveCategory[];
  articles: ArchiveArticle[];
}) {
  return (
    <div className="rounded-[40px] border border-white/10 bg-[var(--glass-bg)] p-8">
      <h3 className="text-[10px] font-black tracking-[0.35em] text-cyan-400 uppercase">
        CATEGORY INDEX
      </h3>

      <h4 className="mt-2 text-3xl font-black uppercase">Archive Nodes</h4>

      <div className="mt-6 space-y-5">
        {categories.map((category, i) => {
          const count = articles.filter(
            (a) => a.categoryId === category.id,
          ).length;

          return (
            <div key={i} className="group border-b border-white/5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--text-primary)]/70 group-hover:text-[var(--text-primary)]">
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
