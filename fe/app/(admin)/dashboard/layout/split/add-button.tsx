"use client";

import { toast } from "@/lib/toast/toast";
import { Plus } from "lucide-react";

export default function AddSplitButton({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      onClick={async () => {
        try {
          await onAdd();

          toast.success("Successfully added item", "Success");
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to add item",
            "Action Failed",
          );
        }
      }}
      className="fixed top-25 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-2 transition hover:scale-[1.02]"
      style={{
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        border: "1px solid var(--primary-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <Plus size={16} />
      Add Narrative
    </button>
  );
}
