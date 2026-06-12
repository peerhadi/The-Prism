import ExplorePage from "@/app/(user)/explore/page";
import { render, screen, waitFor } from "@testing-library/react";

// ------------------------
// MOCKS
// ------------------------

global.fetch = vi.fn();

// simple mock UI components so test focuses on logic, not UI internals
vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading</div>,
}));

vi.mock("@/app/components/crud/explore/ExploreLayout", () => ({
  default: ({ hero, left, center, right }: any) => (
    <div>
      <div data-testid="hero">{hero}</div>
      <div data-testid="left">{left}</div>
      <div data-testid="center">{center}</div>
      <div data-testid="right">{right}</div>
    </div>
  ),
}));

vi.mock("@/app/components/crud/explore/ExploreHero", () => ({
  default: () => <div data-testid="explore-hero">Hero</div>,
}));

vi.mock("@/app/components/crud/explore/DiscoveryNodes", () => ({
  default: () => <div data-testid="discovery">Discovery</div>,
}));

vi.mock("@/app/components/crud/explore/QuickAccessPanel", () => ({
  default: () => <div data-testid="quick">Quick</div>,
}));

vi.mock("@/app/components/crud/explore/TrendingPanel", () => ({
  default: () => <div data-testid="trending">Trending</div>,
}));

vi.mock("@/app/components/crud/explore/ResultsGrid", () => ({
  default: ({ articles, heroStory }: any) => (
    <div>
      <div data-testid="hero-card">{heroStory?.title}</div>
      <div data-testid="results-count">{articles.length}</div>
    </div>
  ),
}));

// ------------------------
// TEST DATA
// ------------------------

const mockCategories = [
  { id: "cat-1", averageBias: 0.2 },
  { id: "cat-2", averageBias: 0.8 },
];

const mockArticles = [
  {
    id: "1",
    title: "Hero Article",
    description: "desc",
    summary: "sum",
    imageUrl: "img",
    sources: ["a"],
    type: "HERO",
    categoryId: "cat-1",
  },
  {
    id: "2",
    title: "Small 1",
    description: "desc",
    summary: "sum",
    imageUrl: "img",
    sources: ["a"],
    type: "SMALL",
    categoryId: "cat-1",
  },
  {
    id: "3",
    title: "Small 2",
    description: "desc",
    summary: "sum",
    imageUrl: "img",
    sources: ["a"],
    type: "SMALL",
    categoryId: "cat-2",
  },
  {
    id: "4",
    title: "Small 3",
    description: "desc",
    summary: "sum",
    imageUrl: "img",
    sources: ["a"],
    type: "SMALL",
    categoryId: "cat-2",
  },
];

// ------------------------
// HELPERS
// ------------------------

beforeEach(() => {
  vi.clearAllMocks();

  (fetch as any)
    .mockResolvedValueOnce({
      json: async () => mockCategories,
    })
    .mockResolvedValueOnce({
      json: async () => mockArticles,
    });
});

// ------------------------
// TESTS
// ------------------------

describe("ExplorePage", () => {
  it("shows loader initially", async () => {
    render(<ExplorePage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders layout after fetch", async () => {
    render(<ExplorePage />);

    await screen.findByTestId("hero");

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("center")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("renders hero story in results grid", async () => {
    render(<ExplorePage />);

    expect(await screen.findByTestId("hero-card")).toHaveTextContent(
      "Hero Article",
    );
  });

  it("renders correct results count", async () => {
    render(<ExplorePage />);

    expect(await screen.findByTestId("results-count")).toHaveTextContent("4");
  });
});
