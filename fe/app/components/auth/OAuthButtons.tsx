"use client";

import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@/components/ui/button";

interface OAuthButtonsProps {
  onGoogle: () => void;
  onGithub: () => void;
  googleLabel: string;
  githubLabel: string;
}

export default function OAuthButtons({
  onGoogle,
  onGithub,
  googleLabel,
  githubLabel,
}: OAuthButtonsProps) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        onClick={onGoogle}
        className="h-10 w-full border bg-[var(--surface)] text-[var(--primary)] border-[var(--primary-border)] hover:bg-[var(--primary-soft)] hover:text-[var(--text-primary)] transition"
      >
        <GoogleIcon sx={{ fontSize: 16 }} />
        {googleLabel}
      </Button>

      <Button
        type="button"
        onClick={onGithub}
        className="h-10 w-full border bg-[var(--surface)] text-[var(--secondary)] border-[var(--secondary-border)] hover:bg-[var(--secondary-soft)] hover:text-[var(--text-primary)] transition"
      >
        <GitHubIcon sx={{ fontSize: 16 }} />
        {githubLabel}
      </Button>
    </div>
  );
}
