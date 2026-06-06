"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  onBlur,
  show,
  setShow,
  error,
}: any) {
  return (
    <div className="space-y-1">
      <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
        {label}
      </Label>

      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="••••••••"
          className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 pr-10 focus:border-cyan-300/40 focus:ring-0"
        />

        <button
          type="button"
          onClick={() => setShow((p: boolean) => !p)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-300/70 hover:text-cyan-200"
        >
          {show ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-[10px] text-red-400 tracking-[0.2em]">{error}</p>
      )}
    </div>
  );
}
