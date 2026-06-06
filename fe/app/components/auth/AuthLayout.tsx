"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040816] px-4">
      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] bg-cyan-400/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] bg-fuchsia-500/10 blur-[160px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {children}
    </div>
  );
}
