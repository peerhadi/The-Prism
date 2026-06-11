import { Card } from "@/components/ui/card";
import {
  LucideIcon,
  Zap,
  Info,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InsightVariant = "cyan" | "amber" | "purple" | "red";

interface StickyInsightProps {
  title: string;
  content: string;
  variant?: InsightVariant;
  icon?: LucideIcon;
  preview?: boolean;
}

const variants = {
  cyan: {
    gradient: "from-cyan-400 to-blue-500",
    text: "text-cyan-400",
    icon: Info,
  },
  amber: {
    gradient: "from-amber-400 to-orange-500",
    text: "text-amber-400",
    icon: Zap,
  },
  purple: {
    gradient: "from-purple-400 to-pink-500",
    text: "text-purple-400",
    icon: Fingerprint,
  },
  red: {
    gradient: "from-red-400 to-pink-600",
    text: "text-red-400",
    icon: AlertTriangle,
  },
};

export default function StickyInsight({
  title = "Analysis Note",
  content = "AI detected a 40% shift in emotional language within this narrative cluster.",
  variant = "cyan",
  preview = false,
}: StickyInsightProps) {
  const style = variants[variant];
  const Icon = style.icon;

  return (
    <Card
      className={cn(
        `relative ${preview ? `min-h-[350px] w-[400px] flex justify-center flex-col` : "min-h-[280px] w-[400px]"} p-6 overflow-hidden rounded-[24px]`,
        "bg-[var(--glass-bg)] border border-[var(--border-subtle)] shadow-[var(--shadow-xl)]",
        "transition-transform duration-500 hover:rotate-3 hover:scale-105",
        "max-w-[100%]",
      )}
    >
      {/* NEON BACKGROUND GRADIENTS */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-[24px] opacity-20 blur-[50px] animate-pulse-slow",
          variant === "cyan" &&
            "bg-[linear-gradient(to_bottom_right,var(--primary),var(--accent))]",
          variant === "amber" &&
            "bg-[linear-gradient(to_bottom_right,var(--warning),#f97316)]",
          variant === "purple" &&
            "bg-[linear-gradient(to_bottom_right,var(--secondary),#ec4899)]",
          variant === "red" &&
            "bg-[linear-gradient(to_bottom_right,var(--danger),#ec4899)]",
        )}
      />

      {/* ROTATED GLOW LAYERS */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[var(--glass-highlight)] blur-[100px] rotate-[15deg]" />
      <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-[var(--secondary-soft)] blur-[80px] rotate-[-20deg]" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* ICON */}
        <div
          className={cn(
            `flex items-center justify-center ${preview ? "h-18 w-18" : "h-12 w-12"} rounded-xl border-2 border-[var(--border)] bg-[var(--glass-bg)] shadow-[var(--shadow-md)]`,
            style.text,
          )}
        >
          <Icon
            className={`${preview ? "h-12 w-12" : "h-6 w-6"} animate-spin-slow`}
          />
        </div>

        {/* TITLE */}
        <h3
          className={cn(
            `mt-4 ${preview ? "text-4xl" : "text-2xl"} font-bold tracking-tight`,
            style.text,
          )}
        >
          {title}
        </h3>

        {/* CONTENT */}
        <p
          className={`mt-2 ${preview ? "text-xl" : "text-sm"} leading-snug text-[var(--text-secondary)]`}
        >
          {content}
        </p>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-2">
          <span
            className={`${preview ? "text-md" : "text-[10px]"} font-bold tracking-widest text-[var(--text-muted)] uppercase`}
          >
            System Log
          </span>
          <div className="h-2 w-2 animate-ping rounded-full bg-[var(--text-faint)]" />
        </div>
      </div>

      {/* TEXTURE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
    </Card>
  );
}
