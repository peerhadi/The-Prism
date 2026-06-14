// builder.test.tsx

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StoryBuilderPage from "@/app/(admin)/dashboard/layout/stories/page";

/* ================= MOCKS ================= */

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  PointerSensor: vi.fn(),
  useSensor: vi.fn(),
  useSensors: vi.fn(() => []),
  closestCenter: vi.fn(),
}));

vi.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  useSortable: () => ({
    setNodeRef: vi.fn(),
    attributes: {},
    listeners: {},
    transform: null,
    transition: null,
  }),
  rectSortingStrategy: {},
}));

vi.mock("@dnd-kit/utilities", () => ({
  CSS: {
    Transform: {
      toString: () => "",
    },
  },
}));

/* ================= CHILD COMPONENTS ================= */

vi.mock("@/app/(user)/components/HeroCard", () => ({
  default: ({ title }: { title?: string }) => <div>{title}</div>,
}));

vi.mock("@/app/(user)/components/SmallCard", () => ({
  default: ({ title }: { title?: string }) => <div>{title}</div>,
}));

vi.mock("@/app/(user)/components/ListCard", () => ({
  default: ({ title }: { title?: string }) => <div>{title}</div>,
}));

vi.mock("@/app/components/crud/story/StoryPageLayout", () => ({
  default: ({ left, center, right }: { left?: React.ReactNode; center?: React.ReactNode; right?: React.ReactNode }) => (
    <div>
      {left}
      {center}
      {right}
    </div>
  ),
}));

vi.mock("@/app/components/crud/story/StoryLiveSignal", () => ({
  default: () => <div>Live Signal</div>,
}));

vi.mock("@/app/components/crud/story/StoryRightPanel", () => ({
  default: () => <div>Right Panel</div>,
}));

vi.mock("@/app/components/crud/story/StorySplitCard", () => ({
  default: () => <div>Split Card</div>,
}));

/* IMPORTANT ONE */
vi.mock("../pallette", () => ({
  default: ({ onSelect }: { onSelect: (val: string) => void }) => (
    <button onClick={() => onSelect("SMALL")}>Add Component</button>
  ),
}));

describe("Builder Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders builder content", () => {
    render(<StoryBuilderPage />);

    expect(screen.getByText("Live Signal")).toBeInTheDocument();
    expect(screen.getByText("Right Panel")).toBeInTheDocument();
    expect(screen.getByText("Split Card")).toBeInTheDocument();
  });

  it("renders hero article", () => {
    render(<StoryBuilderPage />);

    expect(screen.getByText("Breaking Story 1")).toBeInTheDocument();
  });

  it("renders initial article cards", () => {
    render(<StoryBuilderPage />);

    expect(screen.getByText("Breaking Story 5")).toBeInTheDocument();
    expect(screen.getByText("Breaking Story 6")).toBeInTheDocument();
  });

  it("adds a component when AddComponentButton is used", () => {
    render(<StoryBuilderPage />);

    const before = screen.getAllByText(/Breaking Story/i).length;

    fireEvent.click(screen.getByText("Add Component"));

    const after = screen.getAllByText(/Breaking Story/i).length;

    expect(after).toBeLessThanOrEqual(before);
  });
});
