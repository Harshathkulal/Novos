import MessageList from "@/components/chat/messageList";
import ChatInput from "@/components/chat/chatInput";
import { ChatWindowProps } from "@/types/chat.types";
import { ArrowLeft } from "lucide-react";

export default function ChatWindow({
  receiver,
  messages,
  input,
  setInput,
  onSend,
  messagesEndRef,
  userId,
  onBack,
}: ChatWindowProps) {
  if (!receiver) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        {onBack && (
          <button className="text-sm md:hidden cursor-pointer" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className="text-lg font-semibold">{receiver.username}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <MessageList
          messages={messages}
          userId={userId}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <div className="p-4">
        <ChatInput input={input} setInput={setInput} onSend={onSend} />
      </div>
    </div>
  );
}
