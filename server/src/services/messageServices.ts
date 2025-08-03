import { MessageRepository } from "../repository/mongoDB/messageDB";

const messageDB = new MessageRepository();

export class MessageService {
  /**
   * Method to send a message from one user to another.
   * @param senderId - The ID of the user sending the message.
   * @param receiverId - The ID of the user receiving the message.
   * @param message - The content of the message.
   */
  async sendMessage(senderId: string, receiverId: string, message: string) {
    if (!message.trim()) throw new Error("Message is required");

    // Find or create conversation
    let conversation = await messageDB.findConversationBetweenUsers(
      senderId,
      receiverId
    );

    if (!conversation) {
      conversation = await messageDB.createConversation([senderId, receiverId]);
    }

    // Create new message
    const newMessage = await messageDB.createMessage({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage.id as any);

    await Promise.all([conversation.save(), newMessage.save()]);

    return { successful: true };
  }

  /**
   * Method to get all messages exchanged between two users.
   * @param userId1 - The ID of the first user.
   * @param userId2 - The ID of the second user.
   * @returns An array of messages exchanged between the two users.
   */
  async getConversationMessages(userId1: string, userId2: string) {
    const conversation = await messageDB.getMessagesForConversation(
      userId1,
      userId2
    );

    const rawMessages = conversation?.messages || [];
    const formattedMessages = rawMessages.map((msg: any) => ({
      id: msg.id,
      message: msg.message,
      senderId: msg.senderId.id,
      createdAt: msg.createdAt,
    }));

    return formattedMessages;
  }
}
