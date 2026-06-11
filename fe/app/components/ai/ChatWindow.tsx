"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Msg } from "./types";

export default function ChatWindow({ messages }: { messages: Msg[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto p-6 space-y-6"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} m={m} />
      ))}
    </div>
  );
}
