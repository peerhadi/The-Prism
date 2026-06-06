import { Eye, Layers } from "lucide-react";

export default function ArticleBody() {
  return (
    <article className="rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
      {" "}
      <div className="mb-10 flex items-center gap-4">
        {" "}
        <Eye className="h-7 w-7 text-cyan-400/70" />{" "}
        <div>
          {" "}
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            {" "}
            Forensic Briefing{" "}
          </p>{" "}
          <p className="mt-1 text-xs text-white/30 uppercase">
            {" "}
            NODE_992_AUTH // MAY 2026{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-10 text-[17px] leading-[2] text-white/65">
        {" "}
        <p>
          {" "}
          The current landscape of information dissemination has evolved beyond
          passive reporting into an architecture of active perception
          management. Intelligence systems reveal coordinated semantic alignment
          across institutional media channels, algorithmic recommendation
          engines, and automated moderation layers.{" "}
        </p>{" "}
        {/* QUOTE BLOCK */}{" "}
        <div className="relative overflow-hidden rounded-[30px] border border-cyan-500/20 bg-cyan-500/[0.04] p-10">
          {" "}
          <Layers className="absolute right-0 bottom-0 h-28 w-28 text-cyan-400/5" />{" "}
          <p className="relative z-10 text-2xl leading-relaxed font-bold tracking-tight text-cyan-50 uppercase">
            {" "}
            “When the vocabulary of crisis becomes identical across hundreds of
            systems within minutes, information stops behaving like journalism
            and starts behaving like infrastructure.”{" "}
          </p>{" "}
        </div>{" "}
        <p>
          {" "}
          Investigative scans identified forced consensus loops capable of
          suppressing dissenting interpretations milliseconds after publication.
          These loops rely on emotional reinforcement, visibility modulation,
          semantic convergence, and predictive engagement systems designed to
          reduce interpretive variance.{" "}
        </p>{" "}
        {/* INLINE DATA */}{" "}
        <div className="grid gap-6 md:grid-cols-3">
          {" "}
          {[
            ["82.4%", "Echo Consistency"],
            ["12m", "Narrative Sync Window"],
            ["40%", "Suppressed Packets"],
          ].map(([val, label], i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center"
            >
              {" "}
              <div className="text-4xl font-black text-cyan-400">
                {" "}
                {val}{" "}
              </div>{" "}
              <div className="mt-3 text-[10px] tracking-[0.25em] text-white/30 uppercase">
                {" "}
                {label}{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        <p>
          {" "}
          Predictive consensus systems no longer respond to public sentiment —
          they shape the expectation of events before they occur. By the time
          information reaches the end-user, it has already been processed
          through narrative hardening layers, emotional optimization, and
          engagement-weighted filtering systems.{" "}
        </p>{" "}
        <blockquote className="border-l-4 border-purple-500 bg-purple-500/[0.05] px-8 py-6 text-xl leading-relaxed font-semibold text-white">
          {" "}
          Verification is no longer optional. Verification is the final survival
          layer for decentralized consciousness.{" "}
        </blockquote>{" "}
      </div>{" "}
    </article>
  );
}
