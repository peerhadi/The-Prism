import React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, ArrowRight } from "lucide-react"

// Define the interface for the compact card data
export interface CompactListCardProps {
  category: string
  sourceCount: number
  headline: string
  description: string
  imageUrl: string
  actionLabel?: string
  onActionClick?: () => void
}

/**
 * A generic, high-density list item component.
 * Optimized for secondary feed items and chronological lists.
 */
export default function GenericCompactListCard<T extends CompactListCardProps>({
  category,
  sourceCount,
  headline,
  description,
  imageUrl,
  actionLabel = "Analyze framing",
  onActionClick,
}: T) {
  return (
    <div className="w-full py-2">
      <Card
        onClick={onActionClick}
        className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-white/5 bg-[#08111F]/40 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:bg-[#08111F]/60"
      >
        <div className="flex flex-col-reverse items-start gap-6 p-6 md:flex-row md:items-center">
          {/* LEFT SIDE: CONTENT */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black tracking-[0.25em] text-cyan-400 uppercase">
                {category}
              </span>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1 text-[9px] font-bold tracking-tight text-white/30 uppercase">
                <BarChart3 className="h-2.5 w-2.5" />
                <span>{sourceCount} Sources</span>
              </div>
            </div>

            <h2 className="truncate text-lg leading-snug font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200 md:text-xl">
              {headline}
            </h2>

            <p className="line-clamp-1 text-[13px] leading-relaxed font-light text-white/40 italic">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white/60 uppercase transition-all hover:text-white">
                {actionLabel}{" "}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: PHOTO */}
          <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-[14px] border border-white/10 md:h-[140px] md:w-[200px]">
            <img
              src={imageUrl}
              alt={headline}
              className="h-full w-full object-cover opacity-60 grayscale-[0.5] transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
            />
            {/* Subtle overlay gradient on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-500/50 transition-all duration-700 group-hover:w-full" />
      </Card>
    </div>
  )
}
