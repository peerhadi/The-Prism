"use client";

export default function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-2xl rounded-2xl p-10 backdrop-blur-xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <h1
        className="mb-10 text-center text-3xl font-black"
        style={{ color: "var(--primary)" }}
      >
        {title}
      </h1>

      {children}
    </div>
  );
}
