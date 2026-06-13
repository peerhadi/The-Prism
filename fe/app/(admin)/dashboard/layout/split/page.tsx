"use client";

import { useEffect, useState } from "react";

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
import Breadcrumbs from "@/app/components/Breadcrumb";
import { Trash2 } from "lucide-react";
import AddSplitComponentButton from "./add-button";

/* ================= BREADCRUMBS ================= */
const BREADCRUMBS = [
  { label: "Layout", href: "/dashboard/layout" },
  { label: "Narrative Split" },
];

/* ================= MOCK DATA (KEEPED) ================= */
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

/* ================= DRAG ITEM ================= */
const TrashButton = ({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => void;
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDelete(id);
    }}
    className="absolute top-4 right-4 z-50 opacity-0 group-hover:opacity-100 transition pointer-events-auto p-2"
  >
    <Trash2 className="h-12 w-12 text-[var(--danger)]" />
  </button>
);

function DraggableItem({ item, handleDelete }: any) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || "200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        touchAction: "none",
      }}
      className="relative w-full isolate group"
    >
      <TrashButton id={item.id} handleDelete={handleDelete} />
      <div {...listeners} className="cursor-grab isolate">
        <SplitSection event={item} />
      </div>
    </div>
  );
}

/* ================= API ================= */
async function fetchLayout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layout/split`,
  );
  return res.json();
}

async function saveLayout(components: any[]) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/layout/split`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ components }),
  });
}

/* ================= HYDRATE / SERIALIZE ================= */
function hydrateLayout(components: any[]) {
  return components
    .filter((c) => c.type === "SPLIT_SECTION")
    .sort((a, b) => a.order - b.order)
    .map((c) => ({
      id: c.id,
      ...c.config,
    }));
}

function serializeLayout(events: any[]) {
  return events.map((e, i) => ({
    type: "SPLIT_SECTION",
    position: "CENTER",
    order: i,
    config: e,
  }));
}

/* ================= PAGE ================= */
export default function Page() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
  );

  /* ================= STATE (MOCK FALLBACK INCLUDED) ================= */
  const [events, setEvents] = useState<any[]>(mockEvents);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLayout();
        const comps = data?.components ?? [];

        if (!comps.length) {
          setEvents(mockEvents);
          return;
        }

        setEvents(hydrateLayout(comps));
      } catch (err) {
        setEvents(mockEvents);
      }
    };

    load();
  }, []);

  /* ================= DRAG ================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setEvents((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    await saveLayout(serializeLayout(events));
  };

  const handleDelete = (id: string) => {
    setEvents((e) => e.filter((x) => x.id !== id));
  };

  const handleAddComponent = () => {
    const base = mockEvents[Math.floor(Math.random() * mockEvents.length)];

    const newItem = {
      id: `split-${crypto.randomUUID()}`,
      imageUrl: base.imageUrl,
      neutral: base.neutral,
      extreme: base.extreme,
    };

    setEvents((prev) => [...prev, newItem]);
  };
  /* ================= UI ================= */
  return (
    <div>
      <Breadcrumbs items={BREADCRUMBS} />
      <AddSplitComponentButton onAdd={handleAddComponent} />
      <button
        onClick={handleSave}
        className="fixed bottom-6 right-6 z-[999] bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* HERO (STATIC) */}
        <SplitHero />

        {/* DRAGGABLE LIST */}
        <SortableContext
          items={events.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-0">
            {events.map((event) => (
              <DraggableItem
                key={event.id}
                item={event}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>

        {/* CTA (STATIC) */}
        <ConflictCTA />
      </DndContext>
    </div>
  );
}
