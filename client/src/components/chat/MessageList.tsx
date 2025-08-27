import MessageBubble from "@/components/chat/MessageBubble";
import MessageSkeleton from "@/components/chat/MessageSkeleton";
import type { MessageListProps } from "@/types/chat.types";
import { useEffect, useRef } from "react";

export default function MessageList({
  messages,
  userId,
  messageLoading = false,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-2 mb-4">
      {messageLoading ? (
        <MessageSkeleton />
      ) : messages && messages.length > 0 ? (
        <>
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              fromMe={msg.senderId === userId}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <p className="text-sm text-gray-400 text-center mt-4">
          No messages yet
        </p>
      )}
    </div>
  );
}
