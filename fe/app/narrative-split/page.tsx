import { NarrativeSplitCard } from "../components/NarrativeSplitCard"
import { Globe, Database, Lock } from "lucide-react"

const ARCHIVE_DATA = [
  {
    seedId: "SEED-201",
    topic: "Energy Grid",
    versionA: {
      label: "Optimization",
      title: "Sustainable Yield",
      description:
        "Maximizing renewable intake through adaptive algorithmic balancing.",
    },
    versionB: {
      label: "Extraction",
      title: "Resource Siphoning",
      description:
        "Priority routing of energy to industrial hubs at the expense of residential sectors.",
    },
  },
  {
    seedId: "SEED-202",
    topic: "Biometric ID",
    versionA: {
      label: "Security",
      title: "Total Protection",
      description:
        "Utilizing genetic keys to eliminate identity theft and ensure secure access.",
    },
    versionB: {
      label: "Surveillance",
      title: "Genetic Policing",
      description:
        "Mapping familial connections to apply pre-emptive social credit penalties.",
    },
  },
]

export default function DivergenceFeed() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#02050a] px-8 py-24">
      <div className="w-full max-w-6xl space-y-20">
        {/* HEADER SECTION */}
        <header className="flex flex-col justify-between gap-8 border-b border-white/5 pb-16 md:flex-row md:items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-cyan-400">
              <Globe size={20} />
              <span className="text-[11px] font-black tracking-[0.5em] uppercase">
                Forensic Data // Multi-Stream
              </span>
            </div>
            <h2 className="text-7xl leading-none font-black tracking-tighter uppercase">
              Divergence <br />
              <span className="text-5xl text-white/10 italic">Feed</span>
            </h2>
          </div>
          <div className="max-w-xs border border-cyan-500/10 bg-cyan-500/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Lock size={12} className="text-cyan-400" />
              <span className="text-[10px] font-black tracking-widest text-white uppercase italic">
                Encrypted Uplink
              </span>
            </div>
            <p className="text-[11px] leading-relaxed font-medium text-white/40">
              Utilizing decoupled components for high-variance narrative
              ingestion.
            </p>
          </div>
        </header>

        {/* COMPONENT MAPPING */}
        <div className="space-y-8">
          {ARCHIVE_DATA.map((item) => (
            <NarrativeSplitCard
              key={item.seedId}
              seedId={item.seedId}
              topic={item.topic}
              versionA={item.versionA}
              versionB={item.versionB}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
