import { getReceiverSocketId, getIOInstance } from "../socket/socket";

export const emitNewMessage = (receiverId: string, message: any) => {
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    const io = getIOInstance();
    io.to(receiverSocketId).emit("newMessage", message);
  }
};
