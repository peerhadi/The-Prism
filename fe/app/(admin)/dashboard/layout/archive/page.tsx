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
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* REAL COMPONENTS */
import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import ListCard from "@/app/(user)/components/ListCard";
import { HeadlineCard } from "@/app/(user)/components/HeadlineCard";

import ArchiveLayout from "@/app/components/crud/archive/ArchiveLayout";

import StickyInsight from "@/app/(user)/components/TickerCard";
import AddComponentButton from "../pallette";
import ArchiveLogs from "@/app/components/crud/archive/ArchiveLogs";
import ArchiveCategoryIndex from "@/app/components/crud/archive/ArchiveCategoryIndex";

/* ================= STATE ================= */

type Article = any;

type CenterState = {
  hero: Article | null;
  small: Article[];
  list: Article[];
};
const mockArticles = Array.from({ length: 20 }, (_, i) => ({
  id: `article-${i}`,
  title: `Article ${i + 1}`,
  summary:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  type: "NEWS",
  createdAt: "2026-06-09",
  imageUrl: `https://picsum.photos/800/600?random=${i}`,
  sources: [],
}));
export default function ArchivePage() {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddComponent = (type: string) => {
    const article = articles[Math.floor(Math.random() * articles.length)];

    switch (type) {
      case "INSIGHT":
        setLeft((prev) => [...prev, article]);
        break;

      case "HEADLINE":
        setRight((prev) => [...prev, article]);
        break;

      case "SMALL":
        setCenter((prev) => ({
          ...prev,
          small: [...prev.small, article],
        }));
        break;

      case "LIST":
        setCenter((prev) => ({
          ...prev,
          list: [...prev.list, article],
        }));
        break;

      case "HERO":
        setCenter((prev) => ({
          ...prev,
          hero: article,
        }));
        break;
    }
  };
  const [left, setLeft] = useState<Article[]>(mockArticles.slice(1, 4));
  const [right, setRight] = useState<Article[]>(mockArticles.slice(10, 15));

  const articles = mockArticles;
  /* ================= FETCH ================= */

  const [center, setCenter] = useState<CenterState>({
    hero: mockArticles[0],
    small: mockArticles.slice(5, 7),
    list: mockArticles.slice(7, 10),
  });

  /* ================= DRAG HELPERS ================= */

  const findContainer = (id: string) => {
    if (center.small.find((i) => i.id === id)) return "small";
    if (center.list.find((i) => i.id === id)) return "list";
    if (left.find((i) => i.id === id)) return "left"; // ✅ NEW
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const from = findContainer(activeId);
    const to = findContainer(overId);

    if (!from || !to) return;

    /* ================= LEFT PANEL ================= */
    if (from === "left" || to === "left") {
      setLeft((prev) => {
        const fromIndex = prev.findIndex((i) => i.id === activeId);
        const toIndex = prev.findIndex((i) => i.id === overId);

        if (fromIndex === -1) return prev;

        const updated = [...prev];
        const [moved] = updated.splice(fromIndex, 1);

        updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

        return updated;
      });

      return;
    }

    /* ================= CENTER PANELS ================= */
    setCenter((prev) => {
      const fromArr = [...prev[from as "small" | "list"]];
      const toArr = [...prev[to as "small" | "list"]];

      const fromIndex = fromArr.findIndex((i) => i.id === activeId);
      const toIndex = toArr.findIndex((i) => i.id === overId);

      const [moved] = fromArr.splice(fromIndex, 1);

      if (from === to) {
        fromArr.splice(toIndex, 0, moved);
        return { ...prev, [from]: fromArr };
      }

      toArr.splice(toIndex === -1 ? toArr.length : toIndex, 0, moved);

      return {
        ...prev,
        [from]: fromArr,
        [to]: toArr,
      };
    });
  };

  /* ================= DRAG WRAPPER ================= */

  function Draggable({ item, children }: any) {
    const { setNodeRef, attributes, listeners, transform, transition } =
      useSortable({ id: item.id });

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          transform: CSS.Transform.toString(transform),
          transition: transition || "250ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {children}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed top-28 right-10 z-[999]">
        <AddComponentButton onSelect={handleAddComponent} />
      </div>
      <ArchiveLayout
        hero={null}
        left={
          <div className="space-y-4 min-h-screen">
            <ArchiveLogs articles={mockArticles.slice(0, 5)} />
            <SortableContext
              items={left.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {left.map((item, i) => (
                <Draggable key={i} item={item}>
                  <StickyInsight
                    variant="cyan"
                    title={item.title}
                    content={item.summary}
                  />
                </Draggable>
              ))}
            </SortableContext>
          </div>
        }
        center={
          <div className="space-y-10 min-h-screen">
            <HeroCard
              {...center.hero}
              status="ARCHIVED"
              imageUrl={"https://picsum.photos/800/500?random=${i}"}
            />

            <SortableContext
              items={center.small.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 gap-6">
                {center.small.map((item, i) => (
                  <Draggable key={i} item={item}>
                    <ShortCard {...item} />
                  </Draggable>
                ))}
              </div>
            </SortableContext>

            <SortableContext
              items={center.list.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="space-y-6">
                {center.list.map((item, i) => (
                  <Draggable key={i} item={item}>
                    <ListCard {...item} />
                  </Draggable>
                ))}
              </div>
            </SortableContext>
          </div>
        }
        right={
          <div className="space-y-8 min-h-screen">
            <HeadlineCard
              title="Live Headlines"
              data={right.slice(0, 8).map((a: any) => ({
                id: a.id,
                title: a.title,
                tag: "LIVE",
                time: new Date(a.createdAt).getFullYear().toString(),
                sources: a.sources,
                variant: "cyan",
              }))}
            />
            <ArchiveCategoryIndex
              categories={mockArticles.slice(0, 5).map((x) => {
                return {
                  title: x.title,
                  averageBias: 0.5,
                };
              })}
              articles={mockArticles.slice(0, 5)}
            />
          </div>
        }
      />
    </DndContext>
  );
}
