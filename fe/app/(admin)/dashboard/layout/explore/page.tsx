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
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* UI */
import HeroCard from "@/app/(user)/components/HeroCard";
import ShortCard from "@/app/(user)/components/SmallCard";
import ListCard from "@/app/(user)/components/ListCard";

import ExploreLayout from "@/app/components/crud/explore/ExploreLayout";
import DiscoveryNodes from "@/app/components/crud/explore/DiscoveryNodes";
import TrendingPanel from "@/app/components/crud/explore/TrendingPanel";

import AddComponentButton from "../pallette";
import Breadcrumbs from "@/app/components/Breadcrumb";
import StickyInsight from "@/app/(user)/components/TickerCard";
import { Trash2 } from "lucide-react";
import { toast } from "@/lib/toast/toast";

const BREADCRUMBS = [
  { label: "Layout", href: "/dashboard/layout" },
  { label: "Explore" },
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
  categoryId: string;
  variant?: string;
};

type CenterState = {
  hero: Article | null;
  small: Article[];
  list: Article[];
};

/* ---------------- MOCK ---------------- */
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

/* ---------------- DRAG WRAPPER ---------------- */
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
    className="absolute top-4 right-4 z-50 opacity-100 group-hover:opacity-100 transition pointer-events-auto p-2"
  >
    <Trash2 className="h-6 w-6 text-[var(--danger)]" />
  </button>
);
function Draggable({
  id,
  children,
  handleDelete,
}: {
  id: string;
  children: React.ReactNode;
  handleDelete: (id: string) => void;
}) {
  const { setNodeRef, listeners, transform, transition } =
    useSortable({ id });

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

/* ---------------- HELPERS ---------------- */
async function fetchLayout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layout/explore`,
  );
  return res.json();
}

async function saveLayout(type: string, components: { type: string; config: Article; position: string }[]) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/layout/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ components }),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Failed to save layout");
    }

    toast.success("Successfully saved layout", "Success");

    return data;
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to save layout",
      "Save Failed",
    );

    throw error;
  }
}

type ComponentConfig = {
  type: string;
  config: Article;
};

const safeId = (prefix: string, id: string) =>
  `${prefix}-${id}-${crypto.randomUUID()}`;

export default function ExploreBuilderPage() {
  const sensors = useSensors(useSensor(PointerSensor));

  const articles = mockArticles;

  /* ---------------- STATE ---------------- */
  const [left, setLeft] = useState<Article[]>([]);
  const [center, setCenter] = useState<CenterState>({
    hero: null,
    small: [],
    list: [],
  });
  const [right, setRight] = useState<Article[]>([]);

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const load = async () => {
      const data = await fetchLayout();
      const comps = data?.components ?? [];

      if (!comps.length) {
        setCenter({
          hero: articles[0],
          small: articles.slice(1, 5).map((a) => ({
            ...a,
            id: safeId("small", a.id),
          })),
          list: [],
        });

        setLeft([]);
        return;
      }

      setCenter({
        hero: comps.find((c: ComponentConfig) => c.type === "HERO")?.config ?? null,
        small: comps
          .filter((c: ComponentConfig) => c.type === "SMALL")
          .flatMap((c: ComponentConfig) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
        list: comps
          .filter((c: ComponentConfig) => c.type === "LIST")
          .flatMap((c: ComponentConfig) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      });

      setRight(
        comps
          .filter((c: ComponentConfig) => c.type === "INSIGHT")
          .flatMap((c: ComponentConfig) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      );
      setLeft(
        comps
          .filter((c: ComponentConfig) => c.type === "HEADLINE")
          .flatMap((c: ComponentConfig) =>
            Array.isArray(c.config) ? c.config : [c.config],
          ),
      );
    };

    load();
  }, [articles]);

  /* ---------------- ADD ---------------- */
  const handleAddComponent = (type: string) => {
    const article = {
      ...articles[Math.floor(Math.random() * articles.length)],
      id: crypto.randomUUID(),
    };

    switch (type) {
      case "INSIGHT":
        setRight((p) => [
          ...p,
          {
            ...article,
            id: `${article.id}-${crypto.randomUUID()}`,
          },
        ]);
        break;
      case "HEADLINE":
        setLeft((p) => [...p, article]);
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

  /* ---------------- FIND ---------------- */
  const findContainer = (id: string) => {
    if (left.some((i) => i.id === id)) return "left";
    if (center.small.some((i) => i.id === id)) return "small";
    if (center.list.some((i) => i.id === id)) return "list";
    if (right.some((i) => i.id === id)) return "right"; // ✅ ADD THIS
    return null;
  };

  /* ---------------- DRAG ---------------- */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const from = findContainer(activeId);
    const to = findContainer(overId);

    if (!from || !to) return;
    if (from === "right" || to === "right") {
      setRight((prev) => {
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

    if (from === "small" || to === "small") {
      setCenter((prev) => {
        const updated = [...prev.small];

        const fromIndex = updated.findIndex((i) => i.id === activeId);
        const toIndex = updated.findIndex((i) => i.id === overId);

        if (fromIndex === -1) return prev;

        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

        return { ...prev, small: updated };
      });
      return;
    }

    if (from === "list" || to === "list") {
      setCenter((prev) => {
        const updated = [...prev.list];

        const fromIndex = updated.findIndex((i) => i.id === activeId);
        const toIndex = updated.findIndex((i) => i.id === overId);

        if (fromIndex === -1) return prev;

        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex === -1 ? updated.length : toIndex, 0, moved);

        return { ...prev, list: updated };
      });
    }
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    await saveLayout("explore", [
      ...left.map((i) => ({
        type: "HEADLINE",
        config: i,
        position: "LEFT",
      })),
      ...center.small.map((i) => ({
        type: "SMALL",
        config: i,
        position: "CENTER",
      })),
      ...center.list.map((i) => ({
        type: "LIST",
        config: i,
        position: "CENTER",
      })),
      ...(center.hero
        ? [
            {
              type: "HERO",
              config: center.hero,
              position: "CENTER",
            },
          ]
        : []),

      ...right.map((i) => ({
        type: "INSIGHT",
        config: i,
        position: "RIGHT",
      })),
    ]);
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
  /* ---------------- UI ---------------- */
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

        <ExploreLayout
          left={
            <div className="space-y-8 min-h-screen">
              <DiscoveryNodes
                categories={[
                  { id: "cat-0", name: "Politics" },
                  { id: "cat-1", name: "Tech" },
                ]}
                articles={articles}
                setSelectedCategory={() => {}}
              />

              <div className="rounded-[36px] p-8 border border-white/10 bg-[var(--glass-bg)]">
                <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em]">
                  Quick Access
                </h3>

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
                        <div className="p-4 rounded-2xl border border-white/10">
                          <h4 className="text-sm font-bold">{item.title}</h4>
                          <p className="text-xs opacity-70">
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
                  id={center.hero.id}
                  type={center.hero.type}
                  createdAt={center.hero.createdAt}
                  title={center.hero.title}
                  description={center.hero.description}
                  sources={(center.hero.sources as string[]).map((s: string) => ({ source: s, title: s, url: s }))}
                  status="LIVE"
                  imageUrl={center.hero.imageUrl}
                />
              )}

              <SortableContext
                items={center.small.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid md:grid-cols-2 gap-8">
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
                        badge="EXPLORE"
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
              <TrendingPanel articles={articles.slice(0, 5)} />
              <SortableContext
                items={right.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="space-y-4">
                  {right.map((item) => (
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
            </div>
          }
        />
      </DndContext>
    </div>
  );
}
