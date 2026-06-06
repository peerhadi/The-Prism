"use client";

import { Button } from "@/components/ui/button";

export default function SuccessPopup({
  open,
  onContinue,
  addToast,
  router,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[400px] rounded-2xl border border-cyan-300/20 bg-[#050a18]/90 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.25)]">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

        <div className="text-green-400 text-4xl mb-3">✔</div>

        <p className="text-cyan-200 text-[16px] tracking-[0.35em] uppercase mb-5">
          SUCCESSFULLY LOGGED IN
        </p>

        <Button
          onClick={onContinue}
          className="mt-6 w-full h-11 border border-green-400/30 bg-green-500/10 text-green-300 tracking-[0.2em] uppercase hover:bg-green-500/20 transition"
        >
          Continue
        </Button>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      </div>
    </div>
  );
}
