import { Card } from "@/components/ui/card";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card
      className="
        relative w-full max-w-[500px] rounded-[22px]
        border border-[var(--primary-border)]
        bg-[var(--surface)]
        backdrop-blur-3xl
        shadow-[0_0_90px_var(--primary-glow)]
      "
    >
      {/* top glow */}
      <div
        className="
          absolute top-0 left-0 h-[2px] w-full
          bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent
          shadow-[0_0_20px_var(--primary-glow)]
        "
      />

      {children}

      {/* bottom glow */}
      <div
        className="
          absolute bottom-0 left-0 h-[2px] w-full
          bg-gradient-to-r from-transparent via-[var(--secondary)]/40 to-transparent
        "
      />
    </Card>
  );
}
