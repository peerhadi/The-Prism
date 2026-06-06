import { Msg } from "./types";

export default function MessageBubble({ m }: { m: Msg }) {
  return (
    <div
      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] lg:max-w-[70%] rounded-2xl px-4 py-3 text-sm border ${
          m.role === "user"
            ? "bg-purple-500/10 border-purple-500/20"
            : "bg-cyan-500/10 border-cyan-500/20"
        }`}
      >
        {m.text}
      </div>
    </div>
  );
}
