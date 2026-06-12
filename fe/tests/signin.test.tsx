import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SignInPage from "@/app/(user)/login/page";

// --------------------
// MOCKS
// --------------------

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: vi.fn(() => null),
  }),
}));

vi.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => vi.fn(),
}));

vi.mock("@/lib/toast/toastStore", () => ({
  useToast: {
    getState: () => ({
      addToast: vi.fn(),
    }),
  },
}));

// --------------------
// UI COMPONENTS
// --------------------

vi.mock("@/app/components/auth/AuthShell", () => ({
  default: ({ children }: any) => (
    <div data-testid="auth-shell">{children}</div>
  ),
}));

vi.mock("@/app/components/auth/AuthField", () => ({
  default: ({ value, onChange }: any) => (
    <input
      data-testid="email-input"
      value={value}
      onChange={onChange}
      name="email"
    />
  ),
}));

vi.mock("@/app/components/auth/PasswordField", () => ({
  default: ({ value, onChange }: any) => (
    <input
      data-testid="password-input"
      value={value}
      onChange={onChange}
      name="password"
    />
  ),
}));

vi.mock("@/app/components/auth/AuthDivider", () => ({
  default: () => <div data-testid="divider" />,
}));

vi.mock("@/app/components/auth/OAuthButtons", () => ({
  default: ({ onGoogle, onGithub }: any) => (
    <div>
      <button data-testid="google-btn" onClick={onGoogle}>
        Google
      </button>

      <button data-testid="github-btn" onClick={onGithub}>
        Github
      </button>
    </div>
  ),
}));

vi.mock("@/app/components/auth/SuccessPopup", () => ({
  default: ({ open }: any) =>
    open ? <div data-testid="success-popup">Popup</div> : null,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: () => <input type="checkbox" />,
}));

// --------------------
// TEST DATA
// --------------------

beforeEach(() => {
  vi.clearAllMocks();

  global.fetch = vi.fn((url: any) => {
    if (url.includes("/login")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            token: "test-token",
          }),
      } as any);
    }

    return Promise.resolve({
      json: () => Promise.resolve({}),
    } as any);
  });
});

// --------------------
// TESTS
// --------------------

describe("SignInPage", () => {
  it("renders login form", () => {
    render(<SignInPage />);

    expect(screen.getByTestId("auth-shell")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("renders oauth buttons", () => {
    render(<SignInPage />);

    expect(screen.getByTestId("google-btn")).toBeInTheDocument();
    expect(screen.getByTestId("github-btn")).toBeInTheDocument();
  });

  it("updates form values", () => {
    render(<SignInPage />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    expect(screen.getByTestId("email-input")).toHaveValue("test@test.com");

    expect(screen.getByTestId("password-input")).toHaveValue("password123");
  });

  it("opens success popup on submit", async () => {
    render(<SignInPage />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("success-popup")).toBeInTheDocument();
    });
  });

  it("calls login endpoint", async () => {
    render(<SignInPage />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/login",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  it("github button is clickable", () => {
    render(<SignInPage />);

    const assignSpy = vi
      .spyOn(window.location, "assign")
      .mockImplementation(() => {});

    fireEvent.click(screen.getByTestId("github-btn"));

    expect(assignSpy).toHaveBeenCalled();

    assignSpy.mockRestore();
  });
});
