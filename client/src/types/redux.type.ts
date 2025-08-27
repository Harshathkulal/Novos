export interface ChatState {
  users: User[];
  receiver: User | null;
  messages: Message[];
  input: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  profileimg?: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}
