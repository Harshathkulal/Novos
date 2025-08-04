import { RefObject } from "react";

// types for MessageList Component
interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface MessageListProps {
  messages: Message[];
  userId: string | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

// types for ChatWindowProps Component
interface User {
  id: string;
  username: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface ChatWindowProps {
  receiver: User | null;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  userId: string | null;
  onBack?: () => void;
}

// types for UserListProps Component
interface User {
  id: string;
  username: string;
}

export interface UserListProps {
  users: User[];
  onSelect: (user: User) => void;
}

// types for UserListProps Component
export interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
}
