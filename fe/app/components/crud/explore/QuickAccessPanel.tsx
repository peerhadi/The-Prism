export default function QuickAccessPanel({ list }: any) {
  return (
    <div className="rounded-[36px] border border-white/10 bg-black/30 p-8">
      <h3 className="text-[11px] uppercase tracking-[0.35em] text-purple-400 mb-6">
        Quick Access
      </h3>

      <div className="space-y-4">
        {list.map((a: any) => (
          <div key={a.id} className="p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-sm">{a.title}</h4>
            <p className="text-xs text-white/40 mt-2">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
