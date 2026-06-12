"use client";

import React from "react";
import { Plus, ChevronUp, ChevronDown, Trash2, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CyberCard from "./CyberCard";

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
}: any) {
  return (
    <CyberCard title="Sources" icon={Globe}>
      {/* ADD SOURCE */}
      <div className="mb-6 flex gap-3">
        <Input
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          placeholder="Add source..."
          className="h-12 rounded-xl"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            color: "var(--text-primary)",
          }}
        />

        <Button
          onClick={addSource}
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
            <div>
              <p
                style={{ color: "var(--text-primary)" }}
                className="font-semibold"
              >
                {source}
              </p>

              <p
                style={{ color: "var(--text-muted)" }}
                className="mt-1 text-sm"
              >
                Preferred source #{index + 1}
              </p>
            </div>

            <div className="flex gap-2">
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
