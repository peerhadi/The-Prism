"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const COMPONENTS = ["SMALL", "LIST", "INSIGHT"] as const;

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
        className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black"
      >
        <Plus size={16} />
        Add Component
      </button>

      {open && (
        <>
          {/* Blur Background */}
          <div
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <div className="w-full max-w-3xl rounded-3xl border border-cyan-500/20 bg-[#05070d] p-8 shadow-[0_0_80px_rgba(0,255,255,0.15)]">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Add Component
                  </h2>
                  <p className="mt-1 text-sm text-white/40">
                    Choose a block to insert into the layout
                  </p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 p-2 text-white/60 hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {COMPONENTS.map((component) => (
                  <button
                    key={component}
                    onClick={() => {
                      onSelect(component);
                      setOpen(false);
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-cyan-400/30 hover:bg-cyan-500/5"
                  >
                    <div className="text-xs tracking-[0.3em] text-cyan-400 uppercase">
                      Component
                    </div>

                    <div className="mt-2 text-lg font-bold text-white">
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
