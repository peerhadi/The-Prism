"use client";

import React from "react";
import CyberCard from "./CyberCard";
import SettingRow from "./SettingRow";
import { BrainCircuit } from "lucide-react";

export default function AIFeaturesCard({ aiSettings, setAiSettings }: { aiSettings: { summaryLength: string; showBiasAnalysis: boolean; isVerified: boolean }; setAiSettings: React.Dispatch<React.SetStateAction<{ summaryLength: string; showBiasAnalysis: boolean; isVerified: boolean }>> }) {
  return (
    <CyberCard title="AI Features" icon={BrainCircuit}>
      {/* INFO BANNER */}
      <div
        className="mb-6 rounded-2xl border p-4"
        style={{
          borderColor: "var(--warning-border)",
          background: "var(--warning-soft)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--warning)" }}>
          These settings are stored locally on this device and are not synced to
          your account.
        </p>
      </div>

      <div className="space-y-5">
        {/* SELECT BOX */}
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <label
            className="mb-3 block text-xs font-black tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Summary Length
          </label>

          <select
            value={aiSettings.summaryLength}
            onChange={(e) =>
              setAiSettings((prev) => ({
                ...prev,
                summaryLength: e.target.value,
              }))
            }
            className="h-12 w-full rounded-xl px-4 outline-none"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              color: "var(--text-primary)",
            }}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        {/* SETTINGS */}
        <SettingRow
          title="Show Bias Analysis"
          description="Display source bias and narrative analysis."
          checked={aiSettings.showBiasAnalysis}
          onCheckedChange={(checked) =>
setAiSettings((prev) => ({
                ...prev,
                showBiasAnalysis: checked,
              }))
          }
        />

        <SettingRow
          title="Verified Mode"
          description="Prefer verified information and sources."
          checked={aiSettings.isVerified}
          onCheckedChange={(checked) =>
setAiSettings((prev) => ({
                ...prev,
                isVerified: checked,
              }))
          }
        />
      </div>
    </CyberCard>
  );
}
