// types for MessageList Component
interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}

export interface MessageListProps {
  messages: Message[];
  userId: string | null;
  messageLoading: boolean;
}

// types for ChatWindowProps Component
interface User {
  id: string;
  username: string;
}

export interface ChatWindowProps {
  receiver: User | null;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  userId: string | null;
  onBack?: () => void;
  messageLoading: boolean;
}

// types for UserListProps Component
interface User {
  id: string;
  username: string;
  profileimg?: string;
}

export interface UserListProps {
  userName: string | null;
  users: User[];
}

// types for UserListProps Component
export interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
}
