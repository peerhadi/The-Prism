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

import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";

import ExploreLayout from "@/app/components/crud/explore/ExploreLayout";
import DiscoveryNodes from "@/app/components/crud/explore/DiscoveryNodes";
import TrendingPanel from "@/app/components/crud/explore/TrendingPanel";

import AddComponentButton from "../pallette";

type Article = any;

type CenterState = {
  hero: Article | null;
  small: Article[];
};

const mockArticles = Array.from({ length: 30 }, (_, i) => ({
  id: `article-${i}`,
  title: `Explore Story ${i + 1}`,
  summary:
    "Signal detected across multiple international sources. Analysis pending.",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  createdAt: "2026-06-09",
  type: "NEWS",
  imageUrl: `https://picsum.photos/800/600?random=${i}`,
  sources: [{ id: 1 }],
  categoryId: `cat-${i % 5}`,
}));

const mockCategories = [
  {
    id: "cat-0",
    name: "Politics",
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  {
    id: "cat-1",
    name: "Technology",
    color: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  },
  {
    id: "cat-2",
    name: "Conflict",
    color: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  {
    id: "cat-3",
    name: "Economy",
    color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  {
    id: "cat-4",
    name: "Society",
    color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  },
];

export default function ExploreBuilderPage() {
  const sensors = useSensors(useSensor(PointerSensor));

  const articles = mockArticles;

  const [left, setLeft] = useState<Article[]>(articles.slice(0, 5));

  const [center, setCenter] = useState<CenterState>({
    hero: articles[0],
    small: articles.slice(5, 9),
  });

  const [right, setRight] = useState<Article[]>(articles.slice(10, 18));

  const handleAddComponent = (type: string) => {
    const article = articles[Math.floor(Math.random() * articles.length)];

    switch (type) {
      case "INSIGHT":
        setLeft((prev) => [...prev, article]);
        break;

      case "SMALL":
        setCenter((prev) => ({
          ...prev,
          small: [...prev.small, article],
        }));
        break;

      case "HERO":
        setCenter((prev) => ({
          ...prev,
          hero: article,
        }));
        break;

      case "LIST":
        setCenter((prev) => ({
          ...prev,
          small: [...prev.small, article],
        }));
        break;
    }
  };

  const findContainer = (id: string) => {
    if (left.find((i) => i.id === id)) return "left";

    if (center.small.find((i) => i.id === id)) return "small";

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

    setCenter((prev) => {
      const updated = [...prev.small];

      const fromIndex = updated.findIndex((i) => i.id === activeId);

      const toIndex = updated.findIndex((i) => i.id === overId);

      if (fromIndex === -1 || toIndex === -1) {
        return prev;
      }

      const [moved] = updated.splice(fromIndex, 1);

      updated.splice(toIndex, 0, moved);

      return {
        ...prev,
        small: updated,
      };
    });
  };

  function Draggable({ item, children }: any) {
    const { setNodeRef, attributes, listeners, transform, transition } =
      useSortable({
        id: item.id,
      });

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed top-28 right-10 z-[999]">
        <AddComponentButton onSelect={handleAddComponent} />
      </div>

      <ExploreLayout
        left={
          <div className="space-y-8 min-h-screen">
            <DiscoveryNodes
              categories={mockCategories}
              articles={articles}
              setSelectedCategory={() => {}}
            />

            <div
              className="rounded-[36px] p-8"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="mb-6 text-[11px] uppercase tracking-[0.35em]"
                style={{
                  color: "var(--secondary)",
                }}
              >
                Quick Access
              </h3>

              <SortableContext
                items={left.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="space-y-4">
                  {left.map((item, i) => (
                    <Draggable key={i} item={item}>
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: "var(--surface-secondary)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <h4
                          className="text-sm font-bold"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          {item.title}
                        </h4>

                        <p
                          className="mt-2 text-xs"
                          style={{
                            color: "var(--text-muted)",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </Draggable>
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
        }
        center={
          <div className="space-y-10 min-h-screen">
            {center.hero && (
              <HeroCard
                {...center.hero}
                sources={[]}
                onActionClick={() => {}}
              />
            )}

            <SortableContext
              items={center.small.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {center.small.map((item, i) => (
                  <Draggable key={i} item={item}>
                    <ShortCard
                      id={item.id}
                      title={item.title}
                      badge="DISCOVERY"
                      sources={item.sources}
                      description={item.description}
                      imageUrl={item.imageUrl}
                    />
                  </Draggable>
                ))}
              </div>
            </SortableContext>
          </div>
        }
        right={
          <div className="space-y-8 min-h-screen">
            <TrendingPanel articles={right} />
          </div>
        }
      />
    </DndContext>
  );
}
