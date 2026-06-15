"use client";

export default function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-2xl p-10 rounded-2xl
      border border-cyan-500/20 bg-white/[0.02]
      backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
    >
      <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
        {title}
      </h1>

      {children}
    </div>
  );
}
