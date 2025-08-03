
export interface User {
  id: string;
  username: string;
}

export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}
