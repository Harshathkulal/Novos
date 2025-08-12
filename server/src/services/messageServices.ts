import { RepositoryRepo } from "../repository/registry";
import { ApiError } from "../utils/apiError";

const { messageRepo } = RepositoryRepo();

export class MessageService {
  /**
   * Send a message from sender to receiver.
   * Throws ApiError on validation failure.
   */
  async sendMessage(senderId: string, receiverId: string, message: string) {
    if (!message.trim()) {
      throw new ApiError(400, "Message is required");
    }

  const newMessage = await messageRepo.createMessage({
    senderId,
    receiverId,
    message,
  });

  return {
    messageId: newMessage.id || newMessage._id?.toString(),
    message: newMessage.message,
    senderId: newMessage.senderId || newMessage.sender_id,
    createdAt: newMessage.createdAt || newMessage.created_at,
  };
}

  /**
   * Get all messages exchanged between two users.
   */
  async getConversationMessages(userId1: string, userId2: string) {
    const conversation = await messageRepo.getMessagesForConversation(
      userId1,
      userId2
    );

    if (!conversation) {
      return [];
    }

    // Format raw messages to simple objects
    return conversation.messages.map((msg: any) => ({
      id: msg.id,
      message: msg.message,
      senderId: msg.senderId.id || msg.senderId,
      createdAt: msg.createdAt,
    }));
  }
}
