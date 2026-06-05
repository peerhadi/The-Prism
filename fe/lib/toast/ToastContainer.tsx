"use client";

import { useEffect } from "react";
import { useToast } from "./toastStore";
import { CheckCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const timers = toasts.map((t) => {
      return setTimeout(() => {
        removeToast(t.id);
      }, t.duration || 3000);
    });

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="relative w-[320px] flex items-start gap-3 bg-green-600 text-white rounded-lg p-3 shadow-lg animate-in fade-in slide-in-from-right"
        >
          {/* ICON */}
          <div className="mt-0.5">
            <CheckCircle size={20} />
          </div>

          {/* TEXT */}
          <div className="flex-1">
            <div className="font-semibold text-sm">{t.title}</div>
            <div className="text-xs opacity-90">{t.description}</div>
          </div>

          {/* CLOSE */}
          <button
            onClick={() => removeToast(t.id)}
            className="opacity-70 hover:opacity-100"
          >
            <X size={16} />
          </button>

          {/* AUTO PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-white/40 w-full animate-[shrink_3s_linear_forwards]" />
        </div>
      ))}

      {/* animation */}
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
