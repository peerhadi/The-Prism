import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowUpRight } from "lucide-react"

// Define a reusable interface for the component props
interface ObsidianStoryCardProps {
  genre: string
  date: string
  headline: string
  description: string
  sourceCount: number
  status: string
  imageUrl: string
  onActionClick?: () => void
}

// Make the component generic by accepting the interface as generic type T
export default function GenericObsidianStoryCard<
  T extends ObsidianStoryCardProps,
>({
  genre,
  date,
  headline,
  description,
  sourceCount,
  status,
  imageUrl,
  onActionClick,
}: T) {
  return (
    <div className="w-full max-w-[900px] px-4 py-8">
      <Card className="relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-[32px] border-white/10 bg-[#040816]">
        {/* THE MAIN IMAGE (Full Background) */}
        <img
          src={imageUrl}
          alt={headline}
          className="h-full w-full object-cover opacity-70 transition-transform duration-500 hover:scale-105"
        />

        {/* THE "OBSIDIAN" BOX (Floating Description) */}
        <div className="absolute bottom-8 flex w-full justify-center">
          <div className="relative max-w-[90%] overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl">
            {/* Top Row: Meta */}
            <div className="mb-6 flex items-center justify-between">
              <Badge className="border-none bg-cyan-500/20 px-3 py-1 text-[10px] tracking-widest text-cyan-300 uppercase">
                {genre}
              </Badge>
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/40 uppercase">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="mb-4 text-3xl leading-tight font-light tracking-tight text-white">
              {headline}
            </h2>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed font-light text-white/50">
              {description}
            </p>

            {/* Action Area */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-[#040816] bg-white/10 backdrop-blur-sm"
                  />
                ))}
                <span className="self-center pl-4 text-[10px] tracking-widest text-white/30 uppercase">
                  +{sourceCount} Sources
                </span>
              </div>

              <button
                onClick={onActionClick}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:rotate-45 active:scale-90"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>

            {/* Inner Glow Effect */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-[80px]" />
          </div>
        </div>

        {/* Corner Indicator (Optional Aesthetic) */}
        <div className="absolute top-8 right-8">
          <div className="flex items-center gap-3 rounded-full border border-white/5 bg-black/20 px-4 py-2 backdrop-blur-md">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-[10px] font-medium tracking-tighter text-white/60 uppercase">
              {status}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
