"use client";
import ChatWindow from "@/components/chat/chatWindow";
import UserList from "@/components/chat/userList";
import { useChat } from "@/hooks/useChat";

export default function Chat() {
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

  return (
    <div className="flex h-screen">
      <UserList users={users} onSelect={setReceiver} />
      <ChatWindow
        messages={messages}
        receiver={receiver}
        input={input}
        setInput={setInput}
        onSend={handleSend}
        messagesEndRef={messagesEndRef}
        userId={userId}
      />
    </div>
  );
}
