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

/* USER COMPONENTS */
import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import ListCard from "@/app/(user)/components/ListCard";
import StickyInsight from "@/app/(user)/components/TickerCard";
import { HeadlineCard } from "@/app/(user)/components/HeadlineCard";

/* STORY COMPONENTS */
import StoryPageLayout from "@/app/components/crud/story/StoryPageLayout";
import StoryLiveSignal from "@/app/components/crud/story/StoryLiveSignal";
import StoryRightPanel from "@/app/components/crud/story/StoryRightPanel";

import AddComponentButton from "../pallette";
import StorySplitCard from "@/app/components/crud/story/StorySplitCard";

type Article = any;

type CenterState = {
  hero: Article | null;
  small: Article[];
  list: Article[];
};

const mockArticles = Array.from({ length: 30 }, (_, i) => ({
  id: `article-${i}`,
  title: `Breaking Story ${i + 1}`,
  summary:
    "Signal detected across multiple international sources. Analysis pending.",
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  createdAt: "2026-06-09",
  type: "NEWS",
  imageUrl: `https://picsum.photos/800/600?random=${i}`,
  sources: [],
}));
const mockPerspectives = [
  {
    id: "perspective-1",
    title: "Russian authorities detain suspect over St. Petersburg cafe blast",

    neutral: {
      title: "Russia Detains Suspect in Cafe Blast",
      summary:
        "Russian authorities have detained a suspect in connection with a cafe blast in St. Petersburg.",
      description: "",
    },

    extreme: {
      title: "Cafe Blast Suspect Detained",
      summary:
        "A suspect has been detained in connection with a cafe blast in St. Petersburg.",
      description: "",
    },

    imageUrl: "https://picsum.photos/800/600?random=100",

    createdAt: "2026-06-09T13:30:40.263Z",
  },

  {
    id: "perspective-2",
    title: "Government announces major cybersecurity reforms",

    neutral: {
      title: "New Cybersecurity Measures Introduced",
      summary:
        "Officials unveiled a package of cybersecurity reforms aimed at strengthening digital infrastructure.",
      description: "",
    },

    extreme: {
      title: "Government Expands Digital Security Powers",
      summary:
        "Critics and supporters debate the impact of sweeping new cybersecurity authorities.",
      description: "",
    },

    imageUrl: "https://picsum.photos/800/600?random=101",

    createdAt: "2026-06-09T13:30:40.263Z",
  },

  {
    id: "perspective-3",
    title: "Global energy markets react to supply concerns",

    neutral: {
      title: "Energy Prices Rise Amid Supply Questions",
      summary:
        "Markets responded to uncertainty surrounding future energy supplies.",
      description: "",
    },

    extreme: {
      title: "Supply Fears Shake Energy Markets",
      summary:
        "Investors reacted strongly as concerns over future supply intensified.",
      description: "",
    },

    imageUrl: "https://picsum.photos/800/600?random=102",

    createdAt: "2026-06-09T13:30:40.263Z",
  },
];
export default function StoryBuilderPage() {
  const sensors = useSensors(useSensor(PointerSensor));

  const articles = mockArticles;

  const [left, setLeft] = useState(articles.slice(0, 4));

  const [right, setRight] = useState(articles.slice(10, 15));

  const [center, setCenter] = useState<CenterState>({
    hero: articles[0],
    small: articles.slice(4, 6),
    list: articles.slice(6, 8),
  });

  const headlines = articles.slice(0, 5);

  const anomaly = articles[11];

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

  const findContainer = (id: string) => {
    if (center.small.find((i) => i.id === id)) return "small";

    if (center.list.find((i) => i.id === id)) return "list";

    if (left.find((i) => i.id === id)) return "left";

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
      const fromArr = [...prev[from as "small" | "list"]];
      const toArr = [...prev[to as "small" | "list"]];

      const fromIndex = fromArr.findIndex((i) => i.id === activeId);

      const toIndex = toArr.findIndex((i) => i.id === overId);

      const [moved] = fromArr.splice(fromIndex, 1);

      if (from === to) {
        fromArr.splice(toIndex, 0, moved);

        return {
          ...prev,
          [from]: fromArr,
        };
      }

      toArr.splice(toIndex === -1 ? toArr.length : toIndex, 0, moved);

      return {
        ...prev,
        [from]: fromArr,
        [to]: toArr,
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

      <StoryPageLayout
        hero={null}
        left={
          <div className="space-y-4 min-h-screen">
            <StoryLiveSignal articles={articles} />

            {/* draggable insights */}
          </div>
        }
        center={
          <div className="space-y-10 min-h-screen">
            {center.hero && (
              <HeroCard
                id={center.hero.id}
                type={center.hero.type}
                createdAt={new Date(center.hero.createdAt).toLocaleDateString()}
                title={center.hero.title}
                description={center.hero.summary}
                sources={center.hero.sources}
                status="LIVE"
                imageUrl={center.hero.imageUrl}
              />
            )}

            <StorySplitCard perspectives={mockPerspectives} />

            <SortableContext
              items={center.small.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 gap-6">
                {center.small.map((item) => (
                  <Draggable key={item.id} item={item}>
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
                {center.list.map((item) => (
                  <Draggable key={item.id} item={item}>
                    <ListCard {...item} />
                  </Draggable>
                ))}
              </div>
            </SortableContext>
          </div>
        }
        right={
          <div className="space-y-8 min-h-screen">
            <StoryRightPanel headlines={headlines} anomaly={anomaly} />
          </div>
        }
      />
    </DndContext>
  );
}
