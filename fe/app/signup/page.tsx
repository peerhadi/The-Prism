"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignUpPage() {
  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=Ov23lirTZyPbyJiA3yZu",
    );
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        },
      ).then((res) => res.json());

      console.log(userInfo);
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040816] px-4">
      {/* ===== NEON FIELD ===== */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] bg-cyan-400/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] bg-fuchsia-500/10 blur-[160px] animate-pulse" />

        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* ===== CARD (same width, reduced height feel) ===== */}
      <Card className="relative w-full max-w-[500px] rounded-[22px] border border-cyan-300/20 bg-white/5 backdrop-blur-3xl shadow-[0_0_90px_rgba(34,211,238,0.25)]">
        {/* top beam */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#22d3ee]" />

        {/* HEADER (compressed) */}
        <CardHeader className="pt-10 pb-6">
          <CardTitle className="text-center text-[36px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-400 uppercase">
            SIGN UP
          </CardTitle>

          <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-cyan-300/60 uppercase">
            New operative registration
          </p>
        </CardHeader>

        {/* CONTENT (tight spacing) */}
        <CardContent className="px-10 pb-12 space-y-5">
          <form className="space-y-5">
            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Full Name
              </Label>
              <Input
                placeholder="JOHN DOE"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 uppercase tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Email
              </Label>
              <Input
                placeholder="USER@PRISM.INTL"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 uppercase tracking-[0.2em] placeholder:text-white/10 focus:border-cyan-300/40 focus:ring-0"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-10 border-cyan-300/10 bg-white/5 text-cyan-100 focus:border-cyan-300/40 focus:ring-0"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox className="border-cyan-300/40 data-[state=checked]:bg-cyan-400" />
              <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
                Accept terms
              </span>
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-md bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 text-black font-black tracking-[0.25em] uppercase shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:scale-[1.02] transition"
            >
              Register Account
            </Button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase">
              External Auth
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* socials (tight) */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => login()}
              className="h-10 w-full border border-cyan-300/20 bg-white/5 text-cyan-300 hover:bg-cyan-300/10 hover:text-white transition"
            >
              <GoogleIcon sx={{ fontSize: 16 }} />
              Google Sign Up
            </Button>

            <Button
              type="button"
              onClick={loginWithGithub}
              className="h-10 w-full border border-fuchsia-300/20 bg-white/5 text-fuchsia-300 hover:bg-fuchsia-300/10 hover:text-white transition"
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              GitHub Sign Up
            </Button>
          </div>

          {/* footer */}
          <p className="text-center text-[10px] tracking-[0.35em] text-white/30 uppercase pt-2">
            Already registered?{" "}
            <Link className="text-cyan-300 hover:underline" href="/login">
              Log in here
            </Link>
          </p>
        </CardContent>

        {/* bottom glow */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      </Card>
    </div>
  );
}
