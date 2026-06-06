"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  uppercase = true,
}: any) {
  return (
    <div className="space-y-1">
      <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
        {label}
      </Label>

      <Input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
      />

      {error && (
        <p className="text-[10px] text-red-400 tracking-[0.2em]">{error}</p>
      )}
    </div>
  );
}
