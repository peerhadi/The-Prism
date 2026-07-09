"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashButton from "./TrashButton";

export default function Draggable({
  id,
  children,
  handleDelete,
}: {
  id: string;
  children: React.ReactNode;
  handleDelete: (id: string) => void;
}) {
  const { setNodeRef, listeners, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative group isolate"
    >
      <TrashButton id={id} handleDelete={handleDelete} />
      <div {...listeners} className="cursor-grab isolate">
        {children}
      </div>
    </div>
  );
}
