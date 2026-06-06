"use client";

import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@/components/ui/button";

export default function OAuthButtons({
  onGoogle,
  onGithub,
  googleLabel,
  githubLabel,
}: any) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        onClick={onGoogle}
        className="h-10 w-full border border-cyan-300/20 bg-white/5 text-cyan-300 hover:bg-cyan-300/10 hover:text-white transition"
      >
        <GoogleIcon sx={{ fontSize: 16 }} />
        {googleLabel}
      </Button>

      <Button
        type="button"
        onClick={onGithub}
        className="h-10 w-full border border-fuchsia-300/20 bg-white/5 text-fuchsia-300 hover:bg-fuchsia-300/10 hover:text-white transition"
      >
        <GitHubIcon sx={{ fontSize: 16 }} />
        {githubLabel}
      </Button>
    </div>
  );
}
