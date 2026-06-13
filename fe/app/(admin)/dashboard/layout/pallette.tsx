"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const COMPONENTS = ["SMALL", "LIST", "INSIGHT", "HEADLINE"] as const;

type ComponentType = (typeof COMPONENTS)[number];

export default function AddComponentButton({
  onSelect,
}: {
  onSelect: (type: ComponentType) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          border: "1px solid var(--primary-border)",
        }}
      >
        <Plus size={16} />
        Add Component
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[9998] backdrop-blur-md"
            style={{
              background: "var(--backdrop)",
            }}
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <div
              className="w-full max-w-3xl rounded-3xl p-8"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2
                    className="text-2xl font-black"
                    style={{
                      color: "var(--text-primary)",
                    }}
                  >
                    Add Component
                  </h2>

                  <p
                    className="mt-1 text-sm"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    Choose a block to insert into the layout
                  </p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 transition"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    background: "var(--surface-secondary)",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {COMPONENTS.map((component) => (
                  <button
                    key={component}
                    onClick={() => {
                      onSelect(component);
                      setOpen(false);
                    }}
                    className="rounded-2xl p-6 text-left transition"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--surface-secondary)",
                    }}
                  >
                    <div
                      className="text-xs uppercase tracking-[0.3em]"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      Component
                    </div>

                    <div
                      className="mt-2 text-lg font-bold"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {component}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
