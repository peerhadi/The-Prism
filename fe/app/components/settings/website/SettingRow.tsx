"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";

export default function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border p-5 transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* TEXT */}
      <div>
        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
        </p>

        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>

      {/* SWITCH */}
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
