"use client";

export default function QuickAccessPanel({ list }: { list: { id: string; title: string; description: string }[] }) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-[180px] w-[180px] rounded-full bg-[var(--glass-glass-bg)] blur-[100px]" />
      </div>

      <div className="relative z-10">
        <h3 className="mb-6 text-[11px] font-black tracking-[0.35em] text-[var(--primary)] uppercase">
          Quick Access
        </h3>

        <div className="space-y-4">
          {list.map((a: { id: string; title: string; description: string }) => (
            <div
              key={a.id}
              className="
                group
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-4
                transition-all duration-300
                hover:border-[var(--primary-border)]
                hover:bg-[var(--surface-hover)]
              "
            >
              <h4 className="text-sm font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)]">
                {a.title}
              </h4>

              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
