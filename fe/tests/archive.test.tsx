import ArchivePage from "@/app/(user)/archive/page";
import { Article } from "@/lib/api/articles/types";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

/* -----------------------------
   MOCK NEXT / CLIENT BEHAVIOR
------------------------------*/
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

/* -----------------------------
   MOCK CHILD COMPONENTS (keep minimal)
------------------------------*/
vi.mock("@/app/components/crud/archive/ArchiveLayout", () => ({
  default: ({ hero, left, center, right }: any) => (
    <div>
      <div data-testid="hero">{hero}</div>
      <div data-testid="left">{left}</div>
      <div data-testid="center">{center}</div>
      <div data-testid="right">{right}</div>
    </div>
  ),
}));

vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../components/HeroCard", () => ({
  default: (props: any) => <div data-testid="hero-card">{props.title}</div>,
}));

vi.mock("@/app/components/SmallCard", () => ({
  default: (props: any) => <div data-testid="small-card">{props.title}</div>,
}));

vi.mock("@/app/components/ListCard", () => ({
  default: (props: any) => <div data-testid="list-card">{props.title}</div>,
}));

vi.mock("../components/HeadlineCard", () => ({
  HeadlineCard: (props: any) => (
    <div data-testid="headline-card">
      {props.data?.map((d: any, i: number) => (
        <div key={i}>{d.title}</div>
      ))}
    </div>
  ),
}));

vi.mock("@/app/components/crud/archive/ArchiveHero", () => ({
  default: () => <div data-testid="archive-hero">Hero</div>,
}));

vi.mock("@/app/components/crud/archive/ArchiveCategoryIndex", () => ({
  default: () => <div data-testid="category-index">Categories</div>,
}));

vi.mock("@/app/components/crud/archive/ArchiveLogs", () => ({
  default: () => <div data-testid="logs">Logs</div>,
}));

vi.mock("@/app/components/crud/archive/ArchiveStickyGrid", () => ({
  default: () => <div data-testid="sticky-grid">Grid</div>,
}));

/* -----------------------------
   MOCK FETCH
------------------------------*/
global.fetch = vi.fn();

/* -----------------------------
   INLINE MOCK DATA (YOUR FORMAT)
------------------------------*/
const mockArticles: Article[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `id-${i}`,
  categoryId: i % 2 === 0 ? "cat-1" : "cat-2",
  title: `Article ${i}`,
  description: `Description ${i}`,
  summary: `Summary ${i}`,
  biasLevel: i,
  imageUrl: null,
  sources: [],
  type: "NEWS" as any,
  createdAt: new Date(2025, 0, i + 1).toISOString(),
}));

const mockCategories = [
  { id: "cat-1", name: "Tech" },
  { id: "cat-2", name: "World" },
];

/* -----------------------------
   TESTS
------------------------------*/
describe("ArchivePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (fetch as any).mockImplementation((url: string) => {
      if (url.includes("categories")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCategories),
        });
      }

      if (url.includes("articles")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockArticles),
        });
      }
    });
  });

  it("shows loader initially", async () => {
    render(<ArchivePage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders archive layout after fetch", async () => {
    render(<ArchivePage />);

    await waitFor(() => {
      expect(screen.getByTestId("left")).toBeInTheDocument();
      expect(screen.getByTestId("center")).toBeInTheDocument();
      expect(screen.getByTestId("right")).toBeInTheDocument();
    });
  });

  it("renders hero story", async () => {
    render(<ArchivePage />);

    await waitFor(() => {
      expect(screen.getByTestId("hero-card")).toBeInTheDocument();
    });
  });

  it("renders category index", async () => {
    render(<ArchivePage />);

    await waitFor(() => {
      expect(screen.getByTestId("category-index")).toBeInTheDocument();
    });
  });

  it("renders headlines", async () => {
    render(<ArchivePage />);

    await waitFor(() => {
      expect(screen.getByTestId("headline-card")).toBeInTheDocument();
    });
  });
});
