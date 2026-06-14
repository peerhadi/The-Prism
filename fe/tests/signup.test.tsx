// tests/signup.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import SignUpPage from "@/app/(user)/signup/page";

const pushMock = vi.fn();
const addToastMock = vi.fn();

let mockCode: string | null = null;
let googleLoginHandler: (() => void) | undefined;

// --------------------
// NEXT
// --------------------

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),

  useSearchParams: () => ({
    get: (key: string) => (key === "code" ? mockCode : null),
  }),
}));

// --------------------
// GOOGLE
// --------------------

vi.mock("@react-oauth/google", () => ({
  useGoogleLogin: (config: Record<string, unknown>) => {
    googleLoginHandler = () =>
      config.onSuccess({
        access_token: "google-token",
      });

    return googleLoginHandler;
  },
}));

// --------------------
// TOAST
// --------------------

vi.mock("@/lib/toast/toastStore", () => ({
  useToast: {
    getState: () => ({
      addToast: addToastMock,
    }),
  },
}));

// --------------------
// SIMPLE UI MOCKS
// --------------------

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <input
      data-testid="terms"
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

vi.mock("lucide-react", () => ({
  Clipboard: () => <span>Clipboard</span>,
}));

vi.mock("@/app/components/auth/AuthShell", () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="auth-shell">{children}</div>
  ),
}));

vi.mock("@/app/components/auth/AuthDivider", () => ({
  default: () => <div data-testid="divider" />,
}));

vi.mock("@/app/components/auth/OAuthButtons", () => ({
  default: ({ onGoogle, onGithub }: { onGoogle: () => void; onGithub: () => void }) => (
    <>
      <button onClick={onGoogle}>Google OAuth</button>
      <button onClick={onGithub}>Github OAuth</button>
    </>
  ),
}));

vi.mock("@/app/components/auth/AuthField", () => ({
  default: ({ name, value, onChange }: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input data-testid={name} name={name} value={value} onChange={onChange} />
  ),
}));

vi.mock("@/app/components/auth/PasswordField", () => ({
  default: ({ name, value, onChange }: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input data-testid={name} name={name} value={value} onChange={onChange} />
  ),
}));

// --------------------
// TEST SETUP
// --------------------

beforeEach(() => {
  vi.clearAllMocks();

  mockCode = null;

  Object.defineProperty(window, "location", {
    value: {
      assign: vi.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, "history", {
    value: {
      replaceState: vi.fn(),
    },
    writable: true,
  });

  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: vi.fn(),
    },
  });

  global.fetch = vi.fn((url: string) => {
    // GOOGLE USER
    if (String(url).includes("googleapis")) {
      return Promise.resolve({
        json: async () => ({
          name: "Google User",
          email: "google@test.com",
          sub: "google-id",
        }),
      });
    }

    // GITHUB CALLBACK
    if (String(url).includes("/auth/github")) {
      return Promise.resolve({
        json: async () => ({
          user: {
            login: "github-user",
            email: "github@test.com",
            node_id: "github-secret",
          },
        }),
      });
    }

    // REGISTER
    if (String(url).includes("/auth/register")) {
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

describe("SignUpPage", () => {
  it("renders form", () => {
    render(<SignUpPage />);

    expect(screen.getByTestId("fullName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  it("does not register when terms unchecked", async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByTestId("fullName"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Register Account"));

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalledWith(
        expect.stringContaining("/auth/register"),
        expect.anything(),
      );
    });
  });

  it("registers successfully", async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByTestId("fullName"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByTestId("terms"));

    fireEvent.click(screen.getByText("Register Account"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/register",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    expect(
      screen.getByText("Account created successfully"),
    ).toBeInTheDocument();
  });

  it("handles github callback", async () => {
    mockCode = "github-code";

    render(<SignUpPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/github",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    expect(screen.getByDisplayValue("github-user")).toBeInTheDocument();

    expect(screen.getByDisplayValue("github@test.com")).toBeInTheDocument();
  });

  it("handles google oauth", async () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByText("Google OAuth"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        expect.any(Object),
      );
    });

    expect(screen.getByDisplayValue("Google User")).toBeInTheDocument();

    expect(screen.getByDisplayValue("google@test.com")).toBeInTheDocument();
  });

  it("redirects to github oauth page", () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByText("Github OAuth"));

    expect(window.location.assign).toHaveBeenCalled();
  });

  it("continue button redirects to login", async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByTestId("fullName"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByTestId("terms"));

    fireEvent.click(screen.getByText("Register Account"));

    await waitFor(() => {
      expect(
        screen.getByText("Account created successfully"),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Continue"));

    expect(addToastMock).toHaveBeenCalled();

    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
