"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Snackbar({
  message,
  open,
  onClose,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => setMounted(true));

    const t = setTimeout(() => {
      setMounted(false);

      setTimeout(onClose, 300);
    }, 2500);

    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999]

        min-w-[320px] max-w-[420px]
        overflow-hidden rounded-2xl

        border border-cyan-500/20
        bg-[#050816]/95
        backdrop-blur-2xl

        shadow-[0_0_40px_rgba(34,211,238,0.12)]

        transition-all duration-300 ease-out

        ${
          mounted
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95"
        }
      `}
    >
      {/* Top Glow Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex items-center gap-4 px-5 py-4">
        {/* Status Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-[10px] font-black tracking-[0.25em] text-cyan-400 uppercase">
            Prism System
          </p>

          <p className="mt-1 text-sm text-white/80">{message}</p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg

            border border-white/10
            bg-white/[0.03]

            transition-all duration-300

            hover:border-cyan-500/30
            hover:bg-cyan-500/10
          "
        >
          <X className="h-4 w-4 text-white/50" />
        </button>
      </div>
    </div>
  );
}
