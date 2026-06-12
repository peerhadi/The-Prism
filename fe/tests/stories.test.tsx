import StoriesPage from "@/app/(user)/stories/page";
import { render, screen } from "@testing-library/react";

// ----------------------
// MOCKS
// ----------------------

global.fetch = vi.fn();

// Loader
vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading</div>,
}));

// Layout
vi.mock("@/app/components/crud/story/StoryPageLayout", () => ({
  default: ({ hero, left, center, right }: any) => (
    <div>
      <div data-testid="hero">{hero}</div>
      <div data-testid="left">{left}</div>
      <div data-testid="center">{center}</div>
      <div data-testid="right">{right}</div>
    </div>
  ),
}));

// Hero header
vi.mock("@/app/components/crud/story/StoryHeroHeader", () => ({
  default: ({ stats }: any) => (
    <div>
      <div data-testid="stats-count">{stats?.[0]?.value}</div>
    </div>
  ),
}));

// Other components
vi.mock("@/app/components/crud/story/StoryLiveSignal", () => ({
  default: () => <div data-testid="signal">Signal</div>,
}));

vi.mock("@/app/components/crud/story/StorySplitCard", () => ({
  default: () => <div data-testid="split">Split</div>,
}));

vi.mock("@/app/components/crud/story/StoryLiveStream", () => ({
  default: ({ small, list }: any) => (
    <div>
      <div data-testid="small-count">{small.length}</div>
      <div data-testid="list-count">{list.length}</div>
    </div>
  ),
}));

vi.mock("@/app/components/crud/story/StoryRightPanel", () => ({
  default: ({ headlines, anomaly }: any) => (
    <div>
      <div data-testid="headlines">{headlines.length}</div>
      <div data-testid="anomaly">{anomaly?.title || "none"}</div>
    </div>
  ),
}));

vi.mock("@/app/components/HeroCard", () => ({
  default: (props: any) => <div data-testid="hero-card">{props.title}</div>,
}));

// ----------------------
// MOCK DATA
// ----------------------

const mockCategories = [{ name: "World", averageBias: 0.3 }];

const mockPerspectives = [{ id: "p1" }];

const mockArticles = [
  {
    id: "1",
    type: "HERO",
    title: "Hero Story",
    summary: "Hero summary",
    description: "desc",
    imageUrl: "img",
    sources: ["a"],
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    type: "SMALL",
    title: "Small A",
    summary: "s",
    description: "d",
    imageUrl: "img",
    sources: ["a"],
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    type: "SMALL",
    title: "Small B",
    summary: "s",
    description: "d",
    imageUrl: "img",
    sources: ["a"],
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "4",
    type: "SMALL",
    title: "Small C",
    summary: "s",
    description: "d",
    imageUrl: "img",
    sources: ["a"],
    createdAt: "2025-01-01T00:00:00.000Z",
  },
];

// ----------------------
// FETCH MOCK SETUP
// ----------------------

beforeEach(() => {
  vi.clearAllMocks();

  (fetch as any)
    // categories
    .mockResolvedValueOnce({
      json: async () => mockCategories,
    })
    // perspectives
    .mockResolvedValueOnce({
      json: async () => mockPerspectives,
    })
    // articles
    .mockResolvedValueOnce({
      json: async () => mockArticles,
    });
});

// ----------------------
// TESTS
// ----------------------

describe("StoriesPage", () => {
  it("shows loader initially", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders layout after data loads", async () => {
    render(<StoriesPage />);

    expect(await screen.findByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("center")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("renders hero card", async () => {
    render(<StoriesPage />);

    expect(await screen.findByTestId("hero-card")).toHaveTextContent(
      "Hero Story",
    );
  });

  it("passes correct stats to hero header", async () => {
    render(<StoriesPage />);

    expect(await screen.findByTestId("stats-count")).toBeInTheDocument();
  });

  it("renders stream data correctly", async () => {
    render(<StoriesPage />);

    expect(await screen.findByTestId("small-count")).toHaveTextContent("2");
    expect(screen.getByTestId("list-count")).toHaveTextContent("2");
  });

  it("renders right panel data", async () => {
    render(<StoriesPage />);

    expect(await screen.findByTestId("headlines")).toHaveTextContent("4");
  });
});
