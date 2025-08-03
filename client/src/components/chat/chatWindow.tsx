import MessageList from "@/components/chat/messageList";
import ChatInput from "@/components/chat/chatInput";
import { ChatWindowProps } from "@/types/chat.types";

export default function ChatWindow({
  receiver,
  messages,
  input,
  setInput,
  onSend,
  messagesEndRef,
  userId,
}: ChatWindowProps) {
  if (!receiver) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Chat with {receiver.username}
      </h2>
      <MessageList
        messages={messages}
        userId={userId}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput input={input} setInput={setInput} onSend={onSend} />
    </div>
  );
}
