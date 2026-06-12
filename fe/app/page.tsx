"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Zap,
  BarChart3,
  ShieldCheck,
  Cpu,
  Layers,
  Maximize,
  ChevronRight,
  Radar,
  Orbit,
  ScanLine,
  Waves,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/stories");
    }
  }, [router]);
  return (
    <div
      className="relative min-h-screen overflow-hidden font-sans selection:bg-cyan-500/20"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* ================================================= */}
      {/* GLOBAL BACKGROUND SYSTEM */}
      {/* ================================================= */}

      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--background)",
          }}
        />

        {/* Atmosphere */}
        <div
          className="absolute -top-[25%] left-[10%] h-[700px] w-[700px] rounded-full blur-[180px]"
          style={{
            background: "var(--primary-glow)",
          }}
        />

        <div
          className="absolute top-[45%] right-[-10%] h-[800px] w-[800px] rounded-full blur-[200px]"
          style={{
            background: "var(--info-soft)",
          }}
        />

        <div
          className="absolute bottom-[-20%] left-[35%] h-[700px] w-[700px] rounded-full blur-[170px]"
          style={{
            background: "var(--primary-soft)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right,var(--grid-line) 1px,transparent 1px),
            linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px)
          `,
            backgroundSize: "45px 45px",
          }}
        />

        {/* Vertical beams */}
        <div
          className="absolute top-0 left-[20%] h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom,transparent,var(--cyber-line-strong),transparent)",
          }}
        />

        <div
          className="absolute top-0 right-[18%] h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom,transparent,var(--cyber-line),transparent)",
          }}
        />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute top-[20%] left-[12%] h-72 w-72 rounded-full border blur-3xl"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
          }}
        />

        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
          className="absolute right-[10%] bottom-[10%] h-96 w-96 rounded-full border blur-3xl"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--info-soft)",
          }}
        />

        {/* Scanning line */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,transparent,var(--primary-soft),transparent)",
          }}
        />
      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <main className="relative z-10 flex flex-col">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center sm:px-6 sm:pt-28 md:pt-32">
          {/* Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-[400px] w-[400px] rounded-full border sm:h-[700px] sm:w-[700px] md:h-[800px] md:w-[800px] lg:h-[900px] lg:w-[900px]"
              style={{ borderColor: "var(--border)" }}
            />

            <div
              className="absolute h-[260px] w-[260px] rounded-full border sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] lg:h-[650px] lg:w-[650px]"
              style={{ borderColor: "var(--primary-border)" }}
            />

            <div
              className="absolute h-[160px] w-[160px] rounded-full border sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"
              style={{ borderColor: "var(--primary-border)" }}
            />
          </div>

          {/* Side labels */}
          <div
            className="absolute left-10 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] text-xs font-black tracking-[0.6em] lg:block"
            style={{ color: "var(--text-faint)" }}
          >
            INFORMATION REFRACTION SYSTEM
          </div>

          <div
            className="absolute right-10 top-1/2 hidden -translate-y-1/2 rotate-90 text-xs font-black tracking-[0.6em] lg:block"
            style={{ color: "var(--text-faint)" }}
          >
            REAL-TIME SPECTRUM ANALYSIS
          </div>

          {/* Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 rounded-full px-5 py-2 backdrop-blur-xl"
            style={{
              border: "1px solid var(--primary-border)",
              background: "var(--primary-soft)",
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: "var(--primary)",
                boxShadow: "0 0 10px var(--primary)",
              }}
            />

            <span
              className="text-[11px] font-black tracking-[0.45em] uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
              Optical Intelligence Interface
            </span>
          </div>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl sm:leading-[0.78] sm:tracking-[-0.08em] md:text-9xl lg:text-[210px]">
              REFRACT
              <br />
              <span
                className="bg-clip-text text-transparent italic"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom,var(--text-primary),var(--primary),var(--primary-active))",
                }}
              >
                THE SIGNAL
              </span>
            </h1>

            {/* Horizontal flare */}
            <div
              className="absolute left-1/2 top-1/2 h-px w-[1200px] -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to right,transparent,var(--primary-border),transparent)",
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 max-w-4xl px-2 text-base font-light leading-relaxed tracking-wide sm:mt-14 sm:text-lg md:text-2xl"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Information enters distorted. The Prism isolates the hidden spectrum
            beneath global information systems, exposing framing, emotional
            manipulation, and coordinated signal interference.
          </motion.p>

          {/* CTA */}
          <div className="mt-12 flex flex-col justify-center gap-4 sm:mt-16 sm:flex-row sm:gap-6">
            <Link href="/signup">
              <Button
                className="group relative h-[80px] w-full overflow-hidden rounded-none border px-16 text-[15px] font-black tracking-[0.5em] uppercase transition-all hover:scale-[1.03] sm:w-auto"
                style={{
                  borderColor: "var(--primary)",
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                <span className="relative z-10">ENTER THE PRISM</span>
              </Button>
            </Link>

            <Link href="/stories">
              <Button
                variant="outline"
                className="group h-[80px] w-full rounded-none border px-16 text-[14px] font-black tracking-[0.45em] uppercase backdrop-blur-xl transition-all sm:w-auto"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              >
                <span>Active Signals</span>

                <ChevronRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="mt-16 sm:mt-24 grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: "Signal Distortions",
                value: "18.4M",
                icon: <Radar size={18} />,
              },
              {
                label: "Spectrum Clusters",
                value: "2,091",
                icon: <Orbit size={18} />,
              },
              {
                label: "Signal Sources",
                value: "14,209",
                icon: <Layers size={18} />,
              },
              {
                label: "Live Refraction",
                value: "Realtime",
                icon: <ScanLine size={18} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-cyan-500/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
              >
                <div className="mb-4 flex items-center gap-3 text-cyan-400">
                  {item.icon}
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-100/40">
                    {item.label}
                  </span>
                </div>

                <div className="text-4xl font-black tracking-tight">
                  {item.value}
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ================================================= */}
        {/* MODULES */}
        {/* ================================================= */}

        <section
          className="relative px-4 sm:px-6 py-24 sm:py-40"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface-secondary)",
          }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-24 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p
                  className="mb-4 text-sm font-black tracking-[0.5em] uppercase"
                  style={{ color: "var(--primary)" }}
                >
                  PRISM MODULES
                </p>

                <h1 className="max-w-4xl text-5xl leading-none font-black tracking-tight uppercase md:text-7xl">
                  SPECTRUM
                  <br />
                  <span style={{ color: "var(--primary)" }}>
                    ANALYSIS SYSTEMS
                  </span>
                </h1>
              </div>

              <p
                className="max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Computational optics for modern information ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Cpu />,
                  title: "Signal Decomposition",
                  desc: "Break language structures into measurable emotional and persuasive frequencies.",
                },
                {
                  icon: <BarChart3 />,
                  title: "Spectrum Mapping",
                  desc: "Visualize ideological spread and systemic polarization patterns in real time.",
                },
                {
                  icon: <Zap />,
                  title: "Resonance Detection",
                  desc: "Identify recursive amplification loops inside closed information ecosystems.",
                },
                {
                  icon: <Maximize />,
                  title: "Refraction Comparison",
                  desc: "Compare how identical events bend differently across regional information systems.",
                },
                {
                  icon: <Globe />,
                  title: "Signal Origin",
                  desc: "Trace information pathways back to their earliest identifiable propagation points.",
                },
                {
                  icon: <ShieldCheck />,
                  title: "Optical Filtering",
                  desc: "Suppress engagement distortion layers to isolate the raw informational spectrum.",
                },
              ].map((feat, i) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={i}
                  className="group relative overflow-hidden p-10 backdrop-blur-xl transition-all"
                  style={{
                    border: "1px solid var(--border)",
                    background:
                      "linear-gradient(to bottom, var(--surface), transparent)",
                  }}
                >
                  <div
                    className="absolute -top-20 right-[-30px] h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "var(--primary-glow)",
                    }}
                  />

                  <div
                    className="mb-10 inline-flex rounded-xl p-5"
                    style={{
                      border: "1px solid var(--primary-border)",
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                    }}
                  >
                    {feat.icon}
                  </div>

                  <h3 className="mb-5 text-3xl font-black uppercase">
                    {feat.title}
                  </h3>

                  <p
                    className="leading-relaxed"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    {feat.desc}
                  </p>

                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                    style={{
                      background: "var(--primary)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* ================================================= */}
        {/* MANIFESTO */}
        {/* ================================================= */}

        <section
          className="relative overflow-hidden px-6 py-52 text-center"
          style={{
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, var(--primary-soft), transparent 60%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="text-3xl sm:text-5xl md:text-7xl lg:text-[110px] leading-tight font-black tracking-tight">
              EVERY SIGNAL
              <br />
              <span
                style={{
                  color: "var(--text-disabled)",
                }}
              >
                CARRIES DISTORTION.
              </span>
              <br />
              <span
                style={{
                  color: "var(--primary)",
                }}
              >
                THE PRISM REVEALS
              </span>
              <br />
              THE SPECTRUM.
            </p>

            <p
              className="mx-auto mt-14 max-w-3xl text-xl leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              The Prism transforms information consumption into signal analysis,
              exposing the hidden structures beneath modern media systems.
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* FINAL CTA */}
        {/* ================================================= */}

        <section className="relative overflow-hidden px-4 sm:px-6 py-40 sm:py-60 text-center">
          <div
            className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: "1px solid var(--border)",
            }}
          />

          <div
            className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
            style={{
              background: "var(--primary-glow)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <h1 className="text-6xl leading-none font-black tracking-tight uppercase md:text-8xl lg:text-[120px]">
              SEE THROUGH
              <br />
              <span
                style={{
                  color: "var(--primary)",
                }}
              >
                DISTORTION.
              </span>
            </h1>

            <p
              className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Enter the optical layer beneath modern information systems.
            </p>

            <div className="mt-16 flex justify-center">
              <Link href="/signup">
                <Button
                  className="group relative h-[70px] sm:h-[100px] overflow-hidden rounded-none px-12 sm:px-20 text-sm sm:text-lg font-black tracking-[0.55em] uppercase transition-all"
                  style={{
                    border: "1px solid var(--primary)",
                    background: "transparent",
                    color: "white",
                  }}
                >
                  <span className="relative z-10">BEGIN REFRACTION</span>

                  <div
                    className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    style={{
                      background: "var(--primary)",
                    }}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom light */}
      <div
        className="fixed bottom-0 left-0 z-50 h-[3px] w-full"
        style={{
          background: "var(--primary)",
        }}
      />
    </div>
  );
}
