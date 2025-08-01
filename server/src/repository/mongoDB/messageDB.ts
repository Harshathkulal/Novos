import Message from "../../models/message-modal";
import Conversation from "../../models/conversation-modal";

export class MessageRepository {
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
    return await Conversation.findOne({
      participants: { $all: [user1, user2] },
    }).populate("messages");
  }
}
