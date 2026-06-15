import { Msg } from "./types";

export default function MessageBubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 py-3 text-sm border"
        style={{
          background: isUser ? "var(--primary-soft)" : "var(--surface)",
          borderColor: isUser ? "var(--primary-border)" : "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        {m.text}
      </div>
    </div>
  );
}
