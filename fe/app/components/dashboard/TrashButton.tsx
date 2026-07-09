"use client";

import { Trash2 } from "lucide-react";

export default function TrashButton({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(id);
      }}
      className="absolute top-4 right-4 z-50 pointer-events-auto p-2"
    >
      <Trash2 className="h-6 w-6" style={{ color: "var(--danger)" }} />
    </button>
  );
}
