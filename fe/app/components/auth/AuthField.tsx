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
      <Label
        className={`text-[9px] tracking-[0.4em] ${
          uppercase ? "uppercase" : ""
        }`}
        style={{
          color: "var(--text-faint)",
        }}
      >
        {label}
      </Label>

      <Input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="h-10 tracking-[0.2em] focus:ring-0"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
      />

      {error && (
        <p
          className="text-[10px] tracking-[0.2em]"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
