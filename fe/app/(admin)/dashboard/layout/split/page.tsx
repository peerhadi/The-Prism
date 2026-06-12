"use client";

import { useState } from "react";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import SplitHero from "@/app/components/crud/split/SplitHero";
import SplitSection from "@/app/components/crud/split/SplitSection";
import ConflictCTA from "@/app/components/crud/split/ConflictCTA";

const mockEvents = [
  {
    id: "split-1",
    imageUrl: "https://picsum.photos/1200/800?1",
    neutral: {
      title: "Government Introduces Cybersecurity Reforms",
      description: "Officials announced new security measures.",
    },
    extreme: {
      title: "State Expands Surveillance",
      description: "Critics fear increased monitoring.",
    },
  },
  {
    id: "split-2",
    imageUrl: "https://picsum.photos/1200/800?2",
    neutral: {
      title: "Energy Markets Stabilize",
      description: "Prices show moderate recovery.",
    },
    extreme: {
      title: "Energy Chaos Looms",
      description: "Markets remain unstable.",
    },
  },
];

function DraggableItem({ item }: any) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || "200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        touchAction: "none",
      }}
      className={`
        relative w-full
        ${isDragging ? "z-50 opacity-80 scale-[0.99]" : ""}
      `}
    >
      <SplitSection event={item} />
    </div>
  );
}

export default function Page() {
  const [events, setEvents] = useState(mockEvents);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // smooth drag (IMPORTANT FIX)
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setEvents((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* HERO (NOT DRAGGABLE) */}
      <SplitHero />

      {/* DRAGGABLE LIST */}
      <SortableContext
        items={events.map((e) => e.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-0">
          {events.map((event) => (
            <DraggableItem key={event.id} item={event} />
          ))}
        </div>
      </SortableContext>

      {/* CTA (NOT DRAGGABLE) */}
      <ConflictCTA />
    </DndContext>
  );
}
