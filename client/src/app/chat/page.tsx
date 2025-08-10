"use client";
import ChatWindow from "@/components/chat/chatWindow";
import UserList from "@/components/chat/userList";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/redux/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const { userId: authUserId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUserId) {
      router.push("/login");
    }
  }, [authUserId, loading, router]);

  return (
    <div className="flex h-screen">
      <div
        className={`w-full md:w-1/3 border-r ${
          receiver ? "hidden" : "block"
        } md:block`}
      >
        <UserList users={users} onSelect={setReceiver} />
      </div>

      <div
        className={`w-full md:w-2/3 ${receiver ? "block" : "hidden"} md:block`}
      >
        <ChatWindow
          messages={messages}
          receiver={receiver}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          messagesEndRef={messagesEndRef}
          userId={userId}
          onBack={() => setReceiver(null)}
        />
      </div>
    </div>
  );
}
