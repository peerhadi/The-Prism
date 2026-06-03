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
}: StickyInsightProps) {
  const style = variants[variant];
  const Icon = style.icon;

  return (
    <Card
      className={cn(
        "relative min-h-[280px] w-[400px] p-6 overflow-hidden rounded-[24px]",
        "bg-black/70 border border-white/5 shadow-2xl",
        "transition-transform duration-500 hover:rotate-3 hover:scale-105",
        "max-w-[100%]",
      )}
    >
      {/* NEON BACKGROUND GRADIENTS */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-[24px] bg-gradient-to-br",
          style.gradient,
          "opacity-20 blur-[50px] animate-pulse-slow",
        )}
      />

      {/* ROTATED GLOW LAYERS */}
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-white/30 to-transparent blur-[100px] rotate-[15deg]" />
      <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-bl from-pink-500/30 to-transparent blur-[80px] rotate-[-20deg]" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* ICON */}
        <div
          className={cn(
            "flex items-center justify-center h-12 w-12 rounded-xl border-2 border-white/10 bg-black/40 shadow-md",
            style.text,
          )}
        >
          <Icon className="h-6 w-6 animate-spin-slow" />
        </div>

        {/* TITLE */}
        <h3 className={cn("mt-4 text-xl font-bold tracking-tight", style.text)}>
          {title}
        </h3>

        {/* CONTENT */}
        <p className="mt-2 text-sm leading-snug text-white/70">{content}</p>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
            System Log
          </span>
          <div className="h-2 w-2 animate-ping rounded-full bg-white/50" />
        </div>
      </div>

      {/* TEXTURE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
    </Card>
  );
}
