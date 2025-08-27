export interface User {
  id: string;
  username: string;
  email: string;
  profileimg?: string;
}

export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}
