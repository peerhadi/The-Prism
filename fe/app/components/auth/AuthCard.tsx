import { Card } from "@/components/ui/card";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="relative w-full max-w-[500px] rounded-[22px] border border-cyan-300/20 bg-white/5 backdrop-blur-3xl shadow-[0_0_90px_rgba(34,211,238,0.25)]">
      {/* top glow */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#22d3ee]" />
      {children}
      {/* bottom glow */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
    </Card>
  );
}
