"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedirectingPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  useEffect(() => {
    const url = sessionStorage.getItem("oauth_intent");
    const search = searchParams.get("code");
    const t = setTimeout(() => {
      router.push(url + `?code=${search}`); // change target route here
    }, 1500);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_60%)]" />

      {/* glitch text */}
      <div className="relative text-center">
        <h1 className="text-cyan-400 text-3xl sm:text-5xl font-bold tracking-widest relative">
          Redirecting
        </h1>

        <p className="mt-4 text-gray-500 text-sm tracking-widest">
          initializing route transfer...
        </p>

        {/* scanning line */}
        <div className="mt-8 h-[2px] w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse mx-auto" />
      </div>
    </div>
  );
}
