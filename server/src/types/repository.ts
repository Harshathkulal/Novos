export interface IUserRepository {
  findAllUsers(loggedInUserId: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  findByUsername(username: string): Promise<any | null>;
  createUser(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<any>;
  updatePassword(email: string, newPassword: string): Promise<void>;
}

export interface IMessageRepository {
  createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }): Promise<any>;
  findMessageById(id: string): Promise<any>;
  findConversationBetweenUsers(user1: string, user2: string): Promise<any>;
  createConversation(participants: string[]): Promise<any>;
  addMessageToConversation(
    conversationId: string,
    messageId: string
  ): Promise<any>;
  getMessagesForConversation(
    user1: string,
    user2: string
  ): Promise<{ messages: any[] } | undefined>;
}

export interface IThreadRepository {
  createThread(data: {
    author: string;
    content: string;
    image?: string;
  }): Promise<any>;

  getAllThreads(): Promise<any[]>;

  updateThread(
    threadId: string,
    userId: string,
    content: string
  ): Promise<any | null>;

  deleteThread(threadId: string, userId: string): Promise<any | null>;

  toggleLike(threadId: string, userId: string): Promise<any | null>;
}
