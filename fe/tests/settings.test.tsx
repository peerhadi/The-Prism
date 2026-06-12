// tests/settings.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import SettingsPage from "@/app/(user)/settings/page";

// --------------------
// MOCKS
// --------------------

const localStorageMock = {
  getItem: vi.fn(() => "test-token"),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// --------------------
// COMPONENTS
// --------------------

vi.mock("lucide-react", () => ({
  Activity: () => <div>Activity</div>,
}));

vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/app/components/settings/website/AIFeaturesCard", () => ({
  default: () => <div data-testid="ai-card">AI Card</div>,
}));

vi.mock("@/app/components/settings/website/ThemeCard", () => ({
  default: ({ setTheme }: any) => (
    <div data-testid="theme-card">
      <button data-testid="dark-theme" onClick={() => setTheme("dark")}>
        Dark
      </button>

      <button data-testid="light-theme" onClick={() => setTheme("light")}>
        Light
      </button>
    </div>
  ),
}));

vi.mock("@/app/components/settings/website/PrivacyCard", () => ({
  default: () => <div data-testid="privacy-card">Privacy Card</div>,
}));

vi.mock("@/app/components/settings/website/SourcesCard", () => ({
  default: ({
    sources,
    newSource,
    setNewSource,
    addSource,
    removeSource,
    resetSources,
  }: any) => (
    <div data-testid="sources-card">
      <input
        data-testid="source-input"
        value={newSource}
        onChange={(e) => setNewSource(e.target.value)}
      />

      <button data-testid="add-source" onClick={addSource}>
        Add
      </button>

      <button data-testid="reset-sources" onClick={resetSources}>
        Reset
      </button>

      {sources.map((s: string) => (
        <div key={s}>
          <span>{s}</span>

          <button onClick={() => removeSource(s)}>Remove {s}</button>
        </div>
      ))}
    </div>
  ),
}));

// --------------------
// FETCH
// --------------------

beforeEach(() => {
  vi.clearAllMocks();

  document.body.className = "";

  global.fetch = vi.fn((url: any) => {
    if (String(url).includes("/auth/me")) {
      return Promise.resolve({
        json: async () => ({
          id: 1,
          friendRequests: true,
          publicProfile: true,
        }),
      });
    }

    return Promise.resolve({
      json: async () => ({}),
    });
  }) as any;
});

// --------------------
// TESTS
// --------------------

describe("SettingsPage", () => {
  it("shows loader initially", () => {
    render(<SettingsPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("reads token from localStorage", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    });
  });

  it("fetches current user", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/me",
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        },
      );
    });
  });

  it("renders cards after load", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("sources-card")).toBeInTheDocument();
    });

    expect(screen.getByTestId("ai-card")).toBeInTheDocument();

    expect(screen.getByTestId("theme-card")).toBeInTheDocument();

    expect(screen.getByTestId("privacy-card")).toBeInTheDocument();
  });

  it("adds source", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("sources-card")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("source-input"), {
      target: {
        value: "Reuters",
      },
    });

    fireEvent.click(screen.getByTestId("add-source"));

    expect(screen.getByText("Reuters")).toBeInTheDocument();
  });

  it("removes source", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("sources-card")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("source-input"), {
      target: {
        value: "Reuters",
      },
    });

    fireEvent.click(screen.getByTestId("add-source"));

    fireEvent.click(screen.getByText("Remove Reuters"));

    expect(screen.queryByText("Reuters")).not.toBeInTheDocument();
  });

  it("resets sources", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("sources-card")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("reset-sources"));

    expect(screen.getByText("The New York Times")).toBeInTheDocument();

    expect(screen.getByText("BBC")).toBeInTheDocument();

    expect(screen.getByText("Al Jazeera")).toBeInTheDocument();
  });

  it("switches to dark theme", async () => {
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("theme-card")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("dark-theme"));

    expect(document.body.classList.contains("dark")).toBe(true);
  });

  it("switches to light theme", async () => {
    document.body.classList.add("dark");

    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("theme-card")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("light-theme"));

    expect(document.body.classList.contains("dark")).toBe(false);
  });
});
