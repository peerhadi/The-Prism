import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import NarrativePopup from "./features/NarrativeButton";
import SourcesPopup from "./features/SourcesPopup";

type Source = {
  source: string;
  title: string;
  url: string;
};

interface HeroCardProps {
  type: string;
  createdAt: string;
  title: string;
  description: string;
  sources: Source[];
  status: string;
  imageUrl: string;
  onActionClick?: () => void;
  id: string;
  preview?: boolean;
}

export default function HeroCard({
  type,
  createdAt,
  title,
  id,
  description,
  sources,
  imageUrl,
  preview,
}: HeroCardProps) {
  const [open, setOpen] = React.useState(false);
  const [sourceOpen, setSourceOpen] = React.useState(false);

  return (
    <Card
      className={`relative w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-500 p-0 cursor-pointer
  ${preview ? "max-h-[460px]" : "max-w-[900px]"}
`}
      data-testid="hero-card"
    >
      {/* Background Image */}
      {/* Image Layer */}
      <div
        className={`relative ${preview ? "max-h-[120px]" : "max-h-[300px]"} w-full`}
      >
        <img
          src={imageUrl}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://picsum.photos/800/450?random=45";
          }}
          alt={title}
          className="h-full w-full object-cover opacity-70 transition-transform duration-500 hover:scale-105"
        />

        {/* Top-right Narrative Button */}
        <div className="absolute top-4 right-4 z-[9999]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
              setSourceOpen(false);
            }}
            className="group flex items-center gap-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--primary-border)] px-3 py-2 hover:bg-[var(--surface-hover)] transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />

            <span className="text-[11px] tracking-wide text-[var(--text-secondary)]">
              See narratives
            </span>
          </button>
        </div>
      </div>

      {/* Floating Info Box */}
      <div
        className={`relative z-10 my-[20] mx-6 rounded-[24px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl shadow-[var(--shadow-lg)] ${
          preview ? "" : "max-h-[350px]"
        }`}
      >
        {/* Top Row: Genre + Date */}
        <div className="mb-6 flex items-center justify-between">
          <Badge className="border-none bg-[var(--primary-soft)] px-3 py-1 text-[10px] tracking-widest text-[var(--primary)] uppercase">
            {type}
          </Badge>

          <div className="flex items-center gap-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
            <Calendar className="h-3 w-3" />

            <span>{createdAt}</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-light leading-tight text-[var(--text-primary)] drop-shadow-[0_0_20px_var(--primary-glow)]">
          {title}
        </h1>
        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>

        {/* Action + Sources */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6 ">
          <div className="flex -space-x-2 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm"
              />
            ))}
            <span className="pl-4 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
              +{sources.length} Sources
            </span>
          </div>

          <button
            onClick={() => setSourceOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--background)] transition-transform hover:rotate-45 active:scale-90"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>

        {/* Neon Glow Accent */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--primary-soft)] blur-[80px]" />
      </div>
      {!preview && (
        <NarrativePopup
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          description={description}
        />
      )}
      {!preview && (
        <SourcesPopup
          id={id}
          open={sourceOpen}
          setOpen={setSourceOpen}
          sources={sources}
        />
      )}
    </Card>
  );
}
