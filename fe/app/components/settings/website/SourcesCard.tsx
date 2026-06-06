"use client";

import React from "react";
import { Plus, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
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
    <CyberCard title="Sources" icon={require("lucide-react").Globe}>
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
        {sources.map((source: string, index: number) => (
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
  );
}
