import React from "react"
import { Radio, ChevronRight } from "lucide-react"

interface HeadlineItem {
  tag: string
  time: string
  title: string
  variant?: "cyan" | "purple" | "red" | "emerald"
}

interface HeadlineCardProps {
  title: string
  data: HeadlineItem[]
  onActionClick?: () => void
  actionLabel?: string
}

export const HeadlineCard: React.FC<HeadlineCardProps> = ({
  title,
  data,
  onActionClick,
  actionLabel = "Access Archives",
}) => {
  return (
    <div className="rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-10 backdrop-blur-3xl">
      <h3 className="mb-10 flex items-center gap-4 text-[12px] font-black tracking-[0.4em] text-white uppercase">
        <Radio className="h-5 w-5 animate-pulse text-cyan-400" /> {title}
      </h3>

      <div className="space-y-8">
        {data.map((item, i) => (
          <div
            key={i}
            className="group cursor-pointer border-b border-white/5 pb-6 last:border-0"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`rounded px-2 py-0.5 text-[9px] font-black tracking-tighter uppercase ${
                  item.variant === "red"
                    ? "bg-red-500/10 text-red-400"
                    : item.variant === "purple"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-cyan-500/10 text-cyan-400"
                } `}
              >
                {item.tag}
              </span>
              <span className="text-[9px] font-bold tracking-widest text-white/20">
                {item.time}
              </span>
            </div>
            <h4 className="text-[14px] leading-snug font-bold text-white/70 transition-colors group-hover:text-cyan-400">
              {item.title}
            </h4>
          </div>
        ))}
      </div>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/5 py-4 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase transition-all hover:bg-white/5 hover:text-white"
        >
          {actionLabel} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
