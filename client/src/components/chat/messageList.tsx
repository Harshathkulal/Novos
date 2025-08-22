import MessageBubble from "@/components/chat/MessageBubble";
import { MessageListProps } from "@/types/chat.types";

export default function MessageList({
  messages,
  userId,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-2 mb-4">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} fromMe={msg.senderId === userId} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
