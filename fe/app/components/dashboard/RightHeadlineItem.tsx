"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashButton from "./TrashButton";

export default function RightHeadlineItem({
  item,
  handleDelete,
}: {
  item: {
    id: string;
    title: string;
    tag: string;
    time: string;
    variant?: string;
  };
  handleDelete: (id: string) => void;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.id });

  const variant = item.variant ?? "cyan";

  const variantBg =
    variant === "cyan"
      ? "var(--primary-soft)"
      : variant === "purple"
        ? "var(--secondary-soft)"
        : variant === "red"
          ? "var(--danger-soft)"
          : "var(--success-soft)";

  const variantColor =
    variant === "cyan"
      ? "var(--primary)"
      : variant === "purple"
        ? "var(--secondary)"
        : variant === "red"
          ? "var(--danger)"
          : "var(--success)";

  return (
    <div className="flex w-full items-center justify-between">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className="group relative flex-1 cursor-grab overflow-hidden rounded-xl pb-5 last:border-0 active:cursor-grabbing"
      >
        <div
          className="absolute inset-0 opacity-20 blur-[40px] transition-all group-hover:opacity-40"
          style={{ background: variantBg }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span
            className="rounded px-2 py-0.5 text-[9px] uppercase"
            style={{ background: variantBg, color: variantColor }}
          >
            {item.tag}
          </span>

          <span className="text-[9px] font-bold tracking-widest" style={{ color: "var(--text-faint)" }}>
            {item.time}
          </span>
        </div>

        <h4
          className="relative z-10 mt-1 text-[14px] font-bold leading-snug drop-shadow-[0_0_6px_var(--primary-glow)]"
          style={{ color: "var(--text-primary)" }}
        >
          {item.title}
        </h4>
      </div>

      <TrashButton id={item.id} handleDelete={handleDelete} />
    </div>
  );
}
