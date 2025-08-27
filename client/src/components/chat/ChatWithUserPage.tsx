import { useChat } from "@/hooks/useChat";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatWithUserPage() {
  const {
    receiver,
    messages,
    input,
    setInput,
    handleSend,
    userId,
    messageLoading,
  } = useChat();

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
      userId={userId ?? null}
      messageLoading={messageLoading}
    />
  );
}
