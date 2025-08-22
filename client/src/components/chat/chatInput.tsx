import { SendHorizonal } from "lucide-react";
import { ChatInputProps } from "@/types/chat.types";

export default function ChatInput({ input, setInput, onSend }: ChatInputProps) {
  const isInputEmpty = input.trim() === "";

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isInputEmpty) onSend();
        }}
        placeholder="Type a message..."
        className="w-full rounded-full border px-4 pr-10 py-2 text-sm outline-none"
      />

      <button
        onClick={onSend}
        disabled={isInputEmpty}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-opacity ${
          isInputEmpty ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <SendHorizonal className="w-5 h-5" />
      </button>
    </div>
  );
}
