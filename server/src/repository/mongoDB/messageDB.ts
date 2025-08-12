import Message from "../../models/message-modal";
import Conversation from "../../models/conversation-modal";
import { IMessageRepository } from "../../types/repository";
import { Types } from "mongoose";

export class MongoMessageDB implements IMessageRepository {
  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }) {
    // 1. Find or create conversation
    let conversation = await this.findConversationBetweenUsers(
      data.senderId,
      data.receiverId
    );

    if (!conversation) {
      conversation = await this.createConversation([
        data.senderId,
        data.receiverId,
      ]);
    }

    // 2. Create and save new message
    const newMessage = await new Message(data).save();

    // 3. Link message to conversation
    conversation.messages.push(newMessage._id as Types.ObjectId);
    await conversation.save();

    return newMessage;
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

  async addMessageToConversation() {
    // Not used, since `createMessage()` handles linking in Mongo
  }

  async getMessagesForConversation(user1: string, user2: string) {
    const conversation = await Conversation.findOne({
      participants: { $all: [user1, user2] },
    }).populate("messages");

    if (!conversation) return { messages: [] };

    const messages = conversation.messages.map((msg: any) => ({
      id: msg._id.toString(),
      message: msg.message,
      senderId: {
        id: msg.senderId._id?.toString?.() || msg.senderId.toString(),
      },
      createdAt: msg.createdAt,
    }));

    return {
      messages,
    };
  }
}
