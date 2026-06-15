"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = sessionStorage.getItem("oauth_intent");
    const code = searchParams.get("code");

    if (!url || !code) return;

    const t = setTimeout(() => {
      router.push(`${url}?code=${code}`);
    }, 1500);

    return () => clearTimeout(t);
  }, [router, searchParams]);

  return (
    <div
      className="
        relative
        flex
        h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[var(--background)]
      "
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, var(--primary-glow), transparent 60%)",
        }}
      />

      <div className="relative text-center">
        <h1
          className="
            text-3xl
            font-bold
            tracking-widest
            sm:text-5xl
          "
          style={{ color: "var(--primary)" }}
        >
          Redirecting
        </h1>

        <p
          className="
            mt-4
            text-sm
            tracking-widest
          "
          style={{ color: "var(--text-muted)" }}
        >
          initializing route transfer...
        </p>

        <div
          className="
            mx-auto
            mt-8
            h-[2px]
            w-64
            animate-pulse
          "
          style={{
            background:
              "linear-gradient(to right, transparent, var(--primary), transparent)",
          }}
        />
      </div>
    </div>
  );
}

export default function RedirectingPage() {
  return (
    <Suspense fallback={null}>
      <RedirectingContent />
    </Suspense>
  );
}
