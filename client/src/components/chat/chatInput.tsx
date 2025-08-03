import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatInputProps } from "@/types/chat.types";

export default function ChatInput({ input, setInput, onSend }: ChatInputProps) {
  return (
    <div className="mt-4 flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <Button onClick={onSend}>Send</Button>
    </div>
  );
}
