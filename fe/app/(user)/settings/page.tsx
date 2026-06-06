"use client";

import React, { useEffect, useState } from "react";

import { Activity, Globe } from "lucide-react";

import { PrismLoader } from "@/app/components/loadingScreen";

import SourcesCard from "@/app/components/settings/website/SourcesCard";
import AIFeaturesCard from "@/app/components/settings/website/AIFeaturesCard";
import ThemeCard from "@/app/components/settings/website/ThemeCard";
import PrivacyCard from "@/app/components/settings/website/PrivacyCard";

export default function SettingsPage() {
  const [sources, setSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const t = window.localStorage.getItem("token");
    if (t) {
      setToken(t);
    }
  });
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

  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/api/auth/me", {
        headers: { Authorization: "Bearer " + token },
      })
        .then((r) => r.json())
        .then((res) =>
          setPrivacySettings({
            id: res.id,
            friendRequests: res.friendRequests,
            publicProfile: res.publicProfile,
          }),
        );
    }
  }, []);

  if (!privacySettings.id) return <PrismLoader />;
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <section className="relative overflow-hidden w-full rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl mt-6 mb-12">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              <Activity className="h-3 w-3 animate-pulse" />
              System Configuration
            </div>

            <h1 className="text-5xl font-black uppercase md:text-7xl">
              Settings
            </h1>

            <p className="mt-4 text-white/50 max-w-2xl">
              Manage sources, AI preferences, themes, privacy, and account
              controls.
            </p>
          </div>
        </section>

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
