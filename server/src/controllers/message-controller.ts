import { Request, Response } from "express";
import Conversation from "../models/conversation-modal";
import Message from "../models/message-modal";
import { getReceiverSocketId, getIOInstance } from "../socket/socket";

/**
 * Sends a message from the logged-in user to the specified receiver.
 *
 * - Checks for an existing conversation between the users, creates one if not found.
 * - Creates a new message document and associates it with the conversation.
 * - Saves both conversation and message concurrently.
 * - Emits the new message to the receiver via Socket.IO if the receiver is online.
 *
 * @param req - message,receiverId, and senderId
 * @param res - newMessage or error response
 */
export const sendMessage = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id;

    // Verify sender is authenticated
    if (!senderId) {
      res.status(401).json({ error: "Unauthorized: sender ID missing" });
      return;
    }

    // Find existing conversation including both sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create new conversation if none exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create new message document
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Link message to conversation
    conversation.messages.push(
      newMessage._id as (typeof conversation.messages)[0]
    );

    // Save both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // Emit new message to receiver if connected via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      const io = getIOInstance();
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with the saved message
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieves all messages exchanged between the logged-in user and another specified user.
 *
 * - Finds the conversation containing both users.
 * - Populates the messages array with the full message documents.
 * - Returns an empty array if no conversation exists.
 *
 * @param req - userToChatId from params and senderId from user object.
 * @param res - array of messages or empty array if no conversation found.
 */
export const getMessages = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user?._id;

    // Verify sender is authenticated
    if (!senderId) {
      res.status(401).json({ error: "Unauthorized: sender ID missing" });
      return;
    }

    // Find conversation between the two users and populate messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // Return empty array if no conversation found
    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    // Respond with populated messages
    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
