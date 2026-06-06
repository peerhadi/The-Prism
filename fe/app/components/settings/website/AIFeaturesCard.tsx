"use client";

import React from "react";
import CyberCard from "./CyberCard";
import SettingRow from "./SettingRow";

export default function AIFeaturesCard({ aiSettings, setAiSettings }: any) {
  return (
    <CyberCard title="AI Features" icon={require("lucide-react").BrainCircuit}>
      <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <p className="text-sm text-yellow-300">
          These settings are stored locally on this device and are not synced to
          your account.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <label className="mb-3 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
            Summary Length
          </label>

          <select
            value={aiSettings.summaryLength}
            onChange={(e) =>
              setAiSettings((prev: any) => ({
                ...prev,
                summaryLength: e.target.value,
              }))
            }
            className="h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <SettingRow
          title="Show Bias Analysis"
          description="Display source bias and narrative analysis."
          checked={aiSettings.showBiasAnalysis}
          onCheckedChange={(checked) =>
            setAiSettings((prev: any) => ({
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
            setAiSettings((prev: any) => ({
              ...prev,
              isVerified: checked,
            }))
          }
        />
      </div>
    </CyberCard>
  );
}
