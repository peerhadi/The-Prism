"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] blur-[140px] animate-pulse"
          style={{
            backgroundColor: "var(--primary-soft)",
          }}
        />

        <div
          className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] blur-[160px] animate-pulse"
          style={{
            backgroundColor: "var(--secondary-soft)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {children}
    </div>
  );
}
