"use client";

import { Button } from "@/components/ui/button";

interface SuccessPopupProps {
  open: boolean;
  onContinue: () => void;
}

export default function SuccessPopup({
  open,
  onContinue,
}: SuccessPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--backdrop)] backdrop-blur-sm">
      <div className="relative w-[400px] rounded-2xl border border-[var(--primary-border)] bg-[var(--surface)]/90 p-8 text-center shadow-[0_0_80px_var(--primary-glow)]">
        {/* top glow */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

        <div className="text-[var(--success)] text-4xl mb-3">✔</div>

        <p className="text-[var(--primary)] text-[16px] tracking-[0.35em] uppercase mb-5">
          SUCCESSFULLY LOGGED IN
        </p>

        <Button
          onClick={onContinue}
          className="mt-6 w-full h-11 border border-[var(--success-border)] bg-[var(--success-soft)] text-[var(--success)] tracking-[0.2em] uppercase hover:bg-[var(--success-border)]/20 transition"
        >
          Continue
        </Button>

        {/* bottom glow */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--secondary)]/40 to-transparent" />
      </div>
    </div>
  );
}
