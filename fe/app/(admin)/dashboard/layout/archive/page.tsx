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
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import Draggable from "@/app/components/dashboard/Draggable";
import RightHeadlineItem from "@/app/components/dashboard/RightHeadlineItem";

import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import ListCard from "@/app/(user)/components/ListCard";

import ArchiveLayout from "@/app/components/crud/archive/ArchiveLayout";
import StickyInsight from "@/app/(user)/components/TickerCard";
import AddComponentButton from "../pallette";
import ArchiveLogs from "@/app/components/crud/archive/ArchiveLogs";
import ArchiveCategoryIndex from "@/app/components/crud/archive/ArchiveCategoryIndex";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { PrismLoader } from "@/app/components/loadingScreen";
import { Radio } from "lucide-react";
import { toast } from "@/lib/toast/toast";
import { getLayout, saveLayout } from "@/lib/api/layout";
/* ================= BREADCRUMBS ================= */
const BREADCRUMBS = [
  { label: "Layout", href: "/dashboard/layout" },
  { label: "Archive" },
];

type Article = {
  id: string;
  title: string;
  summary: string;
  description: string;
  type: string;
  createdAt: string;
  imageUrl: string;
  sources: unknown[];
};

type CenterState = {
  hero: Article | null;
  small: Article[];
  list: Article[];
};

/* ================= MOCK ================= */
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

const safeId = (prefix: string, id: string) =>
  `${prefix}-${id}-${crypto.randomUUID()}`;

/* ================= PAGE ================= */
export default function ArchivePage() {
  const sensors = useSensors(useSensor(PointerSensor));
  const articles = mockArticles;

  /* ================= STATE (EXPLORER STYLE) ================= */
  const [left, setLeft] = useState<Article[]>([]);
  const [right, setRight] = useState<Article[]>([]);
  const [center, setCenter] = useState<CenterState>({
    hero: null,
    small: [],
    list: [],
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      const { data } = await getLayout("archive");
      const comps = data?.components ?? [];

      if (!comps.length) {
        setCenter({
          hero: articles[0],
          small: articles.slice(1, 4).map((a) => ({
            ...a,
            id: safeId("small", a.id),
          })),
          list: articles.slice(2).map((a) => ({
            ...a,
            id: safeId("list", a.id),
          })),
        });

        setLeft(articles.slice(8, 11));
        setRight(articles.slice(11, 14));
        return;
      }
      setCenter({
        hero: (comps.find((c) => c.type === "HERO")?.config as Article) ?? null,
        small: comps
          .filter((c) => c.type === "SMALL")
          .flatMap((c) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
        list: comps
          .filter((c) => c.type === "LIST")
          .flatMap((c) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      });

      setLeft(
        comps
          .filter((c) => c.type === "INSIGHT")
          .flatMap((c) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      );

      setRight(
        comps
          .filter((c) => c.type === "HEADLINE")
          .flatMap((c) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      );
    };

    load();
  }, [articles]);

  /* ================= ADD ================= */
  const handleAddComponent = (type: string) => {
    const article = {
      ...articles[Math.floor(Math.random() * articles.length)],
      id: crypto.randomUUID(),
    };

    switch (type) {
      case "INSIGHT":
        setLeft((p) => [...p, article]);
        break;
      case "HEADLINE":
        setRight((p) => [...p, article]);
        break;
      case "SMALL":
        setCenter((p) => ({ ...p, small: [...p.small, article] }));
        break;
      case "LIST":
        setCenter((p) => ({ ...p, list: [...p.list, article] }));
        break;
      case "HERO":
        setCenter((p) => ({ ...p, hero: article }));
        break;
    }
  };

  /* ================= FIND ================= */
  const findContainer = (id: string) => {
    if (left.some((i) => i.id === id)) return "left";
    if (center.small.some((i) => i.id === id)) return "small";
    if (center.list.some((i) => i.id === id)) return "list";
    if (right.some((i) => i.id === id)) return "right";
    return null;
  };

  /* ================= DRAG ================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const from = findContainer(activeId);
    const to = findContainer(overId);

    if (!from || !to) return;

    const move = (arr: Article[], setArr: (v: Article[]) => void) => {
      const fromIndex = arr.findIndex((i) => i.id === activeId);
      const toIndex = arr.findIndex((i) => i.id === overId);

      if (fromIndex === -1) return;

      const updated = [...arr];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

      setArr(updated);
    };

    if (from === "left" || to === "left") return move(left, setLeft);
    if (from === "right" || to === "right") return move(right, setRight);

    if (from === "small" || to === "small") {
      setCenter((p) => {
        const updated = [...p.small];
        const fromIndex = updated.findIndex((i) => i.id === activeId);
        const toIndex = updated.findIndex((i) => i.id === overId);

        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

        return { ...p, small: updated };
      });
      return;
    }

    if (from === "list" || to === "list") {
      setCenter((p) => {
        const updated = [...p.list];
        const fromIndex = updated.findIndex((i) => i.id === activeId);
        const toIndex = updated.findIndex((i) => i.id === overId);

        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

        return { ...p, list: updated };
      });
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    const { error } = await saveLayout("archive", [
      ...left.map((i) => ({ type: "INSIGHT", position: "LEFT", config: i })),
      ...center.small.map((i) => ({
        type: "SMALL",
        position: "CENTER",
        config: i,
      })),
      ...center.list.map((i) => ({
        type: "LIST",
        position: "CENTER",
        config: i,
      })),
      ...(center.hero
        ? [{ type: "HERO", position: "HERO", config: center.hero }]
        : []),
      ...right.map((i) => ({ type: "HEADLINE", position: "RIGHT", config: i })),
    ]);

    if (error) {
      toast.error(error, "Save Failed");
    } else {
      toast.success("Successfully saved layout", "Success");
    }
  };

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
  if (!center?.hero) return <PrismLoader />;
  /* ================= UI (UNCHANGED ARCHIVE STRUCTURE) ================= */
  return (
    <div>
      <Breadcrumbs items={BREADCRUMBS} />

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
        <div className="fixed top-28 right-10 z-[999]">
          <AddComponentButton onSelect={handleAddComponent} />
        </div>

        <ArchiveLayout
          hero={null}
          left={
            <div className="space-y-4 min-h-screen">
              <ArchiveLogs articles={articles.slice(0, 5)} />

              <SortableContext
                items={left.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                {left.map((item) => (
                  <Draggable
                    key={item.id}
                    id={item.id}
                    handleDelete={handleDelete}
                  >
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
                id={center.hero.id}
                type={center.hero.type}
                createdAt={center.hero.createdAt}
                title={center.hero.title}
                description={center.hero.description}
                sources={(center.hero.sources as string[]).map((s: string) => ({ source: s, title: s, url: s }))}
                status="ARCHIVED"
                imageUrl={center.hero.imageUrl}
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
                        badge="ARCHIVE"
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
            <div className="space-y-8 min-h-screen">
              <SortableContext
                items={right.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="space-y-8">
                  <div className="relative w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--glass-bg)] p-8 backdrop-blur-2xl shadow-[var(--shadow-lg)]">
                    {/* HEADER */}
                    <h3 className="mb-8 flex items-center gap-3 text-[12px] font-black tracking-[0.4em] uppercase text-[var(--text-primary)]">
                      <Radio className="h-5 w-5 animate-pulse text-[var(--primary)]" />
                      LIVE HEADLINES
                    </h3>

                    {/* ITEMS */}
                    <div className="space-y-6">
                      {right.map((item) => {
                        return (
                          <RightHeadlineItem
                            key={item.id}
                            item={{ id: item.id, title: item.title, tag: "ARCHIVE", time: new Date(item.createdAt).toLocaleTimeString(), variant: "cyan" }}
                            handleDelete={handleDelete}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SortableContext>

              <ArchiveCategoryIndex
                categories={articles.slice(0, 5).map((x) => ({
                  id: x.id,
                  name: x.title,
                }))}
                articles={articles.slice(0, 5)}
              />
            </div>
          }
        />
      </DndContext>
    </div>
  );
}
