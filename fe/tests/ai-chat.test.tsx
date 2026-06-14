import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NeuralAIConsole from "@/app/(user)/ai-chat/page";

/* ---------------- MOCK FETCH ---------------- */
global.fetch = vi.fn();

/* ---------------- OPTIONAL: MOCK LUCIDE ICONS (safe fallback) ---------------- */
vi.mock("lucide-react", () => {
  return {
    Bot: () => <div data-testid="bot-icon" />,
    Activity: () => <div data-testid="activity-icon" />,
  };
});

/* ---------------- MOCK CHILD COMPONENTS (IMPORTANT for isolation) ---------------- */
vi.mock("@/app/components/ai/NeuralBackground", () => ({
  default: () => <div data-testid="bg" />,
}));

vi.mock("@/app/components/ai/SideLeftPanel", () => ({
  default: () => <div data-testid="left-panel" />,
}));

vi.mock("@/app/components/ai/SideRightPanel", () => ({
  default: () => <div data-testid="right-panel" />,
}));

vi.mock("@/app/components/ai/ChatWindow", () => ({
  default: ({ messages }: { messages: Array<{ text: string }> }) => (
    <div data-testid="chat-window">
      {messages.map((m: { text: string }, i: number) => (
        <div key={i}>{m.text}</div>
      ))}
    </div>
  ),
}));

vi.mock("@/app/components/ai/ChatInput", () => ({
  default: ({ input, setInput, onSend }: { input: string; setInput: (val: string) => void; onSend: () => void }) => (
    <div>
      <input
        role="textbox"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={onSend}>send</button>
    </div>
  ),
}));

/* ---------------- TEST SUITE ---------------- */
describe("NeuralAIConsole", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders initial AI message", () => {
    render(<NeuralAIConsole />);

    expect(screen.getByText(/Hi, I’m Prism AI/i)).toBeInTheDocument();
  });

  it("updates input field correctly", async () => {
    const user = userEvent.setup();

    render(<NeuralAIConsole />);

    const input = screen.getByRole("textbox");

    await user.type(input, "hello world");

    expect(input).toHaveValue("hello world");
  });

  it("sends message and appends AI response", async () => {
    const user = userEvent.setup();

    (fetch as vi.Mock).mockResolvedValue({
      json: async () => ({
        response: "Hello human 👋",
      }),
    });

    render(<NeuralAIConsole />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await user.type(input, "hi");
    await user.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Hello human 👋")).toBeInTheDocument();
    });
  });

  it("does not send empty input", async () => {
    const user = userEvent.setup();

    render(<NeuralAIConsole />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(fetch).not.toHaveBeenCalled();
  });
});
