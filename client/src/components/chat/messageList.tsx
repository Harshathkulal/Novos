import { MessageListProps } from "@/types/chat.types";

export default function MessageList({
  messages,
  userId,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-2 mb-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs p-2 rounded ${
            msg.senderId === userId
              ? "bg-primary text-white self-end"
              : "bg-gray-200 self-start"
          }`}
        >
          {msg.message}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
