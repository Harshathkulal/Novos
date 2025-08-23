"use client";

import ChatWindow from "@/components/chat/chatWindow";
import { useChat } from "@/hooks/useChat";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ChatWithUserPage() {
  const {
    users,
    receiver,
    setReceiver,
    messages,
    input,
    setInput,
    handleSend,
    messagesEndRef,
    userId,
  } = useChat();

  const router = useRouter();
  const params = useParams();
  const selectedUserId = params.userId as string;

  useEffect(() => {
    if (selectedUserId && users?.length > 0) {
      const selectedUser = users.find((u) => u.id === selectedUserId);
      if (selectedUser) {
        setReceiver(selectedUser);
      }
    }
  }, [selectedUserId, users, setReceiver]);

  if (!receiver) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Loading chat...
      </div>
    );
  }

  return (
    <ChatWindow
      messages={messages}
      receiver={receiver}
      input={input}
      setInput={setInput}
      onSend={handleSend}
      messagesEndRef={messagesEndRef}
      userId={userId}
      onBack={() => router.push("/chat")}
    />
  );
}
