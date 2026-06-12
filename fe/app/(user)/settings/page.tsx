"use client";

import React, { useEffect, useState } from "react";

import { Activity } from "lucide-react";

import { PrismLoader } from "@/app/components/loadingScreen";

import SourcesCard from "@/app/components/settings/website/SourcesCard";
import AIFeaturesCard from "@/app/components/settings/website/AIFeaturesCard";
import ThemeCard from "@/app/components/settings/website/ThemeCard";
import PrivacyCard from "@/app/components/settings/website/PrivacyCard";

export default function SettingsPage() {
  const [sources, setSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");
  const [token, setToken] = useState("");

  const [privacySettings, setPrivacySettings] = useState<any>({
    id: "",
    friendRequests: true,
    publicProfile: true,
  });

  const [passwordForm, setPasswordForm] = useState<any>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [aiSettings, setAiSettings] = useState<any>({
    summaryLength: "medium",
    showBiasAnalysis: true,
    isVerified: true,
  });

  const [theme, setTheme] = useState<"dark" | "light">();

  /* ---------------- TOKEN LOAD ---------------- */
  useEffect(() => {
    const t = window.localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((res) => {
        setPrivacySettings({
          id: res.id,
          friendRequests: res.friendRequests,
          publicProfile: res.publicProfile,
        });
      });
  }, [token]);

  useEffect(() => {
    if (!theme) {
      setTheme(window.localStorage.getItem("theme") || "dark");
    }
    if (window) {
      if (theme === "light") {
        document.getElementsByTagName("body")[0].classList.remove("dark");
      } else if (theme === "dark") {
        document.getElementsByTagName("body")[0].classList.add("dark");
      }
      window.localStorage.setItem("theme", theme || "");
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

  const saveSources = async () => {};
  const changePassword = async () => {};
  const deleteAccount = async () => {};

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
