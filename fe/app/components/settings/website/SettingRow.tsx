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
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-cyan-500/20">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-white/40">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
