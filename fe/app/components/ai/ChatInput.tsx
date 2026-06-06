import { Send } from "lucide-react";

export default function ChatInput({ input, setInput, onSend }: any) {
  return (
    <div className="p-4 border-t border-white/10 flex gap-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Transmit neural query..."
        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-cyan-400/40"
      />

      <button
        onClick={onSend}
        className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30"
      >
        <Send className="text-cyan-300 w-4 h-4" />
      </button>
    </div>
  );
}
