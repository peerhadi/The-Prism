import { Card } from "@/components/ui/card"
import { LucideIcon, Zap, Info, AlertTriangle, Fingerprint } from "lucide-react"
import { cn } from "@/lib/utils"

type InsightVariant = "cyan" | "amber" | "purple" | "red"

interface StickyInsightProps {
  title: string
  content: string
  variant?: InsightVariant
  icon?: LucideIcon
}

const variants = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20",
    icon: Info,
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    glow: "bg-amber-500/20",
    icon: Zap,
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    glow: "bg-purple-500/20",
    icon: Fingerprint,
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    glow: "bg-red-500/20",
    icon: AlertTriangle,
  },
}

export default function StickyInsight({
  title = "Analysis Note",
  content = "AI detected a 40% shift in emotional language within this narrative cluster.",
  variant = "cyan",
}: StickyInsightProps) {
  const style = variants[variant]
  const Icon = style.icon

  return (
    <Card
      className={cn(
        "relative flex min-h-[280px] w-[280px] flex-col justify-between overflow-hidden p-5 transition-all hover:scale-105 hover:rotate-0",
        "rounded-[16px] border shadow-2xl backdrop-blur-xl",
        style.bg,
        style.border
      )}
    >
      {/* GLOW DECOR */}
      <div
        className={cn(
          "absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[60px]",
          style.glow
        )}
      />

      <div className="relative z-10 space-y-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border bg-black/20",
            style.border
          )}
        >
          <Icon className={cn("h-4 w-4", style.text)} />
        </div>

        <h3
          className={cn(
            "text-xl leading-tight font-medium tracking-tight",
            style.text
          )}
        >
          {title}
        </h3>

        <p className="text-[16px] leading-snug font-normal tracking-tight text-white/80">
          {content}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
          System Log
        </span>
        <div
          className={cn(
            "h-1.5 w-1.5 animate-pulse rounded-full",
            style.bg.replace("/10", "")
          )}
        />
      </div>

      {/* TEXTURE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
    </Card>
  )
}
