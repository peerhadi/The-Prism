import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import NarrativeSplitPage from "@/app/(user)/narrative-split/page";

// ----------------------
// MOCK CHILD COMPONENTS
// ----------------------

vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading</div>,
}));

vi.mock("@/app/components/crud/split/SplitHero", () => ({
  default: () => <div data-testid="split-hero">Hero</div>,
}));

vi.mock("@/app/components/crud/split/SplitSection", () => ({
  default: ({ event }: any) => (
    <div data-testid="split-section">
      {event.neutral.title} | {event.extreme.title}
    </div>
  ),
}));

vi.mock("@/app/components/crud/split/ConflictCTA", () => ({
  default: () => <div data-testid="cta">CTA</div>,
}));

// ----------------------
// MOCK FETCH
// ----------------------

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockData = [
  {
    neutral: { title: "Neutral 1" },
    extreme: { title: "Extreme 1" },
    imageUrl: "img1",
  },
  {
    neutral: { title: "Neutral 2" },
    extreme: { title: "Extreme 2" },
    imageUrl: "img2",
  },
  {
    neutral: { title: "Neutral 3" },
    extreme: { title: "Extreme 3" },
    imageUrl: "img3",
  },
  {
    neutral: { title: "Neutral 4" },
    extreme: { title: "Extreme 4" },
    imageUrl: "img4",
  },
  {
    neutral: { title: "Neutral 5" },
    extreme: { title: "Extreme 5" },
    imageUrl: "img5",
  },
];

function mockFetch(data: any) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    } as any),
  );
}

// ----------------------
// TESTS
// ----------------------

describe("NarrativeSplitPage", () => {
  it("shows loader initially", async () => {
    mockFetch(mockData);

    render(<NarrativeSplitPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders hero + CTA", async () => {
    mockFetch(mockData);

    render(<NarrativeSplitPage />);

    await waitFor(() => {
      expect(screen.getByTestId("split-hero")).toBeInTheDocument();
      expect(screen.getByTestId("cta")).toBeInTheDocument();
    });
  });

  it("renders max 4 split sections", async () => {
    mockFetch(mockData);

    render(<NarrativeSplitPage />);

    await waitFor(() => {
      const sections = screen.getAllByTestId("split-section");
      expect(sections.length).toBe(4);
    });
  });

  it("passes correct event data", async () => {
    mockFetch(mockData);

    render(<NarrativeSplitPage />);

    await waitFor(() => {
      expect(screen.getByText(/Neutral 1 \| Extreme 1/)).toBeInTheDocument();
    });
  });
});
