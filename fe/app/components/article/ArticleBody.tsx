"use client";

import { Eye, Layers, AlertTriangle, Globe } from "lucide-react";

interface Article {
  title: string;
  description: string;
  summary?: string;
  imageUrl?: string;
  sources: { url: string; source: string }[];
  createdAt: string;
}

function buildContext(article: Article) {
  const text = `${article.title} ${article.description}`.toLowerCase();

  const isPolitical =
    text.includes("trump") ||
    text.includes("president") ||
    text.includes("government");

  const isConflict =
    text.includes("war") || text.includes("iran") || text.includes("nuclear");

  const isFinance =
    text.includes("market") ||
    text.includes("stock") ||
    text.includes("economy");

  return {
    domain: isPolitical
      ? "Geopolitical Signal"
      : isConflict
        ? "Strategic Tension Event"
        : isFinance
          ? "Economic Movement"
          : "Information Event",

    interpretation: isPolitical
      ? "This event reflects institutional messaging and political narrative alignment across multiple actors."
      : isConflict
        ? "This event sits within ongoing strategic communication between global powers and advisory bodies."
        : "This event represents a structured information release within mainstream reporting channels.",

    implication: isConflict
      ? "Potential escalation or rhetorical reinforcement may occur depending on follow-up statements."
      : "Low immediate volatility, but narrative propagation likely across media systems.",

    confidence: isConflict ? 0.78 : 0.62,
    volatility: isConflict ? "HIGH" : "MEDIUM",
  };
}

export default function ArticleBody({ article }: { article: Article }) {
  const ctx = buildContext(article);

  return (
    <article
      className="rounded-[40px] p-10 backdrop-blur-xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="mb-10 flex items-center gap-4">
        <Eye
          className="h-7 w-7"
          style={{
            color: "var(--primary)",
          }}
        />

        <div>
          <p
            className="text-[10px] font-black uppercase tracking-[0.3em]"
            style={{
              color: "var(--primary)",
            }}
          >
            Forensic Briefing
          </p>

          <p
            className="mt-1 text-xs uppercase"
            style={{
              color: "var(--text-muted)",
            }}
          >
            NODE_SCAN //{" "}
            {new Date(article.createdAt).toISOString().slice(0, 10)}
          </p>
        </div>
      </div>

      <div
        className="space-y-10 text-[17px] leading-[2]"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        <p>
          {ctx.domain} detected across incoming intelligence stream. Source
          material has been decomposed into structural narrative components for
          interpretive reconstruction.
        </p>

        <p
          style={{
            color: "var(--text-primary)",
          }}
        >
          {article.description}
        </p>

        <div
          className="relative overflow-hidden rounded-[30px] p-10"
          style={{
            background: "var(--primary-soft)",
            border: "1px solid var(--primary-border)",
          }}
        >
          <Layers
            className="absolute bottom-0 right-0 h-28 w-28"
            style={{
              color: "var(--primary-glow)",
            }}
          />

          <p
            className="relative z-10 text-xl font-bold uppercase"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {article.summary || article.title}
          </p>
        </div>

        <div
          className="rounded-3xl p-6"
          style={{
            background: "var(--surface-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em]"
            style={{
              color: "var(--primary)",
            }}
          >
            <Globe className="h-4 w-4" />
            Narrative Interpretation
          </div>

          <p
            className="leading-relaxed"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {ctx.interpretation}
          </p>
        </div>

        <div
          className="rounded-3xl p-6"
          style={{
            background: "var(--surface-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em]"
            style={{
              color: "var(--warning)",
            }}
          >
            <AlertTriangle className="h-4 w-4" />
            Impact Projection
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {ctx.implication}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "var(--surface-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-3xl font-black"
              style={{
                color: "var(--primary)",
              }}
            >
              {Math.round(ctx.confidence * 100)}%
            </div>

            <div
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Confidence
            </div>
          </div>

          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "var(--surface-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-3xl font-black"
              style={{
                color: "var(--secondary)",
              }}
            >
              {ctx.volatility}
            </div>

            <div
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Volatility
            </div>
          </div>

          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "var(--surface-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-3xl font-black"
              style={{
                color: "var(--info)",
              }}
            >
              {article.sources.length}
            </div>

            <div
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Sources
            </div>
          </div>
        </div>

        <blockquote
          className="border-l-4 px-8 py-6 text-lg font-semibold"
          style={{
            borderColor: "var(--secondary)",
            background: "var(--secondary-soft)",
            color: "var(--text-primary)",
          }}
        >
          Interpretation is not derived from volume of text, but from structure
          of signal.
        </blockquote>
      </div>
    </article>
  );
}
