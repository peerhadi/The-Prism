"use client";

import React, { useEffect, useState } from "react";
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
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import Draggable from "@/app/components/dashboard/Draggable";
import RightHeadlineItem from "@/app/components/dashboard/RightHeadlineItem";

import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import ListCard from "@/app/(user)/components/ListCard";
import StoryPageLayout from "@/app/components/crud/story/StoryPageLayout";
import StorySplitCard from "@/app/components/crud/story/StorySplitCard";

import Breadcrumbs from "@/app/components/Breadcrumb";
import AddComponentButton from "../pallette";
import StickyInsight from "@/app/(user)/components/TickerCard";
import { Radio } from "lucide-react";
import { toast } from "@/lib/toast/toast";
import { getLayout, saveLayout } from "@/lib/api/layout";

/* ================= MOCK ================= */

const mockArticles = Array.from({ length: 200 }, (_, i) => ({
  id: `article-${i}`,
  title: `Breaking Story ${i + 1}`,
  summary: "Signal detected across multiple sources.",
  description: "Lorem ipsum dolor sit amet",
  createdAt: "2026-06-09",
  type: "NEWS",
  imageUrl: `https://picsum.photos/800/600?random=${i}`,
  sources: [],
}));

type ComponentConfig = {
  type: string;
  config: Article;
};

const BREADCRUMBS = [
  { label: "Layout", href: "/dashboard/layout" },
  { label: "Stories" },
];

type Article = {
  id: string;
  title: string;
  summary: string;
  description: string;
  createdAt: string;
  type: string;
  imageUrl: string;
  sources: unknown[];
  variant?: string;
  tag?: string;
  time?: string;
};

type CenterState = {
  hero: Article | null;
  small: Article[];
  list: Article[];
};

/* ================= DEFAULT ================= */

const buildDefaultLayout = (articles: Article[]): CenterState => ({
  hero: articles[0] ?? null,
  small: articles.slice(1, 5),
  list: articles.slice(5, 7),
});

/* ================= MAIN ================= */

export default function StoryBuilderPage() {
  const sensors = useSensors(useSensor(PointerSensor));

  const [loading, setLoading] = useState(true);

  const [left, setLeft] = useState<Article[]>([]);
  const [right, setRight] = useState<Article[]>([]);
  const [center, setCenter] = useState<CenterState>({
    hero: null,
    small: [],
    list: [],
  });

  const [articles, setArticles] = React.useState(mockArticles);
  /* ================= LOAD ================= */

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getLayout("story");
        const comps = data?.components ?? [];

        if (!comps.length) {
          setCenter(buildDefaultLayout(articles));
          return;
        }
        setArticles((a) => {
          for (const c of comps) {
            const config = c.config as Article;
            const index = a.findIndex((x) => x.id === config.id);
            if (index !== -1) {
              a.splice(index, 1);
            }
          }
          return a;
        });
        setCenter({
          hero: (comps.find((c) => c.type === "HERO")?.config as Article) ?? null,
          small: comps
            .filter((c) => c.type === "SMALL")
            .map((c) => c.config as Article),
          list: comps
            .filter((c) => c.type === "LIST")
            .map((c) => c.config as Article),
        });

        setLeft(
          comps
            .filter((c) => c.type === "INSIGHT")
            .map((c) => c.config as Article),
        );
        setRight(
          comps
            .filter((c) => c.type === "HEADLINE")
            .map((c) => c.config as Article),
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [articles]);

  /* ================= DELETE (NEW — NO UI TOUCH) ================= */
  const handleDelete = (id: string) => {
    setLeft((p) => p.filter((x) => x.id !== id));
    setRight((p) => p.filter((x) => x.id !== id));

    setCenter((p) => ({
      ...p,
      hero: p.hero?.id === id ? null : p.hero,
      small: p.small.filter((x) => x.id !== id),
      list: p.list.filter((x) => x.id !== id),
    }));
  };

  /* ================= SAVE ================= */

  const buildPayload = () => {
    const components: { type: string; position: string; config: Article }[] = [];

    if (center.hero) {
      components.push({
        type: "HERO",
        position: "CENTER",
        config: center.hero,
      });
    }

    center.small.forEach((i) =>
      components.push({
        type: "SMALL",
        position: "CENTER",
        config: i,
      }),
    );

    center.list.forEach((i) =>
      components.push({
        type: "LIST",
        position: "CENTER",
        config: i,
      }),
    );

    left.forEach((i) =>
      components.push({
        type: "INSIGHT",
        position: "LEFT",
        config: i,
      }),
    );

    right.forEach((i) =>
      components.push({
        type: "HEADLINE",
        position: "RIGHT",
        config: i,
      }),
    );

    return components;
  };

  const handleSave = async () => {
    const { error } = await saveLayout("story", buildPayload());
    if (error) {
      toast.error(error, "Save Failed");
    } else {
      toast.success("Successfully saved layout", "Success");
    }
  };

  /* ================= ADD (SAFE FIX ONLY) ================= */

  const handleAddComponent = (type: string) => {
    const id = Math.floor(Math.random() * mockArticles.length);
    const article = articles[id];
    articles.splice(id, 1);

    const item = {
      ...article,
      id: `${article.id}-${crypto.randomUUID()}`,
    };

    switch (type) {
      case "INSIGHT":
        setLeft((p) => [...p, item]);
        break;

      case "HEADLINE":
        setRight((p) => [...p, item]);
        break;

      case "SMALL":
        setCenter((p) => ({ ...p, small: [...p.small, item] }));
        break;

      case "LIST":
        setCenter((p) => ({ ...p, list: [...p.list, item] }));
        break;

      case "HERO":
        setCenter((p) => ({ ...p, hero: item }));
        break;
    }
  };

  /* ================= DRAG ================= */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (left.find((i) => i.id === activeId)) {
      const old = left.findIndex((i) => i.id === activeId);
      const neu = left.findIndex((i) => i.id === overId);
      setLeft((p) => arrayMove(p, old, neu));
    }

    if (right.find((i) => i.id === activeId)) {
      const old = right.findIndex((i) => i.id === activeId);
      const neu = right.findIndex((i) => i.id === overId);
      setRight((p) => arrayMove(p, old, neu));
    }

    if (center.small.find((i) => i.id === activeId)) {
      const old = center.small.findIndex((i) => i.id === activeId);
      const neu = center.small.findIndex((i) => i.id === overId);
      setCenter((p) => ({
        ...p,
        small: arrayMove(p.small, old, neu),
      }));
    }

    if (center.list.find((i) => i.id === activeId)) {
      const old = center.list.findIndex((i) => i.id === activeId);
      const neu = center.list.findIndex((i) => i.id === overId);
      setCenter((p) => ({
        ...p,
        list: arrayMove(p.list, old, neu),
      }));
    }
  };

  /* ================= RETURN (UNCHANGED) ================= */

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div>
      <Breadcrumbs items={BREADCRUMBS} />

      {/* SAVE */}
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
        {/* ADD */}
        <div className="fixed top-28 right-10 z-[999]">
          <AddComponentButton onSelect={handleAddComponent} />
        </div>

        <StoryPageLayout
          hero={null}
          left={
            <SortableContext
              items={left.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="space-y-4">
                {left.map((item) => (
                  <Draggable
                    key={item.id}
                    id={item.id}
                    handleDelete={handleDelete}
                  >
                    <StickyInsight
                      variant={(item.variant ?? "cyan") as "cyan" | "amber" | "purple" | "red"}
                      title={item.title}
                      content={item.summary}
                    />
                  </Draggable>
                ))}
              </div>
            </SortableContext>
          }
          center={
            <div className="space-y-10 min-h-screen">
              {center.hero && (
                <HeroCard
                  id={center.hero.id}
                  type={center.hero.type}
                  createdAt={center.hero.createdAt}
                  title={center.hero.title}
                  description={center.hero.summary}
                  sources={(center.hero.sources as string[]).map((s: string) => ({ source: s, title: s, url: s }))}
                  status="LIVE"
                  imageUrl={center.hero.imageUrl}
                />
              )}

              <StorySplitCard
                perspectives={[
                  {
                    neutral: {
                      title: "Neutral 1",
                      description: "Description 1",
                    },
                    extreme: {
                      title: "Title 2",
                      description: "Description 2",
                    },
                  },
                ]}
              />

              <SortableContext
                items={center.small.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 gap-6">
                  {center.small.map((item) => (
                    <Draggable
                      key={item.id}
                      id={item.id}
                      handleDelete={handleDelete}
                    >
                      <ShortCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        sources={item.sources as string[]}
                        badge="SMALL"
                      />
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
                    <Draggable
                      key={item.id}
                      id={item.id}
                      handleDelete={handleDelete}
                    >
                      <ListCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        sources={(item.sources as string[]).map((s: string) => ({ source: s, title: s, url: s }))}
                      />
                    </Draggable>
                  ))}
                </div>
              </SortableContext>
            </div>
          }
          right={
            <SortableContext
              items={right.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="space-y-8 min-h-screen">
                <div className="relative w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl shadow-[var(--shadow-lg)]">
                  <h3 className="mb-8 flex items-center gap-3 text-[12px] font-black tracking-[0.4em] uppercase text-[var(--text-primary)]">
                    <Radio className="h-5 w-5 animate-pulse text-[var(--primary)]" />
                    LIVE HEADLINES
                  </h3>

                  <div className="space-y-6">
                    {right.map((item) => (
                      <RightHeadlineItem
                        key={item.id}
                        item={{ id: item.id, title: item.title, tag: item.tag ?? "HEADLINE", time: item.time ?? new Date(item.createdAt).toLocaleDateString(), variant: item.variant }}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SortableContext>
          }
        />
      </DndContext>
    </div>
  );
}
