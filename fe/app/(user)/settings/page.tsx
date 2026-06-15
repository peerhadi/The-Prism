"use client";

import React, { useEffect, useState } from "react";

import { Activity } from "lucide-react";

import { PrismLoader } from "@/app/components/loadingScreen";

import SourcesCard from "@/app/components/settings/website/SourcesCard";
import AIFeaturesCard from "@/app/components/settings/website/AIFeaturesCard";
import ThemeCard from "@/app/components/settings/website/ThemeCard";
import PrivacyCard from "@/app/components/settings/website/PrivacyCard";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast/toast";

export default function SettingsPage() {
  const router = useRouter();
  const [sources, setSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");
  const [token] = useState(() => typeof window !== "undefined" ? window.localStorage.getItem("token") || "" : "");

  const [privacySettings, setPrivacySettings] = useState<{ id: string }>({
    id: "",
  });

  const [passwordForm, setPasswordForm] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [aiSettings, setAiSettings] = useState<{
    summaryLength: string;
    showBiasAnalysis: boolean;
    isVerified: boolean;
  }>({
    summaryLength: "medium",
    showBiasAnalysis: true,
    isVerified: true,
  });

  const [theme, setTheme] = useState<"dark" | "light">(() => (typeof window !== "undefined" ? (window.localStorage.getItem("theme") as "dark" | "light") || "dark" : "dark"));

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((res) => {
        setSources(res.sources);
        setPrivacySettings({
          id: res.id,
        });
      });
  }, [token]);

  useEffect(() => {
    if (!theme) return;
    window.localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.getElementsByTagName("body")[0].classList.remove("dark");
    } else if (theme === "dark") {
      document.getElementsByTagName("body")[0].classList.add("dark");
    }
  }, [theme]);

  /* ---------------- SOURCES ---------------- */
  const addSource = () => {
    const value = newSource.trim();
    if (!value) return;
    if (sources.includes(value)) return;
    setSources((p) => [...p, value]);
    setNewSource("");
  };

  const moveSourceUp = (i: number) => {
    if (i === 0) return;
    const arr = [...sources];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setSources(arr);
  };

  const moveSourceDown = (i: number) => {
    if (i === sources.length - 1) return;
    const arr = [...sources];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setSources(arr);
  };

  const removeSource = (s: string) =>
    setSources((p) => p.filter((x) => x !== s));

  const resetSources = () =>
    setSources([
      "The New York Times",
      "Al Jazeera",
      "BBC",
      "France24",
      "The Hindu",
    ]);

  const saveSources = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${privacySettings.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sources,
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update sources");
      }

      toast.success("Successfully updated sources", "Success");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update sources",
        "Update Failed",
      );
    }
  };
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${privacySettings.id}/change-password`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to change password");
      }

      toast.success("Password changed successfully", "Success");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password",
        "Update Failed",
      );
    }
  };
  const deleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${privacySettings.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete account");
      }

      toast.success("Account deleted successfully", "Success");

      window.localStorage.removeItem("token");
      router.push("/signup");
      window.dispatchEvent(new Event("auth-changed"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account",
        "Deletion Failed",
      );
    }
  };

  if (!privacySettings.id) return <PrismLoader />;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, var(--primary-soft), transparent 40%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at bottom right, var(--secondary-soft), transparent 40%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* HEADER */}
        <section
          className="mb-12 w-full rounded-[40px] border p-10 backdrop-blur-2xl"
          style={{
            background: "var(--glass-bg)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase"
            style={{
              borderColor: "var(--primary-border)",
              background: "var(--primary-soft)",
              color: "var(--primary)",
            }}
          >
            <Activity className="h-3 w-3 animate-pulse" />
            System Configuration
          </div>

          <h1
            className="text-5xl font-black uppercase md:text-7xl"
            style={{ color: "var(--text-primary)" }}
          >
            Settings
          </h1>

          <p className="mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Manage sources, AI preferences, themes, privacy, and account
            controls.
          </p>
        </section>

        {/* CARDS */}
        <div className="space-y-8">
          <SourcesCard
            sources={sources}
            newSource={newSource}
            setNewSource={setNewSource}
            addSource={addSource}
            moveSourceUp={moveSourceUp}
            moveSourceDown={moveSourceDown}
            removeSource={removeSource}
            resetSources={resetSources}
            saveSources={saveSources}
          />

          <AIFeaturesCard
            aiSettings={aiSettings}
            setAiSettings={setAiSettings}
          />

          <ThemeCard theme={theme} setTheme={setTheme} />

          <PrivacyCard
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            changePassword={changePassword}
            deleteAccount={deleteAccount}
          />
        </div>
      </main>
    </div>
  );
}
