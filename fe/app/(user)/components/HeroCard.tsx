import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight } from "lucide-react";

interface ObsidianStoryCardProps {
  type: string;
  createdAt: string;
  title: string;
  description: string;
  sources: Array<any>;
  status: string;
  imageUrl: string;
  onActionClick?: () => void;
}

export default function GenericObsidianStoryCard({
  type,
  createdAt,
  title,
  description,
  sources,
  imageUrl,
  onActionClick,
}: ObsidianStoryCardProps) {
  console.log(imageUrl);
  return (
    <Card className="relative w-full max-w-[900px] overflow-hidden rounded-[32px]  max-h-[700px] border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.2)] hover:shadow-[0_0_100px_rgba(0,255,255,0.4)] transition-all duration-500">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover opacity-70 transition-transform duration-500 hover:scale-105"
      />

      {/* Floating Info Box */}
      <div className="relative z-10 mx-6 my-8 rounded-[24px] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl shadow-2xl">
        {/* Top Row: Genre + Date */}
        <div className="mb-6 flex items-center justify-between">
          <Badge className="border-none bg-cyan-500/20 px-3 py-1 text-[10px] tracking-widest text-cyan-300 uppercase">
            {type}
          </Badge>
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/40 uppercase">
            <Calendar className="h-3 w-3" />
            <span>{createdAt}</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="mb-4 text-3xl font-light leading-tight text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
          {title}
        </h2>

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-white/50">
          {description}
        </p>

        {/* Action + Sources */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex -space-x-2 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-[#040816] bg-white/10 backdrop-blur-sm"
              />
            ))}
            <span className="pl-4 text-[10px] tracking-widest text-white/30 uppercase">
              +{sources.length} Sources
            </span>
          </div>

          <button
            onClick={onActionClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:rotate-45 active:scale-90"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>

        {/* Neon Glow Accent */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-[80px]" />
      </div>
    </Card>
  );
}
