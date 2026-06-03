"use client";

import { useEffect } from "react";

export default function Snackbar({
  message,
  open,
  onClose,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl
      bg-cyan-400 text-black font-bold shadow-[0_0_25px_rgba(34,211,238,0.6)]
      border border-cyan-200/40 backdrop-blur-xl"
    >
      {message}
    </div>
  );
}
