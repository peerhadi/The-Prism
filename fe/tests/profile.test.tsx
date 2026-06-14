// tests/profile.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProfilePage from "@/app/(user)/profile/page";

// --------------------
// MOCKS
// --------------------

const reloadMock = vi.fn();

Object.defineProperty(window, "location", {
  value: {
    reload: reloadMock,
  },
  writable: true,
});

// --------------------
// FORMIK MOCK
// --------------------

let latestFormik: Record<string, unknown>;

vi.mock("formik", () => ({
  useFormik: (config: Record<string, unknown>) => {
    latestFormik = {
      values: config.initialValues,
      handleChange: vi.fn(),
      handleSubmit: (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.();

        return config.onSubmit({
          username: "updated-user",
          email: "updated@test.com",
          bio: "updated bio",
        });
      },
    };

    return latestFormik;
  },
}));

// --------------------
// COMPONENT MOCKS
// --------------------

vi.mock("@/app/components/loadingScreen", () => ({
  PrismLoader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/app/components/settings/profile/ProfileHeader", () => ({
  default: () => <div data-testid="profile-header">Header</div>,
}));

vi.mock("@/app/components/settings/profile/IdentitySection", () => ({
  default: ({ user, formik }: { user: { username: string }; formik: { handleSubmit: () => void } }) => (
    <div data-testid="identity-section">
      <div>{user.username}</div>

      <button data-testid="save-btn" onClick={() => formik.handleSubmit()}>
        Save
      </button>
    </div>
  ),
}));

vi.mock("@/app/components/settings/profile/StatsSection", () => ({
  default: () => <div data-testid="stats-section">Stats</div>,
}));

// --------------------
// STORAGE MOCK
// --------------------

const localStorageMock = {
  getItem: vi.fn(() => "test-token"),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// --------------------
// FETCH MOCK
// --------------------

beforeEach(() => {
  vi.clearAllMocks();

  global.fetch = vi.fn((url: string, options?: RequestInit) => {
    // AUTH ME
    if (String(url).includes("/auth/me")) {
      return Promise.resolve({
        json: async () => ({
          id: 1,
          username: "peer",
          email: "peer@test.com",
          bio: "hello",
        }),
      });
    }

    // UPDATE USER
    if (String(url).includes("/api/users/") && options?.method === "PUT") {
      return Promise.resolve({
        json: async () => ({
          success: true,
        }),
      });
    }

    return Promise.resolve({
      json: async () => ({}),
    });
  }) as vi.Mock;
});

// --------------------
// TESTS
// --------------------

describe("ProfilePage", () => {
  it("shows loader initially", () => {
    render(<ProfilePage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("loads user profile", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    });

    expect(screen.getByTestId("identity-section")).toBeInTheDocument();

    expect(screen.getByTestId("stats-section")).toBeInTheDocument();

    expect(screen.getByText("peer")).toBeInTheDocument();
  });

  it("fetches current user", async () => {
    render(<ProfilePage />);

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

  it("reads token from localStorage", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    });
  });

  it("submits profile update", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByTestId("save-btn")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("save-btn"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/users/1",
        expect.objectContaining({
          method: "PUT",
        }),
      );
    });
  });

  it("reloads page after successful update", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByTestId("save-btn")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("save-btn"));

    await waitFor(() => {
      expect(reloadMock).toHaveBeenCalled();
    });
  });

  it("refreshes user after update", async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByTestId("save-btn")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("save-btn"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/me",
        expect.any(Object),
      );
    });
  });
});
