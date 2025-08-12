import Message from "../../models/message-modal";
import Conversation from "../../models/conversation-modal";
import { IMessageRepository } from "../../types/repository";

export class MongoMessageDB implements IMessageRepository {
  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }) {
    const newMessage = new Message(data);
    return await newMessage.save();
  }

  async findMessageById(id: string) {
    return await Message.findById(id);
  }

  async findConversationBetweenUsers(user1: string, user2: string) {
    return await Conversation.findOne({
      participants: { $all: [user1, user2] },
    });
  }

  async createConversation(participants: string[]) {
    return await Conversation.create({ participants });
  }

  async addMessageToConversation(conversationId: string, messageId: string) {
    return await Conversation.findByIdAndUpdate(
      conversationId,
      { $push: { messages: messageId } },
      { new: true }
    );
  }

  async getMessagesForConversation(user1: string, user2: string) {
    const conversation = await Conversation.findOne({
      participants: { $all: [user1, user2] },
    }).populate("messages");

    if (!conversation) return;

    // Convert raw MongoDB messages to consistent format
    const messages = conversation.messages.map((msg: any) => ({
      id: msg._id.toString(),
      message: msg.message,
      senderId: {
        id: msg.senderId._id.toString(),
      },
      createdAt: msg.createdAt,
    }));

    return {
      messages,
    };
  }
}
