import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

/* ---------------- MOCK router ---------------- */
const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: replaceMock,
    prefetch: vi.fn(),
  }),
}));

/* ---------------- MOCK lucide-react (safe proxy) ---------------- */
vi.mock("lucide-react", () => {
  const createIcon = (name: string) => {
    const Icon = (props: Record<string, unknown>) => (
      <div data-testid={`icon-${name}`} {...props} />
    );
    Icon.displayName = name;
    return Icon;
  };

  return {
    // add EVERY icon your app might use
    ChevronRight: createIcon("chevron-right"),
    ArrowRight: createIcon("arrow-right"),
    User: createIcon("user"),
    Settings: createIcon("settings"),
    LogOut: createIcon("logout"),
    Menu: createIcon("menu"),
    X: createIcon("x"),
    Radar: createIcon("radar"), // ✅ FIXED (your crash)
    Orbit: createIcon("Orbit"),
    Layers: createIcon("Layers"),
    ScanLine: createIcon("ScanLine"),
    Cpu: createIcon("Cpu"),
    BarChart3: createIcon("BarChart3"),
    Zap: createIcon("Zap"),
    Maximize: createIcon("Maximize"),
    Globe: createIcon("Globe"),
    ShieldCheck: createIcon("ShieldCheck"),
    // safety net (prevents future crashes)
    default: {},
  };
});

/* ---------------- IMPORT COMPONENT ---------------- */
import HomePage from "@/app/page";

/* ---------------- TESTS ---------------- */
describe("HomePage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    localStorage.clear();
  });

  it("renders hero text correctly", () => {
    render(<HomePage />);

    expect(screen.getAllByText(/refract/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/the signal/i)[0]).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders module section titles", () => {
    render(<HomePage />);
    expect(screen.getAllByText(/signal/i)[0]).toBeInTheDocument();
  });

  it("does NOT redirect if no token exists", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(replaceMock).not.toHaveBeenCalled();
    });
  });

  it("redirects to /stories if token exists", async () => {
    localStorage.setItem("token", "123");

    render(<HomePage />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/stories");
    });
  });
});
