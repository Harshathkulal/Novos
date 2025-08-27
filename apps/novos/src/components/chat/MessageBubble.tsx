import { extractTime } from "@/utils/extractTime";

interface MessageBubbleProps {
  message: {
    senderId: string;
    message: string;
    createdAt?: string;
    senderName?: string;
  };
  fromMe: boolean;
}

const MessageBubble = ({ message, fromMe }: MessageBubbleProps) => {
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 pb-1 rounded-lg max-w-xs break-words ${
          fromMe
            ? "bg-teal-800 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        }`}
      >
        {/* Optional sender name for group chat */}
        {!fromMe && message.senderName && (
          <p className="text-xs font-semibold text-gray-300 mb-1">
            {message.senderName}
          </p>
        )}

        {/* Message text */}
        <p className="text-sm">{message.message}</p>

        {/* Timestamp */}
        <div className="text-right text-[8px] text-gray-300">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
