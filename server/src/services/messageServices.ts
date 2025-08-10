import { MessageRepository } from "../repository/mongoDB/messageDB";
import { ApiError } from "../utils/apiError";

const messageDB = new MessageRepository();

export class MessageService {
  /**
   * Send a message from sender to receiver.
   * Throws ApiError on validation failure.
   */
  async sendMessage(senderId: string, receiverId: string, message: string) {
    if (!message.trim()) {
      throw new ApiError(400, "Message is required");
    }

    // Find existing conversation or create new one
    let conversation = await messageDB.findConversationBetweenUsers(
      senderId,
      receiverId
    );

    if (!conversation) {
      conversation = await messageDB.createConversation([senderId, receiverId]);
    }

    // Create and save new message
    const newMessage = await messageDB.createMessage({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage.id as any);
    await conversation.save();

    return {
      messageId: newMessage.id,
      message: newMessage.message,
      senderId: newMessage.senderId,
      createdAt: newMessage.createdAt,
    };
  }

  /**
   * Get all messages exchanged between two users.
   */
  async getConversationMessages(userId1: string, userId2: string) {
    const conversation = await messageDB.getMessagesForConversation(
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
