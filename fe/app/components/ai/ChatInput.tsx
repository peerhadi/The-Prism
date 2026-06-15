import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({ input, setInput, onSend }: ChatInputProps) {
  return (
    <div
      className="p-4 flex gap-4 border-t"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      {/* INPUT */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Transmit neural query..."
        className="flex-1 rounded-xl px-5 py-4 text-sm outline-none"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          color: "var(--text-primary)",
        }}
      />

      {/* SEND BUTTON */}
      <button
        onClick={onSend}
        className="p-4 rounded-xl border transition"
        style={{
          background: "var(--primary-soft)",
          borderColor: "var(--primary-border)",
        }}
      >
        <Send className="w-4 h-4" style={{ color: "var(--primary)" }} />
      </button>
    </div>
  );
}
