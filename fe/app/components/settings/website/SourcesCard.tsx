"use client";

import React from "react";
import { Plus, ChevronUp, ChevronDown, Trash2, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CyberCard from "./CyberCard";

export const RSS_FEEDS = [
  "https://bbci.com/",
  "http://cnn.com/",
  "https://nytimes.com/",
  "https://www.theguardian.com/",
  "https://www.aljazeera.com/",
];

interface SourcesCardProps {
  sources: string[];
  newSource: string;
  setNewSource: (value: string) => void;
  addSource: () => void;
  moveSourceUp: (index: number) => void;
  moveSourceDown: (index: number) => void;
  removeSource: (source: string) => void;
  resetSources: () => void;
  saveSources: () => void;
}

export default function SourcesCard({
  sources,
  newSource,
  setNewSource,
  addSource,
  moveSourceUp,
  moveSourceDown,
  removeSource,
  resetSources,
  saveSources,
}: SourcesCardProps) {
  return (
    <CyberCard title="Sources" icon={Globe}>
      {/* ADD SOURCE */}
      <div className="mb-6 flex gap-3">
        <div className="flex-1">
          <Select value={newSource} onValueChange={setNewSource}>
            <SelectTrigger
              className="!h-14 w-full rounded-xl px-4 text-base"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
            >
              <SelectValue placeholder="Select RSS feed..." />
            </SelectTrigger>

            <SelectContent
              position="popper"
              className="rounded-xl p-2"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {RSS_FEEDS.filter((feed) => !sources.includes(feed)).map(
                (feed) => (
                  <SelectItem
                    key={feed}
                    value={feed}
                    className="mb-1 rounded-lg px-3 py-3 last:mb-0"
                  >
                    {feed}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={addSource}
          disabled={!newSource}
          className="h-12 rounded-xl px-5"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      {/* SOURCE LIST */}
      <div className="space-y-3">
        {sources.map((source: string, index: number) => (
          <div
            key={source}
            className="flex items-center justify-between rounded-2xl border p-4"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p
                className="truncate font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {source}
              </p>

              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Preferred source #{index + 1}
              </p>
            </div>

            <div className="ml-4 flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => moveSourceUp(index)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => moveSourceDown(index)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
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

      {/* ACTIONS */}
      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={resetSources}
          className="h-12 rounded-xl px-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          Reset Defaults
        </Button>

        <Button
          onClick={saveSources}
          className="h-12 rounded-xl px-6"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Save Sources
        </Button>
      </div>
    </CyberCard>
  );
}
