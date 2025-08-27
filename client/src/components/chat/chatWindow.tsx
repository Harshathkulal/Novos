import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import type { ChatWindowProps } from "@/types/chat.types";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatWindow({
  receiver,
  messages,
  input,
  setInput,
  onSend,
  userId,
  messageLoading,
}: ChatWindowProps) {
  const navigate = useNavigate();
  const onBack = () => navigate("/chat");

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <button className="text-sm md:hidden cursor-pointer" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-lg font-semibold">{receiver?.username}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <MessageList
          messages={messages}
          userId={userId}
          messageLoading={messageLoading}
        />
      </div>
      <div className="sticky bottom-0 p-4">
        <ChatInput input={input} setInput={setInput} onSend={onSend} />
      </div>
    </div>
  );
}
