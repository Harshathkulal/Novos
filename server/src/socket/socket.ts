import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Map to track userId -> socketId for connected users
const userSocketMap = new Map<string, string>();

/**
 * Get the socket ID for a given user ID.
 * @param receiverId - The user ID
 * @returns The socket ID or undefined if not connected
 */
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap.get(receiverId);
};

/**
 * Handle socket connection event
 * Maps userId to socket.id and manages online users list
 */
io.on("connection", (socket: Socket) => {
  const userId = socket.handshake.query.userId;

  if (typeof userId === "string" && userId.trim() !== "") {
    userSocketMap.set(userId, socket.id);
  }

  // Emit current online users list to all clients
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    if (typeof userId === "string") {
      userSocketMap.delete(userId);
      // Emit updated online users list after disconnection
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });
});

export { app, io, server };
