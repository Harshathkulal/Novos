import { Server, Socket } from "socket.io";

let io: Server;

// Map to store userId -> socketId for tracking connected users
const userSocketMap = new Map<string, string>();

/**
 * Get the socket ID for a given user ID.
 * Used to emit events to a specific user if they're online.
 *
 * @param receiverId - The user ID
 * @returns The socket ID or undefined if the user is not connected
 */
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap.get(receiverId);
};

/**
 * Returns the initialized Socket.IO instance.
 * Throws an error if accessed before initialization.
 *
 * @returns The Socket.IO server instance
 */
export const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.io instance not initialized");
  return io;
};

/**
 * Initializes and sets up Socket.IO server behavior.
 * Listens for new connections, tracks online users, and emits updates.
 *
 * @param ioInstance - The Socket.IO server instance passed from your main server setup
 */
export function setupSocket(ioInstance: Server) {
  io = ioInstance;

  // When a new client connects
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId;

    // Store userId and associated socket.id if valid
    if (typeof userId === "string" && userId.trim() !== "") {
      userSocketMap.set(userId, socket.id);
    }

    // Broadcast the current online users to all clients
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    // Handle user disconnection
    socket.on("disconnect", () => {
      if (typeof userId === "string") {
        userSocketMap.delete(userId);
        io.emit("getOnlineUsers", Array.from(userSocketMap.keys())); // Notify all clients
      }
    });
  });
}
