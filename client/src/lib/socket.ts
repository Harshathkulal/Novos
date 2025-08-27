import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

export const initiateSocket = (userId: string | null) => {
  socket = io(import.meta.env.VITE_PUBLIC_WEBSOCKET_URL!, {
    query: { userId },
  });

  socket.on("connect", () => {
  });
};

export const sendMessage = (message: string, receiverId: string) => {
  if (!socket) {
    console.error("Socket not initialized");
    return;
  }
  socket.emit("sendMessage", { message, receiverId });
};

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp?: string;
}

export const subscribeToMessages = (cb: (message: Message) => void) => {
  if (!socket) {
    console.error("Socket not initialized");
    return;
  }
  socket.on("newMessage", (message: Message) => {
    cb(message);
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
