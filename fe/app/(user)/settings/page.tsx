"use client";

import React, { useEffect, useState } from "react";

import {
  Activity,
  Bell,
  BrainCircuit,
  Globe,
  Palette,
  Radar,
  Shield,
  Sparkles,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CyberCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            Configuration Module
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
        </div>
      </div>

      {children}
    </div>
  );
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-cyan-500/20">
      <div>
        <p className="font-semibold">{title}</p>

        <p className="mt-1 text-sm text-white/40">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function SettingsPage() {
  const [sources, setSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");

  const [privacySettings, setPrivacySettings] = useState({
    id: "",
    friendRequests: true,
    publicProfile: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setPrivacySettings({
          id: res.id,
          friendRequests: res?.friendRequests ?? true,
          publicProfile: res?.publicProfile ?? true,
        });
      })
      .catch(() => {});
  }, []);

  const savePrivacySettings = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/api/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendRequests: privacySettings.friendRequests,
        publicProfile: privacySettings.publicProfile,
      }),
    });
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8080/api/users/${privacySettings.id}/change-password`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      },
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm("Delete your account permanently?");

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    await fetch("http://localhost:8080/api/users", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");

    window.location.href = "/";
  };
  const [aiSettings, setAiSettings] = useState({
    summaryLength: "medium",
    showBiasAnalysis: true,
    isVerified: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("prism-ai-settings");

    if (!stored) {
      return;
    }

    try {
      setAiSettings(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("prism-ai-settings", JSON.stringify(aiSettings));
  }, [aiSettings]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("prism-theme");

    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prism-theme", theme);
  }, [theme]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        const defaults = [
          "The New York Times",
          "Al Jazeera",
          "BBC",
          "France24",
          "The Hindu",
        ];
        console.log(res);
        setSources(
          Array.isArray(res?.sources) && res.sources.length > 0
            ? res.sources
            : defaults,
        );
      })
      .catch(() => {
        setSources([
          "The New York Times",
          "Al Jazeera",
          "BBC",
          "France24",
          "The Hindu",
        ]);
      });
  }, []);

  const addSource = () => {
    const value = newSource.trim();

    if (!value) {
      return;
    }

    const exists = sources.some(
      (source) => source.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      return;
    }

    setSources((prev) => [...prev, value]);
    setNewSource("");
  };

  const removeSource = (source: string) => {
    setSources((prev) => prev.filter((s) => s !== source));
  };

  const moveSourceUp = (index: number) => {
    if (index === 0) {
      return;
    }

    const next = [...sources];

    [next[index - 1], next[index]] = [next[index], next[index - 1]];

    setSources(next);
  };

  const moveSourceDown = (index: number) => {
    if (index === sources.length - 1) {
      return;
    }

    const next = [...sources];

    [next[index], next[index + 1]] = [next[index + 1], next[index]];

    setSources(next);
  };

  const resetSources = () => {
    setSources([
      "The New York Times",
      "Al Jazeera",
      "BBC",
      "France24",
      "The Hindu",
    ]);
  };

  const saveSources = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8080/api/users/${privacySettings.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sources,
      }),
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[160px]" />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[100px]" />

            <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              <Activity className="h-3 w-3 animate-pulse" />
              System Configuration
            </div>

            <h1 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">
              <span className="bg-gradient-to-b from-white via-cyan-200 to-cyan-800 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-white/50">
              Manage news sources, AI preferences, themes, privacy settings and
              account controls.
            </p>
          </div>
        </section>

        <div className="mt-10 space-y-8">
          <CyberCard title="Sources" icon={Globe}>
            <div className="mb-6 flex gap-3">
              <Input
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="Add source..."
                className="h-12 rounded-xl border-white/10 bg-black/30"
              />

              <Button
                onClick={addSource}
                className="h-12 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {sources.map((source, index) => (
                <div
                  key={source}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <p className="font-semibold">{source}</p>

                    <p className="mt-1 text-sm text-white/40">
                      Preferred source #{index + 1}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveSourceUp(index)}
                      className="border-white/10 bg-black/30"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => moveSourceDown(index)}
                      className="border-white/10 bg-black/30"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeSource(source)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={resetSources}
                className="h-12 rounded-xl border-white/10 px-8 max-w-[150px]"
              >
                Reset Defaults
              </Button>

              <Button
                onClick={saveSources}
                className="h-12 rounded-xl bg-cyan-500 px-8 text-black hover:bg-cyan-400"
              >
                Save Sources
              </Button>
            </div>
          </CyberCard>
          <CyberCard title="AI Features" icon={BrainCircuit}>
            <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-300">
                These settings are stored locally on this device and are not
                synced to your account.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <label className="mb-3 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                  Summary Length
                </label>

                <select
                  value={aiSettings.summaryLength}
                  onChange={(e) =>
                    setAiSettings((prev) => ({
                      ...prev,
                      summaryLength: e.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/50 px-4"
                >
                  <option value="short">Short</option>

                  <option value="medium">Medium</option>

                  <option value="long">Long</option>
                </select>
              </div>

              <SettingRow
                title="Show Bias Analysis"
                description="Display source bias and narrative analysis."
                checked={aiSettings.showBiasAnalysis}
                onCheckedChange={(checked) =>
                  setAiSettings((prev) => ({
                    ...prev,
                    showBiasAnalysis: checked,
                  }))
                }
              />

              <SettingRow
                title="Verified Mode"
                description="Prefer verified information and sources."
                checked={aiSettings.isVerified}
                onCheckedChange={(checked) =>
                  setAiSettings((prev) => ({
                    ...prev,
                    isVerified: checked,
                  }))
                }
              />
            </div>
          </CyberCard>
          <CyberCard title="Theme" icon={Palette}>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setTheme("dark")}
                className={`rounded-2xl border p-6 text-left transition-all ${
                  theme === "dark"
                    ? "border-cyan-500/40 bg-cyan-500/10"
                    : "border-white/10 bg-black/30"
                }`}
              >
                <div className="mb-4 h-24 rounded-xl border border-white/10 bg-[#05070d]" />

                <p className="font-semibold">Dark Theme</p>

                <p className="mt-1 text-sm text-white/40">
                  Prism default experience.
                </p>
              </button>

              <button
                onClick={() => setTheme("light")}
                className={`rounded-2xl border p-6 text-left transition-all ${
                  theme === "light"
                    ? "border-cyan-500/40 bg-cyan-500/10"
                    : "border-white/10 bg-black/30"
                }`}
              >
                <div className="mb-4 h-24 rounded-xl border border-black/10 bg-white" />

                <p className="font-semibold">Light Theme</p>

                <p className="mt-1 text-sm text-white/40">
                  Bright reading experience.
                </p>
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="font-semibold">Active Theme</p>

              <p className="mt-1 text-sm text-white/40">
                Current theme:{" "}
                <span className="text-cyan-400 capitalize">{theme}</span>
              </p>
            </div>
          </CyberCard>

          <CyberCard title="Privacy & Account" icon={Shield}>
            <div className="mt-8 pt-4">
              <div className="mb-6">
                <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                  Security
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-tight">
                  Change Password
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  Update your password to keep your account secure.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                    Current Password
                  </label>

                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="h-12 rounded-xl border-white/10 bg-black/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                    New Password
                  </label>

                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="h-12 rounded-xl border-white/10 bg-black/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                    Confirm New Password
                  </label>

                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="h-12 rounded-xl border-white/10 bg-black/30"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={changePassword}
                  className="h-12 min-w-[180px] rounded-xl bg-cyan-500 px-8 text-black hover:bg-cyan-400"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </CyberCard>
          <div className="mt-8 pt-8">
            <h3 className="mb-2 text-lg font-bold text-red-400">Danger Zone</h3>

            <p className="mb-4 text-sm text-white/40">
              Permanently delete your account and all associated data.
            </p>

            <div className="mt-10 pt-4">
              <Button
                variant="destructive"
                onClick={deleteAccount}
                className="h-12 w-[180px] rounded-xl px-8"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
