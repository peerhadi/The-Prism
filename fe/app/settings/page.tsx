"use client"

import { useState } from "react"
import {
  Bell,
  Moon,
  Palette,
  Shield,
  User,
  Newspaper,
  Sparkles,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { THEMES } from "../themes"

const sidebarItems = [
  {
    label: "Profile",
    icon: User,
  },
  {
    label: "Appearance",
    icon: Palette,
  },
  {
    label: "Content",
    icon: Newspaper,
  },
  {
    label: "Bias Settings",
    icon: Shield,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
]

const topics = [
  "Politics",
  "Technology",
  "World",
  "Business",
  "Science",
  "Culture",
]

export default function SettingsPage() {
  const [selected, setSelected] = useState("Appearance")
  const [selectedTopics, setSelectedTopics] = useState(["Technology", "World"])

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ background: THEMES.background }}
    >

      {/* Main */}
      <main className="w-full p-6 md:p-10 overflow-y-auto">
        <div className="max-w-[950px] mx-auto flex flex-col gap-6">
          {/* Header */}
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Settings
            </h2>
            <p className="text-gray-400 mt-2">
              Customize how you explore narratives and perspectives.
            </p>
          </div>

          {/* Profile */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl">Profile</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Manage your public information.
                </p>
              </div>

              <Button className="rounded-xl">Save</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-2 text-gray-400">Username</p>
                <Input
                  defaultValue="prism_user"
                  className="h-12 rounded-xl bg-[rgb(15,23,42)] border-[rgb(32,43,62)]"
                />
              </div>

              <div>
                <p className="text-sm mb-2 text-gray-400">Email</p>
                <Input
                  defaultValue="user@prism.app"
                  className="h-12 rounded-xl bg-[rgb(15,23,42)] border-[rgb(32,43,62)]"
                />
              </div>
            </div>
          </Card>

          {/* Appearance */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Moon size={18} />
              <div>
                <h3 className="text-xl">Appearance</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Control the visual experience.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]">
              <div>
                <p>Deep View</p>
                <p className="text-sm text-gray-400 mt-1">
                  Use the immersive dark theme.
                </p>
              </div>

              <Switch defaultChecked />
            </div>
          </Card>

          {/* Topics */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl">Content Preferences</h3>
              <p className="text-sm text-gray-400 mt-1">
                Choose the stories you care about most.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => {
                const active = selectedTopics.includes(topic)

                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className="px-4 py-2 rounded-xl border text-sm transition-all duration-200"
                    style={{
                      background: active
                        ? "rgb(37,99,235)"
                        : "rgb(15,23,42)",
                      borderColor: active
                        ? "rgb(59,130,246)"
                        : THEMES.border,
                    }}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Bias Settings */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl">Bias Settings</h3>
              <p className="text-sm text-gray-400 mt-1">
                Adjust how perspectives are balanced and surfaced.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-4 text-sm text-gray-400">
                <span>Balanced</span>
                <span>Strong Contrasts</span>
              </div>

              <Slider defaultValue={[65]} max={100} step={1} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]">
                <div>
                  <p>Show all perspectives equally</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Avoid emphasizing one narrative too strongly.
                  </p>
                </div>

                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]">
                <div>
                  <p>Highlight framing conflicts</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Surface stories with the strongest narrative differences.
                  </p>
                </div>

                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Source Preferences */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl">Source Preferences</h3>
              <p className="text-sm text-gray-400 mt-1">
                Control which websites and source domains Prism pulls news from.
              </p>
            </div>

            <div className="mb-5 p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]">
              <p className="text-sm mb-3 text-gray-400">
                Add custom source website
              </p>

              <div className="flex gap-3">
                <Input
                  placeholder="https://example-news-site.com"
                  className="h-11 rounded-xl bg-[rgb(11,19,38)] border-[rgb(32,43,62)]"
                />

                <Button className="rounded-xl px-5">
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "reuters.com",
                  desc: "Global wire reporting",
                },
                {
                  name: "bbc.com",
                  desc: "International coverage",
                },
                {
                  name: "aljazeera.com",
                  desc: "Alternative geopolitical perspectives",
                },
                {
                  name: "nytimes.com",
                  desc: "Long-form western analysis",
                },
              ].map((source) => (
                <div
                  key={source.name}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]"
                >
                  <div>
                    <p>{source.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {source.desc}
                    </p>
                  </div>

                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card
            className="p-6 rounded-[20px]"
            style={{
              background: "rgb(19,27,46)",
              borderColor: THEMES.border,
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl">Notifications</h3>
              <p className="text-sm text-gray-400 mt-1">
                Stay updated with breaking stories and summaries.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Breaking stories",
                "Daily digest",
                "Perspective alerts",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(32,43,62)] bg-[rgb(15,23,42)]"
                >
                  <p>{item}</p>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
