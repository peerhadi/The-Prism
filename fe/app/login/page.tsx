"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import GoogleIcon from "@mui/icons-material/Google"
import GitHubIcon from "@mui/icons-material/GitHub"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#040816] px-4 selection:bg-cyan-500/30">
      {/* RADIANT BACKGROUND EFFECT */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <Card className="relative w-full max-w-[550px] overflow-hidden rounded-[24px] border-2 border-cyan-400 bg-black/60 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-2xl">
        {/* TOP GLOW ACCENT */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

        <CardHeader className="pt-12 pb-6">
          <CardTitle className="text-center text-[42px] font-black text-white uppercase">
            LOGIN
          </CardTitle>
          <p className="mt-2 text-center text-[10px] font-bold tracking-[0.4em] text-cyan-500/60 uppercase">
            Identity Verification Required
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 px-10 pb-12">
          <form className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="ml-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="USER@PRISM.INTL"
                className="h-[45px] rounded-sm border-white/10 bg-white/[0.03] text-[12px] tracking-widest text-cyan-100 uppercase transition-all placeholder:text-white/10 focus:border-cyan-400 focus:ring-0"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="ml-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-[45px] rounded-sm border-white/10 bg-white/[0.03] text-cyan-100 transition-all placeholder:text-white/10 focus:border-cyan-400 focus:ring-0"
              />
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-[10px] font-bold tracking-widest text-white/40 uppercase"
                >
                  Persist Session
                </Label>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold tracking-widest text-cyan-500/60 uppercase transition-colors hover:text-cyan-400"
              >
                Lost Key?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-4 h-[50px] w-full rounded-sm border-2 border-cyan-400 bg-cyan-400/5 text-[16px] font-black text-cyan-400 uppercase shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-400 hover:text-black"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-2 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
              External Auth
            </span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-[45px] gap-2 rounded-sm border border-white/10 bg-transparent text-[13px] tracking-widest text-cyan-400 uppercase transition-all hover:bg-white/5 hover:text-white"
            >
              <GoogleIcon sx={{ fontSize: 18 }} /> Sign Up With Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-[45px] gap-2 rounded-sm border border-white/10 bg-transparent text-[13px] tracking-widest text-cyan-400 uppercase transition-all hover:bg-white/5 hover:text-white"
            >
              <GitHubIcon sx={{ fontSize: 18 }} /> Sign Up With GitHub
            </Button>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-[11px] font-bold tracking-widest text-white/30 uppercase">
            New operative?{" "}
            <Link
              href="/signup"
              className="text-cyan-400 underline-offset-4 hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardContent>

        {/* BOTTOM DECORATIVE SCANLINE */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-cyan-400/30" />
      </Card>
    </div>
  )
}
